/*
 * Copyright 2010-2022 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 *
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or
 *   modify it under the terms of the GNU Affero General Public License
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 *
 *   The code in this file is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU
 *   AGPL normally required by section 4, provided you include this license
 *   notice and a URL through which recipients can access the Corresponding
 *   Source.
 */

/* global globalThis */

const JSON = globalThis.JSON;

const DATA_URI_PREFIX = "data:";
const ABOUT_BLANK_URI = "about:blank";
const REGEXP_URL_HASH = /(#.+?)$/;
const BLOB_URI_PREFIX = "blob:";
const HTTP_URI_PREFIX = /^https?:\/\//;
const FILE_URI_PREFIX = /^file:\/\//;
const EMPTY_URL = /^https?:\/\/+\s*$/;
const NOT_EMPTY_URL = /^(https?:\/\/|file:\/\/|blob:).+/;
const PREFIX_DATA_URI_IMAGE_SVG = "data:image/svg+xml,";
const UTF8_CHARSET = "utf-8";

let util, cssTree;

export {
	getProcessorHelperClass
};

function getProcessorHelperClass(utilInstance, cssTreeInstance) {
	util = utilInstance;
	cssTree = cssTreeInstance;
	return ProcessorHelper;
}

class ProcessorHelper {
	static async processPageResources(doc, baseURI, options, resources, batchRequest) {
		const processAttributeArgs = [
			["link[href][rel*=\"icon\"]", "href", true],
			["object[type=\"image/svg+xml\"], object[type=\"image/svg-xml\"], object[data*=\".svg\"]", "data"],
			["img[src], input[src][type=image]", "src"],
			["embed[src*=\".svg\"]", "src"],
			["video[poster]", "poster"],
			["*[background]", "background"],
			["image", "xlink:href"],
			["image", "href"]
		];
		if (options.blockImages) {
			doc.querySelectorAll("svg").forEach(element => element.remove());
		}
		let resourcePromises = processAttributeArgs.map(([selector, attributeName, removeElementIfMissing]) =>
			ProcessorHelper.processAttribute(doc.querySelectorAll(selector), attributeName, baseURI, options, "image", resources, batchRequest, removeElementIfMissing)
		);
		resourcePromises = resourcePromises.concat([
			ProcessorHelper.processXLinks(doc.querySelectorAll("use"), doc, baseURI, options, batchRequest),
			ProcessorHelper.processSrcset(doc.querySelectorAll("img[srcset], source[srcset]"), baseURI, options, resources, batchRequest)
		]);
		resourcePromises.push(ProcessorHelper.processAttribute(doc.querySelectorAll("object[data*=\".pdf\"]"), "data", baseURI, options, null, resources, batchRequest));
		resourcePromises.push(ProcessorHelper.processAttribute(doc.querySelectorAll("embed[src*=\".pdf\"]"), "src", baseURI, options, null, resources, batchRequest));
		resourcePromises.push(ProcessorHelper.processAttribute(doc.querySelectorAll("audio[src], audio > source[src]"), "src", baseURI, options, "audio", resources, batchRequest));
		resourcePromises.push(ProcessorHelper.processAttribute(doc.querySelectorAll("video[src], video > source[src]"), "src", baseURI, options, "video", resources, batchRequest));
		resourcePromises.push(ProcessorHelper.processAttribute(doc.querySelectorAll("model[src]"), "src", baseURI, options, null, resources, batchRequest));
		await Promise.all(resourcePromises);
		if (options.saveFavicon) {
			ProcessorHelper.processShortcutIcons(doc);
		}
	}

	static async processLinkElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement, resources) {
		if (element.tagName.toUpperCase() == "LINK") {
			element.removeAttribute("integrity");
			if (element.charset) {
				options.charset = element.charset;
			}
			stylesheetInfo.url = element.href;
		}
		await ProcessorHelper.processStylesheetElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement, resources);
	}

	static async processStylesheetElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement, resources) {
		if (options.blockStylesheets) {
			if (element.tagName.toUpperCase() == "LINK") {
				element.href = util.EMPTY_RESOURCE;
			} else {
				element.textContent = "";
			}
		} else {
			if (element.tagName.toUpperCase() == "LINK") {
				await ProcessorHelper.resolveLinkStylesheetURLs(stylesheetInfo, element, element.href, baseURI, options, workStyleElement, resources, stylesheets);
			} else {
				stylesheets.set({ element }, stylesheetInfo);
				stylesheetInfo.stylesheet = cssTree.parse(element.textContent, { context: "stylesheet", parseCustomProperty: true });
				await ProcessorHelper.resolveImportURLs(stylesheetInfo, baseURI, options, workStyleElement, resources, stylesheets);
			}
		}
	}

	static replaceStylesheets(stylesheets, resources, options) {
		for (const [key, stylesheetInfo] of stylesheets) {
			if (key.urlNode) {
				const name = "stylesheet_" + resources.stylesheets.size + ".css";
				if (!isDataURL(stylesheetInfo.url) && options.saveOriginalURLs) {
					key.urlNode.value = "-sf-url-original(" + JSON.stringify(stylesheetInfo.url) + ") " + name;
				} else {
					key.urlNode.value = name;
				}
				resources.stylesheets.set(resources.stylesheets.size, { name, content: ProcessorHelper.generateStylesheetContent(stylesheetInfo.stylesheet, options), url: stylesheetInfo.url });
			}
		}
		for (const [key, stylesheetInfo] of stylesheets) {
			if (key.element) {
				if (key.element.tagName.toUpperCase() == "LINK") {
					const linkElement = key.element;
					const name = "stylesheet_" + resources.stylesheets.size + ".css";
					linkElement.setAttribute("href", name);
					resources.stylesheets.set(resources.stylesheets.size, { name, content: ProcessorHelper.generateStylesheetContent(stylesheetInfo.stylesheet, options), url: stylesheetInfo.url });
				} else {
					const styleElement = key.element;
					styleElement.textContent = ProcessorHelper.generateStylesheetContent(stylesheetInfo.stylesheet, options);
				}
			}
		}
	}

	static async resolveImportURLs(stylesheetInfo, baseURI, options, workStylesheet, resources, stylesheets) {
		const stylesheet = stylesheetInfo.stylesheet;
		const scoped = stylesheetInfo.scoped;
		ProcessorHelper.resolveStylesheetURLs(stylesheet, baseURI, workStylesheet);
		const imports = getImportFunctions(stylesheet);
		await Promise.all(imports.map(async node => {
			const urlNode = cssTree.find(node, node => node.type == "Url") || cssTree.find(node, node => node.type == "String");
			if (urlNode) {
				let resourceURL = normalizeURL(urlNode.value);
				if (!testIgnoredPath(resourceURL) && testValidPath(resourceURL)) {
					urlNode.value = util.EMPTY_RESOURCE;
					try {
						resourceURL = util.resolveURL(resourceURL, baseURI);
					} catch (error) {
						// ignored
					}
					if (testValidURL(resourceURL)) {
						const mediaQueryListNode = cssTree.find(node, node => node.type == "MediaQueryList");
						let mediaText;
						if (mediaQueryListNode) {
							mediaText = cssTree.generate(mediaQueryListNode);
						}
						const existingStylesheet = Array.from(stylesheets).find(([, stylesheetInfo]) => stylesheetInfo.resourceURL == resourceURL);
						if (existingStylesheet) {
							stylesheets.set({ urlNode }, {
								url: resourceURL,
								stylesheet: existingStylesheet[1].stylesheet, scoped
							});
						} else {
							const stylesheetInfo = {
								scoped,
								mediaText
							};
							stylesheets.set({ urlNode }, stylesheetInfo);
							const content = await ProcessorHelper.getStylesheetContent(resourceURL, options);
							stylesheetInfo.url = resourceURL = content.resourceURL;
							const existingStylesheet = Array.from(stylesheets).find(([, stylesheetInfo]) => stylesheetInfo.resourceURL == resourceURL);
							if (existingStylesheet) {
								stylesheets.set({ urlNode }, { url: resourceURL, stylesheet: existingStylesheet[1].stylesheet, scoped });
							} else {
								content.data = getUpdatedResourceContent(resourceURL, content, options);
								stylesheetInfo.stylesheet = cssTree.parse(content.data, { context: "stylesheet", parseCustomProperty: true });
								await ProcessorHelper.resolveImportURLs(stylesheetInfo, resourceURL, options, workStylesheet, resources, stylesheets);
							}
						}
					}
				}
			}
		}));
	}

	static async resolveLinkStylesheetURLs(stylesheetInfo, element, resourceURL, baseURI, options, workStylesheet, resources, stylesheets) {
		resourceURL = normalizeURL(resourceURL);
		if (resourceURL && resourceURL != baseURI && resourceURL != ABOUT_BLANK_URI) {
			const existingStylesheet = Array.from(stylesheets).find(([, otherStylesheetInfo]) => otherStylesheetInfo.resourceURL == resourceURL);
			if (existingStylesheet) {
				stylesheets.set({ element }, {
					url: resourceURL,
					stylesheet: existingStylesheet[1].stylesheet,
					mediaText: stylesheetInfo.mediaText
				});
			} else {
				stylesheets.set({ element }, stylesheetInfo);
				const content = await util.getContent(resourceURL, {
					maxResourceSize: options.maxResourceSize,
					maxResourceSizeEnabled: options.maxResourceSizeEnabled,
					charset: options.charset,
					frameId: options.frameId,
					resourceReferrer: options.resourceReferrer,
					validateTextContentType: true,
					baseURI: baseURI,
					blockMixedContent: options.blockMixedContent,
					expectedType: "stylesheet",
					acceptHeaders: options.acceptHeaders,
					networkTimeout: options.networkTimeout
				});
				if (!(matchCharsetEquals(content.data, content.charset) || matchCharsetEquals(content.data, options.charset))) {
					options = Object.assign({}, options, { charset: getCharset(content.data) });
					ProcessorHelper.resolveLinkStylesheetURLs(stylesheetInfo, element, resourceURL, baseURI, options, workStylesheet, resources, stylesheets);
				}
				resourceURL = content.resourceURL;
				if (existingStylesheet) {
					stylesheets.set({ element }, {
						url: resourceURL,
						stylesheet: existingStylesheet[1].stylesheet,
						mediaText: stylesheetInfo.mediaText
					});
				} else {
					content.data = getUpdatedResourceContent(content.resourceURL, content, options);
					stylesheetInfo.stylesheet = cssTree.parse(content.data, { context: "stylesheet", parseCustomProperty: true });
					await ProcessorHelper.resolveImportURLs(stylesheetInfo, resourceURL, options, workStylesheet, resources, stylesheets);
				}
			}
		}
	}

	static async processFrame(frameElement, pageData, frameWindowId, frameData) {
		const name = "frames/" + this.resources.frames.size + "/";
		if (frameElement.tagName.toUpperCase() == "OBJECT") {
			frameElement.setAttribute("data", name + "index.html");
		} else {
			frameElement.setAttribute("src", name + "index.html");
		}
		this.resources.frames.set(frameWindowId, { name, content: pageData.content, resources: pageData.resources, url: frameData.url });
	}


	static async processStylesheet(cssRules, baseURI, options, resources, batchRequest) {
		const promises = [];
		const removedRules = [];
		for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
			const ruleData = cssRule.data;
			if (ruleData.type == "Atrule" && ruleData.name == "charset") {
				removedRules.push(cssRule);
			} else if (ruleData.block && ruleData.block.children) {
				if (ruleData.type == "Rule") {
					promises.push(ProcessorHelper.processStyle(ruleData, options, resources, batchRequest));
				} else if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports")) {
					promises.push(ProcessorHelper.processStylesheet(ruleData.block.children, baseURI, options, resources, batchRequest));
				} else if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
					promises.push(processFontFaceRule(ruleData));
				}
			}
		}
		removedRules.forEach(cssRule => cssRules.remove(cssRule));
		await Promise.all(promises);

		async function processFontFaceRule(ruleData) {
			const urls = getUrlFunctions(ruleData);
			await Promise.all(urls.map(async urlNode => {
				const originalResourceURL = urlNode.value;
				if (!options.blockFonts) {
					const resourceURL = normalizeURL(originalResourceURL);
					if (!testIgnoredPath(resourceURL) && testValidURL(resourceURL)) {
						let { content, extension, indexResource, contentType } = await batchRequest.addURL(resourceURL,
							{ asBinary: true, expectedType: "font", baseURI, blockMixedContent: options.blockMixedContent });
						const name = "fonts/" + indexResource + extension;
						if (!isDataURL(resourceURL) && options.saveOriginalURLs) {
							urlNode.value = "-sf-url-original(" + JSON.stringify(originalResourceURL) + ") " + name;
						} else {
							urlNode.value = name;
						}
						resources.fonts.set(indexResource, { name, content, extension, contentType, url: resourceURL });
					}
				} else {
					urlNode.value = util.EMPTY_RESOURCE;
				}
			}));
		}
	}

	static async processStyle(ruleData, options, resources, batchRequest) {
		const urls = getUrlFunctions(ruleData);
		await Promise.all(urls.map(async urlNode => {
			const originalResourceURL = urlNode.value;
			if (!options.blockImages) {
				const resourceURL = normalizeURL(originalResourceURL);
				if (!testIgnoredPath(resourceURL) && testValidURL(resourceURL)) {
					let { content, indexResource, contentType, extension } = await batchRequest.addURL(resourceURL,
						{ asBinary: true, expectedType: "image" });
					const name = "images/" + indexResource + extension;
					if (!isDataURL(resourceURL) && options.saveOriginalURLs) {
						urlNode.value = "-sf-url-original(" + JSON.stringify(originalResourceURL) + ") " + name;
					} else {
						urlNode.value = name;
					}
					resources.images.set(indexResource, { name, content, extension, contentType, url: resourceURL });
				}
			} else {
				urlNode.value = util.EMPTY_RESOURCE;
			}
		}));
	}

	static async processAttribute(resourceElements, attributeName, baseURI, options, expectedType, resources, batchRequest, removeElementIfMissing) {
		await Promise.all(Array.from(resourceElements).map(async resourceElement => {
			let resourceURL = resourceElement.getAttribute(attributeName);
			if (resourceURL != null) {
				resourceURL = normalizeURL(resourceURL);
				let originURL = resourceElement.dataset.singleFileOriginURL;
				if (options.saveOriginalURLs && !isDataURL(resourceURL)) {
					resourceElement.setAttribute("data-sf-original-" + attributeName, resourceURL);
				}
				delete resourceElement.dataset.singleFileOriginURL;
				if (!options["block" + expectedType.charAt(0).toUpperCase() + expectedType.substring(1) + "s"]) {
					if (!testIgnoredPath(resourceURL)) {
						setAttributeEmpty(resourceElement, attributeName, expectedType);
						if (testValidPath(resourceURL)) {
							try {
								resourceURL = util.resolveURL(resourceURL, baseURI);
							} catch (error) {
								// ignored
							}
							if (testValidURL(resourceURL)) {
								let { content, indexResource, extension, contentType } = await batchRequest.addURL(resourceURL,
									{ asBinary: true, expectedType });
								if (originURL) {
									if (ProcessorHelper.testEmptyResource(content)) {
										try {
											originURL = util.resolveURL(originURL, baseURI);
										} catch (error) {
											// ignored
										}
										try {
											resourceURL = originURL;
											content = (await util.getContent(resourceURL, {
												asBinary: true,
												expectedType,
												maxResourceSize: options.maxResourceSize,
												maxResourceSizeEnabled: options.maxResourceSizeEnabled,
												frameId: options.windowId,
												resourceReferrer: options.resourceReferrer,
												acceptHeaders: options.acceptHeaders,
												networkTimeout: options.networkTimeout
											})).data;
										} catch (error) {
											// ignored
										}
									}
								}
								if (removeElementIfMissing && ProcessorHelper.testEmptyResource(content)) {
									resourceElement.remove();
								} else if (!ProcessorHelper.testEmptyResource(content)) {
									const name = "images/" + indexResource + extension;
									resourceElement.setAttribute(attributeName, name);
									resources.images.set(indexResource, { name, content, extension, contentType, url: resourceURL });
								}
							}
						}
					}
				} else {
					setAttributeEmpty(resourceElement, attributeName, expectedType);
				}
			}
		}));

		function setAttributeEmpty(resourceElement, attributeName, expectedType) {
			if (expectedType == "video" || expectedType == "audio") {
				resourceElement.removeAttribute(attributeName);
			} else {
				resourceElement.setAttribute(attributeName, util.EMPTY_RESOURCE);
			}
		}
	}

	static async processSrcset(resourceElements, baseURI, options, resources, batchRequest) {
		await Promise.all(Array.from(resourceElements).map(async resourceElement => {
			const originSrcset = resourceElement.getAttribute("srcset");
			const srcset = util.parseSrcset(originSrcset);
			if (options.saveOriginalURLs && !isDataURL(originSrcset)) {
				resourceElement.setAttribute("data-sf-original-srcset", originSrcset);
			}
			if (!options.blockImages) {
				const srcsetValues = await Promise.all(srcset.map(async srcsetValue => {
					let resourceURL = normalizeURL(srcsetValue.url);
					if (!testIgnoredPath(resourceURL)) {
						if (testValidPath(resourceURL)) {
							try {
								resourceURL = util.resolveURL(resourceURL, baseURI);
							} catch (error) {
								// ignored
							}
							if (testValidURL(resourceURL)) {
								const { content, indexResource, extension, contentType } = await batchRequest.addURL(resourceURL, { asBinary: true, expectedType: "image" });
								const name = "images/" + indexResource + extension;
								resources.images.set(indexResource, { name, content, extension, contentType, url: resourceURL });
								return name + (srcsetValue.w ? " " + srcsetValue.w + "w" : srcsetValue.d ? " " + srcsetValue.d + "x" : "");
							} else {
								return "";
							}
						} else {
							return "";
						}
					} else {
						return resourceURL + (srcsetValue.w ? " " + srcsetValue.w + "w" : srcsetValue.d ? " " + srcsetValue.d + "x" : "");
					}
				}));
				resourceElement.setAttribute("srcset", srcsetValues.join(", "));
			} else {
				resourceElement.setAttribute("srcset", "");
			}
		}));
	}

	static testEmptyResource(resource) {
		return !resource;
	}

	static generateStylesheetContent(stylesheet, options) {
		if (options.compressCSS) {
			ProcessorHelper.removeSingleLineCssComments(stylesheet);
		}
		ProcessorHelper.replacePseudoClassDefined(stylesheet);
		let stylesheetContent = cssTree.generate(stylesheet);
		if (options.compressCSS) {
			stylesheetContent = util.compressCSS(stylesheetContent);
		}
		if (options.saveOriginalURLs) {
			stylesheetContent = replaceOriginalURLs(stylesheetContent);
		}
		return stylesheetContent;
	}

	static getAdditionalPageData(doc, content, pageResources) {
		const resources = {};
		let textContent = content;
		pageResources.stylesheets.forEach(resource => textContent += resource.content);
		Object.keys(pageResources).forEach(resourceType => {
			const unusedResources = Array.from(pageResources[resourceType]).filter(([, value]) => !textContent.includes(value.name));
			unusedResources.forEach(([indexResource]) => pageResources[resourceType].delete(indexResource));
			resources[resourceType] = Array.from(pageResources[resourceType].values());
		});
		const viewportElement = doc.head.querySelector("meta[name=viewport]");
		const viewport = viewportElement ? viewportElement.content : null;
		const doctype = util.getDoctypeString(doc);
		return {
			doctype,
			resources,
			viewport
		};
	}

	static setBackgroundImage(element, url, style) {
		element.style.setProperty("background-blend-mode", "normal", "important");
		element.style.setProperty("background-clip", "content-box", "important");
		element.style.setProperty("background-position", style && style["background-position"] ? style["background-position"] : "center", "important");
		element.style.setProperty("background-color", style && style["background-color"] ? style["background-color"] : "transparent", "important");
		element.style.setProperty("background-image", url, "important");
		element.style.setProperty("background-size", style && style["background-size"] ? style["background-size"] : "100% 100%", "important");
		element.style.setProperty("background-origin", "content-box", "important");
		element.style.setProperty("background-repeat", "no-repeat", "important");
	}

	static async getStylesheetContent(resourceURL, options) {
		const content = await util.getContent(resourceURL, {
			maxResourceSize: options.maxResourceSize,
			maxResourceSizeEnabled: options.maxResourceSizeEnabled,
			validateTextContentType: true,
			frameId: options.frameId,
			charset: options.charset,
			resourceReferrer: options.resourceReferrer,
			baseURI: options.baseURI,
			blockMixedContent: options.blockMixedContent,
			expectedType: "stylesheet",
			acceptHeaders: options.acceptHeaders,
			networkTimeout: options.networkTimeout
		});
		if (!(matchCharsetEquals(content.data, content.charset) || matchCharsetEquals(content.data, options.charset))) {
			options = Object.assign({}, options, { charset: getCharset(content.data) });
			return util.getContent(resourceURL, {
				maxResourceSize: options.maxResourceSize,
				maxResourceSizeEnabled: options.maxResourceSizeEnabled,
				validateTextContentType: true,
				frameId: options.frameId,
				charset: options.charset,
				resourceReferrer: options.resourceReferrer,
				baseURI: options.baseURI,
				blockMixedContent: options.blockMixedContent,
				expectedType: "stylesheet",
				acceptHeaders: options.acceptHeaders,
				networkTimeout: options.networkTimeout
			});
		} else {
			return content;
		}
	}

	static processShortcutIcons(doc) {
		let shortcutIcon = findShortcutIcon(Array.from(doc.querySelectorAll("link[href][rel=\"shortcut icon\"]")));
		if (!shortcutIcon) {
			shortcutIcon = findShortcutIcon(Array.from(doc.querySelectorAll("link[href][rel=\"icon\"]")));
		}
		if (!shortcutIcon) {
			shortcutIcon = findShortcutIcon(Array.from(doc.querySelectorAll("link[href][rel*=\"icon\"]")));
			if (shortcutIcon) {
				shortcutIcon.rel = "shortcut icon";
			}
		}
		if (shortcutIcon) {
			doc.querySelectorAll("link[href][rel*=\"icon\"]").forEach(linkElement => {
				if (linkElement != shortcutIcon) {
					linkElement.remove();
				}
			});
		}
	}

	static removeSingleLineCssComments(stylesheet) {
		if (stylesheet.children) {
			const removedRules = [];
			for (let cssRule = stylesheet.children.head; cssRule; cssRule = cssRule.next) {
				const ruleData = cssRule.data;
				if (ruleData.type == "Raw" && ruleData.value && ruleData.value.trim().startsWith("//")) {
					removedRules.push(cssRule);
				}
			}
			removedRules.forEach(cssRule => stylesheet.children.remove(cssRule));
		}
	}

	static replacePseudoClassDefined(stylesheet) {
		const removedSelectors = [];
		if (stylesheet.children) {
			for (let cssRule = stylesheet.children.head; cssRule; cssRule = cssRule.next) {
				const ruleData = cssRule.data;
				if (ruleData.type == "Rule" && ruleData.prelude && ruleData.prelude.children) {
					for (let selector = ruleData.prelude.children.head; selector; selector = selector.next) {
						replacePseudoDefinedSelector(selector, ruleData.prelude);
					}
				}
			}
		}
		if (removedSelectors.length) {
			removedSelectors.forEach(({ parentSelector, selector }) => {
				if (parentSelector.data.children.size == 0 || !selector.prev || selector.prev.data.type == "Combinator" || selector.prev.data.type == "WhiteSpace") {
					parentSelector.data.children.replace(selector, cssTree.parse("*", { context: "selector" }).children.head);
				} else {
					parentSelector.data.children.remove(selector);
				}
			});
		}

		function replacePseudoDefinedSelector(selector, parentSelector) {
			if (selector.data.children) {
				for (let childSelector = selector.data.children.head; childSelector; childSelector = childSelector.next) {
					replacePseudoDefinedSelector(childSelector, selector);
				}
			}
			if (selector.data.type == "PseudoClassSelector" && selector.data.name == "defined") {
				removedSelectors.push({ parentSelector, selector });
			}
		}
	}

	static resolveStylesheetURLs(stylesheet, baseURI, workStylesheet) {
		const urls = getUrlFunctions(stylesheet);
		urls.map(urlNode => {
			const originalResourceURL = urlNode.value;
			let resourceURL = normalizeURL(originalResourceURL);
			if (!testIgnoredPath(resourceURL)) {
				workStylesheet.textContent = "tmp { content:\"" + resourceURL + "\"}";
				if (workStylesheet.sheet && workStylesheet.sheet.cssRules) {
					resourceURL = util.removeQuotes(workStylesheet.sheet.cssRules[0].style.getPropertyValue("content"));
				}
				if (!testIgnoredPath(resourceURL)) {
					if (!resourceURL || testValidPath(resourceURL)) {
						let resolvedURL;
						if (!originalResourceURL.startsWith("#")) {
							try {
								resolvedURL = util.resolveURL(resourceURL, baseURI);
							} catch (error) {
								// ignored
							}
						}
						if (testValidURL(resolvedURL)) {
							urlNode.value = resolvedURL;
						}
					} else {
						urlNode.value = util.EMPTY_RESOURCE;
					}
				}
			}
		});
	}

	static async processXLinks(resourceElements, doc, baseURI, options, batchRequest) {
		let attributeName = "xlink:href";
		await Promise.all(Array.from(resourceElements).map(async resourceElement => {
			let originalResourceURL = resourceElement.getAttribute(attributeName);
			if (originalResourceURL == null) {
				attributeName = "href";
				originalResourceURL = resourceElement.getAttribute(attributeName);
			}
			if (options.saveOriginalURLs && !isDataURL(originalResourceURL)) {
				resourceElement.setAttribute("data-sf-original-href", originalResourceURL);
			}
			let resourceURL = normalizeURL(originalResourceURL);
			if (!options.blockImages) {
				if (testValidPath(resourceURL) && !testIgnoredPath(resourceURL)) {
					resourceElement.setAttribute(attributeName, util.EMPTY_RESOURCE);
					try {
						resourceURL = util.resolveURL(resourceURL, baseURI);
					} catch (error) {
						// ignored
					}
					if (testValidURL(resourceURL)) {
						const hashMatch = originalResourceURL.match(REGEXP_URL_HASH);
						if (originalResourceURL.startsWith(baseURI + "#")) {
							resourceElement.setAttribute(attributeName, hashMatch[0]);
						} else {
							const response = await batchRequest.addURL(resourceURL, { expectedType: "image" });
							const svgDoc = util.parseSVGContent(response.content);
							if (hashMatch && hashMatch[0]) {
								let symbolElement;
								try {
									symbolElement = svgDoc.querySelector(hashMatch[0]);
								} catch (error) {
									// ignored
								}
								if (symbolElement) {
									resourceElement.setAttribute(attributeName, hashMatch[0]);
									resourceElement.parentElement.insertBefore(symbolElement, resourceElement.parentElement.firstChild);
								}
							} else {
								const content = await batchRequest.addURL(resourceURL, { expectedType: "image" });
								resourceElement.setAttribute(attributeName, PREFIX_DATA_URI_IMAGE_SVG + "," + content);
							}
						}
					}
				} else if (resourceURL == options.url) {
					resourceElement.setAttribute(attributeName, originalResourceURL.substring(resourceURL.length));
				}
			} else {
				resourceElement.setAttribute(attributeName, util.EMPTY_RESOURCE);
			}
		}));
	}
}

function getUpdatedResourceContent(resourceURL, content, options) {
	if (options.rootDocument && options.updatedResources[resourceURL]) {
		options.updatedResources[resourceURL].retrieved = true;
		return options.updatedResources[resourceURL].content;
	} else {
		return content.data || "";
	}
}

function normalizeURL(url) {
	if (!url || url.startsWith(DATA_URI_PREFIX)) {
		return url;
	} else {
		return url.split("#")[0];
	}
}

function matchCharsetEquals(stylesheetContent = "", charset = UTF8_CHARSET) {
	const stylesheetCharset = getCharset(stylesheetContent);
	if (stylesheetCharset) {
		return stylesheetCharset == charset.toLowerCase();
	} else {
		return true;
	}
}

function getCharset(stylesheetContent = "") {
	const match = stylesheetContent.match(/^@charset\s+"([^"]*)";/i);
	if (match && match[1]) {
		return match[1].toLowerCase().trim();
	}
}

function getUrlFunctions(declarationList) {
	return cssTree.findAll(declarationList, node => node.type == "Url");
}

function getImportFunctions(declarationList) {
	return cssTree.findAll(declarationList, node => node.type == "Atrule" && node.name == "import");
}

function findShortcutIcon(shortcutIcons) {
	shortcutIcons = shortcutIcons.filter(linkElement => linkElement.href != util.EMPTY_RESOURCE);
	shortcutIcons.sort((linkElement1, linkElement2) => (parseInt(linkElement2.sizes, 10) || 16) - (parseInt(linkElement1.sizes, 10) || 16));
	return shortcutIcons[0];
}

function isDataURL(url) {
	return url && (url.startsWith(DATA_URI_PREFIX) || url.startsWith(BLOB_URI_PREFIX));
}

function replaceOriginalURLs(stylesheetContent) {
	return stylesheetContent.replace(/url\(-sf-url-original\\\(\\"(.*?)\\"\\\)\\ /g, "/* original URL: $1 */url(");
}

function testIgnoredPath(resourceURL) {
	return resourceURL && (resourceURL.startsWith(DATA_URI_PREFIX) || resourceURL == ABOUT_BLANK_URI);
}

function testValidPath(resourceURL) {
	return resourceURL && !resourceURL.match(EMPTY_URL);
}

function testValidURL(resourceURL) {
	return testValidPath(resourceURL) && (resourceURL.match(HTTP_URI_PREFIX) || resourceURL.match(FILE_URI_PREFIX) || resourceURL.startsWith(BLOB_URI_PREFIX)) && resourceURL.match(NOT_EMPTY_URL);
}
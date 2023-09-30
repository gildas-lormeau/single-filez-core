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

import * as cssTree from "./../../vendor/css-tree.js";
import {
	normalizeFontFamily,
	getFontWeight
} from "./../helper.js";

const JSON = globalThis.JSON;
const FontFace = globalThis.FontFace;

const ABOUT_BLANK_URI = "about:blank";
const UTF8_CHARSET = "utf-8";

const REGEXP_URL_SIMPLE_QUOTES_FN = /url\s*\(\s*'(.*?)'\s*\)/i;
const REGEXP_URL_DOUBLE_QUOTES_FN = /url\s*\(\s*"(.*?)"\s*\)/i;
const REGEXP_URL_NO_QUOTES_FN = /url\s*\(\s*(.*?)\s*\)/i;
const REGEXP_URL_FUNCTION = /(url|local|-sf-url-original)\(.*?\)\s*(,|$)/g;
const REGEXP_SIMPLE_QUOTES_STRING = /^'(.*?)'$/;
const REGEXP_DOUBLE_QUOTES_STRING = /^"(.*?)"$/;
const REGEXP_URL_FUNCTION_WOFF = /^url\(\s*["']?data:font\/(woff2?)/;
const REGEXP_URL_FUNCTION_WOFF_ALT = /^url\(\s*["']?data:application\/x-font-(woff)/;
const REGEXP_FONT_FORMAT = /\.([^.?#]+)((\?|#).*?)?$/;
const REGEXP_FONT_FORMAT_VALUE = /format\((.*?)\)\s*,?$/;
const REGEXP_FONT_SRC = /(.*?)\s*,?$/;
const EMPTY_URL_SOURCE = /^url\(["']?data:[^,]*,?["']?\)/;
const LOCAL_SOURCE = "local(";
const MEDIA_ALL = "all";
const FONT_STRETCHES = {
	"ultra-condensed": "50%",
	"extra-condensed": "62.5%",
	"condensed": "75%",
	"semi-condensed": "87.5%",
	"normal": "100%",
	"semi-expanded": "112.5%",
	"expanded": "125%",
	"extra-expanded": "150%",
	"ultra-expanded": "200%"
};
const FONT_MAX_LOAD_DELAY = 5000;

let util;

import {
	getProcessorHelperCommonClass,
	getUpdatedResourceContent,
	normalizeURL,
	matchCharsetEquals,
	getCharset,
	getUrlFunctions,
	getImportFunctions,
	isDataURL,
	replaceOriginalURLs,
	testIgnoredPath,
	testValidPath,
	testValidURL
} from "./processor-helper-common.js";

export {
	getProcessorHelperClass,
	cssTree
};

function getProcessorHelperClass(utilInstance) {
	util = utilInstance;
	const ProcessorHelperCommon = getProcessorHelperCommonClass(util, cssTree);

	return class ProcessorHelper extends ProcessorHelperCommon {
		async processPageResources(doc, baseURI, options, resources, styles, batchRequest) {
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
				this.processAttribute(doc.querySelectorAll(selector), attributeName, baseURI, options, "image", resources, batchRequest, removeElementIfMissing)
			);
			resourcePromises = resourcePromises.concat([
				this.processXLinks(doc.querySelectorAll("use"), doc, baseURI, options, batchRequest),
				this.processSrcset(doc.querySelectorAll("img[srcset], source[srcset]"), baseURI, options, resources, batchRequest)
			]);
			resourcePromises.push(this.processAttribute(doc.querySelectorAll("object[data*=\".pdf\"]"), "data", baseURI, options, null, resources, batchRequest));
			resourcePromises.push(this.processAttribute(doc.querySelectorAll("embed[src*=\".pdf\"]"), "src", baseURI, options, null, resources, batchRequest));
			resourcePromises.push(this.processAttribute(doc.querySelectorAll("audio[src], audio > source[src]"), "src", baseURI, options, "audio", resources, batchRequest));
			resourcePromises.push(this.processAttribute(doc.querySelectorAll("video[src], video > source[src]"), "src", baseURI, options, "video", resources, batchRequest));
			resourcePromises.push(this.processAttribute(doc.querySelectorAll("model[src]"), "src", baseURI, options, null, resources, batchRequest));
			await Promise.all(resourcePromises);
			if (options.saveFavicon) {
				this.processShortcutIcons(doc);
			}
		}

		async processLinkElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement, resources) {
			if (element.tagName.toUpperCase() == "LINK") {
				element.removeAttribute("integrity");
				if (element.charset) {
					options.charset = element.charset;
				}
				stylesheetInfo.url = element.href;
			}
			await this.processStylesheetElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement, resources);
		}

		async processStylesheetElement(element, stylesheetInfo, stylesheets, baseURI, options, workStyleElement, resources) {
			if (options.blockStylesheets) {
				if (element.tagName.toUpperCase() == "LINK") {
					element.href = util.EMPTY_RESOURCE;
				} else {
					element.textContent = "";
				}
			} else {
				if (element.tagName.toUpperCase() == "LINK") {
					await this.resolveLinkStylesheetURLs(stylesheetInfo, element, element.href, baseURI, options, workStyleElement, resources, stylesheets);
				} else {
					stylesheets.set({ element }, stylesheetInfo);
					stylesheetInfo.stylesheet = cssTree.parse(element.textContent, { context: "stylesheet", parseCustomProperty: true });
					await this.resolveImportURLs(stylesheetInfo, baseURI, options, workStyleElement, resources, stylesheets);
				}
			}
		}

		replaceStylesheets(doc, stylesheets, resources, options) {
			for (const [key, stylesheetInfo] of stylesheets) {
				if (key.urlNode) {
					const name = "stylesheet_" + resources.stylesheets.size + ".css";
					if (!isDataURL(stylesheetInfo.url) && options.saveOriginalURLs) {
						key.urlNode.value = "-sf-url-original(" + JSON.stringify(stylesheetInfo.url) + ") " + name;
					} else {
						key.urlNode.value = name;
					}
					resources.stylesheets.set(resources.stylesheets.size, { name, content: this.generateStylesheetContent(stylesheetInfo.stylesheet, options), url: stylesheetInfo.url });
				}
			}
			for (const [key, stylesheetInfo] of stylesheets) {
				if (key.element) {
					if (key.element.tagName.toUpperCase() == "LINK") {
						const linkElement = key.element;
						const name = "stylesheet_" + resources.stylesheets.size + ".css";
						linkElement.setAttribute("href", name);
						resources.stylesheets.set(resources.stylesheets.size, { name, content: this.generateStylesheetContent(stylesheetInfo.stylesheet, options), url: stylesheetInfo.url });
					} else {
						const styleElement = key.element;
						styleElement.textContent = this.generateStylesheetContent(stylesheetInfo.stylesheet, options);
					}
				}
			}
		}

		async resolveImportURLs(stylesheetInfo, baseURI, options, workStylesheet, resources, stylesheets) {
			const stylesheet = stylesheetInfo.stylesheet;
			const scoped = stylesheetInfo.scoped;
			this.resolveStylesheetURLs(stylesheet, baseURI, workStylesheet);
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
								const content = await this.getStylesheetContent(resourceURL, options);
								stylesheetInfo.url = resourceURL = content.resourceURL;
								const existingStylesheet = Array.from(stylesheets).find(([, stylesheetInfo]) => stylesheetInfo.resourceURL == resourceURL);
								if (existingStylesheet) {
									stylesheets.set({ urlNode }, { url: resourceURL, stylesheet: existingStylesheet[1].stylesheet, scoped });
								} else {
									content.data = getUpdatedResourceContent(resourceURL, content, options);
									stylesheetInfo.stylesheet = cssTree.parse(content.data, { context: "stylesheet", parseCustomProperty: true });
									await this.resolveImportURLs(stylesheetInfo, resourceURL, options, workStylesheet, resources, stylesheets);
								}
							}
						}
					}
				}
			}));
		}

		async resolveLinkStylesheetURLs(stylesheetInfo, element, resourceURL, baseURI, options, workStylesheet, resources, stylesheets) {
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
						this.resolveLinkStylesheetURLs(stylesheetInfo, element, resourceURL, baseURI, options, workStylesheet, resources, stylesheets);
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
						await this.resolveImportURLs(stylesheetInfo, resourceURL, options, workStylesheet, resources, stylesheets);
					}
				}
			}
		}

		async processFrame(frameElement, pageData, resources, frameWindowId, frameData) {
			const name = "frames/" + resources.frames.size + "/";
			if (frameElement.tagName.toUpperCase() == "OBJECT") {
				frameElement.setAttribute("data", name + "index.html");
			} else {
				frameElement.setAttribute("src", name + "index.html");
			}
			resources.frames.set(frameWindowId, { name, content: pageData.content, resources: pageData.resources, url: frameData.url });
		}

		async processStylesheet(cssRules, baseURI, options, resources, batchRequest) {
			const promises = [];
			const removedRules = [];
			for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
				const ruleData = cssRule.data;
				if (ruleData.type == "Atrule" && ruleData.name == "charset") {
					removedRules.push(cssRule);
				} else if (ruleData.block && ruleData.block.children) {
					if (ruleData.type == "Rule") {
						promises.push(this.processStyle(ruleData, options, resources, batchRequest));
					} else if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports")) {
						promises.push(this.processStylesheet(ruleData.block.children, baseURI, options, resources, batchRequest));
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

		async processStyle(ruleData, options, resources, batchRequest) {
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

		async processAttribute(resourceElements, attributeName, baseURI, options, expectedType, resources, batchRequest, removeElementIfMissing) {
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
										if (this.testEmptyResource(content)) {
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
									if (removeElementIfMissing && this.testEmptyResource(content)) {
										resourceElement.remove();
									} else if (!this.testEmptyResource(content)) {
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

		async processSrcset(resourceElements, baseURI, options, resources, batchRequest) {
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

		testEmptyResource(resource) {
			return !resource;
		}

		generateStylesheetContent(stylesheet, options) {
			if (options.compressCSS) {
				this.removeSingleLineCssComments(stylesheet);
			}
			this.replacePseudoClassDefined(stylesheet);
			let stylesheetContent = cssTree.generate(stylesheet);
			if (options.compressCSS) {
				stylesheetContent = util.compressCSS(stylesheetContent);
			}
			if (options.saveOriginalURLs) {
				stylesheetContent = replaceOriginalURLs(stylesheetContent);
			}
			return stylesheetContent;
		}

		getAdditionalPageData(doc, content, pageResources) {
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

		removeAlternativeFonts(doc, stylesheets, fontResources, fontTests) {
			return removeAlternativeFonts(doc, stylesheets, fontResources, fontTests);
		}

		async processScript(element, resourceURL) {
			const content = await util.getContent(resourceURL, {
				asBinary: true,
				charset: this.charset != UTF8_CHARSET && this.charset,
				maxResourceSize: this.options.maxResourceSize,
				maxResourceSizeEnabled: this.options.maxResourceSizeEnabled,
				frameId: this.options.windowId,
				resourceReferrer: this.options.resourceReferrer,
				baseURI: this.options.baseURI,
				blockMixedContent: this.options.blockMixedContent,
				expectedType: "script",
				acceptHeaders: this.options.acceptHeaders,
				networkTimeout: this.options.networkTimeout
			});
			content.data = getUpdatedResourceContent(resourceURL, content, this.options);
			element.setAttribute("src", content.data);
		}
	};
}

async function removeAlternativeFonts(doc, stylesheets, fontResources, fontTests) {
	const fontsDetails = {
		fonts: new Map(),
		medias: new Map(),
		supports: new Map()
	};
	const stats = { rules: { processed: 0, discarded: 0 }, fonts: { processed: 0, discarded: 0 } };
	let sheetIndex = 0;
	stylesheets.forEach(stylesheetInfo => {
		const cssRules = stylesheetInfo.stylesheet.children;
		if (cssRules) {
			stats.rules.processed += cssRules.size;
			stats.rules.discarded += cssRules.size;
			if (stylesheetInfo.mediaText && stylesheetInfo.mediaText != MEDIA_ALL) {
				const mediaFontsDetails = createFontsDetailsInfo();
				fontsDetails.medias.set("media-" + sheetIndex + "-" + stylesheetInfo.mediaText, mediaFontsDetails);
				getFontsDetails(doc, cssRules, sheetIndex, mediaFontsDetails);
			} else {
				getFontsDetails(doc, cssRules, sheetIndex, fontsDetails);
			}
		}
		sheetIndex++;
	});
	processFontDetails(fontsDetails, fontResources);
	await Promise.all([...stylesheets].map(async ([, stylesheetInfo], sheetIndex) => {
		const cssRules = stylesheetInfo.stylesheet.children;
		const media = stylesheetInfo.mediaText;
		if (cssRules) {
			if (media && media != MEDIA_ALL) {
				await processFontFaceRules(cssRules, sheetIndex, fontsDetails.medias.get("media-" + sheetIndex + "-" + media), fontResources, fontTests, stats);
			} else {
				await processFontFaceRules(cssRules, sheetIndex, fontsDetails, fontResources, fontTests, stats);
			}
			stats.rules.discarded -= cssRules.size;
		}
	}));
	return stats;
}

function getFontsDetails(doc, cssRules, sheetIndex, mediaFontsDetails) {
	let mediaIndex = 0, supportsIndex = 0;
	cssRules.forEach(ruleData => {
		if (ruleData.type == "Atrule" && ruleData.name == "media" && ruleData.block && ruleData.block.children && ruleData.prelude) {
			const mediaText = cssTree.generate(ruleData.prelude);
			const fontsDetails = createFontsDetailsInfo();
			mediaFontsDetails.medias.set("media-" + sheetIndex + "-" + mediaIndex + "-" + mediaText, fontsDetails);
			mediaIndex++;
			getFontsDetails(doc, ruleData.block.children, sheetIndex, fontsDetails);
		} else if (ruleData.type == "Atrule" && ruleData.name == "supports" && ruleData.block && ruleData.block.children && ruleData.prelude) {
			const supportsText = cssTree.generate(ruleData.prelude);
			const fontsDetails = createFontsDetailsInfo();
			mediaFontsDetails.supports.set("supports-" + sheetIndex + "-" + supportsIndex + "-" + supportsText, fontsDetails);
			supportsIndex++;
			getFontsDetails(doc, ruleData.block.children, sheetIndex, fontsDetails);
		} else if (ruleData.type == "Atrule" && ruleData.name == "font-face" && ruleData.block && ruleData.block.children) {
			const fontKey = getFontKey(ruleData);
			let fontInfo = mediaFontsDetails.fonts.get(fontKey);
			if (!fontInfo) {
				fontInfo = [];
				mediaFontsDetails.fonts.set(fontKey, fontInfo);
			}
			const src = getPropertyValue(ruleData, "src");
			if (src) {
				const fontSources = src.match(REGEXP_URL_FUNCTION);
				if (fontSources) {
					fontSources.forEach(source => fontInfo.unshift(source));
				}
			}
		}
	});
}

function processFontDetails(fontsDetails, fontResources) {
	fontsDetails.fonts.forEach((fontInfo, fontKey) => {
		fontsDetails.fonts.set(fontKey, fontInfo.map(fontSource => {
			const fontFormatMatch = fontSource.match(REGEXP_FONT_FORMAT_VALUE);
			let fontFormat;
			const fontUrl = getURL(fontSource);
			if (fontFormatMatch && fontFormatMatch[1]) {
				fontFormat = fontFormatMatch[1].replace(REGEXP_SIMPLE_QUOTES_STRING, "$1").replace(REGEXP_DOUBLE_QUOTES_STRING, "$1").toLowerCase();
			}
			if (!fontFormat) {
				const fontFormatMatch = fontSource.match(REGEXP_URL_FUNCTION_WOFF);
				if (fontFormatMatch && fontFormatMatch[1]) {
					fontFormat = fontFormatMatch[1];
				} else {
					const fontFormatMatch = fontSource.match(REGEXP_URL_FUNCTION_WOFF_ALT);
					if (fontFormatMatch && fontFormatMatch[1]) {
						fontFormat = fontFormatMatch[1];
					}
				}
			}
			if (!fontFormat && fontUrl) {
				const fontFormatMatch = fontUrl.match(REGEXP_FONT_FORMAT);
				if (fontFormatMatch && fontFormatMatch[1]) {
					fontFormat = fontFormatMatch[1];
				}
			}
			const fontResource = Array.from(fontResources.values()).find(info => info.name == fontUrl);
			return { src: fontSource.match(REGEXP_FONT_SRC)[1], fontUrl, format: fontFormat, contentType: fontResource && fontResource.contentType };
		}));
	});
	fontsDetails.medias.forEach(mediaFontsDetails => processFontDetails(mediaFontsDetails, fontResources));
	fontsDetails.supports.forEach(supportsFontsDetails => processFontDetails(supportsFontsDetails, fontResources));
}

async function processFontFaceRules(cssRules, sheetIndex, fontsDetails, fontResources, fontTests, stats) {
	const removedRules = [];
	let mediaIndex = 0, supportsIndex = 0;
	for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
		const ruleData = cssRule.data;
		if (ruleData.type == "Atrule" && ruleData.name == "media" && ruleData.block && ruleData.block.children && ruleData.prelude) {
			const mediaText = cssTree.generate(ruleData.prelude);
			await processFontFaceRules(ruleData.block.children, sheetIndex, fontsDetails.medias.get("media-" + sheetIndex + "-" + mediaIndex + "-" + mediaText), fontResources, fontTests, stats);
			mediaIndex++;
		} else if (ruleData.type == "Atrule" && ruleData.name == "supports" && ruleData.block && ruleData.block.children && ruleData.prelude) {
			const supportsText = cssTree.generate(ruleData.prelude);
			await processFontFaceRules(ruleData.block.children, sheetIndex, fontsDetails.supports.get("supports-" + sheetIndex + "-" + supportsIndex + "-" + supportsText), fontResources, fontTests, stats);
			supportsIndex++;
		} else if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
			const key = getFontKey(ruleData);
			const fontInfo = fontsDetails.fonts.get(key);
			if (fontInfo) {
				fontsDetails.fonts.delete(key);
				await processFontFaceRule(ruleData, fontInfo, fontResources, fontTests, stats);
			} else {
				removedRules.push(cssRule);
			}
		}
	}
	removedRules.forEach(cssRule => cssRules.remove(cssRule));
}

async function processFontFaceRule(ruleData, fontInfo, fontResources, fontTests, stats) {
	await Promise.all(fontInfo.map(async source => {
		if (fontTests.has(source.src)) {
			source.valid = fontTests.get(source.src);
		} else {
			if (FontFace && source.fontUrl) {
				const resourceEntry = [...fontResources].find(([, resource]) => source.fontUrl && resource.name == source.fontUrl);
				if (resourceEntry) {
					const resource = resourceEntry[1];
					const fontFace = new FontFace("test-font", new Uint8Array(resource.content).buffer);
					try {
						let timeout;
						await Promise.race([
							fontFace.load().then(() => fontFace.loaded).then(() => { source.valid = true; globalThis.clearTimeout(timeout); }),
							new Promise(resolve => timeout = globalThis.setTimeout(() => { source.valid = true; resolve(); }, FONT_MAX_LOAD_DELAY))
						]);
					} catch (error) {
						const fontFace = new FontFace("test-font", "url(" + resource.url + ")");
						try {
							let timeout;
							await Promise.race([
								fontFace.load().then(() => fontFace.loaded).then(() => { source.valid = true; globalThis.clearTimeout(timeout); }),
								new Promise(resolve => timeout = globalThis.setTimeout(() => { source.valid = true; resolve(); }, FONT_MAX_LOAD_DELAY))
							]);
						} catch (error) {
							// ignored
						}
					}
				} else {
					source.valid = true;
				}
			} else {
				source.valid = true;
			}
			fontTests.set(source.src, source.valid);
		}
	}));
	const findSourceByFormat = (fontFormat, testValidity) => fontInfo.find(source => !source.src.match(EMPTY_URL_SOURCE) && source.format == fontFormat && (!testValidity || source.valid));
	const findSourceByContentType = (contentType, testValidity) => fontInfo.find(source => !source.src.match(EMPTY_URL_SOURCE) && source.contentType == contentType && (!testValidity || source.valid));
	const filterSources = fontSource => fontInfo.filter(source => source == fontSource || source.src.startsWith(LOCAL_SOURCE));
	stats.fonts.processed += fontInfo.length;
	stats.fonts.discarded += fontInfo.length;
	const woffFontFound =
		findSourceByFormat("woff2-variations", true) || findSourceByFormat("woff2", true) || findSourceByFormat("woff", true) ||
		findSourceByContentType("font/woff2", true) || findSourceByContentType("font/woff", true) || findSourceByContentType("application/font-woff", true) || findSourceByContentType("application/x-font-woff", true);
	if (woffFontFound) {
		fontInfo = filterSources(woffFontFound);
	} else {
		const ttfFontFound =
			findSourceByFormat("truetype-variations", true) || findSourceByFormat("truetype", true) ||
			findSourceByContentType("font/ttf", true) || findSourceByContentType("application/x-font-ttf", true) || findSourceByContentType("application/x-font-ttf", true) || findSourceByContentType("application/x-font-truetype", true);
		if (ttfFontFound) {
			fontInfo = filterSources(ttfFontFound);
		} else {
			const otfFontFound =
				findSourceByFormat("opentype") || findSourceByFormat("embedded-opentype") ||
				findSourceByContentType("font/otf") || findSourceByContentType("application/x-font-opentype") || findSourceByContentType("application/font-sfnt");
			if (otfFontFound) {
				fontInfo = filterSources(otfFontFound);
			} else {
				fontInfo = fontInfo.filter(source => !source.src.match(EMPTY_URL_SOURCE) && (source.valid) || source.src.startsWith(LOCAL_SOURCE));
			}
		}
	}
	stats.fonts.discarded -= fontInfo.length;
	const removedNodes = [];
	for (let node = ruleData.block.children.head; node; node = node.next) {
		if (node.data.property == "src") {
			removedNodes.push(node);
		}
	}
	removedNodes.pop();
	removedNodes.forEach(node => ruleData.block.children.remove(node));
	const srcDeclaration = ruleData.block.children.filter(node => node.property == "src").tail;
	if (srcDeclaration) {
		fontInfo.reverse();
		try {
			srcDeclaration.data.value = cssTree.parse(fontInfo.map(fontSource => fontSource.src).join(","), { context: "value", parseCustomProperty: true });
		}
		catch (error) {
			// ignored
		}
	}
}

function getPropertyValue(ruleData, propertyName) {
	let property;
	if (ruleData.block.children) {
		property = ruleData.block.children.filter(node => {
			try {
				return node.property == propertyName && !cssTree.generate(node.value).match(/\\9$/);
			} catch (error) {
				return node.property == propertyName;
			}
		}).tail;
	}
	if (property) {
		try {
			return cssTree.generate(property.data.value);
		} catch (error) {
			// ignored
		}
	}
}

function getFontKey(ruleData) {
	return JSON.stringify([
		normalizeFontFamily(getPropertyValue(ruleData, "font-family")),
		getFontWeight(getPropertyValue(ruleData, "font-weight") || "400"),
		getPropertyValue(ruleData, "font-style") || "normal",
		getPropertyValue(ruleData, "unicode-range"),
		getFontStretch(getPropertyValue(ruleData, "font-stretch")),
		getPropertyValue(ruleData, "font-variant") || "normal",
		getPropertyValue(ruleData, "font-feature-settings"),
		getPropertyValue(ruleData, "font-variation-settings")
	]);
}

function getFontStretch(stretch) {
	return FONT_STRETCHES[stretch] || stretch;
}

function createFontsDetailsInfo() {
	return {
		fonts: new Map(),
		medias: new Map(),
		supports: new Map()
	};
}

function getURL(urlFunction) {
	urlFunction = urlFunction.replace(/url\(-sf-url-original\\\(\\"(.*?)\\"\\\)\\ /g, "");
	const urlMatch = urlFunction.match(REGEXP_URL_SIMPLE_QUOTES_FN) ||
		urlFunction.match(REGEXP_URL_DOUBLE_QUOTES_FN) ||
		urlFunction.match(REGEXP_URL_NO_QUOTES_FN);
	return urlMatch && urlMatch[1];
}
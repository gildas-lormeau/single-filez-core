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

/* global globalThis, CustomEvent */

import * as cssUnescape from "../vendor/css-unescape.js";
import * as hooksFrames from "../processors/hooks/content/content-hooks-frames.js";
import * as infobar from "./infobar.js";

const ON_BEFORE_CAPTURE_EVENT_NAME = "single-filez-on-before-capture";
const ON_AFTER_CAPTURE_EVENT_NAME = "single-filez-on-after-capture";
const GET_ADOPTED_STYLESHEETS_REQUEST_EVENT = "single-filez-request-get-adopted-stylesheets";
const GET_ADOPTED_STYLESHEETS_RESPONSE_EVENT = "single-filez-response-get-adopted-stylesheets";
const UNREGISTER_GET_ADOPTED_STYLESHEETS_REQUEST_EVENT = "single-filez-unregister-request-get-adopted-stylesheets";
const REMOVED_CONTENT_ATTRIBUTE_NAME = "data-single-filez-removed-content";
const HIDDEN_CONTENT_ATTRIBUTE_NAME = "data-single-filez-hidden-content";
const KEPT_CONTENT_ATTRIBUTE_NAME = "data-single-filez-kept-content";
const HIDDEN_FRAME_ATTRIBUTE_NAME = "data-single-filez-hidden-frame";
const PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME = "data-single-filez-preserved-space-element";
const SHADOW_ROOT_ATTRIBUTE_NAME = "data-single-filez-shadow-root-element";
const WIN_ID_ATTRIBUTE_NAME = "data-single-filez-win-id";
const IMAGE_ATTRIBUTE_NAME = "data-single-filez-image";
const POSTER_ATTRIBUTE_NAME = "data-single-filez-poster";
const VIDEO_ATTRIBUTE_NAME = "data-single-filez-video";
const CANVAS_ATTRIBUTE_NAME = "data-single-filez-canvas";
const STYLE_ATTRIBUTE_NAME = "data-single-filez-movable-style";
const INPUT_VALUE_ATTRIBUTE_NAME = "data-single-filez-input-value";
const LAZY_SRC_ATTRIBUTE_NAME = "data-single-filez-lazy-loaded-src";
const STYLESHEET_ATTRIBUTE_NAME = "data-single-filez-stylesheet";
const DISABLED_NOSCRIPT_ATTRIBUTE_NAME = "data-single-filez-disabled-noscript";
const SELECTED_CONTENT_ATTRIBUTE_NAME = "data-single-filez-selected-content";
const INVALID_ELEMENT_ATTRIBUTE_NAME = "data-single-filez-invalid-element";
const ASYNC_SCRIPT_ATTRIBUTE_NAME = "data-single-filez-async-script";
const FLOW_ELEMENTS_SELECTOR = "*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)";
const KEPT_TAG_NAMES = ["NOSCRIPT", "DISABLED-NOSCRIPT", "META", "LINK", "STYLE", "TITLE", "TEMPLATE", "SOURCE", "OBJECT", "SCRIPT", "HEAD", "BODY"];
const REGEXP_SIMPLE_QUOTES_STRING = /^'(.*?)'$/;
const REGEXP_DOUBLE_QUOTES_STRING = /^"(.*?)"$/;
const FONT_WEIGHTS = {
	regular: "400",
	normal: "400",
	bold: "700",
	bolder: "700",
	lighter: "100"
};
const COMMENT_HEADER = "Page saved with SingleFileZ";
const SINGLE_FILE_UI_ELEMENT_CLASS = "single-file-ui-element";
const INFOBAR_TAGNAME = infobar.INFOBAR_TAGNAME;
const EMPTY_RESOURCE = "data:,";
const addEventListener = (type, listener, options) => globalThis.addEventListener(type, listener, options);
const dispatchEvent = event => { try { globalThis.dispatchEvent(event); } catch (error) {  /* ignored */ } };
const JSON = globalThis.JSON;

export {
	initUserScriptHandler,
	initDoc,
	preProcessDoc,
	postProcessDoc,
	serialize,
	removeQuotes,
	flatten,
	getFontWeight,
	normalizeFontFamily,
	getShadowRoot,
	appendInfobar,
	ON_BEFORE_CAPTURE_EVENT_NAME,
	ON_AFTER_CAPTURE_EVENT_NAME,
	WIN_ID_ATTRIBUTE_NAME,
	PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME,
	REMOVED_CONTENT_ATTRIBUTE_NAME,
	HIDDEN_CONTENT_ATTRIBUTE_NAME,
	HIDDEN_FRAME_ATTRIBUTE_NAME,
	IMAGE_ATTRIBUTE_NAME,
	POSTER_ATTRIBUTE_NAME,
	VIDEO_ATTRIBUTE_NAME,
	CANVAS_ATTRIBUTE_NAME,
	INPUT_VALUE_ATTRIBUTE_NAME,
	SHADOW_ROOT_ATTRIBUTE_NAME,
	STYLE_ATTRIBUTE_NAME,
	LAZY_SRC_ATTRIBUTE_NAME,
	STYLESHEET_ATTRIBUTE_NAME,
	SELECTED_CONTENT_ATTRIBUTE_NAME,
	INVALID_ELEMENT_ATTRIBUTE_NAME,
	ASYNC_SCRIPT_ATTRIBUTE_NAME,
	COMMENT_HEADER,
	SINGLE_FILE_UI_ELEMENT_CLASS,
	EMPTY_RESOURCE,
	INFOBAR_TAGNAME
};

function initUserScriptHandler() {
	addEventListener("single-filez-user-script-init", () => globalThis._singleFileZ_waitForUserScript = async eventPrefixName => {
		const event = new CustomEvent(eventPrefixName + "-request", { cancelable: true });
		const promiseResponse = new Promise(resolve => addEventListener(eventPrefixName + "-response", resolve));
		dispatchEvent(event);
		if (event.defaultPrevented) {
			await promiseResponse;
		}
	});
}

function initDoc(doc) {
	doc.querySelectorAll("meta[http-equiv=refresh]").forEach(element => {
		element.removeAttribute("http-equiv");
		element.setAttribute("disabled-http-equiv", "refresh");
	});
}

function preProcessDoc(doc, win, options) {
	doc.querySelectorAll("noscript:not([" + DISABLED_NOSCRIPT_ATTRIBUTE_NAME + "])").forEach(element => {
		element.setAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME, element.textContent);
		element.textContent = "";
	});
	initDoc(doc);
	if (doc.head) {
		doc.head.querySelectorAll(FLOW_ELEMENTS_SELECTOR).forEach(element => element.hidden = true);
	}
	doc.querySelectorAll("svg foreignObject").forEach(element => {
		const flowElements = element.querySelectorAll("html > head > " + FLOW_ELEMENTS_SELECTOR + ", html > body > " + FLOW_ELEMENTS_SELECTOR);
		if (flowElements.length) {
			Array.from(element.childNodes).forEach(node => node.remove());
			flowElements.forEach(flowElement => element.appendChild(flowElement));
		}
	});
	const invalidElements = new Map();
	let elementsInfo;
	if (win && doc.documentElement) {
		doc.querySelectorAll("button button, a a").forEach(element => {
			const placeHolderElement = doc.createElement("template");
			placeHolderElement.setAttribute(INVALID_ELEMENT_ATTRIBUTE_NAME, "");
			placeHolderElement.content.appendChild(element.cloneNode(true));
			invalidElements.set(element, placeHolderElement);
			element.replaceWith(placeHolderElement);
		});
		elementsInfo = getElementsInfo(win, doc, doc.documentElement, options);
		if (options.moveStylesInHead) {
			doc.querySelectorAll("body style, body ~ style").forEach(element => {
				const computedStyle = getComputedStyle(win, element);
				if (computedStyle && testHiddenElement(element, computedStyle)) {
					element.setAttribute(STYLE_ATTRIBUTE_NAME, "");
					elementsInfo.markedElements.push(element);
				}
			});
		}
	} else {
		elementsInfo = {
			canvases: [],
			images: [],
			posters: [],
			videos: [],
			usedFonts: [],
			shadowRoots: [],
			markedElements: []
		};
	}
	return {
		canvases: elementsInfo.canvases,
		fonts: getFontsData(doc),
		stylesheets: getStylesheetsData(doc),
		images: elementsInfo.images,
		posters: elementsInfo.posters,
		videos: elementsInfo.videos,
		usedFonts: Array.from(elementsInfo.usedFonts.values()),
		shadowRoots: elementsInfo.shadowRoots,
		referrer: doc.referrer,
		markedElements: elementsInfo.markedElements,
		invalidElements,
		scrollPosition: { x: win.scrollX, y: win.scrollY },
		adoptedStyleSheets: getStylesheetsContent(doc.adoptedStyleSheets)
	};
}

function getElementsInfo(win, doc, element, options, data = { usedFonts: new Map(), canvases: [], images: [], posters: [], videos: [], shadowRoots: [], markedElements: [] }, ascendantHidden) {
	if (element.childNodes) {
		const elements = Array.from(element.childNodes).filter(node => (node instanceof win.HTMLElement) || (node instanceof win.SVGElement));
		elements.forEach(element => {
			let elementHidden, elementKept, computedStyle;
			if (options.removeHiddenElements || options.removeUnusedFonts || options.compressHTML) {
				computedStyle = getComputedStyle(win, element);
				if (element instanceof win.HTMLElement) {
					if (options.removeHiddenElements) {
						elementKept = ((ascendantHidden || element.closest("html > head")) && KEPT_TAG_NAMES.includes(element.tagName.toUpperCase())) || element.closest("details");
						if (!elementKept) {
							elementHidden = ascendantHidden || testHiddenElement(element, computedStyle);
							if (elementHidden) {
								element.setAttribute(HIDDEN_CONTENT_ATTRIBUTE_NAME, "");
								data.markedElements.push(element);
							}
						}
					}
				}
				if (!elementHidden) {
					if (options.compressHTML && computedStyle) {
						const whiteSpace = computedStyle.getPropertyValue("white-space");
						if (whiteSpace && whiteSpace.startsWith("pre")) {
							element.setAttribute(PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME, "");
							data.markedElements.push(element);
						}
					}
					if (options.removeUnusedFonts) {
						getUsedFont(computedStyle, options, data.usedFonts);
						getUsedFont(getComputedStyle(win, element, ":first-letter"), options, data.usedFonts);
						getUsedFont(getComputedStyle(win, element, ":before"), options, data.usedFonts);
						getUsedFont(getComputedStyle(win, element, ":after"), options, data.usedFonts);
					}
				}
			}
			getResourcesInfo(win, doc, element, options, data, elementHidden, computedStyle);
			const shadowRoot = !(element instanceof win.SVGElement) && getShadowRoot(element);
			if (shadowRoot && !element.classList.contains(SINGLE_FILE_UI_ELEMENT_CLASS)) {
				const shadowRootInfo = {};
				element.setAttribute(SHADOW_ROOT_ATTRIBUTE_NAME, data.shadowRoots.length);
				data.markedElements.push(element);
				data.shadowRoots.push(shadowRootInfo);
				try {
					if (shadowRoot.adoptedStyleSheets) {
						if (shadowRoot.adoptedStyleSheets.length) {
							shadowRootInfo.adoptedStyleSheets = getStylesheetsContent(shadowRoot.adoptedStyleSheets);
						} else if (shadowRoot.adoptedStyleSheets.length === undefined) {
							const listener = event => shadowRootInfo.adoptedStyleSheets = event.detail.adoptedStyleSheets;
							element.addEventListener(GET_ADOPTED_STYLESHEETS_RESPONSE_EVENT, listener);
							element.dispatchEvent(new CustomEvent(GET_ADOPTED_STYLESHEETS_REQUEST_EVENT, { bubbles: true }));
							element.removeEventListener(GET_ADOPTED_STYLESHEETS_RESPONSE_EVENT, listener);
						}
					}
				} catch (error) {
					// ignored
				}
				getElementsInfo(win, doc, shadowRoot, options, data, elementHidden);
				shadowRootInfo.content = shadowRoot.innerHTML;
				shadowRootInfo.mode = shadowRoot.mode;
				try {
					if (shadowRoot.adoptedStyleSheets && shadowRoot.adoptedStyleSheets.length === undefined) {
						element.dispatchEvent(new CustomEvent(UNREGISTER_GET_ADOPTED_STYLESHEETS_REQUEST_EVENT, { bubbles: true }));
					}
				} catch (error) {
					// ignored
				}
			}
			getElementsInfo(win, doc, element, options, data, elementHidden);
			if (!options.autoSaveExternalSave && options.removeHiddenElements && ascendantHidden) {
				if (elementKept || element.getAttribute(KEPT_CONTENT_ATTRIBUTE_NAME) == "") {
					if (element.parentElement) {
						element.parentElement.setAttribute(KEPT_CONTENT_ATTRIBUTE_NAME, "");
						data.markedElements.push(element.parentElement);
					}
				} else if (elementHidden) {
					element.setAttribute(REMOVED_CONTENT_ATTRIBUTE_NAME, "");
					data.markedElements.push(element);
				}
			}
		});
	}
	return data;
}

function getStylesheetsContent(styleSheets) {
	return styleSheets ? Array.from(styleSheets).map(stylesheet => Array.from(stylesheet.cssRules).map(cssRule => cssRule.cssText).join("\n")) : [];
}

function getResourcesInfo(win, doc, element, options, data, elementHidden, computedStyle) {
	const tagName = element.tagName && element.tagName.toUpperCase();
	if (tagName == "CANVAS") {
		try {
			data.canvases.push({
				dataURI: element.toDataURL("image/png", ""),
				backgroundColor: computedStyle.getPropertyValue("background-color")
			});
			element.setAttribute(CANVAS_ATTRIBUTE_NAME, data.canvases.length - 1);
			data.markedElements.push(element);
		} catch (error) {
			// ignored
		}
	}
	if (tagName == "IMG") {
		const imageData = {
			currentSrc: elementHidden ?
				EMPTY_RESOURCE :
				(options.loadDeferredImages && element.getAttribute(LAZY_SRC_ATTRIBUTE_NAME)) || element.currentSrc
		};
		data.images.push(imageData);
		element.setAttribute(IMAGE_ATTRIBUTE_NAME, data.images.length - 1);
		data.markedElements.push(element);
		element.removeAttribute(LAZY_SRC_ATTRIBUTE_NAME);
	}
	if (tagName == "VIDEO") {
		const src = element.currentSrc;
		if (src && !src.startsWith("blob:") && !src.startsWith("data:")) {
			const computedStyle = getComputedStyle(win, element.parentNode);
			data.videos.push({
				positionParent: computedStyle && computedStyle.getPropertyValue("position"),
				src,
				size: {
					pxWidth: element.clientWidth,
					pxHeight: element.clientHeight
				},
				currentTime: element.currentTime
			});
			element.setAttribute(VIDEO_ATTRIBUTE_NAME, data.videos.length - 1);
		}
		if (!element.getAttribute("poster")) {
			const canvasElement = doc.createElement("canvas");
			const context = canvasElement.getContext("2d");
			canvasElement.width = element.clientWidth;
			canvasElement.height = element.clientHeight;
			try {
				context.drawImage(element, 0, 0, canvasElement.width, canvasElement.height);
				data.posters.push(canvasElement.toDataURL("image/png", ""));
				element.setAttribute(POSTER_ATTRIBUTE_NAME, data.posters.length - 1);
				data.markedElements.push(element);
			} catch (error) {
				// ignored
			}
		}
	}
	if (tagName == "IFRAME") {
		if (elementHidden && options.removeHiddenElements) {
			element.setAttribute(HIDDEN_FRAME_ATTRIBUTE_NAME, "");
			data.markedElements.push(element);
		}
	}
	if (tagName == "INPUT") {
		if (element.type != "password") {
			element.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, element.value);
			data.markedElements.push(element);
		}
		if (element.type == "radio" || element.type == "checkbox") {
			element.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, element.checked);
			data.markedElements.push(element);
		}
	}
	if (tagName == "TEXTAREA") {
		element.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, element.value);
		data.markedElements.push(element);
	}
	if (tagName == "SELECT") {
		element.querySelectorAll("option").forEach(option => {
			if (option.selected) {
				option.setAttribute(INPUT_VALUE_ATTRIBUTE_NAME, "");
				data.markedElements.push(option);
			}
		});
	}
	if (tagName == "SCRIPT") {
		if (element.async && element.getAttribute("async") != "" && element.getAttribute("async") != "async") {
			element.setAttribute(ASYNC_SCRIPT_ATTRIBUTE_NAME, "");
			data.markedElements.push(element);
		}
		element.textContent = element.textContent.replace(/<\/script>/gi, "<\\/script>");
	}
}

function getUsedFont(computedStyle, options, usedFonts) {
	if (computedStyle) {
		const fontStyle = computedStyle.getPropertyValue("font-style") || "normal";
		computedStyle.getPropertyValue("font-family").split(",").forEach(fontFamilyName => {
			fontFamilyName = normalizeFontFamily(fontFamilyName);
			if (!options.loadedFonts || options.loadedFonts.find(font => normalizeFontFamily(font.family) == fontFamilyName && font.style == fontStyle)) {
				const fontWeight = getFontWeight(computedStyle.getPropertyValue("font-weight"));
				const fontVariant = computedStyle.getPropertyValue("font-variant") || "normal";
				const value = [fontFamilyName, fontWeight, fontStyle, fontVariant];
				usedFonts.set(JSON.stringify(value), [fontFamilyName, fontWeight, fontStyle, fontVariant]);
			}
		});
	}
}

function getShadowRoot(element) {
	const chrome = globalThis.chrome;
	if (element.openOrClosedShadowRoot) {
		return element.openOrClosedShadowRoot;
	} else if (chrome && chrome.dom && chrome.dom.openOrClosedShadowRoot) {
		try {
			return chrome.dom.openOrClosedShadowRoot(element);
		} catch (error) {
			return element.shadowRoot;
		}
	} else {
		return element.shadowRoot;
	}
}

function appendInfobar(doc, options, useShadowRoot) {
	return infobar.appendInfobar(doc, options, useShadowRoot);
}

function normalizeFontFamily(fontFamilyName = "") {
	return removeQuotes(cssUnescape.process(fontFamilyName.trim())).toLowerCase();
}

function testHiddenElement(element, computedStyle) {
	let hidden = false;
	if (computedStyle) {
		const display = computedStyle.getPropertyValue("display");
		const opacity = computedStyle.getPropertyValue("opacity");
		const visibility = computedStyle.getPropertyValue("visibility");
		hidden = display == "none";
		if (!hidden && (opacity == "0" || visibility == "hidden") && element.getBoundingClientRect) {
			const boundingRect = element.getBoundingClientRect();
			hidden = !boundingRect.width && !boundingRect.height;
		}
	}
	return Boolean(hidden);
}

function postProcessDoc(doc, markedElements, invalidElements) {
	doc.querySelectorAll("[" + DISABLED_NOSCRIPT_ATTRIBUTE_NAME + "]").forEach(element => {
		element.textContent = element.getAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME);
		element.removeAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME);
		if (doc.body.firstChild) {
			doc.body.insertBefore(element, doc.body.firstChild);
		} else {
			doc.body.appendChild(element);
		}
	});
	doc.querySelectorAll("meta[disabled-http-equiv]").forEach(element => {
		element.setAttribute("http-equiv", element.getAttribute("disabled-http-equiv"));
		element.removeAttribute("disabled-http-equiv");
	});
	if (doc.head) {
		doc.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach(element => element.removeAttribute("hidden"));
	}
	if (!markedElements) {
		const singleFileAttributes = [REMOVED_CONTENT_ATTRIBUTE_NAME, HIDDEN_FRAME_ATTRIBUTE_NAME, HIDDEN_CONTENT_ATTRIBUTE_NAME, PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME, IMAGE_ATTRIBUTE_NAME, POSTER_ATTRIBUTE_NAME, VIDEO_ATTRIBUTE_NAME, CANVAS_ATTRIBUTE_NAME, INPUT_VALUE_ATTRIBUTE_NAME, SHADOW_ROOT_ATTRIBUTE_NAME, STYLESHEET_ATTRIBUTE_NAME, ASYNC_SCRIPT_ATTRIBUTE_NAME];
		markedElements = doc.querySelectorAll(singleFileAttributes.map(name => "[" + name + "]").join(","));
	}
	markedElements.forEach(element => {
		element.removeAttribute(REMOVED_CONTENT_ATTRIBUTE_NAME);
		element.removeAttribute(HIDDEN_CONTENT_ATTRIBUTE_NAME);
		element.removeAttribute(KEPT_CONTENT_ATTRIBUTE_NAME);
		element.removeAttribute(HIDDEN_FRAME_ATTRIBUTE_NAME);
		element.removeAttribute(PRESERVED_SPACE_ELEMENT_ATTRIBUTE_NAME);
		element.removeAttribute(IMAGE_ATTRIBUTE_NAME);
		element.removeAttribute(POSTER_ATTRIBUTE_NAME);
		element.removeAttribute(VIDEO_ATTRIBUTE_NAME);
		element.removeAttribute(CANVAS_ATTRIBUTE_NAME);
		element.removeAttribute(INPUT_VALUE_ATTRIBUTE_NAME);
		element.removeAttribute(SHADOW_ROOT_ATTRIBUTE_NAME);
		element.removeAttribute(STYLESHEET_ATTRIBUTE_NAME);
		element.removeAttribute(ASYNC_SCRIPT_ATTRIBUTE_NAME);
		element.removeAttribute(STYLE_ATTRIBUTE_NAME);
	});
	if (invalidElements) {
		invalidElements.forEach((placeholderElement, element) => placeholderElement.replaceWith(element));
	}
}

function getStylesheetsData(doc) {
	if (doc) {
		const contents = [];
		doc.querySelectorAll("style").forEach((styleElement, styleIndex) => {
			try {
				const tempStyleElement = doc.createElement("style");
				tempStyleElement.textContent = styleElement.textContent;
				doc.body.appendChild(tempStyleElement);
				const stylesheet = tempStyleElement.sheet;
				tempStyleElement.remove();
				if (!stylesheet || stylesheet.cssRules.length != styleElement.sheet.cssRules.length) {
					styleElement.setAttribute(STYLESHEET_ATTRIBUTE_NAME, styleIndex);
					contents[styleIndex] = Array.from(styleElement.sheet.cssRules).map(cssRule => cssRule.cssText).join("\n");
				}
			} catch (error) {
				// ignored
			}
		});
		return contents;
	}
}

function getFontsData() {
	return hooksFrames.getFontsData();
}

function serialize(doc) {
	const docType = doc.doctype;
	let docTypeString = "";
	if (docType) {
		docTypeString = "<!DOCTYPE " + docType.nodeName;
		if (docType.publicId) {
			docTypeString += " PUBLIC \"" + docType.publicId + "\"";
			if (docType.systemId) {
				docTypeString += " \"" + docType.systemId + "\"";
			}
		} else if (docType.systemId) {
			docTypeString += " SYSTEM \"" + docType.systemId + "\"";
		} if (docType.internalSubset) {
			docTypeString += " [" + docType.internalSubset + "]";
		}
		docTypeString += "> ";
	}
	return docTypeString + doc.documentElement.outerHTML;
}

function removeQuotes(string) {
	if (string.match(REGEXP_SIMPLE_QUOTES_STRING)) {
		string = string.replace(REGEXP_SIMPLE_QUOTES_STRING, "$1");
	} else {
		string = string.replace(REGEXP_DOUBLE_QUOTES_STRING, "$1");
	}
	return string.trim();
}

function getFontWeight(weight) {
	return FONT_WEIGHTS[weight.toLowerCase().trim()] || weight;
}

function flatten(array) {
	return array.flat ? array.flat() : array.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}

function getComputedStyle(win, element, pseudoElement) {
	try {
		return win.getComputedStyle(element, pseudoElement);
	} catch (error) {
		// ignored
	}
}
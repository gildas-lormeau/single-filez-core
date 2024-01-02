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

/* global globalThis, window */

const LOAD_DEFERRED_IMAGES_START_EVENT = "single-filez-load-deferred-images-start";
const LOAD_DEFERRED_IMAGES_END_EVENT = "single-filez-load-deferred-images-end";
const LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_START_EVENT = "single-filez-load-deferred-images-keep-zoom-level-start";
const LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_END_EVENT = "single-filez-load-deferred-images-keep-zoom-level-end";
const LOAD_DEFERRED_IMAGES_RESET_ZOOM_LEVEL_EVENT = "single-filez-load-deferred-images-keep-zoom-level-reset";
const LOAD_DEFERRED_IMAGES_RESET_EVENT = "single-filez-load-deferred-images-reset";
const BLOCK_COOKIES_START_EVENT = "single-filez-block-cookies-start";
const BLOCK_COOKIES_END_EVENT = "single-filez-block-cookies-end";
const DISPATCH_SCROLL_START_EVENT = "single-filez-dispatch-scroll-event-start";
const DISPATCH_SCROLL_END_EVENT = "single-filez-dispatch-scroll-event-end";
const BLOCK_STORAGE_START_EVENT = "single-filez-block-storage-start";
const BLOCK_STORAGE_END_EVENT = "single-filez-block-storage-end";
const LOAD_IMAGE_EVENT = "single-filez-load-image";
const IMAGE_LOADED_EVENT = "single-filez-image-loaded";
const NEW_FONT_FACE_EVENT = "single-filez-new-font-face";
const DELETE_FONT_EVENT = "single-filez-delete-font";
const CLEAR_FONTS_EVENT = "single-filez-clear-fonts";
const FONT_FACE_PROPERTY_NAME = "_singleFileZ_fontFaces";

const CustomEvent = globalThis.CustomEvent;
const document = globalThis.document;
const Document = globalThis.Document;
const JSON = globalThis.JSON;
const MutationObserver = globalThis.MutationObserver;

let fontFaces;
if (window[FONT_FACE_PROPERTY_NAME]) {
	fontFaces = window[FONT_FACE_PROPERTY_NAME];
} else {
	fontFaces = window[FONT_FACE_PROPERTY_NAME] = new Map();
}

init();
new MutationObserver(init).observe(document, { childList: true });

function init() {
	if (document instanceof Document) {
		document.addEventListener(NEW_FONT_FACE_EVENT, event => {
			const detail = event.detail;
			const key = Object.assign({}, detail);
			delete key.src;
			fontFaces.set(JSON.stringify(key), detail);
		});
		document.addEventListener(DELETE_FONT_EVENT, event => {
			const detail = event.detail;
			const key = Object.assign({}, detail);
			delete key.src;
			fontFaces.delete(JSON.stringify(key));
		});
		document.addEventListener(CLEAR_FONTS_EVENT, () => fontFaces = new Map());
	}
}

export {
	getFontsData,
	loadDeferredImagesStart,
	loadDeferredImagesEnd,
	loadDeferredImagesResetZoomLevel,
	LOAD_IMAGE_EVENT,
	IMAGE_LOADED_EVENT
};

function getFontsData() {
	return Array.from(fontFaces.values());
}

function loadDeferredImagesStart(options) {
	if (options.loadDeferredImagesBlockCookies) {
		document.dispatchEvent(new CustomEvent(BLOCK_COOKIES_START_EVENT));
	}
	if (options.loadDeferredImagesBlockStorage) {
		document.dispatchEvent(new CustomEvent(BLOCK_STORAGE_START_EVENT));
	}
	if (options.loadDeferredImagesDispatchScrollEvent) {
		document.dispatchEvent(new CustomEvent(DISPATCH_SCROLL_START_EVENT));
	}
	if (options.loadDeferredImagesKeepZoomLevel) {
		document.dispatchEvent(new CustomEvent(LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_START_EVENT));
	} else {
		document.dispatchEvent(new CustomEvent(LOAD_DEFERRED_IMAGES_START_EVENT));
	}
}

function loadDeferredImagesEnd(options) {
	if (options.loadDeferredImagesBlockCookies) {
		document.dispatchEvent(new CustomEvent(BLOCK_COOKIES_END_EVENT));
	}
	if (options.loadDeferredImagesBlockStorage) {
		document.dispatchEvent(new CustomEvent(BLOCK_STORAGE_END_EVENT));
	}
	if (options.loadDeferredImagesDispatchScrollEvent) {
		document.dispatchEvent(new CustomEvent(DISPATCH_SCROLL_END_EVENT));
	}
	if (options.loadDeferredImagesKeepZoomLevel) {
		document.dispatchEvent(new CustomEvent(LOAD_DEFERRED_IMAGES_KEEP_ZOOM_LEVEL_END_EVENT));
	} else {
		document.dispatchEvent(new CustomEvent(LOAD_DEFERRED_IMAGES_END_EVENT));
	}
}

function loadDeferredImagesResetZoomLevel(options) {
	if (options.loadDeferredImagesKeepZoomLevel) {
		document.dispatchEvent(new CustomEvent(LOAD_DEFERRED_IMAGES_RESET_ZOOM_LEVEL_EVENT));
	} else {
		document.dispatchEvent(new CustomEvent(LOAD_DEFERRED_IMAGES_RESET_EVENT));
	}
}
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

import * as cssTree from "./../vendor/css-tree.js";
import * as fontPropertyParser from "./../vendor/css-font-property-parser.js";
import {
	normalizeFontFamily,
	flatten,
	getFontWeight,
	removeQuotes
} from "./../single-file-helper.js";

const helper = {
	normalizeFontFamily,
	flatten,
	getFontWeight,
	removeQuotes
};

const REGEXP_COMMA = /\s*,\s*/;
const REGEXP_DASH = /-/;
const REGEXP_QUESTION_MARK = /\?/g;
const REGEXP_STARTS_U_PLUS = /^U\+/i;
const VALID_FONT_STYLES = [/^normal$/, /^italic$/, /^oblique$/, /^oblique\s+/];

export {
	process
};

function process(doc, stylesheets, styles, options) {
	const stats = { rules: { processed: 0, discarded: 0 }, fonts: { processed: 0, discarded: 0 } };
	const fontsInfo = { declared: [], used: [] };
	const workStyleElement = doc.createElement("style");
	let docContent = "";
	doc.body.appendChild(workStyleElement);
	stylesheets.forEach(stylesheetInfo => {
		const cssRules = stylesheetInfo.stylesheet.children;
		if (cssRules) {
			stats.processed += cssRules.size;
			stats.discarded += cssRules.size;
			getFontsInfo(cssRules, fontsInfo);
			docContent = getRulesTextContent(doc, cssRules, workStyleElement, docContent);
		}
	});
	styles.forEach(declarations => {
		const fontFamilyNames = getFontFamilyNames(declarations);
		if (fontFamilyNames.length) {
			fontsInfo.used.push(fontFamilyNames);
		}
		docContent = getDeclarationsTextContent(declarations.children, workStyleElement, docContent);
	});
	workStyleElement.remove();
	docContent += doc.body.innerText;
	if (globalThis.getComputedStyle && options.doc) {
		fontsInfo.used = fontsInfo.used.map(fontNames => fontNames.map(familyName => {
			const matchedVar = familyName.match(/^var\((--.*)\)$/);
			if (matchedVar && matchedVar[1]) {
				const computedFamilyName = globalThis.getComputedStyle(options.doc.body).getPropertyValue(matchedVar[1]);
				return (computedFamilyName && computedFamilyName.split(",").map(name => helper.normalizeFontFamily(name))) || familyName;
			}
			return familyName;
		}));
		fontsInfo.used = fontsInfo.used.map(fontNames => helper.flatten(fontNames));
	}
	const variableFound = fontsInfo.used.find(fontNames => fontNames.find(fontName => fontName.startsWith("var(--")));
	let unusedFonts, filteredUsedFonts;
	if (variableFound) {
		unusedFonts = [];
	} else {
		filteredUsedFonts = new Map();
		fontsInfo.used.forEach(fontNames => fontNames.forEach(familyName => {
			if (fontsInfo.declared.find(fontInfo => fontInfo.fontFamily == familyName)) {
				const optionalData = options.usedFonts && options.usedFonts.filter(fontInfo => fontInfo[0] == familyName);
				if (optionalData && optionalData.length) {
					filteredUsedFonts.set(familyName, optionalData);
				}
			}
		}));
		unusedFonts = fontsInfo.declared.filter(fontInfo => !filteredUsedFonts.has(fontInfo.fontFamily));
	}
	stylesheets.forEach(stylesheetInfo => {
		const cssRules = stylesheetInfo.stylesheet.children;
		if (cssRules) {
			filterUnusedFonts(cssRules, fontsInfo.declared, unusedFonts, filteredUsedFonts, docContent);
			stats.rules.discarded -= cssRules.size;
		}
	});
	return stats;
}

function getFontsInfo(cssRules, fontsInfo) {
	cssRules.forEach(ruleData => {
		if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports") && ruleData.block && ruleData.block.children) {
			getFontsInfo(ruleData.block.children, fontsInfo);
		} else if (ruleData.type == "Rule") {
			const fontFamilyNames = getFontFamilyNames(ruleData.block);
			if (fontFamilyNames.length) {
				fontsInfo.used.push(fontFamilyNames);
			}
		} else {
			if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
				const fontFamily = helper.normalizeFontFamily(getDeclarationValue(ruleData.block.children, "font-family"));
				if (fontFamily) {
					const fontWeight = getDeclarationValue(ruleData.block.children, "font-weight") || "400";
					const fontStyle = getDeclarationValue(ruleData.block.children, "font-style") || "normal";
					const fontVariant = getDeclarationValue(ruleData.block.children, "font-variant") || "normal";
					fontWeight.split(",").forEach(weightValue =>
						fontsInfo.declared.push({ fontFamily, fontWeight: helper.getFontWeight(helper.removeQuotes(weightValue)), fontStyle, fontVariant }));
				}
			}
		}
	});
}

function filterUnusedFonts(cssRules, declaredFonts, unusedFonts, filteredUsedFonts, docContent) {
	const removedRules = [];
	for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
		const ruleData = cssRule.data;
		if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports") && ruleData.block && ruleData.block.children) {
			filterUnusedFonts(ruleData.block.children, declaredFonts, unusedFonts, filteredUsedFonts, docContent);
		} else if (ruleData.type == "Atrule" && ruleData.name == "font-face") {
			const fontFamily = helper.normalizeFontFamily(getDeclarationValue(ruleData.block.children, "font-family"));
			if (fontFamily) {
				const unicodeRange = getDeclarationValue(ruleData.block.children, "unicode-range");
				if (unusedFonts.find(fontInfo => fontInfo.fontFamily == fontFamily) || !testUnicodeRange(docContent, unicodeRange) || !testUsedFont(ruleData, fontFamily, declaredFonts, filteredUsedFonts)) {
					removedRules.push(cssRule);
				}
			}
			const removedDeclarations = [];
			for (let declaration = ruleData.block.children.head; declaration; declaration = declaration.next) {
				if (declaration.data.property == "font-display") {
					removedDeclarations.push(declaration);
				}
			}
			if (removedDeclarations.length) {
				removedDeclarations.forEach(removedDeclaration => ruleData.block.children.remove(removedDeclaration));
			}
		}
	}
	removedRules.forEach(cssRule => cssRules.remove(cssRule));
}

function testUsedFont(ruleData, familyName, declaredFonts, filteredUsedFonts) {
	let test;
	const optionalUsedFonts = filteredUsedFonts && filteredUsedFonts.get(familyName);
	if (optionalUsedFonts && optionalUsedFonts.length) {
		let fontStyle = getDeclarationValue(ruleData.block.children, "font-style") || "normal";
		if (VALID_FONT_STYLES.find(rule => fontStyle.trim().match(rule))) {
			const fontWeight = helper.getFontWeight(getDeclarationValue(ruleData.block.children, "font-weight") || "400");
			const declaredFontsWeights = declaredFonts
				.filter(fontInfo => fontInfo.fontFamily == familyName && fontInfo.fontStyle == fontStyle)
				.map(fontInfo => fontInfo.fontWeight)
				.sort((weight1, weight2) => Number.parseInt(weight1, 10) - Number.parseInt(weight2, 10));
			let usedFontWeights = optionalUsedFonts.map(fontInfo => getUsedFontWeight(fontInfo, fontStyle, declaredFontsWeights));
			test = testFontweight(fontWeight, usedFontWeights);
			if (!test) {
				usedFontWeights = optionalUsedFonts.map(fontInfo => {
					fontInfo = Array.from(fontInfo);
					fontInfo[2] = "normal";
					return getUsedFontWeight(fontInfo, fontStyle, declaredFontsWeights);
				});
			}
			test = testFontweight(fontWeight, usedFontWeights);
		} else {
			test = true;
		}
	} else {
		test = true;
	}
	return test;
}

function testFontweight(fontWeight, usedFontWeights) {
	let test;
	for (const value of fontWeight.split(/[ ,]/)) {
		test = test || usedFontWeights.includes(helper.getFontWeight(helper.removeQuotes(value)));
	}
	return test;
}

function getDeclarationValue(declarations, propertyName) {
	let property;
	if (declarations) {
		property = declarations.filter(declaration => declaration.property == propertyName).tail;
	}
	if (property) {
		try {
			return helper.removeQuotes(cssTree.generate(property.data.value)).toLowerCase();
		} catch (error) {
			// ignored
		}
	}
}

function getFontFamilyNames(declarations) {
	let fontFamilyName = declarations.children.filter(node => node.property == "font-family").tail;
	let fontFamilyNames = [];
	if (fontFamilyName) {
		let familyName = "";
		if (fontFamilyName.data.value.children) {
			let previousType;
			fontFamilyName.data.value.children.forEach(node => {
				if (node.type == "Operator" && node.value == "," && familyName) {
					fontFamilyNames.push(helper.normalizeFontFamily(familyName));
					familyName = "";
					previousType = null;
				} else {
					if (previousType == "Identifier" && node.type == "Identifier") {
						familyName += " ";
					}
					familyName += cssTree.generate(node);
				}
				previousType = node.type;
			});
		} else {
			fontFamilyName = cssTree.generate(fontFamilyName.data.value);
		}
		if (familyName) {
			fontFamilyNames.push(helper.normalizeFontFamily(familyName));
		}
	}
	const font = declarations.children.filter(node => node.property == "font").tail;
	if (font && font.data && font.data.value) {
		try {
			const parsedFont = fontPropertyParser.parse(font.data.value);
			parsedFont.family.forEach(familyName => fontFamilyNames.push(helper.normalizeFontFamily(familyName)));
		} catch (error) {
			// ignored				
		}
	}
	return fontFamilyNames;
}

function getUsedFontWeight(fontInfo, fontStyle, fontWeights) {
	let foundWeight;
	fontWeights = fontWeights.map(weight => String(Number.parseInt(weight, 10)));
	if (fontInfo[2] == fontStyle) {
		let fontWeight = Number(fontInfo[1]);
		if (fontWeights.length > 1) {
			if (fontWeight >= 400 && fontWeight <= 500) {
				foundWeight = fontWeights.find(weight => weight >= fontWeight && weight <= 500);
				if (!foundWeight) {
					foundWeight = findDescendingFontWeight(fontWeight, fontWeights);
				}
				if (!foundWeight) {
					foundWeight = findAscendingFontWeight(fontWeight, fontWeights);
				}
			}
			if (fontWeight < 400) {
				foundWeight = fontWeights.slice().reverse().find(weight => weight <= fontWeight);
				if (!foundWeight) {
					foundWeight = findAscendingFontWeight(fontWeight, fontWeights);
				}
			}
			if (fontWeight > 500) {
				foundWeight = fontWeights.find(weight => weight >= fontWeight);
				if (!foundWeight) {
					foundWeight = findDescendingFontWeight(fontWeight, fontWeights);
				}
			}
		} else {
			foundWeight = fontWeights[0];
		}
	}
	return foundWeight;
}

function findDescendingFontWeight(fontWeight, fontWeights) {
	return fontWeights.slice().reverse().find(weight => weight < fontWeight);
}

function findAscendingFontWeight(fontWeight, fontWeights) {
	return fontWeights.find(weight => weight > fontWeight);
}

function getRulesTextContent(doc, cssRules, workStylesheet, content) {
	cssRules.forEach(ruleData => {
		if (ruleData.block && ruleData.block.children && ruleData.prelude && ruleData.prelude.children) {
			if (ruleData.type == "Atrule" && (ruleData.name == "media" || ruleData.name == "supports")) {
				content = getRulesTextContent(doc, ruleData.block.children, workStylesheet, content);
			} else if (ruleData.type == "Rule") {
				content = getDeclarationsTextContent(ruleData.block.children, workStylesheet, content);
			}
		}
	});
	return content;
}

function getDeclarationsTextContent(declarations, workStylesheet, content) {
	const contentText = getDeclarationUnescapedValue(declarations, "content", workStylesheet);
	const quotesText = getDeclarationUnescapedValue(declarations, "quotes", workStylesheet);
	if (!content.includes(contentText)) {
		content += contentText;
	}
	if (!content.includes(quotesText)) {
		content += quotesText;
	}
	return content;
}

function getDeclarationUnescapedValue(declarations, property, workStylesheet) {
	const rawValue = getDeclarationValue(declarations, property) || "";
	if (rawValue) {
		workStylesheet.textContent = "tmp { content:\"" + rawValue + "\"}";
		if (workStylesheet.sheet && workStylesheet.sheet.cssRules) {
			return helper.removeQuotes(workStylesheet.sheet.cssRules[0].style.getPropertyValue("content"));
		} else {
			return rawValue;
		}
	}
	return "";
}

function testUnicodeRange(docContent, unicodeRange) {
	if (unicodeRange) {
		const unicodeRanges = unicodeRange.split(REGEXP_COMMA);
		let invalid;
		const result = unicodeRanges.filter(rangeValue => {
			const range = rangeValue.split(REGEXP_DASH);
			let regExpString;
			if (range.length == 2) {
				range[0] = transformRange(range[0]);
				regExpString = "[" + range[0] + "-" + transformRange("U+" + range[1]) + "]";
			}
			if (range.length == 1) {
				if (range[0].includes("?")) {
					const firstRange = transformRange(range[0]);
					const secondRange = firstRange;
					regExpString = "[" + firstRange.replace(REGEXP_QUESTION_MARK, "0") + "-" + secondRange.replace(REGEXP_QUESTION_MARK, "F") + "]";
				} else if (range[0]) {
					regExpString = "[" + transformRange(range[0]) + "]";
				}
			}
			if (regExpString) {
				try {
					return (new RegExp(regExpString, "u")).test(docContent);
				} catch (error) {
					invalid = true;
					return false;
				}
			}
			return true;
		});
		return !invalid && (!unicodeRanges.length || result.length);
	}
	return true;
}

function transformRange(range) {
	range = range.replace(REGEXP_STARTS_U_PLUS, "");
	while (range.length < 6) {
		range = "0" + range;
	}
	return "\\u{" + range + "}";
}
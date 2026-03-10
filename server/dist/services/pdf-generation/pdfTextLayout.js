"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawWrappedText = drawWrappedText;
exports.wrapTextLines = wrapTextLines;
const pdf_lib_1 = require("pdf-lib");
function drawWrappedText(page, text, options) {
    const lines = wrapTextLines(text, {
        maxWidth: options.maxWidth,
        size: options.size,
        font: options.font,
        maxLines: options.maxLines,
    });
    lines.forEach((line, index) => {
        page.drawText(line, {
            x: options.x,
            y: options.y - index * options.lineHeight,
            size: options.size,
            font: options.font,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
        });
    });
}
function wrapTextLines(text, options) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
        return [];
    }
    const lines = [];
    let current = '';
    const pushLine = (line) => {
        if (!line)
            return;
        lines.push(line);
    };
    const splitLongToken = (token) => {
        if (options.font.widthOfTextAtSize(token, options.size) <= options.maxWidth) {
            return [token];
        }
        const parts = [];
        let start = 0;
        while (start < token.length) {
            let end = token.length;
            let chunk = token.slice(start, end);
            while (end > start + 1 && options.font.widthOfTextAtSize(chunk, options.size) > options.maxWidth) {
                end -= 1;
                chunk = token.slice(start, end);
            }
            if (!chunk)
                break;
            parts.push(chunk);
            start = end;
        }
        return parts.length ? parts : [token];
    };
    for (const word of words) {
        const wordParts = splitLongToken(word);
        for (const part of wordParts) {
            const test = current ? `${current} ${part}` : part;
            const width = options.font.widthOfTextAtSize(test, options.size);
            if (width > options.maxWidth && current) {
                pushLine(current);
                current = part;
            }
            else {
                current = test;
            }
        }
    }
    pushLine(current);
    return typeof options.maxLines === 'number' ? lines.slice(0, options.maxLines) : lines;
}

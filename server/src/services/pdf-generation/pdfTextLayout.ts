import type { PDFFont, PDFPage } from 'pdf-lib';
import { rgb } from 'pdf-lib';

export function drawWrappedText(
  page: PDFPage,
  text: string,
  options: { x: number; y: number; maxWidth: number; lineHeight: number; size: number; font: PDFFont; maxLines?: number },
): void {
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
      color: rgb(0, 0, 0),
    });
  });
}

export function wrapTextLines(
  text: string,
  options: { maxWidth: number; size: number; font: PDFFont; maxLines?: number },
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [];
  }

  const lines: string[] = [];
  let current = '';

  const pushLine = (line: string) => {
    if (!line) return;
    lines.push(line);
  };

  const splitLongToken = (token: string): string[] => {
    if (options.font.widthOfTextAtSize(token, options.size) <= options.maxWidth) {
      return [token];
    }
    const parts: string[] = [];
    let start = 0;
    while (start < token.length) {
      let end = token.length;
      let chunk = token.slice(start, end);
      while (end > start + 1 && options.font.widthOfTextAtSize(chunk, options.size) > options.maxWidth) {
        end -= 1;
        chunk = token.slice(start, end);
      }
      if (!chunk) break;
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
      } else {
        current = test;
      }
    }
  }
  pushLine(current);

  return typeof options.maxLines === 'number' ? lines.slice(0, options.maxLines) : lines;
}


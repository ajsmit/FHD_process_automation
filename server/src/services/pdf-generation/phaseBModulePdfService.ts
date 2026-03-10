import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { PDFDocument, PageSizes, StandardFonts, rgb } from 'pdf-lib';
import { drawWrappedText, wrapTextLines } from './pdfTextLayout';

export interface PhaseBPdfField {
  label: string;
  value: string;
  minHeight?: number;
}

export async function renderPhaseBModulePdfDocument(
  outFile: string,
  options: {
    title: string;
    subtitle: string;
    repoRoot: string;
    fields: PhaseBPdfField[];
  },
): Promise<void> {
  const pdfDoc = await PDFDocument.create();
  const [pageW, pageH] = PageSizes.A4;
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let page = pdfDoc.addPage([pageW, pageH]);
  const margin = 36;
  const labelW = 185;
  const valueW = pageW - margin * 2 - labelW;
  let y = pageH - 34;

  const drawHeader = async (): Promise<void> => {
    const logoPath = path.join(options.repoRoot, 'server', 'assets', 'uwc_logo.png');
    let logoBottomY = pageH;
    if (existsSync(logoPath)) {
      const logoBytes = await fs.readFile(logoPath);
      const logo = await pdfDoc.embedPng(logoBytes);
      const logoDims = logo.scale(0.07);
      const logoY = pageH - logoDims.height - 24;
      page.drawImage(logo, { x: margin, y: logoY, width: logoDims.width, height: logoDims.height });
      logoBottomY = logoY;
    }

    page.drawText('Higher Degree Committee', { x: 130, y: pageH - 42, size: 16, font: bold, color: rgb(0.05, 0.11, 0.2) });
    page.drawText(options.title, { x: 130, y: pageH - 64, size: 12, font: bold, color: rgb(0.08, 0.08, 0.08) });
    page.drawText(options.subtitle, { x: 130, y: pageH - 78, size: 9.8, font: regular, color: rgb(0.16, 0.2, 0.24) });
    const dividerY = pageH - 88;
    page.drawLine({ start: { x: margin, y: dividerY }, end: { x: pageW - margin, y: dividerY }, thickness: 0.8, color: rgb(0.7, 0.74, 0.8) });
    y = Math.min(dividerY - 20, logoBottomY - 10);
  };

  const startNewPage = async (): Promise<void> => {
    page = pdfDoc.addPage([pageW, pageH]);
    await drawHeader();
  };

  await drawHeader();

  const drawFieldRow = async (field: PhaseBPdfField): Promise<void> => {
    const label = field.label;
    const value = field.value?.trim() ? field.value : '-';
    const rowBase = field.minHeight ?? 20;
    const labelLines = wrapTextLines(label, { maxWidth: labelW - 12, size: 8.8, font: bold, maxLines: 3 });
    const valueLines = wrapTextLines(value, { maxWidth: valueW - 12, size: 9.2, font: regular, maxLines: 12 });
    const contentLines = Math.max(labelLines.length || 1, valueLines.length || 1);
    const lineHeight = 10.8;
    const autoHeight = Math.max(rowBase, 6 + contentLines * lineHeight);

    if (y - autoHeight < 70) {
      await startNewPage();
    }

    page.drawRectangle({ x: margin, y: y - autoHeight, width: labelW, height: autoHeight, borderWidth: 0.7, borderColor: rgb(0.8, 0.84, 0.88) });
    page.drawRectangle({ x: margin + labelW, y: y - autoHeight, width: valueW, height: autoHeight, borderWidth: 0.7, borderColor: rgb(0.8, 0.84, 0.88) });

    drawWrappedText(page, label, {
      x: margin + 6,
      y: y - 11,
      maxWidth: labelW - 12,
      lineHeight,
      size: 8.8,
      font: bold,
      maxLines: 3,
    });
    drawWrappedText(page, value, {
      x: margin + labelW + 6,
      y: y - 11,
      maxWidth: valueW - 12,
      lineHeight,
      size: 9.2,
      font: regular,
      maxLines: Math.floor((autoHeight - 6) / lineHeight),
    });

    y -= autoHeight;
  };

  for (const field of options.fields) {
    await drawFieldRow(field);
  }

  const rendered = await pdfDoc.save();
  await fs.writeFile(outFile, rendered);
}

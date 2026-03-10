"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTitleRegistrationPdfDocument = renderTitleRegistrationPdfDocument;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const pdf_lib_1 = require("pdf-lib");
const pdfTextLayout_1 = require("./pdfTextLayout");
function hasNamedPerson(value) {
    const normalized = value.trim().toLowerCase();
    return normalized.length > 0 && normalized !== 'na';
}
function renderTitleRegistrationPdfDocument(outFile, formData, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfDoc = yield pdf_lib_1.PDFDocument.create();
        const [pageW, pageH] = pdf_lib_1.PageSizes.A4;
        const page = pdfDoc.addPage([pageW, pageH]);
        const fontRegular = yield pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
        const fontBold = yield pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
        const logoPath = path_1.default.join(options.repoRoot, 'server', 'assets', 'uwc_logo.png');
        const headerTopY = pageH - 34;
        let logoBottomY = pageH;
        if ((0, fs_1.existsSync)(logoPath)) {
            const logoBytes = yield promises_1.default.readFile(logoPath);
            const logo = yield pdfDoc.embedPng(logoBytes);
            const logoDims = logo.scale(0.07);
            const logoY = pageH - logoDims.height - 24;
            page.drawImage(logo, { x: 36, y: logoY, width: logoDims.width, height: logoDims.height });
            logoBottomY = logoY;
        }
        page.drawText('Higher Degree Committee', { x: 130, y: headerTopY - 8, size: 16, font: fontBold, color: (0, pdf_lib_1.rgb)(0.05, 0.11, 0.2) });
        page.drawText('Title registration and Appointment of Supervisor', { x: 130, y: headerTopY - 30, size: 12, font: fontBold, color: (0, pdf_lib_1.rgb)(0.08, 0.08, 0.08) });
        const dividerY = headerTopY - 42;
        page.drawLine({ start: { x: 36, y: dividerY }, end: { x: pageW - 36, y: dividerY }, thickness: 0.8, color: (0, pdf_lib_1.rgb)(0.7, 0.74, 0.8) });
        let y = Math.min(dividerY - 20, logoBottomY - 10);
        const margin = 36;
        const rowH = 18;
        const labelW = 185;
        const valueW = pageW - margin * 2 - labelW;
        const drawField = (label, value, height = rowH) => {
            const labelLines = (0, pdfTextLayout_1.wrapTextLines)(label, { maxWidth: labelW - 12, size: 8.8, font: fontBold, maxLines: 3 });
            const valueLines = (0, pdfTextLayout_1.wrapTextLines)(value || '-', { maxWidth: valueW - 12, size: 9.2, font: fontRegular, maxLines: 8 });
            const contentLines = Math.max(labelLines.length || 1, valueLines.length || 1);
            const lineHeight = 10.8;
            const autoHeight = Math.max(rowH, 6 + contentLines * lineHeight);
            const effectiveHeight = Math.max(height, autoHeight);
            page.drawRectangle({ x: margin, y: y - effectiveHeight, width: labelW, height: effectiveHeight, borderWidth: 0.7, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.84, 0.88) });
            page.drawRectangle({ x: margin + labelW, y: y - effectiveHeight, width: valueW, height: effectiveHeight, borderWidth: 0.7, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.84, 0.88) });
            (0, pdfTextLayout_1.drawWrappedText)(page, label, {
                x: margin + 6,
                y: y - 11,
                maxWidth: labelW - 12,
                lineHeight,
                size: 8.8,
                font: fontBold,
                maxLines: 3,
            });
            (0, pdfTextLayout_1.drawWrappedText)(page, value || '-', {
                x: margin + labelW + 6,
                y: y - 11,
                maxWidth: valueW - 12,
                lineHeight,
                size: 9.2,
                font: fontRegular,
                maxLines: Math.floor((effectiveHeight - 6) / lineHeight),
            });
            y -= effectiveHeight;
        };
        drawField('Student', `${formData['Student Title']} ${formData['Student First-Name']} ${formData['Student Surname']}`);
        drawField('Student Number', formData['Student Number']);
        drawField('Department', formData.Department);
        drawField('Degree', formData.Degree);
        drawField('Date of first title registration on SASI', formData['Date of first title registration on SASI']);
        drawField('Student registration active on SASI', formData['Student registration active on SASI']);
        drawField('Planned Format', [
            formData['PhD by traditional thesis format'] ? 'PhD by traditional thesis' : null,
            formData['PhD by publication'] ? 'PhD by publication' : null,
            formData['Masters Full-thesis'] ? 'Masters full-thesis' : null,
            formData['Masters Mini thesis'] ? 'Masters mini-thesis' : null,
            formData['Masters by publication'] ? 'Masters by publication' : null,
        ].filter(Boolean).join(' | '));
        drawField('Supervisor', formData['Supervisor is UWC-internal'] === 'Yes'
            ? `${formData['Supervisor Title']} ${formData.Supervisor} (${formData['Supervisor Qualifications']}) [UWC Internal]`
            : `${formData['Supervisor Title']} ${formData.Supervisor} (${formData['Supervisor Qualifications']}) [External]`);
        if (formData['Supervisor is UWC-internal'] === 'No') {
            drawField('Supervisor External Contact', `${formData['Supervisor External Address']} | ${formData['Supervisor External Email']}`, 28);
        }
        drawField('Administrative Supervisor (Nominal Role)', `${formData['Administrative Supervisor same as Supervisor'] === 'Yes' ? '[Same as Supervisor] ' : ''}${formData['Administrative Supervisor (Nominal Role)']} (${formData['Administrative Supervisor Qualifications (Nominal Role)']})`);
        drawField('Has Co-supervisor?', formData['Has Co-supervisor?']);
        if (formData['Has Co-supervisor?'] === 'Yes') {
            drawField('Co-supervisor 1', formData['Co-supervisor is UWC-internal'] === 'Yes'
                ? `${formData['Co-supervisor Title']} ${options.coSupervisor1Name} (${formData['Co-supervisor Qualifications']}) [UWC Internal]`
                : `${formData['Co-supervisor Title']} ${options.coSupervisor1Name} (${formData['Co-supervisor Qualifications']}) [External]`);
            if (formData['Co-supervisor is UWC-internal'] === 'No') {
                drawField('Co-supervisor 1 External Contact', `${formData['Co-supervisor External Address']} | ${formData['Co-supervisor External Email']}`, 28);
            }
            if (hasNamedPerson(options.coSupervisor2Name)) {
                drawField('Co-supervisor 2', formData['Second Co-supervisor is UWC-internal'] === 'Yes'
                    ? `${formData['Second Co-supervisor Title']} ${options.coSupervisor2Name} (${formData['Second Co-supervisor Qualifications']}) [UWC Internal]`
                    : `${formData['Second Co-supervisor Title']} ${options.coSupervisor2Name} (${formData['Second Co-supervisor Qualifications']}) [External]`);
                if (formData['Second Co-supervisor is UWC-internal'] === 'No') {
                    drawField('Co-supervisor 2 External Contact', `${formData['Second Co-supervisor External Address']} | ${formData['Second Co-supervisor External Email']}`, 28);
                }
            }
        }
        drawField('Thesis title', formData['Thesis title'], 34);
        drawField('Key words (minimum 6)', formData['Key words'], 30);
        drawField('Ethics clearance', `${formData['Does this project need Ethics clearance?']}${formData['Ethics clearance reference number'] ? ` | Ref: ${formData['Ethics clearance reference number']}` : ''}${formData['Date on which ethics clearance was issued'] ? ` | Date: ${formData['Date on which ethics clearance was issued']}` : ''}`, 30);
        drawField('MOU submitted', formData['Has the MOU been submitted?']);
        drawField('Year and Semester first registered', `${formData['Year first registered']} | Semester ${formData['Semester first registered']}`);
        drawField('Initial title for MSc->PhD upgrade (if applicable)', formData['Initial thesis title for upgrade from Masters to Doctoral'], 28);
        if (formData.Degree === 'PHD') {
            drawField('PhD proposal link (5-10 pages incl. timeframes)', formData['PhD proposal link (5-10 pages incl. timeframes)'], 28);
        }
        page.drawRectangle({ x: margin, y: y - 135, width: pageW - margin * 2, height: 135, borderWidth: 0.9, borderColor: (0, pdf_lib_1.rgb)(0.7, 0.74, 0.8) });
        page.drawRectangle({ x: margin, y: y - 20, width: pageW - margin * 2, height: 20, color: (0, pdf_lib_1.rgb)(0.94, 0.96, 0.98) });
        page.drawText('Abstract (maximum 200 words)', { x: margin + 6, y: y - 14, size: 9.5, font: fontBold, color: (0, pdf_lib_1.rgb)(0.1, 0.1, 0.1) });
        (0, pdfTextLayout_1.drawWrappedText)(page, formData.Abstract || '-', {
            x: margin + 8,
            y: y - 34,
            maxWidth: pageW - margin * 2 - 16,
            lineHeight: 11.5,
            size: 9.2,
            font: fontRegular,
            maxLines: 8,
        });
        y -= 145;
        page.drawText('Signatures', { x: margin, y: y - 3, size: 10, font: fontBold, color: (0, pdf_lib_1.rgb)(0.1, 0.1, 0.1) });
        y -= 16;
        const sigCols = [margin, margin + 180, margin + 360];
        page.drawText('Role', { x: sigCols[0] + 6, y: y - 10, size: 8.8, font: fontBold });
        page.drawText('Name / Signature', { x: sigCols[1] + 6, y: y - 10, size: 8.8, font: fontBold });
        page.drawText('Date', { x: sigCols[2] + 6, y: y - 10, size: 8.8, font: fontBold });
        y -= 18;
        const sigRows = ['Student', 'Supervisor', 'Department Chairperson'];
        for (const role of sigRows) {
            page.drawRectangle({ x: sigCols[0], y: y - 18, width: 180, height: 18, borderWidth: 0.7, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.84, 0.88) });
            page.drawRectangle({ x: sigCols[1], y: y - 18, width: 180, height: 18, borderWidth: 0.7, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.84, 0.88) });
            page.drawRectangle({ x: sigCols[2], y: y - 18, width: 100, height: 18, borderWidth: 0.7, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.84, 0.88) });
            page.drawText(role, { x: sigCols[0] + 6, y: y - 12, size: 8.8, font: fontRegular, color: (0, pdf_lib_1.rgb)(0.2, 0.2, 0.2) });
            y -= 18;
        }
        const rendered = yield pdfDoc.save();
        yield promises_1.default.writeFile(outFile, rendered);
    });
}

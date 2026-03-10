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
exports.renderMouPdfDocument = renderMouPdfDocument;
const promises_1 = __importDefault(require("fs/promises"));
const pdf_lib_1 = require("pdf-lib");
const pdfTextLayout_1 = require("./pdfTextLayout");
function renderMouPdfDocument(outFile, formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfDoc = yield pdf_lib_1.PDFDocument.create();
        const [pageW, pageH] = pdf_lib_1.PageSizes.A4;
        const regular = yield pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
        const bold = yield pdfDoc.embedFont(pdf_lib_1.StandardFonts.HelveticaBold);
        const page = pdfDoc.addPage([pageW, pageH]);
        const margin = 32;
        let y = pageH - 36;
        page.drawText('UWC Memorandum of Understanding (MOU) - 2026', { x: margin, y, size: 14, font: bold });
        y -= 18;
        page.drawText('Postgraduate Student and Supervisor Agreement (Signature-only record)', { x: margin, y, size: 10, font: regular });
        y -= 18;
        const rows = [
            ['Student Full Name', formData['Student Full Name']],
            ['Student Number', formData['Student Number']],
            ['Degree', formData.Degree],
            ['Department', formData.Department],
            ['First Year of Registration', formData['First Year of Registration']],
            ['Study Mode', formData['Study Mode']],
            ['Expected Date of Completion', formData['Expected Date of Completion']],
            ['Thesis Title', formData['Thesis Title']],
            ['Brief Description of Project (<200 words)', formData['Brief Description of Project (<200 words)']],
            ['Principal Supervisor', formData['Principal Supervisor']],
            ['Principal Supervisor Highest Qualifications', formData['Principal Supervisor Highest Qualifications']],
            ['Principal Supervisor Main Responsibilities', formData['Principal Supervisor Main Responsibilities']],
            ['Co-supervisor(s)', formData['Co-supervisor(s)']],
            ['Co-supervisor Highest Qualifications', formData['Co-supervisor Highest Qualifications']],
            ['Co-supervisor Main Responsibilities', formData['Co-supervisor Main Responsibilities']],
            ['Supervisor Availability Arrangements', formData['Supervisor Availability Arrangements']],
            ['Student Leave Entitlement Per Annum', formData['Student Leave Entitlement Per Annum']],
            ['Student Extended Research Away from UWC Arrangements', formData['Student Extended Research Away from UWC Arrangements']],
            ['Prescribed Courses/Workshops', formData['Prescribed Courses/Workshops']],
            ['Time Allocation', formData['Time Allocation']],
            ['Space Allocation', formData['Space Allocation']],
            ['Computer Facilities', formData['Computer Facilities']],
            ['Financial Arrangements for Project', formData['Financial Arrangements for Project']],
            ['Publication Issues', formData['Publication Issues']],
            ['Data Ownership', formData['Data Ownership']],
            ['Supervisor-Student Meetings', formData['Supervisor-Student Meetings']],
            ['Progress Reports', formData['Progress Reports']],
            ['Study Outputs', formData['Study Outputs']],
            ['Research Visits/Conferences', formData['Research Visits/Conferences']],
            ['Other Duties', formData['Other Duties']],
            ['Other Expectations', formData['Other Expectations']],
            ['Other Issues Relevant to Study', formData['Other Issues Relevant to Study']],
            ['Student Signature Confirmed', formData['Student Signature Confirmed']],
            ['Supervisor Signature Confirmed', formData['Supervisor Signature Confirmed']],
            ['Co-supervisor Signature Confirmed', formData['Co-supervisor Signature Confirmed']],
            ['Dept Chair/PG Coord Signature Confirmed', formData['Dept Chair/PG Coord Signature Confirmed']],
        ];
        for (const [label, value] of rows) {
            const rowH = Math.max(18, Math.ceil((value.length || 1) / 90) * 11 + 8);
            if (y - rowH < 36) {
                y = pageH - 36;
                pdfDoc.addPage([pageW, pageH]);
            }
            const current = pdfDoc.getPages()[pdfDoc.getPageCount() - 1];
            current.drawRectangle({ x: margin, y: y - rowH, width: 190, height: rowH, borderWidth: 0.6, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.8, 0.8) });
            current.drawRectangle({ x: margin + 190, y: y - rowH, width: pageW - margin * 2 - 190, height: rowH, borderWidth: 0.6, borderColor: (0, pdf_lib_1.rgb)(0.8, 0.8, 0.8) });
            current.drawText(label, { x: margin + 5, y: y - 12, size: 8.3, font: bold });
            (0, pdfTextLayout_1.drawWrappedText)(current, value || '-', {
                x: margin + 196,
                y: y - 12,
                maxWidth: pageW - margin * 2 - 200,
                lineHeight: 10.5,
                size: 8.5,
                font: regular,
            });
            y -= rowH;
        }
        const pdfBytes = yield pdfDoc.save();
        yield promises_1.default.writeFile(outFile, pdfBytes);
    });
}

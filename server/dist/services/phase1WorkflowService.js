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
exports.getOrCreateWorkflow = getOrCreateWorkflow;
exports.markStepCompleted = markStepCompleted;
exports.submitTitleRegistration = submitTitleRegistration;
exports.generateStepPdf = generateStepPdf;
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const knex_1 = __importDefault(require("../db/knex"));
const sasiService_1 = require("./sasiService");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
const stepToStatusColumn = {
    mou: 'mou_status',
    title_registration: 'title_registration_status',
    supervisor_profile: 'supervisor_profile_status',
    examiners: 'examiners_status',
};
const stepToTemplate = {
    mou: 'MOU 2026.docx',
    title_registration: 'Title Registration 2026.docx',
    supervisor_profile: 'PROSPECTIVE SUPERVISOR PROFILE (ROTT) 2026.docx',
    examiners: 'Appointment of Examiners 2026.docx',
};
function createWorkflow(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const [id] = yield (0, knex_1.default)('phase1_workflows').insert({ sasi_student_id: studentId });
        const created = yield (0, knex_1.default)('phase1_workflows').where({ id }).first();
        if (!created) {
            throw new Error('Failed to create workflow');
        }
        return created;
    });
}
function getOrCreateWorkflow(studentNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield (0, sasiService_1.getStudentByNumber)(studentNumber);
        if (!student) {
            throw new Error('Student not found in SASI demo database');
        }
        let workflow = yield (0, knex_1.default)('phase1_workflows').where({ sasi_student_id: student.id }).first();
        if (!workflow) {
            workflow = yield createWorkflow(student.id);
        }
        return { student, workflow };
    });
}
function validateTransition(workflow, step) {
    if (step === 'supervisor_profile') {
        if (workflow.mou_status !== 'completed' || workflow.title_registration_status !== 'completed') {
            return 'Supervisor profile can only be completed after both MOU and Title Registration are completed.';
        }
    }
    if (step === 'examiners' && workflow.supervisor_profile_status !== 'completed') {
        return 'Appointment of Examiners can only be completed after Supervisor Profile. Intention to Submit is handled by canonical module flow, not phase1 step flags.';
    }
    return null;
}
function markStepCompleted(studentNumber, step) {
    return __awaiter(this, void 0, void 0, function* () {
        const { student, workflow } = yield getOrCreateWorkflow(studentNumber);
        const blocker = validateTransition(workflow, step);
        if (blocker) {
            yield (0, knex_1.default)('phase1_workflows').where({ id: workflow.id }).update({ last_blocker: blocker, updated_at: knex_1.default.fn.now() });
            throw new Error(blocker);
        }
        const statusColumn = stepToStatusColumn[step];
        yield (0, knex_1.default)('phase1_workflows')
            .where({ id: workflow.id })
            .update({ [statusColumn]: 'completed', last_blocker: null, updated_at: knex_1.default.fn.now() });
        const updated = yield (0, knex_1.default)('phase1_workflows').where({ id: workflow.id }).first();
        if (!updated) {
            throw new Error('Workflow not found after update');
        }
        return { student, workflow: updated };
    });
}
function validateTitleRegistrationInput(input) {
    const issues = [];
    if (!input.studentNumber.trim()) {
        issues.push('Student number is required.');
    }
    if (!input.proposedTitle.trim()) {
        issues.push('Proposed thesis title is required.');
    }
    if (input.proposedTitle.trim().length < 10) {
        issues.push('Proposed thesis title is too short.');
    }
    if (input.abstract && input.abstract.trim().length > 8000) {
        issues.push('Abstract is too long.');
    }
    return issues;
}
function submitTitleRegistration(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { workflow, student } = yield getOrCreateWorkflow(input.studentNumber);
        const policyIssues = validateTitleRegistrationInput(input);
        if (student.degree_level === 'PHD' && !((_a = input.abstract) === null || _a === void 0 ? void 0 : _a.trim())) {
            policyIssues.push('PhD title registration requires an abstract/proposal summary.');
        }
        if (policyIssues.length > 0) {
            yield (0, knex_1.default)('phase1_workflows')
                .where({ id: workflow.id })
                .update({ last_blocker: policyIssues.join(' '), updated_at: knex_1.default.fn.now() });
            return { workflow, policyIssues };
        }
        const studentUser = yield (0, knex_1.default)('users').where({ sasi_id: input.studentNumber, role: 'student' }).first();
        const supervisorId = (_b = input.supervisorUserId) !== null && _b !== void 0 ? _b : 2;
        if (studentUser) {
            yield (0, knex_1.default)('title_registrations').insert({
                student_id: studentUser.id,
                supervisor_id: supervisorId,
                proposed_title: input.proposedTitle.trim(),
                abstract: (_d = (_c = input.abstract) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : null,
            });
        }
        yield (0, knex_1.default)('sasi_students')
            .where({ id: student.id })
            .update({ thesis_title: input.proposedTitle.trim(), updated_at: knex_1.default.fn.now() });
        const marked = yield markStepCompleted(input.studentNumber, 'title_registration');
        return { workflow: marked.workflow, policyIssues };
    });
}
function buildOutputPdfPath(studentNumber, step) {
    const repoRoot = resolveRepoRoot();
    const outDir = path_1.default.join(repoRoot, 'generated_forms', studentNumber);
    return path_1.default.join(outDir, `${step}.pdf`);
}
function resolveRepoRoot() {
    const candidates = [
        path_1.default.resolve(process.cwd()),
        path_1.default.resolve(process.cwd(), '..'),
        path_1.default.resolve(__dirname, '../../..'),
        path_1.default.resolve(__dirname, '../../../..'),
    ];
    for (const candidate of candidates) {
        if ((0, fs_1.existsSync)(path_1.default.join(candidate, 'ridiculous_forms'))) {
            return candidate;
        }
    }
    throw new Error('Unable to locate repository root containing ridiculous_forms');
}
function generateStepPdf(studentNumber, step) {
    return __awaiter(this, void 0, void 0, function* () {
        const { workflow } = yield getOrCreateWorkflow(studentNumber);
        const blocker = validateTransition(workflow, step);
        if (blocker && step !== 'mou' && step !== 'title_registration') {
            throw new Error(blocker);
        }
        const repoRoot = resolveRepoRoot();
        const formsDir = path_1.default.join(repoRoot, 'ridiculous_forms');
        const sourceDocx = path_1.default.join(formsDir, stepToTemplate[step]);
        const outputPdf = buildOutputPdfPath(studentNumber, step);
        const outDir = path_1.default.dirname(outputPdf);
        yield promises_1.default.mkdir(outDir, { recursive: true });
        const script = `
set inFile to POSIX file "${sourceDocx}"
set outFile to "${outputPdf}"
tell application "Microsoft Word"
  open inFile read only true
  set theDoc to active document
  save as theDoc file name outFile file format format PDF
  close theDoc saving no
end tell
`;
        try {
            yield execFileAsync('osascript', ['-e', script], { timeout: 20000 });
        }
        catch (error) {
            // Fallback keeps exact template formatting by duplicating the maintained canonical PDF template.
            const templatePdf = sourceDocx.replace(/\.docx$/i, '.pdf');
            if (!(0, fs_1.existsSync)(templatePdf)) {
                throw error;
            }
            yield promises_1.default.copyFile(templatePdf, outputPdf);
        }
        yield (0, knex_1.default)('generated_documents').insert({
            workflow_id: workflow.id,
            step_key: step,
            source_docx: sourceDocx,
            output_pdf: outputPdf,
        });
        return { outputPdf, sourceDocx };
    });
}

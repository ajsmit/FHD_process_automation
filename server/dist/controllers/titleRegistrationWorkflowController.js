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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSasiAndCreateCase = checkSasiAndCreateCase;
exports.getCase = getCase;
exports.patchForm = patchForm;
exports.printPdf = printPdf;
exports.markStudentVetted = markStudentVetted;
exports.reviewSupervisor = reviewSupervisor;
exports.reviewDept = reviewDept;
exports.signChairperson = signChairperson;
exports.sendToFacultyByDept = sendToFacultyByDept;
exports.reviewFaculty = reviewFaculty;
exports.triggerFacultyReminder = triggerFacultyReminder;
exports.getPipeline = getPipeline;
exports.getTasks = getTasks;
exports.getToDo = getToDo;
exports.getPeople = getPeople;
exports.getNotifications = getNotifications;
exports.getExternalInvitesForCase = getExternalInvitesForCase;
exports.getSupervisorProfiles = getSupervisorProfiles;
exports.patchSupervisorProfile = patchSupervisorProfile;
exports.postSubmitSupervisorProfile = postSubmitSupervisorProfile;
exports.postRequestSupervisorProfiles = postRequestSupervisorProfiles;
exports.postSupervisorProfilesReminder = postSupervisorProfilesReminder;
exports.postUploadSupervisorProfileCv = postUploadSupervisorProfileCv;
exports.getMou = getMou;
exports.patchMou = patchMou;
exports.markMouCompleted = markMouCompleted;
exports.printMou = printMou;
exports.getIntentionToSubmit = getIntentionToSubmit;
exports.patchIntentionToSubmit = patchIntentionToSubmit;
exports.postSubmitIntentionToSubmit = postSubmitIntentionToSubmit;
exports.getAppointExaminers = getAppointExaminers;
exports.patchAppointExaminers = patchAppointExaminers;
exports.postSubmitAppointExaminers = postSubmitAppointExaminers;
exports.getChangeExaminers = getChangeExaminers;
exports.patchChangeExaminers = patchChangeExaminers;
exports.postSubmitChangeExaminers = postSubmitChangeExaminers;
exports.getExaminerSummaryCv = getExaminerSummaryCv;
exports.patchExaminerSummaryCv = patchExaminerSummaryCv;
exports.postSubmitExaminerSummaryCv = postSubmitExaminerSummaryCv;
exports.getAppointArbiter = getAppointArbiter;
exports.patchAppointArbiter = patchAppointArbiter;
exports.postSubmitAppointArbiter = postSubmitAppointArbiter;
const titleRegistrationWorkflowService_1 = require("../services/titleRegistrationWorkflowService");
const nextWaveModulesService_1 = require("../services/workflow/nextWaveModulesService");
function parseCaseId(value) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed) || parsed < 1) {
        throw new Error('Invalid case id');
    }
    return parsed;
}
function parseDecision(input) {
    if (input === 'vetted' || input === 'insufficient') {
        return input;
    }
    throw new Error('Decision must be "vetted" or "insufficient"');
}
function checkSasiAndCreateCase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const studentNumber = typeof req.params.studentNumber === 'string' ? req.params.studentNumber : '';
            const result = yield (0, titleRegistrationWorkflowService_1.checkAndPrefill)(studentNumber);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to check SASI and prefill', error: error instanceof Error ? error.message : error });
        }
    });
}
function getCase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(404).json({ message: error instanceof Error ? error.message : 'Case not found' });
        }
    });
}
function patchForm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const formPatch = req.body;
            const result = yield (0, titleRegistrationWorkflowService_1.updateForm)(caseId, formPatch);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update form' });
        }
    });
}
function printPdf(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.generatePdf)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to generate PDF' });
        }
    });
}
function markStudentVetted(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.studentVet)(caseId);
            res.status(200).json({ case: result });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to mark student vetted' });
        }
    });
}
function reviewSupervisor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const decision = parseDecision((_a = req.body) === null || _a === void 0 ? void 0 : _a.decision);
            const comments = typeof ((_b = req.body) === null || _b === void 0 ? void 0 : _b.comments) === 'string' ? req.body.comments : undefined;
            const result = yield (0, titleRegistrationWorkflowService_1.supervisorReview)(caseId, decision, comments);
            res.status(200).json({ case: result });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed supervisor review' });
        }
    });
}
function reviewDept(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const decision = parseDecision((_a = req.body) === null || _a === void 0 ? void 0 : _a.decision);
            const comments = typeof ((_b = req.body) === null || _b === void 0 ? void 0 : _b.comments) === 'string' ? req.body.comments : undefined;
            const result = yield (0, titleRegistrationWorkflowService_1.deptReview)(caseId, decision, comments);
            res.status(200).json({ case: result });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed dept review' });
        }
    });
}
function signChairperson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const comments = typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.comments) === 'string' ? req.body.comments : undefined;
            const result = yield (0, titleRegistrationWorkflowService_1.chairpersonSign)(caseId, comments);
            res.status(200).json({ case: result });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed chairperson signature' });
        }
    });
}
function sendToFacultyByDept(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.deptSendToFaculty)(caseId);
            res.status(200).json({ case: result });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed Dept send to Faculty' });
        }
    });
}
function reviewFaculty(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const decision = parseDecision((_a = req.body) === null || _a === void 0 ? void 0 : _a.decision);
            const comments = typeof ((_b = req.body) === null || _b === void 0 ? void 0 : _b.comments) === 'string' ? req.body.comments : undefined;
            const result = yield (0, titleRegistrationWorkflowService_1.facultyReview)(caseId, decision, comments);
            res.status(200).json({ case: result });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed faculty review' });
        }
    });
}
function triggerFacultyReminder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.sendFacultyReminderIfDue)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send reminder' });
        }
    });
}
function getPipeline(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, titleRegistrationWorkflowService_1.listPipeline)();
            res.status(200).json({ data: items });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load pipeline', error: error instanceof Error ? error.message : error });
        }
    });
}
function getTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, titleRegistrationWorkflowService_1.listTasks)();
            res.status(200).json({ data: items });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load tasks', error: error instanceof Error ? error.message : error });
        }
    });
}
function getToDo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, titleRegistrationWorkflowService_1.listToDoItems)();
            res.status(200).json({ data: items });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load to-do items', error: error instanceof Error ? error.message : error });
        }
    });
}
function getPeople(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const people = yield (0, titleRegistrationWorkflowService_1.listPeople)();
            res.status(200).json({ data: people });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load people', error: error instanceof Error ? error.message : error });
        }
    });
}
function getNotifications(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = typeof req.query.caseId === 'string' ? Number.parseInt(req.query.caseId, 10) : undefined;
            const notifications = yield (0, titleRegistrationWorkflowService_1.listNotifications)(caseId);
            res.status(200).json({ data: notifications });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load notifications', error: error instanceof Error ? error.message : error });
        }
    });
}
function getExternalInvitesForCase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const data = yield (0, titleRegistrationWorkflowService_1.listExternalInvitesForCase)(caseId);
            res.status(200).json({ data });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load external invite statuses', error: error instanceof Error ? error.message : error });
        }
    });
}
function getSupervisorProfiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const data = yield (0, titleRegistrationWorkflowService_1.listSupervisorProfiles)(caseId);
            res.status(200).json({ data });
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to load supervisor profiles', error: error instanceof Error ? error.message : error });
        }
    });
}
function patchSupervisorProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const profileId = parseCaseId(req.params.profileId);
            const profile = yield (0, titleRegistrationWorkflowService_1.updateSupervisorProfile)(profileId, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json({ profile });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update supervisor profile' });
        }
    });
}
function postSubmitSupervisorProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const profileId = parseCaseId(req.params.profileId);
            const profile = yield (0, titleRegistrationWorkflowService_1.submitSupervisorProfile)(profileId);
            res.status(200).json({ profile });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit supervisor profile' });
        }
    });
}
function postRequestSupervisorProfiles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.requestSupervisorProfiles)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to request supervisor profile completion' });
        }
    });
}
function postSupervisorProfilesReminder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.sendSupervisorProfilesReminder)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send supervisor profile reminder' });
        }
    });
}
function postUploadSupervisorProfileCv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const profileId = parseCaseId(req.params.profileId);
            const fileName = typeof ((_a = req.body) === null || _a === void 0 ? void 0 : _a.fileName) === 'string' ? req.body.fileName : '';
            const contentBase64 = typeof ((_b = req.body) === null || _b === void 0 ? void 0 : _b.contentBase64) === 'string' ? req.body.contentBase64 : '';
            const profile = yield (0, titleRegistrationWorkflowService_1.uploadSupervisorProfileCv)(profileId, fileName, contentBase64);
            res.status(200).json({ profile });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed CV upload' });
        }
    });
}
function getMou(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.getOrCreateMou)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load MOU' });
        }
    });
}
function patchMou(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const patch = req.body;
            const result = yield (0, titleRegistrationWorkflowService_1.updateMou)(caseId, patch);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update MOU' });
        }
    });
}
function markMouCompleted(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const record = yield (0, titleRegistrationWorkflowService_1.completeMou)(caseId);
            res.status(200).json({ record });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to complete MOU' });
        }
    });
}
function printMou(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, titleRegistrationWorkflowService_1.generateMouPdf)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to generate MOU PDF' });
        }
    });
}
function getIntentionToSubmit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.getOrCreateIntentionToSubmit)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Intention to Submit' });
        }
    });
}
function patchIntentionToSubmit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.updateIntentionToSubmit)(caseId, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Intention to Submit' });
        }
    });
}
function postSubmitIntentionToSubmit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const record = yield (0, nextWaveModulesService_1.submitIntentionToSubmit)(caseId);
            res.status(200).json({ record });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Intention to Submit' });
        }
    });
}
function getAppointExaminers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.getOrCreateAppointExaminers)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Appoint Examiners' });
        }
    });
}
function patchAppointExaminers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.updateAppointExaminers)(caseId, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Appoint Examiners' });
        }
    });
}
function postSubmitAppointExaminers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const record = yield (0, nextWaveModulesService_1.submitAppointExaminers)(caseId);
            res.status(200).json({ record });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Appoint Examiners' });
        }
    });
}
function getChangeExaminers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.getOrCreateChangeExaminers)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Change Examiners' });
        }
    });
}
function patchChangeExaminers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.updateChangeExaminers)(caseId, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Change Examiners' });
        }
    });
}
function postSubmitChangeExaminers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const record = yield (0, nextWaveModulesService_1.submitChangeExaminers)(caseId);
            res.status(200).json({ record });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Change Examiners' });
        }
    });
}
function getExaminerSummaryCv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.getOrCreateExaminerSummaryCv)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Examiner Summary CV' });
        }
    });
}
function patchExaminerSummaryCv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.updateExaminerSummaryCv)(caseId, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Examiner Summary CV' });
        }
    });
}
function postSubmitExaminerSummaryCv(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const record = yield (0, nextWaveModulesService_1.submitExaminerSummaryCv)(caseId);
            res.status(200).json({ record });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Examiner Summary CV' });
        }
    });
}
function getAppointArbiter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.getOrCreateAppointArbiter)(caseId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Appoint Arbiter' });
        }
    });
}
function patchAppointArbiter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const caseId = parseCaseId(req.params.caseId);
            const result = yield (0, nextWaveModulesService_1.updateAppointArbiter)(caseId, (_a = req.body) !== null && _a !== void 0 ? _a : {});
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Appoint Arbiter' });
        }
    });
}
function postSubmitAppointArbiter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const caseId = parseCaseId(req.params.caseId);
            const record = yield (0, nextWaveModulesService_1.submitAppointArbiter)(caseId);
            res.status(200).json({ record });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Appoint Arbiter' });
        }
    });
}

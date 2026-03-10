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
exports.getOrCreateIntentionToSubmit = getOrCreateIntentionToSubmit;
exports.updateIntentionToSubmit = updateIntentionToSubmit;
exports.submitIntentionToSubmit = submitIntentionToSubmit;
exports.getOrCreateAppointExaminers = getOrCreateAppointExaminers;
exports.updateAppointExaminers = updateAppointExaminers;
exports.submitAppointExaminers = submitAppointExaminers;
exports.getOrCreateChangeExaminers = getOrCreateChangeExaminers;
exports.updateChangeExaminers = updateChangeExaminers;
exports.submitChangeExaminers = submitChangeExaminers;
exports.getOrCreateExaminerSummaryCv = getOrCreateExaminerSummaryCv;
exports.updateExaminerSummaryCv = updateExaminerSummaryCv;
exports.submitExaminerSummaryCv = submitExaminerSummaryCv;
exports.getOrCreateAppointArbiter = getOrCreateAppointArbiter;
exports.updateAppointArbiter = updateAppointArbiter;
exports.submitAppointArbiter = submitAppointArbiter;
const knex_1 = __importDefault(require("../../db/knex"));
const titleRegistrationWorkflowService_1 = require("../titleRegistrationWorkflowService");
function parseJsonObject(raw) {
    return JSON.parse(raw);
}
function sanitiseText(value) {
    return typeof value === 'string' ? value : '';
}
function boolFrom(value) {
    return value === true;
}
function resolveThesisType(formData) {
    if (boolFrom(formData['PhD by traditional thesis format']))
        return 'PhD by traditional thesis format';
    if (boolFrom(formData['PhD by publication']))
        return 'PhD by publication';
    if (boolFrom(formData['Masters Full-thesis']))
        return 'Masters Full-thesis';
    if (boolFrom(formData['Masters Mini thesis']))
        return 'Masters Mini thesis';
    if (boolFrom(formData['Masters by publication']))
        return 'Masters by publication';
    return sanitiseText(formData.Degree);
}
function resolveCoSupervisors(formData) {
    if (sanitiseText(formData['Has Co-supervisor?']) !== 'Yes') {
        return 'Not applicable';
    }
    const co1 = sanitiseText(formData['Co-supervisor']);
    const co2 = sanitiseText(formData['Second Co-supervisor']);
    const names = [co1, co2]
        .map((value) => value.trim())
        .filter((value) => value && value.toUpperCase() !== 'NA');
    return names.length > 0 ? names.join('; ') : 'Not applicable';
}
function resolveStudentFullName(formData) {
    return [
        sanitiseText(formData['Student Title']),
        sanitiseText(formData['Student First-Name']),
        sanitiseText(formData['Student Surname']),
    ]
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function requiredCompletionPercent(formData, requiredKeys) {
    let completed = 0;
    for (const key of requiredKeys) {
        const value = formData[key];
        if (typeof value === 'string') {
            if (value.trim())
                completed += 1;
            continue;
        }
        if (typeof value === 'number') {
            completed += 1;
        }
    }
    return Math.round((completed / requiredKeys.length) * 100);
}
function upsertModuleEntry(caseId, moduleName, status, summary) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, knex_1.default)('module_entries')
            .insert({
            case_id: caseId,
            module_name: moduleName,
            status,
            summary,
            updated_at: knex_1.default.fn.now(),
        })
            .onConflict(['case_id', 'module_name'])
            .merge({ status, summary, updated_at: knex_1.default.fn.now() });
    });
}
function readModuleRecord(table, caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield (0, knex_1.default)(table).where({ case_id: caseId }).first();
        return record !== null && record !== void 0 ? record : undefined;
    });
}
function assertSubmitted(table, caseId, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield readModuleRecord(table, caseId);
        if (!record || record.status !== 'submitted') {
            throw new Error(`${label} must be submitted before this module can start.`);
        }
    });
}
function ensureItsPrerequisite(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { formData } = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
        if (formData['Has the MOU been submitted?'] !== 'Yes') {
            throw new Error('INTENTION_TO_SUBMIT can start only after MOU is submitted.');
        }
    });
}
function ensureAppointExaminersPrerequisite(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield assertSubmitted('intention_to_submit_forms', caseId, 'INTENTION_TO_SUBMIT');
    });
}
function ensureChangeExaminersPrerequisite(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield assertSubmitted('appoint_examiners_forms', caseId, 'APPOINT_EXAMINERS');
    });
}
function ensureSummaryPrerequisite(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const appoint = yield readModuleRecord('appoint_examiners_forms', caseId);
        const change = yield readModuleRecord('change_examiners_forms', caseId);
        if (((_a = appoint === null || appoint === void 0 ? void 0 : appoint.status) !== null && _a !== void 0 ? _a : '') !== 'submitted' && ((_b = change === null || change === void 0 ? void 0 : change.status) !== null && _b !== void 0 ? _b : '') !== 'submitted') {
            throw new Error('EXAMINER_SUMMARY_CV can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted.');
        }
    });
}
function ensureArbiterPrerequisite(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const appoint = yield readModuleRecord('appoint_examiners_forms', caseId);
        const change = yield readModuleRecord('change_examiners_forms', caseId);
        if (((_a = appoint === null || appoint === void 0 ? void 0 : appoint.status) !== null && _a !== void 0 ? _a : '') !== 'submitted' && ((_b = change === null || change === void 0 ? void 0 : change.status) !== null && _b !== void 0 ? _b : '') !== 'submitted') {
            throw new Error('APPOINT_ARBITER can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted.');
        }
    });
}
function defaultItsFromRott(formData) {
    const hasCo = sanitiseText(formData['Has Co-supervisor?']) === 'Yes';
    return {
        'Student Full Name': resolveStudentFullName(formData),
        'Student Number': sanitiseText(formData['Student Number']),
        Department: sanitiseText(formData.Department),
        Degree: resolveThesisType(formData),
        Supervisor: sanitiseText(formData.Supervisor),
        'Co-supervisor(s)': resolveCoSupervisors(formData),
        'Thesis title': sanitiseText(formData['Thesis title']),
        'Year of first enrolment': sanitiseText(formData['Year first registered']),
        'Submission type': '',
        'Intended submission date': '',
        'Student declaration': 'I confirm that this intention to submit is accurate and ready for supervisory review.',
        'Student signature date': '',
        'Supervisor approval status': 'Pending',
        'Co-supervisor approval status': hasCo ? 'Pending' : 'Not applicable',
        'Department PG coordinator approval status': 'Pending',
        'Non-approval motivation': '',
    };
}
function itsCompletion(formData) {
    return requiredCompletionPercent(formData, [
        'Student Full Name',
        'Student Number',
        'Department',
        'Degree',
        'Supervisor',
        'Thesis title',
        'Year of first enrolment',
        'Submission type',
        'Intended submission date',
        'Student declaration',
        'Student signature date',
    ]);
}
function defaultAppointExaminersFromRott(formData) {
    return {
        'Student Full Name': resolveStudentFullName(formData),
        'Student Number': sanitiseText(formData['Student Number']),
        'Faculty and Department': sanitiseText(formData.Department),
        Degree: resolveThesisType(formData),
        Supervisor: sanitiseText(formData.Supervisor),
        'Co-supervisor(s)': resolveCoSupervisors(formData),
        'Thesis title': sanitiseText(formData['Thesis title']),
        'Year of first enrolment': sanitiseText(formData['Year first registered']),
        'Title already registered': 'Yes',
        'Concurrent title-change declaration': '',
        'Examiner 1 Name': '',
        'Examiner 1 Type': '',
        'Examiner 1 Affiliation': '',
        'Examiner 1 Motivation': '',
        'Examiner 1 CV received': 'No',
        'Examiner 1 Conflict disclosure': '',
        'Examiner 2 Name': '',
        'Examiner 2 Type': '',
        'Examiner 2 Affiliation': '',
        'Examiner 2 Motivation': '',
        'Examiner 2 CV received': 'No',
        'Examiner 2 Conflict disclosure': '',
        'Examiner 3 Name': '',
        'Examiner 3 Type': '',
        'Examiner 3 Affiliation': '',
        'Examiner 3 Motivation': '',
        'Examiner 3 CV received': 'No',
        'Examiner 3 Conflict disclosure': '',
    };
}
function appointExaminersCompletion(formData) {
    return requiredCompletionPercent(formData, [
        'Student Full Name',
        'Student Number',
        'Faculty and Department',
        'Degree',
        'Supervisor',
        'Thesis title',
        'Year of first enrolment',
        'Title already registered',
        'Examiner 1 Name',
        'Examiner 1 Type',
        'Examiner 1 Affiliation',
        'Examiner 1 Motivation',
        'Examiner 1 CV received',
        'Examiner 1 Conflict disclosure',
        'Examiner 2 Name',
        'Examiner 2 Type',
        'Examiner 2 Affiliation',
        'Examiner 2 Motivation',
        'Examiner 2 CV received',
        'Examiner 2 Conflict disclosure',
    ]);
}
function examinersPanelSummary(formData) {
    const rows = [1, 2, 3]
        .map((idx) => {
        const name = sanitiseText(formData[`Examiner ${idx} Name`]);
        const type = sanitiseText(formData[`Examiner ${idx} Type`]);
        const affiliation = sanitiseText(formData[`Examiner ${idx} Affiliation`]);
        if (!name.trim())
            return '';
        return `${name}${type ? ` (${type})` : ''}${affiliation ? ` - ${affiliation}` : ''}`;
    })
        .filter(Boolean);
    return rows.join('; ');
}
function defaultChangeExaminers(formData, appointData) {
    return {
        'Student Full Name': resolveStudentFullName(formData),
        'Student Number': sanitiseText(formData['Student Number']),
        'Thesis title': sanitiseText(formData['Thesis title']),
        'Current examiner panel summary': examinersPanelSummary(appointData),
        'Change motivation': '',
        'Replacement Examiner 1 Name': '',
        'Replacement Examiner 1 Type': '',
        'Replacement Examiner 1 Affiliation': '',
        'Replacement Examiner 1 Motivation': '',
        'Replacement Examiner 2 Name': '',
        'Replacement Examiner 2 Type': '',
        'Replacement Examiner 2 Affiliation': '',
        'Replacement Examiner 2 Motivation': '',
    };
}
function changeExaminersCompletion(formData) {
    return requiredCompletionPercent(formData, [
        'Student Full Name',
        'Student Number',
        'Thesis title',
        'Current examiner panel summary',
        'Change motivation',
        'Replacement Examiner 1 Name',
        'Replacement Examiner 1 Type',
        'Replacement Examiner 1 Affiliation',
        'Replacement Examiner 1 Motivation',
    ]);
}
function defaultExaminerSummary(formData, panelSummary) {
    return {
        'Student Full Name': resolveStudentFullName(formData),
        'Student Number': sanitiseText(formData['Student Number']),
        'Thesis title': sanitiseText(formData['Thesis title']),
        'Examiner panel summary': panelSummary,
        'Summary CV packet status': 'Pending',
        'Compiled by': '',
        'Compilation date': '',
        Notes: '',
    };
}
function examinerSummaryCompletion(formData) {
    return requiredCompletionPercent(formData, [
        'Student Full Name',
        'Student Number',
        'Thesis title',
        'Examiner panel summary',
        'Summary CV packet status',
        'Compiled by',
        'Compilation date',
    ]);
}
function defaultArbiter(formData, panelSummary) {
    return {
        'Student Full Name': resolveStudentFullName(formData),
        'Student Number': sanitiseText(formData['Student Number']),
        'Thesis title': sanitiseText(formData['Thesis title']),
        'Examiner panel summary': panelSummary,
        'Arbiter Name': '',
        'Arbiter Type': '',
        'Arbiter Affiliation': '',
        'Arbiter Motivation': '',
        'Arbiter CV received': 'No',
        'Arbiter conflict disclosure': '',
    };
}
function arbiterCompletion(formData) {
    return requiredCompletionPercent(formData, [
        'Student Full Name',
        'Student Number',
        'Thesis title',
        'Examiner panel summary',
        'Arbiter Name',
        'Arbiter Type',
        'Arbiter Affiliation',
        'Arbiter Motivation',
        'Arbiter CV received',
        'Arbiter conflict disclosure',
    ]);
}
function getOrCreateRecord(table, caseId, moduleName, prefill, completionCalculator) {
    return __awaiter(this, void 0, void 0, function* () {
        let record = yield (0, knex_1.default)(table).where({ case_id: caseId }).first();
        if (!record) {
            const completionPercent = completionCalculator(prefill);
            const [id] = yield (0, knex_1.default)(table).insert({
                case_id: caseId,
                form_data_json: JSON.stringify(prefill),
                completion_percent: completionPercent,
                status: 'draft',
            });
            record = yield (0, knex_1.default)(table).where({ id }).first();
            if (!record) {
                throw new Error(`Failed to create ${moduleName} module record.`);
            }
        }
        const formData = parseJsonObject(record.form_data_json);
        const summary = record.status === 'submitted'
            ? `${moduleName} submitted.`
            : `${moduleName} draft in progress (${record.completion_percent}%).`;
        const moduleStatus = record.status === 'submitted' ? 'approved' : 'in_progress';
        yield upsertModuleEntry(caseId, moduleName, moduleStatus, summary);
        return { record, formData };
    });
}
function updateRecord(table, caseId, moduleName, patch, getter, completionCalculator) {
    return __awaiter(this, void 0, void 0, function* () {
        const { record, formData } = yield getter(caseId);
        if (record.status === 'submitted') {
            throw new Error(`${moduleName} is already submitted.`);
        }
        const merged = Object.assign(Object.assign({}, formData), patch);
        const completionPercent = completionCalculator(merged);
        yield (0, knex_1.default)(table).where({ id: record.id }).update({
            form_data_json: JSON.stringify(merged),
            completion_percent: completionPercent,
            updated_at: knex_1.default.fn.now(),
        });
        const updated = yield (0, knex_1.default)(table).where({ id: record.id }).first();
        if (!updated) {
            throw new Error(`Failed to update ${moduleName}.`);
        }
        yield upsertModuleEntry(caseId, moduleName, 'in_progress', `${moduleName} draft in progress (${completionPercent}%).`);
        return { record: updated, formData: merged };
    });
}
function submitRecord(table, caseId, moduleName, getter) {
    return __awaiter(this, void 0, void 0, function* () {
        const { record } = yield getter(caseId);
        if (record.completion_percent < 100) {
            throw new Error(`${moduleName} is incomplete. Save all required fields before submit.`);
        }
        yield (0, knex_1.default)(table).where({ id: record.id }).update({
            status: 'submitted',
            submitted_at: knex_1.default.fn.now(),
            updated_at: knex_1.default.fn.now(),
        });
        yield upsertModuleEntry(caseId, moduleName, 'approved', `${moduleName} submitted and ready for downstream workflow.`);
        const updated = yield (0, knex_1.default)(table).where({ id: record.id }).first();
        if (!updated) {
            throw new Error(`Failed to submit ${moduleName}.`);
        }
        return updated;
    });
}
function getOrCreateIntentionToSubmit(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureItsPrerequisite(caseId);
        const { formData } = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
        return getOrCreateRecord('intention_to_submit_forms', caseId, 'intention_to_submit', defaultItsFromRott(formData), itsCompletion);
    });
}
function updateIntentionToSubmit(caseId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        return updateRecord('intention_to_submit_forms', caseId, 'intention_to_submit', patch, getOrCreateIntentionToSubmit, itsCompletion);
    });
}
function submitIntentionToSubmit(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return submitRecord('intention_to_submit_forms', caseId, 'intention_to_submit', getOrCreateIntentionToSubmit);
    });
}
function getOrCreateAppointExaminers(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureAppointExaminersPrerequisite(caseId);
        const { formData } = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
        return getOrCreateRecord('appoint_examiners_forms', caseId, 'appoint_examiners', defaultAppointExaminersFromRott(formData), appointExaminersCompletion);
    });
}
function updateAppointExaminers(caseId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        return updateRecord('appoint_examiners_forms', caseId, 'appoint_examiners', patch, getOrCreateAppointExaminers, appointExaminersCompletion);
    });
}
function submitAppointExaminers(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return submitRecord('appoint_examiners_forms', caseId, 'appoint_examiners', getOrCreateAppointExaminers);
    });
}
function getOrCreateChangeExaminers(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureChangeExaminersPrerequisite(caseId);
        const { formData } = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
        const appoint = yield getOrCreateAppointExaminers(caseId);
        return getOrCreateRecord('change_examiners_forms', caseId, 'change_examiners', defaultChangeExaminers(formData, appoint.formData), changeExaminersCompletion);
    });
}
function updateChangeExaminers(caseId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        return updateRecord('change_examiners_forms', caseId, 'change_examiners', patch, getOrCreateChangeExaminers, changeExaminersCompletion);
    });
}
function submitChangeExaminers(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return submitRecord('change_examiners_forms', caseId, 'change_examiners', getOrCreateChangeExaminers);
    });
}
function getOrCreateExaminerSummaryCv(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureSummaryPrerequisite(caseId);
        const { formData } = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
        const changeRecord = yield readModuleRecord('change_examiners_forms', caseId);
        const appointRecord = yield readModuleRecord('appoint_examiners_forms', caseId);
        const summarySource = (changeRecord === null || changeRecord === void 0 ? void 0 : changeRecord.status) === 'submitted'
            ? parseJsonObject(changeRecord.form_data_json)['Current examiner panel summary']
            : appointRecord
                ? examinersPanelSummary(parseJsonObject(appointRecord.form_data_json))
                : '';
        return getOrCreateRecord('examiner_summary_cv_forms', caseId, 'examiner_summary_cv', defaultExaminerSummary(formData, summarySource), examinerSummaryCompletion);
    });
}
function updateExaminerSummaryCv(caseId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        return updateRecord('examiner_summary_cv_forms', caseId, 'examiner_summary_cv', patch, getOrCreateExaminerSummaryCv, examinerSummaryCompletion);
    });
}
function submitExaminerSummaryCv(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return submitRecord('examiner_summary_cv_forms', caseId, 'examiner_summary_cv', getOrCreateExaminerSummaryCv);
    });
}
function getOrCreateAppointArbiter(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureArbiterPrerequisite(caseId);
        const { formData } = yield (0, titleRegistrationWorkflowService_1.getCaseById)(caseId);
        const changeRecord = yield readModuleRecord('change_examiners_forms', caseId);
        const appointRecord = yield readModuleRecord('appoint_examiners_forms', caseId);
        const panelSummary = (changeRecord === null || changeRecord === void 0 ? void 0 : changeRecord.status) === 'submitted'
            ? parseJsonObject(changeRecord.form_data_json)['Current examiner panel summary']
            : appointRecord
                ? examinersPanelSummary(parseJsonObject(appointRecord.form_data_json))
                : '';
        return getOrCreateRecord('appoint_arbiter_forms', caseId, 'appoint_arbiter', defaultArbiter(formData, panelSummary), arbiterCompletion);
    });
}
function updateAppointArbiter(caseId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        return updateRecord('appoint_arbiter_forms', caseId, 'appoint_arbiter', patch, getOrCreateAppointArbiter, arbiterCompletion);
    });
}
function submitAppointArbiter(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return submitRecord('appoint_arbiter_forms', caseId, 'appoint_arbiter', getOrCreateAppointArbiter);
    });
}

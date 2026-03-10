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
exports.checkStudentEligibility = checkStudentEligibility;
exports.getOrCreateMou = getOrCreateMou;
exports.updateMou = updateMou;
exports.completeMou = completeMou;
exports.generateMouPdf = generateMouPdf;
exports.checkAndPrefill = checkAndPrefill;
exports.getCaseById = getCaseById;
exports.updateForm = updateForm;
exports.generatePdf = generatePdf;
exports.studentVet = studentVet;
exports.supervisorReview = supervisorReview;
exports.deptReview = deptReview;
exports.chairpersonSign = chairpersonSign;
exports.deptSendToFaculty = deptSendToFaculty;
exports.listSupervisorProfiles = listSupervisorProfiles;
exports.updateSupervisorProfile = updateSupervisorProfile;
exports.submitSupervisorProfile = submitSupervisorProfile;
exports.requestSupervisorProfiles = requestSupervisorProfiles;
exports.sendSupervisorProfilesReminder = sendSupervisorProfilesReminder;
exports.uploadSupervisorProfileCv = uploadSupervisorProfileCv;
exports.facultyReview = facultyReview;
exports.sendFacultyReminderIfDue = sendFacultyReminderIfDue;
exports.listPipeline = listPipeline;
exports.listTasks = listTasks;
exports.listExternalInvitesForCase = listExternalInvitesForCase;
exports.listToDoItems = listToDoItems;
exports.listPeople = listPeople;
exports.listNotifications = listNotifications;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const knex_1 = __importDefault(require("../db/knex"));
const sasiService_1 = require("./sasiService");
const mouPdfService_1 = require("./pdf-generation/mouPdfService");
const titleRegistrationPdfService_1 = require("./pdf-generation/titleRegistrationPdfService");
const operationsFeedService_1 = require("./operationsFeedService");
const titleRegistrationTransitions_1 = require("./workflow/titleRegistrationTransitions");
const moduleNames = [
    'mou',
    'supervisor_profiles',
    'intention_to_submit',
    'appoint_examiners',
    'change_examiners',
    'examiner_summary_cv',
    'appoint_arbiter',
    'tasks',
    'approvals',
    'people',
    'system',
    'radar',
    'pipeline',
    'timelines',
    'calendar',
    'kanban',
    'team',
    'policy',
];
function toDdMmYyyy(dateString) {
    if (!dateString) {
        return '';
    }
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) {
        return '';
    }
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}
function checkStudentEligibility(student) {
    const reasons = [];
    if (!student.registration_active) {
        reasons.push('Student is not currently registered on SASI. Only registered students can proceed with this submission.');
    }
    if (!student.first_registration_date) {
        reasons.push('Missing first registration date on SASI.');
        return { eligible: false, reasons };
    }
    const now = new Date();
    const firstReg = new Date(student.first_registration_date);
    if (Number.isNaN(firstReg.getTime())) {
        reasons.push('Invalid first registration date on SASI.');
        return { eligible: false, reasons };
    }
    if (now.getFullYear() > student.first_enrolment_year) {
        reasons.push('Title registration should be completed in the first enrolment year before annual progress reporting.');
    }
    return { eligible: reasons.length === 0, reasons };
}
function buildPrefill(student) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const isPhd = student.degree_level === 'PHD';
    const isMaster = student.degree_level === 'MSC';
    const ethics = student.ethics_required ? 'Yes' : 'No';
    const firstReg = toDdMmYyyy(student.first_registration_date);
    const firstRegYear = firstReg ? firstReg.slice(6, 10) : String(student.first_enrolment_year);
    const hasCoSupervisor = Boolean((_a = student.co_supervisor_name) === null || _a === void 0 ? void 0 : _a.trim());
    const adminSame = ((_b = student.admin_supervisor_name) !== null && _b !== void 0 ? _b : '').trim().toLowerCase() === ((_c = student.supervisor_name) !== null && _c !== void 0 ? _c : '').trim().toLowerCase();
    return {
        'Student Title': (_d = student.title) !== null && _d !== void 0 ? _d : '',
        'Student First-Name': student.first_names,
        'Student Surname': student.last_name,
        'Student Number': student.student_number,
        Department: student.department,
        Degree: student.degree_level,
        'Date of first title registration on SASI': firstReg,
        'Student registration active on SASI': student.registration_active ? 'Yes' : 'No',
        'PhD by traditional thesis format': isPhd,
        'PhD by publication': false,
        'Masters Full-thesis': isMaster && student.degree_type === 'FULL_THESIS',
        'Masters Mini thesis': isMaster && student.degree_type === 'MINI_THESIS',
        'Masters by publication': isMaster && student.degree_type === 'PROJECT',
        'Supervisor Title': 'Dr',
        Supervisor: (_e = student.supervisor_name) !== null && _e !== void 0 ? _e : 'AJ Smit',
        'Supervisor Qualifications': (_f = student.supervisor_qualifications) !== null && _f !== void 0 ? _f : 'PhD',
        'Supervisor is UWC-internal': 'Yes',
        'Supervisor External Lookup Id': '',
        'Supervisor External First Name': '',
        'Supervisor External Surname': '',
        'Supervisor External Address': '',
        'Supervisor External Email': '',
        'Administrative Supervisor same as Supervisor': adminSame ? 'Yes' : 'No',
        'Administrative Supervisor (Nominal Role)': (_g = student.admin_supervisor_name) !== null && _g !== void 0 ? _g : 'Adriaan Engelbrecht',
        'Administrative Supervisor Qualifications (Nominal Role)': (_h = student.admin_supervisor_qualifications) !== null && _h !== void 0 ? _h : 'PhD',
        'Administrative Supervisor is UWC-internal': 'Yes',
        'Administrative Supervisor External Lookup Id': '',
        'Administrative Supervisor External Title': '',
        'Administrative Supervisor External First Name': '',
        'Administrative Supervisor External Surname': '',
        'Administrative Supervisor External Address': '',
        'Administrative Supervisor External Email': '',
        'Has Co-supervisor?': hasCoSupervisor ? 'Yes' : 'No',
        'Co-supervisor Title': hasCoSupervisor ? 'Dr' : 'NA',
        'Co-supervisor': hasCoSupervisor ? ((_j = student.co_supervisor_name) !== null && _j !== void 0 ? _j : '') : 'NA',
        'Co-supervisor Qualifications': hasCoSupervisor ? ((_k = student.co_supervisor_qualifications) !== null && _k !== void 0 ? _k : 'PhD') : 'NA',
        'Co-supervisor is UWC-internal': 'Yes',
        'Co-supervisor External Lookup Id': '',
        'Co-supervisor External First Name': '',
        'Co-supervisor External Surname': '',
        'Co-supervisor External Address': '',
        'Co-supervisor External Email': '',
        'Second Co-supervisor Title': 'NA',
        'Second Co-supervisor': 'NA',
        'Second Co-supervisor Qualifications': 'NA',
        'Second Co-supervisor is UWC-internal': 'Yes',
        'Second Co-supervisor External Lookup Id': '',
        'Second Co-supervisor External First Name': '',
        'Second Co-supervisor External Surname': '',
        'Second Co-supervisor External Address': '',
        'Second Co-supervisor External Email': '',
        'Thesis title': (_l = student.thesis_title) !== null && _l !== void 0 ? _l : '',
        'Key words': '',
        'Does this project need Ethics clearance?': ethics,
        'Ethics clearance reference number': (_m = student.ethics_ref_number) !== null && _m !== void 0 ? _m : '',
        'Date on which ethics clearance was issued': '',
        'Has the MOU been submitted?': 'No',
        'Year first registered': firstRegYear,
        'Semester first registered': String((_o = student.first_registration_semester) !== null && _o !== void 0 ? _o : ''),
        'Initial thesis title for upgrade from Masters to Doctoral': '',
        Abstract: '',
        'PhD proposal link (5-10 pages incl. timeframes)': '',
    };
}
function normalizeLegacyFormData(input) {
    const mapped = Object.assign({}, input);
    if (typeof mapped['Date of first title registration (dd-mm-yyyy)'] === 'string' && !mapped['Date of first title registration on SASI']) {
        mapped['Date of first title registration on SASI'] = mapped['Date of first title registration (dd-mm-yyyy)'];
    }
    if (typeof mapped['Departmental Higher Degrees Representative'] === 'string' && !mapped['Administrative Supervisor (Nominal Role)']) {
        mapped['Administrative Supervisor (Nominal Role)'] = mapped['Departmental Higher Degrees Representative'];
    }
    if (typeof mapped['Departmental Higher Degrees Representative Qualifications'] === 'string' && !mapped['Administrative Supervisor Qualifications (Nominal Role)']) {
        mapped['Administrative Supervisor Qualifications (Nominal Role)'] = mapped['Departmental Higher Degrees Representative Qualifications'];
    }
    if (typeof mapped['PhD proposal link (5-10 pages incl. timeframes)'] !== 'string') {
        mapped['PhD proposal link (5-10 pages incl. timeframes)'] = '';
    }
    if (mapped['Student registration active on SASI'] !== 'Yes' && mapped['Student registration active on SASI'] !== 'No') {
        mapped['Student registration active on SASI'] = 'Yes';
    }
    if (typeof mapped['Supervisor Title'] !== 'string') {
        mapped['Supervisor Title'] = '';
    }
    if (typeof mapped['Co-supervisor Title'] !== 'string') {
        mapped['Co-supervisor Title'] = '';
    }
    if (mapped['Administrative Supervisor same as Supervisor'] !== 'Yes' && mapped['Administrative Supervisor same as Supervisor'] !== 'No') {
        mapped['Administrative Supervisor same as Supervisor'] = 'No';
    }
    if (mapped['Has Co-supervisor?'] !== 'Yes' && mapped['Has Co-supervisor?'] !== 'No') {
        mapped['Has Co-supervisor?'] = typeof mapped['Co-supervisor'] === 'string' && hasNamedPerson(String(mapped['Co-supervisor'])) ? 'Yes' : 'No';
    }
    if (mapped['Supervisor is UWC-internal'] !== 'Yes' && mapped['Supervisor is UWC-internal'] !== 'No') {
        mapped['Supervisor is UWC-internal'] = 'Yes';
    }
    if (typeof mapped['Supervisor External Lookup Id'] !== 'string') {
        mapped['Supervisor External Lookup Id'] = '';
    }
    if (typeof mapped['Supervisor External First Name'] !== 'string') {
        mapped['Supervisor External First Name'] = '';
    }
    if (typeof mapped['Supervisor External Surname'] !== 'string') {
        mapped['Supervisor External Surname'] = '';
    }
    if (mapped['Co-supervisor is UWC-internal'] !== 'Yes' && mapped['Co-supervisor is UWC-internal'] !== 'No') {
        mapped['Co-supervisor is UWC-internal'] = 'Yes';
    }
    if (typeof mapped['Co-supervisor External Lookup Id'] !== 'string') {
        mapped['Co-supervisor External Lookup Id'] = '';
    }
    if (typeof mapped['Co-supervisor External First Name'] !== 'string') {
        mapped['Co-supervisor External First Name'] = '';
    }
    if (typeof mapped['Co-supervisor External Surname'] !== 'string') {
        mapped['Co-supervisor External Surname'] = '';
    }
    if (mapped['Administrative Supervisor is UWC-internal'] !== 'Yes' && mapped['Administrative Supervisor is UWC-internal'] !== 'No') {
        mapped['Administrative Supervisor is UWC-internal'] = 'Yes';
    }
    if (typeof mapped['Administrative Supervisor External Lookup Id'] !== 'string') {
        mapped['Administrative Supervisor External Lookup Id'] = '';
    }
    if (typeof mapped['Administrative Supervisor External Title'] !== 'string') {
        mapped['Administrative Supervisor External Title'] = '';
    }
    if (typeof mapped['Administrative Supervisor External First Name'] !== 'string') {
        mapped['Administrative Supervisor External First Name'] = '';
    }
    if (typeof mapped['Administrative Supervisor External Surname'] !== 'string') {
        mapped['Administrative Supervisor External Surname'] = '';
    }
    if (typeof mapped['Administrative Supervisor External Address'] !== 'string') {
        mapped['Administrative Supervisor External Address'] = '';
    }
    if (typeof mapped['Administrative Supervisor External Email'] !== 'string') {
        mapped['Administrative Supervisor External Email'] = '';
    }
    if (typeof mapped['Supervisor External Address'] !== 'string') {
        mapped['Supervisor External Address'] = '';
    }
    if (typeof mapped['Supervisor External Email'] !== 'string') {
        mapped['Supervisor External Email'] = '';
    }
    if (typeof mapped['Co-supervisor External Address'] !== 'string') {
        mapped['Co-supervisor External Address'] = '';
    }
    if (typeof mapped['Co-supervisor External Email'] !== 'string') {
        mapped['Co-supervisor External Email'] = '';
    }
    if (typeof mapped['Second Co-supervisor Title'] !== 'string') {
        mapped['Second Co-supervisor Title'] = 'NA';
    }
    if (typeof mapped['Second Co-supervisor'] !== 'string') {
        mapped['Second Co-supervisor'] = 'NA';
    }
    if (typeof mapped['Second Co-supervisor Qualifications'] !== 'string') {
        mapped['Second Co-supervisor Qualifications'] = 'NA';
    }
    if (mapped['Second Co-supervisor is UWC-internal'] !== 'Yes' && mapped['Second Co-supervisor is UWC-internal'] !== 'No') {
        mapped['Second Co-supervisor is UWC-internal'] = 'Yes';
    }
    if (typeof mapped['Second Co-supervisor External Lookup Id'] !== 'string') {
        mapped['Second Co-supervisor External Lookup Id'] = '';
    }
    if (typeof mapped['Second Co-supervisor External First Name'] !== 'string') {
        mapped['Second Co-supervisor External First Name'] = '';
    }
    if (typeof mapped['Second Co-supervisor External Surname'] !== 'string') {
        mapped['Second Co-supervisor External Surname'] = '';
    }
    if (typeof mapped['Second Co-supervisor External Address'] !== 'string') {
        mapped['Second Co-supervisor External Address'] = '';
    }
    if (typeof mapped['Second Co-supervisor External Email'] !== 'string') {
        mapped['Second Co-supervisor External Email'] = '';
    }
    if (mapped['Has Co-supervisor?'] === 'No') {
        mapped['Co-supervisor Title'] = 'NA';
        mapped['Co-supervisor'] = 'NA';
        mapped['Co-supervisor Qualifications'] = 'NA';
        mapped['Co-supervisor External Lookup Id'] = '';
        mapped['Co-supervisor External First Name'] = '';
        mapped['Co-supervisor External Surname'] = '';
        mapped['Co-supervisor External Address'] = '';
        mapped['Co-supervisor External Email'] = '';
        mapped['Second Co-supervisor Title'] = 'NA';
        mapped['Second Co-supervisor'] = 'NA';
        mapped['Second Co-supervisor Qualifications'] = 'NA';
        mapped['Second Co-supervisor External Lookup Id'] = '';
        mapped['Second Co-supervisor External First Name'] = '';
        mapped['Second Co-supervisor External Surname'] = '';
        mapped['Second Co-supervisor External Address'] = '';
        mapped['Second Co-supervisor External Email'] = '';
    }
    return mapped;
}
function parseKeywords(raw) {
    return raw
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
}
function isNotApplicable(value) {
    return value.trim().toUpperCase() === 'NA';
}
function hasNamedPerson(value) {
    const trimmed = value.trim();
    return Boolean(trimmed) && !isNotApplicable(trimmed);
}
function wordCount(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}
function sanitizeThesisTitle(value) {
    // Normalize accidental trailing spaces and sentence-ending periods in thesis titles.
    return String(value !== null && value !== void 0 ? value : '')
        .trim()
        .replace(/\.+$/, '')
        .trim();
}
function hasLikelyFullName(raw) {
    const parts = raw.trim().split(/\s+/).filter(Boolean);
    return parts.length >= 2;
}
function completionPercent(formData) {
    const requiredStringKeys = [
        'Student Title',
        'Student First-Name',
        'Student Surname',
        'Student Number',
        'Department',
        'Degree',
        'Date of first title registration on SASI',
        'Student registration active on SASI',
        'Supervisor Title',
        'Supervisor',
        'Thesis title',
        'Year first registered',
        'Semester first registered',
    ];
    let completed = 0;
    for (const key of requiredStringKeys) {
        const value = formData[key];
        if (typeof value === 'string' && value.trim()) {
            completed += 1;
        }
    }
    const boolComplete = formData['PhD by traditional thesis format'] || formData['PhD by publication'] || formData['Masters Full-thesis'] || formData['Masters Mini thesis'] || formData['Masters by publication'];
    if (boolComplete) {
        completed += 1;
    }
    const keywords = parseKeywords(formData['Key words']);
    if (keywords.length >= 3) {
        completed += 1;
    }
    if (formData.Abstract.trim() && wordCount(formData.Abstract) <= 200) {
        completed += 1;
    }
    if (formData.Degree === 'PHD' && formData['PhD proposal link (5-10 pages incl. timeframes)'].trim()) {
        completed += 1;
    }
    else if (formData.Degree !== 'PHD') {
        completed += 1;
    }
    if (formData['Supervisor is UWC-internal'] === 'Yes' && formData.Supervisor.trim()) {
        completed += 1;
    }
    else if (formData['Supervisor is UWC-internal'] === 'No' &&
        formData.Supervisor.trim() &&
        formData['Supervisor External Email'].trim()) {
        completed += 1;
    }
    if (formData['Has Co-supervisor?'] === 'No') {
        completed += 1;
    }
    else {
        const co1Present = hasNamedPerson(formData['Co-supervisor']);
        const co2Present = hasNamedPerson(formData['Second Co-supervisor']);
        if (co1Present || co2Present) {
            completed += 1;
        }
        if (co1Present && formData['Co-supervisor is UWC-internal'] === 'No') {
            if (formData['Co-supervisor External Email'].trim()) {
                completed += 1;
            }
        }
        else if (co1Present) {
            completed += 1;
        }
        if (co2Present && formData['Second Co-supervisor is UWC-internal'] === 'No') {
            if (formData['Second Co-supervisor External Email'].trim()) {
                completed += 1;
            }
        }
        else if (co2Present) {
            completed += 1;
        }
    }
    const total = requiredStringKeys.length + 8;
    return Math.round((completed / total) * 100);
}
function normalizeName(value) {
    return value
        .toLowerCase()
        .replace(/\b(professor|prof|associate|dr|mr|mrs|ms|prof\.)\b/g, '')
        .replace(/[^a-z\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}
function nameMatches(a, b) {
    const na = normalizeName(a);
    const nb = normalizeName(b);
    return na === nb || na.includes(nb) || nb.includes(na);
}
function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function buildDisplayName(title, firstName, lastName) {
    return [title.trim(), firstName.trim(), lastName.trim()].filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
}
function resolveInternalPerson(rawName, directoryRows) {
    var _a;
    const exact = directoryRows.find((row) => String(row.staff_name).trim().toLowerCase() === rawName.trim().toLowerCase());
    if (exact)
        return exact;
    return (_a = directoryRows.find((row) => nameMatches(String(row.staff_name), rawName))) !== null && _a !== void 0 ? _a : null;
}
function upsertExternalAcademicFromForm(formData, role) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const roleMap = {
            supervisor: {
                isInternal: formData['Supervisor is UWC-internal'],
                lookupId: formData['Supervisor External Lookup Id'],
                title: formData['Supervisor Title'],
                firstName: formData['Supervisor External First Name'],
                lastName: formData['Supervisor External Surname'],
                qualification: formData['Supervisor Qualifications'],
                email: formData['Supervisor External Email'],
                address: formData['Supervisor External Address'],
            },
            co1: {
                isInternal: formData['Co-supervisor is UWC-internal'],
                lookupId: formData['Co-supervisor External Lookup Id'],
                title: formData['Co-supervisor Title'],
                firstName: formData['Co-supervisor External First Name'],
                lastName: formData['Co-supervisor External Surname'],
                qualification: formData['Co-supervisor Qualifications'],
                email: formData['Co-supervisor External Email'],
                address: formData['Co-supervisor External Address'],
            },
            co2: {
                isInternal: formData['Second Co-supervisor is UWC-internal'],
                lookupId: formData['Second Co-supervisor External Lookup Id'],
                title: formData['Second Co-supervisor Title'],
                firstName: formData['Second Co-supervisor External First Name'],
                lastName: formData['Second Co-supervisor External Surname'],
                qualification: formData['Second Co-supervisor Qualifications'],
                email: formData['Second Co-supervisor External Email'],
                address: formData['Second Co-supervisor External Address'],
            },
            admin: {
                isInternal: formData['Administrative Supervisor is UWC-internal'],
                lookupId: formData['Administrative Supervisor External Lookup Id'],
                title: formData['Administrative Supervisor External Title'],
                firstName: formData['Administrative Supervisor External First Name'],
                lastName: formData['Administrative Supervisor External Surname'],
                qualification: formData['Administrative Supervisor Qualifications (Nominal Role)'],
                email: formData['Administrative Supervisor External Email'],
                address: formData['Administrative Supervisor External Address'],
            },
        }[role];
        if (roleMap.isInternal !== 'No')
            return;
        if (!((_a = roleMap.lookupId) === null || _a === void 0 ? void 0 : _a.trim()))
            return;
        const fullName = buildDisplayName(roleMap.title, roleMap.firstName, roleMap.lastName);
        if (!fullName)
            return;
        const id = Number.parseInt(roleMap.lookupId, 10);
        if (!Number.isFinite(id) || id < 1)
            return;
        const existing = yield (0, knex_1.default)('external_academic_registry').where({ id }).first();
        if (!existing)
            return;
        yield (0, knex_1.default)('external_academic_registry').where({ id }).update({
            title: roleMap.title.trim(),
            first_name: roleMap.firstName.trim(),
            last_name: roleMap.lastName.trim(),
            full_name: fullName,
            normalized_full_name: normalizeName(fullName),
            highest_qualification: roleMap.qualification.trim(),
            email: roleMap.email.trim(),
            address: roleMap.address.trim(),
            updated_at: knex_1.default.fn.now(),
        });
    });
}
function resolveQualificationFromDirectories(name, sasiStaffRows, directoryRows) {
    const exactDirectory = directoryRows.find((row) => row.staff_name.toLowerCase() === name.trim().toLowerCase());
    if (exactDirectory === null || exactDirectory === void 0 ? void 0 : exactDirectory.highest_qualification) {
        return String(exactDirectory.highest_qualification);
    }
    const fuzzyDirectory = directoryRows.find((row) => nameMatches(String(row.staff_name), name));
    if (fuzzyDirectory === null || fuzzyDirectory === void 0 ? void 0 : fuzzyDirectory.highest_qualification) {
        return String(fuzzyDirectory.highest_qualification);
    }
    const exactSasi = sasiStaffRows.find((row) => row.full_name.toLowerCase() === name.trim().toLowerCase());
    if (exactSasi === null || exactSasi === void 0 ? void 0 : exactSasi.highest_qualification) {
        return String(exactSasi.highest_qualification);
    }
    const fuzzySasi = sasiStaffRows.find((row) => nameMatches(String(row.full_name), name));
    if (fuzzySasi === null || fuzzySasi === void 0 ? void 0 : fuzzySasi.highest_qualification) {
        return String(fuzzySasi.highest_qualification);
    }
    return null;
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
    throw new Error('Repository root with ridiculous_forms not found');
}
function queueEmail(caseId, recipients, subject, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = recipients.filter(Boolean).map((email) => ({ case_id: caseId, email_to: email, subject, body, status: 'queued' }));
        if (rows.length > 0) {
            yield (0, knex_1.default)('notification_queue').insert(rows);
        }
    });
}
function getStaffEmail(role) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield (0, knex_1.default)('sasi_staff').where({ role }).select('email');
        return rows.map((r) => r.email);
    });
}
function moduleStatusFromCaseStatus(caseStatus) {
    if (caseStatus === 'approved' || caseStatus === 'sent_to_faculty_fhd') {
        return 'approved';
    }
    if (caseStatus.startsWith('returned')) {
        return 'action_required';
    }
    return 'in_progress';
}
function syncModuleEntries(caseId, status, summary) {
    return __awaiter(this, void 0, void 0, function* () {
        const moduleStatus = moduleStatusFromCaseStatus(status);
        const dedicatedStatusModules = new Set([
            'supervisor_profiles',
            'mou',
            'intention_to_submit',
            'appoint_examiners',
            'change_examiners',
            'examiner_summary_cv',
            'appoint_arbiter',
        ]);
        yield Promise.all(moduleNames.map((moduleName) => __awaiter(this, void 0, void 0, function* () {
            if (dedicatedStatusModules.has(moduleName)) {
                return;
            }
            yield (0, knex_1.default)('module_entries')
                .insert({ case_id: caseId, module_name: moduleName, status: moduleStatus, summary, updated_at: knex_1.default.fn.now() })
                .onConflict(['case_id', 'module_name'])
                .merge({ status: moduleStatus, summary, updated_at: knex_1.default.fn.now() });
        })));
    });
}
function formatIsoDateToDdMmYyyy(raw) {
    if (!raw)
        return '';
    const d = new Date(raw);
    if (Number.isNaN(d.getTime()))
        return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = d.getFullYear();
    return `${dd}-${mm}-${yy}`;
}
function mouCompletionPercent(formData) {
    const required = [
        'Student Full Name',
        'Student Number',
        'Degree',
        'Department',
        'First Year of Registration',
        'Study Mode',
        'Expected Date of Completion',
        'Thesis Title',
        'Brief Description of Project (<200 words)',
        'Principal Supervisor',
        'Principal Supervisor Highest Qualifications',
        'Principal Supervisor Main Responsibilities',
        'Financial Arrangements for Project',
        'Data Ownership',
        'Supervisor-Student Meetings',
        'Progress Reports',
        'Study Outputs',
        'Student Signature Confirmed',
        'Supervisor Signature Confirmed',
        'Dept Chair/PG Coord Signature Confirmed',
    ];
    let completed = 0;
    for (const key of required) {
        const value = formData[key];
        if (typeof value === 'string' && value.trim()) {
            completed += 1;
        }
    }
    if (wordCount(formData['Brief Description of Project (<200 words)']) <= 200) {
        completed += 1;
    }
    const total = required.length + 1;
    return Math.round((completed / total) * 100);
}
function defaultMouFromCase(student, rott, profiles) {
    const supervisorProfile = profiles.find((p) => p.role === 'supervisor' && p.status !== 'inactive');
    const coProfiles = profiles.filter((p) => p.role === 'co_supervisor' && p.status !== 'inactive');
    return {
        'Student Full Name': `${rott['Student Title']} ${rott['Student First-Name']} ${rott['Student Surname']}`.trim(),
        'Student Number': rott['Student Number'],
        Degree: rott.Degree,
        Department: rott.Department,
        'First Year of Registration': rott['Year first registered'],
        'Study Mode': student.registration_type === 'PART_TIME' ? 'PART-TIME' : 'FULL TIME',
        'Expected Date of Completion': formatIsoDateToDdMmYyyy(student.expected_completion_date),
        'Thesis Title': rott['Thesis title'],
        'Brief Description of Project (<200 words)': rott.Abstract,
        'Principal Supervisor': `${rott['Supervisor Title']} ${rott.Supervisor}`.trim(),
        'Principal Supervisor Highest Qualifications': (supervisorProfile === null || supervisorProfile === void 0 ? void 0 : supervisorProfile.qualifications) || rott['Supervisor Qualifications'],
        'Principal Supervisor Main Responsibilities': '',
        'Co-supervisor(s)': coProfiles.map((p) => `${p.person_title} ${p.person_name}`.trim()).join('; '),
        'Co-supervisor Highest Qualifications': coProfiles.map((p) => p.qualifications).filter(Boolean).join('; '),
        'Co-supervisor Main Responsibilities': '',
        'Supervisor Availability Arrangements': '',
        'Student Leave Entitlement Per Annum': '',
        'Student Extended Research Away from UWC Arrangements': '',
        'Prescribed Courses/Workshops': '',
        'Time Allocation': '',
        'Space Allocation': '',
        'Computer Facilities': '',
        'Financial Arrangements for Project': '',
        'Publication Issues': '',
        'Data Ownership': '',
        'Supervisor-Student Meetings': '',
        'Progress Reports': '',
        'Study Outputs': rott.Degree === 'PHD' ? 'Full Thesis' : 'Full Thesis',
        'Research Visits/Conferences': '',
        'Other Duties': '',
        'Other Expectations': '',
        'Other Issues Relevant to Study': '',
        'Student Signature Confirmed': 'No',
        'Supervisor Signature Confirmed': 'No',
        'Co-supervisor Signature Confirmed': rott['Has Co-supervisor?'] === 'Yes' ? 'No' : 'Yes',
        'Dept Chair/PG Coord Signature Confirmed': 'No',
    };
}
function profileIdentityKey(role, personName) {
    return `${role}::${normalizeName(personName)}`;
}
function parsePublicationEntries(raw) {
    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }
        return parsed.map((v) => String(v).trim()).filter(Boolean);
    }
    catch (_a) {
        return [];
    }
}
function serializePublicationEntries(entries) {
    return JSON.stringify(entries.map((entry) => entry.trim()).filter(Boolean));
}
function isProfileReady(profile) {
    if (!profile.person_name.trim()) {
        return { ok: false, reason: 'Missing person name.' };
    }
    if (!profile.person_title.trim()) {
        return { ok: false, reason: 'Missing title.' };
    }
    if (!profile.qualifications.trim()) {
        return { ok: false, reason: 'Missing qualifications.' };
    }
    if (profile.is_internal === 'No') {
        if (!profile.external_address.trim()) {
            return { ok: false, reason: 'External address is required for external supervisors.' };
        }
        if (!profile.contact_email.trim() || !isEmail(profile.contact_email)) {
            return { ok: false, reason: 'A valid contact email is required for external supervisors.' };
        }
    }
    else if (profile.contact_email.trim() && !isEmail(profile.contact_email)) {
        return { ok: false, reason: 'Contact email format is invalid.' };
    }
    if (profile.publication_count === null || profile.publication_count < 3 || profile.publication_count > 5) {
        return { ok: false, reason: 'Supervisor profile must include 3 to 5 publications from the last 4 years.' };
    }
    const entries = parsePublicationEntries(profile.recent_publications_json);
    if (entries.length < 3 || entries.length > 5) {
        return { ok: false, reason: 'Provide between 3 and 5 latest publications (last 4 years).' };
    }
    if (profile.role === 'co_supervisor' && !profile.contribution_motivation.trim()) {
        return { ok: false, reason: 'Co-supervisor profile requires contribution motivation under point 5.2.' };
    }
    if (profile.cv_attached !== 'Yes') {
        return { ok: false, reason: 'CV attached must be set to Yes before profile completion.' };
    }
    if (!profile.cv_file_path.trim()) {
        return { ok: false, reason: 'Upload a CV file before profile completion.' };
    }
    if (profile.new_to_department === 'Yes' && (!profile.contact_email.trim() || !isEmail(profile.contact_email))) {
        return { ok: false, reason: 'New-to-department profiles must include a valid contact email.' };
    }
    return { ok: true };
}
function syncSupervisorProfilesForCase(caseId, formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const desiredProfiles = [];
        if (formData.Supervisor.trim()) {
            desiredProfiles.push({
                role: 'supervisor',
                person_name: formData.Supervisor,
                person_title: formData['Supervisor Title'],
                qualifications: formData['Supervisor Qualifications'],
                is_internal: formData['Supervisor is UWC-internal'],
                external_address: formData['Supervisor External Address'],
                contact_email: formData['Supervisor External Email'],
                publication_count: null,
                contribution_motivation: '',
                new_to_department: 'No',
                cv_attached: 'No',
                cv_file_path: '',
            });
        }
        if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Co-supervisor'])) {
            desiredProfiles.push({
                role: 'co_supervisor',
                person_name: formData['Co-supervisor'],
                person_title: formData['Co-supervisor Title'],
                qualifications: formData['Co-supervisor Qualifications'],
                is_internal: formData['Co-supervisor is UWC-internal'],
                external_address: formData['Co-supervisor External Address'],
                contact_email: formData['Co-supervisor External Email'],
                publication_count: null,
                contribution_motivation: '',
                new_to_department: 'No',
                cv_attached: 'No',
                cv_file_path: '',
            });
        }
        if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Second Co-supervisor'])) {
            desiredProfiles.push({
                role: 'co_supervisor',
                person_name: formData['Second Co-supervisor'],
                person_title: formData['Second Co-supervisor Title'],
                qualifications: formData['Second Co-supervisor Qualifications'],
                is_internal: formData['Second Co-supervisor is UWC-internal'],
                external_address: formData['Second Co-supervisor External Address'],
                contact_email: formData['Second Co-supervisor External Email'],
                publication_count: null,
                contribution_motivation: '',
                new_to_department: 'No',
                cv_attached: 'No',
                cv_file_path: '',
            });
        }
        if (formData['Administrative Supervisor (Nominal Role)'].trim()) {
            desiredProfiles.push({
                role: 'admin_supervisor',
                person_name: formData['Administrative Supervisor (Nominal Role)'],
                person_title: formData['Administrative Supervisor External Title'] || 'Dr',
                qualifications: formData['Administrative Supervisor Qualifications (Nominal Role)'],
                is_internal: formData['Administrative Supervisor is UWC-internal'],
                external_address: formData['Administrative Supervisor External Address'],
                contact_email: formData['Administrative Supervisor External Email'],
                publication_count: null,
                contribution_motivation: '',
                new_to_department: 'No',
                cv_attached: 'No',
                cv_file_path: '',
            });
        }
        const existing = yield (0, knex_1.default)('supervisor_profile_forms').where({ case_id: caseId });
        const desiredKeys = new Set(desiredProfiles.map((profile) => profileIdentityKey(profile.role, profile.person_name)));
        for (const profile of desiredProfiles) {
            const match = existing.find((row) => profileIdentityKey(row.role, row.person_name) === profileIdentityKey(profile.role, profile.person_name));
            if (!match) {
                yield (0, knex_1.default)('supervisor_profile_forms').insert({
                    case_id: caseId,
                    role: profile.role,
                    person_name: profile.person_name,
                    person_title: profile.person_title,
                    qualifications: profile.qualifications,
                    is_internal: profile.is_internal,
                    external_address: profile.external_address,
                    contact_email: profile.contact_email,
                    publication_count: profile.publication_count,
                    recent_publications_json: '[]',
                    contribution_motivation: profile.contribution_motivation,
                    new_to_department: profile.new_to_department,
                    cv_attached: profile.cv_attached,
                    cv_file_path: '',
                    status: 'draft',
                });
                continue;
            }
            yield (0, knex_1.default)('supervisor_profile_forms').where({ id: match.id }).update({
                person_title: profile.person_title,
                qualifications: profile.qualifications,
                is_internal: profile.is_internal,
                external_address: profile.external_address,
                contact_email: profile.contact_email,
                status: match.status === 'inactive' ? 'draft' : match.status,
                updated_at: knex_1.default.fn.now(),
            });
        }
        for (const row of existing) {
            const key = profileIdentityKey(row.role, row.person_name);
            if (!desiredKeys.has(key)) {
                yield (0, knex_1.default)('supervisor_profile_forms').where({ id: row.id }).update({ status: 'inactive', updated_at: knex_1.default.fn.now() });
            }
        }
        yield syncSupervisorProfilesModuleStatus(caseId);
    });
}
function syncSupervisorProfilesModuleStatus(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const activeProfiles = yield (0, knex_1.default)('supervisor_profile_forms')
            .where({ case_id: caseId })
            .whereNot({ status: 'inactive' });
        let status = 'pending';
        let summary = 'No supervisor profile forms activated yet.';
        if (activeProfiles.length > 0) {
            const completed = activeProfiles.filter((profile) => profile.status === 'completed').length;
            if (completed === activeProfiles.length) {
                status = 'approved';
                summary = `All supervisor profiles completed (${completed}/${activeProfiles.length}).`;
            }
            else if (activeProfiles.some((profile) => profile.status === 'requested')) {
                status = 'action_required';
                summary = `Supervisor profiles requested (${completed}/${activeProfiles.length} completed).`;
            }
            else {
                status = 'in_progress';
                summary = `Supervisor profiles in draft (${completed}/${activeProfiles.length} completed).`;
            }
        }
        yield (0, knex_1.default)('module_entries')
            .insert({ case_id: caseId, module_name: 'supervisor_profiles', status, summary, updated_at: knex_1.default.fn.now() })
            .onConflict(['case_id', 'module_name'])
            .merge({ status, summary, updated_at: knex_1.default.fn.now() });
    });
}
function ensureMouPrerequisites(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { case: caseRecord, formData: rott, student } = yield getCaseById(caseId);
        if (caseRecord.completion_percent < 100) {
            throw new Error('MOU can start only after the ROTT is completed in full and saved.');
        }
        const profiles = yield (0, knex_1.default)('supervisor_profile_forms')
            .where({ case_id: caseId })
            .whereNot({ status: 'inactive' });
        return { student, rott, profiles, caseRecord };
    });
}
function syncMouModuleStatus(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield (0, knex_1.default)('mou_forms').where({ case_id: caseId }).first();
        let status = 'pending';
        let summary = 'MOU not started.';
        if (record) {
            if (record.status === 'completed') {
                status = 'approved';
                summary = 'MOU completed and ready for signatures/archive.';
            }
            else {
                status = 'in_progress';
                summary = `MOU draft in progress (${record.completion_percent}%).`;
            }
        }
        yield (0, knex_1.default)('module_entries')
            .insert({ case_id: caseId, module_name: 'mou', status, summary, updated_at: knex_1.default.fn.now() })
            .onConflict(['case_id', 'module_name'])
            .merge({ status, summary, updated_at: knex_1.default.fn.now() });
    });
}
function normalizeMouFormData(input) {
    const mapped = Object.assign({}, input);
    const yesNoKeys = [
        'Student Signature Confirmed',
        'Supervisor Signature Confirmed',
        'Co-supervisor Signature Confirmed',
        'Dept Chair/PG Coord Signature Confirmed',
    ];
    for (const key of yesNoKeys) {
        if (mapped[key] !== 'Yes' && mapped[key] !== 'No') {
            mapped[key] = 'No';
        }
    }
    return mapped;
}
function getOrCreateMou(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { student, rott, profiles } = yield ensureMouPrerequisites(caseId);
        let record = yield (0, knex_1.default)('mou_forms').where({ case_id: caseId }).first();
        if (!record) {
            const prefill = defaultMouFromCase(student, rott, profiles);
            const percent = mouCompletionPercent(prefill);
            const [id] = yield (0, knex_1.default)('mou_forms').insert({
                case_id: caseId,
                form_data_json: JSON.stringify(prefill),
                completion_percent: percent,
                status: 'draft',
            });
            record = yield (0, knex_1.default)('mou_forms').where({ id }).first();
            if (!record) {
                throw new Error('Failed to create MOU record.');
            }
        }
        yield syncMouModuleStatus(caseId);
        return { record, formData: normalizeMouFormData(JSON.parse(record.form_data_json)) };
    });
}
function updateMou(caseId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        const { record, formData } = yield getOrCreateMou(caseId);
        if (record.status === 'completed') {
            throw new Error('MOU is already completed.');
        }
        const merged = normalizeMouFormData(Object.assign(Object.assign({}, formData), patch));
        if (wordCount(merged['Brief Description of Project (<200 words)']) > 200) {
            throw new Error('MOU brief project description must be 200 words or fewer.');
        }
        const percent = mouCompletionPercent(merged);
        yield (0, knex_1.default)('mou_forms').where({ id: record.id }).update({
            form_data_json: JSON.stringify(merged),
            completion_percent: percent,
            updated_at: knex_1.default.fn.now(),
        });
        const updated = yield (0, knex_1.default)('mou_forms').where({ id: record.id }).first();
        if (!updated) {
            throw new Error('Failed to update MOU.');
        }
        yield syncMouModuleStatus(caseId);
        return { record: updated, formData: merged };
    });
}
function completeMou(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { record, formData } = yield getOrCreateMou(caseId);
        if (record.completion_percent < 100) {
            throw new Error('MOU is incomplete. Fill all required fields.');
        }
        const requiredSignatures = [
            'Student Signature Confirmed',
            'Supervisor Signature Confirmed',
            'Dept Chair/PG Coord Signature Confirmed',
        ];
        for (const sig of requiredSignatures) {
            if (formData[sig] !== 'Yes') {
                throw new Error(`MOU cannot be completed until "${sig}" is confirmed.`);
            }
        }
        if (formData['Co-supervisor(s)'].trim() && formData['Co-supervisor Signature Confirmed'] !== 'Yes') {
            throw new Error('MOU cannot be completed until co-supervisor signature is confirmed.');
        }
        yield (0, knex_1.default)('mou_forms').where({ id: record.id }).update({
            status: 'completed',
            submitted_at: knex_1.default.fn.now(),
            updated_at: knex_1.default.fn.now(),
        });
        const caseRecord = yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).first();
        if (caseRecord) {
            const rott = normalizeLegacyFormData(JSON.parse(caseRecord.form_data_json));
            rott['Has the MOU been submitted?'] = 'Yes';
            yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).update({
                form_data_json: JSON.stringify(rott),
                updated_at: knex_1.default.fn.now(),
            });
        }
        yield syncMouModuleStatus(caseId);
        const facultyReps = yield getStaffEmail('faculty_fhd_rep');
        yield queueEmail(caseId, facultyReps, 'MOU completed for records', `Case #${caseId} MOU is completed and ready for Faculty HD records.`);
        const updated = yield (0, knex_1.default)('mou_forms').where({ id: record.id }).first();
        if (!updated) {
            throw new Error('MOU missing after completion.');
        }
        return updated;
    });
}
function generateMouPdf(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { record, formData } = yield getOrCreateMou(caseId);
        const repoRoot = resolveRepoRoot();
        const outDir = path_1.default.join(repoRoot, 'generated_forms', formData['Student Number']);
        yield promises_1.default.mkdir(outDir, { recursive: true });
        const outFile = path_1.default.join(outDir, `mou_${caseId}.pdf`);
        yield (0, mouPdfService_1.renderMouPdfDocument)(outFile, formData);
        yield (0, knex_1.default)('mou_forms').where({ id: record.id }).update({ pdf_path: outFile, updated_at: knex_1.default.fn.now() });
        return { pdfPath: outFile };
    });
}
function hydrateCase(baseCase) {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield (0, knex_1.default)('sasi_students').where({ id: baseCase.sasi_student_id }).first();
        if (!student) {
            throw new Error('Linked SASI student missing');
        }
        return { case: baseCase, formData: normalizeLegacyFormData(JSON.parse(baseCase.form_data_json)), student };
    });
}
function checkAndPrefill(studentNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield (0, sasiService_1.getStudentByNumber)(studentNumber);
        if (!student) {
            return { eligible: false, reasons: ['Student not found on SASI.'] };
        }
        const eligibility = checkStudentEligibility(student);
        if (!eligibility.eligible) {
            return { eligible: false, reasons: eligibility.reasons, student };
        }
        let caseRecord = yield (0, knex_1.default)('title_registration_cases').where({ sasi_student_id: student.id }).first();
        if (!caseRecord) {
            const prefill = buildPrefill(student);
            const percent = completionPercent(prefill);
            const [id] = yield (0, knex_1.default)('title_registration_cases').insert({
                sasi_student_id: student.id,
                case_status: 'awaiting_student_vetting',
                form_data_json: JSON.stringify(prefill),
                completion_percent: percent,
            });
            caseRecord = yield (0, knex_1.default)('title_registration_cases').where({ id }).first();
            if (!caseRecord) {
                throw new Error('Failed to create title registration case');
            }
            yield syncModuleEntries(caseRecord.id, caseRecord.case_status, 'Title Registration initiated from SASI prefill');
            yield syncSupervisorProfilesForCase(caseRecord.id, prefill);
            yield syncMouModuleStatus(caseRecord.id);
        }
        const hydrated = yield hydrateCase(caseRecord);
        yield syncSupervisorProfilesForCase(hydrated.case.id, hydrated.formData);
        yield syncMouModuleStatus(hydrated.case.id);
        return { eligible: true, reasons: [], student, caseRecord: hydrated.case, formData: hydrated.formData };
    });
}
function getCaseById(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Title registration case not found');
        }
        return hydrateCase(caseRecord);
    });
}
function updateForm(caseId, formPatch) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        const { case: caseRecord, formData } = yield getCaseById(caseId);
        const readonlyFields = [
            'Student Title',
            'Student First-Name',
            'Student Surname',
            'Student Number',
            'Department',
            'Degree',
            'Date of first title registration on SASI',
            'Student registration active on SASI',
            'Year first registered',
            'Has the MOU been submitted?',
        ];
        for (const key of Object.keys(formPatch)) {
            if (readonlyFields.includes(key)) {
                throw new Error(`${key} is pulled from SASI and cannot be edited.`);
            }
        }
        const merged = Object.assign(Object.assign({}, formData), formPatch);
        merged['Thesis title'] = sanitizeThesisTitle(merged['Thesis title']);
        merged['Year first registered'] = ((_a = merged['Date of first title registration on SASI']) === null || _a === void 0 ? void 0 : _a.slice(6, 10)) || merged['Year first registered'];
        const directoryRows = yield (0, knex_1.default)('uwc_staff_directory').select('staff_name', 'staff_title', 'first_name', 'last_name', 'highest_qualification', 'department_name', 'faculty_name');
        if (merged['Supervisor is UWC-internal'] === 'Yes') {
            const supervisor = resolveInternalPerson(merged.Supervisor, directoryRows);
            if (!supervisor) {
                throw new Error('Internal supervisor must be selected from the UWC staff directory.');
            }
            const firstLast = `${(_b = supervisor.first_name) !== null && _b !== void 0 ? _b : ''} ${(_c = supervisor.last_name) !== null && _c !== void 0 ? _c : ''}`.trim();
            merged.Supervisor = firstLast || String(supervisor.staff_name);
            merged['Supervisor Title'] = String((_d = supervisor.staff_title) !== null && _d !== void 0 ? _d : '').trim() || 'Dr';
            merged['Supervisor Qualifications'] = String((_e = supervisor.highest_qualification) !== null && _e !== void 0 ? _e : '').trim() || merged['Supervisor Qualifications'];
            merged['Supervisor External Lookup Id'] = '';
            merged['Supervisor External First Name'] = '';
            merged['Supervisor External Surname'] = '';
            merged['Supervisor External Address'] = '';
            merged['Supervisor External Email'] = '';
        }
        else {
            if (!merged['Supervisor External First Name'].trim() || !merged['Supervisor External Surname'].trim()) {
                throw new Error('External supervisor requires title, first name, and surname.');
            }
            merged.Supervisor = `${merged['Supervisor External First Name']} ${merged['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
            if (!merged['Supervisor Title'].trim()) {
                throw new Error('External supervisor title is required.');
            }
            if (!merged['Supervisor External Email'].trim()) {
                throw new Error('External supervisor email is required.');
            }
            if (!isEmail(merged['Supervisor External Email'])) {
                throw new Error('External supervisor email is invalid.');
            }
        }
        if (merged['Administrative Supervisor same as Supervisor'] === 'Yes') {
            merged['Administrative Supervisor (Nominal Role)'] = merged.Supervisor;
            merged['Administrative Supervisor Qualifications (Nominal Role)'] = merged['Supervisor Qualifications'];
            merged['Administrative Supervisor is UWC-internal'] = merged['Supervisor is UWC-internal'];
            merged['Administrative Supervisor External Title'] = merged['Supervisor Title'];
            merged['Administrative Supervisor External First Name'] = merged['Supervisor External First Name'];
            merged['Administrative Supervisor External Surname'] = merged['Supervisor External Surname'];
            merged['Administrative Supervisor External Address'] = merged['Supervisor External Address'];
            merged['Administrative Supervisor External Email'] = merged['Supervisor External Email'];
            merged['Administrative Supervisor External Lookup Id'] = merged['Supervisor External Lookup Id'];
        }
        else if (merged['Administrative Supervisor is UWC-internal'] === 'Yes') {
            const admin = resolveInternalPerson(merged['Administrative Supervisor (Nominal Role)'], directoryRows);
            if (!admin) {
                throw new Error('Administrative Supervisor (Nominal Role) must be selected from the UWC staff directory.');
            }
            const firstLast = `${(_f = admin.first_name) !== null && _f !== void 0 ? _f : ''} ${(_g = admin.last_name) !== null && _g !== void 0 ? _g : ''}`.trim();
            merged['Administrative Supervisor (Nominal Role)'] = firstLast || String(admin.staff_name);
            merged['Administrative Supervisor Qualifications (Nominal Role)'] =
                String((_h = admin.highest_qualification) !== null && _h !== void 0 ? _h : '').trim() || merged['Administrative Supervisor Qualifications (Nominal Role)'];
            merged['Administrative Supervisor External Title'] = String((_j = admin.staff_title) !== null && _j !== void 0 ? _j : '').trim() || 'Dr';
            merged['Administrative Supervisor External Lookup Id'] = '';
            merged['Administrative Supervisor External Title'] = '';
            merged['Administrative Supervisor External First Name'] = '';
            merged['Administrative Supervisor External Surname'] = '';
            merged['Administrative Supervisor External Address'] = '';
            merged['Administrative Supervisor External Email'] = '';
        }
        else {
            if (!merged['Administrative Supervisor External Title'].trim() || !merged['Administrative Supervisor External First Name'].trim() || !merged['Administrative Supervisor External Surname'].trim()) {
                throw new Error('External Administrative Supervisor requires title, first name, and surname.');
            }
            merged['Administrative Supervisor (Nominal Role)'] =
                `${merged['Administrative Supervisor External First Name']} ${merged['Administrative Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
            if (!merged['Administrative Supervisor External Email'].trim()) {
                throw new Error('External Administrative Supervisor email is required.');
            }
            if (!isEmail(merged['Administrative Supervisor External Email'])) {
                throw new Error('External Administrative Supervisor email is invalid.');
            }
        }
        if (merged['Has Co-supervisor?'] === 'No') {
            merged['Co-supervisor Title'] = 'NA';
            merged['Co-supervisor'] = 'NA';
            merged['Co-supervisor Qualifications'] = 'NA';
            merged['Co-supervisor is UWC-internal'] = 'Yes';
            merged['Co-supervisor External Lookup Id'] = '';
            merged['Co-supervisor External First Name'] = '';
            merged['Co-supervisor External Surname'] = '';
            merged['Co-supervisor External Address'] = '';
            merged['Co-supervisor External Email'] = '';
            merged['Second Co-supervisor Title'] = 'NA';
            merged['Second Co-supervisor'] = 'NA';
            merged['Second Co-supervisor Qualifications'] = 'NA';
            merged['Second Co-supervisor is UWC-internal'] = 'Yes';
            merged['Second Co-supervisor External Lookup Id'] = '';
            merged['Second Co-supervisor External First Name'] = '';
            merged['Second Co-supervisor External Surname'] = '';
            merged['Second Co-supervisor External Address'] = '';
            merged['Second Co-supervisor External Email'] = '';
        }
        else {
            if (merged['Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(merged['Co-supervisor'])) {
                const derived = `${merged['Co-supervisor External First Name']} ${merged['Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
                if (hasNamedPerson(derived)) {
                    merged['Co-supervisor'] = derived;
                }
            }
            if (merged['Second Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(merged['Second Co-supervisor'])) {
                const derived = `${merged['Second Co-supervisor External First Name']} ${merged['Second Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
                if (hasNamedPerson(derived)) {
                    merged['Second Co-supervisor'] = derived;
                }
            }
            if (!hasNamedPerson(merged['Co-supervisor']) && !hasNamedPerson(merged['Second Co-supervisor'])) {
                throw new Error('At least one co-supervisor must be provided when "Has Co-supervisor?" is Yes.');
            }
            if (hasNamedPerson(merged['Co-supervisor']) && merged['Co-supervisor is UWC-internal'] === 'Yes') {
                const coSupervisor = resolveInternalPerson(merged['Co-supervisor'], directoryRows);
                if (!coSupervisor) {
                    throw new Error('Internal co-supervisor must be selected from UWC staff directory.');
                }
                const firstLast = `${(_k = coSupervisor.first_name) !== null && _k !== void 0 ? _k : ''} ${(_l = coSupervisor.last_name) !== null && _l !== void 0 ? _l : ''}`.trim();
                merged['Co-supervisor'] = firstLast || String(coSupervisor.staff_name);
                merged['Co-supervisor Title'] = String((_m = coSupervisor.staff_title) !== null && _m !== void 0 ? _m : '').trim() || 'Dr';
                merged['Co-supervisor Qualifications'] = String((_o = coSupervisor.highest_qualification) !== null && _o !== void 0 ? _o : '').trim() || merged['Co-supervisor Qualifications'];
                merged['Co-supervisor External Lookup Id'] = '';
                merged['Co-supervisor External First Name'] = '';
                merged['Co-supervisor External Surname'] = '';
                merged['Co-supervisor External Address'] = '';
                merged['Co-supervisor External Email'] = '';
            }
            else if (hasNamedPerson(merged['Co-supervisor'])) {
                if (!merged['Co-supervisor Title'].trim() || !merged['Co-supervisor External First Name'].trim() || !merged['Co-supervisor External Surname'].trim()) {
                    throw new Error('External co-supervisor 1 requires title, first name, and surname.');
                }
                merged['Co-supervisor'] = `${merged['Co-supervisor External First Name']} ${merged['Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
            }
            if (hasNamedPerson(merged['Second Co-supervisor']) && merged['Second Co-supervisor is UWC-internal'] === 'Yes') {
                const coSupervisor2 = resolveInternalPerson(merged['Second Co-supervisor'], directoryRows);
                if (!coSupervisor2) {
                    throw new Error('Second internal co-supervisor must be selected from UWC staff directory.');
                }
                const firstLast = `${(_p = coSupervisor2.first_name) !== null && _p !== void 0 ? _p : ''} ${(_q = coSupervisor2.last_name) !== null && _q !== void 0 ? _q : ''}`.trim();
                merged['Second Co-supervisor'] = firstLast || String(coSupervisor2.staff_name);
                merged['Second Co-supervisor Title'] = String((_r = coSupervisor2.staff_title) !== null && _r !== void 0 ? _r : '').trim() || 'Dr';
                merged['Second Co-supervisor Qualifications'] = String((_s = coSupervisor2.highest_qualification) !== null && _s !== void 0 ? _s : '').trim() || merged['Second Co-supervisor Qualifications'];
                merged['Second Co-supervisor External Lookup Id'] = '';
                merged['Second Co-supervisor External First Name'] = '';
                merged['Second Co-supervisor External Surname'] = '';
                merged['Second Co-supervisor External Address'] = '';
                merged['Second Co-supervisor External Email'] = '';
            }
            else if (hasNamedPerson(merged['Second Co-supervisor'])) {
                if (!merged['Second Co-supervisor Title'].trim() || !merged['Second Co-supervisor External First Name'].trim() || !merged['Second Co-supervisor External Surname'].trim()) {
                    throw new Error('External co-supervisor 2 requires title, first name, and surname.');
                }
                merged['Second Co-supervisor'] =
                    `${merged['Second Co-supervisor External First Name']} ${merged['Second Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
            }
            if (hasNamedPerson(merged['Co-supervisor']) &&
                hasNamedPerson(merged['Second Co-supervisor']) &&
                normalizeName(merged['Co-supervisor']) === normalizeName(merged['Second Co-supervisor'])) {
                throw new Error('Two co-supervisors must be different people.');
            }
        }
        if (wordCount(merged.Abstract) > 200) {
            throw new Error('Abstract must be 200 words or fewer.');
        }
        if (merged['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(merged['Co-supervisor'])) {
            if (merged['Co-supervisor is UWC-internal'] === 'No') {
                if (!merged['Co-supervisor External Email'].trim()) {
                    throw new Error('External co-supervisor email is required.');
                }
                if (!isEmail(merged['Co-supervisor External Email'])) {
                    throw new Error('External co-supervisor email is invalid.');
                }
            }
            else {
                merged['Co-supervisor External Address'] = '';
                merged['Co-supervisor External Email'] = '';
            }
        }
        if (merged['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(merged['Second Co-supervisor'])) {
            if (merged['Second Co-supervisor is UWC-internal'] === 'No') {
                if (!merged['Second Co-supervisor External Email'].trim()) {
                    throw new Error('External second co-supervisor email is required.');
                }
                if (!isEmail(merged['Second Co-supervisor External Email'])) {
                    throw new Error('External second co-supervisor email is invalid.');
                }
            }
            else {
                merged['Second Co-supervisor External Address'] = '';
                merged['Second Co-supervisor External Email'] = '';
            }
        }
        yield upsertExternalAcademicFromForm(merged, 'supervisor');
        yield upsertExternalAcademicFromForm(merged, 'co1');
        yield upsertExternalAcademicFromForm(merged, 'co2');
        yield upsertExternalAcademicFromForm(merged, 'admin');
        const percent = completionPercent(merged);
        yield (0, knex_1.default)('title_registration_cases')
            .where({ id: caseId })
            .update({ form_data_json: JSON.stringify(merged), completion_percent: percent, updated_at: knex_1.default.fn.now() });
        const updated = yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Failed to update case');
        }
        yield syncSupervisorProfilesForCase(updated.id, merged);
        yield syncMouModuleStatus(updated.id);
        yield syncModuleEntries(updated.id, updated.case_status, `Form completion ${percent}%`);
        return { case: updated, formData: merged };
    });
}
function generatePdf(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const { formData } = yield getCaseById(caseId);
        const coSupervisor1Name = formData['Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(formData['Co-supervisor'])
            ? `${formData['Co-supervisor External First Name']} ${formData['Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim()
            : formData['Co-supervisor'];
        const coSupervisor2Name = formData['Second Co-supervisor is UWC-internal'] === 'No' && !hasNamedPerson(formData['Second Co-supervisor'])
            ? `${formData['Second Co-supervisor External First Name']} ${formData['Second Co-supervisor External Surname']}`.replace(/\s+/g, ' ').trim()
            : formData['Second Co-supervisor'];
        const repoRoot = resolveRepoRoot();
        const outDir = path_1.default.join(repoRoot, 'generated_forms', formData['Student Number']);
        const outFile = path_1.default.join(outDir, `title_registration_${caseId}.pdf`);
        yield promises_1.default.mkdir(outDir, { recursive: true });
        yield (0, titleRegistrationPdfService_1.renderTitleRegistrationPdfDocument)(outFile, formData, {
            repoRoot,
            coSupervisor1Name,
            coSupervisor2Name,
        });
        yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).update({ pdf_path: outFile, updated_at: knex_1.default.fn.now() });
        return { pdfPath: outFile };
    });
}
function studentVet(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        const { formData, student } = yield getCaseById(caseId);
        if (!student.registration_active || formData['Student registration active on SASI'] !== 'Yes') {
            throw new Error('Student must be registered on SASI before this submission can proceed.');
        }
        if (!formData['Supervisor Title'].trim() || !hasLikelyFullName(formData.Supervisor)) {
            throw new Error('Supervisor details are incomplete.');
        }
        if (formData['Has Co-supervisor?'] === 'Yes') {
            if (!hasNamedPerson(formData['Co-supervisor']) && !hasNamedPerson(formData['Second Co-supervisor'])) {
                throw new Error('At least one co-supervisor must be listed when co-supervisor is marked as present.');
            }
            if (hasNamedPerson(formData['Co-supervisor']) && (!formData['Co-supervisor Title'].trim() || !hasLikelyFullName(formData['Co-supervisor']))) {
                throw new Error('Co-supervisor 1 details are incomplete.');
            }
            if (hasNamedPerson(formData['Second Co-supervisor']) && (!formData['Second Co-supervisor Title'].trim() || !hasLikelyFullName(formData['Second Co-supervisor']))) {
                throw new Error('Co-supervisor 2 details are incomplete.');
            }
            if (hasNamedPerson(formData['Co-supervisor']) && hasNamedPerson(formData['Second Co-supervisor']) && normalizeName(formData['Co-supervisor']) === normalizeName(formData['Second Co-supervisor'])) {
                throw new Error('Co-supervisor 1 and 2 must be different people.');
            }
        }
        else {
            if (!isNotApplicable(formData['Co-supervisor']) || !isNotApplicable(formData['Second Co-supervisor'])) {
                throw new Error('When no co-supervisor is present, co-supervisor fields must remain NA.');
            }
        }
        const keywords = parseKeywords(formData['Key words']);
        if (keywords.length < 3) {
            throw new Error('Provide at least 3 precise keywords/key phrases.');
        }
        if (!keywords.some((keyword) => keyword.includes(' '))) {
            throw new Error('Use at least one keyword phrase (e.g., South African weather, water pollution).');
        }
        if (!formData.Abstract.trim()) {
            throw new Error('Abstract is compulsory.');
        }
        if (wordCount(formData.Abstract) > 500) {
            throw new Error('Abstract should not exceed one page (approximately 500 words).');
        }
        if (formData.Degree === 'MSC' && wordCount(formData.Abstract) < 150) {
            throw new Error('MSc abstract is too short; target approximately 200 words.');
        }
        if (formData.Degree === 'PHD' && wordCount(formData.Abstract) < 150) {
            throw new Error('PhD abstract is too short; provide a substantive one-page abstract.');
        }
        if ((formData.Abstract.includes('et al.') || formData.Abstract.includes('[')) && !formData.Abstract.includes('References:')) {
            throw new Error('If references are used in the abstract, list them in full under a References: section.');
        }
        if (formData.Degree === 'PHD' && !formData['PhD proposal link (5-10 pages incl. timeframes)'].trim()) {
            throw new Error('PhD students must provide a proposal link (5-10 pages including timeframes).');
        }
        if (formData['Does this project need Ethics clearance?'] === 'Yes' &&
            !formData['Ethics clearance reference number'].trim()) {
            throw new Error('Ethics clearance reference number is required when ethics clearance is needed.');
        }
        const directoryRows = yield (0, knex_1.default)('uwc_staff_directory').select('staff_name', 'department_name');
        if (formData['Supervisor is UWC-internal'] === 'Yes') {
            const exists = directoryRows.some((r) => nameMatches(String(r.staff_name), formData.Supervisor));
            if (!exists) {
                throw new Error('Supervisor marked as UWC-internal must be selected from UWC staff directory.');
            }
        }
        else {
            if (!formData['Supervisor External Email'].trim()) {
                throw new Error('External supervisor email is required.');
            }
            if (!isEmail(formData['Supervisor External Email'])) {
                throw new Error('External supervisor email is invalid.');
            }
        }
        if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Co-supervisor'])) {
            if (formData['Co-supervisor is UWC-internal'] === 'Yes') {
                const exists = directoryRows.some((r) => nameMatches(String(r.staff_name), formData['Co-supervisor']));
                if (!exists) {
                    throw new Error('Co-supervisor 1 marked as UWC-internal must be selected from UWC staff directory.');
                }
            }
            else if (!formData['Co-supervisor External Email'].trim()) {
                throw new Error('External co-supervisor 1 email is required.');
            }
            else if (!isEmail(formData['Co-supervisor External Email'])) {
                throw new Error('External co-supervisor 1 email is invalid.');
            }
        }
        if (formData['Has Co-supervisor?'] === 'Yes' && hasNamedPerson(formData['Second Co-supervisor'])) {
            if (formData['Second Co-supervisor is UWC-internal'] === 'Yes') {
                const exists = directoryRows.some((r) => nameMatches(String(r.staff_name), formData['Second Co-supervisor']));
                if (!exists) {
                    throw new Error('Co-supervisor 2 marked as UWC-internal must be selected from UWC staff directory.');
                }
            }
            else if (!formData['Second Co-supervisor External Email'].trim()) {
                throw new Error('External co-supervisor 2 email is required.');
            }
            else if (!isEmail(formData['Second Co-supervisor External Email'])) {
                throw new Error('External co-supervisor 2 email is invalid.');
            }
        }
        if (!hasLikelyFullName(formData['Administrative Supervisor (Nominal Role)'])) {
            throw new Error('Administrative Supervisor details are incomplete.');
        }
        if (caseRecord.completion_percent < 100) {
            throw new Error('Form is incomplete. Complete required fields before student vetting.');
        }
        yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).update({
            case_status: 'awaiting_supervisor_review',
            student_vetted_at: knex_1.default.fn.now(),
            last_comments: null,
            updated_at: knex_1.default.fn.now(),
        });
        const supervisors = yield getStaffEmail('supervisor');
        yield queueEmail(caseId, supervisors, 'Title Registration ready for supervisor vetting', `Case #${caseId} has been vetted by the student and awaits your review.`);
        yield requestSupervisorProfiles(caseId);
        yield syncModuleEntries(caseId, 'awaiting_supervisor_review', 'Awaiting supervisor review');
        const updated = yield (0, knex_1.default)('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Case not found after student vetting');
        }
        return updated;
    });
}
function supervisorReview(caseId, decision, comments) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, titleRegistrationTransitions_1.runSupervisorReviewTransition)(caseId, decision, comments, {
            db: knex_1.default,
            getStaffEmail,
            queueEmail,
            syncModuleEntries,
        });
    });
}
function deptReview(caseId, decision, comments) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, titleRegistrationTransitions_1.runDeptReviewTransition)(caseId, decision, comments, {
            db: knex_1.default,
            getStaffEmail,
            queueEmail,
            syncModuleEntries,
        });
    });
}
function chairpersonSign(caseId, comments) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, titleRegistrationTransitions_1.runChairpersonSignTransition)(caseId, comments, {
            db: knex_1.default,
            getStaffEmail,
            queueEmail,
            syncModuleEntries,
        });
    });
}
function deptSendToFaculty(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, titleRegistrationTransitions_1.runDeptSendToFacultyTransition)(caseId, {
            db: knex_1.default,
            getStaffEmail,
            queueEmail,
            syncModuleEntries,
        });
    });
}
function parseYesNo(input, defaultValue) {
    return input === 'Yes' || input === 'No' ? input : defaultValue;
}
function listSupervisorProfiles(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, knex_1.default)('supervisor_profile_forms')
            .where({ case_id: caseId })
            .whereNot({ status: 'inactive' })
            .orderBy('role', 'asc')
            .orderBy('created_at', 'asc');
    });
}
function updateSupervisorProfile(profileId, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        const existing = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first();
        if (!existing || existing.status === 'inactive') {
            throw new Error('Supervisor profile form not found');
        }
        const publications = Array.isArray(patch.recent_publications) ? patch.recent_publications : parsePublicationEntries(existing.recent_publications_json);
        const publicationCount = typeof patch.publication_count === 'number' ? patch.publication_count : existing.publication_count;
        const updatePayload = {
            person_title: typeof patch.person_title === 'string' ? patch.person_title : existing.person_title,
            qualifications: typeof patch.qualifications === 'string' ? patch.qualifications : existing.qualifications,
            contact_email: typeof patch.contact_email === 'string' ? patch.contact_email : existing.contact_email,
            external_address: typeof patch.external_address === 'string' ? patch.external_address : existing.external_address,
            publication_count: publicationCount,
            recent_publications_json: serializePublicationEntries(publications),
            contribution_motivation: typeof patch.contribution_motivation === 'string' ? patch.contribution_motivation : existing.contribution_motivation,
            new_to_department: parseYesNo(patch.new_to_department, existing.new_to_department),
            cv_attached: parseYesNo(patch.cv_attached, existing.cv_attached),
            cv_file_path: typeof patch.cv_file_path === 'string' ? patch.cv_file_path : existing.cv_file_path,
            updated_at: knex_1.default.fn.now(),
        };
        yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).update(updatePayload);
        const updated = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first();
        if (!updated) {
            throw new Error('Supervisor profile update failed');
        }
        yield syncSupervisorProfilesModuleStatus(updated.case_id);
        return updated;
    });
}
function submitSupervisorProfile(profileId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const profile = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first();
        if (!profile || profile.status === 'inactive') {
            throw new Error('Supervisor profile form not found');
        }
        const readiness = isProfileReady(profile);
        if (!readiness.ok) {
            throw new Error((_a = readiness.reason) !== null && _a !== void 0 ? _a : 'Supervisor profile is incomplete.');
        }
        yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).update({
            status: 'completed',
            submitted_at: knex_1.default.fn.now(),
            updated_at: knex_1.default.fn.now(),
        });
        const updated = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first();
        if (!updated) {
            throw new Error('Supervisor profile submit failed');
        }
        yield syncSupervisorProfilesModuleStatus(updated.case_id);
        return updated;
    });
}
function requestSupervisorProfiles(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const profiles = yield (0, knex_1.default)('supervisor_profile_forms')
            .where({ case_id: caseId })
            .whereNot({ status: 'inactive' });
        if (profiles.length === 0) {
            return { requested: 0 };
        }
        const pending = profiles.filter((profile) => profile.status !== 'completed');
        if (pending.length === 0) {
            return { requested: 0 };
        }
        yield (0, knex_1.default)('supervisor_profile_forms')
            .whereIn('id', pending.map((profile) => profile.id))
            .update({ status: 'requested', requested_at: knex_1.default.fn.now(), updated_at: knex_1.default.fn.now() });
        const { formData } = yield getCaseById(caseId);
        const adminRecipients = yield getStaffEmail('dept_fhd_rep');
        yield queueEmail(caseId, adminRecipients, 'Supervisor profile forms require completion', `Case #${caseId}: complete ${pending.length} activated supervisor profile form(s) for ${formData['Student Number']} (${formData['Student First-Name']} ${formData['Student Surname']}).`);
        yield syncSupervisorProfilesModuleStatus(caseId);
        return { requested: pending.length };
    });
}
function sendSupervisorProfilesReminder(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const profiles = yield (0, knex_1.default)('supervisor_profile_forms')
            .where({ case_id: caseId })
            .whereIn('status', ['draft', 'requested']);
        if (profiles.length === 0) {
            return { sent: false, reason: 'No pending supervisor profile forms.' };
        }
        const recipients = yield getStaffEmail('dept_fhd_rep');
        yield queueEmail(caseId, recipients, 'Reminder: pending supervisor profile forms', `Case #${caseId} still has ${profiles.length} pending supervisor profile form(s).`);
        yield (0, knex_1.default)('supervisor_profile_forms')
            .whereIn('id', profiles.map((profile) => profile.id))
            .update({ last_reminder_at: knex_1.default.fn.now(), updated_at: knex_1.default.fn.now() });
        return { sent: true };
    });
}
function sanitizeFilePart(value) {
    return value.replace(/[^a-zA-Z0-9._-]/g, '_');
}
function extractBase64Payload(input) {
    const commaIdx = input.indexOf(',');
    if (input.startsWith('data:') && commaIdx !== -1) {
        return input.slice(commaIdx + 1);
    }
    return input;
}
function uploadSupervisorProfileCv(profileId, fileName, contentBase64) {
    return __awaiter(this, void 0, void 0, function* () {
        const profile = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first();
        if (!profile || profile.status === 'inactive') {
            throw new Error('Supervisor profile form not found');
        }
        const { formData } = yield getCaseById(profile.case_id);
        const safeName = sanitizeFilePart(fileName || 'cv.pdf');
        const ext = path_1.default.extname(safeName).toLowerCase();
        const allowed = new Set(['.pdf', '.doc', '.docx']);
        if (!allowed.has(ext)) {
            throw new Error('CV upload must be a .pdf, .doc, or .docx file.');
        }
        const payload = extractBase64Payload(contentBase64).trim();
        if (!payload) {
            throw new Error('CV upload payload is empty.');
        }
        const repoRoot = resolveRepoRoot();
        const outDir = path_1.default.join(repoRoot, 'generated_forms', formData['Student Number'], 'supervisor_profiles');
        yield promises_1.default.mkdir(outDir, { recursive: true });
        const outFile = path_1.default.join(outDir, `profile_${profileId}_cv${ext}`);
        const bytes = Buffer.from(payload, 'base64');
        if (bytes.length === 0) {
            throw new Error('CV upload is empty after decoding.');
        }
        yield promises_1.default.writeFile(outFile, bytes);
        yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).update({
            cv_file_path: outFile,
            cv_attached: 'Yes',
            updated_at: knex_1.default.fn.now(),
        });
        const updated = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first();
        if (!updated) {
            throw new Error('Failed to persist uploaded CV path');
        }
        yield syncSupervisorProfilesModuleStatus(updated.case_id);
        return updated;
    });
}
function facultyReview(caseId, decision, comments) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, titleRegistrationTransitions_1.runFacultyReviewTransition)(caseId, decision, comments, {
            db: knex_1.default,
            getStaffEmail,
            queueEmail,
            syncModuleEntries,
        });
    });
}
function sendFacultyReminderIfDue(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, titleRegistrationTransitions_1.runFacultyReminderTransition)(caseId, {
            db: knex_1.default,
            getStaffEmail,
            queueEmail,
        });
    });
}
function listPipeline() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, operationsFeedService_1.listPipelineItems)();
    });
}
function listTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, operationsFeedService_1.listTaskItems)();
    });
}
function listExternalInvitesForCase(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, operationsFeedService_1.listExternalInviteItems)(caseId);
    });
}
function listToDoItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, operationsFeedService_1.listToDoEntries)();
    });
}
function listPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, operationsFeedService_1.listPeopleEntries)();
    });
}
function listNotifications(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, operationsFeedService_1.listNotificationEntries)(caseId);
    });
}

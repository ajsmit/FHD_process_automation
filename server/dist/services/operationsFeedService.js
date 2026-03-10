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
exports.listPipelineItems = listPipelineItems;
exports.listTaskItems = listTaskItems;
exports.listExternalInviteItems = listExternalInviteItems;
exports.listToDoEntries = listToDoEntries;
exports.listPeopleEntries = listPeopleEntries;
exports.listNotificationEntries = listNotificationEntries;
const knex_1 = __importDefault(require("../db/knex"));
function listPipelineItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const baseRows = yield (0, knex_1.default)('title_registration_cases')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .select('title_registration_cases.id', 'sasi_students.student_number', 'sasi_students.first_names', 'sasi_students.last_name', 'title_registration_cases.case_status', 'title_registration_cases.completion_percent', 'title_registration_cases.updated_at')
            .orderBy('title_registration_cases.updated_at', 'desc');
        const withProfiles = yield Promise.all(baseRows.map((row) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const profiles = yield (0, knex_1.default)('supervisor_profile_forms')
                .where({ case_id: Number(row.id) })
                .whereNot({ status: 'inactive' });
            const completed = profiles.filter((profile) => profile.status === 'completed').length;
            const mou = yield (0, knex_1.default)('mou_forms').where({ case_id: Number(row.id) }).first();
            return Object.assign(Object.assign({}, row), { supervisor_profiles_total: profiles.length, supervisor_profiles_completed: completed, mou_status: (_a = mou === null || mou === void 0 ? void 0 : mou.status) !== null && _a !== void 0 ? _a : 'pending', title_formalities_finalised: profiles.length > 0 && completed === profiles.length && (mou === null || mou === void 0 ? void 0 : mou.status) === 'completed' });
        })));
        return withProfiles;
    });
}
function listTaskItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, knex_1.default)('module_entries')
            .join('title_registration_cases', 'title_registration_cases.id', 'module_entries.case_id')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .select('module_entries.id', 'module_entries.module_name', 'module_entries.status', 'module_entries.summary', 'sasi_students.student_number', 'sasi_students.first_names', 'sasi_students.last_name', 'module_entries.updated_at')
            .orderBy('module_entries.updated_at', 'desc');
    });
}
function listExternalInviteItems(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const invites = yield (0, knex_1.default)('external_academic_profile_invites')
            .where({ case_id: caseId })
            .orderBy('id', 'desc');
        const latestByRole = new Map();
        for (const invite of invites) {
            const role = String((_a = invite.role) !== null && _a !== void 0 ? _a : '');
            if (!role)
                continue;
            if (!latestByRole.has(role)) {
                latestByRole.set(role, invite);
            }
        }
        const appBase = (((_b = process.env.EXTERNAL_PROFILE_BASE_URL) === null || _b === void 0 ? void 0 : _b.trim()) || 'http://localhost:3000').replace(/\/$/, '');
        const rows = [];
        for (const invite of latestByRole.values()) {
            const email = String((_c = invite.email) !== null && _c !== void 0 ? _c : '');
            const latestMail = yield (0, knex_1.default)('notification_queue')
                .where({ case_id: caseId, email_to: email })
                .where('subject', 'like', '%External Academic Profile Request%')
                .orderBy('id', 'desc')
                .first();
            let deliveryStatus = 'queued';
            const mailStatus = String((_d = latestMail === null || latestMail === void 0 ? void 0 : latestMail.status) !== null && _d !== void 0 ? _d : '').toLowerCase();
            if (mailStatus === 'sent') {
                deliveryStatus = 'sent';
            }
            else if (mailStatus === 'failed') {
                deliveryStatus = 'failed';
            }
            rows.push({
                role: String((_e = invite.role) !== null && _e !== void 0 ? _e : ''),
                email,
                status: String((_f = invite.status) !== null && _f !== void 0 ? _f : ''),
                expiresAt: (_g = invite.expires_at) !== null && _g !== void 0 ? _g : null,
                completedAt: (_h = invite.completed_at) !== null && _h !== void 0 ? _h : null,
                updatedAt: (_j = invite.updated_at) !== null && _j !== void 0 ? _j : null,
                inviteLink: `${appBase}/external-academic/${String((_k = invite.token) !== null && _k !== void 0 ? _k : '')}`,
                deliveryStatus,
                externalAcademicId: (_l = invite.external_academic_id) !== null && _l !== void 0 ? _l : null,
            });
        }
        return rows;
    });
}
function listToDoEntries() {
    return __awaiter(this, void 0, void 0, function* () {
        const moduleItems = yield (0, knex_1.default)('module_entries')
            .join('title_registration_cases', 'title_registration_cases.id', 'module_entries.case_id')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .whereNotIn('module_entries.status', ['completed', 'approved'])
            .select('module_entries.case_id', 'module_entries.module_name', 'module_entries.status', 'module_entries.summary', 'module_entries.updated_at', 'sasi_students.student_number', 'sasi_students.first_names', 'sasi_students.last_name');
        const profileItems = yield (0, knex_1.default)('supervisor_profile_forms')
            .join('title_registration_cases', 'title_registration_cases.id', 'supervisor_profile_forms.case_id')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .whereIn('supervisor_profile_forms.status', ['draft', 'requested'])
            .whereNot('supervisor_profile_forms.status', 'inactive')
            .select('supervisor_profile_forms.case_id', 'supervisor_profile_forms.role', 'supervisor_profile_forms.person_name', 'supervisor_profile_forms.status', 'supervisor_profile_forms.updated_at', 'sasi_students.student_number', 'sasi_students.first_names', 'sasi_students.last_name');
        const inviteItems = yield (0, knex_1.default)('external_academic_profile_invites')
            .join('title_registration_cases', 'title_registration_cases.id', 'external_academic_profile_invites.case_id')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .where('external_academic_profile_invites.status', 'pending')
            .select('external_academic_profile_invites.case_id', 'external_academic_profile_invites.role', 'external_academic_profile_invites.email', 'external_academic_profile_invites.expires_at', 'external_academic_profile_invites.updated_at', 'sasi_students.student_number', 'sasi_students.first_names', 'sasi_students.last_name');
        const notificationItems = yield (0, knex_1.default)('notification_queue')
            .leftJoin('title_registration_cases', 'title_registration_cases.id', 'notification_queue.case_id')
            .leftJoin('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .whereIn('notification_queue.status', ['queued', 'failed'])
            .select('notification_queue.case_id', 'notification_queue.subject', 'notification_queue.email_to', 'notification_queue.status', 'notification_queue.created_at', 'sasi_students.student_number', 'sasi_students.first_names', 'sasi_students.last_name');
        const rows = [
            ...moduleItems.map((row) => ({
                type: 'module',
                case_id: row.case_id,
                title: `${row.module_name} (${row.status})`,
                detail: row.summary,
                student_number: row.student_number,
                student_name: `${row.first_names} ${row.last_name}`.trim(),
                updated_at: row.updated_at,
            })),
            ...profileItems.map((row) => ({
                type: 'supervisor_profile',
                case_id: row.case_id,
                title: `Supervisor profile pending: ${row.role}`,
                detail: `${row.person_name} (${row.status})`,
                student_number: row.student_number,
                student_name: `${row.first_names} ${row.last_name}`.trim(),
                updated_at: row.updated_at,
            })),
            ...inviteItems.map((row) => {
                var _a;
                return ({
                    type: 'external_invite',
                    case_id: row.case_id,
                    title: `Waiting on external profile: ${row.role}`,
                    detail: `${row.email} (expires ${String((_a = row.expires_at) !== null && _a !== void 0 ? _a : '').slice(0, 10)})`,
                    student_number: row.student_number,
                    student_name: `${row.first_names} ${row.last_name}`.trim(),
                    updated_at: row.updated_at,
                });
            }),
            ...notificationItems.map((row) => {
                var _a, _b, _c;
                return ({
                    type: 'notification',
                    case_id: row.case_id,
                    title: `Notification ${row.status}`,
                    detail: `${row.subject} -> ${row.email_to}`,
                    student_number: (_a = row.student_number) !== null && _a !== void 0 ? _a : '',
                    student_name: `${(_b = row.first_names) !== null && _b !== void 0 ? _b : ''} ${(_c = row.last_name) !== null && _c !== void 0 ? _c : ''}`.trim(),
                    updated_at: row.created_at,
                });
            }),
        ];
        return rows.sort((a, b) => { var _a, _b; return String((_a = b.updated_at) !== null && _a !== void 0 ? _a : '').localeCompare(String((_b = a.updated_at) !== null && _b !== void 0 ? _b : '')); });
    });
}
function listPeopleEntries() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, knex_1.default)('sasi_staff').select('*').orderBy('full_name', 'asc');
    });
}
function listNotificationEntries(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, knex_1.default)('notification_queue').select('*').orderBy('created_at', 'desc');
        if (caseId) {
            query.where({ case_id: caseId });
        }
        return query;
    });
}

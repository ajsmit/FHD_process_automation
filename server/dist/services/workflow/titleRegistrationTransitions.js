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
exports.runSupervisorReviewTransition = runSupervisorReviewTransition;
exports.runDeptReviewTransition = runDeptReviewTransition;
exports.runChairpersonSignTransition = runChairpersonSignTransition;
exports.runDeptSendToFacultyTransition = runDeptSendToFacultyTransition;
exports.runFacultyReviewTransition = runFacultyReviewTransition;
exports.runFacultyReminderTransition = runFacultyReminderTransition;
function runSupervisorReviewTransition(caseId, decision, comments, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const caseRecord = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        if (decision === 'insufficient') {
            yield deps.db('title_registration_cases').where({ id: caseId }).update({
                case_status: 'returned_by_supervisor',
                supervisor_reviewed_at: deps.db.fn.now(),
                last_comments: comments !== null && comments !== void 0 ? comments : 'Returned as insufficient by supervisor',
                updated_at: deps.db.fn.now(),
            });
            const student = yield deps.db('sasi_students')
                .join('title_registration_cases', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
                .where('title_registration_cases.id', caseId)
                .first('sasi_students.email');
            yield deps.queueEmail(caseId, [(_a = student === null || student === void 0 ? void 0 : student.email) !== null && _a !== void 0 ? _a : ''], 'Title Registration returned by supervisor', comments !== null && comments !== void 0 ? comments : 'Please correct the form and resubmit.');
            yield deps.syncModuleEntries(caseId, 'returned_by_supervisor', 'Returned by supervisor for correction');
        }
        else {
            yield deps.db('title_registration_cases').where({ id: caseId }).update({
                case_status: 'awaiting_dept_fhd_review',
                supervisor_reviewed_at: deps.db.fn.now(),
                last_comments: comments !== null && comments !== void 0 ? comments : null,
                updated_at: deps.db.fn.now(),
            });
            const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
            yield deps.queueEmail(caseId, deptReps, 'Title Registration awaiting Dept FHD review', `Case #${caseId} has been vetted by the supervisor and requires Dept FHD review.`);
            yield deps.syncModuleEntries(caseId, 'awaiting_dept_fhd_review', 'Awaiting Dept FHD review');
        }
        const updated = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Case missing after supervisor review');
        }
        return updated;
    });
}
function runDeptReviewTransition(caseId, decision, comments, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        if (decision === 'insufficient') {
            yield deps.db('title_registration_cases').where({ id: caseId }).update({
                case_status: 'returned_by_dept_fhd',
                dept_reviewed_at: deps.db.fn.now(),
                last_comments: comments !== null && comments !== void 0 ? comments : 'Returned by Dept FHD for further action',
                updated_at: deps.db.fn.now(),
            });
            const supervisors = yield deps.getStaffEmail('supervisor');
            yield deps.queueEmail(caseId, supervisors, 'Title Registration returned by Dept FHD rep', comments !== null && comments !== void 0 ? comments : 'Please revise and resubmit.');
            yield deps.syncModuleEntries(caseId, 'returned_by_dept_fhd', 'Returned by Dept FHD');
        }
        else {
            yield deps.db('title_registration_cases').where({ id: caseId }).update({
                case_status: 'awaiting_chairperson_signature',
                dept_reviewed_at: deps.db.fn.now(),
                last_comments: comments !== null && comments !== void 0 ? comments : null,
                updated_at: deps.db.fn.now(),
            });
            const hods = yield deps.getStaffEmail('hod');
            const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
            yield deps.queueEmail(caseId, hods, 'Title Registration awaiting Department Chairperson signature', `Case #${caseId} has been vetted by Dept FHD and now requires Chairperson signature.`);
            yield deps.queueEmail(caseId, deptReps, 'Dept FHD vetting complete - sent to Chairperson', `Case #${caseId} is waiting for Chairperson signature.`);
            yield deps.syncModuleEntries(caseId, 'awaiting_chairperson_signature', 'Awaiting Chairperson signature');
        }
        const updated = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Case missing after dept review');
        }
        return updated;
    });
}
function runChairpersonSignTransition(caseId, comments, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        if (caseRecord.case_status !== 'awaiting_chairperson_signature') {
            throw new Error('Case is not awaiting Chairperson signature.');
        }
        yield deps.db('title_registration_cases').where({ id: caseId }).update({
            case_status: 'awaiting_dept_fhd_send_to_faculty',
            last_comments: comments !== null && comments !== void 0 ? comments : null,
            updated_at: deps.db.fn.now(),
        });
        const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
        yield deps.queueEmail(caseId, deptReps, 'Chairperson signed - send Title Registration to Faculty', `Case #${caseId} has Chairperson signature and awaits Dept FHD send-to-Faculty action.`);
        yield deps.syncModuleEntries(caseId, 'awaiting_dept_fhd_send_to_faculty', 'Chairperson signed; awaiting Dept FHD send to Faculty');
        const updated = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Case missing after chairperson signature');
        }
        return updated;
    });
}
function runDeptSendToFacultyTransition(caseId, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        if (caseRecord.case_status !== 'awaiting_dept_fhd_send_to_faculty') {
            throw new Error('Case is not awaiting Dept FHD send-to-Faculty action.');
        }
        const activeProfiles = yield deps.db('supervisor_profile_forms')
            .where({ case_id: caseId })
            .whereNot({ status: 'inactive' });
        if (activeProfiles.length === 0) {
            throw new Error('No supervisor profile forms are activated yet.');
        }
        const pendingProfiles = activeProfiles.filter((profile) => profile.status !== 'completed');
        if (pendingProfiles.length > 0) {
            throw new Error(`Supervisor profile forms are incomplete (${activeProfiles.length - pendingProfiles.length}/${activeProfiles.length} completed).`);
        }
        yield deps.db('title_registration_cases').where({ id: caseId }).update({
            case_status: 'sent_to_faculty_fhd',
            sent_to_faculty_at: deps.db.fn.now(),
            updated_at: deps.db.fn.now(),
        });
        const facultyReps = yield deps.getStaffEmail('faculty_fhd_rep');
        const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
        const supervisors = yield deps.getStaffEmail('supervisor');
        const coSupervisors = yield deps.getStaffEmail('co_supervisor');
        const hods = yield deps.getStaffEmail('hod');
        yield deps.queueEmail(caseId, facultyReps, 'Title Registration sent to Faculty FHD rep', `Case #${caseId} was signed by the Chairperson and sent by Dept FHD for Faculty action.`);
        yield deps.queueEmail(caseId, [...deptReps, ...supervisors, ...coSupervisors, ...hods], 'Title Registration marked Approved by Dept FHD rep', `Case #${caseId} is approved at department level and sent to Faculty FHD rep.`);
        yield deps.syncModuleEntries(caseId, 'sent_to_faculty_fhd', 'Dept approved, Chairperson signed, and sent to Faculty FHD');
        const updated = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Case missing after dept send to faculty');
        }
        return updated;
    });
}
function runFacultyReviewTransition(caseId, decision, comments, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        if (decision === 'insufficient') {
            yield deps.db('title_registration_cases').where({ id: caseId }).update({
                case_status: 'returned_by_faculty_fhd',
                faculty_reviewed_at: deps.db.fn.now(),
                last_comments: comments !== null && comments !== void 0 ? comments : 'Returned by Faculty FHD',
                updated_at: deps.db.fn.now(),
            });
            const supervisors = yield deps.getStaffEmail('supervisor');
            const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
            yield deps.queueEmail(caseId, [...supervisors, ...deptReps], 'Title Registration returned by Faculty FHD', comments !== null && comments !== void 0 ? comments : 'Please address Faculty comments.');
            yield deps.syncModuleEntries(caseId, 'returned_by_faculty_fhd', 'Returned by Faculty FHD');
        }
        else {
            yield deps.db('title_registration_cases').where({ id: caseId }).update({
                case_status: 'approved',
                faculty_reviewed_at: deps.db.fn.now(),
                last_comments: comments !== null && comments !== void 0 ? comments : null,
                updated_at: deps.db.fn.now(),
            });
            const facultyReps = yield deps.getStaffEmail('faculty_fhd_rep');
            const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
            const supervisors = yield deps.getStaffEmail('supervisor');
            yield deps.queueEmail(caseId, [...facultyReps, ...deptReps, ...supervisors], 'Title Registration fully approved', `Case #${caseId} has been vetted and approved.`);
            yield deps.syncModuleEntries(caseId, 'approved', 'Approved by Faculty FHD');
        }
        const updated = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!updated) {
            throw new Error('Case missing after faculty review');
        }
        return updated;
    });
}
function workingDaysBetween(from, to) {
    if (to < from) {
        return 0;
    }
    let count = 0;
    const cursor = new Date(from);
    while (cursor < to) {
        cursor.setDate(cursor.getDate() + 1);
        const day = cursor.getDay();
        if (day !== 0 && day !== 6) {
            count += 1;
        }
    }
    return count;
}
function runFacultyReminderTransition(caseId, deps) {
    return __awaiter(this, void 0, void 0, function* () {
        const caseRecord = yield deps.db('title_registration_cases').where({ id: caseId }).first();
        if (!caseRecord) {
            throw new Error('Case not found');
        }
        if (caseRecord.case_status !== 'sent_to_faculty_fhd') {
            return { sent: false, reason: 'Case is not pending faculty action.' };
        }
        if (!caseRecord.sent_to_faculty_at) {
            return { sent: false, reason: 'Case has no faculty send timestamp.' };
        }
        const now = new Date();
        const since = new Date(caseRecord.sent_to_faculty_at);
        const days = workingDaysBetween(since, now);
        if (days < 3) {
            return { sent: false, reason: 'Three working days have not elapsed yet.' };
        }
        if (caseRecord.last_reminder_at) {
            const lastReminder = new Date(caseRecord.last_reminder_at);
            if (workingDaysBetween(lastReminder, now) < 3) {
                return { sent: false, reason: 'Reminder already sent within the last 3 working days.' };
            }
        }
        const facultyReps = yield deps.getStaffEmail('faculty_fhd_rep');
        const deptReps = yield deps.getStaffEmail('dept_fhd_rep');
        yield deps.queueEmail(caseId, [...facultyReps, ...deptReps], 'Reminder: Faculty action overdue on Title Registration', `Case #${caseId} has been pending Faculty action for ${days} working days.`);
        yield deps.db('title_registration_cases').where({ id: caseId }).update({ last_reminder_at: deps.db.fn.now(), updated_at: deps.db.fn.now() });
        return { sent: true };
    });
}

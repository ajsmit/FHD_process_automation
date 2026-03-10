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
exports.requireCaseOperationAuthorization = requireCaseOperationAuthorization;
exports.requireProfileOperationAuthorization = requireProfileOperationAuthorization;
exports.requireCollectionOperationAuthorization = requireCollectionOperationAuthorization;
const knex_1 = __importDefault(require("../db/knex"));
function normalizeName(value) {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
}
function parseCaseId(req) {
    const raw = req.params.caseId;
    const id = Number.parseInt(raw, 10);
    if (!Number.isFinite(id) || id < 1) {
        throw new Error('Invalid case id');
    }
    return id;
}
function parseProfileId(req) {
    const raw = req.params.profileId;
    const id = Number.parseInt(raw, 10);
    if (!Number.isFinite(id) || id < 1) {
        throw new Error('Invalid profile id');
    }
    return id;
}
function hasSasiStaffRole(sasiId, role, department) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = (0, knex_1.default)('sasi_staff').where({
            staff_number: sasiId,
            role,
        });
        if (department) {
            query = query.andWhere('department', department);
        }
        const row = yield query.first();
        return Boolean(row);
    });
}
function isAssignedSupervisor(userFirst, userLast, formData) {
    const actor = normalizeName(`${userFirst} ${userLast}`);
    const candidates = [
        formData.Supervisor,
        formData['Administrative Supervisor (Nominal Role)'],
        formData['Co-supervisor'],
        formData['Second Co-supervisor'],
    ]
        .map((value) => normalizeName(String(value !== null && value !== void 0 ? value : '')))
        .filter((value) => value && value !== 'na');
    return candidates.includes(actor);
}
function loadCaseContext(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const row = yield (0, knex_1.default)('title_registration_cases')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .where('title_registration_cases.id', caseId)
            .select('title_registration_cases.id', 'title_registration_cases.form_data_json', 'sasi_students.student_number', 'sasi_students.department')
            .first();
        if (!row) {
            throw new Error('Case not found');
        }
        return {
            caseId: Number(row.id),
            formData: JSON.parse(String(row.form_data_json)),
            studentNumber: String(row.student_number),
            studentDepartment: String((_a = row.department) !== null && _a !== void 0 ? _a : ''),
        };
    });
}
function adminScopeFlags(sasiId, department) {
    return __awaiter(this, void 0, void 0, function* () {
        const [dept, chair, faculty] = yield Promise.all([
            hasSasiStaffRole(sasiId, 'dept_fhd_rep', department),
            hasSasiStaffRole(sasiId, 'hod', department),
            hasSasiStaffRole(sasiId, 'faculty_fhd_rep'),
        ]);
        return { dept, chair, faculty };
    });
}
function authorizeCaseOperation(req, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.authUser;
        if (!user) {
            return false;
        }
        const context = yield loadCaseContext(parseCaseId(req));
        if (user.role === 'student') {
            if (user.sasiId !== context.studentNumber)
                return false;
            return action !== 'supervisor_profiles_reminder';
        }
        if (user.role === 'supervisor') {
            const assigned = isAssignedSupervisor(user.firstName, user.lastName, context.formData);
            if (!assigned)
                return false;
            if (action === 'form_edit' || action === 'mou_complete' || action === 'supervisor_profiles_request' || action === 'supervisor_profiles_reminder') {
                return false;
            }
            return true;
        }
        if (user.role !== 'admin') {
            return false;
        }
        const flags = yield adminScopeFlags(user.sasiId, context.studentDepartment);
        switch (action) {
            case 'case_read':
            case 'print':
            case 'external_invites_read':
            case 'supervisor_profiles_read':
            case 'mou_read':
            case 'mou_print':
                return flags.dept || flags.chair || flags.faculty;
            case 'form_edit':
                return false;
            case 'supervisor_profiles_request':
                return flags.dept;
            case 'supervisor_profiles_reminder':
                return flags.dept || flags.faculty;
            case 'mou_edit':
                return flags.dept || flags.chair;
            case 'mou_complete':
                return false;
            default:
                return false;
        }
    });
}
function authorizeProfileOperation(req, action) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const user = req.authUser;
        if (!user || user.role !== 'supervisor') {
            return false;
        }
        const profileId = parseProfileId(req);
        const profile = yield (0, knex_1.default)('supervisor_profile_forms').where({ id: profileId }).first('case_id', 'person_name', 'status');
        if (!profile || String((_a = profile.status) !== null && _a !== void 0 ? _a : '') === 'inactive') {
            return false;
        }
        const context = yield loadCaseContext(Number(profile.case_id));
        const assigned = isAssignedSupervisor(user.firstName, user.lastName, context.formData);
        if (!assigned) {
            return false;
        }
        const profileOwner = normalizeName(String((_b = profile.person_name) !== null && _b !== void 0 ? _b : ''));
        const actor = normalizeName(`${user.firstName} ${user.lastName}`);
        if (!profileOwner || profileOwner !== actor) {
            return false;
        }
        if (action === 'profile_edit' || action === 'profile_submit' || action === 'profile_upload_cv') {
            return true;
        }
        return false;
    });
}
function requireCaseOperationAuthorization(action) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authorized = yield authorizeCaseOperation(req, action);
            if (!authorized) {
                res.status(403).json({ message: 'Authenticated actor is not authorized for this case operation.' });
                return;
            }
            next();
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Authorization check failed' });
        }
    });
}
function requireProfileOperationAuthorization(action) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authorized = yield authorizeProfileOperation(req, action);
            if (!authorized) {
                res.status(403).json({ message: 'Authenticated actor is not authorized for this profile operation.' });
                return;
            }
            next();
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Authorization check failed' });
        }
    });
}
function requireCollectionOperationAuthorization() {
    return (req, res, next) => {
        if (!req.authUser) {
            res.status(401).json({ message: 'Authentication required.' });
            return;
        }
        next();
    };
}

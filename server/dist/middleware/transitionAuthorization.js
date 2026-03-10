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
exports.requireTransitionAuthorization = requireTransitionAuthorization;
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
function loadCaseContext(caseId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const row = yield (0, knex_1.default)('title_registration_cases')
            .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
            .where('title_registration_cases.id', caseId)
            .select('title_registration_cases.form_data_json', 'sasi_students.student_number', 'sasi_students.department')
            .first();
        if (!row) {
            throw new Error('Case not found');
        }
        const formData = JSON.parse(String(row.form_data_json));
        return {
            formData,
            studentNumber: String(row.student_number),
            studentDepartment: String((_a = row.department) !== null && _a !== void 0 ? _a : ''),
        };
    });
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
        .map((v) => normalizeName(String(v !== null && v !== void 0 ? v : '')))
        .filter((v) => v && v !== 'na');
    return candidates.includes(actor);
}
function isAuthorizedForAction(req, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.authUser;
        if (!user)
            return false;
        const caseId = parseCaseId(req);
        const { formData, studentNumber, studentDepartment } = yield loadCaseContext(caseId);
        if (action === 'student_vet') {
            return user.role === 'student' && user.sasiId === studentNumber;
        }
        if (action === 'supervisor_review') {
            if (user.role !== 'supervisor')
                return false;
            return isAssignedSupervisor(user.firstName, user.lastName, formData);
        }
        if (user.role !== 'admin') {
            return false;
        }
        if (action === 'dept_review' || action === 'dept_send_faculty') {
            return hasSasiStaffRole(user.sasiId, 'dept_fhd_rep', studentDepartment);
        }
        if (action === 'chairperson_sign') {
            return hasSasiStaffRole(user.sasiId, 'hod', studentDepartment);
        }
        if (action === 'faculty_review') {
            return hasSasiStaffRole(user.sasiId, 'faculty_fhd_rep');
        }
        if (action === 'reminder') {
            const dept = yield hasSasiStaffRole(user.sasiId, 'dept_fhd_rep', studentDepartment);
            if (dept)
                return true;
            return hasSasiStaffRole(user.sasiId, 'faculty_fhd_rep');
        }
        return false;
    });
}
function requireTransitionAuthorization(action) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const authorized = yield isAuthorizedForAction(req, action);
            if (!authorized) {
                res.status(403).json({ message: 'Authenticated actor is not authorized for this case transition.' });
                return;
            }
            next();
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Authorization check failed' });
        }
    });
}

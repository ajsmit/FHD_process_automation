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
exports.searchStudents = searchStudents;
exports.getStudentByNumber = getStudentByNumber;
const knex_1 = __importDefault(require("../db/knex"));
function currentProvider() {
    var _a;
    return (((_a = process.env.SASI_PROVIDER) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) === 'api' ? 'api' : 'local');
}
function sasiApiBase() {
    var _a;
    return ((_a = process.env.SASI_API_ENDPOINT) !== null && _a !== void 0 ? _a : '').trim().replace(/\/$/, '');
}
function sasiApiKey() {
    var _a;
    return ((_a = process.env.SASI_API_KEY) !== null && _a !== void 0 ? _a : '').trim();
}
function normalizeStudentPayload(input) {
    const getStr = (key) => { var _a; return String((_a = input[key]) !== null && _a !== void 0 ? _a : ''); };
    const getOptStr = (key) => {
        const value = input[key];
        return value === undefined || value === null || String(value).trim() === '' ? null : String(value);
    };
    const getInt = (key, fallback = 0) => {
        var _a;
        const parsed = Number.parseInt(String((_a = input[key]) !== null && _a !== void 0 ? _a : ''), 10);
        return Number.isFinite(parsed) ? parsed : fallback;
    };
    return {
        id: getInt('id'),
        student_number: getStr('student_number'),
        title: getOptStr('title'),
        first_names: getStr('first_names'),
        last_name: getStr('last_name'),
        email: getOptStr('email'),
        faculty: getStr('faculty'),
        department: getStr('department'),
        degree_level: getStr('degree_level') || 'MSC',
        degree_type: getStr('degree_type') || 'FULL_THESIS',
        registration_type: getStr('registration_type') || 'FULL_TIME',
        registration_active: getInt('registration_active', 0),
        first_enrolment_year: getInt('first_enrolment_year'),
        first_registration_date: getOptStr('first_registration_date'),
        first_registration_semester: (() => {
            const raw = input.first_registration_semester;
            if (raw === undefined || raw === null || String(raw).trim() === '')
                return null;
            const parsed = Number.parseInt(String(raw), 10);
            return Number.isFinite(parsed) ? parsed : null;
        })(),
        expected_completion_date: getOptStr('expected_completion_date'),
        thesis_title: getOptStr('thesis_title'),
        ethics_required: getInt('ethics_required', 0),
        ethics_ref_number: getOptStr('ethics_ref_number'),
        supervisor_name: getOptStr('supervisor_name'),
        supervisor_qualifications: getOptStr('supervisor_qualifications'),
        co_supervisor_name: getOptStr('co_supervisor_name'),
        co_supervisor_qualifications: getOptStr('co_supervisor_qualifications'),
        admin_supervisor_name: getOptStr('admin_supervisor_name'),
        admin_supervisor_qualifications: getOptStr('admin_supervisor_qualifications'),
    };
}
function fetchFromSasiApi(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = sasiApiBase();
        if (!base) {
            throw new Error('SASI_API_ENDPOINT is required when SASI_PROVIDER=api');
        }
        const key = sasiApiKey();
        const response = yield fetch(`${base}${path}`, {
            headers: Object.assign(Object.assign({}, (key ? { Authorization: `Bearer ${key}` } : {})), { Accept: 'application/json' }),
        });
        if (!response.ok) {
            throw new Error(`SASI API request failed (${response.status})`);
        }
        return response.json();
    });
}
function searchStudentsApi(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const search = new URLSearchParams();
        if (params.studentNumber)
            search.set('student_number', params.studentNumber.trim());
        if (params.firstName)
            search.set('first_name', params.firstName.trim());
        if (params.lastName)
            search.set('last_name', params.lastName.trim());
        const payload = yield fetchFromSasiApi(`/students${search.toString() ? `?${search.toString()}` : ''}`);
        const rows = Array.isArray(payload) ? payload : ((_a = payload === null || payload === void 0 ? void 0 : payload.data) !== null && _a !== void 0 ? _a : []);
        if (!Array.isArray(rows)) {
            return [];
        }
        return rows.map((row) => normalizeStudentPayload(row));
    });
}
function getStudentByNumberApi(studentNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const payload = yield fetchFromSasiApi(`/students/${encodeURIComponent(studentNumber.trim())}`);
        const row = (_a = payload === null || payload === void 0 ? void 0 : payload.data) !== null && _a !== void 0 ? _a : payload;
        if (!row || typeof row !== 'object') {
            return undefined;
        }
        return normalizeStudentPayload(row);
    });
}
function searchStudents(params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentProvider() === 'api') {
            return searchStudentsApi(params);
        }
        const query = (0, knex_1.default)('sasi_students').select('*');
        if (params.studentNumber) {
            query.where('student_number', params.studentNumber.trim());
            return query;
        }
        if (params.firstName) {
            query.where('first_names', 'like', `%${params.firstName.trim()}%`);
        }
        if (params.lastName) {
            query.where('last_name', 'like', `%${params.lastName.trim()}%`);
        }
        return query.limit(20);
    });
}
function getStudentByNumber(studentNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        if (currentProvider() === 'api') {
            return getStudentByNumberApi(studentNumber);
        }
        return (0, knex_1.default)('sasi_students').where({ student_number: studentNumber }).first();
    });
}

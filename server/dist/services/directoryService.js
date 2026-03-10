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
exports.listDepartments = listDepartments;
exports.listStaff = listStaff;
exports.listExternalAcademics = listExternalAcademics;
const knex_1 = __importDefault(require("../db/knex"));
function listDepartments(faculty) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, knex_1.default)('uwc_departments').select('*').orderBy(['faculty_name', 'department_name']);
        if (faculty) {
            query.where('faculty_name', 'like', `%${faculty.trim()}%`);
        }
        return query;
    });
}
function listStaff(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, knex_1.default)('uwc_staff_directory').select('*').orderBy('staff_name', 'asc');
        if (params.department) {
            query.where('department_name', 'like', `%${params.department.trim()}%`);
        }
        if (params.q) {
            query.where((builder) => {
                var _a, _b, _c, _d, _e;
                builder
                    .where('staff_name', 'like', `%${(_a = params.q) === null || _a === void 0 ? void 0 : _a.trim()}%`)
                    .orWhere('position_title', 'like', `%${(_b = params.q) === null || _b === void 0 ? void 0 : _b.trim()}%`)
                    .orWhere('highest_qualification', 'like', `%${(_c = params.q) === null || _c === void 0 ? void 0 : _c.trim()}%`)
                    .orWhere('research_specialisations', 'like', `%${(_d = params.q) === null || _d === void 0 ? void 0 : _d.trim()}%`)
                    .orWhere('faculty_role', 'like', `%${(_e = params.q) === null || _e === void 0 ? void 0 : _e.trim()}%`);
            });
        }
        if (params.internalOnly) {
            query.where({ is_internal: 1 });
        }
        return query.limit(200);
    });
}
function listExternalAcademics(q) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = (0, knex_1.default)('external_academic_registry')
            .select('*')
            .orderBy(['last_name', 'first_name']);
        if (q === null || q === void 0 ? void 0 : q.trim()) {
            query.where((builder) => {
                builder
                    .where('full_name', 'like', `%${q.trim()}%`)
                    .orWhere('last_name', 'like', `%${q.trim()}%`)
                    .orWhere('email', 'like', `%${q.trim()}%`)
                    .orWhere('alternate_email', 'like', `%${q.trim()}%`)
                    .orWhere('unique_identifier_value', 'like', `%${q.trim()}%`)
                    .orWhere('highest_qualification', 'like', `%${q.trim()}%`)
                    .orWhere('affiliation_institution', 'like', `%${q.trim()}%`)
                    .orWhere('affiliation_department', 'like', `%${q.trim()}%`)
                    .orWhere('affiliation_position_title', 'like', `%${q.trim()}%`)
                    .orWhere('expertise_keywords', 'like', `%${q.trim()}%`)
                    .orWhere('country', 'like', `%${q.trim()}%`)
                    .orWhere('orcid', 'like', `%${q.trim()}%`);
            });
        }
        return query.limit(500);
    });
}

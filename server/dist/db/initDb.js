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
exports.initDb = initDb;
const knex_1 = __importDefault(require("./knex"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const seedSasiStudents = [
    {
        student_number: '1234567',
        title: 'Ms',
        first_names: 'Jesse',
        last_name: 'Smith',
        email: 'jesse.smith@example.com',
        faculty: 'Natural Sciences',
        department: 'Biodiversity & Conservation Biology',
        degree_level: 'PHD',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2026-01-02',
        expected_completion_date: '2029-12-15',
        thesis_title: 'Biodiversity monitoring under climate stress',
        ethics_required: 1,
        ethics_ref_number: 'ETH-2026-BCB-001',
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234568',
        title: 'Mr',
        first_names: 'Liam',
        last_name: 'Naidoo',
        email: 'liam.naidoo@example.com',
        faculty: 'Natural Sciences',
        department: 'Biodiversity & Conservation Biology',
        degree_level: 'MSC',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2025-12-01',
        expected_completion_date: '2027-11-30',
        thesis_title: 'Urban pollinator response to warming',
        ethics_required: 1,
        ethics_ref_number: 'ETH-2026-BCB-002',
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234569',
        title: 'Ms',
        first_names: 'Aisha',
        last_name: 'Petersen',
        email: 'aisha.petersen@example.com',
        faculty: 'Natural Sciences',
        department: 'Chemistry',
        degree_level: 'MSC',
        degree_type: 'MINI_THESIS',
        registration_type: 'PART_TIME',
        first_enrolment_year: 2025,
        first_registration_date: '2025-10-15',
        expected_completion_date: '2027-12-01',
        thesis_title: 'Catalyst pathways in saline conditions',
        ethics_required: 0,
        ethics_ref_number: null,
        first_registration_semester: 2,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234570',
        title: 'Mr',
        first_names: 'Sipho',
        last_name: 'Moyo',
        email: 'sipho.moyo@example.com',
        faculty: 'Natural Sciences',
        department: 'Physics',
        degree_level: 'PHD',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2025,
        first_registration_date: '2025-11-05',
        expected_completion_date: '2029-02-20',
        thesis_title: 'Quantum sensing in low-resource labs',
        ethics_required: 0,
        ethics_ref_number: null,
        first_registration_semester: 2,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234571',
        title: 'Ms',
        first_names: 'Carla',
        last_name: 'Williams',
        email: 'carla.williams@example.com',
        faculty: 'Natural Sciences',
        department: 'Biotechnology',
        degree_level: 'MSC',
        degree_type: 'PROJECT',
        registration_type: 'PART_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2026-01-10',
        expected_completion_date: '2028-03-10',
        thesis_title: 'Microbial resilience in estuarine systems',
        ethics_required: 1,
        ethics_ref_number: 'ETH-2026-BIO-004',
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234572',
        title: 'Mr',
        first_names: 'Noah',
        last_name: 'Jacobs',
        email: 'noah.jacobs@example.com',
        faculty: 'Natural Sciences',
        department: 'Biodiversity & Conservation Biology',
        degree_level: 'PHD',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2025-12-20',
        expected_completion_date: '2030-01-30',
        thesis_title: 'Restoration ecology in fragmented landscapes',
        ethics_required: 1,
        ethics_ref_number: 'ETH-2026-BCB-006',
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234573',
        title: 'Ms',
        first_names: 'Mila',
        last_name: 'Fortuin',
        email: 'mila.fortuin@example.com',
        faculty: 'Natural Sciences',
        department: 'Biodiversity & Conservation Biology',
        degree_level: 'MSC',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2025-11-28',
        expected_completion_date: '2028-01-15',
        thesis_title: 'Mangrove nursery dynamics under salinity shifts',
        ethics_required: 0,
        ethics_ref_number: null,
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234574',
        title: 'Mr',
        first_names: 'Ethan',
        last_name: 'Davids',
        email: 'ethan.davids@example.com',
        faculty: 'Natural Sciences',
        department: 'Mathematics',
        degree_level: 'MSC',
        degree_type: 'MINI_THESIS',
        registration_type: 'PART_TIME',
        registration_active: 0,
        first_enrolment_year: 2025,
        first_registration_date: '2025-09-01',
        expected_completion_date: '2027-05-30',
        thesis_title: 'Graph-theoretic models for invasive species spread',
        ethics_required: 0,
        ethics_ref_number: null,
        first_registration_semester: 2,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234575',
        title: 'Ms',
        first_names: 'Riya',
        last_name: 'Moodley',
        email: 'riya.moodley@example.com',
        faculty: 'Natural Sciences',
        department: 'Biodiversity & Conservation Biology',
        degree_level: 'PHD',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2026-01-12',
        expected_completion_date: '2030-04-20',
        thesis_title: 'Species occupancy modelling in fragmented fynbos',
        ethics_required: 1,
        ethics_ref_number: 'ETH-2026-BCB-009',
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
    {
        student_number: '1234576',
        title: 'Mr',
        first_names: 'Daniel',
        last_name: 'Solomons',
        email: 'daniel.solomons@example.com',
        faculty: 'Natural Sciences',
        department: 'Biodiversity & Conservation Biology',
        degree_level: 'MSC',
        degree_type: 'FULL_THESIS',
        registration_type: 'FULL_TIME',
        first_enrolment_year: 2026,
        first_registration_date: '2025-12-05',
        expected_completion_date: '2028-07-12',
        thesis_title: 'Bird diversity indices in peri-urban wetlands',
        ethics_required: 0,
        ethics_ref_number: null,
        first_registration_semester: 1,
        supervisor_name: 'AJ Smit',
        supervisor_qualifications: 'PhD',
        co_supervisor_name: 'Tommy Bornman',
        co_supervisor_qualifications: 'PhD',
        admin_supervisor_name: 'Adriaan Engelbrecht',
        admin_supervisor_qualifications: 'PhD',
    },
];
const seedStaff = [
    { staff_number: 'STAFF-001', full_name: 'AJ Smit', email: 'aj.smit@example.com', role: 'supervisor', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
    { staff_number: 'STAFF-002', full_name: 'Tommy Bornman', email: 'tommy.bornman@example.com', role: 'co_supervisor', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
    { staff_number: 'STAFF-003', full_name: 'Adriaan Engelbrecht', email: 'adriaan.engelbrecht@example.com', role: 'dept_fhd_rep', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
    { staff_number: 'STAFF-004', full_name: 'Natalie Isaacs', email: 'natalie.isaacs@example.com', role: 'faculty_fhd_rep', department: 'Faculty Office', highest_qualification: 'PhD' },
    { staff_number: 'STAFF-005', full_name: 'Anusha Rajkaran', email: 'anusha.rajkaran@example.com', role: 'hod', department: 'Biodiversity & Conservation Biology', highest_qualification: 'PhD' },
    { staff_number: 'STAFF-006', full_name: 'Jordan Petersen', email: 'jordan.petersen@example.com', role: 'dept_fhd_rep', department: 'Chemistry', highest_qualification: 'PhD' },
    { staff_number: 'STAFF-007', full_name: 'Palesa Nene', email: 'palesa.nene@example.com', role: 'dept_fhd_rep', department: 'Physics', highest_qualification: 'PhD' },
];
function parseStaffName(rawName) {
    var _a, _b;
    const trimmed = rawName.trim().replace(/\s+/g, ' ');
    const clean = trimmed.split(' - ')[0].trim();
    const parts = clean.split(' ');
    const titleCandidates = ['Professor', 'Prof', 'Prof.', 'Associate', 'Dr', 'Ms', 'Mr', 'Mrs'];
    let title = '';
    let startIndex = 0;
    if (parts.length > 0 && titleCandidates.includes(parts[0])) {
        title = parts[0];
        startIndex = 1;
        if (parts[0] === 'Associate' && ((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.startsWith('Prof'))) {
            title = 'Associate Prof.';
            startIndex = 2;
        }
    }
    const core = parts.slice(startIndex);
    const firstName = (_b = core[0]) !== null && _b !== void 0 ? _b : '';
    const lastName = core.slice(1).join(' ') || '';
    const cleanName = [firstName, lastName].filter(Boolean).join(' ').trim() || clean;
    return { title, firstName, lastName, cleanName };
}
function findHeaderIndex(header, candidates, fallback) {
    const lowered = header.map((col) => col.trim().toLowerCase());
    for (const candidate of candidates) {
        const idx = lowered.indexOf(candidate);
        if (idx !== -1) {
            return idx;
        }
    }
    return fallback;
}
function composeRawStaffName(title, name) {
    const cleanName = name.trim();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
        return cleanName;
    }
    if (new RegExp(`^${cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(cleanName)) {
        return cleanName;
    }
    if (/^(prof\.?|associate\s+prof\.?|dr|mr|ms|mrs|professor)\b/i.test(cleanName)) {
        return cleanName;
    }
    return `${cleanTitle} ${cleanName}`.replace(/\s+/g, ' ').trim();
}
function parseCsvRows(content) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < content.length; i += 1) {
        const ch = content[i];
        const next = content[i + 1];
        if (ch === '"' && inQuotes && next === '"') {
            field += '"';
            i += 1;
            continue;
        }
        if (ch === '"') {
            inQuotes = !inQuotes;
            continue;
        }
        if (ch === ',' && !inQuotes) {
            row.push(field.trim());
            field = '';
            continue;
        }
        if ((ch === '\n' || ch === '\r') && !inQuotes) {
            if (ch === '\r' && next === '\n') {
                i += 1;
            }
            row.push(field.trim());
            field = '';
            if (row.some((col) => col.length > 0)) {
                rows.push(row);
            }
            row = [];
            continue;
        }
        field += ch;
    }
    if (field.length > 0 || row.length > 0) {
        row.push(field.trim());
        if (row.some((col) => col.length > 0)) {
            rows.push(row);
        }
    }
    return rows;
}
function resolveRepoRootForCsv() {
    const candidates = [
        path_1.default.resolve(process.cwd()),
        path_1.default.resolve(process.cwd(), '..'),
        path_1.default.resolve(__dirname, '../../..'),
    ];
    for (const candidate of candidates) {
        if ((0, fs_1.existsSync)(path_1.default.join(candidate, 'uwc_natural_sciences_departments.csv'))) {
            return candidate;
        }
    }
    return path_1.default.resolve(process.cwd());
}
function ensureColumn(tableName, columnName, add) {
    return __awaiter(this, void 0, void 0, function* () {
        const has = yield knex_1.default.schema.hasColumn(tableName, columnName);
        if (!has) {
            yield knex_1.default.schema.alterTable(tableName, (table) => add(table));
        }
    });
}
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const enableDemoData = ((_a = process.env.ENABLE_DEMO_DATA) !== null && _a !== void 0 ? _a : (process.env.NODE_ENV === 'production' ? 'false' : 'true')).trim().toLowerCase() === 'true';
        if (!(yield knex_1.default.schema.hasTable('users'))) {
            yield knex_1.default.schema.createTable('users', (table) => {
                table.increments('id').primary();
                table.string('sasi_id').unique();
                table.string('first_name').notNullable();
                table.string('last_name').notNullable();
                table.string('email').notNullable().unique();
                table.enum('role', ['student', 'supervisor', 'admin']).notNullable();
                table.timestamps(true, true);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('title_registrations'))) {
            yield knex_1.default.schema.createTable('title_registrations', (table) => {
                table.increments('id').primary();
                table.integer('student_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
                table.integer('supervisor_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
                table.string('proposed_title').notNullable();
                table.text('abstract');
                table.enum('status', ['pending_approval', 'approved', 'rejected']).notNullable().defaultTo('pending_approval');
                table.timestamp('submission_date').defaultTo(knex_1.default.fn.now());
                table.timestamp('approval_date');
                table.timestamps(true, true);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('sasi_students'))) {
            yield knex_1.default.schema.createTable('sasi_students', (table) => {
                table.increments('id').primary();
                table.string('student_number').notNullable().unique();
                table.string('title');
                table.string('first_names').notNullable();
                table.string('last_name').notNullable();
                table.string('email');
                table.string('faculty').notNullable();
                table.string('department').notNullable();
                table.enum('degree_level', ['MSC', 'PHD']).notNullable();
                table.enum('degree_type', ['FULL_THESIS', 'MINI_THESIS', 'PROJECT']).notNullable();
                table.enum('registration_type', ['FULL_TIME', 'PART_TIME']).notNullable();
                table.boolean('registration_active').notNullable().defaultTo(true);
                table.integer('first_enrolment_year').notNullable();
                table.date('first_registration_date');
                table.integer('first_registration_semester');
                table.date('expected_completion_date');
                table.string('thesis_title');
                table.boolean('ethics_required').notNullable().defaultTo(false);
                table.string('ethics_ref_number');
                table.string('supervisor_name');
                table.string('supervisor_qualifications');
                table.string('co_supervisor_name');
                table.string('co_supervisor_qualifications');
                table.string('admin_supervisor_name');
                table.string('admin_supervisor_qualifications');
                table.timestamps(true, true);
            });
        }
        yield ensureColumn('sasi_students', 'first_registration_date', (table) => table.date('first_registration_date'));
        yield ensureColumn('sasi_students', 'first_registration_semester', (table) => table.integer('first_registration_semester'));
        yield ensureColumn('sasi_students', 'registration_active', (table) => table.boolean('registration_active').notNullable().defaultTo(true));
        yield ensureColumn('sasi_students', 'supervisor_name', (table) => table.string('supervisor_name'));
        yield ensureColumn('sasi_students', 'supervisor_qualifications', (table) => table.string('supervisor_qualifications'));
        yield ensureColumn('sasi_students', 'co_supervisor_name', (table) => table.string('co_supervisor_name'));
        yield ensureColumn('sasi_students', 'co_supervisor_qualifications', (table) => table.string('co_supervisor_qualifications'));
        yield ensureColumn('sasi_students', 'admin_supervisor_name', (table) => table.string('admin_supervisor_name'));
        yield ensureColumn('sasi_students', 'admin_supervisor_qualifications', (table) => table.string('admin_supervisor_qualifications'));
        if (!(yield knex_1.default.schema.hasTable('sasi_staff'))) {
            yield knex_1.default.schema.createTable('sasi_staff', (table) => {
                table.increments('id').primary();
                table.string('staff_number').notNullable().unique();
                table.string('full_name').notNullable();
                table.string('email').notNullable().unique();
                table.string('role').notNullable();
                table.string('department').notNullable();
                table.string('highest_qualification');
                table.timestamps(true, true);
            });
        }
        yield ensureColumn('sasi_staff', 'highest_qualification', (table) => table.string('highest_qualification'));
        if (!(yield knex_1.default.schema.hasTable('phase1_workflows'))) {
            yield knex_1.default.schema.createTable('phase1_workflows', (table) => {
                table.increments('id').primary();
                table.integer('sasi_student_id').unsigned().notNullable().references('id').inTable('sasi_students').onDelete('CASCADE');
                table.enum('mou_status', ['pending', 'completed']).notNullable().defaultTo('pending');
                table.enum('title_registration_status', ['pending', 'completed']).notNullable().defaultTo('pending');
                table.enum('supervisor_profile_status', ['pending', 'completed']).notNullable().defaultTo('pending');
                table.enum('examiners_status', ['pending', 'completed']).notNullable().defaultTo('pending');
                table.string('last_blocker');
                table.timestamps(true, true);
                table.unique(['sasi_student_id']);
            });
        }
        if (yield knex_1.default.schema.hasColumn('phase1_workflows', 'intention_to_submit_status')) {
            yield knex_1.default.schema.alterTable('phase1_workflows', (table) => {
                table.dropColumn('intention_to_submit_status');
            });
        }
        if (!(yield knex_1.default.schema.hasTable('generated_documents'))) {
            yield knex_1.default.schema.createTable('generated_documents', (table) => {
                table.increments('id').primary();
                table.integer('workflow_id').unsigned().notNullable().references('id').inTable('phase1_workflows').onDelete('CASCADE');
                table.string('step_key').notNullable();
                table.string('source_docx').notNullable();
                table.string('output_pdf').notNullable();
                table.timestamp('generated_at').notNullable().defaultTo(knex_1.default.fn.now());
            });
        }
        if (!(yield knex_1.default.schema.hasTable('title_registration_cases'))) {
            yield knex_1.default.schema.createTable('title_registration_cases', (table) => {
                table.increments('id').primary();
                table.integer('sasi_student_id').unsigned().notNullable().references('id').inTable('sasi_students').onDelete('CASCADE');
                table.string('case_status').notNullable().defaultTo('awaiting_student_vetting');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('pdf_path');
                table.timestamp('student_vetted_at');
                table.timestamp('supervisor_reviewed_at');
                table.timestamp('dept_reviewed_at');
                table.timestamp('faculty_reviewed_at');
                table.timestamp('sent_to_faculty_at');
                table.timestamp('last_reminder_at');
                table.text('last_comments');
                table.timestamps(true, true);
                table.unique(['sasi_student_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('notification_queue'))) {
            yield knex_1.default.schema.createTable('notification_queue', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.string('email_to').notNullable();
                table.string('subject').notNullable();
                table.text('body').notNullable();
                table.string('status').notNullable().defaultTo('queued');
                table.timestamp('created_at').notNullable().defaultTo(knex_1.default.fn.now());
            });
        }
        if (!(yield knex_1.default.schema.hasTable('module_entries'))) {
            yield knex_1.default.schema.createTable('module_entries', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.string('module_name').notNullable();
                table.string('status').notNullable().defaultTo('pending');
                table.text('summary').notNullable().defaultTo('');
                table.timestamp('updated_at').notNullable().defaultTo(knex_1.default.fn.now());
                table.unique(['case_id', 'module_name']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('mou_forms'))) {
            yield knex_1.default.schema.createTable('mou_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('status').notNullable().defaultTo('draft');
                table.string('pdf_path');
                table.timestamp('submitted_at');
                table.timestamps(true, true);
                table.unique(['case_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('intention_to_submit_forms'))) {
            yield knex_1.default.schema.createTable('intention_to_submit_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('status').notNullable().defaultTo('draft');
                table.timestamp('submitted_at');
                table.timestamps(true, true);
                table.unique(['case_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('appoint_examiners_forms'))) {
            yield knex_1.default.schema.createTable('appoint_examiners_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('status').notNullable().defaultTo('draft');
                table.timestamp('submitted_at');
                table.timestamps(true, true);
                table.unique(['case_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('change_examiners_forms'))) {
            yield knex_1.default.schema.createTable('change_examiners_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('status').notNullable().defaultTo('draft');
                table.timestamp('submitted_at');
                table.timestamps(true, true);
                table.unique(['case_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('examiner_summary_cv_forms'))) {
            yield knex_1.default.schema.createTable('examiner_summary_cv_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('status').notNullable().defaultTo('draft');
                table.timestamp('submitted_at');
                table.timestamps(true, true);
                table.unique(['case_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('appoint_arbiter_forms'))) {
            yield knex_1.default.schema.createTable('appoint_arbiter_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.text('form_data_json').notNullable();
                table.float('completion_percent').notNullable().defaultTo(0);
                table.string('status').notNullable().defaultTo('draft');
                table.timestamp('submitted_at');
                table.timestamps(true, true);
                table.unique(['case_id']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('supervisor_profile_forms'))) {
            yield knex_1.default.schema.createTable('supervisor_profile_forms', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().notNullable().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.string('role').notNullable();
                table.string('person_name').notNullable();
                table.string('person_title').notNullable().defaultTo('');
                table.string('qualifications').notNullable().defaultTo('');
                table.string('is_internal').notNullable().defaultTo('Yes');
                table.string('external_address').notNullable().defaultTo('');
                table.string('contact_email').notNullable().defaultTo('');
                table.integer('publication_count');
                table.text('recent_publications_json').notNullable().defaultTo('[]');
                table.text('contribution_motivation').notNullable().defaultTo('');
                table.string('new_to_department').notNullable().defaultTo('No');
                table.string('cv_attached').notNullable().defaultTo('No');
                table.string('cv_file_path').notNullable().defaultTo('');
                table.string('status').notNullable().defaultTo('draft');
                table.timestamp('requested_at');
                table.timestamp('submitted_at');
                table.timestamp('last_reminder_at');
                table.timestamps(true, true);
                table.unique(['case_id', 'role', 'person_name']);
            });
        }
        yield ensureColumn('supervisor_profile_forms', 'cv_file_path', (table) => table.string('cv_file_path').notNullable().defaultTo(''));
        if (!(yield knex_1.default.schema.hasTable('uwc_departments'))) {
            yield knex_1.default.schema.createTable('uwc_departments', (table) => {
                table.increments('id').primary();
                table.string('faculty_name').notNullable();
                table.string('department_name').notNullable();
                table.timestamps(true, true);
                table.unique(['faculty_name', 'department_name']);
            });
        }
        if (!(yield knex_1.default.schema.hasTable('uwc_staff_directory'))) {
            yield knex_1.default.schema.createTable('uwc_staff_directory', (table) => {
                table.increments('id').primary();
                table.string('staff_number');
                table.string('staff_name').notNullable().unique();
                table.string('staff_title');
                table.string('first_name');
                table.string('last_name');
                table.string('email');
                table.string('phone');
                table.string('position_title');
                table.string('highest_qualification');
                table.string('employee_type');
                table.string('faculty_role');
                table.string('office_location');
                table.string('campus');
                table.string('orcid');
                table.string('google_scholar_url');
                table.string('scopus_id');
                table.string('research_specialisations');
                table.boolean('is_nrf_rated').notNullable().defaultTo(false);
                table.string('nrf_rating');
                table.boolean('available_as_supervisor').notNullable().defaultTo(true);
                table.boolean('available_as_co_supervisor').notNullable().defaultTo(true);
                table.boolean('available_as_examiner').notNullable().defaultTo(true);
                table.boolean('available_as_arbiter').notNullable().defaultTo(true);
                table.boolean('can_serve_as_chair').notNullable().defaultTo(false);
                table.boolean('can_sign_hod_delegate').notNullable().defaultTo(false);
                table.integer('max_supervision_load').notNullable().defaultTo(0);
                table.integer('current_supervision_load').notNullable().defaultTo(0);
                table.integer('max_examiner_load').notNullable().defaultTo(0);
                table.integer('current_examiner_load').notNullable().defaultTo(0);
                table.text('availability_notes').notNullable().defaultTo('');
                table.boolean('active_status').notNullable().defaultTo(true);
                table.string('faculty_name').notNullable();
                table.string('department_name').notNullable();
                table.boolean('is_internal').notNullable().defaultTo(true);
                table.timestamps(true, true);
            });
        }
        yield ensureColumn('uwc_staff_directory', 'staff_number', (table) => table.string('staff_number'));
        yield ensureColumn('uwc_staff_directory', 'staff_title', (table) => table.string('staff_title'));
        yield ensureColumn('uwc_staff_directory', 'first_name', (table) => table.string('first_name'));
        yield ensureColumn('uwc_staff_directory', 'last_name', (table) => table.string('last_name'));
        yield ensureColumn('uwc_staff_directory', 'email', (table) => table.string('email'));
        yield ensureColumn('uwc_staff_directory', 'phone', (table) => table.string('phone'));
        yield ensureColumn('uwc_staff_directory', 'employee_type', (table) => table.string('employee_type'));
        yield ensureColumn('uwc_staff_directory', 'faculty_role', (table) => table.string('faculty_role'));
        yield ensureColumn('uwc_staff_directory', 'office_location', (table) => table.string('office_location'));
        yield ensureColumn('uwc_staff_directory', 'campus', (table) => table.string('campus'));
        yield ensureColumn('uwc_staff_directory', 'orcid', (table) => table.string('orcid'));
        yield ensureColumn('uwc_staff_directory', 'google_scholar_url', (table) => table.string('google_scholar_url'));
        yield ensureColumn('uwc_staff_directory', 'scopus_id', (table) => table.string('scopus_id'));
        yield ensureColumn('uwc_staff_directory', 'research_specialisations', (table) => table.string('research_specialisations'));
        yield ensureColumn('uwc_staff_directory', 'is_nrf_rated', (table) => table.boolean('is_nrf_rated').notNullable().defaultTo(false));
        yield ensureColumn('uwc_staff_directory', 'nrf_rating', (table) => table.string('nrf_rating'));
        yield ensureColumn('uwc_staff_directory', 'available_as_supervisor', (table) => table.boolean('available_as_supervisor').notNullable().defaultTo(true));
        yield ensureColumn('uwc_staff_directory', 'available_as_co_supervisor', (table) => table.boolean('available_as_co_supervisor').notNullable().defaultTo(true));
        yield ensureColumn('uwc_staff_directory', 'available_as_examiner', (table) => table.boolean('available_as_examiner').notNullable().defaultTo(true));
        yield ensureColumn('uwc_staff_directory', 'available_as_arbiter', (table) => table.boolean('available_as_arbiter').notNullable().defaultTo(true));
        yield ensureColumn('uwc_staff_directory', 'can_serve_as_chair', (table) => table.boolean('can_serve_as_chair').notNullable().defaultTo(false));
        yield ensureColumn('uwc_staff_directory', 'can_sign_hod_delegate', (table) => table.boolean('can_sign_hod_delegate').notNullable().defaultTo(false));
        yield ensureColumn('uwc_staff_directory', 'max_supervision_load', (table) => table.integer('max_supervision_load').notNullable().defaultTo(0));
        yield ensureColumn('uwc_staff_directory', 'current_supervision_load', (table) => table.integer('current_supervision_load').notNullable().defaultTo(0));
        yield ensureColumn('uwc_staff_directory', 'max_examiner_load', (table) => table.integer('max_examiner_load').notNullable().defaultTo(0));
        yield ensureColumn('uwc_staff_directory', 'current_examiner_load', (table) => table.integer('current_examiner_load').notNullable().defaultTo(0));
        yield ensureColumn('uwc_staff_directory', 'availability_notes', (table) => table.text('availability_notes').notNullable().defaultTo(''));
        yield ensureColumn('uwc_staff_directory', 'active_status', (table) => table.boolean('active_status').notNullable().defaultTo(true));
        if (!(yield knex_1.default.schema.hasTable('external_academic_registry'))) {
            yield knex_1.default.schema.createTable('external_academic_registry', (table) => {
                table.increments('id').primary();
                table.string('title').notNullable().defaultTo('');
                table.string('first_name').notNullable();
                table.string('middle_names').notNullable().defaultTo('');
                table.string('preferred_name').notNullable().defaultTo('');
                table.string('last_name').notNullable();
                table.string('full_name').notNullable();
                table.string('normalized_full_name').notNullable().unique();
                table.string('unique_identifier_type').notNullable().defaultTo('');
                table.string('unique_identifier_value').notNullable().defaultTo('');
                table.string('normalized_unique_identifier').unique();
                table.string('highest_qualification').notNullable().defaultTo('');
                table.string('email').notNullable().defaultTo('');
                table.string('alternate_email').notNullable().defaultTo('');
                table.string('preferred_contact_method').notNullable().defaultTo('');
                table.string('address').notNullable().defaultTo('');
                table.string('city').notNullable().defaultTo('');
                table.string('province_state').notNullable().defaultTo('');
                table.string('postal_code').notNullable().defaultTo('');
                table.string('affiliation_institution').notNullable().defaultTo('');
                table.string('affiliation_department').notNullable().defaultTo('');
                table.string('affiliation_position_title').notNullable().defaultTo('');
                table.string('country').notNullable().defaultTo('');
                table.string('phone').notNullable().defaultTo('');
                table.string('orcid').notNullable().defaultTo('');
                table.string('website_url').notNullable().defaultTo('');
                table.string('google_scholar_url').notNullable().defaultTo('');
                table.string('scopus_id').notNullable().defaultTo('');
                table.string('expertise_keywords').notNullable().defaultTo('');
                table.boolean('eligible_as_supervisor').notNullable().defaultTo(true);
                table.boolean('eligible_as_examiner').notNullable().defaultTo(true);
                table.boolean('eligible_as_arbiter').notNullable().defaultTo(true);
                table.boolean('eligible_for_masters').notNullable().defaultTo(true);
                table.boolean('eligible_for_phd').notNullable().defaultTo(true);
                table.boolean('is_international').notNullable().defaultTo(false);
                table.boolean('is_former_uwc_staff').notNullable().defaultTo(false);
                table.boolean('is_former_uwc_student').notNullable().defaultTo(false);
                table.date('cv_last_received_on');
                table.string('cv_file_path').notNullable().defaultTo('');
                table.date('last_appointed_supervisor_on');
                table.date('last_appointed_examiner_on');
                table.date('last_appointed_arbiter_on');
                table.integer('max_active_assignments').notNullable().defaultTo(0);
                table.integer('current_active_assignments').notNullable().defaultTo(0);
                table.text('conflict_of_interest_notes').notNullable().defaultTo('');
                table.boolean('active_status').notNullable().defaultTo(true);
                table.text('notes').notNullable().defaultTo('');
                table.timestamps(true, true);
            });
        }
        yield ensureColumn('external_academic_registry', 'title', (table) => table.string('title').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'first_name', (table) => table.string('first_name').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'middle_names', (table) => table.string('middle_names').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'preferred_name', (table) => table.string('preferred_name').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'last_name', (table) => table.string('last_name').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'full_name', (table) => table.string('full_name').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'normalized_full_name', (table) => table.string('normalized_full_name').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'unique_identifier_type', (table) => table.string('unique_identifier_type').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'unique_identifier_value', (table) => table.string('unique_identifier_value').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'normalized_unique_identifier', (table) => table.string('normalized_unique_identifier'));
        try {
            yield knex_1.default.raw('CREATE UNIQUE INDEX IF NOT EXISTS idx_external_academic_registry_normalized_unique_identifier ON external_academic_registry(normalized_unique_identifier)');
        }
        catch (_c) {
            // Best-effort index creation for existing databases.
        }
        yield ensureColumn('external_academic_registry', 'highest_qualification', (table) => table.string('highest_qualification').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'email', (table) => table.string('email').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'alternate_email', (table) => table.string('alternate_email').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'preferred_contact_method', (table) => table.string('preferred_contact_method').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'address', (table) => table.string('address').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'city', (table) => table.string('city').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'province_state', (table) => table.string('province_state').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'postal_code', (table) => table.string('postal_code').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'affiliation_institution', (table) => table.string('affiliation_institution').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'affiliation_department', (table) => table.string('affiliation_department').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'affiliation_position_title', (table) => table.string('affiliation_position_title').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'country', (table) => table.string('country').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'phone', (table) => table.string('phone').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'orcid', (table) => table.string('orcid').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'website_url', (table) => table.string('website_url').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'google_scholar_url', (table) => table.string('google_scholar_url').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'scopus_id', (table) => table.string('scopus_id').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'expertise_keywords', (table) => table.string('expertise_keywords').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'eligible_as_supervisor', (table) => table.boolean('eligible_as_supervisor').notNullable().defaultTo(true));
        yield ensureColumn('external_academic_registry', 'eligible_as_examiner', (table) => table.boolean('eligible_as_examiner').notNullable().defaultTo(true));
        yield ensureColumn('external_academic_registry', 'eligible_as_arbiter', (table) => table.boolean('eligible_as_arbiter').notNullable().defaultTo(true));
        yield ensureColumn('external_academic_registry', 'eligible_for_masters', (table) => table.boolean('eligible_for_masters').notNullable().defaultTo(true));
        yield ensureColumn('external_academic_registry', 'eligible_for_phd', (table) => table.boolean('eligible_for_phd').notNullable().defaultTo(true));
        yield ensureColumn('external_academic_registry', 'is_international', (table) => table.boolean('is_international').notNullable().defaultTo(false));
        yield ensureColumn('external_academic_registry', 'is_former_uwc_staff', (table) => table.boolean('is_former_uwc_staff').notNullable().defaultTo(false));
        yield ensureColumn('external_academic_registry', 'is_former_uwc_student', (table) => table.boolean('is_former_uwc_student').notNullable().defaultTo(false));
        yield ensureColumn('external_academic_registry', 'cv_last_received_on', (table) => table.date('cv_last_received_on'));
        yield ensureColumn('external_academic_registry', 'cv_file_path', (table) => table.string('cv_file_path').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'last_appointed_supervisor_on', (table) => table.date('last_appointed_supervisor_on'));
        yield ensureColumn('external_academic_registry', 'last_appointed_examiner_on', (table) => table.date('last_appointed_examiner_on'));
        yield ensureColumn('external_academic_registry', 'last_appointed_arbiter_on', (table) => table.date('last_appointed_arbiter_on'));
        yield ensureColumn('external_academic_registry', 'max_active_assignments', (table) => table.integer('max_active_assignments').notNullable().defaultTo(0));
        yield ensureColumn('external_academic_registry', 'current_active_assignments', (table) => table.integer('current_active_assignments').notNullable().defaultTo(0));
        yield ensureColumn('external_academic_registry', 'conflict_of_interest_notes', (table) => table.text('conflict_of_interest_notes').notNullable().defaultTo(''));
        yield ensureColumn('external_academic_registry', 'active_status', (table) => table.boolean('active_status').notNullable().defaultTo(true));
        yield ensureColumn('external_academic_registry', 'notes', (table) => table.text('notes').notNullable().defaultTo(''));
        if (yield knex_1.default.schema.hasTable('external_supervisors')) {
            const legacyRows = yield (0, knex_1.default)('external_supervisors').select('*');
            if (legacyRows.length > 0) {
                yield (0, knex_1.default)('external_academic_registry')
                    .insert(legacyRows.map((row) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h;
                    return ({
                        title: String((_a = row.title) !== null && _a !== void 0 ? _a : ''),
                        first_name: String((_b = row.first_name) !== null && _b !== void 0 ? _b : ''),
                        last_name: String((_c = row.last_name) !== null && _c !== void 0 ? _c : ''),
                        full_name: String((_d = row.full_name) !== null && _d !== void 0 ? _d : ''),
                        normalized_full_name: String((_e = row.normalized_full_name) !== null && _e !== void 0 ? _e : ''),
                        unique_identifier_type: '',
                        unique_identifier_value: '',
                        normalized_unique_identifier: null,
                        highest_qualification: String((_f = row.highest_qualification) !== null && _f !== void 0 ? _f : ''),
                        email: String((_g = row.email) !== null && _g !== void 0 ? _g : ''),
                        address: String((_h = row.address) !== null && _h !== void 0 ? _h : ''),
                    });
                }))
                    .onConflict('normalized_full_name')
                    .merge({ updated_at: knex_1.default.fn.now() });
            }
        }
        if (enableDemoData) {
            const seedExternalAcademics = [
                {
                    title: 'Prof',
                    first_name: 'Bunny',
                    last_name: 'Boo',
                    full_name: 'Prof Bunny Boo',
                    normalized_full_name: 'bunny boo',
                    unique_identifier_type: 'SA_ID',
                    unique_identifier_value: '7801015009087',
                    normalized_unique_identifier: 'SA_ID:7801015009087',
                    highest_qualification: 'PhD/Doctorate',
                    email: 'bunny.boo@gmail.com',
                    address: '94 Bay View Lodge, 94 Main Rd, Muizenberg',
                    affiliation_institution: 'University of Cape Town',
                    affiliation_department: 'Biological Sciences',
                    country: 'South Africa',
                    phone: '',
                    orcid: '',
                    expertise_keywords: 'Biodiversity, Marine Ecology, Conservation',
                    eligible_as_supervisor: true,
                    eligible_as_examiner: true,
                    eligible_as_arbiter: true,
                    is_international: false,
                    is_former_uwc_staff: false,
                    is_former_uwc_student: false,
                    cv_last_received_on: null,
                    cv_file_path: '',
                    notes: '',
                },
                {
                    title: 'Dr',
                    first_name: 'Amelia',
                    last_name: 'Grant',
                    full_name: 'Dr Amelia Grant',
                    normalized_full_name: 'amelia grant',
                    unique_identifier_type: 'PASSPORT',
                    unique_identifier_value: 'UK-55682911',
                    normalized_unique_identifier: 'PASSPORT:UK55682911',
                    highest_qualification: 'PhD',
                    email: 'amelia.grant@example.org',
                    address: 'School of Earth Sciences, University of Oxford',
                    affiliation_institution: 'University of Oxford',
                    affiliation_department: 'Earth Sciences',
                    country: 'United Kingdom',
                    phone: '',
                    orcid: '',
                    expertise_keywords: 'Climate, Hydrology, Environmental Modelling',
                    eligible_as_supervisor: true,
                    eligible_as_examiner: true,
                    eligible_as_arbiter: true,
                    is_international: true,
                    is_former_uwc_staff: false,
                    is_former_uwc_student: false,
                    cv_last_received_on: null,
                    cv_file_path: '',
                    notes: '',
                },
            ];
            yield (0, knex_1.default)('external_academic_registry').insert(seedExternalAcademics).onConflict('normalized_full_name').merge();
        }
        if (!(yield knex_1.default.schema.hasTable('external_academic_profile_invites'))) {
            yield knex_1.default.schema.createTable('external_academic_profile_invites', (table) => {
                table.increments('id').primary();
                table.integer('case_id').unsigned().references('id').inTable('title_registration_cases').onDelete('CASCADE');
                table.string('role').notNullable();
                table.string('email').notNullable();
                table.string('token').notNullable().unique();
                table.string('status').notNullable().defaultTo('pending');
                table.timestamp('expires_at');
                table.timestamp('completed_at');
                table.integer('external_academic_id').unsigned().references('id').inTable('external_academic_registry').onDelete('SET NULL');
                table.timestamps(true, true);
            });
        }
        if (enableDemoData) {
            const demoUsers = [
                { sasi_id: '1234567', first_name: 'Jesse', last_name: 'Smith', email: 'jesse.smith@example.com', role: 'student' },
                { sasi_id: 'STAFF-001', first_name: 'AJ', last_name: 'Smit', email: 'aj.smit@example.com', role: 'supervisor' },
                { sasi_id: 'STAFF-003', first_name: 'Adriaan', last_name: 'Engelbrecht', email: 'adriaan.engelbrecht@example.com', role: 'admin' },
                { sasi_id: 'STAFF-004', first_name: 'Natalie', last_name: 'Isaacs', email: 'natalie.isaacs@example.com', role: 'admin' },
                { sasi_id: 'STAFF-005', first_name: 'Anusha', last_name: 'Rajkaran', email: 'anusha.rajkaran@example.com', role: 'admin' },
            ];
            for (const user of demoUsers) {
                const existing = yield (0, knex_1.default)('users')
                    .where({ sasi_id: user.sasi_id })
                    .orWhere({ email: user.email })
                    .first();
                if (existing === null || existing === void 0 ? void 0 : existing.id) {
                    yield (0, knex_1.default)('users')
                        .where({ id: existing.id })
                        .update({
                        sasi_id: user.sasi_id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role,
                        updated_at: knex_1.default.fn.now(),
                    });
                }
                else {
                    yield (0, knex_1.default)('users').insert(user);
                }
            }
            yield (0, knex_1.default)('sasi_staff').insert(seedStaff).onConflict('staff_number').merge();
            const normalizedSeedStudents = seedSasiStudents.map((row) => {
                var _a;
                return (Object.assign(Object.assign({}, row), { registration_active: (_a = row.registration_active) !== null && _a !== void 0 ? _a : 1 }));
            });
            yield (0, knex_1.default)('sasi_students').insert(normalizedSeedStudents).onConflict('student_number').merge();
            const repoRoot = resolveRepoRootForCsv();
            const departmentsCsvPath = path_1.default.join(repoRoot, 'uwc_natural_sciences_departments.csv');
            const staffCsvPath = path_1.default.join(repoRoot, 'uwc_bcb_academic_staff_highest_qualification.csv');
            if ((0, fs_1.existsSync)(departmentsCsvPath)) {
                const raw = yield promises_1.default.readFile(departmentsCsvPath, 'utf-8');
                const rows = parseCsvRows(raw);
                const dataRows = rows.slice(1).filter((r) => r.length >= 2);
                if (dataRows.length > 0) {
                    yield (0, knex_1.default)('uwc_departments')
                        .insert(dataRows.map((r) => ({
                        faculty_name: r[0],
                        department_name: r[1],
                    })))
                        .onConflict(['faculty_name', 'department_name'])
                        .ignore();
                }
            }
            if ((0, fs_1.existsSync)(staffCsvPath)) {
                const raw = yield promises_1.default.readFile(staffCsvPath, 'utf-8');
                const rows = parseCsvRows(raw);
                const header = (_b = rows[0]) !== null && _b !== void 0 ? _b : [];
                const dataRows = rows.slice(1).filter((r) => r.some((value) => value.trim().length > 0));
                if (dataRows.length > 0) {
                    const titleIndex = findHeaderIndex(header, ['title'], 0);
                    const nameIndex = findHeaderIndex(header, ['staff name', 'name'], 0);
                    const positionIndex = findHeaderIndex(header, ['position', 'position title'], 1);
                    const qualificationIndex = findHeaderIndex(header, ['highest qualification', 'qualification'], 2);
                    const normalizedRows = dataRows
                        .map((row) => {
                        var _a, _b, _c, _d;
                        const rawName = composeRawStaffName((_a = row[titleIndex]) !== null && _a !== void 0 ? _a : '', (_b = row[nameIndex]) !== null && _b !== void 0 ? _b : '');
                        const parsed = parseStaffName(rawName);
                        return {
                            staff_name: parsed.cleanName,
                            staff_title: parsed.title,
                            first_name: parsed.firstName,
                            last_name: parsed.lastName,
                            position_title: (_c = row[positionIndex]) !== null && _c !== void 0 ? _c : '',
                            highest_qualification: (_d = row[qualificationIndex]) !== null && _d !== void 0 ? _d : '',
                            faculty_name: 'Faculty of Natural Sciences',
                            department_name: 'Department of Biodiversity and Conservation Biology',
                            is_internal: 1,
                        };
                    })
                        .filter((row) => row.staff_name.trim().length > 0);
                    yield (0, knex_1.default)('uwc_staff_directory')
                        .where({
                        faculty_name: 'Faculty of Natural Sciences',
                        department_name: 'Department of Biodiversity and Conservation Biology',
                        is_internal: 1,
                    })
                        .del();
                    yield (0, knex_1.default)('uwc_staff_directory')
                        .insert(normalizedRows)
                        .onConflict('staff_name')
                        .merge();
                }
            }
        }
    });
}

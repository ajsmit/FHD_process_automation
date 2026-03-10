"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const node_test_1 = __importStar(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const knex_1 = __importDefault(require("knex"));
const titleRegistrationTransitions_1 = require("./titleRegistrationTransitions");
let db;
let queuedMails;
let syncedModules;
(0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    db = (0, knex_1.default)({
        client: 'sqlite3',
        connection: { filename: ':memory:' },
        useNullAsDefault: true,
    });
    yield db.schema.createTable('sasi_students', (table) => {
        table.increments('id').primary();
        table.string('email');
    });
    yield db.schema.createTable('title_registration_cases', (table) => {
        table.increments('id').primary();
        table.integer('sasi_student_id').notNullable();
        table.string('case_status').notNullable();
        table.string('form_data_json').notNullable().defaultTo('{}');
        table.float('completion_percent').notNullable().defaultTo(0);
        table.string('pdf_path');
        table.timestamp('student_vetted_at');
        table.timestamp('supervisor_reviewed_at');
        table.timestamp('dept_reviewed_at');
        table.timestamp('faculty_reviewed_at');
        table.timestamp('sent_to_faculty_at');
        table.timestamp('last_reminder_at');
        table.text('last_comments');
        table.timestamp('created_at').defaultTo(db.fn.now());
        table.timestamp('updated_at').defaultTo(db.fn.now());
    });
    yield db.schema.createTable('supervisor_profile_forms', (table) => {
        table.increments('id').primary();
        table.integer('case_id').notNullable();
        table.string('status').notNullable();
    });
    yield db('sasi_students').insert({ id: 1, email: 'student@example.com' });
    queuedMails = [];
    syncedModules = [];
}));
(0, node_test_1.afterEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.destroy();
}));
function makeDeps() {
    return {
        db,
        getStaffEmail: (role) => __awaiter(this, void 0, void 0, function* () { return [`${role}@example.com`]; }),
        queueEmail: (caseId, recipients, subject, body) => __awaiter(this, void 0, void 0, function* () {
            queuedMails.push({ caseId, recipients, subject, body });
        }),
        syncModuleEntries: (caseId, status, summary) => __awaiter(this, void 0, void 0, function* () {
            syncedModules.push({ caseId, status, summary });
        }),
    };
}
(0, node_test_1.default)('runSupervisorReviewTransition returns case to student on insufficient review', () => __awaiter(void 0, void 0, void 0, function* () {
    yield db('title_registration_cases').insert({
        id: 100,
        sasi_student_id: 1,
        case_status: 'awaiting_supervisor_review',
    });
    const updated = yield (0, titleRegistrationTransitions_1.runSupervisorReviewTransition)(100, 'insufficient', 'Need revisions', makeDeps());
    strict_1.default.equal(updated.case_status, 'returned_by_supervisor');
    strict_1.default.equal(updated.last_comments, 'Need revisions');
    strict_1.default.equal(queuedMails.length, 1);
    strict_1.default.deepEqual(queuedMails[0].recipients, ['student@example.com']);
    strict_1.default.equal(syncedModules.length, 1);
    strict_1.default.equal(syncedModules[0].status, 'returned_by_supervisor');
}));
(0, node_test_1.default)('runDeptSendToFacultyTransition enforces completed supervisor profiles', () => __awaiter(void 0, void 0, void 0, function* () {
    yield db('title_registration_cases').insert({
        id: 200,
        sasi_student_id: 1,
        case_status: 'awaiting_dept_fhd_send_to_faculty',
    });
    yield db('supervisor_profile_forms').insert([
        { case_id: 200, status: 'completed' },
        { case_id: 200, status: 'requested' },
    ]);
    yield strict_1.default.rejects(() => (0, titleRegistrationTransitions_1.runDeptSendToFacultyTransition)(200, makeDeps()), /Supervisor profile forms are incomplete/);
}));
(0, node_test_1.default)('runDeptSendToFacultyTransition advances case when profiles are complete', () => __awaiter(void 0, void 0, void 0, function* () {
    yield db('title_registration_cases').insert({
        id: 201,
        sasi_student_id: 1,
        case_status: 'awaiting_dept_fhd_send_to_faculty',
    });
    yield db('supervisor_profile_forms').insert([
        { case_id: 201, status: 'completed' },
        { case_id: 201, status: 'completed' },
    ]);
    const updated = yield (0, titleRegistrationTransitions_1.runDeptSendToFacultyTransition)(201, makeDeps());
    strict_1.default.equal(updated.case_status, 'sent_to_faculty_fhd');
    strict_1.default.equal(queuedMails.length, 2);
    strict_1.default.equal(syncedModules.length, 1);
    strict_1.default.equal(syncedModules[0].status, 'sent_to_faculty_fhd');
}));
(0, node_test_1.default)('runFacultyReminderTransition sends reminder only after 3 working days', () => __awaiter(void 0, void 0, void 0, function* () {
    const oldDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
    yield db('title_registration_cases').insert({
        id: 300,
        sasi_student_id: 1,
        case_status: 'sent_to_faculty_fhd',
        sent_to_faculty_at: oldDate,
    });
    const result = yield (0, titleRegistrationTransitions_1.runFacultyReminderTransition)(300, {
        db,
        getStaffEmail: (role) => __awaiter(void 0, void 0, void 0, function* () { return [`${role}@example.com`]; }),
        queueEmail: (caseId, recipients, subject, body) => __awaiter(void 0, void 0, void 0, function* () {
            queuedMails.push({ caseId, recipients, subject, body });
        }),
    });
    strict_1.default.equal(result.sent, true);
    strict_1.default.equal(queuedMails.length, 1);
}));

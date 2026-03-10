import test, { afterEach, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import knex, { type Knex } from 'knex';
import {
  runDeptSendToFacultyTransition,
  runFacultyReminderTransition,
  runSupervisorReviewTransition,
} from './titleRegistrationTransitions';

type QueuedMail = { caseId: number; recipients: string[]; subject: string; body: string };
type SyncedModule = { caseId: number; status: string; summary: string };

let db: Knex;
let queuedMails: QueuedMail[];
let syncedModules: SyncedModule[];

beforeEach(async () => {
  db = knex({
    client: 'sqlite3',
    connection: { filename: ':memory:' },
    useNullAsDefault: true,
  });

  await db.schema.createTable('sasi_students', (table) => {
    table.increments('id').primary();
    table.string('email');
  });

  await db.schema.createTable('title_registration_cases', (table) => {
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

  await db.schema.createTable('supervisor_profile_forms', (table) => {
    table.increments('id').primary();
    table.integer('case_id').notNullable();
    table.string('status').notNullable();
  });

  await db('sasi_students').insert({ id: 1, email: 'student@example.com' });

  queuedMails = [];
  syncedModules = [];
});

afterEach(async () => {
  await db.destroy();
});

function makeDeps() {
  return {
    db,
    getStaffEmail: async (role: string): Promise<string[]> => [`${role}@example.com`],
    queueEmail: async (caseId: number, recipients: string[], subject: string, body: string): Promise<void> => {
      queuedMails.push({ caseId, recipients, subject, body });
    },
    syncModuleEntries: async (caseId: number, status: string, summary: string): Promise<void> => {
      syncedModules.push({ caseId, status, summary });
    },
  };
}

test('runSupervisorReviewTransition returns case to student on insufficient review', async () => {
  await db('title_registration_cases').insert({
    id: 100,
    sasi_student_id: 1,
    case_status: 'awaiting_supervisor_review',
  });

  const updated = await runSupervisorReviewTransition(100, 'insufficient', 'Need revisions', makeDeps());

  assert.equal(updated.case_status, 'returned_by_supervisor');
  assert.equal(updated.last_comments, 'Need revisions');
  assert.equal(queuedMails.length, 1);
  assert.deepEqual(queuedMails[0].recipients, ['student@example.com']);
  assert.equal(syncedModules.length, 1);
  assert.equal(syncedModules[0].status, 'returned_by_supervisor');
});

test('runDeptSendToFacultyTransition enforces completed supervisor profiles', async () => {
  await db('title_registration_cases').insert({
    id: 200,
    sasi_student_id: 1,
    case_status: 'awaiting_dept_fhd_send_to_faculty',
  });

  await db('supervisor_profile_forms').insert([
    { case_id: 200, status: 'completed' },
    { case_id: 200, status: 'requested' },
  ]);

  await assert.rejects(
    () => runDeptSendToFacultyTransition(200, makeDeps()),
    /Supervisor profile forms are incomplete/,
  );
});

test('runDeptSendToFacultyTransition advances case when profiles are complete', async () => {
  await db('title_registration_cases').insert({
    id: 201,
    sasi_student_id: 1,
    case_status: 'awaiting_dept_fhd_send_to_faculty',
  });

  await db('supervisor_profile_forms').insert([
    { case_id: 201, status: 'completed' },
    { case_id: 201, status: 'completed' },
  ]);

  const updated = await runDeptSendToFacultyTransition(201, makeDeps());

  assert.equal(updated.case_status, 'sent_to_faculty_fhd');
  assert.equal(queuedMails.length, 2);
  assert.equal(syncedModules.length, 1);
  assert.equal(syncedModules[0].status, 'sent_to_faculty_fhd');
});

test('runFacultyReminderTransition sends reminder only after 3 working days', async () => {
  const oldDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString();
  await db('title_registration_cases').insert({
    id: 300,
    sasi_student_id: 1,
    case_status: 'sent_to_faculty_fhd',
    sent_to_faculty_at: oldDate,
  });

  const result = await runFacultyReminderTransition(300, {
    db,
    getStaffEmail: async (role: string): Promise<string[]> => [`${role}@example.com`],
    queueEmail: async (caseId: number, recipients: string[], subject: string, body: string): Promise<void> => {
      queuedMails.push({ caseId, recipients, subject, body });
    },
  });

  assert.equal(result.sent, true);
  assert.equal(queuedMails.length, 1);
});

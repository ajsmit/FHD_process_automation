import test, { after, afterEach, before } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import path from 'path';
import db from '../db/knex';
import { initDb } from '../db/initDb';
import {
  checkAndPrefill,
  generatePdf,
  getCaseById,
  updateForm,
} from './titleRegistrationWorkflowService';
import {
  completeExternalAcademicInvite,
  createExternalAcademicInvite,
} from './externalAcademicOnboardingService';

interface CaseFixture {
  caseId: number;
  studentId: number;
  studentNumber: string;
}

const createdCaseFixtures: CaseFixture[] = [];
const createdExternalAcademicIds: number[] = [];

before(async () => {
  await initDb();
});

afterEach(async () => {
  while (createdExternalAcademicIds.length > 0) {
    const externalAcademicId = createdExternalAcademicIds.pop()!;
    await db('external_academic_registry').where({ id: externalAcademicId }).delete();
  }

  while (createdCaseFixtures.length > 0) {
    const fixture = createdCaseFixtures.pop()!;
    await db('external_academic_profile_invites').where({ case_id: fixture.caseId }).delete();
    await db('notification_queue').where({ case_id: fixture.caseId }).delete();
    await db('supervisor_profile_forms').where({ case_id: fixture.caseId }).delete();
    await db('mou_forms').where({ case_id: fixture.caseId }).delete();
    await db('module_entries').where({ case_id: fixture.caseId }).delete();
    await db('title_registration_cases').where({ id: fixture.caseId }).delete();
    await db('sasi_students').where({ id: fixture.studentId }).delete();
    await fs.rm(path.join(process.cwd(), 'generated_forms', fixture.studentNumber), { recursive: true, force: true });
  }
});

after(async () => {
  await db.destroy();
});

async function createFixtureCase(): Promise<CaseFixture> {
  const studentNumber = `R${Date.now()}${Math.floor(Math.random() * 10000)}`;
  const [studentIdRaw] = await db('sasi_students').insert({
    student_number: studentNumber,
    title: 'Ms',
    first_names: 'Regression',
    last_name: 'Student',
    email: `${studentNumber.toLowerCase()}@example.com`,
    faculty: 'Natural Sciences',
    department: 'Biodiversity & Conservation Biology',
    degree_level: 'PHD',
    degree_type: 'FULL_THESIS',
    registration_type: 'FULL_TIME',
    registration_active: 1,
    first_enrolment_year: 2026,
    first_registration_date: '2026-01-02',
    first_registration_semester: 1,
    expected_completion_date: '2029-12-15',
    thesis_title: 'Baseline regression thesis title',
    ethics_required: 1,
    ethics_ref_number: 'ETH-REG-001',
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Albertus Smit',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  });

  const check = await checkAndPrefill(studentNumber);
  assert.equal(check.eligible, true);
  assert.ok(check.caseRecord, 'expected case record from prefill');

  const fixture: CaseFixture = {
    caseId: check.caseRecord!.id,
    studentId: Number(studentIdRaw),
    studentNumber,
  };
  createdCaseFixtures.push(fixture);
  return fixture;
}

async function setValidExternalSupervisor(caseId: number, email: string): Promise<void> {
  await updateForm(caseId, {
    'Supervisor is UWC-internal': 'No',
    'Supervisor Title': 'Prof',
    'Supervisor External First Name': 'Ada',
    'Supervisor External Surname': 'Lovelace',
    'Supervisor External Email': email,
    'Supervisor External Address': '1 Infinite Loop',
    'Administrative Supervisor same as Supervisor': 'Yes',
    'Has Co-supervisor?': 'No',
  });
}

test('save/prefill coherence keeps immutable prefill fields and persists mutable edits', async () => {
  const fixture = await createFixtureCase();
  const before = await getCaseById(fixture.caseId);

  assert.equal(before.formData['Student Number'], fixture.studentNumber);
  assert.equal(before.formData.Department, 'Biodiversity & Conservation Biology');

  const updated = await updateForm(fixture.caseId, {
    'Supervisor is UWC-internal': 'No',
    'Supervisor Title': 'Prof',
    'Supervisor External First Name': 'Ada',
    'Supervisor External Surname': 'Lovelace',
    'Supervisor External Email': 'ada.prefill@example.org',
    'Supervisor External Address': '1 Infinite Loop',
    'Administrative Supervisor same as Supervisor': 'Yes',
    'Has Co-supervisor?': 'No',
    'Thesis title': 'Updated thesis title with trailing period...',
    'Key words': 'ecology, systems biology',
  });

  const refreshed = await getCaseById(fixture.caseId);
  assert.equal(updated.formData['Student Number'], fixture.studentNumber);
  assert.equal(refreshed.formData['Student Number'], fixture.studentNumber);
  assert.equal(refreshed.formData.Department, before.formData.Department);
  assert.equal(refreshed.formData['Thesis title'], 'Updated thesis title with trailing period');
  assert.equal(refreshed.formData['Key words'], 'ecology, systems biology');
  assert.equal(refreshed.formData['Supervisor External Email'], 'ada.prefill@example.org');
  assert.equal(refreshed.formData.Supervisor, 'Ada Lovelace');
});

test('invite completion synchronization updates invite status, registry row, and linked case fields', async () => {
  const fixture = await createFixtureCase();
  const inviteEmail = `external.${fixture.studentNumber.toLowerCase()}@example.org`;
  await setValidExternalSupervisor(fixture.caseId, inviteEmail);

  const invite = await createExternalAcademicInvite(fixture.caseId, 'supervisor', inviteEmail);
  assert.equal(typeof invite.token, 'string');
  assert.equal(invite.token.length > 0, true);

  const uniqueId = `9001015009${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  const completed = await completeExternalAcademicInvite(invite.token, {
    title: 'Prof',
    first_name: 'Grace',
    last_name: 'Hopper',
    highest_qualification: 'PhD',
    email: inviteEmail,
    address: '42 Academic Road',
    country: 'South Africa',
    identifier_type: 'SA_ID',
    identifier_value: uniqueId,
  });

  createdExternalAcademicIds.push(completed.externalAcademicId);
  assert.equal(completed.caseUpdated, true);

  const inviteRow = await db('external_academic_profile_invites').where({ id: invite.inviteId }).first();
  assert.ok(inviteRow);
  assert.equal(String(inviteRow.status), 'completed');
  assert.equal(Number(inviteRow.external_academic_id), completed.externalAcademicId);

  const refreshed = await getCaseById(fixture.caseId);
  assert.equal(refreshed.formData['Supervisor is UWC-internal'], 'No');
  assert.equal(refreshed.formData['Supervisor External Lookup Id'], String(completed.externalAcademicId));
  assert.equal(refreshed.formData['Supervisor External First Name'], 'Grace');
  assert.equal(refreshed.formData['Supervisor External Surname'], 'Hopper');
  assert.equal(refreshed.formData['Supervisor External Email'], inviteEmail);
  assert.equal(refreshed.formData.Supervisor, 'Grace Hopper');
});

test('PDF parity with DB state regenerates output when persisted form data changes', async () => {
  const fixture = await createFixtureCase();
  await setValidExternalSupervisor(fixture.caseId, 'ada.pdfparity@example.org');

  await updateForm(fixture.caseId, {
    'Thesis title': 'Short parity title',
    Abstract: 'Short abstract for initial parity baseline.',
  });
  const firstPdf = await generatePdf(fixture.caseId);
  const firstStats = await fs.stat(firstPdf.pdfPath);

  await updateForm(fixture.caseId, {
    'Thesis title': 'Long parity title '.repeat(40),
    Abstract: 'Expanded abstract text '.repeat(30),
  });
  const secondPdf = await generatePdf(fixture.caseId);
  const secondStats = await fs.stat(secondPdf.pdfPath);

  const caseRow = await db('title_registration_cases').where({ id: fixture.caseId }).first();
  assert.ok(caseRow);
  assert.equal(String(caseRow.pdf_path), secondPdf.pdfPath);
  assert.equal(firstPdf.pdfPath, secondPdf.pdfPath);
  assert.equal(firstStats.size !== secondStats.size || secondStats.mtimeMs > firstStats.mtimeMs, true);

  const refreshed = await getCaseById(fixture.caseId);
  assert.equal(refreshed.formData['Thesis title'], 'Long parity title '.repeat(40).trim());
});

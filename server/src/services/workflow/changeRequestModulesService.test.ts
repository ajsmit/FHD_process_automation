import test, { after, afterEach, before } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';
import db from '../../db/knex';
import { postLogin, postLogout, postProviderLogin } from '../../controllers/authController';
import { hashPassword } from '../../auth/passwordService';
import { issueSessionTokens, toTokenUser } from '../../auth/sessionService';
import { initDb } from '../../db/initDb';
import {
  getOrCreateAddCoSupervisor,
  getOrCreateChangeSupervisor,
  getOrCreateChangeTitle,
  reviewAddCoSupervisorByChair,
  reviewAddCoSupervisorByDept,
  reviewAddCoSupervisorByFaculty,
  reviewAddCoSupervisorBySupervisor,
  reviewChangeSupervisorByChair,
  reviewChangeSupervisorByDept,
  reviewChangeSupervisorByFaculty,
  reviewChangeSupervisorBySupervisor,
  reviewChangeTitleByChair,
  reviewChangeTitleByDept,
  reviewChangeTitleByFaculty,
  reviewChangeTitleBySupervisor,
  submitAddCoSupervisor,
  submitChangeSupervisor,
  submitChangeTitle,
  updateAddCoSupervisor,
  updateChangeSupervisor,
  updateChangeTitle,
} from './changeRequestModulesService';
import {
  getProgressReport,
  getLeaveOfAbsence,
  getOtherRequest,
  getReadmissionRequest,
  getSupervisorSummativeReport,
  getUpgradeMscToPhd,
  patchLeaveOfAbsence,
  patchOtherRequest,
  patchReadmissionRequest,
  patchSupervisorSummativeReport,
  patchUpgradeMscToPhd,
  patchProgressReport,
  reviewLeaveOfAbsenceByDept,
  reviewLeaveOfAbsenceByFaculty,
  reviewOtherRequestByDept,
  reviewOtherRequestByFaculty,
  reviewReadmissionRequestByDept,
  reviewReadmissionRequestByFaculty,
  reviewSupervisorSummativeReportByDept,
  reviewSupervisorSummativeReportByFaculty,
  reviewUpgradeMscToPhdByDept,
  reviewUpgradeMscToPhdByFaculty,
  reviewProgressReportByDept,
  reviewProgressReportByFaculty,
  submitLeaveOfAbsence,
  submitOtherRequest,
  submitReadmissionRequest,
  submitSupervisorSummativeReport,
  submitUpgradeMscToPhd,
  submitProgressReport,
} from './progressionModulesService';
import { checkAndPrefill, getCaseById, updateForm } from '../titleRegistrationWorkflowService';
import {
  getOrCreateAppointArbiter,
  getOrCreateAppointExaminers,
  getOrCreateChangeExaminers,
  getOrCreateExaminerSummaryCv,
  reviewAppointArbiterByDept,
  reviewAppointArbiterByFaculty,
  reviewAppointExaminersByChairperson,
  reviewAppointExaminersByDept,
  reviewAppointExaminersByFaculty,
  reviewChangeExaminersByChairperson,
  reviewChangeExaminersByDept,
  reviewChangeExaminersByFaculty,
  reviewExaminerSummaryCvByDept,
  reviewExaminerSummaryCvByFaculty,
  reviewIntentionToSubmitByDept,
  reviewIntentionToSubmitBySupervisor,
  submitAppointArbiter,
  submitAppointExaminers,
  submitChangeExaminers,
  submitExaminerSummaryCv,
  submitIntentionToSubmit,
  updateAppointArbiter,
  updateAppointExaminers,
  updateChangeExaminers,
  updateExaminerSummaryCv,
  updateIntentionToSubmit,
} from './nextWaveModulesService';

interface Actor {
  id: number;
  role: 'student' | 'supervisor' | 'admin';
  sasiId: string;
  firstName: string;
  lastName: string;
}

const supervisorActor: Actor = {
  id: 10001,
  role: 'supervisor',
  sasiId: 'STAFF-001',
  firstName: 'AJ',
  lastName: 'Smit',
};

const deptActor: Actor = {
  id: 10002,
  role: 'admin',
  sasiId: 'STAFF-003',
  firstName: 'Adriaan',
  lastName: 'Engelbrecht',
};

const chairActor: Actor = {
  id: 10003,
  role: 'admin',
  sasiId: 'STAFF-005',
  firstName: 'Anusha',
  lastName: 'Rajkaran',
};

const facultyActor: Actor = {
  id: 10004,
  role: 'admin',
  sasiId: 'STAFF-004',
  firstName: 'Natalie',
  lastName: 'Isaacs',
};

const createdStudentIds: number[] = [];
const createdUserIds: number[] = [];

before(async () => {
  await initDb();
});

afterEach(async () => {
  while (createdUserIds.length > 0) {
    const userId = createdUserIds.pop()!;
    await db('auth_refresh_tokens').where({ user_id: userId }).delete();
    await db('users').where({ id: userId }).delete();
  }
  while (createdStudentIds.length > 0) {
    const studentId = createdStudentIds.pop()!;
    await db('title_registration_cases').where({ sasi_student_id: studentId }).delete();
    await db('sasi_students').where({ id: studentId }).delete();
  }
});

after(async () => {
  await db.destroy();
});

function withEnv<T>(entries: Record<string, string>, fn: () => Promise<T>): Promise<T> {
  const previous: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(entries)) {
    previous[key] = process.env[key];
    process.env[key] = value;
  }
  return fn().finally(() => {
    for (const [key, oldValue] of Object.entries(previous)) {
      if (oldValue === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = oldValue;
      }
    }
  });
}

function makeProviderLoginReq(input: {
  ip: string;
  secret: string;
  email: string;
  sasiId?: string;
  staffNumber?: string;
}): Request {
  const headers: Record<string, string> = {
    'x-auth-provider-secret': input.secret,
    'x-auth-user-email': input.email,
  };
  if (input.sasiId) headers['x-auth-user-sasi-id'] = input.sasiId;
  if (input.staffNumber) headers['x-auth-user-staff-number'] = input.staffNumber;

  return {
    body: {},
    ip: input.ip,
    method: 'POST',
    originalUrl: '/api/v1/auth/provider-login',
    header(name: string): string | undefined {
      return headers[name.toLowerCase()];
    },
    get(name: string): string | undefined {
      return headers[name.toLowerCase()];
    },
  } as unknown as Request;
}

function makeResCapture(): Response & { statusCodeCaptured: number; bodyCaptured: unknown } {
  type CapturedResponse = Response & { statusCodeCaptured: number; bodyCaptured: unknown };
  const capture = {
    statusCodeCaptured: 200,
    bodyCaptured: undefined as unknown,
    status(this: CapturedResponse, code: number): CapturedResponse {
      this.statusCodeCaptured = code;
      return this;
    },
    json(this: CapturedResponse, body: unknown): CapturedResponse {
      this.bodyCaptured = body;
      return this;
    },
  } as unknown as CapturedResponse;
  return capture;
}

function makeLogoutReq(input: {
  refreshToken: string;
  user: NonNullable<Request['authUser']>;
  ip?: string;
}): Request {
  return {
    body: { refreshToken: input.refreshToken },
    authUser: input.user,
    ip: input.ip ?? '127.0.0.1',
    method: 'POST',
    originalUrl: '/api/v1/auth/logout',
    get(name: string): string | undefined {
      if (name.toLowerCase() === 'user-agent') {
        return 'node-test';
      }
      return undefined;
    },
  } as unknown as Request;
}

function makeLoginReq(input: { identifier: string; password: string; ip?: string }): Request {
  return {
    body: {
      identifier: input.identifier,
      password: input.password,
    },
    ip: input.ip ?? '127.0.0.1',
    method: 'POST',
    originalUrl: '/api/v1/auth/login',
    get(name: string): string | undefined {
      if (name.toLowerCase() === 'user-agent') {
        return 'node-test';
      }
      return undefined;
    },
  } as unknown as Request;
}

async function createFixtureCase(): Promise<{ caseId: number; studentActor: Actor }> {
  const studentNumber = `T${Date.now()}${Math.floor(Math.random() * 10000)}`;
  const [studentId] = await db('sasi_students').insert({
    student_number: studentNumber,
    title: 'Ms',
    first_names: 'Integration',
    last_name: 'Case',
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
    thesis_title: 'Baseline integration thesis title',
    ethics_required: 1,
    ethics_ref_number: 'ETH-TEST-001',
    supervisor_name: 'AJ Smit',
    supervisor_qualifications: 'PhD',
    co_supervisor_name: 'Albertus Smit',
    co_supervisor_qualifications: 'PhD',
    admin_supervisor_name: 'Adriaan Engelbrecht',
    admin_supervisor_qualifications: 'PhD',
  });

  createdStudentIds.push(Number(studentId));
  const check = await checkAndPrefill(studentNumber);
  assert.equal(check.eligible, true);
  assert.ok(check.caseRecord);

  await updateForm(check.caseRecord!.id, {
    'Supervisor is UWC-internal': 'No',
    'Supervisor Title': 'Prof',
    'Supervisor External First Name': 'AJ',
    'Supervisor External Surname': 'Smit',
    'Supervisor External Email': 'aj.smit@example.com',
    'Supervisor External Address': '94 Bay View Lodge, Muizenberg',
    'Administrative Supervisor same as Supervisor': 'Yes',
    'Has Co-supervisor?': 'Yes',
    'Co-supervisor is UWC-internal': 'Yes',
    'Co-supervisor': 'Albertus Smit',
    'Co-supervisor Qualifications': 'PhD',
    'Second Co-supervisor': 'NA',
    'Second Co-supervisor Qualifications': 'NA',
    'Second Co-supervisor is UWC-internal': 'Yes',
  });

  return {
    caseId: check.caseRecord!.id,
    studentActor: {
      id: 10000 + Number(studentId),
      role: 'student',
      sasiId: studentNumber,
      firstName: 'Integration',
      lastName: 'Case',
    },
  };
}

async function markMouSubmitted(caseId: number): Promise<void> {
  const current = await db('title_registration_cases').where({ id: caseId }).first();
  assert.ok(current);
  const formData = JSON.parse(String(current.form_data_json)) as Record<string, unknown>;
  formData['Has the MOU been submitted?'] = 'Yes';
  await db('title_registration_cases').where({ id: caseId }).update({
    form_data_json: JSON.stringify(formData),
    updated_at: db.fn.now(),
  });
}

async function getModuleEntry(caseId: number, moduleName: string): Promise<{ status: string; summary: string } | undefined> {
  const row = await db('module_entries').where({ case_id: caseId, module_name: moduleName }).first();
  if (!row) return undefined;
  return { status: String(row.status), summary: String(row.summary) };
}

async function approveIts(caseId: number, studentActor: Actor): Promise<void> {
  await markMouSubmitted(caseId);
  await updateIntentionToSubmit(studentActor, caseId, {
    'Submission type': 'Full thesis',
    'Intended submission date': '2027-11-30',
    'Student declaration': 'Student confirms intention to submit and readiness for review.',
    'Student signature date': '2026-03-10',
  });
  await submitIntentionToSubmit(studentActor, caseId);
  await reviewIntentionToSubmitBySupervisor(supervisorActor, caseId, 'approved');
  await reviewIntentionToSubmitByDept(deptActor, caseId, 'approved');
}

async function approveAppointExaminers(caseId: number, studentActor: Actor): Promise<void> {
  await approveIts(caseId, studentActor);
  await getOrCreateAppointExaminers(supervisorActor, caseId);
  await updateAppointExaminers(supervisorActor, caseId, {
    'Examiner 1 Name': 'Bryan Maritz',
    'Examiner 1 Type': 'Internal',
    'Examiner 1 Affiliation': 'UWC',
    'Examiner 1 Motivation': 'Strong expertise in thesis topic.',
    'Examiner 1 CV received': 'Yes',
    'Examiner 1 Conflict disclosure': 'No conflict declared.',
    'Examiner 2 Name': 'Albertus Smit',
    'Examiner 2 Type': 'Internal',
    'Examiner 2 Affiliation': 'UWC',
    'Examiner 2 Motivation': 'Strong methodological alignment.',
    'Examiner 2 CV received': 'Yes',
    'Examiner 2 Conflict disclosure': 'No conflict declared.',
  });
  await submitAppointExaminers(supervisorActor, caseId);
  await reviewAppointExaminersByDept(deptActor, caseId, 'approved');
  await reviewAppointExaminersByChairperson(chairActor, caseId, 'approved');
  await reviewAppointExaminersByFaculty(facultyActor, caseId, 'approved');
}

test('CHANGE_TITLE submit gate rejects identical proposed title', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  const initial = await getOrCreateChangeTitle(studentActor, caseId);
  const currentTitle = initial.formData['Current Thesis Title'];
  await updateChangeTitle(studentActor, caseId, {
    'Proposed Thesis Title': currentTitle,
    'Change Rationale': 'This rationale is intentionally long enough to satisfy minimum validation length.',
    'Ethics Impact': 'No ethics impact expected.',
  });

  await assert.rejects(
    () => submitChangeTitle(studentActor, caseId),
    /must differ from current thesis title/i,
  );
});

test('CHANGE_TITLE final approval updates canonical ROTT thesis title', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  const proposedTitle = 'Approved replacement title for canonical sync...';
  await updateChangeTitle(studentActor, caseId, {
    'Proposed Thesis Title': proposedTitle,
    'Change Rationale': 'A substantial rationale that justifies the change in scope and framing.',
    'Ethics Impact': 'Ethics review unchanged.',
    'Supervisor Comments': 'Looks acceptable.',
  });

  await submitChangeTitle(studentActor, caseId);
  await reviewChangeTitleBySupervisor(supervisorActor, caseId, 'approved');
  await reviewChangeTitleByDept(deptActor, caseId, 'approved');
  await reviewChangeTitleByChair(chairActor, caseId, 'approved');
  await reviewChangeTitleByFaculty(facultyActor, caseId, 'approved');

  const refreshed = await getCaseById(caseId);
  assert.equal(refreshed.formData['Thesis title'], 'Approved replacement title for canonical sync');
});

test('CHANGE_SUPERVISOR final approval updates canonical supervision roster', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await updateChangeSupervisor(studentActor, caseId, {
    'Role To Change': 'Primary Supervisor',
    'Outgoing Academic': 'AJ Smit',
    'Incoming Academic': 'Albertus Smit',
    'Incoming Academic Qualification': 'PhD',
    'Incoming Academic Is UWC Internal': 'Yes',
    'Change Rationale': 'A robust rationale for updating the primary supervision role assignment.',
    'Continuity Plan': 'Detailed handover plan with continuity meetings and supervision overlap.',
  });

  await submitChangeSupervisor(studentActor, caseId);
  await reviewChangeSupervisorBySupervisor(supervisorActor, caseId, 'approved');
  await reviewChangeSupervisorByDept(deptActor, caseId, 'approved');
  await reviewChangeSupervisorByChair(chairActor, caseId, 'approved');
  await reviewChangeSupervisorByFaculty(facultyActor, caseId, 'approved');

  const refreshed = await getCaseById(caseId);
  assert.equal(refreshed.formData.Supervisor, 'Albertus Smit');
  assert.equal(refreshed.formData['Supervisor Qualifications'], 'PhD/Doctorate');
  assert.equal(refreshed.formData['Supervisor is UWC-internal'], 'Yes');
});

test('ADD_CO_SUPERVISOR submit gate rejects duplicate co-supervisor', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await updateAddCoSupervisor(studentActor, caseId, {
    'Proposed Co-supervisor': 'Albertus Smit',
    'Proposed Co-supervisor Qualification': 'PhD',
    'Motivation For Addition': 'Long enough motivation text to satisfy the baseline completeness checks.',
  });

  await assert.rejects(
    () => submitAddCoSupervisor(studentActor, caseId),
    /already exists in current co-supervisors/i,
  );
});

test('ADD_CO_SUPERVISOR final approval updates co-supervisor slot in canonical roster', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await updateAddCoSupervisor(studentActor, caseId, {
    'Proposed Co-supervisor': 'Bryan Maritz',
    'Proposed Co-supervisor Qualification': 'PhD',
    'Proposed Co-supervisor Is UWC Internal': 'Yes',
    'Motivation For Addition': 'The additional co-supervisor contributes specialist methods required for completion.',
  });

  await submitAddCoSupervisor(studentActor, caseId);
  await reviewAddCoSupervisorBySupervisor(supervisorActor, caseId, 'approved');
  await reviewAddCoSupervisorByDept(deptActor, caseId, 'approved');
  await reviewAddCoSupervisorByChair(chairActor, caseId, 'approved');
  await reviewAddCoSupervisorByFaculty(facultyActor, caseId, 'approved');

  const refreshed = await getCaseById(caseId);
  assert.equal(refreshed.formData['Has Co-supervisor?'], 'Yes');
  assert.equal(refreshed.formData['Second Co-supervisor'], 'Bryan Maritz');
  assert.equal(refreshed.formData['Second Co-supervisor Qualifications'], 'PhD/Doctorate');
});

test('INTENTION_TO_SUBMIT supports return-and-resubmit rework loop', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await markMouSubmitted(caseId);

  await updateIntentionToSubmit(studentActor, caseId, {
    'Submission type': 'Full thesis',
    'Intended submission date': '2027-11-30',
    'Student declaration': 'Student confirms intention to submit and readiness for review.',
    'Student signature date': '2026-03-10',
  });

  let record = await submitIntentionToSubmit(studentActor, caseId);
  assert.equal(record.status, 'awaiting_supervisor_review');

  record = await reviewIntentionToSubmitBySupervisor(supervisorActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_supervisor');

  await updateIntentionToSubmit(studentActor, caseId, {
    'Non-approval motivation': 'Supervisor feedback addressed and revised timeline provided.',
  });

  record = await submitIntentionToSubmit(studentActor, caseId);
  assert.equal(record.status, 'awaiting_supervisor_review');

  record = await reviewIntentionToSubmitBySupervisor(supervisorActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewIntentionToSubmitByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('APPOINT_EXAMINERS enforces review order and module_entries audit state', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await approveIts(caseId, studentActor);
  await getOrCreateAppointExaminers(supervisorActor, caseId);

  await updateAppointExaminers(supervisorActor, caseId, {
    'Examiner 1 Name': 'Bryan Maritz',
    'Examiner 1 Type': 'Internal',
    'Examiner 1 Affiliation': 'UWC',
    'Examiner 1 Motivation': 'Strong topic expertise.',
    'Examiner 1 CV received': 'Yes',
    'Examiner 1 Conflict disclosure': 'No conflict declared.',
    'Examiner 2 Name': 'Albertus Smit',
    'Examiner 2 Type': 'Internal',
    'Examiner 2 Affiliation': 'UWC',
    'Examiner 2 Motivation': 'Strong methods expertise.',
    'Examiner 2 CV received': 'Yes',
    'Examiner 2 Conflict disclosure': 'No conflict declared.',
  });

  await submitAppointExaminers(supervisorActor, caseId);
  await assert.rejects(
    () => reviewAppointExaminersByChairperson(chairActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  await reviewAppointExaminersByDept(deptActor, caseId, 'returned');
  const returnedEntry = await getModuleEntry(caseId, 'appoint_examiners');
  assert.equal(returnedEntry?.status, 'action_required');
  assert.match(returnedEntry?.summary ?? '', /returned by department/i);

  await updateAppointExaminers(supervisorActor, caseId, {
    'Examiner 2 Motivation': 'Updated motivation after departmental feedback.',
  });
  await submitAppointExaminers(supervisorActor, caseId);
  await reviewAppointExaminersByDept(deptActor, caseId, 'approved');
  await reviewAppointExaminersByChairperson(chairActor, caseId, 'approved');
  await reviewAppointExaminersByFaculty(facultyActor, caseId, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'appoint_examiners');
  assert.equal(approvedEntry?.status, 'approved');
  assert.match(approvedEntry?.summary ?? '', /approved/i);
});

test('CHANGE_EXAMINERS supports return-and-resubmit loop with module_entries status changes', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await approveAppointExaminers(caseId, studentActor);
  await getOrCreateChangeExaminers(supervisorActor, caseId);

  await updateChangeExaminers(supervisorActor, caseId, {
    'Change motivation': 'Examiner unavailable due to unforeseen conflict.',
    'Replacement Examiner 1 Name': 'Vanessa Couldridge',
    'Replacement Examiner 1 Type': 'Internal',
    'Replacement Examiner 1 Affiliation': 'UWC',
    'Replacement Examiner 1 Motivation': 'Relevant subject expertise.',
  });
  await submitChangeExaminers(supervisorActor, caseId);

  await reviewChangeExaminersByDept(deptActor, caseId, 'returned');
  const returnedEntry = await getModuleEntry(caseId, 'change_examiners');
  assert.equal(returnedEntry?.status, 'action_required');

  await updateChangeExaminers(supervisorActor, caseId, {
    'Replacement Examiner 1 Motivation': 'Updated motivation with stronger conflict handling rationale.',
  });
  await submitChangeExaminers(supervisorActor, caseId);
  await reviewChangeExaminersByDept(deptActor, caseId, 'approved');
  await reviewChangeExaminersByChairperson(chairActor, caseId, 'approved');
  await reviewChangeExaminersByFaculty(facultyActor, caseId, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'change_examiners');
  assert.equal(approvedEntry?.status, 'approved');
});

test('EXAMINER_SUMMARY_CV enforces review order and supports rework', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await approveAppointExaminers(caseId, studentActor);
  await getOrCreateExaminerSummaryCv(supervisorActor, caseId);

  await updateExaminerSummaryCv(supervisorActor, caseId, {
    'Summary CV packet status': 'Complete',
    'Compiled by': 'AJ Smit',
    'Compilation date': '2026-03-10',
    Notes: 'Summary compiled for review.',
  });
  await submitExaminerSummaryCv(supervisorActor, caseId);

  await assert.rejects(
    () => reviewExaminerSummaryCvByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  await reviewExaminerSummaryCvByDept(deptActor, caseId, 'returned');
  await updateExaminerSummaryCv(supervisorActor, caseId, {
    Notes: 'Updated notes after departmental return.',
  });
  await submitExaminerSummaryCv(supervisorActor, caseId);
  await reviewExaminerSummaryCvByDept(deptActor, caseId, 'approved');
  await reviewExaminerSummaryCvByFaculty(facultyActor, caseId, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'examiner_summary_cv');
  assert.equal(approvedEntry?.status, 'approved');
});

test('APPOINT_ARBITER enforces review order and supports rework', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await approveAppointExaminers(caseId, studentActor);
  await getOrCreateAppointArbiter(supervisorActor, caseId);

  await updateAppointArbiter(supervisorActor, caseId, {
    'Arbiter Name': 'Gavin Maneveldt',
    'Arbiter Type': 'Internal',
    'Arbiter Affiliation': 'UWC',
    'Arbiter Motivation': 'Suitable neutral expert with relevant domain experience.',
    'Arbiter CV received': 'Yes',
    'Arbiter conflict disclosure': 'No conflict declared.',
  });
  await submitAppointArbiter(supervisorActor, caseId);

  await assert.rejects(
    () => reviewAppointArbiterByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  await reviewAppointArbiterByDept(deptActor, caseId, 'returned');
  await updateAppointArbiter(supervisorActor, caseId, {
    'Arbiter Motivation': 'Updated motivation after return from department.',
  });
  await submitAppointArbiter(supervisorActor, caseId);
  await reviewAppointArbiterByDept(deptActor, caseId, 'approved');
  await reviewAppointArbiterByFaculty(facultyActor, caseId, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'appoint_arbiter');
  assert.equal(approvedEntry?.status, 'approved');
});

test('PROGRESS_REPORT prefill is coherent and supports full approval path', async () => {
  const { caseId, studentActor } = await createFixtureCase();

  const initial = await getProgressReport(studentActor, caseId);
  assert.equal(initial.formData['Student Number'], studentActor.sasiId);
  assert.match(initial.formData['Student Full Name'], /Integration Case/);
  assert.equal(initial.formData['Co-supervisor(s)'], 'Albertus Smit');
  assert.equal(initial.record.status, 'draft');

  await patchProgressReport(studentActor, caseId, {
    'Reporting period': '2026 Q1',
    'Research progress summary': 'Completed literature synthesis and baseline methodology validation.',
    Challenges: 'Data access delays in one external dataset.',
    'Publication output': 'One draft manuscript in preparation.',
    'Ethics compliance status': 'Ethics clearance active and conditions met.',
    'Support required': 'No additional support required at this stage.',
    'Supervisor comment': 'Progress aligned with expected doctoral trajectory.',
  });

  let record = await submitProgressReport(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewProgressReportByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_faculty_review');

  record = await reviewProgressReportByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'progress_report');
  assert.equal(approvedEntry?.status, 'approved');
  assert.match(approvedEntry?.summary ?? '', /approved/i);
});

test('PROGRESS_REPORT enforces review order and supports return-resubmit cycle', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await patchProgressReport(studentActor, caseId, {
    'Reporting period': '2026 Q2',
    'Research progress summary': 'Drafted analysis chapters and completed pilot experiments.',
    'Ethics compliance status': 'Compliant',
  });
  await submitProgressReport(studentActor, caseId);

  await assert.rejects(
    () => reviewProgressReportByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  let record = await reviewProgressReportByDept(deptActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_dept');

  const returnedEntry = await getModuleEntry(caseId, 'progress_report');
  assert.equal(returnedEntry?.status, 'action_required');
  assert.match(returnedEntry?.summary ?? '', /returned by department/i);

  await patchProgressReport(studentActor, caseId, {
    'Research progress summary': 'Updated report addressing departmental feedback and revised milestones.',
    'Supervisor comment': 'Feedback incorporated and accepted.',
  });
  record = await submitProgressReport(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  await reviewProgressReportByDept(deptActor, caseId, 'approved');
  record = await reviewProgressReportByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('LEAVE_OF_ABSENCE prefill is coherent and supports full approval path', async () => {
  const { caseId, studentActor } = await createFixtureCase();

  const initial = await getLeaveOfAbsence(studentActor, caseId);
  assert.equal(initial.formData['Student Number'], studentActor.sasiId);
  assert.match(initial.formData['Student Full Name'], /Integration Case/);
  assert.equal(initial.record.status, 'draft');

  await patchLeaveOfAbsence(studentActor, caseId, {
    'Leave start date': '2026-06-01',
    'Leave end date': '2026-09-30',
    'Reason for leave': 'Temporary medical and family support constraints requiring leave.',
    'Support plan during leave': 'Monthly supervisor updates and documented return milestones.',
    'Supervisor recommendation': 'Recommended with clear reintegration timeline.',
  });

  let record = await submitLeaveOfAbsence(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewLeaveOfAbsenceByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_faculty_review');

  record = await reviewLeaveOfAbsenceByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'leave_of_absence');
  assert.equal(approvedEntry?.status, 'approved');
  assert.match(approvedEntry?.summary ?? '', /approved/i);
});

test('LEAVE_OF_ABSENCE enforces review order and supports return-resubmit cycle', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await patchLeaveOfAbsence(studentActor, caseId, {
    'Leave start date': '2026-07-01',
    'Leave end date': '2026-08-31',
    'Reason for leave': 'Focused research interruption due to approved external obligations.',
  });
  await submitLeaveOfAbsence(studentActor, caseId);

  await assert.rejects(
    () => reviewLeaveOfAbsenceByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  let record = await reviewLeaveOfAbsenceByDept(deptActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_dept');

  const returnedEntry = await getModuleEntry(caseId, 'leave_of_absence');
  assert.equal(returnedEntry?.status, 'action_required');
  assert.match(returnedEntry?.summary ?? '', /returned by department/i);

  await patchLeaveOfAbsence(studentActor, caseId, {
    'Reason for leave': 'Updated rationale with departmental-requested documentation references.',
    'Support plan during leave': 'Structured monthly checkpoints and planned return onboarding.',
  });
  record = await submitLeaveOfAbsence(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  await reviewLeaveOfAbsenceByDept(deptActor, caseId, 'approved');
  record = await reviewLeaveOfAbsenceByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('READMISSION_REQUEST prefill is coherent and supports full approval path', async () => {
  const { caseId, studentActor } = await createFixtureCase();

  const initial = await getReadmissionRequest(studentActor, caseId);
  assert.equal(initial.formData['Student Number'], studentActor.sasiId);
  assert.match(initial.formData['Student Full Name'], /Integration Case/);
  assert.equal(initial.record.status, 'draft');

  await patchReadmissionRequest(studentActor, caseId, {
    'Previous leave period': '2026-06-01 to 2026-09-30',
    'Requested readmission date': '2026-10-15',
    'Reason for readmission': 'Leave constraints resolved and study conditions restored.',
    'Academic recovery plan': 'Revised milestone plan with monthly supervisory checkpoints.',
    'Supervisor recommendation': 'Supports readmission with phased reintegration.',
  });

  let record = await submitReadmissionRequest(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewReadmissionRequestByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_faculty_review');

  record = await reviewReadmissionRequestByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'readmission_request');
  assert.equal(approvedEntry?.status, 'approved');
  assert.match(approvedEntry?.summary ?? '', /approved/i);
});

test('READMISSION_REQUEST enforces review order and supports return-resubmit cycle', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await patchReadmissionRequest(studentActor, caseId, {
    'Requested readmission date': '2026-11-01',
    'Reason for readmission': 'Student has met preconditions for reinstatement.',
    'Academic recovery plan': 'Timeline reset with committee-monitored deliverables.',
  });
  await submitReadmissionRequest(studentActor, caseId);

  await assert.rejects(
    () => reviewReadmissionRequestByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  let record = await reviewReadmissionRequestByDept(deptActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_dept');

  const returnedEntry = await getModuleEntry(caseId, 'readmission_request');
  assert.equal(returnedEntry?.status, 'action_required');
  assert.match(returnedEntry?.summary ?? '', /returned by department/i);

  await patchReadmissionRequest(studentActor, caseId, {
    'Reason for readmission': 'Updated rationale including requested supporting evidence references.',
  });
  record = await submitReadmissionRequest(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  await reviewReadmissionRequestByDept(deptActor, caseId, 'approved');
  record = await reviewReadmissionRequestByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('UPGRADE_MSC_TO_PHD prefill is coherent and supports full approval path', async () => {
  const { caseId, studentActor } = await createFixtureCase();

  const initial = await getUpgradeMscToPhd(studentActor, caseId);
  assert.equal(initial.formData['Student Number'], studentActor.sasiId);
  assert.equal(initial.formData['Requested Upgrade Degree'], 'PhD');
  assert.equal(initial.record.status, 'draft');

  await patchUpgradeMscToPhd(studentActor, caseId, {
    'Upgrade motivation': 'Student has produced substantial research outputs at doctoral trajectory level.',
    'Research progress evidence': 'Completed high-impact milestones and publications supporting upgrade.',
    'Supervisor recommendation': 'Supervisor supports upgrade based on sustained progress.',
  });

  let record = await submitUpgradeMscToPhd(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewUpgradeMscToPhdByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_faculty_review');

  record = await reviewUpgradeMscToPhdByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');

  const approvedEntry = await getModuleEntry(caseId, 'upgrade_msc_to_phd');
  assert.equal(approvedEntry?.status, 'approved');
  assert.match(approvedEntry?.summary ?? '', /approved/i);
});

test('UPGRADE_MSC_TO_PHD enforces review order and supports return-resubmit cycle', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await patchUpgradeMscToPhd(studentActor, caseId, {
    'Upgrade motivation': 'Baseline upgrade rationale for progression.',
    'Research progress evidence': 'Baseline evidence for doctoral readiness.',
  });
  await submitUpgradeMscToPhd(studentActor, caseId);

  await assert.rejects(
    () => reviewUpgradeMscToPhdByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  let record = await reviewUpgradeMscToPhdByDept(deptActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_dept');

  await patchUpgradeMscToPhd(studentActor, caseId, {
    'Research progress evidence': 'Updated evidence after department feedback.',
  });
  record = await submitUpgradeMscToPhd(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  await reviewUpgradeMscToPhdByDept(deptActor, caseId, 'approved');
  record = await reviewUpgradeMscToPhdByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('SUPERVISOR_SUMMATIVE_REPORT supports supervisor-authored full approval path', async () => {
  const { caseId } = await createFixtureCase();

  const initial = await getSupervisorSummativeReport(supervisorActor, caseId);
  assert.equal(initial.record.status, 'draft');
  assert.equal(initial.formData.Supervisor, 'AJ Smit');

  await patchSupervisorSummativeReport(supervisorActor, caseId, {
    'Summative period': '2026 annual cycle',
    'Overall progress summary': 'Student maintained expected progress across all objectives.',
    'Submission readiness assessment': 'Ready for downstream submission milestones.',
    'Examiner outcomes summary': 'No adverse outcomes pending.',
    'Supervisor recommendation': 'Recommend progression without reservation.',
  });

  let record = await submitSupervisorSummativeReport(supervisorActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewSupervisorSummativeReportByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_faculty_review');

  record = await reviewSupervisorSummativeReportByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('SUPERVISOR_SUMMATIVE_REPORT enforces supervisor edit role and rework loop', async () => {
  const { caseId, studentActor } = await createFixtureCase();

  await assert.rejects(
    () => patchSupervisorSummativeReport(studentActor, caseId, { 'Summative period': 'attempted student edit' }),
    /not authorized/i,
  );

  await patchSupervisorSummativeReport(supervisorActor, caseId, {
    'Summative period': '2026 cycle',
    'Overall progress summary': 'Initial summary content.',
    'Submission readiness assessment': 'Ready',
    'Supervisor recommendation': 'Proceed',
  });
  await submitSupervisorSummativeReport(supervisorActor, caseId);

  let record = await reviewSupervisorSummativeReportByDept(deptActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_dept');

  await patchSupervisorSummativeReport(supervisorActor, caseId, {
    'Overall progress summary': 'Updated summary with departmental feedback integrated.',
  });
  record = await submitSupervisorSummativeReport(supervisorActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');
});

test('OTHER_REQUEST prefill is coherent and supports full approval path', async () => {
  const { caseId, studentActor } = await createFixtureCase();

  const initial = await getOtherRequest(studentActor, caseId);
  assert.equal(initial.formData['Student Number'], studentActor.sasiId);
  assert.equal(initial.record.status, 'draft');

  await patchOtherRequest(studentActor, caseId, {
    'Request category': 'Administrative exception',
    'Request details': 'Requesting documented exception with supporting rationale.',
    'Requested effective date': '2026-12-01',
    'Impact statement': 'No adverse impact expected on policy compliance.',
    'Supervisor comment': 'Supervisor acknowledges request context.',
  });

  let record = await submitOtherRequest(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  record = await reviewOtherRequestByDept(deptActor, caseId, 'approved');
  assert.equal(record.status, 'awaiting_faculty_review');

  record = await reviewOtherRequestByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('OTHER_REQUEST enforces review order and supports return-resubmit cycle', async () => {
  const { caseId, studentActor } = await createFixtureCase();
  await patchOtherRequest(studentActor, caseId, {
    'Request category': 'Case-specific request',
    'Request details': 'Initial request details.',
    'Impact statement': 'Initial impact statement.',
  });
  await submitOtherRequest(studentActor, caseId);

  await assert.rejects(
    () => reviewOtherRequestByFaculty(facultyActor, caseId, 'approved'),
    /review not allowed from status awaiting_dept_review/i,
  );

  let record = await reviewOtherRequestByDept(deptActor, caseId, 'returned');
  assert.equal(record.status, 'returned_by_dept');

  await patchOtherRequest(studentActor, caseId, {
    'Request details': 'Updated details after department return.',
  });
  record = await submitOtherRequest(studentActor, caseId);
  assert.equal(record.status, 'awaiting_dept_review');

  await reviewOtherRequestByDept(deptActor, caseId, 'approved');
  record = await reviewOtherRequestByFaculty(facultyActor, caseId, 'approved');
  assert.equal(record.status, 'approved');
});

test('provider-login succeeds in trusted_header mode with trusted source and valid secret', async () => {
  await withEnv(
    {
      AUTH_PROVIDER: 'trusted_header',
      AUTH_PROVIDER_SHARED_SECRET: 'test-secret',
      AUTH_PROVIDER_TRUSTED_PROXY_IPS: '127.0.0.1,::1',
    },
    async () => {
      const req = makeProviderLoginReq({
        ip: '127.0.0.1',
        secret: 'test-secret',
        email: 'adriaan.engelbrecht@example.com',
      });
      const res = makeResCapture();
      await postProviderLogin(req, res);
      assert.equal(res.statusCodeCaptured, 200);
      assert.ok(typeof (res.bodyCaptured as { token?: string }).token === 'string');
    },
  );
});

test('provider-login fails with bad shared secret', async () => {
  await withEnv(
    {
      AUTH_PROVIDER: 'trusted_header',
      AUTH_PROVIDER_SHARED_SECRET: 'test-secret',
      AUTH_PROVIDER_TRUSTED_PROXY_IPS: '127.0.0.1,::1',
    },
    async () => {
      const req = makeProviderLoginReq({
        ip: '127.0.0.1',
        secret: 'wrong-secret',
        email: 'adriaan.engelbrecht@example.com',
      });
      const res = makeResCapture();
      await postProviderLogin(req, res);
      assert.equal(res.statusCodeCaptured, 401);
    },
  );
});

test('provider-login fails from untrusted source IP', async () => {
  await withEnv(
    {
      AUTH_PROVIDER: 'trusted_header',
      AUTH_PROVIDER_SHARED_SECRET: 'test-secret',
      AUTH_PROVIDER_TRUSTED_PROXY_IPS: '127.0.0.1,::1',
    },
    async () => {
      const req = makeProviderLoginReq({
        ip: '10.10.10.10',
        secret: 'test-secret',
        email: 'adriaan.engelbrecht@example.com',
      });
      const res = makeResCapture();
      await postProviderLogin(req, res);
      assert.equal(res.statusCodeCaptured, 401);
    },
  );
});

test('logout revokes refresh token owned by authenticated user', async () => {
  const user = await db('users')
    .where({ sasi_id: 'STAFF-003' })
    .first('id', 'sasi_id', 'first_name', 'last_name', 'role');
  assert.ok(user, 'expected seeded user');

  const tokens = await issueSessionTokens(toTokenUser(user), { ipAddress: '127.0.0.1', userAgent: 'node-test' });
  const req = makeLogoutReq({
    refreshToken: tokens.refreshToken,
    user: {
      id: user.id,
      sasiId: user.sasi_id,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
    },
  });
  const res = makeResCapture();
  await postLogout(req, res);
  assert.equal(res.statusCodeCaptured, 200);

  const tokenRow = await db('auth_refresh_tokens')
    .where({ user_id: user.id })
    .whereNotNull('revoked_at')
    .orderBy('id', 'desc')
    .first('revoked_reason');
  assert.equal(tokenRow?.revoked_reason, 'logout');
});

test('logout rejects refresh token not owned by authenticated user', async () => {
  const tokenOwner = await db('users')
    .where({ sasi_id: 'STAFF-003' })
    .first('id', 'sasi_id', 'first_name', 'last_name', 'role');
  const requester = await db('users')
    .where({ sasi_id: 'STAFF-004' })
    .first('id', 'sasi_id', 'first_name', 'last_name', 'role');
  assert.ok(tokenOwner && requester, 'expected seeded users');

  const tokens = await issueSessionTokens(toTokenUser(tokenOwner), { ipAddress: '127.0.0.1', userAgent: 'node-test' });
  const req = makeLogoutReq({
    refreshToken: tokens.refreshToken,
    user: {
      id: requester.id,
      sasiId: requester.sasi_id,
      role: requester.role,
      firstName: requester.first_name,
      lastName: requester.last_name,
    },
  });
  const res = makeResCapture();
  await postLogout(req, res);
  assert.equal(res.statusCodeCaptured, 401);

  const tokenRow = await db('auth_refresh_tokens')
    .where({ user_id: tokenOwner.id })
    .orderBy('id', 'desc')
    .first('revoked_at');
  assert.equal(tokenRow?.revoked_at, null);
});

test('login fails when identifier resolves to multiple users', async () => {
  const timestamp = Date.now();
  const passwordHash = await hashPassword('Conflict123!');
  const conflictingIdentifier = `CONFLICT-${timestamp}`;

  const inserted = await db('users')
    .insert([
      {
        sasi_id: conflictingIdentifier,
        staff_number: `STAFF-CONF-A-${timestamp}`,
        first_name: 'Conflict',
        last_name: 'One',
        email: `conflict-a-${timestamp}@example.com`,
        role: 'system_admin',
        password_hash: passwordHash,
        active: 1,
      },
      {
        sasi_id: `CONF-B-${timestamp}`,
        staff_number: conflictingIdentifier,
        first_name: 'Conflict',
        last_name: 'Two',
        email: `conflict-b-${timestamp}@example.com`,
        role: 'system_admin',
        password_hash: passwordHash,
        active: 1,
      },
    ])
    .returning('id');
  for (const entry of inserted as Array<number | { id: number }>) {
    createdUserIds.push(typeof entry === 'number' ? entry : entry.id);
  }

  await withEnv({ AUTH_PROVIDER: 'local_password' }, async () => {
    const req = makeLoginReq({ identifier: conflictingIdentifier, password: 'Conflict123!' });
    const res = makeResCapture();
    await postLogin(req, res);
    assert.equal(res.statusCodeCaptured, 401);
  });
});

test('provider-login fails when trusted identifiers map to conflicting users', async () => {
  const timestamp = Date.now();
  const inserted = await db('users')
    .insert([
      {
        sasi_id: `PROV-A-${timestamp}`,
        staff_number: `STAFF-PROV-A-${timestamp}`,
        first_name: 'Provider',
        last_name: 'One',
        email: `provider-one-${timestamp}@example.com`,
        role: 'system_admin',
        active: 1,
      },
      {
        sasi_id: `PROV-B-${timestamp}`,
        staff_number: `STAFF-PROV-B-${timestamp}`,
        first_name: 'Provider',
        last_name: 'Two',
        email: `provider-two-${timestamp}@example.com`,
        role: 'system_admin',
        active: 1,
      },
    ])
    .returning('id');
  for (const entry of inserted as Array<number | { id: number }>) {
    createdUserIds.push(typeof entry === 'number' ? entry : entry.id);
  }

  await withEnv(
    {
      AUTH_PROVIDER: 'trusted_header',
      AUTH_PROVIDER_SHARED_SECRET: 'test-secret',
      AUTH_PROVIDER_TRUSTED_PROXY_IPS: '127.0.0.1,::1',
    },
    async () => {
      const req = makeProviderLoginReq({
        ip: '127.0.0.1',
        secret: 'test-secret',
        email: `provider-one-${timestamp}@example.com`,
        staffNumber: `STAFF-PROV-B-${timestamp}`,
      });
      const res = makeResCapture();
      await postProviderLogin(req, res);
      assert.equal(res.statusCodeCaptured, 401);
    },
  );
});

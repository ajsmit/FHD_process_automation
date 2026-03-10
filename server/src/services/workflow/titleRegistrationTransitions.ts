import type { Knex } from 'knex';
import type { ReviewDecision, SupervisorProfileForm, TitleRegistrationCase } from '../contracts/titleRegistration';

interface TransitionDeps {
  db: Knex;
  getStaffEmail: (role: string) => Promise<string[]>;
  queueEmail: (caseId: number, recipients: string[], subject: string, body: string) => Promise<void>;
  syncModuleEntries: (caseId: number, status: TitleRegistrationCase['case_status'], summary: string) => Promise<void>;
}

export async function runSupervisorReviewTransition(
  caseId: number,
  decision: ReviewDecision,
  comments: string | undefined,
  deps: TransitionDeps,
): Promise<TitleRegistrationCase> {
  const caseRecord = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Case not found');
  }

  if (decision === 'insufficient') {
    await deps.db('title_registration_cases').where({ id: caseId }).update({
      case_status: 'returned_by_supervisor',
      supervisor_reviewed_at: deps.db.fn.now(),
      last_comments: comments ?? 'Returned as insufficient by supervisor',
      updated_at: deps.db.fn.now(),
    });

    const student = await deps.db('sasi_students')
      .join('title_registration_cases', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
      .where('title_registration_cases.id', caseId)
      .first('sasi_students.email');

    await deps.queueEmail(caseId, [student?.email ?? ''], 'Title Registration returned by supervisor', comments ?? 'Please correct the form and resubmit.');
    await deps.syncModuleEntries(caseId, 'returned_by_supervisor', 'Returned by supervisor for correction');
  } else {
    await deps.db('title_registration_cases').where({ id: caseId }).update({
      case_status: 'awaiting_dept_fhd_review',
      supervisor_reviewed_at: deps.db.fn.now(),
      last_comments: comments ?? null,
      updated_at: deps.db.fn.now(),
    });

    const deptReps = await deps.getStaffEmail('dept_fhd_rep');
    await deps.queueEmail(caseId, deptReps, 'Title Registration awaiting Dept FHD review', `Case #${caseId} has been vetted by the supervisor and requires Dept FHD review.`);
    await deps.syncModuleEntries(caseId, 'awaiting_dept_fhd_review', 'Awaiting Dept FHD review');
  }

  const updated = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Case missing after supervisor review');
  }
  return updated;
}

export async function runDeptReviewTransition(
  caseId: number,
  decision: ReviewDecision,
  comments: string | undefined,
  deps: TransitionDeps,
): Promise<TitleRegistrationCase> {
  const caseRecord = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Case not found');
  }

  if (decision === 'insufficient') {
    await deps.db('title_registration_cases').where({ id: caseId }).update({
      case_status: 'returned_by_dept_fhd',
      dept_reviewed_at: deps.db.fn.now(),
      last_comments: comments ?? 'Returned by Dept FHD for further action',
      updated_at: deps.db.fn.now(),
    });

    const supervisors = await deps.getStaffEmail('supervisor');
    await deps.queueEmail(caseId, supervisors, 'Title Registration returned by Dept FHD rep', comments ?? 'Please revise and resubmit.');
    await deps.syncModuleEntries(caseId, 'returned_by_dept_fhd', 'Returned by Dept FHD');
  } else {
    await deps.db('title_registration_cases').where({ id: caseId }).update({
      case_status: 'awaiting_chairperson_signature',
      dept_reviewed_at: deps.db.fn.now(),
      last_comments: comments ?? null,
      updated_at: deps.db.fn.now(),
    });

    const hods = await deps.getStaffEmail('hod');
    const deptReps = await deps.getStaffEmail('dept_fhd_rep');
    await deps.queueEmail(caseId, hods, 'Title Registration awaiting Department Chairperson signature', `Case #${caseId} has been vetted by Dept FHD and now requires Chairperson signature.`);
    await deps.queueEmail(caseId, deptReps, 'Dept FHD vetting complete - sent to Chairperson', `Case #${caseId} is waiting for Chairperson signature.`);
    await deps.syncModuleEntries(caseId, 'awaiting_chairperson_signature', 'Awaiting Chairperson signature');
  }

  const updated = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Case missing after dept review');
  }
  return updated;
}

export async function runChairpersonSignTransition(
  caseId: number,
  comments: string | undefined,
  deps: TransitionDeps,
): Promise<TitleRegistrationCase> {
  const caseRecord = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Case not found');
  }
  if (caseRecord.case_status !== 'awaiting_chairperson_signature') {
    throw new Error('Case is not awaiting Chairperson signature.');
  }

  await deps.db('title_registration_cases').where({ id: caseId }).update({
    case_status: 'awaiting_dept_fhd_send_to_faculty',
    last_comments: comments ?? null,
    updated_at: deps.db.fn.now(),
  });

  const deptReps = await deps.getStaffEmail('dept_fhd_rep');
  await deps.queueEmail(caseId, deptReps, 'Chairperson signed - send Title Registration to Faculty', `Case #${caseId} has Chairperson signature and awaits Dept FHD send-to-Faculty action.`);
  await deps.syncModuleEntries(caseId, 'awaiting_dept_fhd_send_to_faculty', 'Chairperson signed; awaiting Dept FHD send to Faculty');

  const updated = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Case missing after chairperson signature');
  }
  return updated;
}

export async function runDeptSendToFacultyTransition(
  caseId: number,
  deps: TransitionDeps,
): Promise<TitleRegistrationCase> {
  const caseRecord = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Case not found');
  }
  if (caseRecord.case_status !== 'awaiting_dept_fhd_send_to_faculty') {
    throw new Error('Case is not awaiting Dept FHD send-to-Faculty action.');
  }

  const activeProfiles = await deps.db<SupervisorProfileForm>('supervisor_profile_forms')
    .where({ case_id: caseId })
    .whereNot({ status: 'inactive' });
  if (activeProfiles.length === 0) {
    throw new Error('No supervisor profile forms are activated yet.');
  }
  const pendingProfiles = activeProfiles.filter((profile) => profile.status !== 'completed');
  if (pendingProfiles.length > 0) {
    throw new Error(`Supervisor profile forms are incomplete (${activeProfiles.length - pendingProfiles.length}/${activeProfiles.length} completed).`);
  }

  await deps.db('title_registration_cases').where({ id: caseId }).update({
    case_status: 'sent_to_faculty_fhd',
    sent_to_faculty_at: deps.db.fn.now(),
    updated_at: deps.db.fn.now(),
  });

  const facultyReps = await deps.getStaffEmail('faculty_fhd_rep');
  const deptReps = await deps.getStaffEmail('dept_fhd_rep');
  const supervisors = await deps.getStaffEmail('supervisor');
  const coSupervisors = await deps.getStaffEmail('co_supervisor');
  const hods = await deps.getStaffEmail('hod');
  await deps.queueEmail(caseId, facultyReps, 'Title Registration sent to Faculty FHD rep', `Case #${caseId} was signed by the Chairperson and sent by Dept FHD for Faculty action.`);
  await deps.queueEmail(caseId, [...deptReps, ...supervisors, ...coSupervisors, ...hods], 'Title Registration marked Approved by Dept FHD rep', `Case #${caseId} is approved at department level and sent to Faculty FHD rep.`);
  await deps.syncModuleEntries(caseId, 'sent_to_faculty_fhd', 'Dept approved, Chairperson signed, and sent to Faculty FHD');

  const updated = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Case missing after dept send to faculty');
  }
  return updated;
}

export async function runFacultyReviewTransition(
  caseId: number,
  decision: ReviewDecision,
  comments: string | undefined,
  deps: TransitionDeps,
): Promise<TitleRegistrationCase> {
  const caseRecord = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!caseRecord) {
    throw new Error('Case not found');
  }

  if (decision === 'insufficient') {
    await deps.db('title_registration_cases').where({ id: caseId }).update({
      case_status: 'returned_by_faculty_fhd',
      faculty_reviewed_at: deps.db.fn.now(),
      last_comments: comments ?? 'Returned by Faculty FHD',
      updated_at: deps.db.fn.now(),
    });

    const supervisors = await deps.getStaffEmail('supervisor');
    const deptReps = await deps.getStaffEmail('dept_fhd_rep');
    await deps.queueEmail(caseId, [...supervisors, ...deptReps], 'Title Registration returned by Faculty FHD', comments ?? 'Please address Faculty comments.');
    await deps.syncModuleEntries(caseId, 'returned_by_faculty_fhd', 'Returned by Faculty FHD');
  } else {
    await deps.db('title_registration_cases').where({ id: caseId }).update({
      case_status: 'approved',
      faculty_reviewed_at: deps.db.fn.now(),
      last_comments: comments ?? null,
      updated_at: deps.db.fn.now(),
    });

    const facultyReps = await deps.getStaffEmail('faculty_fhd_rep');
    const deptReps = await deps.getStaffEmail('dept_fhd_rep');
    const supervisors = await deps.getStaffEmail('supervisor');
    await deps.queueEmail(caseId, [...facultyReps, ...deptReps, ...supervisors], 'Title Registration fully approved', `Case #${caseId} has been vetted and approved.`);
    await deps.syncModuleEntries(caseId, 'approved', 'Approved by Faculty FHD');
  }

  const updated = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
  if (!updated) {
    throw new Error('Case missing after faculty review');
  }
  return updated;
}

function workingDaysBetween(from: Date, to: Date): number {
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

export async function runFacultyReminderTransition(
  caseId: number,
  deps: Pick<TransitionDeps, 'db' | 'getStaffEmail' | 'queueEmail'>,
): Promise<{ sent: boolean; reason?: string }> {
  const caseRecord = await deps.db<TitleRegistrationCase>('title_registration_cases').where({ id: caseId }).first();
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

  const facultyReps = await deps.getStaffEmail('faculty_fhd_rep');
  const deptReps = await deps.getStaffEmail('dept_fhd_rep');
  await deps.queueEmail(caseId, [...facultyReps, ...deptReps], 'Reminder: Faculty action overdue on Title Registration', `Case #${caseId} has been pending Faculty action for ${days} working days.`);
  await deps.db('title_registration_cases').where({ id: caseId }).update({ last_reminder_at: deps.db.fn.now(), updated_at: deps.db.fn.now() });

  return { sent: true };
}

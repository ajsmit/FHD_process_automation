import db from '../db/knex';
import type { MouFormRecord, SupervisorProfileForm } from './contracts/titleRegistration';

export async function listPipelineItems(): Promise<Array<Record<string, unknown>>> {
  const baseRows = await db('title_registration_cases')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .select(
      'title_registration_cases.id',
      'sasi_students.student_number',
      'sasi_students.first_names',
      'sasi_students.last_name',
      'title_registration_cases.case_status',
      'title_registration_cases.completion_percent',
      'title_registration_cases.updated_at',
    )
    .orderBy('title_registration_cases.updated_at', 'desc');

  const withProfiles = await Promise.all(
    baseRows.map(async (row) => {
      const profiles = await db<SupervisorProfileForm>('supervisor_profile_forms')
        .where({ case_id: Number(row.id) })
        .whereNot({ status: 'inactive' });
      const completed = profiles.filter((profile) => profile.status === 'completed').length;
      const mou = await db<MouFormRecord>('mou_forms').where({ case_id: Number(row.id) }).first();
      return {
        ...row,
        supervisor_profiles_total: profiles.length,
        supervisor_profiles_completed: completed,
        mou_status: mou?.status ?? 'pending',
        title_formalities_finalised: profiles.length > 0 && completed === profiles.length && mou?.status === 'completed',
      };
    }),
  );

  return withProfiles;
}

export async function listTaskItems(): Promise<Array<Record<string, unknown>>> {
  return db('module_entries')
    .join('title_registration_cases', 'title_registration_cases.id', 'module_entries.case_id')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .select(
      'module_entries.id',
      'module_entries.module_name',
      'module_entries.status',
      'module_entries.summary',
      'sasi_students.student_number',
      'sasi_students.first_names',
      'sasi_students.last_name',
      'module_entries.updated_at',
    )
    .orderBy('module_entries.updated_at', 'desc');
}

export async function listExternalInviteItems(caseId: number): Promise<Array<Record<string, unknown>>> {
  const invites = await db('external_academic_profile_invites')
    .where({ case_id: caseId })
    .orderBy('id', 'desc');

  const latestByRole = new Map<string, Record<string, unknown>>();
  for (const invite of invites as Array<Record<string, unknown>>) {
    const role = String(invite.role ?? '');
    if (!role) continue;
    if (!latestByRole.has(role)) {
      latestByRole.set(role, invite);
    }
  }

  const appBase = (process.env.EXTERNAL_PROFILE_BASE_URL?.trim() || 'http://localhost:3000').replace(/\/$/, '');
  const rows: Array<Record<string, unknown>> = [];
  for (const invite of latestByRole.values()) {
    const email = String(invite.email ?? '');
    const latestMail = await db('notification_queue')
      .where({ case_id: caseId, email_to: email })
      .where('subject', 'like', '%External Academic Profile Request%')
      .orderBy('id', 'desc')
      .first();

    let deliveryStatus: 'sent' | 'queued' | 'failed' = 'queued';
    const mailStatus = String(latestMail?.status ?? '').toLowerCase();
    if (mailStatus === 'sent') {
      deliveryStatus = 'sent';
    } else if (mailStatus === 'failed') {
      deliveryStatus = 'failed';
    }

    rows.push({
      role: String(invite.role ?? ''),
      email,
      status: String(invite.status ?? ''),
      expiresAt: invite.expires_at ?? null,
      completedAt: invite.completed_at ?? null,
      updatedAt: invite.updated_at ?? null,
      inviteLink: `${appBase}/external-academic/${String(invite.token ?? '')}`,
      deliveryStatus,
      externalAcademicId: invite.external_academic_id ?? null,
    });
  }
  return rows;
}

export async function listToDoEntries(): Promise<Array<Record<string, unknown>>> {
  const moduleItems = await db('module_entries')
    .join('title_registration_cases', 'title_registration_cases.id', 'module_entries.case_id')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .whereNotIn('module_entries.status', ['completed', 'approved'])
    .select(
      'module_entries.case_id',
      'module_entries.module_name',
      'module_entries.status',
      'module_entries.summary',
      'module_entries.updated_at',
      'sasi_students.student_number',
      'sasi_students.first_names',
      'sasi_students.last_name',
    );

  const profileItems = await db('supervisor_profile_forms')
    .join('title_registration_cases', 'title_registration_cases.id', 'supervisor_profile_forms.case_id')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .whereIn('supervisor_profile_forms.status', ['draft', 'requested'])
    .whereNot('supervisor_profile_forms.status', 'inactive')
    .select(
      'supervisor_profile_forms.case_id',
      'supervisor_profile_forms.role',
      'supervisor_profile_forms.person_name',
      'supervisor_profile_forms.status',
      'supervisor_profile_forms.updated_at',
      'sasi_students.student_number',
      'sasi_students.first_names',
      'sasi_students.last_name',
    );

  const inviteItems = await db('external_academic_profile_invites')
    .join('title_registration_cases', 'title_registration_cases.id', 'external_academic_profile_invites.case_id')
    .join('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .where('external_academic_profile_invites.status', 'pending')
    .select(
      'external_academic_profile_invites.case_id',
      'external_academic_profile_invites.role',
      'external_academic_profile_invites.email',
      'external_academic_profile_invites.expires_at',
      'external_academic_profile_invites.updated_at',
      'sasi_students.student_number',
      'sasi_students.first_names',
      'sasi_students.last_name',
    );

  const notificationItems = await db('notification_queue')
    .leftJoin('title_registration_cases', 'title_registration_cases.id', 'notification_queue.case_id')
    .leftJoin('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
    .whereIn('notification_queue.status', ['queued', 'failed'])
    .select(
      'notification_queue.case_id',
      'notification_queue.subject',
      'notification_queue.email_to',
      'notification_queue.status',
      'notification_queue.created_at',
      'sasi_students.student_number',
      'sasi_students.first_names',
      'sasi_students.last_name',
    );

  const rows: Array<Record<string, unknown>> = [
    ...moduleItems.map((row) => ({
      type: 'module',
      case_id: row.case_id,
      title: `${row.module_name} (${row.status})`,
      detail: row.summary,
      student_number: row.student_number,
      student_name: `${row.first_names} ${row.last_name}`.trim(),
      updated_at: row.updated_at,
    })),
    ...profileItems.map((row) => ({
      type: 'supervisor_profile',
      case_id: row.case_id,
      title: `Supervisor profile pending: ${row.role}`,
      detail: `${row.person_name} (${row.status})`,
      student_number: row.student_number,
      student_name: `${row.first_names} ${row.last_name}`.trim(),
      updated_at: row.updated_at,
    })),
    ...inviteItems.map((row) => ({
      type: 'external_invite',
      case_id: row.case_id,
      title: `Waiting on external profile: ${row.role}`,
      detail: `${row.email} (expires ${String(row.expires_at ?? '').slice(0, 10)})`,
      student_number: row.student_number,
      student_name: `${row.first_names} ${row.last_name}`.trim(),
      updated_at: row.updated_at,
    })),
    ...notificationItems.map((row) => ({
      type: 'notification',
      case_id: row.case_id,
      title: `Notification ${row.status}`,
      detail: `${row.subject} -> ${row.email_to}`,
      student_number: row.student_number ?? '',
      student_name: `${row.first_names ?? ''} ${row.last_name ?? ''}`.trim(),
      updated_at: row.created_at,
    })),
  ];

  return rows.sort((a, b) => String(b.updated_at ?? '').localeCompare(String(a.updated_at ?? '')));
}

export async function listPeopleEntries(): Promise<Array<Record<string, unknown>>> {
  return db('sasi_staff').select('*').orderBy('full_name', 'asc');
}

export async function listNotificationEntries(caseId?: number): Promise<Array<Record<string, unknown>>> {
  const query = db('notification_queue').select('*').orderBy('created_at', 'desc');
  if (caseId) {
    query.where({ case_id: caseId });
  }
  return query;
}

import db from '../db/knex';
import {
  decryptInviteToken,
  encryptInviteToken,
  generateInviteToken,
  hashInviteToken,
} from '../auth/inviteTokenService';
import { updateForm } from './titleRegistrationWorkflowService';
import type { FormData } from './contracts/titleRegistration';
import { sendEmail } from './emailService';

type InviteRole = 'supervisor' | 'admin' | 'co1' | 'co2';
type IdentifierType = 'SA_ID' | 'PASSPORT' | 'OTHER';

interface InviteRow {
  id: number;
  case_id: number | null;
  role: InviteRole;
  email: string;
  token: string;
  token_hash?: string | null;
  token_ciphertext?: string | null;
  status: 'pending' | 'completed' | 'expired';
  expires_at: string | null;
  completed_at: string | null;
  external_academic_id: number | null;
  created_at: string;
  updated_at: string;
}

interface InviteContextRow {
  student_first_names: string | null;
  student_last_name: string | null;
  form_data_json: string | null;
}

interface ExternalAcademicInput {
  title: string;
  first_name: string;
  middle_names?: string;
  preferred_name?: string;
  last_name: string;
  highest_qualification: string;
  email: string;
  alternate_email?: string;
  preferred_contact_method?: string;
  address: string;
  city?: string;
  province_state?: string;
  postal_code?: string;
  country: string;
  phone?: string;
  affiliation_institution?: string;
  affiliation_department?: string;
  affiliation_position_title?: string;
  orcid?: string;
  website_url?: string;
  google_scholar_url?: string;
  scopus_id?: string;
  expertise_keywords?: string;
  identifier_type: IdentifierType;
  identifier_value: string;
}

export interface InviteResult {
  inviteId: number;
  token: string;
  inviteLink: string;
  expiresAt: string;
  deliveryStatus: 'sent' | 'queued' | 'failed';
}

function clean(value: string | undefined | null): string {
  return String(value ?? '').trim();
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(professor|prof|associate|dr|mr|mrs|ms|prof\.)\b/g, '')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeIdentifier(type: IdentifierType, raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return `${type}:${cleaned}`;
}

function validateIdentifier(type: IdentifierType, value: string): void {
  const cleaned = value.replace(/\s+/g, '');
  if (!cleaned) {
    throw new Error('A unique identifier is required (SA ID, passport number, or other unique ID).');
  }
  if (type === 'SA_ID' && !/^\d{13}$/.test(cleaned)) {
    throw new Error('South African ID number must be exactly 13 digits.');
  }
  if (type === 'PASSPORT' && cleaned.length < 5) {
    throw new Error('Passport number appears invalid.');
  }
  if (type === 'OTHER' && cleaned.length < 4) {
    throw new Error('Other unique identifier appears invalid.');
  }
}

function validateRole(role: string): asserts role is InviteRole {
  if (role !== 'supervisor' && role !== 'admin' && role !== 'co1' && role !== 'co2') {
    throw new Error('Role must be supervisor, admin, co1, or co2.');
  }
}

function parseCaseFormData(raw: unknown): Record<string, unknown> {
  if (typeof raw !== 'string' || !raw.trim()) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

async function findInviteByPresentedToken(token: string): Promise<InviteRow | undefined> {
  const tokenHash = hashInviteToken(token);
  const invite = await db<InviteRow>('external_academic_profile_invites')
    .where({ token_hash: tokenHash })
    .first();
  if (invite) {
    return invite;
  }
  // Backward compatibility for legacy rows that still stored raw token.
  return db<InviteRow>('external_academic_profile_invites')
    .where({ token })
    .first();
}

function resolveStoredInviteToken(invite: InviteRow): string | null {
  const encrypted = clean(invite.token_ciphertext ?? '');
  if (encrypted) {
    try {
      return decryptInviteToken(encrypted);
    } catch {
      return null;
    }
  }

  const legacyToken = clean(invite.token);
  const hasHash = clean(invite.token_hash ?? '');
  // If the token column carries only hash material, no raw token is available.
  if (hasHash && legacyToken === hasHash) {
    return null;
  }
  return legacyToken || null;
}

function deriveThesisType(formData: Record<string, unknown>): string {
  const options: Array<{ key: string; label: string }> = [
    { key: 'PhD by traditional thesis format', label: 'PhD by traditional thesis format' },
    { key: 'PhD by publication', label: 'PhD by publication' },
    { key: 'Masters Full-thesis', label: 'Masters Full-thesis' },
    { key: 'Masters Mini thesis', label: 'Masters Mini thesis' },
    { key: 'Masters by publication', label: 'Masters by publication' },
  ];
  const selected = options.find((option) => formData[option.key] === true);
  const degree = clean(String(formData.Degree ?? ''));
  return selected?.label ?? (degree || 'Not specified');
}

function sanitizeThesisTitle(value: string): string {
  return clean(value).replace(/\.+$/, '').trim();
}

function deriveInviteeName(
  role: InviteRole,
  formData: Record<string, unknown>,
): { inviteeTitle: string; inviteeFirstName: string; inviteeSurname: string } {
  if (role === 'supervisor') {
    return {
      inviteeTitle: clean(String(formData['Supervisor Title'] ?? '')),
      inviteeFirstName: clean(String(formData['Supervisor External First Name'] ?? '')),
      inviteeSurname: clean(String(formData['Supervisor External Surname'] ?? '')),
    };
  }
  if (role === 'admin') {
    return {
      inviteeTitle: clean(String(formData['Administrative Supervisor External Title'] ?? '')),
      inviteeFirstName: clean(String(formData['Administrative Supervisor External First Name'] ?? '')),
      inviteeSurname: clean(String(formData['Administrative Supervisor External Surname'] ?? '')),
    };
  }
  if (role === 'co1') {
    return {
      inviteeTitle: clean(String(formData['Co-supervisor Title'] ?? '')),
      inviteeFirstName: clean(String(formData['Co-supervisor External First Name'] ?? '')),
      inviteeSurname: clean(String(formData['Co-supervisor External Surname'] ?? '')),
    };
  }
  return {
    inviteeTitle: clean(String(formData['Second Co-supervisor Title'] ?? '')),
    inviteeFirstName: clean(String(formData['Second Co-supervisor External First Name'] ?? '')),
    inviteeSurname: clean(String(formData['Second Co-supervisor External Surname'] ?? '')),
  };
}

function externalPatchForRole(role: InviteRole, externalAcademicId: number, payload: ExternalAcademicInput): Partial<FormData> {
  const fullName = `${clean(payload.first_name)} ${clean(payload.last_name)}`.replace(/\s+/g, ' ').trim();
  if (role === 'supervisor') {
    return {
      'Supervisor is UWC-internal': 'No',
      'Supervisor External Lookup Id': String(externalAcademicId),
      'Supervisor Title': clean(payload.title),
      'Supervisor External First Name': clean(payload.first_name),
      'Supervisor External Surname': clean(payload.last_name),
      'Supervisor Qualifications': clean(payload.highest_qualification),
      'Supervisor External Address': clean(payload.address),
      'Supervisor External Email': clean(payload.email),
      Supervisor: fullName,
    };
  }

  if (role === 'admin') {
    return {
      'Administrative Supervisor same as Supervisor': 'No',
      'Administrative Supervisor is UWC-internal': 'No',
      'Administrative Supervisor External Lookup Id': String(externalAcademicId),
      'Administrative Supervisor External Title': clean(payload.title),
      'Administrative Supervisor External First Name': clean(payload.first_name),
      'Administrative Supervisor External Surname': clean(payload.last_name),
      'Administrative Supervisor Qualifications (Nominal Role)': clean(payload.highest_qualification),
      'Administrative Supervisor External Address': clean(payload.address),
      'Administrative Supervisor External Email': clean(payload.email),
      'Administrative Supervisor (Nominal Role)': fullName,
    };
  }

  if (role === 'co1') {
    return {
      'Has Co-supervisor?': 'Yes',
      'Co-supervisor is UWC-internal': 'No',
      'Co-supervisor External Lookup Id': String(externalAcademicId),
      'Co-supervisor Title': clean(payload.title),
      'Co-supervisor External First Name': clean(payload.first_name),
      'Co-supervisor External Surname': clean(payload.last_name),
      'Co-supervisor Qualifications': clean(payload.highest_qualification),
      'Co-supervisor External Address': clean(payload.address),
      'Co-supervisor External Email': clean(payload.email),
      'Co-supervisor': fullName,
    };
  }

  return {
    'Has Co-supervisor?': 'Yes',
    'Second Co-supervisor is UWC-internal': 'No',
    'Second Co-supervisor External Lookup Id': String(externalAcademicId),
    'Second Co-supervisor Title': clean(payload.title),
    'Second Co-supervisor External First Name': clean(payload.first_name),
    'Second Co-supervisor External Surname': clean(payload.last_name),
    'Second Co-supervisor Qualifications': clean(payload.highest_qualification),
    'Second Co-supervisor External Address': clean(payload.address),
    'Second Co-supervisor External Email': clean(payload.email),
    'Second Co-supervisor': fullName,
  };
}

export async function createExternalAcademicInvite(caseId: number, roleInput: string, emailInput: string): Promise<InviteResult> {
  validateRole(roleInput);
  const email = clean(emailInput).toLowerCase();
  if (!isEmail(email)) {
    throw new Error('Please provide a valid email address for the external academic.');
  }

  const caseRow = await db('title_registration_cases').where({ id: caseId }).first();
  if (!caseRow) {
    throw new Error('Title registration case not found for invite request.');
  }

  const token = generateInviteToken();
  const tokenHash = hashInviteToken(token);
  const tokenCiphertext = encryptInviteToken(token);
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  const [inviteId] = await db('external_academic_profile_invites').insert({
    case_id: caseId,
    role: roleInput,
    email,
    token: tokenHash,
    token_hash: tokenHash,
    token_ciphertext: tokenCiphertext,
    status: 'pending',
    expires_at: expiresAt.toISOString(),
  });

  const appBase = process.env.EXTERNAL_PROFILE_BASE_URL?.trim() || 'http://localhost:3000';
  const inviteLink = `${appBase.replace(/\/$/, '')}/external-academic/${token}`;

  const subject = 'UWC External Academic Profile Request';
  const body =
    `You have been requested to provide your details for UWC postgraduate workflow role "${roleInput}". ` +
    `Please complete this secure web form: ${inviteLink} . This link expires on ${expiresAt.toISOString().slice(0, 10)}.`;

  const [notificationId] = await db('notification_queue').insert({
    case_id: caseId,
    email_to: email,
    subject,
    body,
    status: 'queued',
  });

  let deliveryStatus: 'sent' | 'queued' | 'failed' = 'queued';
  const delivery = await sendEmail({ to: email, subject, text: body });
  if (delivery.sent) {
    deliveryStatus = 'sent';
    await db('notification_queue').where({ id: Number(notificationId) }).update({ status: 'sent' });
  } else if (delivery.reason && delivery.reason !== 'SMTP is not configured.') {
    deliveryStatus = 'failed';
    await db('notification_queue').where({ id: Number(notificationId) }).update({
      status: 'failed',
      body: `${body}\n\nDelivery error: ${delivery.reason}`,
    });
  }

  return {
    inviteId: Number(inviteId),
    token,
    inviteLink,
    expiresAt: expiresAt.toISOString(),
    deliveryStatus,
  };
}

export async function getExternalAcademicInvite(tokenInput: string): Promise<{
  role: InviteRole;
  email: string;
  expiresAt: string | null;
  caseId: number | null;
  studentName: string;
  thesisType: string;
  thesisTitle: string;
  inviteeTitle: string;
  inviteeFirstName: string;
  inviteeSurname: string;
}> {
  const token = clean(tokenInput);
  const invite = await findInviteByPresentedToken(token);
  if (!invite) {
    throw new Error('Invite link not found.');
  }
  if (invite.status !== 'pending') {
    throw new Error('This invite link has already been used.');
  }
  if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) {
    await db('external_academic_profile_invites').where({ id: invite.id }).update({ status: 'expired', updated_at: db.fn.now() });
    throw new Error('This invite link has expired.');
  }

  const inviteHash = hashInviteToken(token);
  const inviteCiphertext = encryptInviteToken(token);
  await db('external_academic_profile_invites').where({ id: invite.id }).update({
    token: inviteHash,
    token_hash: inviteHash,
    token_ciphertext: inviteCiphertext,
    updated_at: db.fn.now(),
  });

  let studentName = 'Student';
  let thesisType = 'Not specified';
  let thesisTitle = 'Not specified';
  let inviteeTitle = '';
  let inviteeFirstName = '';
  let inviteeSurname = '';
  if (invite.case_id) {
    const context = await db('title_registration_cases')
      .leftJoin('sasi_students', 'sasi_students.id', 'title_registration_cases.sasi_student_id')
      .where('title_registration_cases.id', invite.case_id)
      .first<InviteContextRow>(
        db.raw('sasi_students.first_names as student_first_names'),
        db.raw('sasi_students.last_name as student_last_name'),
        db.raw('title_registration_cases.form_data_json as form_data_json'),
      );

    const formData = parseCaseFormData(context?.form_data_json);
    const nameFromForm = `${clean(String(formData['Student First-Name'] ?? ''))} ${clean(String(formData['Student Surname'] ?? ''))}`.replace(/\s+/g, ' ').trim();
    const nameFromSasi = `${clean(context?.student_first_names)} ${clean(context?.student_last_name)}`.replace(/\s+/g, ' ').trim();
    studentName = nameFromForm || nameFromSasi || studentName;
    thesisType = deriveThesisType(formData);
    thesisTitle = sanitizeThesisTitle(String(formData['Thesis title'] ?? '')) || thesisTitle;
    const inviteeName = deriveInviteeName(invite.role, formData);
    inviteeTitle = inviteeName.inviteeTitle;
    inviteeFirstName = inviteeName.inviteeFirstName;
    inviteeSurname = inviteeName.inviteeSurname;
  }

  return {
    role: invite.role,
    email: invite.email,
    expiresAt: invite.expires_at,
    caseId: invite.case_id,
    studentName,
    thesisType,
    thesisTitle,
    inviteeTitle,
    inviteeFirstName,
    inviteeSurname,
  };
}

export async function completeExternalAcademicInvite(tokenInput: string, payloadInput: ExternalAcademicInput): Promise<{ externalAcademicId: number; caseUpdated: boolean }> {
  const token = clean(tokenInput);
  const invite = await findInviteByPresentedToken(token);
  if (!invite) {
    throw new Error('Invite link not found.');
  }
  if (invite.status !== 'pending') {
    throw new Error('This invite link is no longer active.');
  }
  if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) {
    await db('external_academic_profile_invites').where({ id: invite.id }).update({ status: 'expired', updated_at: db.fn.now() });
    throw new Error('This invite link has expired.');
  }

  const inviteHash = hashInviteToken(token);
  const inviteCiphertext = encryptInviteToken(token);
  await db('external_academic_profile_invites').where({ id: invite.id }).update({
    token: inviteHash,
    token_hash: inviteHash,
    token_ciphertext: inviteCiphertext,
    updated_at: db.fn.now(),
  });

  const payload: ExternalAcademicInput = {
    ...payloadInput,
    title: clean(payloadInput.title),
    first_name: clean(payloadInput.first_name),
    middle_names: clean(payloadInput.middle_names),
    preferred_name: clean(payloadInput.preferred_name),
    last_name: clean(payloadInput.last_name),
    highest_qualification: clean(payloadInput.highest_qualification),
    email: clean(payloadInput.email).toLowerCase(),
    alternate_email: clean(payloadInput.alternate_email).toLowerCase(),
    preferred_contact_method: clean(payloadInput.preferred_contact_method),
    address: clean(payloadInput.address),
    city: clean(payloadInput.city),
    province_state: clean(payloadInput.province_state),
    postal_code: clean(payloadInput.postal_code),
    country: clean(payloadInput.country),
    phone: clean(payloadInput.phone),
    affiliation_institution: clean(payloadInput.affiliation_institution),
    affiliation_department: clean(payloadInput.affiliation_department),
    affiliation_position_title: clean(payloadInput.affiliation_position_title),
    orcid: clean(payloadInput.orcid),
    website_url: clean(payloadInput.website_url),
    google_scholar_url: clean(payloadInput.google_scholar_url),
    scopus_id: clean(payloadInput.scopus_id),
    expertise_keywords: clean(payloadInput.expertise_keywords),
    identifier_type: payloadInput.identifier_type,
    identifier_value: clean(payloadInput.identifier_value),
  };

  if (!payload.first_name || !payload.last_name) {
    throw new Error('First name and surname are required.');
  }
  if (!payload.title) {
    throw new Error('Title is required.');
  }
  if (!payload.highest_qualification) {
    throw new Error('Highest qualification is required.');
  }
  if (!payload.address) {
    throw new Error('Address is required.');
  }
  if (!payload.country) {
    throw new Error('Country is required.');
  }
  if (!isEmail(payload.email)) {
    throw new Error('A valid primary email address is required.');
  }
  if (payload.alternate_email && !isEmail(payload.alternate_email)) {
    throw new Error('Alternate email format is invalid.');
  }
  if (!payload.identifier_type || (payload.identifier_type !== 'SA_ID' && payload.identifier_type !== 'PASSPORT' && payload.identifier_type !== 'OTHER')) {
    throw new Error('Identifier type must be SA_ID, PASSPORT, or OTHER.');
  }
  validateIdentifier(payload.identifier_type, payload.identifier_value);

  const normalizedUniqueIdentifier = normalizeIdentifier(payload.identifier_type, payload.identifier_value);
  const fullName = `${payload.title} ${payload.first_name} ${payload.last_name}`.replace(/\s+/g, ' ').trim();
  const normalizedFullName = normalizeName(fullName);

  const existingByIdentifier = await db('external_academic_registry').where({ normalized_unique_identifier: normalizedUniqueIdentifier }).first();
  const existingByEmail = await db('external_academic_registry').whereRaw('LOWER(email) = ?', [payload.email]).first();
  const existing = existingByIdentifier ?? existingByEmail ?? null;

  if (existingByIdentifier && existingByEmail && existingByIdentifier.id !== existingByEmail.id) {
    throw new Error('Identifier and email match different registry records. Please contact administrator.');
  }

  let externalAcademicId = 0;
  if (existing) {
    await db('external_academic_registry').where({ id: existing.id }).update({
      title: payload.title,
      first_name: payload.first_name,
      middle_names: payload.middle_names,
      preferred_name: payload.preferred_name,
      last_name: payload.last_name,
      full_name: fullName,
      normalized_full_name: normalizedFullName,
      unique_identifier_type: payload.identifier_type,
      unique_identifier_value: payload.identifier_value,
      normalized_unique_identifier: normalizedUniqueIdentifier,
      highest_qualification: payload.highest_qualification,
      email: payload.email,
      alternate_email: payload.alternate_email,
      preferred_contact_method: payload.preferred_contact_method,
      address: payload.address,
      city: payload.city,
      province_state: payload.province_state,
      postal_code: payload.postal_code,
      country: payload.country,
      phone: payload.phone,
      affiliation_institution: payload.affiliation_institution,
      affiliation_department: payload.affiliation_department,
      affiliation_position_title: payload.affiliation_position_title,
      orcid: payload.orcid,
      website_url: payload.website_url,
      google_scholar_url: payload.google_scholar_url,
      scopus_id: payload.scopus_id,
      expertise_keywords: payload.expertise_keywords,
      active_status: 1,
      updated_at: db.fn.now(),
    });
    externalAcademicId = Number(existing.id);
  } else {
    const [createdId] = await db('external_academic_registry').insert({
      title: payload.title,
      first_name: payload.first_name,
      middle_names: payload.middle_names,
      preferred_name: payload.preferred_name,
      last_name: payload.last_name,
      full_name: fullName,
      normalized_full_name: normalizedFullName,
      unique_identifier_type: payload.identifier_type,
      unique_identifier_value: payload.identifier_value,
      normalized_unique_identifier: normalizedUniqueIdentifier,
      highest_qualification: payload.highest_qualification,
      email: payload.email,
      alternate_email: payload.alternate_email,
      preferred_contact_method: payload.preferred_contact_method,
      address: payload.address,
      city: payload.city,
      province_state: payload.province_state,
      postal_code: payload.postal_code,
      country: payload.country,
      phone: payload.phone,
      affiliation_institution: payload.affiliation_institution,
      affiliation_department: payload.affiliation_department,
      affiliation_position_title: payload.affiliation_position_title,
      orcid: payload.orcid,
      website_url: payload.website_url,
      google_scholar_url: payload.google_scholar_url,
      scopus_id: payload.scopus_id,
      expertise_keywords: payload.expertise_keywords,
      active_status: 1,
    });
    externalAcademicId = Number(createdId);
  }

  await db('external_academic_profile_invites').where({ id: invite.id }).update({
    status: 'completed',
    completed_at: db.fn.now(),
    external_academic_id: externalAcademicId,
    updated_at: db.fn.now(),
  });

  let caseUpdated = false;
  if (invite.case_id) {
    const patch = externalPatchForRole(invite.role, externalAcademicId, payload);
    await updateForm(invite.case_id, patch);
    caseUpdated = true;
  }

  return { externalAcademicId, caseUpdated };
}

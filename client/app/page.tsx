'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Mail, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/search-input';
import { SidebarItem } from '@/components/ui/sidebar-item';
import { TitleRegistrationModule } from './title-registration/components/TitleRegistrationModule';
import {
  getAppointArbiter,
  getAppointExaminers,
  getChangeExaminers,
  chairpersonSign,
  checkSasi,
  createExternalAcademicInvite,
  completeMou,
  deptSendFaculty,
  deptReview,
  facultyReview,
  getDirectoryStaff,
  getExternalAcademics,
  getExternalInviteStatuses,
  generatePrintPdf,
  getExaminerSummaryCv,
  getIntentionToSubmit,
  getMou,
  getNotifications,
  getPeople,
  getPipeline,
  getSupervisorProfiles,
  getTasks,
  getToDo,
  patchForm,
  patchAppointArbiter,
  patchAppointExaminers,
  patchChangeExaminers,
  patchExaminerSummaryCv,
  patchIntentionToSubmit,
  patchMou,
  patchSupervisorProfile,
  printMou,
  requestSupervisorProfiles,
  sendReminder,
  sendSupervisorProfilesReminder,
  studentVet,
  submitSupervisorProfile,
  submitAppointArbiter,
  submitAppointExaminers,
  submitChangeExaminers,
  submitExaminerSummaryCv,
  submitIntentionToSubmit,
  supervisorReview,
  uploadSupervisorProfileCv,
  resolveApiOrigin,
  type AppointArbiterFormData,
  type AppointExaminersFormData,
  type CaseStatus,
  type ChangeExaminersFormData,
  type ExaminerSummaryCvFormData,
  type ExternalAcademicDirectory,
  type ExternalInviteStatus,
  type FormData,
  type IntentionToSubmitFormData,
  type ModuleFormRecord,
  type MouFormData,
  type MouFormRecord,
  type ReviewDecision,
  type SasiStudent,
  type StaffDirectory,
  type SupervisorProfileForm,
  type TitleRegistrationCase,
} from '@/lib/api';

const modules = [
  'title_registration',
  'to_do',
  'supervisor_profiles',
  'mou',
  'intention_to_submit',
  'appoint_examiners',
  'change_examiners',
  'examiner_summary_cv',
  'appoint_arbiter',
  'pipeline',
  'tasks',
  'people',
  'approvals',
  'system',
  'radar',
  'timelines',
  'calendar',
  'kanban',
  'team',
  'policy',
];

const apiOrigin = resolveApiOrigin();

function statusLabel(status: CaseStatus): string {
  const map: Record<CaseStatus, string> = {
    awaiting_student_vetting: 'Awaiting student vetting',
    awaiting_supervisor_review: 'Awaiting supervisor review',
    returned_by_supervisor: 'Returned by supervisor',
    awaiting_dept_fhd_review: 'Awaiting Dept FHD review',
    awaiting_chairperson_signature: 'Awaiting Chairperson signature',
    awaiting_dept_fhd_send_to_faculty: 'Awaiting Dept FHD send to Faculty',
    returned_by_dept_fhd: 'Returned by Dept FHD',
    sent_to_faculty_fhd: 'Sent to Faculty FHD',
    returned_by_faculty_fhd: 'Returned by Faculty FHD',
    approved: 'Approved',
  };
  return map[status];
}

function statusTone(status: CaseStatus): 'approved' | 'in_progress' | 'action_required' {
  if (status === 'approved') return 'approved';
  if (status.includes('returned')) return 'action_required';
  return 'in_progress';
}

const readonlyFormFields: Array<keyof FormData> = [
  'Student Title',
  'Student First-Name',
  'Student Surname',
  'Student Number',
  'Department',
  'Degree',
  'Date of first title registration on SASI',
  'Student registration active on SASI',
  'Year first registered',
  'Has the MOU been submitted?',
];

export default function Page() {
  const [activeModule, setActiveModule] = useState('title_registration');
  const [studentNumber, setStudentNumber] = useState('1234567');
  const [student, setStudent] = useState<SasiStudent | null>(null);
  const [caseRecord, setCaseRecord] = useState<TitleRegistrationCase | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [pipeline, setPipeline] = useState<Array<Record<string, unknown>>>([]);
  const [toDoItems, setToDoItems] = useState<Array<Record<string, unknown>>>([]);
  const [tasks, setTasks] = useState<Array<Record<string, unknown>>>([]);
  const [people, setPeople] = useState<Array<Record<string, unknown>>>([]);
  const [peopleDirectory, setPeopleDirectory] = useState<StaffDirectory[]>([]);
  const [bcbDirectory, setBcbDirectory] = useState<StaffDirectory[]>([]);
  const [externalDirectory, setExternalDirectory] = useState<ExternalAcademicDirectory[]>([]);
  const [supervisorProfiles, setSupervisorProfiles] = useState<SupervisorProfileForm[]>([]);
  const [mouRecord, setMouRecord] = useState<MouFormRecord | null>(null);
  const [mouData, setMouData] = useState<MouFormData | null>(null);
  const [mouPdfPath, setMouPdfPath] = useState<string | null>(null);
  const [itsRecord, setItsRecord] = useState<ModuleFormRecord | null>(null);
  const [itsData, setItsData] = useState<IntentionToSubmitFormData | null>(null);
  const [appointRecord, setAppointRecord] = useState<ModuleFormRecord | null>(null);
  const [appointData, setAppointData] = useState<AppointExaminersFormData | null>(null);
  const [changeRecord, setChangeRecord] = useState<ModuleFormRecord | null>(null);
  const [changeData, setChangeData] = useState<ChangeExaminersFormData | null>(null);
  const [summaryRecord, setSummaryRecord] = useState<ModuleFormRecord | null>(null);
  const [summaryData, setSummaryData] = useState<ExaminerSummaryCvFormData | null>(null);
  const [arbiterRecord, setArbiterRecord] = useState<ModuleFormRecord | null>(null);
  const [arbiterData, setArbiterData] = useState<AppointArbiterFormData | null>(null);
  const [notifications, setNotifications] = useState<Array<Record<string, unknown>>>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [decision, setDecision] = useState<ReviewDecision>('vetted');
  const [comments, setComments] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [externalSearchByRole, setExternalSearchByRole] = useState<Record<'supervisor' | 'admin' | 'co1' | 'co2', string>>({
    supervisor: '',
    admin: '',
    co1: '',
    co2: '',
  });
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteStatusByRole, setInviteStatusByRole] = useState<Record<'supervisor' | 'admin' | 'co1' | 'co2', ExternalInviteStatus | null>>({
    supervisor: null,
    admin: null,
    co1: null,
    co2: null,
  });

  const printUrl = useMemo(() => {
    if (!pdfPath) return null;
    const idx = pdfPath.indexOf('/generated_forms/');
    if (idx === -1) return null;
    return `${apiOrigin}${pdfPath.slice(idx)}`;
  }, [pdfPath]);

  const mouPrintUrl = useMemo(() => {
    if (!mouPdfPath) return null;
    const idx = mouPdfPath.indexOf('/generated_forms/');
    if (idx === -1) return null;
    return `${apiOrigin}${mouPdfPath.slice(idx)}`;
  }, [mouPdfPath]);

  async function refreshCaseNotifications(id: number) {
    const noteResponse = await getNotifications(id);
    setNotifications(noteResponse.data);
  }

  async function refreshSupervisorProfiles(caseId: number) {
    const response = await getSupervisorProfiles(caseId);
    setSupervisorProfiles(response.data);
  }

  async function refreshMou(caseId: number) {
    const response = await getMou(caseId);
    setMouRecord(response.record);
    setMouData(response.formData);
    setMouPdfPath(response.record.pdf_path);
  }

  async function refreshIntentionToSubmit(caseId: number) {
    const response = await getIntentionToSubmit(caseId);
    setItsRecord(response.record);
    setItsData(response.formData);
  }

  async function refreshAppointExaminers(caseId: number) {
    const response = await getAppointExaminers(caseId);
    setAppointRecord(response.record);
    setAppointData(response.formData);
  }

  async function refreshChangeExaminers(caseId: number) {
    const response = await getChangeExaminers(caseId);
    setChangeRecord(response.record);
    setChangeData(response.formData);
  }

  async function refreshExaminerSummaryCv(caseId: number) {
    const response = await getExaminerSummaryCv(caseId);
    setSummaryRecord(response.record);
    setSummaryData(response.formData);
  }

  async function refreshAppointArbiter(caseId: number) {
    const response = await getAppointArbiter(caseId);
    setArbiterRecord(response.record);
    setArbiterData(response.formData);
  }

  async function refreshExternalInviteStatuses(caseId: number) {
    const response = await getExternalInviteStatuses(caseId);
    const next: Record<'supervisor' | 'admin' | 'co1' | 'co2', ExternalInviteStatus | null> = {
      supervisor: null,
      admin: null,
      co1: null,
      co2: null,
    };
    for (const status of response.data) {
      next[status.role] = status;
    }
    setInviteStatusByRole(next);
  }

  async function runSasiCheck() {
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const response = await checkSasi(studentNumber.trim());
      if (!response.eligible || !response.caseRecord || !response.formData || !response.student) {
        setError(response.reasons.join(' '));
        return;
      }
      setStudent(response.student);
      setCaseRecord(response.caseRecord);
      setFormData(response.formData);
      setPdfPath(response.caseRecord.pdf_path);
      const [peopleResult, bcbResult, externalResult] = await Promise.all([
        getDirectoryStaff({ internalOnly: true }),
        getDirectoryStaff({ department: 'Department of Biodiversity and Conservation Biology', internalOnly: true }),
        getExternalAcademics(),
      ]);
      setPeopleDirectory(peopleResult.data);
      setBcbDirectory(bcbResult.data);
      setExternalDirectory(externalResult.data);
      await refreshCaseNotifications(response.caseRecord.id);
      await refreshExternalInviteStatuses(response.caseRecord.id);
      await refreshSupervisorProfiles(response.caseRecord.id);
      try {
        await refreshMou(response.caseRecord.id);
      } catch {
        setMouRecord(null);
        setMouData(null);
        setMouPdfPath(null);
      }
      setInfo('SASI check passed and form prefilled.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'SASI check failed');
    } finally {
      setLoading(false);
    }
  }

  async function saveField(label: keyof FormData, value: string | boolean) {
    if (!caseRecord || !formData) return;
    const next = { ...formData, [label]: value };
    setFormData(next);
    try {
      const response = await patchForm(caseRecord.id, { [label]: value } as Partial<FormData>);
      setCaseRecord(response.case);
      setFormData(response.formData);
      const now = new Date();
      const stamp = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}`;
      setLastSavedAt(now.toISOString());
      await refreshSupervisorProfiles(caseRecord.id);
      if (mouRecord?.status !== 'completed') {
        try {
          await refreshMou(caseRecord.id);
        } catch {
          // MOU prerequisites may not be met yet.
        }
      }
      setInfo(`Saved ${label}. Information saved at ${stamp}.`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save field');
    }
  }

  async function saveFields(patch: Partial<FormData>) {
    if (!caseRecord || !formData) return;
    const next = { ...formData, ...patch };
    setFormData(next);
    try {
      const response = await patchForm(caseRecord.id, patch);
      setCaseRecord(response.case);
      setFormData(response.formData);
      const now = new Date();
      const stamp = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}`;
      setLastSavedAt(now.toISOString());
      setInfo(`Information saved at ${stamp}.`);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save form fields');
    }
  }

  async function saveSupervisorFields(patch: Partial<FormData>) {
    if (!formData) return;
    const merged = { ...formData, ...patch };
    const nextPatch: Partial<FormData> = { ...patch };

    if (merged['Administrative Supervisor same as Supervisor'] === 'Yes') {
      nextPatch['Administrative Supervisor is UWC-internal'] = merged['Supervisor is UWC-internal'];
      if (merged['Supervisor is UWC-internal'] === 'Yes') {
        nextPatch['Administrative Supervisor (Nominal Role)'] = merged.Supervisor;
        nextPatch['Administrative Supervisor Qualifications (Nominal Role)'] = merged['Supervisor Qualifications'];
      } else {
        const fullName = `${merged['Supervisor External First Name']} ${merged['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
        nextPatch['Administrative Supervisor (Nominal Role)'] = fullName;
        nextPatch['Administrative Supervisor External Title'] = merged['Supervisor Title'];
        nextPatch['Administrative Supervisor External First Name'] = merged['Supervisor External First Name'];
        nextPatch['Administrative Supervisor External Surname'] = merged['Supervisor External Surname'];
        nextPatch['Administrative Supervisor Qualifications (Nominal Role)'] = merged['Supervisor Qualifications'];
        nextPatch['Administrative Supervisor External Address'] = merged['Supervisor External Address'];
        nextPatch['Administrative Supervisor External Email'] = merged['Supervisor External Email'];
        nextPatch['Administrative Supervisor External Lookup Id'] = merged['Supervisor External Lookup Id'];
      }
    }

    await saveFields(nextPatch);
  }

  function updateLocalFields(patch: Partial<FormData>) {
    setFormData((prev) => (prev ? { ...prev, ...patch } : prev));
    setError(null);
  }

  function buildPersistablePatch(data: FormData): Partial<FormData> {
    const patch: Partial<FormData> = {};
    for (const key of Object.keys(data) as Array<keyof FormData>) {
      if (!readonlyFormFields.includes(key)) {
        (patch as Record<string, string | boolean>)[key] = data[key] as string | boolean;
      }
    }
    return patch;
  }

  async function persistCurrentForm(successPrefix?: string): Promise<boolean> {
    if (!caseRecord || !formData) return false;
    const response = await patchForm(caseRecord.id, buildPersistablePatch(formData));
    setCaseRecord(response.case);
    setFormData(response.formData);
    const now = new Date();
    const stamp = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}`;
    setLastSavedAt(now.toISOString());
    setInfo(successPrefix ? `${successPrefix} Information saved at ${stamp}.` : `Information saved at ${stamp}.`);
    return true;
  }

  async function saveCoSupervisorFields(patch: Partial<FormData>) {
    await saveFields({
      'Has Co-supervisor?': 'Yes',
      ...patch,
    });
  }

  function getCoSupervisorCount(data: FormData): 0 | 1 | 2 {
    if (data['Has Co-supervisor?'] === 'No') {
      return 0;
    }
    if (data['Second Co-supervisor Title'].trim().toUpperCase() !== 'NA') {
      return 2;
    }
    return 1;
  }

  async function setCoSupervisorCount(count: 0 | 1 | 2) {
    if (!formData) return;
    if (count === 0) {
      await saveFields({
        'Has Co-supervisor?': 'No',
        'Co-supervisor Title': 'NA',
        'Co-supervisor': 'NA',
        'Co-supervisor Qualifications': 'NA',
        'Co-supervisor is UWC-internal': 'Yes',
        'Co-supervisor External Lookup Id': '',
        'Co-supervisor External First Name': '',
        'Co-supervisor External Surname': '',
        'Co-supervisor External Address': '',
        'Co-supervisor External Email': '',
        'Second Co-supervisor Title': 'NA',
        'Second Co-supervisor': 'NA',
        'Second Co-supervisor Qualifications': 'NA',
        'Second Co-supervisor is UWC-internal': 'Yes',
        'Second Co-supervisor External Lookup Id': '',
        'Second Co-supervisor External First Name': '',
        'Second Co-supervisor External Surname': '',
        'Second Co-supervisor External Address': '',
        'Second Co-supervisor External Email': '',
      });
      return;
    }

    if (count === 1) {
      await saveFields({
        'Has Co-supervisor?': 'Yes',
        'Co-supervisor Title': formData['Co-supervisor Title'] === 'NA' ? 'Dr' : formData['Co-supervisor Title'],
        'Co-supervisor': formData['Co-supervisor'] === 'NA' ? '' : formData['Co-supervisor'],
        'Co-supervisor Qualifications': formData['Co-supervisor Qualifications'] === 'NA' ? '' : formData['Co-supervisor Qualifications'],
        'Second Co-supervisor Title': 'NA',
        'Second Co-supervisor': 'NA',
        'Second Co-supervisor Qualifications': 'NA',
        'Second Co-supervisor is UWC-internal': 'Yes',
        'Second Co-supervisor External Lookup Id': '',
        'Second Co-supervisor External First Name': '',
        'Second Co-supervisor External Surname': '',
        'Second Co-supervisor External Address': '',
        'Second Co-supervisor External Email': '',
      });
      return;
    }

    await saveFields({
      'Has Co-supervisor?': 'Yes',
      'Co-supervisor Title': formData['Co-supervisor Title'] === 'NA' ? 'Dr' : formData['Co-supervisor Title'],
      'Co-supervisor': formData['Co-supervisor'] === 'NA' ? '' : formData['Co-supervisor'],
      'Co-supervisor Qualifications': formData['Co-supervisor Qualifications'] === 'NA' ? '' : formData['Co-supervisor Qualifications'],
      'Second Co-supervisor Title': formData['Second Co-supervisor Title'] === 'NA' ? 'Dr' : formData['Second Co-supervisor Title'],
      'Second Co-supervisor': formData['Second Co-supervisor'] === 'NA' ? '' : formData['Second Co-supervisor'],
      'Second Co-supervisor Qualifications': formData['Second Co-supervisor Qualifications'] === 'NA' ? '' : formData['Second Co-supervisor Qualifications'],
    });
  }

  function formatInternalPerson(person: StaffDirectory): string {
    const fullName = `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim() || person.staff_name;
    return `${person.staff_title ? `${person.staff_title} ` : ''}${fullName}`.trim();
  }

  function internalPersonValue(person: StaffDirectory): string {
    return `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim() || person.staff_name;
  }

  function normalizePersonName(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/^(prof|prof\.|dr|dr\.|mr|mr\.|mrs|mrs\.|ms|ms\.)\s+/i, '')
      .replace(/\s+/g, ' ');
  }

  function resolveInternalDisplayName(value: string, directory: StaffDirectory[]): string {
    if (!value.trim()) return '';
    const normalized = normalizePersonName(value);
    const matched = directory.find((person) => {
      const candidates = [
        person.staff_name,
        `${person.first_name ?? ''} ${person.last_name ?? ''}`,
        `${person.staff_title ? `${person.staff_title} ` : ''}${person.first_name ?? ''} ${person.last_name ?? ''}`,
        formatInternalPerson(person),
      ].map((candidate) => normalizePersonName(candidate));
      return candidates.includes(normalized);
    });
    if (!matched) {
      return value.trim();
    }
    return formatInternalPerson(matched);
  }

  function formatExternalPerson(person: ExternalAcademicDirectory): string {
    const idPart = person.unique_identifier_type && person.unique_identifier_value
      ? ` [${person.unique_identifier_type}: ${person.unique_identifier_value}]`
      : '';
    return `${person.title ? `${person.title} ` : ''}${person.first_name} ${person.last_name}`.replace(/\s+/g, ' ').trim() + idPart;
  }

  const externalDirectorySearchIndex = useMemo(
    () =>
      externalDirectory.map((person) => ({
        person,
        searchText: [
          person.full_name,
          person.last_name,
          person.email,
          person.alternate_email,
          person.unique_identifier_value,
          person.unique_identifier_type,
        ]
          .join(' ')
          .toLowerCase(),
      })),
    [externalDirectory],
  );

  const filteredExternalByRole = useMemo(() => {
    const roles: Array<'supervisor' | 'admin' | 'co1' | 'co2'> = ['supervisor', 'admin', 'co1', 'co2'];
    const result: Record<'supervisor' | 'admin' | 'co1' | 'co2', ExternalAcademicDirectory[]> = {
      supervisor: externalDirectory,
      admin: externalDirectory,
      co1: externalDirectory,
      co2: externalDirectory,
    };
    for (const role of roles) {
      const query = externalSearchByRole[role].trim().toLowerCase();
      if (!query) {
        result[role] = externalDirectory;
        continue;
      }
      result[role] = externalDirectorySearchIndex.filter((item) => item.searchText.includes(query)).map((item) => item.person);
    }
    return result;
  }, [externalDirectory, externalDirectorySearchIndex, externalSearchByRole]);

  function filteredExternalDirectory(role: 'supervisor' | 'admin' | 'co1' | 'co2'): ExternalAcademicDirectory[] {
    return filteredExternalByRole[role];
  }

  async function sendExternalProfileLink(role: 'supervisor' | 'admin' | 'co1' | 'co2', emailInput: string) {
    if (!caseRecord || !formData) return;
    setInviteFeedback(null);
    setInviteLink(null);
    setError(null);
    setInfo(null);

    const roleFields = {
      supervisor: {
        title: formData['Supervisor Title'],
        firstName: formData['Supervisor External First Name'],
        surname: formData['Supervisor External Surname'],
      },
      admin: {
        title: formData['Administrative Supervisor External Title'],
        firstName: formData['Administrative Supervisor External First Name'],
        surname: formData['Administrative Supervisor External Surname'],
      },
      co1: {
        title: formData['Co-supervisor Title'],
        firstName: formData['Co-supervisor External First Name'],
        surname: formData['Co-supervisor External Surname'],
      },
      co2: {
        title: formData['Second Co-supervisor Title'],
        firstName: formData['Second Co-supervisor External First Name'],
        surname: formData['Second Co-supervisor External Surname'],
      },
    }[role];

    if (!roleFields.title.trim() || !roleFields.firstName.trim() || !roleFields.surname.trim()) {
      setInviteFeedback('Please enter title, first name, and surname before sending the profile link.');
      return;
    }

    if (!emailInput.trim()) {
      setInviteFeedback('Please enter email before sending the profile link.');
      return;
    }
    try {
      const result = await createExternalAcademicInvite(caseRecord.id, role, emailInput.trim());
      setInviteLink(result.inviteLink);
      const expiry = new Date(result.expiresAt).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
      if (result.deliveryStatus === 'sent') {
        setInviteFeedback(`External academic invite email sent. Expires on ${expiry}.`);
      } else {
        setInviteFeedback(`Invite link created, but email delivery is ${result.deliveryStatus}. Expires on ${expiry}.`);
      }
      await refreshExternalInviteStatuses(caseRecord.id);
      const todoResponse = await getToDo();
      setToDoItems(todoResponse.data);
    } catch (requestError) {
      setInviteFeedback(requestError instanceof Error ? requestError.message : 'Failed to send external academic invite');
    }
  }

  async function applyExternalLookup(
    role: 'supervisor' | 'admin' | 'co1' | 'co2',
    value: string,
  ) {
    if (!formData) return;
    const selected = externalDirectory.find((entry) => String(entry.id) === value);
    if (role === 'supervisor') {
      await saveSupervisorFields({
        'Supervisor is UWC-internal': 'No',
        'Supervisor External Lookup Id': value,
        'Supervisor Title': selected?.title ?? formData['Supervisor Title'],
        'Supervisor External First Name': selected?.first_name ?? formData['Supervisor External First Name'],
        'Supervisor External Surname': selected?.last_name ?? formData['Supervisor External Surname'],
        'Supervisor Qualifications': selected?.highest_qualification ?? formData['Supervisor Qualifications'],
        'Supervisor External Address': selected?.address ?? formData['Supervisor External Address'],
        'Supervisor External Email': selected?.email ?? formData['Supervisor External Email'],
      });
      return;
    }
    if (role === 'admin') {
      await saveFields({
        'Administrative Supervisor External Lookup Id': value,
        'Administrative Supervisor External Title': selected?.title ?? formData['Administrative Supervisor External Title'],
        'Administrative Supervisor External First Name': selected?.first_name ?? formData['Administrative Supervisor External First Name'],
        'Administrative Supervisor External Surname': selected?.last_name ?? formData['Administrative Supervisor External Surname'],
        'Administrative Supervisor Qualifications (Nominal Role)': selected?.highest_qualification ?? formData['Administrative Supervisor Qualifications (Nominal Role)'],
        'Administrative Supervisor External Address': selected?.address ?? formData['Administrative Supervisor External Address'],
        'Administrative Supervisor External Email': selected?.email ?? formData['Administrative Supervisor External Email'],
      });
      return;
    }
    if (role === 'co1') {
      await saveCoSupervisorFields({
        'Co-supervisor is UWC-internal': 'No',
        'Co-supervisor External Lookup Id': value,
        'Co-supervisor Title': selected?.title ?? formData['Co-supervisor Title'],
        'Co-supervisor External First Name': selected?.first_name ?? formData['Co-supervisor External First Name'],
        'Co-supervisor External Surname': selected?.last_name ?? formData['Co-supervisor External Surname'],
        'Co-supervisor Qualifications': selected?.highest_qualification ?? formData['Co-supervisor Qualifications'],
        'Co-supervisor External Address': selected?.address ?? formData['Co-supervisor External Address'],
        'Co-supervisor External Email': selected?.email ?? formData['Co-supervisor External Email'],
      });
      return;
    }
    await saveCoSupervisorFields({
      'Second Co-supervisor is UWC-internal': 'No',
      'Second Co-supervisor External Lookup Id': value,
      'Second Co-supervisor Title': selected?.title ?? formData['Second Co-supervisor Title'],
      'Second Co-supervisor External First Name': selected?.first_name ?? formData['Second Co-supervisor External First Name'],
      'Second Co-supervisor External Surname': selected?.last_name ?? formData['Second Co-supervisor External Surname'],
      'Second Co-supervisor Qualifications': selected?.highest_qualification ?? formData['Second Co-supervisor Qualifications'],
      'Second Co-supervisor External Address': selected?.address ?? formData['Second Co-supervisor External Address'],
      'Second Co-supervisor External Email': selected?.email ?? formData['Second Co-supervisor External Email'],
    });
  }

  async function handleAdminSupervisorSameAsSupervisorChange(value: 'Yes' | 'No') {
    if (!formData) return;

    const patch: Partial<FormData> = {
      'Administrative Supervisor same as Supervisor': value,
    };

    // Defensively re-affirm the state of the main supervisor to prevent resets.
    patch['Supervisor is UWC-internal'] = formData['Supervisor is UWC-internal'];
    if (formData['Supervisor is UWC-internal'] === 'Yes') {
      patch.Supervisor = formData.Supervisor;
      patch['Supervisor Qualifications'] = formData['Supervisor Qualifications'];
    } else {
      patch['Supervisor Title'] = formData['Supervisor Title'];
      patch['Supervisor External First Name'] = formData['Supervisor External First Name'];
      patch['Supervisor External Surname'] = formData['Supervisor External Surname'];
      patch['Supervisor Qualifications'] = formData['Supervisor Qualifications'];
      patch['Supervisor External Address'] = formData['Supervisor External Address'];
      patch['Supervisor External Email'] = formData['Supervisor External Email'];
      patch['Supervisor External Lookup Id'] = formData['Supervisor External Lookup Id'];
    }
    
    if (value === 'Yes') {
      // If admin is same, copy the now-affirmed supervisor details.
      patch['Administrative Supervisor is UWC-internal'] = patch['Supervisor is UWC-internal'];
      if (patch['Supervisor is UWC-internal'] === 'Yes') {
        patch['Administrative Supervisor (Nominal Role)'] = patch.Supervisor;
        patch['Administrative Supervisor Qualifications (Nominal Role)'] = patch['Supervisor Qualifications'];
      } else {
        patch['Administrative Supervisor (Nominal Role)'] =
          `${patch['Supervisor External First Name']} ${patch['Supervisor External Surname']}`.replace(/\s+/g, ' ').trim();
        patch['Administrative Supervisor External Title'] = patch['Supervisor Title'];
        patch['Administrative Supervisor External First Name'] = patch['Supervisor External First Name'];
        patch['Administrative Supervisor External Surname'] = patch['Supervisor External Surname'];
        patch['Administrative Supervisor Qualifications (Nominal Role)'] = patch['Supervisor Qualifications'];
        patch['Administrative Supervisor External Address'] = patch['Supervisor External Address'];
        patch['Administrative Supervisor External Email'] = patch['Supervisor External Email'];
        patch['Administrative Supervisor External Lookup Id'] = patch['Supervisor External Lookup Id'];
      }
    } else {
      // If not the same, reset the admin fields.
      patch['Administrative Supervisor (Nominal Role)'] = '';
      patch['Administrative Supervisor Qualifications (Nominal Role)'] = '';
      patch['Administrative Supervisor External Title'] = '';
      patch['Administrative Supervisor External First Name'] = '';
      patch['Administrative Supervisor External Surname'] = '';
      patch['Administrative Supervisor External Address'] = '';
      patch['Administrative Supervisor External Email'] = '';
      patch['Administrative Supervisor External Lookup Id'] = '';
      patch['Administrative Supervisor is UWC-internal'] = 'Yes';
    }

    await saveFields(patch);
  }

  async function handleGeneratePdf() {
    if (!caseRecord || !formData) return;
    setError(null);
    setIsSaving(true);
    try {
      const saved = await persistCurrentForm();
      if (!saved) return;
      const response = await generatePrintPdf(caseRecord.id);
      setPdfPath(response.pdfPath);
      setInfo('Information saved and PDF generated from exact canonical template.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to save form before PDF generation');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveFormNow() {
    if (!caseRecord || !formData) return;
    setError(null);
    setIsSaving(true);
    try {
      await persistCurrentForm();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to save form');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStudentVet() {
    if (!caseRecord) return;
    const response = await studentVet(caseRecord.id);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Form vetted by student and emailed to supervisor queue.');
  }

  async function handleSupervisorReview() {
    if (!caseRecord) return;
    const response = await supervisorReview(caseRecord.id, decision, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Supervisor action captured and notifications queued.');
  }

  async function handleDeptReview() {
    if (!caseRecord) return;
    const response = await deptReview(caseRecord.id, decision, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Dept FHD action captured.');
  }

  async function handleFacultyReview() {
    if (!caseRecord) return;
    const response = await facultyReview(caseRecord.id, decision, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Faculty FHD action captured.');
  }

  async function handleChairpersonSign() {
    if (!caseRecord) return;
    const response = await chairpersonSign(caseRecord.id, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Chairperson signature recorded. Awaiting Dept FHD send-to-Faculty.');
  }

  async function handleDeptSendFaculty() {
    if (!caseRecord) return;
    const response = await deptSendFaculty(caseRecord.id);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Dept FHD sent to Faculty FHD rep after Chairperson signature.');
  }

  async function loadModuleData(moduleKey: string) {
    setActiveModule(moduleKey);
    setError(null);
    setInfo(null);
    if (moduleKey === 'title_registration' && caseRecord) {
      await refreshExternalInviteStatuses(caseRecord.id);
    }
    if (moduleKey === 'mou' && caseRecord) {
      await refreshMou(caseRecord.id);
    }
    if (moduleKey === 'intention_to_submit' && caseRecord) {
      await refreshIntentionToSubmit(caseRecord.id);
    }
    if (moduleKey === 'appoint_examiners' && caseRecord) {
      await refreshAppointExaminers(caseRecord.id);
    }
    if (moduleKey === 'change_examiners' && caseRecord) {
      await refreshChangeExaminers(caseRecord.id);
    }
    if (moduleKey === 'examiner_summary_cv' && caseRecord) {
      await refreshExaminerSummaryCv(caseRecord.id);
    }
    if (moduleKey === 'appoint_arbiter' && caseRecord) {
      await refreshAppointArbiter(caseRecord.id);
    }
    if (moduleKey === 'supervisor_profiles' && caseRecord) {
      await refreshSupervisorProfiles(caseRecord.id);
    }
    if (moduleKey === 'pipeline') {
      const response = await getPipeline();
      setPipeline(response.data);
    }
    if (moduleKey === 'tasks') {
      const response = await getTasks();
      setTasks(response.data);
    }
    if (moduleKey === 'to_do') {
      const response = await getToDo();
      setToDoItems(response.data);
    }
    if (moduleKey === 'people' || moduleKey === 'team') {
      const response = await getPeople();
      setPeople(response.data);
    }
    if (moduleKey === 'approvals' || moduleKey === 'system') {
      const response = await getNotifications(caseRecord?.id);
      setNotifications(response.data);
    }
  }

  async function triggerReminder() {
    if (!caseRecord) return;
    const response = await sendReminder(caseRecord.id);
    if (response.sent) {
      await refreshCaseNotifications(caseRecord.id);
      setInfo('Reminder queued to Faculty FHD rep and Dept FHD rep.');
    } else {
      setInfo(response.reason ?? 'No reminder sent.');
    }
  }

  async function updateProfileField(profileId: number, patch: Parameters<typeof patchSupervisorProfile>[1]) {
    await patchSupervisorProfile(profileId, patch);
    if (caseRecord) {
      await refreshSupervisorProfiles(caseRecord.id);
    }
    setInfo('Supervisor profile updated.');
  }

  async function handleSubmitProfile(profileId: number) {
    await submitSupervisorProfile(profileId);
    if (caseRecord) {
      await refreshSupervisorProfiles(caseRecord.id);
    }
    setInfo('Supervisor profile marked completed.');
  }

  async function handleRequestProfiles() {
    if (!caseRecord) return;
    const response = await requestSupervisorProfiles(caseRecord.id);
    await refreshSupervisorProfiles(caseRecord.id);
    setInfo(`Requested completion for ${response.requested} supervisor profile form(s).`);
  }

  async function handleSupervisorProfileReminder() {
    if (!caseRecord) return;
    const response = await sendSupervisorProfilesReminder(caseRecord.id);
    if (response.sent) {
      await refreshCaseNotifications(caseRecord.id);
      setInfo('Supervisor profile reminder queued.');
      return;
    }
    setInfo(response.reason ?? 'No reminder sent.');
  }

  async function handleUploadProfileCv(profileId: number, file: File) {
    const contentBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    });
    await uploadSupervisorProfileCv(profileId, { fileName: file.name, contentBase64 });
    if (caseRecord) {
      await refreshSupervisorProfiles(caseRecord.id);
    }
    setInfo('CV uploaded for supervisor profile.');
  }

  async function saveMouField(label: keyof MouFormData, value: string) {
    if (!caseRecord || !mouData) return;
    const next = { ...mouData, [label]: value };
    setMouData(next);
    const response = await patchMou(caseRecord.id, { [label]: value } as Partial<MouFormData>);
    setMouRecord(response.record);
    setMouData(response.formData);
    setInfo(`Saved MOU field: ${label}`);
  }

  async function handleCompleteMou() {
    if (!caseRecord) return;
    const response = await completeMou(caseRecord.id);
    setMouRecord(response.record);
    await runSasiCheck();
    setInfo('MOU completed. Thesis title formalities package is finalized.');
  }

  async function handlePrintMou() {
    if (!caseRecord) return;
    const response = await printMou(caseRecord.id);
    setMouPdfPath(response.pdfPath);
    setInfo('MOU PDF generated.');
  }

  async function saveItsField(label: keyof IntentionToSubmitFormData, value: string) {
    if (!caseRecord || !itsData) return;
    const response = await patchIntentionToSubmit(caseRecord.id, { [label]: value } as Partial<IntentionToSubmitFormData>);
    setItsRecord(response.record);
    setItsData(response.formData);
    setInfo(`Saved ITS field: ${label}`);
  }

  async function submitItsModule() {
    if (!caseRecord) return;
    const response = await submitIntentionToSubmit(caseRecord.id);
    setItsRecord(response.record);
    await refreshIntentionToSubmit(caseRecord.id);
    setInfo('INTENTION_TO_SUBMIT submitted.');
  }

  async function saveAppointField(label: keyof AppointExaminersFormData, value: string) {
    if (!caseRecord || !appointData) return;
    const response = await patchAppointExaminers(caseRecord.id, { [label]: value } as Partial<AppointExaminersFormData>);
    setAppointRecord(response.record);
    setAppointData(response.formData);
    setInfo(`Saved APPOINT_EXAMINERS field: ${label}`);
  }

  async function submitAppointModule() {
    if (!caseRecord) return;
    const response = await submitAppointExaminers(caseRecord.id);
    setAppointRecord(response.record);
    await refreshAppointExaminers(caseRecord.id);
    setInfo('APPOINT_EXAMINERS submitted.');
  }

  async function saveChangeField(label: keyof ChangeExaminersFormData, value: string) {
    if (!caseRecord || !changeData) return;
    const response = await patchChangeExaminers(caseRecord.id, { [label]: value } as Partial<ChangeExaminersFormData>);
    setChangeRecord(response.record);
    setChangeData(response.formData);
    setInfo(`Saved CHANGE_EXAMINERS field: ${label}`);
  }

  async function submitChangeModule() {
    if (!caseRecord) return;
    const response = await submitChangeExaminers(caseRecord.id);
    setChangeRecord(response.record);
    await refreshChangeExaminers(caseRecord.id);
    setInfo('CHANGE_EXAMINERS submitted.');
  }

  async function saveSummaryField(label: keyof ExaminerSummaryCvFormData, value: string) {
    if (!caseRecord || !summaryData) return;
    const response = await patchExaminerSummaryCv(caseRecord.id, { [label]: value } as Partial<ExaminerSummaryCvFormData>);
    setSummaryRecord(response.record);
    setSummaryData(response.formData);
    setInfo(`Saved EXAMINER_SUMMARY_CV field: ${label}`);
  }

  async function submitSummaryModule() {
    if (!caseRecord) return;
    const response = await submitExaminerSummaryCv(caseRecord.id);
    setSummaryRecord(response.record);
    await refreshExaminerSummaryCv(caseRecord.id);
    setInfo('EXAMINER_SUMMARY_CV submitted.');
  }

  async function saveArbiterField(label: keyof AppointArbiterFormData, value: string) {
    if (!caseRecord || !arbiterData) return;
    const response = await patchAppointArbiter(caseRecord.id, { [label]: value } as Partial<AppointArbiterFormData>);
    setArbiterRecord(response.record);
    setArbiterData(response.formData);
    setInfo(`Saved APPOINT_ARBITER field: ${label}`);
  }

  async function submitArbiterModule() {
    if (!caseRecord) return;
    const response = await submitAppointArbiter(caseRecord.id);
    setArbiterRecord(response.record);
    await refreshAppointArbiter(caseRecord.id);
    setInfo('APPOINT_ARBITER submitted.');
  }

  return (
    <div className='min-h-screen p-4 md:p-8'>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className='mx-auto grid max-w-7xl gap-4 md:grid-cols-[220px_1fr]'>
        <Card className='h-fit'>
          <h1 className='mb-3 text-lg font-bold'>FHD Dashboard</h1>
          <div className='space-y-1'>
            {modules.map((moduleName) => (
              <SidebarItem key={moduleName} label={moduleName.replace('_', ' ')} active={moduleName === activeModule} onClick={() => void loadModuleData(moduleName)} />
            ))}
          </div>
        </Card>

        <div className='space-y-4'>
          <Card>
            <div className='grid gap-3 md:grid-cols-[1fr_auto] md:items-center'>
              <SearchInput value={studentNumber} onChange={(event) => setStudentNumber(event.target.value)} placeholder='Enter SASI student number (e.g. 1234567)' />
              <Button disabled={loading} onClick={() => void runSasiCheck()}>
                Check SASI
              </Button>
            </div>
            {student && caseRecord && (
              <div className='mt-3 flex flex-wrap items-center gap-2 text-sm'>
                <span>{student.first_names} {student.last_name}</span>
                <Badge label={statusLabel(caseRecord.case_status)} status={statusTone(caseRecord.case_status)} />
                <span className='text-muted'>Completion {caseRecord.completion_percent}%</span>
              </div>
            )}
            {caseRecord && (
              <div className='mt-2 h-2 overflow-hidden rounded-full bg-white/10'>
                <div className='h-full rounded-full bg-accent transition-all' style={{ width: `${caseRecord.completion_percent}%` }} />
              </div>
            )}
          </Card>

          {activeModule === 'title_registration' && formData && caseRecord && (
            <>
              <TitleRegistrationModule
                formData={formData}
                caseRecord={caseRecord}
                peopleDirectory={peopleDirectory}
                bcbDirectory={bcbDirectory}
                externalSearchByRole={externalSearchByRole}
                setExternalSearchByRole={setExternalSearchByRole}
                filteredExternalDirectory={filteredExternalDirectory}
                formatExternalPerson={formatExternalPerson}
                formatInternalPerson={formatInternalPerson}
                internalPersonValue={internalPersonValue}
                resolveInternalDisplayName={resolveInternalDisplayName}
                getCoSupervisorCount={getCoSupervisorCount}
                setCoSupervisorCount={setCoSupervisorCount}
                saveField={saveField}
                saveFields={saveFields}
                saveSupervisorFields={saveSupervisorFields}
                saveCoSupervisorFields={saveCoSupervisorFields}
                updateLocalFields={updateLocalFields}
                applyExternalLookup={applyExternalLookup}
                sendExternalProfileLink={sendExternalProfileLink}
                handleAdminSupervisorSameAsSupervisorChange={handleAdminSupervisorSameAsSupervisorChange}
                loadModuleData={loadModuleData}
                handleSaveFormNow={handleSaveFormNow}
                handleGeneratePdf={handleGeneratePdf}
                handleStudentVet={handleStudentVet}
                handleSupervisorReview={handleSupervisorReview}
                handleDeptReview={handleDeptReview}
                handleChairpersonSign={handleChairpersonSign}
                handleDeptSendFaculty={handleDeptSendFaculty}
                handleFacultyReview={handleFacultyReview}
                triggerReminder={triggerReminder}
                isSaving={isSaving}
                printUrl={printUrl}
                lastSavedAt={lastSavedAt}
                decision={decision}
                setDecision={setDecision}
                comments={comments}
                setComments={setComments}
                inviteStatusByRole={inviteStatusByRole}
              />
            </>
          )}

          {activeModule === 'to_do' && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>To Do Module</h2>
              <div className='space-y-2'>
                {toDoItems.map((item, index) => (
                  <div key={`${String(item.type)}-${String(item.case_id)}-${index}`} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                    <div className='font-semibold'>{String(item.title)}</div>
                    <div className='text-muted'>{String(item.student_number)} • {String(item.student_name)}</div>
                    <div className='text-muted'>{String(item.detail)}</div>
                  </div>
                ))}
                {toDoItems.length === 0 && <p className='text-sm text-muted'>No pending or in-progress actions.</p>}
              </div>
            </Card>
          )}

          {activeModule === 'supervisor_profiles' && caseRecord && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>Supervisor Profile Forms</h2>
              <div className='mb-3 flex flex-wrap gap-2'>
                <Button onClick={() => void handleRequestProfiles()}>Request Completion</Button>
                <Button onClick={() => void handleSupervisorProfileReminder()}>Send Reminder</Button>
              </div>
              <div className='space-y-3'>
                {supervisorProfiles.map((profile) => (
                  <div key={profile.id} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                    <div className='mb-2 font-semibold'>
                      {profile.role.replace('_', ' ')}: {profile.person_title} {profile.person_name} ({profile.status})
                    </div>
                    <div className='mb-2 text-xs uppercase tracking-wide text-muted'>Profile Form Fields</div>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-6 lg:grid-cols-12'>
                      <label className='space-y-1 md:col-span-3 lg:col-span-4'>
                        <span className='text-muted'>Publications in last 4 years (3-5)</span>
                        <input
                          className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2'
                          value={profile.publication_count ?? ''}
                          onChange={(event) => {
                            const raw = event.target.value.trim();
                            const next = raw ? Number.parseInt(raw, 10) : null;
                            void updateProfileField(profile.id, { publication_count: Number.isNaN(next as number) ? null : next });
                          }}
                        />
                      </label>
                      <label className='space-y-1 md:col-span-3 lg:col-span-4'>
                        <span className='text-muted'>New to department?</span>
                        <select
                          className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2'
                          value={profile.new_to_department}
                          onChange={(event) => void updateProfileField(profile.id, { new_to_department: event.target.value as 'Yes' | 'No' })}
                        >
                          <option value='' disabled>---</option>
                          <option value='No'>No</option>
                          <option value='Yes'>Yes</option>
                        </select>
                      </label>
                      <label className='space-y-1 md:col-span-3 lg:col-span-4'>
                        <span className='text-muted'>CV attached?</span>
                        <select
                          className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2'
                          value={profile.cv_attached}
                          onChange={(event) => void updateProfileField(profile.id, { cv_attached: event.target.value as 'Yes' | 'No' })}
                        >
                          <option value='' disabled>---</option>
                          <option value='No'>No</option>
                          <option value='Yes'>Yes</option>
                        </select>
                      </label>
                      <label className='space-y-1 md:col-span-6 lg:col-span-8'>
                        <span className='text-muted'>CV upload (.pdf, .doc, .docx)</span>
                        <input
                          type='file'
                          accept='.pdf,.doc,.docx'
                          className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2'
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              void handleUploadProfileCv(profile.id, file);
                            }
                          }}
                        />
                        {profile.cv_file_path && (
                          (() => {
                            const idx = profile.cv_file_path.indexOf('/generated_forms/');
                            if (idx === -1) return null;
                            return (
                              <a
                                className='text-xs text-accent'
                                href={`${apiOrigin}${profile.cv_file_path.slice(idx)}`}
                                target='_blank'
                                rel='noreferrer'
                              >
                                Open uploaded CV
                              </a>
                            );
                          })()
                        )}
                      </label>
                      <label className='space-y-1 md:col-span-3 lg:col-span-4'>
                        <span className='text-muted'>Contact email</span>
                        <input className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2' value={profile.contact_email} onChange={(event) => void updateProfileField(profile.id, { contact_email: event.target.value })} />
                      </label>
                      {profile.role === 'co_supervisor' && (
                        <label className='space-y-1 md:col-span-6 lg:col-span-12'>
                          <span className='text-muted'>Point 5.2 Motivation (contribution, not expertise)</span>
                          <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface px-3 py-2' value={profile.contribution_motivation} onChange={(event) => void updateProfileField(profile.id, { contribution_motivation: event.target.value })} />
                        </label>
                      )}
                      <label className='space-y-1 md:col-span-6 lg:col-span-12'>
                        <span className='text-muted'>Latest publications (one per line, 3-5 max)</span>
                        <textarea
                          className='min-h-24 w-full rounded-xl border border-white/10 bg-surface px-3 py-2'
                          value={(() => {
                            try {
                              const arr = JSON.parse(profile.recent_publications_json) as string[];
                              return Array.isArray(arr) ? arr.join('\n') : '';
                            } catch {
                              return '';
                            }
                          })()}
                          onChange={(event) => void updateProfileField(profile.id, { recent_publications: event.target.value.split('\n').map((line) => line.trim()).filter(Boolean) })}
                        />
                      </label>
                    </div>
                    <div className='mt-2'>
                      <Button
                        onClick={() => void handleSubmitProfile(profile.id)}
                        disabled={profile.status === 'completed' || profile.cv_attached !== 'Yes' || !profile.cv_file_path}
                      >
                        Mark Profile Completed
                      </Button>
                    </div>
                  </div>
                ))}
                {supervisorProfiles.length === 0 && <p className='text-sm text-muted'>No supervisor profile forms activated yet. Enter supervisor details in ROTT first.</p>}
              </div>
            </Card>
          )}

          {activeModule === 'mou' && caseRecord && mouData && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>MOU 2026 Module</h2>
              <p className='mb-3 text-sm text-muted'>Prefilled from ROTT + Supervisor Profiles. Complete remaining sections, confirm signatures, then generate final PDF for Faculty HD records.</p>
              <div className='mb-3 text-sm text-muted'>Status: {mouRecord?.status ?? 'draft'} • Completion: {mouRecord?.completion_percent ?? 0}%</div>
              <div className='mb-2 text-xs uppercase tracking-wide text-muted'>MOU Fields</div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
                {(
                  [
                    'Student Full Name',
                    'Student Number',
                    'Degree',
                    'Department',
                    'First Year of Registration',
                    'Study Mode',
                    'Expected Date of Completion',
                    'Thesis Title',
                    'Brief Description of Project (<200 words)',
                    'Principal Supervisor',
                    'Principal Supervisor Highest Qualifications',
                    'Principal Supervisor Main Responsibilities',
                    'Co-supervisor(s)',
                    'Co-supervisor Highest Qualifications',
                    'Co-supervisor Main Responsibilities',
                    'Supervisor Availability Arrangements',
                    'Student Leave Entitlement Per Annum',
                    'Student Extended Research Away from UWC Arrangements',
                    'Prescribed Courses/Workshops',
                    'Time Allocation',
                    'Space Allocation',
                    'Computer Facilities',
                    'Financial Arrangements for Project',
                    'Publication Issues',
                    'Data Ownership',
                    'Supervisor-Student Meetings',
                    'Progress Reports',
                    'Study Outputs',
                    'Research Visits/Conferences',
                    'Other Duties',
                    'Other Expectations',
                    'Other Issues Relevant to Study',
                  ] as Array<keyof MouFormData>
                ).map((label) => {
                  const isReadonly = new Set<keyof MouFormData>([
                    'Student Full Name',
                    'Student Number',
                    'Degree',
                    'Department',
                    'First Year of Registration',
                    'Study Mode',
                    'Expected Date of Completion',
                    'Thesis Title',
                    'Principal Supervisor',
                    'Principal Supervisor Highest Qualifications',
                    'Co-supervisor(s)',
                    'Co-supervisor Highest Qualifications',
                  ]).has(label);
                  const isLong = [
                    'Brief Description of Project (<200 words)',
                    'Principal Supervisor Main Responsibilities',
                    'Co-supervisor Main Responsibilities',
                    'Supervisor Availability Arrangements',
                    'Student Extended Research Away from UWC Arrangements',
                    'Prescribed Courses/Workshops',
                    'Time Allocation',
                    'Computer Facilities',
                    'Financial Arrangements for Project',
                    'Publication Issues',
                    'Data Ownership',
                    'Supervisor-Student Meetings',
                    'Progress Reports',
                    'Study Outputs',
                    'Research Visits/Conferences',
                    'Other Duties',
                    'Other Expectations',
                    'Other Issues Relevant to Study',
                  ].includes(label);
                  return (
                    <label key={label} className={`space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`}>
                      <span className='text-muted'>{label}</span>
                      {isLong ? (
                        <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={mouData[label]} disabled={isReadonly || mouRecord?.status === 'completed'} onChange={(event) => void saveMouField(label, event.target.value)} />
                      ) : (
                        <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={mouData[label]} disabled={isReadonly || mouRecord?.status === 'completed'} onChange={(event) => void saveMouField(label, event.target.value)} />
                      )}
                    </label>
                  );
                })}

                {(
                  [
                    'Student Signature Confirmed',
                    'Supervisor Signature Confirmed',
                    'Co-supervisor Signature Confirmed',
                    'Dept Chair/PG Coord Signature Confirmed',
                  ] as Array<keyof MouFormData>
                ).map((label) => (
                  <label key={label} className='space-y-1 text-sm md:col-span-3 lg:col-span-3'>
                    <span className='text-muted'>{label}</span>
                    <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={mouData[label]} disabled={mouRecord?.status === 'completed'} onChange={(event) => void saveMouField(label, event.target.value)}>
                      <option value='' disabled>---</option>
                      <option value='No'>No</option>
                      <option value='Yes'>Yes</option>
                    </select>
                  </label>
                ))}
              </div>

              <div className='mt-4 flex flex-wrap gap-2'>
                <Button onClick={() => void handlePrintMou()}>Generate MOU PDF</Button>
                {mouPrintUrl && (
                  <a href={mouPrintUrl} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                    Open MOU PDF
                  </a>
                )}
                <Button onClick={() => void handleCompleteMou()} disabled={mouRecord?.status === 'completed'}>
                  Mark MOU Completed
                </Button>
              </div>
            </Card>
          )}

          {activeModule === 'intention_to_submit' && caseRecord && itsData && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>INTENTION_TO_SUBMIT Module</h2>
              <p className='mb-3 text-sm text-muted'>This module opens only after MOU submission and gates APPOINT_EXAMINERS.</p>
              <div className='mb-3 text-sm text-muted'>Status: {itsRecord?.status ?? 'draft'} • Completion: {itsRecord?.completion_percent ?? 0}%</div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
                {(
                  [
                    'Student Full Name',
                    'Student Number',
                    'Department',
                    'Degree',
                    'Supervisor',
                    'Co-supervisor(s)',
                    'Thesis title',
                    'Year of first enrolment',
                    'Submission type',
                    'Intended submission date',
                    'Student declaration',
                    'Student signature date',
                    'Supervisor approval status',
                    'Co-supervisor approval status',
                    'Department PG coordinator approval status',
                    'Non-approval motivation',
                  ] as Array<keyof IntentionToSubmitFormData>
                ).map((label) => {
                  const readonly = new Set<keyof IntentionToSubmitFormData>([
                    'Student Full Name',
                    'Student Number',
                    'Department',
                    'Degree',
                    'Supervisor',
                    'Co-supervisor(s)',
                    'Thesis title',
                    'Year of first enrolment',
                  ]).has(label);
                  const isLong = ['Student declaration', 'Non-approval motivation'].includes(label);
                  const isSelect = ['Submission type', 'Supervisor approval status', 'Co-supervisor approval status', 'Department PG coordinator approval status'].includes(label);

                  return (
                    <label key={label} className={`space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`}>
                      <span className='text-muted'>{label}</span>
                      {isSelect ? (
                        <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={itsData[label]} disabled={readonly || itsRecord?.status === 'submitted'} onChange={(event) => void saveItsField(label, event.target.value)}>
                          {label === 'Submission type' && (
                            <>
                              <option value=''>---</option>
                              <option value='Mini thesis'>Mini thesis</option>
                              <option value='Project'>Project</option>
                              <option value='Full thesis'>Full thesis</option>
                            </>
                          )}
                          {label === 'Supervisor approval status' && (
                            <>
                              <option value='Pending'>Pending</option>
                              <option value='Approved'>Approved</option>
                              <option value='Not approved'>Not approved</option>
                            </>
                          )}
                          {label === 'Co-supervisor approval status' && (
                            <>
                              <option value='Not applicable'>Not applicable</option>
                              <option value='Pending'>Pending</option>
                              <option value='Approved'>Approved</option>
                              <option value='Not approved'>Not approved</option>
                            </>
                          )}
                          {label === 'Department PG coordinator approval status' && (
                            <>
                              <option value='Pending'>Pending</option>
                              <option value='Approved'>Approved</option>
                              <option value='Not approved'>Not approved</option>
                            </>
                          )}
                        </select>
                      ) : isLong ? (
                        <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={itsData[label]} disabled={readonly || itsRecord?.status === 'submitted'} onChange={(event) => void saveItsField(label, event.target.value)} />
                      ) : (
                        <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={itsData[label]} disabled={readonly || itsRecord?.status === 'submitted'} onChange={(event) => void saveItsField(label, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className='mt-4'>
                <Button onClick={() => void submitItsModule()} disabled={itsRecord?.status === 'submitted'}>Submit INTENTION_TO_SUBMIT</Button>
              </div>
            </Card>
          )}

          {activeModule === 'appoint_examiners' && caseRecord && appointData && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>APPOINT_EXAMINERS Module</h2>
              <p className='mb-3 text-sm text-muted'>This module opens after INTENTION_TO_SUBMIT is submitted.</p>
              <div className='mb-3 text-sm text-muted'>Status: {appointRecord?.status ?? 'draft'} • Completion: {appointRecord?.completion_percent ?? 0}%</div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
                {(
                  [
                    'Student Full Name',
                    'Student Number',
                    'Faculty and Department',
                    'Degree',
                    'Supervisor',
                    'Co-supervisor(s)',
                    'Thesis title',
                    'Year of first enrolment',
                    'Title already registered',
                    'Concurrent title-change declaration',
                    'Examiner 1 Name',
                    'Examiner 1 Type',
                    'Examiner 1 Affiliation',
                    'Examiner 1 Motivation',
                    'Examiner 1 CV received',
                    'Examiner 1 Conflict disclosure',
                    'Examiner 2 Name',
                    'Examiner 2 Type',
                    'Examiner 2 Affiliation',
                    'Examiner 2 Motivation',
                    'Examiner 2 CV received',
                    'Examiner 2 Conflict disclosure',
                    'Examiner 3 Name',
                    'Examiner 3 Type',
                    'Examiner 3 Affiliation',
                    'Examiner 3 Motivation',
                    'Examiner 3 CV received',
                    'Examiner 3 Conflict disclosure',
                  ] as Array<keyof AppointExaminersFormData>
                ).map((label) => {
                  const readonly = new Set<keyof AppointExaminersFormData>([
                    'Student Full Name',
                    'Student Number',
                    'Faculty and Department',
                    'Degree',
                    'Supervisor',
                    'Co-supervisor(s)',
                    'Thesis title',
                    'Year of first enrolment',
                  ]).has(label);
                  const isLong = label.includes('Motivation') || label.includes('Conflict disclosure') || label === 'Concurrent title-change declaration';
                  const isSelect = label.includes('Type') || label.includes('CV received') || label === 'Title already registered';
                  return (
                    <label key={label} className={`space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`}>
                      <span className='text-muted'>{label}</span>
                      {isSelect ? (
                        <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={appointData[label]} disabled={readonly || appointRecord?.status === 'submitted'} onChange={(event) => void saveAppointField(label, event.target.value)}>
                          {label === 'Title already registered' && (<><option value='Yes'>Yes</option><option value='No'>No</option></>)}
                          {label.includes('Type') && (<><option value=''>---</option><option value='Internal'>Internal</option><option value='External'>External</option><option value='International'>International</option></>)}
                          {label.includes('CV received') && (<><option value='No'>No</option><option value='Yes'>Yes</option></>)}
                        </select>
                      ) : isLong ? (
                        <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={appointData[label]} disabled={readonly || appointRecord?.status === 'submitted'} onChange={(event) => void saveAppointField(label, event.target.value)} />
                      ) : (
                        <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={appointData[label]} disabled={readonly || appointRecord?.status === 'submitted'} onChange={(event) => void saveAppointField(label, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className='mt-4'>
                <Button onClick={() => void submitAppointModule()} disabled={appointRecord?.status === 'submitted'}>Submit APPOINT_EXAMINERS</Button>
              </div>
            </Card>
          )}

          {activeModule === 'change_examiners' && caseRecord && changeData && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>CHANGE_EXAMINERS Module</h2>
              <p className='mb-3 text-sm text-muted'>This module opens after APPOINT_EXAMINERS is submitted.</p>
              <div className='mb-3 text-sm text-muted'>Status: {changeRecord?.status ?? 'draft'} • Completion: {changeRecord?.completion_percent ?? 0}%</div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
                {(
                  [
                    'Student Full Name',
                    'Student Number',
                    'Thesis title',
                    'Current examiner panel summary',
                    'Change motivation',
                    'Replacement Examiner 1 Name',
                    'Replacement Examiner 1 Type',
                    'Replacement Examiner 1 Affiliation',
                    'Replacement Examiner 1 Motivation',
                    'Replacement Examiner 2 Name',
                    'Replacement Examiner 2 Type',
                    'Replacement Examiner 2 Affiliation',
                    'Replacement Examiner 2 Motivation',
                  ] as Array<keyof ChangeExaminersFormData>
                ).map((label) => {
                  const readonly = new Set<keyof ChangeExaminersFormData>([
                    'Student Full Name',
                    'Student Number',
                    'Thesis title',
                    'Current examiner panel summary',
                  ]).has(label);
                  const isLong = label.includes('motivation') || label.includes('summary');
                  const isSelect = label.includes('Type');
                  return (
                    <label key={label} className={`space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`}>
                      <span className='text-muted'>{label}</span>
                      {isSelect ? (
                        <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={changeData[label]} disabled={readonly || changeRecord?.status === 'submitted'} onChange={(event) => void saveChangeField(label, event.target.value)}>
                          <option value=''>---</option>
                          <option value='Internal'>Internal</option>
                          <option value='External'>External</option>
                          <option value='International'>International</option>
                        </select>
                      ) : isLong ? (
                        <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={changeData[label]} disabled={readonly || changeRecord?.status === 'submitted'} onChange={(event) => void saveChangeField(label, event.target.value)} />
                      ) : (
                        <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={changeData[label]} disabled={readonly || changeRecord?.status === 'submitted'} onChange={(event) => void saveChangeField(label, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className='mt-4'>
                <Button onClick={() => void submitChangeModule()} disabled={changeRecord?.status === 'submitted'}>Submit CHANGE_EXAMINERS</Button>
              </div>
            </Card>
          )}

          {activeModule === 'examiner_summary_cv' && caseRecord && summaryData && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>EXAMINER_SUMMARY_CV Module</h2>
              <p className='mb-3 text-sm text-muted'>This module opens after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted.</p>
              <div className='mb-3 text-sm text-muted'>Status: {summaryRecord?.status ?? 'draft'} • Completion: {summaryRecord?.completion_percent ?? 0}%</div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
                {(
                  [
                    'Student Full Name',
                    'Student Number',
                    'Thesis title',
                    'Examiner panel summary',
                    'Summary CV packet status',
                    'Compiled by',
                    'Compilation date',
                    'Notes',
                  ] as Array<keyof ExaminerSummaryCvFormData>
                ).map((label) => {
                  const readonly = new Set<keyof ExaminerSummaryCvFormData>([
                    'Student Full Name',
                    'Student Number',
                    'Thesis title',
                    'Examiner panel summary',
                  ]).has(label);
                  const isLong = label === 'Examiner panel summary' || label === 'Notes';
                  const isSelect = label === 'Summary CV packet status';
                  return (
                    <label key={label} className={`space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`}>
                      <span className='text-muted'>{label}</span>
                      {isSelect ? (
                        <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={summaryData[label]} disabled={readonly || summaryRecord?.status === 'submitted'} onChange={(event) => void saveSummaryField(label, event.target.value)}>
                          <option value='Pending'>Pending</option>
                          <option value='Complete'>Complete</option>
                        </select>
                      ) : isLong ? (
                        <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={summaryData[label]} disabled={readonly || summaryRecord?.status === 'submitted'} onChange={(event) => void saveSummaryField(label, event.target.value)} />
                      ) : (
                        <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={summaryData[label]} disabled={readonly || summaryRecord?.status === 'submitted'} onChange={(event) => void saveSummaryField(label, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className='mt-4'>
                <Button onClick={() => void submitSummaryModule()} disabled={summaryRecord?.status === 'submitted'}>Submit EXAMINER_SUMMARY_CV</Button>
              </div>
            </Card>
          )}

          {activeModule === 'appoint_arbiter' && caseRecord && arbiterData && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>APPOINT_ARBITER Module</h2>
              <p className='mb-3 text-sm text-muted'>This module opens after APPOINT_EXAMINERS or CHANGE_EXAMINERS is submitted.</p>
              <div className='mb-3 text-sm text-muted'>Status: {arbiterRecord?.status ?? 'draft'} • Completion: {arbiterRecord?.completion_percent ?? 0}%</div>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
                {(
                  [
                    'Student Full Name',
                    'Student Number',
                    'Thesis title',
                    'Examiner panel summary',
                    'Arbiter Name',
                    'Arbiter Type',
                    'Arbiter Affiliation',
                    'Arbiter Motivation',
                    'Arbiter CV received',
                    'Arbiter conflict disclosure',
                  ] as Array<keyof AppointArbiterFormData>
                ).map((label) => {
                  const readonly = new Set<keyof AppointArbiterFormData>([
                    'Student Full Name',
                    'Student Number',
                    'Thesis title',
                    'Examiner panel summary',
                  ]).has(label);
                  const isLong = label === 'Arbiter Motivation' || label === 'Arbiter conflict disclosure' || label === 'Examiner panel summary';
                  const isSelect = label === 'Arbiter Type' || label === 'Arbiter CV received';
                  return (
                    <label key={label} className={`space-y-1 text-sm ${isLong ? 'md:col-span-6 lg:col-span-12' : 'md:col-span-3 lg:col-span-4'}`}>
                      <span className='text-muted'>{label}</span>
                      {isSelect ? (
                        <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={arbiterData[label]} disabled={readonly || arbiterRecord?.status === 'submitted'} onChange={(event) => void saveArbiterField(label, event.target.value)}>
                          {label === 'Arbiter Type' && (<><option value=''>---</option><option value='Internal'>Internal</option><option value='External'>External</option><option value='International'>International</option></>)}
                          {label === 'Arbiter CV received' && (<><option value='No'>No</option><option value='Yes'>Yes</option></>)}
                        </select>
                      ) : isLong ? (
                        <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={arbiterData[label]} disabled={readonly || arbiterRecord?.status === 'submitted'} onChange={(event) => void saveArbiterField(label, event.target.value)} />
                      ) : (
                        <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={arbiterData[label]} disabled={readonly || arbiterRecord?.status === 'submitted'} onChange={(event) => void saveArbiterField(label, event.target.value)} />
                      )}
                    </label>
                  );
                })}
              </div>
              <div className='mt-4'>
                <Button onClick={() => void submitArbiterModule()} disabled={arbiterRecord?.status === 'submitted'}>Submit APPOINT_ARBITER</Button>
              </div>
            </Card>
          )}

          {activeModule === 'pipeline' && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>Pipeline View</h2>
              <div className='space-y-2'>
                {pipeline.map((item) => (
                  <div key={String(item.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                    <div className='font-semibold'>{String(item.student_number)} • {String(item.first_names)} {String(item.last_name)}</div>
                    <div className='text-muted'>Status: {String(item.case_status)} • Completion: {String(item.completion_percent)}%</div>
                    <div className='text-muted'>Supervisor profiles: {String(item.supervisor_profiles_completed ?? 0)}/{String(item.supervisor_profiles_total ?? 0)} completed</div>
                    <div className='text-muted'>MOU: {String(item.mou_status ?? 'pending')} • Title formalities finalised: {String(Boolean(item.title_formalities_finalised))}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeModule === 'tasks' && (
            <Card>
              <h2 className='mb-3 text-base font-bold'>Tasks Module</h2>
              <div className='space-y-2'>
                {tasks.map((item) => (
                  <div key={String(item.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                    <div className='font-semibold'>{String(item.module_name)} • {String(item.student_number)}</div>
                    <div className='text-muted'>{String(item.status)} • {String(item.summary)}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {(activeModule === 'people' || activeModule === 'team') && (
            <Card>
              <h2 className='mb-3 flex items-center gap-2 text-base font-bold'><Users size={16} /> People / Team</h2>
              <div className='space-y-2'>
                {people.map((person) => (
                  <div key={String(person.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                    <div className='font-semibold'>{String(person.full_name)}</div>
                    <div className='text-muted'>{String(person.role)} • {String(person.email)}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {(activeModule === 'approvals' || activeModule === 'system') && (
            <Card>
              <h2 className='mb-3 flex items-center gap-2 text-base font-bold'><Mail size={16} /> Notification Queue</h2>
              <div className='space-y-2'>
                {notifications.map((note) => (
                  <div key={String(note.id)} className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
                    <div className='font-semibold'>{String(note.subject)}</div>
                    <div className='text-muted'>To: {String(note.email_to)} • Status: {String(note.status)}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {['radar', 'timelines', 'calendar', 'kanban', 'policy'].includes(activeModule) && (
            <Card>
              <h2 className='text-base font-bold capitalize'>{activeModule} module</h2>
              <p className='mt-1 text-sm text-muted'>Entries are created and updated from title registration state changes via backend module mappings.</p>
            </Card>
          )}

          {error && (
            <Card className='border-err/40'>
              <p className='flex items-center gap-2 text-sm text-err'><AlertCircle size={14} /> {error}</p>
            </Card>
          )}

          {info && (
            <Card className='border-ok/40'>
              <p className='flex items-center gap-2 text-sm text-ok'><CheckCircle2 size={14} /> {info}</p>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}

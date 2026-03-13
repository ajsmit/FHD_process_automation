import { useEffect, useMemo, useState } from 'react';
import {
  chairpersonSign,
  checkSasi,
  createExternalAcademicInvite,
  deptSendFaculty,
  deptReview,
  facultyReview,
  getFacultyCalendar,
  getLandingMessages,
  generatePrintPdf,
  getDirectoryStaff,
  getExternalAcademics,
  getExternalInviteStatuses,
  patchForm,
  studentVet,
  supervisorReview,
  resolveApiOrigin,
  type ExternalAcademicDirectory,
  type ExternalInviteStatus,
  type FacultyProcessCalendar,
  type FormData,
  type LandingMessage,
  type PolicyWarning,
  type ReviewDecision,
  type SasiStudent,
  type StaffDirectory,
  type TitleRegistrationCase,
} from '@/lib/api';

const apiOrigin = resolveApiOrigin();

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

interface RunSasiCheckDeps {
  refreshCaseNotifications: (caseId: number) => Promise<void>;
  refreshSupervisorProfiles: (caseId: number) => Promise<void>;
  refreshMou: (caseId: number) => Promise<void>;
}

interface SaveFieldDeps {
  refreshSupervisorProfiles: (caseId: number) => Promise<void>;
  refreshMou: (caseId: number) => Promise<void>;
  isMouCompleted: boolean;
}

interface SendExternalProfileLinkDeps {
  refreshToDoItems: () => Promise<void>;
}

type ExternalInviteRole = 'supervisor' | 'admin' | 'co1' | 'co2';

export function useDashboardCoreCase() {
  const [activeModule, setActiveModule] = useState('title_registration');
  const [studentNumber, setStudentNumber] = useState('1234567');
  const [student, setStudent] = useState<SasiStudent | null>(null);
  const [caseRecord, setCaseRecord] = useState<TitleRegistrationCase | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [facultyCalendar, setFacultyCalendar] = useState<FacultyProcessCalendar | null>(null);
  const [policyWarnings, setPolicyWarnings] = useState<PolicyWarning[]>([]);
  const [landingMessages, setLandingMessages] = useState<LandingMessage[]>([]);
  const [peopleDirectory, setPeopleDirectory] = useState<StaffDirectory[]>([]);
  const [bcbDirectory, setBcbDirectory] = useState<StaffDirectory[]>([]);
  const [externalDirectory, setExternalDirectory] = useState<ExternalAcademicDirectory[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [decision, setDecision] = useState<ReviewDecision>('vetted');
  const [comments, setComments] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [externalSearchByRole, setExternalSearchByRole] = useState<Record<ExternalInviteRole, string>>({
    supervisor: '',
    admin: '',
    co1: '',
    co2: '',
  });
  const [inviteFeedback, setInviteFeedback] = useState<string | null>(null);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteStatusByRole, setInviteStatusByRole] = useState<Record<ExternalInviteRole, ExternalInviteStatus | null>>({
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

  function toGeneratedFormUrl(rawPath: string | null): string | null {
    if (!rawPath) return null;
    const idx = rawPath.indexOf('/generated_forms/');
    if (idx === -1) return null;
    return `${apiOrigin}${rawPath.slice(idx)}`;
  }

  async function refreshExternalInviteStatuses(caseId: number) {
    const response = await getExternalInviteStatuses(caseId);
    const next: Record<ExternalInviteRole, ExternalInviteStatus | null> = {
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

  useEffect(() => {
    void (async () => {
      try {
        const response = await getFacultyCalendar();
        setFacultyCalendar(response.calendar);
      } catch {
        // Calendar visibility is non-blocking for case lookup.
      }
    })();
  }, []);

  async function runSasiCheck(deps: RunSasiCheckDeps) {
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
      setPolicyWarnings(response.policyWarnings ?? []);
      if (response.facultyCalendar) {
        setFacultyCalendar(response.facultyCalendar);
      }
      if (response.landingMessages) {
        setLandingMessages(response.landingMessages);
      } else {
        const landing = await getLandingMessages({ caseId: response.caseRecord.id });
        setLandingMessages(landing.data);
      }
      setPdfPath(response.caseRecord.pdf_path);
      const [peopleResult, bcbResult, externalResult] = await Promise.all([
        getDirectoryStaff({ internalOnly: true }),
        getDirectoryStaff({ department: 'Department of Biodiversity and Conservation Biology', internalOnly: true }),
        getExternalAcademics(),
      ]);
      setPeopleDirectory(peopleResult.data);
      setBcbDirectory(bcbResult.data);
      setExternalDirectory(externalResult.data);
      await deps.refreshCaseNotifications(response.caseRecord.id);
      await refreshExternalInviteStatuses(response.caseRecord.id);
      await deps.refreshSupervisorProfiles(response.caseRecord.id);
      try {
        await deps.refreshMou(response.caseRecord.id);
      } catch {
        // MOU prerequisites may not be met yet.
      }
      setInfo('SASI check passed and form prefilled.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'SASI check failed');
    } finally {
      setLoading(false);
    }
  }

  function stampAndSetLastSavedAt() {
    const now = new Date();
    const stamp = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}`;
    setLastSavedAt(now.toISOString());
    return stamp;
  }

  async function saveField(label: keyof FormData, value: string | boolean, deps: SaveFieldDeps) {
    if (!caseRecord || !formData) return;
    const next = { ...formData, [label]: value };
    setFormData(next);
    try {
      const response = await patchForm(caseRecord.id, { [label]: value } as Partial<FormData>);
      setCaseRecord(response.case);
      setFormData(response.formData);
      const stamp = stampAndSetLastSavedAt();
      await deps.refreshSupervisorProfiles(caseRecord.id);
      if (!deps.isMouCompleted) {
        try {
          await deps.refreshMou(caseRecord.id);
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
      const stamp = stampAndSetLastSavedAt();
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
    const stamp = stampAndSetLastSavedAt();
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
    const roles: ExternalInviteRole[] = ['supervisor', 'admin', 'co1', 'co2'];
    const result: Record<ExternalInviteRole, ExternalAcademicDirectory[]> = {
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

  function filteredExternalDirectory(role: ExternalInviteRole): ExternalAcademicDirectory[] {
    return filteredExternalByRole[role];
  }

  async function sendExternalProfileLink(role: ExternalInviteRole, emailInput: string, deps: SendExternalProfileLinkDeps) {
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
      await deps.refreshToDoItems();
    } catch (requestError) {
      setInviteFeedback(requestError instanceof Error ? requestError.message : 'Failed to send external academic invite');
    }
  }

  async function applyExternalLookup(
    role: ExternalInviteRole,
    value: string,
  ) {
    if (!formData) return;
    const selected = externalDirectory.find((entry) => String(entry.id) === value);
    const rolePatchMap: Record<ExternalInviteRole, Partial<FormData>> = {
      supervisor: {
        'Supervisor is UWC-internal': 'No',
        'Supervisor External Lookup Id': value,
        'Supervisor Title': selected?.title ?? formData['Supervisor Title'],
        'Supervisor External First Name': selected?.first_name ?? formData['Supervisor External First Name'],
        'Supervisor External Surname': selected?.last_name ?? formData['Supervisor External Surname'],
        'Supervisor Qualifications': selected?.highest_qualification ?? formData['Supervisor Qualifications'],
        'Supervisor External Address': selected?.address ?? formData['Supervisor External Address'],
        'Supervisor External Email': selected?.email ?? formData['Supervisor External Email'],
      },
      admin: {
        'Administrative Supervisor External Lookup Id': value,
        'Administrative Supervisor External Title': selected?.title ?? formData['Administrative Supervisor External Title'],
        'Administrative Supervisor External First Name': selected?.first_name ?? formData['Administrative Supervisor External First Name'],
        'Administrative Supervisor External Surname': selected?.last_name ?? formData['Administrative Supervisor External Surname'],
        'Administrative Supervisor Qualifications (Nominal Role)': selected?.highest_qualification ?? formData['Administrative Supervisor Qualifications (Nominal Role)'],
        'Administrative Supervisor External Address': selected?.address ?? formData['Administrative Supervisor External Address'],
        'Administrative Supervisor External Email': selected?.email ?? formData['Administrative Supervisor External Email'],
      },
      co1: {
        'Co-supervisor is UWC-internal': 'No',
        'Co-supervisor External Lookup Id': value,
        'Co-supervisor Title': selected?.title ?? formData['Co-supervisor Title'],
        'Co-supervisor External First Name': selected?.first_name ?? formData['Co-supervisor External First Name'],
        'Co-supervisor External Surname': selected?.last_name ?? formData['Co-supervisor External Surname'],
        'Co-supervisor Qualifications': selected?.highest_qualification ?? formData['Co-supervisor Qualifications'],
        'Co-supervisor External Address': selected?.address ?? formData['Co-supervisor External Address'],
        'Co-supervisor External Email': selected?.email ?? formData['Co-supervisor External Email'],
      },
      co2: {
        'Second Co-supervisor is UWC-internal': 'No',
        'Second Co-supervisor External Lookup Id': value,
        'Second Co-supervisor Title': selected?.title ?? formData['Second Co-supervisor Title'],
        'Second Co-supervisor External First Name': selected?.first_name ?? formData['Second Co-supervisor External First Name'],
        'Second Co-supervisor External Surname': selected?.last_name ?? formData['Second Co-supervisor External Surname'],
        'Second Co-supervisor Qualifications': selected?.highest_qualification ?? formData['Second Co-supervisor Qualifications'],
        'Second Co-supervisor External Address': selected?.address ?? formData['Second Co-supervisor External Address'],
        'Second Co-supervisor External Email': selected?.email ?? formData['Second Co-supervisor External Email'],
      },
    };
    const persistByRole: Record<ExternalInviteRole, (patch: Partial<FormData>) => Promise<void>> = {
      supervisor: saveSupervisorFields,
      admin: saveFields,
      co1: saveCoSupervisorFields,
      co2: saveCoSupervisorFields,
    };
    await persistByRole[role](rolePatchMap[role]);
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

  async function handleStudentVet(refreshCaseNotifications: (id: number) => Promise<void>) {
    if (!caseRecord) return;
    const response = await studentVet(caseRecord.id);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Form vetted by student and emailed to supervisor queue.');
  }

  async function handleSupervisorReview(refreshCaseNotifications: (id: number) => Promise<void>) {
    if (!caseRecord) return;
    const response = await supervisorReview(caseRecord.id, decision, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Supervisor action captured and notifications queued.');
  }

  async function handleDeptReview(refreshCaseNotifications: (id: number) => Promise<void>) {
    if (!caseRecord) return;
    const response = await deptReview(caseRecord.id, decision, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Dept FHD action captured.');
  }

  async function handleFacultyReview(refreshCaseNotifications: (id: number) => Promise<void>) {
    if (!caseRecord) return;
    const response = await facultyReview(caseRecord.id, decision, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Faculty FHD action captured.');
  }

  async function handleChairpersonSign(refreshCaseNotifications: (id: number) => Promise<void>) {
    if (!caseRecord) return;
    const response = await chairpersonSign(caseRecord.id, comments);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Chairperson signature recorded. Awaiting Dept FHD send-to-Faculty.');
  }

  async function handleDeptSendFaculty(refreshCaseNotifications: (id: number) => Promise<void>) {
    if (!caseRecord) return;
    const response = await deptSendFaculty(caseRecord.id);
    setCaseRecord(response.case);
    await refreshCaseNotifications(caseRecord.id);
    setInfo('Dept FHD sent to Faculty FHD rep after Chairperson signature.');
  }

  return {
    activeModule,
    setActiveModule,
    studentNumber,
    setStudentNumber,
    student,
    caseRecord,
    formData,
    facultyCalendar,
    policyWarnings,
    landingMessages,
    peopleDirectory,
    bcbDirectory,
    externalDirectory,
    pdfPath,
    decision,
    setDecision,
    comments,
    setComments,
    error,
    setError,
    info,
    setInfo,
    loading,
    isSaving,
    lastSavedAt,
    externalSearchByRole,
    setExternalSearchByRole,
    inviteFeedback,
    inviteLink,
    inviteStatusByRole,
    printUrl,
    toGeneratedFormUrl,
    refreshExternalInviteStatuses,
    runSasiCheck,
    saveField,
    saveFields,
    saveSupervisorFields,
    updateLocalFields,
    saveCoSupervisorFields,
    getCoSupervisorCount,
    setCoSupervisorCount,
    formatInternalPerson,
    internalPersonValue,
    resolveInternalDisplayName,
    formatExternalPerson,
    filteredExternalDirectory,
    sendExternalProfileLink,
    applyExternalLookup,
    handleAdminSupervisorSameAsSupervisorChange,
    handleGeneratePdf,
    handleSaveFormNow,
    handleStudentVet,
    handleSupervisorReview,
    handleDeptReview,
    handleFacultyReview,
    handleChairpersonSign,
    handleDeptSendFaculty,
  };
}

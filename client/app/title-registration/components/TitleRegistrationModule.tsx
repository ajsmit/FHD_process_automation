'use client';

import { FileText, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DecisionDropdown } from '@/components/ui/dropdown';
import {
  FORM_CONTROL_CLASS,
  FORM_GRID_CLASS,
  FORM_TEXTAREA_CLASS,
} from '@/components/ui/formFieldStyles';
import type {
  ExternalAcademicDirectory,
  ExternalInviteStatus,
  FormData,
  ReviewDecision,
  StaffDirectory,
  TitleRegistrationCase,
} from '@/lib/api';
import { FieldLabel, SupervisorRoleCard } from './SupervisorRoleCard';
import type { ExternalRole } from './SupervisorRoleCard';

interface TitleRegistrationModuleProps {
  formData: FormData;
  caseRecord: TitleRegistrationCase;
  peopleDirectory: StaffDirectory[];
  bcbDirectory: StaffDirectory[];
  externalSearchByRole: Record<ExternalRole, string>;
  setExternalSearchByRole: React.Dispatch<React.SetStateAction<Record<ExternalRole, string>>>;
  filteredExternalDirectory: (role: ExternalRole) => ExternalAcademicDirectory[];
  formatExternalPerson: (person: ExternalAcademicDirectory) => string;
  formatInternalPerson: (person: StaffDirectory) => string;
  internalPersonValue: (person: StaffDirectory) => string;
  resolveInternalDisplayName: (value: string, directory: StaffDirectory[]) => string;
  getCoSupervisorCount: (data: FormData) => 0 | 1 | 2;
  setCoSupervisorCount: (count: 0 | 1 | 2) => Promise<void>;
  saveField: (label: keyof FormData, value: string | boolean) => Promise<void>;
  saveFields: (patch: Partial<FormData>) => Promise<void>;
  saveSupervisorFields: (patch: Partial<FormData>) => Promise<void>;
  saveCoSupervisorFields: (patch: Partial<FormData>) => Promise<void>;
  updateLocalFields: (patch: Partial<FormData>) => void;
  applyExternalLookup: (role: ExternalRole, value: string) => Promise<void>;
  sendExternalProfileLink: (role: ExternalRole, email: string) => Promise<void>;
  handleAdminSupervisorSameAsSupervisorChange: (value: 'Yes' | 'No') => Promise<void>;
  loadModuleData: (moduleKey: string) => Promise<void>;
  handleSaveFormNow: () => Promise<void>;
  handleGeneratePdf: () => Promise<void>;
  handleStudentVet: () => Promise<void>;
  handleSupervisorReview: () => Promise<void>;
  handleDeptReview: () => Promise<void>;
  handleChairpersonSign: () => Promise<void>;
  handleDeptSendFaculty: () => Promise<void>;
  handleFacultyReview: () => Promise<void>;
  triggerReminder: () => Promise<void>;
  isSaving: boolean;
  printUrl: string | null;
  lastSavedAt: string | null;
  decision: ReviewDecision;
  setDecision: (value: ReviewDecision) => void;
  comments: string;
  setComments: (value: string) => void;
  inviteStatusByRole: Record<ExternalRole, ExternalInviteStatus | null>;
}

const plannedFormatLabels = [
  'PhD by traditional thesis format',
  'PhD by publication',
  'Masters Full-thesis',
  'Masters Mini thesis',
  'Masters by publication',
] as const;

export function TitleRegistrationModule(props: TitleRegistrationModuleProps) {
  const {
    formData,
    caseRecord,
    peopleDirectory,
    bcbDirectory,
    externalSearchByRole,
    setExternalSearchByRole,
    filteredExternalDirectory,
    formatExternalPerson,
    formatInternalPerson,
    internalPersonValue,
    resolveInternalDisplayName,
    getCoSupervisorCount,
    setCoSupervisorCount,
    saveField,
    saveFields,
    saveSupervisorFields,
    saveCoSupervisorFields,
    updateLocalFields,
    applyExternalLookup,
    sendExternalProfileLink,
    handleAdminSupervisorSameAsSupervisorChange,
    loadModuleData,
    handleSaveFormNow,
    handleGeneratePdf,
    handleStudentVet,
    handleSupervisorReview,
    handleDeptReview,
    handleChairpersonSign,
    handleDeptSendFaculty,
    handleFacultyReview,
    triggerReminder,
    isSaving,
    printUrl,
    lastSavedAt,
    decision,
    setDecision,
    comments,
    setComments,
    inviteStatusByRole,
  } = props;

  const selectedPlannedFormat =
    plannedFormatLabels.find((label) => Boolean(formData[label])) ?? '';

  const coCount = getCoSupervisorCount(formData);

  // -------------------------------------------------------------------------
  // Per-role callbacks — all per-role variance lives here, not in the card
  // -------------------------------------------------------------------------

  const roleCallbacks: Record<
    ExternalRole,
    {
      onIsInternalChange: (v: 'Yes' | 'No') => void;
      onInternalSelect: (v: string) => Promise<void>;
      onExternalFieldChange: (patch: Partial<FormData>) => void;
      onSendProfileLink: () => Promise<void>;
    }
  > = {
    supervisor: {
      onIsInternalChange: (v) => updateLocalFields({ 'Supervisor is UWC-internal': v }),
      onInternalSelect: (v) => {
        const selected = peopleDirectory.find((p) => internalPersonValue(p) === v);
        return saveSupervisorFields({
          Supervisor: v,
          'Supervisor Qualifications':
            selected?.highest_qualification ?? formData['Supervisor Qualifications'],
        });
      },
      onExternalFieldChange: (patch) =>
        updateLocalFields({ 'Supervisor is UWC-internal': 'No', ...patch }),
      onSendProfileLink: () =>
        sendExternalProfileLink('supervisor', formData['Supervisor External Email']),
    },
    admin: {
      onIsInternalChange: (v) =>
        updateLocalFields({ 'Administrative Supervisor is UWC-internal': v }),
      onInternalSelect: (v) => saveField('Administrative Supervisor (Nominal Role)', v),
      onExternalFieldChange: (patch) =>
        updateLocalFields({ 'Administrative Supervisor is UWC-internal': 'No', ...patch }),
      onSendProfileLink: () =>
        sendExternalProfileLink(
          'admin',
          formData['Administrative Supervisor External Email'],
        ),
    },
    co1: {
      onIsInternalChange: (v) =>
        updateLocalFields({ 'Has Co-supervisor?': 'Yes', 'Co-supervisor is UWC-internal': v }),
      onInternalSelect: (v) =>
        saveCoSupervisorFields({ 'Co-supervisor is UWC-internal': 'Yes', 'Co-supervisor': v }),
      onExternalFieldChange: (patch) =>
        updateLocalFields({
          'Has Co-supervisor?': 'Yes',
          'Co-supervisor is UWC-internal': 'No',
          ...patch,
        }),
      onSendProfileLink: () =>
        sendExternalProfileLink('co1', formData['Co-supervisor External Email']),
    },
    co2: {
      onIsInternalChange: (v) =>
        updateLocalFields({
          'Has Co-supervisor?': 'Yes',
          'Second Co-supervisor is UWC-internal': v,
        }),
      onInternalSelect: (v) =>
        saveCoSupervisorFields({
          'Second Co-supervisor is UWC-internal': 'Yes',
          'Second Co-supervisor': v,
        }),
      onExternalFieldChange: (patch) =>
        updateLocalFields({
          'Has Co-supervisor?': 'Yes',
          'Second Co-supervisor is UWC-internal': 'No',
          ...patch,
        }),
      onSendProfileLink: () =>
        sendExternalProfileLink('co2', formData['Second Co-supervisor External Email']),
    },
  };

  // Shared card props factory — wires config + callbacks + per-role state
  function roleCardProps(role: ExternalRole) {
    return {
      formData,
      externalSearch: externalSearchByRole[role],
      onExternalSearchChange: (v: string) =>
        setExternalSearchByRole((prev) => ({ ...prev, [role]: v })),
      filteredExternalOptions: filteredExternalDirectory(role),
      formatExternalPerson,
      formatInternalPerson,
      internalPersonValue,
      resolveInternalDisplayName,
      onExternalLookup: (v: string) => applyExternalLookup(role, v),
      inviteStatus: inviteStatusByRole[role],
      ...roleCallbacks[role],
    };
  }

  return (
    <>
      <Card>
        <div className='mb-2 flex items-center gap-2 text-sm text-muted'>
          <FileText size={14} className='text-accent' />
          Main ROTT Sections
        </div>
        <p className='text-sm text-muted'>
          Student Details, Thesis Details, Ethics, MOU, Supervisor Details, Administrative
          Supervisor (Nominal Role), Co-supervisor Details.
        </p>
      </Card>

      {/* Student Details */}
      <Card>
        <h3 className='mb-3 text-sm font-bold'>Student Details</h3>
        <div className={FORM_GRID_CLASS}>
          {(
            [
              'Student Title',
              'Student First-Name',
              'Student Surname',
              'Student Number',
              'Department',
              'Degree',
              'Date of first title registration on SASI',
              'Student registration active on SASI',
              'Year first registered',
              'Semester first registered',
            ] as Array<keyof FormData>
          ).map((label) => (
            <label key={label} className='space-y-1 text-sm md:col-span-3 lg:col-span-3'>
              <span className='text-muted'>{label}</span>
              <input className={FORM_CONTROL_CLASS} value={String(formData[label])} disabled />
            </label>
          ))}
          <label className='space-y-1 text-sm md:col-span-6 lg:col-span-6'>
            <span className='text-muted'>Planned format (select one)</span>
            <select
              className={FORM_CONTROL_CLASS}
              value={selectedPlannedFormat}
              onChange={(event) => {
                const label = event.target.value as (typeof plannedFormatLabels)[number] | '';
                void saveFields({
                  'PhD by traditional thesis format': label === 'PhD by traditional thesis format',
                  'PhD by publication': label === 'PhD by publication',
                  'Masters Full-thesis': label === 'Masters Full-thesis',
                  'Masters Mini thesis': label === 'Masters Mini thesis',
                  'Masters by publication': label === 'Masters by publication',
                });
              }}
            >
              <option value=''>--- Select planned format ---</option>
              {plannedFormatLabels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Card>

      {/* Thesis Details */}
      <Card>
        <h3 className='mb-3 text-sm font-bold'>Thesis Details</h3>
        <div className={FORM_GRID_CLASS}>
          <label className='space-y-1 text-sm md:col-span-6 lg:col-span-12'>
            <span className='text-muted'>Thesis title</span>
            <textarea
              className={FORM_TEXTAREA_CLASS}
              value={formData['Thesis title']}
              onChange={(event) => void saveField('Thesis title', event.target.value)}
            />
          </label>
          <label className='space-y-1 text-sm md:col-span-6 lg:col-span-12'>
            <span className='text-muted'>Key words</span>
            <input
              className={FORM_CONTROL_CLASS}
              value={formData['Key words']}
              onChange={(event) => void saveField('Key words', event.target.value)}
            />
            <span className='text-xs text-muted'>Use precise key phrases, comma-separated.</span>
          </label>
          <label className='space-y-1 text-sm md:col-span-6 lg:col-span-12'>
            <span className='text-muted'>Abstract</span>
            <textarea
              className='min-h-28 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2'
              value={formData.Abstract}
              onChange={(event) => void saveField('Abstract', event.target.value)}
            />
          </label>
          <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
            <span className='text-muted'>
              Initial thesis title for upgrade from Masters to Doctoral
            </span>
            <input
              className={FORM_CONTROL_CLASS}
              value={formData['Initial thesis title for upgrade from Masters to Doctoral']}
              onChange={(event) =>
                void saveField(
                  'Initial thesis title for upgrade from Masters to Doctoral',
                  event.target.value,
                )
              }
            />
          </label>
          <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
            <span className='text-muted'>
              PhD project proposal upload/link (5-10 pages incl. timeframes)
            </span>
            <input
              className={FORM_CONTROL_CLASS}
              value={formData['PhD proposal link (5-10 pages incl. timeframes)']}
              onChange={(event) =>
                void saveField(
                  'PhD proposal link (5-10 pages incl. timeframes)',
                  event.target.value,
                )
              }
            />
          </label>
        </div>
      </Card>

      {/* Ethics */}
      <Card>
        <h3 className='mb-3 text-sm font-bold'>Ethics</h3>
        <div className={FORM_GRID_CLASS}>
          <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
            <span className='text-muted'>Does this project need Ethics clearance?</span>
            <select
              className={FORM_CONTROL_CLASS}
              value={formData['Does this project need Ethics clearance?']}
              onChange={(event) =>
                void saveField('Does this project need Ethics clearance?', event.target.value)
              }
            >
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </label>
          <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
            <span className='text-muted'>Ethics clearance reference number</span>
            <input
              className={FORM_CONTROL_CLASS}
              value={formData['Ethics clearance reference number']}
              onChange={(event) =>
                void saveField('Ethics clearance reference number', event.target.value)
              }
            />
          </label>
          <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
            <span className='text-muted'>Date on which ethics clearance was issued</span>
            <input
              className={FORM_CONTROL_CLASS}
              value={formData['Date on which ethics clearance was issued']}
              onChange={(event) =>
                void saveField('Date on which ethics clearance was issued', event.target.value)
              }
            />
          </label>
        </div>
      </Card>

      {/* MOU gate */}
      <Card>
        <h3 className='mb-3 text-sm font-bold'>MOU</h3>
        <label className='space-y-1 text-sm'>
          <span className='text-muted'>Has the MOU been submitted?</span>
          <input
            className={FORM_CONTROL_CLASS}
            value={formData['Has the MOU been submitted?']}
            disabled
          />
        </label>
        <p className='mt-2 text-xs text-muted'>
          Sequence enforced: ROTT -&gt; Supervisor Profiles (+CV) -&gt; MOU.
        </p>
        <div className='mt-2'>
          <Button
            disabled={caseRecord.completion_percent < 100}
            onClick={() => void loadModuleData('mou')}
          >
            Open MOU Module
          </Button>
        </div>
        {caseRecord.completion_percent < 100 && (
          <p className='mt-2 text-xs text-muted'>
            Complete and save the ROTT in full before opening MOU.
          </p>
        )}
      </Card>

      {/* Primary supervisor */}
      <SupervisorRoleCard
        config={{
          role: 'supervisor',
          heading: 'Supervisor Details',
          icon: <UserRound size={14} className='text-accent' />,
          isInternalKey: 'Supervisor is UWC-internal',
          internalNameKey: 'Supervisor',
          qualificationKey: 'Supervisor Qualifications',
          externalLookupIdKey: 'Supervisor External Lookup Id',
          externalTitleKey: 'Supervisor Title',
          externalFirstNameKey: 'Supervisor External First Name',
          externalSurnameKey: 'Supervisor External Surname',
          externalEmailKey: 'Supervisor External Email',
          directory: peopleDirectory,
          internalSelectPlaceholder: '--- Select supervisor ---',
          inviteLabel: 'supervisor',
        }}
        {...roleCardProps('supervisor')}
      />

      {/* Administrative Supervisor (Nominal Role) */}
      <SupervisorRoleCard
        config={{
          role: 'admin',
          heading: 'Administrative Supervisor (Nominal Role)',
          icon: <ShieldCheck size={14} className='text-accent' />,
          isInternalKey: 'Administrative Supervisor is UWC-internal',
          internalNameKey: 'Administrative Supervisor (Nominal Role)',
          qualificationKey: 'Administrative Supervisor Qualifications (Nominal Role)',
          externalLookupIdKey: 'Administrative Supervisor External Lookup Id',
          externalTitleKey: 'Administrative Supervisor External Title',
          externalFirstNameKey: 'Administrative Supervisor External First Name',
          externalSurnameKey: 'Administrative Supervisor External Surname',
          externalEmailKey: 'Administrative Supervisor External Email',
          directory: bcbDirectory,
          internalSelectPlaceholder: '--- Select administrative supervisor ---',
          inviteLabel: 'administrative supervisor',
          sameAsPrimary: {
            fieldKey: 'Administrative Supervisor same as Supervisor',
            label: 'Administrative supervisor same as supervisor?',
            resolveDisplayValue: () =>
              formData['Supervisor is UWC-internal'] === 'Yes'
                ? resolveInternalDisplayName(formData.Supervisor, peopleDirectory)
                : `${formData['Supervisor Title']} ${formData['Supervisor External First Name']} ${formData['Supervisor External Surname']}`
                    .replace(/\s+/g, ' ')
                    .trim(),
            onChange: handleAdminSupervisorSameAsSupervisorChange,
          },
        }}
        {...roleCardProps('admin')}
      />

      {/* Co-supervisor count selector */}
      <Card>
        <h3 className='mb-3 flex items-center gap-2 text-sm font-bold'>
          <UsersRound size={14} className='text-accent' /> Co-supervisor Details
        </h3>
        <div className={FORM_GRID_CLASS}>
          <label className='space-y-1 text-sm md:col-span-2 lg:col-span-3'>
            <FieldLabel text='Number of Co-supervisors' required />
            <select
              className={FORM_CONTROL_CLASS}
              value={String(coCount)}
              onChange={(event) =>
                void setCoSupervisorCount(Number(event.target.value) as 0 | 1 | 2)
              }
            >
              <option value='0'>0</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </label>
          {coCount === 0 && (
            <p className='self-end text-sm text-muted md:col-span-4 lg:col-span-9'>
              No co-supervisor fields are required.
            </p>
          )}
        </div>
      </Card>

      {/* Co-supervisor 1 */}
      {coCount >= 1 && (
        <SupervisorRoleCard
          config={{
            role: 'co1',
            heading: 'Co-supervisor 1',
            icon: <UsersRound size={14} className='text-accent' />,
            isInternalKey: 'Co-supervisor is UWC-internal',
            internalNameKey: 'Co-supervisor',
            qualificationKey: 'Co-supervisor Qualifications',
            externalLookupIdKey: 'Co-supervisor External Lookup Id',
            externalTitleKey: 'Co-supervisor Title',
            externalFirstNameKey: 'Co-supervisor External First Name',
            externalSurnameKey: 'Co-supervisor External Surname',
            externalEmailKey: 'Co-supervisor External Email',
            directory: peopleDirectory,
            internalSelectPlaceholder: '--- Select co-supervisor 1 ---',
            inviteLabel: 'co-supervisor 1',
          }}
          {...roleCardProps('co1')}
        />
      )}

      {/* Co-supervisor 2 */}
      {coCount === 2 && (
        <SupervisorRoleCard
          config={{
            role: 'co2',
            heading: 'Co-supervisor 2',
            icon: <UsersRound size={14} className='text-accent' />,
            isInternalKey: 'Second Co-supervisor is UWC-internal',
            internalNameKey: 'Second Co-supervisor',
            qualificationKey: 'Second Co-supervisor Qualifications',
            externalLookupIdKey: 'Second Co-supervisor External Lookup Id',
            externalTitleKey: 'Second Co-supervisor Title',
            externalFirstNameKey: 'Second Co-supervisor External First Name',
            externalSurnameKey: 'Second Co-supervisor External Surname',
            externalEmailKey: 'Second Co-supervisor External Email',
            directory: peopleDirectory,
            internalSelectPlaceholder: '--- Select co-supervisor 2 ---',
            inviteLabel: 'co-supervisor 2',
          }}
          {...roleCardProps('co2')}
        />
      )}

      {/* Save / Generate / Student Vet actions */}
      <Card>
        <div className='flex flex-wrap gap-2'>
          <Button disabled={isSaving} onClick={() => void handleSaveFormNow()}>
            Save
          </Button>
          <Button
            disabled={isSaving || caseRecord.completion_percent < 100}
            onClick={() => void handleGeneratePdf()}
          >
            Generate Print PDF
          </Button>
          {printUrl && (
            <a
              href={printUrl}
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'
            >
              Open Printable PDF
            </a>
          )}
          <Button
            disabled={caseRecord.case_status !== 'awaiting_student_vetting'}
            onClick={() => void handleStudentVet()}
          >
            Email to Supervisor
          </Button>
        </div>
        {lastSavedAt && (
          <p className='mt-2 text-xs text-muted'>
            Information saved at{' '}
            {new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
            {new Date(lastSavedAt).toLocaleDateString([], {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
            .
          </p>
        )}
      </Card>

      {/* Review Actions */}
      <Card>
        <h2 className='mb-2 text-sm font-bold'>Review Actions</h2>
        <div className='grid gap-3 md:grid-cols-[auto_1fr_auto_auto_auto]'>
          <DecisionDropdown value={decision} onChange={setDecision} />
          <input
            className='rounded-xl border border-white/10 bg-surface2 px-3 py-2 text-sm'
            placeholder='Comments for return actions'
            value={comments}
            onChange={(event) => setComments(event.target.value)}
          />
          <Button
            disabled={caseRecord.case_status !== 'awaiting_supervisor_review'}
            onClick={() => void handleSupervisorReview()}
          >
            Supervisor Review
          </Button>
          <Button
            disabled={caseRecord.case_status !== 'awaiting_dept_fhd_review'}
            onClick={() => void handleDeptReview()}
          >
            Dept FHD Vet (Adriaan)
          </Button>
          <Button
            disabled={caseRecord.case_status !== 'awaiting_chairperson_signature'}
            onClick={() => void handleChairpersonSign()}
          >
            Chairperson Sign
          </Button>
        </div>
        <div className='mt-3 grid gap-3 md:grid-cols-[auto_auto_auto]'>
          <Button
            disabled={caseRecord.case_status !== 'awaiting_dept_fhd_send_to_faculty'}
            onClick={() => void handleDeptSendFaculty()}
          >
            Dept FHD Send to Faculty
          </Button>
          <Button
            disabled={caseRecord.case_status !== 'sent_to_faculty_fhd'}
            onClick={() => void handleFacultyReview()}
          >
            Faculty FHD Review
          </Button>
          <Button
            disabled={caseRecord.case_status !== 'sent_to_faculty_fhd'}
            onClick={() => void triggerReminder()}
          >
            Send 3-Workday Reminder
          </Button>
        </div>
        <div className='mt-2 text-xs text-muted'>
          Flow: Supervisor -&gt; Dept FHD vet -&gt; Chairperson sign -&gt; Dept FHD sends to
          Faculty FHD -&gt; Faculty vet/return.
        </div>
      </Card>
    </>
  );
}

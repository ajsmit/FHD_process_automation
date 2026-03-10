'use client';

import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type {
  ExternalAcademicDirectory,
  ExternalInviteStatus,
  FormData,
  StaffDirectory,
} from '@/lib/api';
import { ExternalRegistryLookup } from './ExternalRegistryLookup';

export type ExternalRole = 'supervisor' | 'admin' | 'co1' | 'co2';

// ---------------------------------------------------------------------------
// FieldLabel — shared form label with optional required cue
// ---------------------------------------------------------------------------
export function FieldLabel({ text, required = false }: { text: string; required?: boolean }) {
  return (
    <span className='text-muted'>
      {text}
      {required ? <span className='ml-2 text-xs text-rose-300'>Required</span> : null}
    </span>
  );
}

// ---------------------------------------------------------------------------
// RoleCardConfig — all per-role variance lives here; none in the component
// ---------------------------------------------------------------------------
export interface SameAsPrimaryConfig {
  /** FormData key storing the 'Yes' | 'No' flag, e.g. 'Administrative Supervisor same as Supervisor' */
  fieldKey: keyof FormData;
  /** Label for the same-as-primary toggle */
  label: string;
  /** Returns the display name to show when collapsed (reads from parent formData) */
  resolveDisplayValue: () => string;
  /** Persist the Yes/No change */
  onChange: (value: 'Yes' | 'No') => Promise<void>;
}

export interface RoleCardConfig {
  role: ExternalRole;
  heading: string;
  icon: ReactNode;
  /** FormData key for the is-internal toggle, e.g. 'Supervisor is UWC-internal' */
  isInternalKey: keyof FormData;
  /** FormData key for the internal dropdown value, e.g. 'Supervisor' */
  internalNameKey: keyof FormData;
  /** FormData key for qualifications read-only display, e.g. 'Supervisor Qualifications' */
  qualificationKey: keyof FormData;
  /** FormData key for external registry lookup ID */
  externalLookupIdKey: keyof FormData;
  /** FormData key for external title capture */
  externalTitleKey: keyof FormData;
  /** FormData key for external first name capture */
  externalFirstNameKey: keyof FormData;
  /** FormData key for external surname capture */
  externalSurnameKey: keyof FormData;
  /** FormData key for external email capture */
  externalEmailKey: keyof FormData;
  /** Directory used to populate the internal person select */
  directory: StaffDirectory[];
  /** Placeholder text for the internal select, e.g. '--- Select supervisor ---' */
  internalSelectPlaceholder: string;
  /** Role description used in invite status messages, e.g. 'supervisor' */
  inviteLabel: string;
  /** Present only for roles that can be collapsed to match the primary supervisor */
  sameAsPrimary?: SameAsPrimaryConfig;
}

// ---------------------------------------------------------------------------
// SupervisorRoleCard props
// ---------------------------------------------------------------------------
interface SupervisorRoleCardProps {
  config: RoleCardConfig;
  formData: FormData;
  externalSearch: string;
  onExternalSearchChange: (value: string) => void;
  filteredExternalOptions: ExternalAcademicDirectory[];
  formatExternalPerson: (person: ExternalAcademicDirectory) => string;
  formatInternalPerson: (person: StaffDirectory) => string;
  internalPersonValue: (person: StaffDirectory) => string;
  resolveInternalDisplayName: (value: string, directory: StaffDirectory[]) => string;
  /** Called when the is-internal toggle changes */
  onIsInternalChange: (value: 'Yes' | 'No') => void;
  /** Called when the internal person dropdown changes */
  onInternalSelect: (value: string) => Promise<void>;
  /** Called when the external registry lookup dropdown changes */
  onExternalLookup: (value: string) => Promise<void>;
  /** Called with a partial FormData patch when any external capture field changes */
  onExternalFieldChange: (patch: Partial<FormData>) => void;
  /** Called to send the profile invite link */
  onSendProfileLink: () => Promise<void>;
  inviteStatus: ExternalInviteStatus | null;
}

// ---------------------------------------------------------------------------
// SupervisorRoleCard
// ---------------------------------------------------------------------------
const fieldClass = 'w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2';
const sectionGrid = 'grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12';

export function SupervisorRoleCard({
  config,
  formData,
  externalSearch,
  onExternalSearchChange,
  filteredExternalOptions,
  formatExternalPerson,
  formatInternalPerson,
  internalPersonValue,
  resolveInternalDisplayName,
  onIsInternalChange,
  onInternalSelect,
  onExternalLookup,
  onExternalFieldChange,
  onSendProfileLink,
  inviteStatus,
}: SupervisorRoleCardProps) {
  const isInternal = formData[config.isInternalKey] as 'Yes' | 'No';
  const sameAsPrimary = config.sameAsPrimary;
  const collapsedBySameAsPrimary =
    sameAsPrimary != null &&
    (formData[sameAsPrimary.fieldKey] as 'Yes' | 'No') === 'Yes';

  const externalTitle = String(formData[config.externalTitleKey]);
  const externalFirstName = String(formData[config.externalFirstNameKey]);
  const externalSurname = String(formData[config.externalSurnameKey]);
  const externalEmail = String(formData[config.externalEmailKey]);
  const resolvedExternalName = `${externalTitle} ${externalFirstName} ${externalSurname}`
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <Card>
      <h3 className='mb-3 flex items-center gap-2 text-sm font-bold'>
        {config.icon}
        {config.heading}
      </h3>

      {/* Same-as-primary shortcut (admin supervisor only) */}
      {sameAsPrimary != null && (
        <div className={`${sectionGrid} mb-3`}>
          <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
            <FieldLabel text={sameAsPrimary.label} required />
            <select
              className={fieldClass}
              value={formData[sameAsPrimary.fieldKey] as string}
              onChange={(event) =>
                void sameAsPrimary.onChange(event.target.value as 'Yes' | 'No')
              }
            >
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </label>
          {collapsedBySameAsPrimary && (
            <label className='space-y-1 text-sm md:col-span-4 lg:col-span-8'>
              <span className='text-muted'>{config.heading} (resolved)</span>
              <input className={fieldClass} value={sameAsPrimary.resolveDisplayValue()} disabled />
            </label>
          )}
        </div>
      )}

      {/* Main card body — hidden when collapsed by same-as-primary */}
      {!collapsedBySameAsPrimary && (
        <div className={sectionGrid}>
          {/* Internal / External toggle */}
          <label className='space-y-1 text-sm md:col-span-2 lg:col-span-3'>
            <FieldLabel text={`${config.heading} is UWC-internal`} required />
            <select
              className={fieldClass}
              value={isInternal}
              onChange={(event) => onIsInternalChange(event.target.value as 'Yes' | 'No')}
            >
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </label>

          {isInternal === 'Yes' ? (
            <>
              {/* Internal person select */}
              <label className='space-y-1 text-sm md:col-span-4 lg:col-span-9'>
                <FieldLabel text={config.heading} required />
                <select
                  className={fieldClass}
                  value={String(formData[config.internalNameKey])}
                  onChange={(event) => void onInternalSelect(event.target.value)}
                >
                  <option value=''>{config.internalSelectPlaceholder}</option>
                  {config.directory.map((person) => (
                    <option key={person.id} value={internalPersonValue(person)}>
                      {formatInternalPerson(person)}
                    </option>
                  ))}
                </select>
              </label>
              {/* Resolved display */}
              <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
                <span className='text-muted'>{config.heading} (resolved)</span>
                <input
                  className={fieldClass}
                  value={resolveInternalDisplayName(
                    String(formData[config.internalNameKey]),
                    config.directory,
                  )}
                  disabled
                />
              </label>
              {/* Qualifications read-only */}
              <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
                <span className='text-muted'>{config.heading} Qualifications</span>
                <input
                  className={fieldClass}
                  value={String(formData[config.qualificationKey])}
                  disabled
                />
              </label>
            </>
          ) : (
            <>
              {/* External registry lookup (spans from ExternalRegistryLookup use 1/6/12 grid) */}
              <ExternalRegistryLookup
                role={config.role}
                searchValue={externalSearch}
                onSearchChange={onExternalSearchChange}
                lookupValue={String(formData[config.externalLookupIdKey])}
                onLookupChange={onExternalLookup}
                options={filteredExternalOptions}
                formatOptionLabel={formatExternalPerson}
              />

              {/* External minimal capture */}
              <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
                <FieldLabel text='Title' required />
                <input
                  className={fieldClass}
                  placeholder='e.g., Prof / Dr / Mr / Ms'
                  value={externalTitle}
                  onChange={(event) =>
                    onExternalFieldChange({
                      [config.externalTitleKey]: event.target.value,
                    } as Partial<FormData>)
                  }
                />
              </label>
              <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
                <FieldLabel text='First Name' required />
                <input
                  className={fieldClass}
                  placeholder='Enter first/given name'
                  value={externalFirstName}
                  onChange={(event) =>
                    onExternalFieldChange({
                      [config.externalFirstNameKey]: event.target.value,
                    } as Partial<FormData>)
                  }
                />
              </label>
              <label className='space-y-1 text-sm md:col-span-2 lg:col-span-4'>
                <FieldLabel text='Surname' required />
                <input
                  className={fieldClass}
                  placeholder='Enter surname/family name'
                  value={externalSurname}
                  onChange={(event) =>
                    onExternalFieldChange({
                      [config.externalSurnameKey]: event.target.value,
                    } as Partial<FormData>)
                  }
                />
              </label>
              <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
                <span className='text-muted'>Resolved Name</span>
                <input className={fieldClass} value={resolvedExternalName} disabled />
              </label>
              <label className='space-y-1 text-sm md:col-span-3 lg:col-span-6'>
                <FieldLabel text='Email' required />
                <input
                  className={fieldClass}
                  placeholder='name@institution.edu'
                  value={externalEmail}
                  onChange={(event) =>
                    onExternalFieldChange({
                      [config.externalEmailKey]: event.target.value,
                    } as Partial<FormData>)
                  }
                />
              </label>

              {/* Send invite + status */}
              <div className='md:col-span-6 lg:col-span-12'>
                <Button onClick={() => void onSendProfileLink()}>Send Profile Link</Button>
                {inviteStatus != null && (
                  <p className='mt-2 text-xs text-muted'>
                    {inviteStatus.status === 'completed'
                      ? `External ${config.inviteLabel} profile completed. Database has been updated.`
                      : inviteStatus.status === 'pending'
                        ? `Waiting on external ${config.inviteLabel} action (${inviteStatus.deliveryStatus}).`
                        : 'Previous invite expired. Please send a new profile link.'}
                    {inviteStatus.expiresAt != null
                      ? ` Expires ${new Date(inviteStatus.expiresAt).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' })}.`
                      : ''}
                    {' '}
                    <a
                      href={inviteStatus.inviteLink}
                      target='_blank'
                      rel='noreferrer'
                      className='text-accent underline'
                    >
                      Open link
                    </a>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

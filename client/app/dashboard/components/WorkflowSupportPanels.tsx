import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { MouFormData, MouFormRecord, SupervisorProfileForm } from '@/lib/api';

interface WorkflowSupportPanelsProps {
  activeModule: string;
  caseRecordId: number | null;
  supervisorProfiles: SupervisorProfileForm[];
  apiOrigin: string;
  onRequestProfiles: () => void;
  onSupervisorProfileReminder: () => void;
  onUpdateProfileField: (profileId: number, patch: Record<string, unknown>) => void;
  onSubmitProfile: (profileId: number) => void;
  onUploadProfileCv: (profileId: number, file: File) => void;
  mouData: MouFormData | null;
  mouRecord: MouFormRecord | null;
  mouPrintUrl: string | null;
  onSaveMouField: (label: keyof MouFormData, value: string) => void;
  onPrintMou: () => void;
  onCompleteMou: () => void;
}

export function WorkflowSupportPanels({
  activeModule,
  caseRecordId,
  supervisorProfiles,
  apiOrigin,
  onRequestProfiles,
  onSupervisorProfileReminder,
  onUpdateProfileField,
  onSubmitProfile,
  onUploadProfileCv,
  mouData,
  mouRecord,
  mouPrintUrl,
  onSaveMouField,
  onPrintMou,
  onCompleteMou,
}: WorkflowSupportPanelsProps) {
  return (
    <>
      {activeModule === 'supervisor_profiles' && caseRecordId && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>Supervisor Profile Forms</h2>
          <div className='mb-3 flex flex-wrap gap-2'>
            <Button onClick={onRequestProfiles}>Request Completion</Button>
            <Button onClick={onSupervisorProfileReminder}>Send Reminder</Button>
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
                        onUpdateProfileField(profile.id, { publication_count: Number.isNaN(next as number) ? null : next });
                      }}
                    />
                  </label>
                  <label className='space-y-1 md:col-span-3 lg:col-span-4'>
                    <span className='text-muted'>New to department?</span>
                    <select
                      className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2'
                      value={profile.new_to_department}
                      onChange={(event) => onUpdateProfileField(profile.id, { new_to_department: event.target.value })}
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
                      onChange={(event) => onUpdateProfileField(profile.id, { cv_attached: event.target.value })}
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
                          onUploadProfileCv(profile.id, file);
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
                    <input className='w-full rounded-xl border border-white/10 bg-surface px-3 py-2' value={profile.contact_email} onChange={(event) => onUpdateProfileField(profile.id, { contact_email: event.target.value })} />
                  </label>
                  {profile.role === 'co_supervisor' && (
                    <label className='space-y-1 md:col-span-6 lg:col-span-12'>
                      <span className='text-muted'>Point 5.2 Motivation (contribution, not expertise)</span>
                      <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface px-3 py-2' value={profile.contribution_motivation} onChange={(event) => onUpdateProfileField(profile.id, { contribution_motivation: event.target.value })} />
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
                      onChange={(event) => onUpdateProfileField(profile.id, { recent_publications: event.target.value.split('\n').map((line) => line.trim()).filter(Boolean) })}
                    />
                  </label>
                </div>
                <div className='mt-2'>
                  <Button
                    onClick={() => onSubmitProfile(profile.id)}
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

      {activeModule === 'mou' && caseRecordId && mouData && (
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
                    <textarea className='min-h-20 w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={mouData[label]} disabled={isReadonly || mouRecord?.status === 'completed'} onChange={(event) => onSaveMouField(label, event.target.value)} />
                  ) : (
                    <input className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={mouData[label]} disabled={isReadonly || mouRecord?.status === 'completed'} onChange={(event) => onSaveMouField(label, event.target.value)} />
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
                <select className='w-full rounded-xl border border-white/10 bg-surface2 px-3 py-2' value={mouData[label]} disabled={mouRecord?.status === 'completed'} onChange={(event) => onSaveMouField(label, event.target.value)}>
                  <option value='' disabled>---</option>
                  <option value='No'>No</option>
                  <option value='Yes'>Yes</option>
                </select>
              </label>
            ))}
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onPrintMou}>Generate MOU PDF</Button>
            {mouPrintUrl && (
              <a href={mouPrintUrl} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                Open MOU PDF
              </a>
            )}
            <Button onClick={onCompleteMou} disabled={mouRecord?.status === 'completed'}>
              Mark MOU Completed
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

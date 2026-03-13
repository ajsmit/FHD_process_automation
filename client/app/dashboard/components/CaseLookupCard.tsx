import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/search-input';
import type { CaseStatus, FacultyProcessCalendar, LandingMessage, PolicyWarning, SasiStudent, TitleRegistrationCase } from '@/lib/api';

interface CaseLookupCardProps {
  studentNumber: string;
  onStudentNumberChange: (value: string) => void;
  loading: boolean;
  onCheckSasi: () => void;
  student: SasiStudent | null;
  caseRecord: TitleRegistrationCase | null;
  facultyCalendar: FacultyProcessCalendar | null;
  policyWarnings: PolicyWarning[];
  landingMessages: LandingMessage[];
  statusLabel: (status: CaseStatus) => string;
  statusTone: (status: CaseStatus) => 'approved' | 'in_progress' | 'action_required';
}

function formatDeadline(dateIso: string | null): string {
  if (!dateIso) {
    return 'Not set';
  }
  const date = new Date(`${dateIso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return dateIso;
  }
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export function CaseLookupCard({
  studentNumber,
  onStudentNumberChange,
  loading,
  onCheckSasi,
  student,
  caseRecord,
  facultyCalendar,
  policyWarnings,
  landingMessages,
  statusLabel,
  statusTone,
}: CaseLookupCardProps) {
  const facultyMessages = landingMessages.filter((entry) => entry.scope === 'faculty');
  const departmentMessages = landingMessages.filter((entry) => entry.scope === 'department');

  return (
    <Card>
      <div className='grid gap-3 md:grid-cols-[1fr_auto] md:items-center'>
        <SearchInput
          value={studentNumber}
          onChange={(event) => onStudentNumberChange(event.target.value.replace(/\D/g, '').slice(0, 7))}
          placeholder='Enter SASI student number (e.g. 1234567)'
          inputMode='numeric'
          maxLength={7}
          pattern='\d{7}'
        />
        <Button disabled={loading} onClick={onCheckSasi}>
          Check SASI
        </Button>
      </div>
      {student && caseRecord && (
        <div className='mt-3 flex flex-wrap items-center gap-2 text-sm'>
          <span>
            {student.first_names} {student.last_name}
          </span>
          <Badge label={statusLabel(caseRecord.case_status)} status={statusTone(caseRecord.case_status)} />
          <span className='text-muted'>Completion {caseRecord.completion_percent}%</span>
        </div>
      )}
      {caseRecord && (
        <div className='mt-2 h-2 overflow-hidden rounded-full bg-white/10'>
          <div className='h-full rounded-full bg-accent transition-all' style={{ width: `${caseRecord.completion_percent}%` }} />
        </div>
      )}
      {facultyCalendar && (
        <div className='mt-3 rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
          <p className='font-semibold'>Faculty Process Calendar ({facultyCalendar.academicYear})</p>
          <p className='text-muted'>ROTT: {formatDeadline(facultyCalendar.rottSubmissionDeadline)} | Progress report: {formatDeadline(facultyCalendar.progressReportDeadline)}</p>
          <p className='text-muted'>Intention to submit: {formatDeadline(facultyCalendar.intentionToSubmitDeadline)} | Appoint examiners: {formatDeadline(facultyCalendar.appointExaminersDeadline)}</p>
          {facultyCalendar.publishedNotice && <p className='mt-1 text-muted'>{facultyCalendar.publishedNotice}</p>}
        </div>
      )}
      {policyWarnings.length > 0 && (
        <div className='mt-3 space-y-2'>
          {policyWarnings.map((warning) => (
            <div key={warning.code} className='rounded-xl border border-amber-300/40 bg-amber-100/10 p-3 text-sm text-amber-100'>
              {warning.message}
            </div>
          ))}
        </div>
      )}
      {landingMessages.length > 0 && (
        <div className='mt-3 grid gap-3 md:grid-cols-2'>
          <div className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
            <p className='font-semibold'>Faculty Messages</p>
            {facultyMessages.length === 0 && <p className='text-muted'>No active Faculty messages.</p>}
            {facultyMessages.map((entry) => (
              <p key={entry.id} className='mt-2 text-muted'>{entry.message}</p>
            ))}
          </div>
          <div className='rounded-xl border border-white/10 bg-surface2 p-3 text-sm'>
            <p className='font-semibold'>Department Messages</p>
            {departmentMessages.length === 0 && <p className='text-muted'>No active department messages.</p>}
            {departmentMessages.map((entry) => (
              <p key={entry.id} className='mt-2 text-muted'>{entry.message}</p>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SearchInput } from '@/components/ui/search-input';
import type { CaseStatus, SasiStudent, TitleRegistrationCase } from '@/lib/api';

interface CaseLookupCardProps {
  studentNumber: string;
  onStudentNumberChange: (value: string) => void;
  loading: boolean;
  onCheckSasi: () => void;
  student: SasiStudent | null;
  caseRecord: TitleRegistrationCase | null;
  statusLabel: (status: CaseStatus) => string;
  statusTone: (status: CaseStatus) => 'approved' | 'in_progress' | 'action_required';
}

export function CaseLookupCard({
  studentNumber,
  onStudentNumberChange,
  loading,
  onCheckSasi,
  student,
  caseRecord,
  statusLabel,
  statusTone,
}: CaseLookupCardProps) {
  return (
    <Card>
      <div className='grid gap-3 md:grid-cols-[1fr_auto] md:items-center'>
        <SearchInput
          value={studentNumber}
          onChange={(event) => onStudentNumberChange(event.target.value)}
          placeholder='Enter SASI student number (e.g. 1234567)'
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
    </Card>
  );
}

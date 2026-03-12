import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type {
  LeaveOfAbsenceFormData,
  OtherRequestFormData,
  ProgressReportFormData,
  ReadmissionRequestFormData,
  SupervisorSummativeReportFormData,
  UpgradeMscToPhdFormData,
} from '@/lib/api';
import { ReviewActionButtons } from './moduleActionButtons';
import { ModuleField, type SelectOption } from './moduleFieldRenderers';
import type { WorkflowModulePanelsProps } from './workflowModulePanelTypes';

export function ProgressionModulePanels({
  activeModule,
  caseRecordId,
  toGeneratedFormUrl,
  progressReportRecord,
  progressReportData,
  progressReportPdfPath,
  onSaveProgressReportField,
  onSubmitProgressReportModule,
  onReviewProgressReportModule,
  onPrintProgressReport,
  leaveRecord,
  leaveData,
  leavePdfPath,
  onSaveLeaveField,
  onSubmitLeaveModule,
  onReviewLeaveModule,
  onPrintLeave,
  readmissionRecord,
  readmissionData,
  readmissionPdfPath,
  onSaveReadmissionField,
  onSubmitReadmissionModule,
  onReviewReadmissionModule,
  onPrintReadmission,
  upgradeRecord,
  upgradeData,
  upgradePdfPath,
  onSaveUpgradeField,
  onSubmitUpgradeModule,
  onReviewUpgradeModule,
  onPrintUpgrade,
  summativeRecord,
  summativeData,
  summativePdfPath,
  onSaveSummativeField,
  onSubmitSummativeModule,
  onReviewSummativeModule,
  onPrintSummative,
  otherRequestRecord,
  otherRequestData,
  otherRequestPdfPath,
  onSaveOtherRequestField,
  onSubmitOtherRequestModule,
  onReviewOtherRequestModule,
  onPrintOtherRequest,
}: WorkflowModulePanelsProps) {
  return (
    <>
      {activeModule === 'progress_report' && caseRecordId && progressReportData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>PROGRESS_REPORT Module</h2>
          <div className='mb-3 text-sm text-muted'>Status: {progressReportRecord?.status ?? 'draft'} • Completion: {progressReportRecord?.completion_percent ?? 0}%</div>
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
                'Reporting period',
                'Research progress summary',
                'Challenges',
                'Publication output',
                'Ethics compliance status',
                'Support required',
                'Student declaration',
                'Supervisor comment',
              ] as Array<keyof ProgressReportFormData>
            ).map((label) => {
              const readonly = new Set<keyof ProgressReportFormData>([
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Supervisor',
                'Co-supervisor(s)',
                'Thesis title',
              ]).has(label);
              const isLong = ['Research progress summary', 'Challenges', 'Publication output', 'Support required', 'Student declaration', 'Supervisor comment'].includes(label);
              return (
                <ModuleField<ProgressReportFormData>
                  key={label}
                  label={label}
                  value={progressReportData[label]}
                  disabled={readonly}
                  isLong={isLong}
                  onChange={onSaveProgressReportField}
                />
              );
            })}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onSubmitProgressReportModule}>Submit PROGRESS_REPORT</Button>
            <ReviewActionButtons
              currentStatus={progressReportRecord?.status}
              steps={[
                {
                  approveLabel: 'Dept Approve',
                  returnLabel: 'Dept Return',
                  enabledWhen: 'awaiting_dept_review',
                  onApprove: () => onReviewProgressReportModule('approved', 'dept'),
                  onReturn: () => onReviewProgressReportModule('returned', 'dept'),
                },
                {
                  approveLabel: 'Faculty Approve',
                  returnLabel: 'Faculty Return',
                  enabledWhen: 'awaiting_faculty_review',
                  onApprove: () => onReviewProgressReportModule('approved', 'faculty'),
                  onReturn: () => onReviewProgressReportModule('returned', 'faculty'),
                },
              ]}
            />
            <Button onClick={onPrintProgressReport}>Generate PROGRESS_REPORT PDF</Button>
            {toGeneratedFormUrl(progressReportPdfPath) && <a href={toGeneratedFormUrl(progressReportPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>Open PROGRESS_REPORT PDF</a>}
          </div>
        </Card>
      )}

      {activeModule === 'leave_of_absence' && caseRecordId && leaveData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>LEAVE_OF_ABSENCE Module</h2>
          <div className='mb-3 text-sm text-muted'>Status: {leaveRecord?.status ?? 'draft'} • Completion: {leaveRecord?.completion_percent ?? 0}%</div>
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
                'Leave start date',
                'Leave end date',
                'Reason for leave',
                'Support plan during leave',
                'Student declaration',
                'Supervisor recommendation',
              ] as Array<keyof LeaveOfAbsenceFormData>
            ).map((label) => {
              const readonly = new Set<keyof LeaveOfAbsenceFormData>([
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Supervisor',
                'Co-supervisor(s)',
                'Thesis title',
              ]).has(label);
              const isLong = ['Reason for leave', 'Support plan during leave', 'Student declaration', 'Supervisor recommendation'].includes(label);
              return (
                <ModuleField<LeaveOfAbsenceFormData>
                  key={label}
                  label={label}
                  value={leaveData[label]}
                  disabled={readonly}
                  isLong={isLong}
                  onChange={onSaveLeaveField}
                />
              );
            })}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onSubmitLeaveModule}>Submit LEAVE_OF_ABSENCE</Button>
            <ReviewActionButtons currentStatus={leaveRecord?.status} steps={[{ approveLabel: 'Dept Approve', returnLabel: 'Dept Return', enabledWhen: 'awaiting_dept_review', onApprove: () => onReviewLeaveModule('approved', 'dept'), onReturn: () => onReviewLeaveModule('returned', 'dept') }, { approveLabel: 'Faculty Approve', returnLabel: 'Faculty Return', enabledWhen: 'awaiting_faculty_review', onApprove: () => onReviewLeaveModule('approved', 'faculty'), onReturn: () => onReviewLeaveModule('returned', 'faculty') }]} />
            <Button onClick={onPrintLeave}>Generate LEAVE_OF_ABSENCE PDF</Button>
            {toGeneratedFormUrl(leavePdfPath) && <a href={toGeneratedFormUrl(leavePdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>Open LEAVE_OF_ABSENCE PDF</a>}
          </div>
        </Card>
      )}

      {activeModule === 'readmission_request' && caseRecordId && readmissionData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>READMISSION_REQUEST Module</h2>
          <div className='mb-3 text-sm text-muted'>Status: {readmissionRecord?.status ?? 'draft'} • Completion: {readmissionRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Supervisor',
                'Thesis title',
                'Previous leave period',
                'Requested readmission date',
                'Reason for readmission',
                'Academic recovery plan',
                'Student declaration',
                'Supervisor recommendation',
              ] as Array<keyof ReadmissionRequestFormData>
            ).map((label) => {
              const readonly = new Set<keyof ReadmissionRequestFormData>(['Student Full Name', 'Student Number', 'Department', 'Degree', 'Supervisor', 'Thesis title']).has(label);
              const isLong = ['Reason for readmission', 'Academic recovery plan', 'Student declaration', 'Supervisor recommendation'].includes(label);
              return <ModuleField<ReadmissionRequestFormData> key={label} label={label} value={readmissionData[label]} disabled={readonly} isLong={isLong} onChange={onSaveReadmissionField} />;
            })}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onSubmitReadmissionModule}>Submit READMISSION_REQUEST</Button>
            <ReviewActionButtons currentStatus={readmissionRecord?.status} steps={[{ approveLabel: 'Dept Approve', returnLabel: 'Dept Return', enabledWhen: 'awaiting_dept_review', onApprove: () => onReviewReadmissionModule('approved', 'dept'), onReturn: () => onReviewReadmissionModule('returned', 'dept') }, { approveLabel: 'Faculty Approve', returnLabel: 'Faculty Return', enabledWhen: 'awaiting_faculty_review', onApprove: () => onReviewReadmissionModule('approved', 'faculty'), onReturn: () => onReviewReadmissionModule('returned', 'faculty') }]} />
            <Button onClick={onPrintReadmission}>Generate READMISSION_REQUEST PDF</Button>
            {toGeneratedFormUrl(readmissionPdfPath) && <a href={toGeneratedFormUrl(readmissionPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>Open READMISSION_REQUEST PDF</a>}
          </div>
        </Card>
      )}

      {activeModule === 'upgrade_msc_to_phd' && caseRecordId && upgradeData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>UPGRADE_MSC_TO_PHD Module</h2>
          <div className='mb-3 text-sm text-muted'>Status: {upgradeRecord?.status ?? 'draft'} • Completion: {upgradeRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Current Degree',
                'Requested Upgrade Degree',
                'Current Thesis title',
                'Initial thesis title for upgrade from Masters to Doctoral',
                'Upgrade motivation',
                'Research progress evidence',
                'Student declaration',
                'Supervisor recommendation',
              ] as Array<keyof UpgradeMscToPhdFormData>
            ).map((label) => {
              const readonly = new Set<keyof UpgradeMscToPhdFormData>(['Student Full Name', 'Student Number', 'Department', 'Current Degree', 'Requested Upgrade Degree', 'Current Thesis title']).has(label);
              const isLong = ['Upgrade motivation', 'Research progress evidence', 'Student declaration', 'Supervisor recommendation'].includes(label);
              return <ModuleField<UpgradeMscToPhdFormData> key={label} label={label} value={upgradeData[label]} disabled={readonly} isLong={isLong} onChange={onSaveUpgradeField} />;
            })}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onSubmitUpgradeModule}>Submit UPGRADE_MSC_TO_PHD</Button>
            <ReviewActionButtons currentStatus={upgradeRecord?.status} steps={[{ approveLabel: 'Dept Approve', returnLabel: 'Dept Return', enabledWhen: 'awaiting_dept_review', onApprove: () => onReviewUpgradeModule('approved', 'dept'), onReturn: () => onReviewUpgradeModule('returned', 'dept') }, { approveLabel: 'Faculty Approve', returnLabel: 'Faculty Return', enabledWhen: 'awaiting_faculty_review', onApprove: () => onReviewUpgradeModule('approved', 'faculty'), onReturn: () => onReviewUpgradeModule('returned', 'faculty') }]} />
            <Button onClick={onPrintUpgrade}>Generate UPGRADE_MSC_TO_PHD PDF</Button>
            {toGeneratedFormUrl(upgradePdfPath) && <a href={toGeneratedFormUrl(upgradePdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>Open UPGRADE_MSC_TO_PHD PDF</a>}
          </div>
        </Card>
      )}

      {activeModule === 'supervisor_summative_report' && caseRecordId && summativeData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>SUPERVISOR_SUMMATIVE_REPORT Module</h2>
          <div className='mb-3 text-sm text-muted'>Status: {summativeRecord?.status ?? 'draft'} • Completion: {summativeRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Supervisor',
                'Thesis title',
                'Summative period',
                'Overall progress summary',
                'Submission readiness assessment',
                'Examiner outcomes summary',
                'Supervisor recommendation',
              ] as Array<keyof SupervisorSummativeReportFormData>
            ).map((label) => {
              const readonly = new Set<keyof SupervisorSummativeReportFormData>(['Student Full Name', 'Student Number', 'Department', 'Degree', 'Supervisor', 'Thesis title']).has(label);
              const isLong = ['Overall progress summary', 'Submission readiness assessment', 'Examiner outcomes summary', 'Supervisor recommendation'].includes(label);
              return <ModuleField<SupervisorSummativeReportFormData> key={label} label={label} value={summativeData[label]} disabled={readonly} isLong={isLong} onChange={onSaveSummativeField} />;
            })}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onSubmitSummativeModule}>Submit SUPERVISOR_SUMMATIVE_REPORT</Button>
            <ReviewActionButtons currentStatus={summativeRecord?.status} steps={[{ approveLabel: 'Dept Approve', returnLabel: 'Dept Return', enabledWhen: 'awaiting_dept_review', onApprove: () => onReviewSummativeModule('approved', 'dept'), onReturn: () => onReviewSummativeModule('returned', 'dept') }, { approveLabel: 'Faculty Approve', returnLabel: 'Faculty Return', enabledWhen: 'awaiting_faculty_review', onApprove: () => onReviewSummativeModule('approved', 'faculty'), onReturn: () => onReviewSummativeModule('returned', 'faculty') }]} />
            <Button onClick={onPrintSummative}>Generate SUPERVISOR_SUMMATIVE_REPORT PDF</Button>
            {toGeneratedFormUrl(summativePdfPath) && <a href={toGeneratedFormUrl(summativePdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>Open SUPERVISOR_SUMMATIVE_REPORT PDF</a>}
          </div>
        </Card>
      )}

      {activeModule === 'other_request' && caseRecordId && otherRequestData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>OTHER_REQUEST Module</h2>
          <div className='mb-3 text-sm text-muted'>Status: {otherRequestRecord?.status ?? 'draft'} • Completion: {otherRequestRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Thesis title',
                'Request category',
                'Request details',
                'Requested effective date',
                'Impact statement',
                'Student declaration',
                'Supervisor comment',
              ] as Array<keyof OtherRequestFormData>
            ).map((label) => {
              const readonly = new Set<keyof OtherRequestFormData>(['Student Full Name', 'Student Number', 'Department', 'Degree', 'Thesis title']).has(label);
              const isLong = ['Request details', 'Impact statement', 'Student declaration', 'Supervisor comment'].includes(label);
              const isSelect = label === 'Request category';
              const selectOptions: SelectOption[] | undefined = isSelect
                ? [
                  { value: '' },
                  { value: 'Administrative exception' },
                  { value: 'Timeline adjustment' },
                  { value: 'Process clarification' },
                  { value: 'Other' },
                ]
                : undefined;
              return <ModuleField<OtherRequestFormData> key={label} label={label} value={otherRequestData[label]} disabled={readonly} isLong={isLong} options={selectOptions} onChange={onSaveOtherRequestField} />;
            })}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Button onClick={onSubmitOtherRequestModule}>Submit OTHER_REQUEST</Button>
            <ReviewActionButtons currentStatus={otherRequestRecord?.status} steps={[{ approveLabel: 'Dept Approve', returnLabel: 'Dept Return', enabledWhen: 'awaiting_dept_review', onApprove: () => onReviewOtherRequestModule('approved', 'dept'), onReturn: () => onReviewOtherRequestModule('returned', 'dept') }, { approveLabel: 'Faculty Approve', returnLabel: 'Faculty Return', enabledWhen: 'awaiting_faculty_review', onApprove: () => onReviewOtherRequestModule('approved', 'faculty'), onReturn: () => onReviewOtherRequestModule('returned', 'faculty') }]} />
            <Button onClick={onPrintOtherRequest}>Generate OTHER_REQUEST PDF</Button>
            {toGeneratedFormUrl(otherRequestPdfPath) && <a href={toGeneratedFormUrl(otherRequestPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>Open OTHER_REQUEST PDF</a>}
          </div>
        </Card>
      )}
    </>
  );
}

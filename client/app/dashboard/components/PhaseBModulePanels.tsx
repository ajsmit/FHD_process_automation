import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type {
  AppointArbiterFormData,
  AppointExaminersFormData,
  ChangeExaminersFormData,
  ExaminerSummaryCvFormData,
  IntentionToSubmitFormData,
} from '@/lib/api';
import { ReviewActionButtons } from './moduleActionButtons';
import { ModuleField, type SelectOption } from './moduleFieldRenderers';
import type { WorkflowModulePanelsProps } from './workflowModulePanelTypes';

export function PhaseBModulePanels({
  activeModule,
  caseRecordId,
  toGeneratedFormUrl,
  itsRecord,
  itsData,
  itsPdfPath,
  onSaveItsField,
  onSubmitItsModule,
  onReviewItsModule,
  onPrintIts,
  appointRecord,
  appointData,
  appointPdfPath,
  onSaveAppointField,
  onSubmitAppointModule,
  onReviewAppointModule,
  onPrintAppoint,
  changeRecord,
  changeData,
  changePdfPath,
  onSaveChangeField,
  onSubmitChangeModule,
  onReviewChangeModule,
  onPrintChange,
  summaryRecord,
  summaryData,
  summaryPdfPath,
  onSaveSummaryField,
  onSubmitSummaryModule,
  onReviewSummaryModule,
  onPrintSummary,
  arbiterRecord,
  arbiterData,
  arbiterPdfPath,
  onSaveArbiterField,
  onSubmitArbiterModule,
  onReviewArbiterModule,
  onPrintArbiter,
}: WorkflowModulePanelsProps) {
  return (
    <>
      {activeModule === 'intention_to_submit' && caseRecordId && itsData && (
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
              const selectOptions: SelectOption[] | undefined = !isSelect
                ? undefined
                : label === 'Submission type'
                  ? [{ value: '' }, { value: 'Mini thesis' }, { value: 'Project' }, { value: 'Full thesis' }]
                  : label === 'Supervisor approval status'
                    ? [{ value: 'Pending' }, { value: 'Approved' }, { value: 'Not approved' }]
                    : label === 'Co-supervisor approval status'
                      ? [{ value: 'Not applicable' }, { value: 'Pending' }, { value: 'Approved' }, { value: 'Not approved' }]
                      : [{ value: 'Pending' }, { value: 'Approved' }, { value: 'Not approved' }];

              return (
                <ModuleField<IntentionToSubmitFormData>
                  key={label}
                  label={label}
                  value={itsData[label]}
                  disabled={readonly || itsRecord?.status === 'submitted'}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveItsField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitItsModule} disabled={itsRecord?.status === 'awaiting_supervisor_review' || itsRecord?.status === 'awaiting_dept_review' || itsRecord?.status === 'approved'}>Submit INTENTION_TO_SUBMIT</Button>
              <ReviewActionButtons
                currentStatus={itsRecord?.status}
                steps={[
                  {
                    approveLabel: 'Supervisor Approve',
                    returnLabel: 'Supervisor Return',
                    enabledWhen: 'awaiting_supervisor_review',
                    onApprove: () => onReviewItsModule('approved', 'supervisor'),
                    onReturn: () => onReviewItsModule('returned', 'supervisor'),
                  },
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewItsModule('approved', 'dept'),
                    onReturn: () => onReviewItsModule('returned', 'dept'),
                  },
                ]}
              />
              <Button onClick={onPrintIts}>Generate ITS PDF</Button>
              {toGeneratedFormUrl(itsPdfPath) && (
                <a href={toGeneratedFormUrl(itsPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open ITS PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeModule === 'appoint_examiners' && caseRecordId && appointData && (
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
              const selectOptions: SelectOption[] | undefined = !isSelect
                ? undefined
                : label === 'Title already registered'
                  ? [{ value: 'Yes' }, { value: 'No' }]
                  : label.includes('Type')
                    ? [{ value: '' }, { value: 'Internal' }, { value: 'External' }, { value: 'International' }]
                    : [{ value: 'No' }, { value: 'Yes' }];
              return (
                <ModuleField<AppointExaminersFormData>
                  key={label}
                  label={label}
                  value={appointData[label]}
                  disabled={readonly || appointRecord?.status === 'submitted'}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveAppointField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitAppointModule} disabled={appointRecord?.status !== 'draft' && appointRecord?.status !== 'returned_by_dept' && appointRecord?.status !== 'returned_by_chairperson' && appointRecord?.status !== 'returned_by_faculty'}>Submit APPOINT_EXAMINERS</Button>
              <ReviewActionButtons
                currentStatus={appointRecord?.status}
                steps={[
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewAppointModule('approved', 'dept'),
                    onReturn: () => onReviewAppointModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Chair Approve',
                    returnLabel: 'Chair Return',
                    enabledWhen: 'awaiting_chairperson_review',
                    onApprove: () => onReviewAppointModule('approved', 'chair'),
                    onReturn: () => onReviewAppointModule('returned', 'chair'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewAppointModule('approved', 'faculty'),
                    onReturn: () => onReviewAppointModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintAppoint}>Generate APPOINT_EXAMINERS PDF</Button>
              {toGeneratedFormUrl(appointPdfPath) && (
                <a href={toGeneratedFormUrl(appointPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open APPOINT_EXAMINERS PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeModule === 'change_examiners' && caseRecordId && changeData && (
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
              const selectOptions: SelectOption[] | undefined = isSelect ? [{ value: '' }, { value: 'Internal' }, { value: 'External' }, { value: 'International' }] : undefined;
              return (
                <ModuleField<ChangeExaminersFormData>
                  key={label}
                  label={label}
                  value={changeData[label]}
                  disabled={readonly || changeRecord?.status === 'submitted'}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveChangeField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitChangeModule} disabled={changeRecord?.status !== 'draft' && changeRecord?.status !== 'returned_by_dept' && changeRecord?.status !== 'returned_by_chairperson' && changeRecord?.status !== 'returned_by_faculty'}>Submit CHANGE_EXAMINERS</Button>
              <ReviewActionButtons
                currentStatus={changeRecord?.status}
                steps={[
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewChangeModule('approved', 'dept'),
                    onReturn: () => onReviewChangeModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Chair Approve',
                    returnLabel: 'Chair Return',
                    enabledWhen: 'awaiting_chairperson_review',
                    onApprove: () => onReviewChangeModule('approved', 'chair'),
                    onReturn: () => onReviewChangeModule('returned', 'chair'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewChangeModule('approved', 'faculty'),
                    onReturn: () => onReviewChangeModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintChange}>Generate CHANGE_EXAMINERS PDF</Button>
              {toGeneratedFormUrl(changePdfPath) && (
                <a href={toGeneratedFormUrl(changePdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open CHANGE_EXAMINERS PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeModule === 'examiner_summary_cv' && caseRecordId && summaryData && (
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
              const selectOptions: SelectOption[] | undefined = isSelect ? [{ value: 'Pending' }, { value: 'Complete' }] : undefined;
              return (
                <ModuleField<ExaminerSummaryCvFormData>
                  key={label}
                  label={label}
                  value={summaryData[label]}
                  disabled={readonly || summaryRecord?.status === 'submitted'}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveSummaryField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitSummaryModule} disabled={summaryRecord?.status !== 'draft' && summaryRecord?.status !== 'returned_by_dept' && summaryRecord?.status !== 'returned_by_faculty'}>Submit EXAMINER_SUMMARY_CV</Button>
              <ReviewActionButtons
                currentStatus={summaryRecord?.status}
                steps={[
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewSummaryModule('approved', 'dept'),
                    onReturn: () => onReviewSummaryModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewSummaryModule('approved', 'faculty'),
                    onReturn: () => onReviewSummaryModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintSummary}>Generate EXAMINER_SUMMARY_CV PDF</Button>
              {toGeneratedFormUrl(summaryPdfPath) && (
                <a href={toGeneratedFormUrl(summaryPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open EXAMINER_SUMMARY_CV PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeModule === 'appoint_arbiter' && caseRecordId && arbiterData && (
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
              const selectOptions: SelectOption[] | undefined = !isSelect
                ? undefined
                : label === 'Arbiter Type'
                  ? [{ value: '' }, { value: 'Internal' }, { value: 'External' }, { value: 'International' }]
                  : [{ value: 'No' }, { value: 'Yes' }];
              return (
                <ModuleField<AppointArbiterFormData>
                  key={label}
                  label={label}
                  value={arbiterData[label]}
                  disabled={readonly || arbiterRecord?.status === 'submitted'}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveArbiterField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitArbiterModule} disabled={arbiterRecord?.status !== 'draft' && arbiterRecord?.status !== 'returned_by_dept' && arbiterRecord?.status !== 'returned_by_faculty'}>Submit APPOINT_ARBITER</Button>
              <ReviewActionButtons
                currentStatus={arbiterRecord?.status}
                steps={[
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewArbiterModule('approved', 'dept'),
                    onReturn: () => onReviewArbiterModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewArbiterModule('approved', 'faculty'),
                    onReturn: () => onReviewArbiterModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintArbiter}>Generate APPOINT_ARBITER PDF</Button>
              {toGeneratedFormUrl(arbiterPdfPath) && (
                <a href={toGeneratedFormUrl(arbiterPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open APPOINT_ARBITER PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

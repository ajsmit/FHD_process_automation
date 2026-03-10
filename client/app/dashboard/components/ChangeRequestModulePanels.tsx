import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type {
  AddCoSupervisorFormData,
  ChangeSupervisorFormData,
  ChangeTitleFormData,
} from '@/lib/api';
import { ReviewActionButtons } from './moduleActionButtons';
import { ModuleField, type SelectOption } from './moduleFieldRenderers';
import type { WorkflowModulePanelsProps } from './workflowModulePanelTypes';

export function ChangeRequestModulePanels({
  activeModule,
  caseRecordId,
  toGeneratedFormUrl,
  changeTitleRecord,
  changeTitleData,
  changeTitlePdfPath,
  onSaveChangeTitleField,
  onSubmitChangeTitleModule,
  onReviewChangeTitleModule,
  onPrintChangeTitle,
  changeSupervisorRecord,
  changeSupervisorData,
  changeSupervisorPdfPath,
  onSaveChangeSupervisorField,
  onSubmitChangeSupervisorModule,
  onReviewChangeSupervisorModule,
  onPrintChangeSupervisor,
  addCoSupervisorRecord,
  addCoSupervisorData,
  addCoSupervisorPdfPath,
  onSaveAddCoSupervisorField,
  onSubmitAddCoSupervisorModule,
  onReviewAddCoSupervisorModule,
  onPrintAddCoSupervisor,
}: WorkflowModulePanelsProps) {
  return (
    <>
      {activeModule === 'change_title' && caseRecordId && changeTitleData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>CHANGE_TITLE Module</h2>
          <p className='mb-3 text-sm text-muted'>This module handles thesis-title change requests with full review routing.</p>
          <div className='mb-3 text-sm text-muted'>Status: {changeTitleRecord?.status ?? 'draft'} • Completion: {changeTitleRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Current Thesis Title',
                'Proposed Thesis Title',
                'Change Rationale',
                'Ethics Impact',
                'Supervisor Comments',
              ] as Array<keyof ChangeTitleFormData>
            ).map((label) => {
              const readonly = new Set<keyof ChangeTitleFormData>([
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Current Thesis Title',
              ]).has(label);
              const isLong = label === 'Change Rationale' || label === 'Ethics Impact' || label === 'Supervisor Comments';
              const locked = !['draft', 'returned_by_supervisor', 'returned_by_dept', 'returned_by_chairperson', 'returned_by_faculty'].includes(changeTitleRecord?.status ?? 'draft');
              return (
                <ModuleField<ChangeTitleFormData>
                  key={label}
                  label={label}
                  value={changeTitleData[label]}
                  disabled={readonly || locked}
                  isLong={isLong}
                  onChange={onSaveChangeTitleField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitChangeTitleModule} disabled={!['draft', 'returned_by_supervisor', 'returned_by_dept', 'returned_by_chairperson', 'returned_by_faculty'].includes(changeTitleRecord?.status ?? 'draft')}>Submit CHANGE_TITLE</Button>
              <ReviewActionButtons
                currentStatus={changeTitleRecord?.status}
                steps={[
                  {
                    approveLabel: 'Supervisor Approve',
                    returnLabel: 'Supervisor Return',
                    enabledWhen: 'awaiting_supervisor_review',
                    onApprove: () => onReviewChangeTitleModule('approved', 'supervisor'),
                    onReturn: () => onReviewChangeTitleModule('returned', 'supervisor'),
                  },
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewChangeTitleModule('approved', 'dept'),
                    onReturn: () => onReviewChangeTitleModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Chair Approve',
                    returnLabel: 'Chair Return',
                    enabledWhen: 'awaiting_chairperson_review',
                    onApprove: () => onReviewChangeTitleModule('approved', 'chair'),
                    onReturn: () => onReviewChangeTitleModule('returned', 'chair'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewChangeTitleModule('approved', 'faculty'),
                    onReturn: () => onReviewChangeTitleModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintChangeTitle}>Generate CHANGE_TITLE PDF</Button>
              {toGeneratedFormUrl(changeTitlePdfPath) && (
                <a href={toGeneratedFormUrl(changeTitlePdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open CHANGE_TITLE PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeModule === 'change_supervisor' && caseRecordId && changeSupervisorData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>CHANGE_SUPERVISOR Module</h2>
          <p className='mb-3 text-sm text-muted'>This module handles change requests for primary, administrative, and co-supervision roles.</p>
          <div className='mb-3 text-sm text-muted'>Status: {changeSupervisorRecord?.status ?? 'draft'} • Completion: {changeSupervisorRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Current Supervision Roster',
                'Role To Change',
                'Outgoing Academic',
                'Incoming Academic',
                'Incoming Academic Qualification',
                'Incoming Academic Is UWC Internal',
                'Change Rationale',
                'Continuity Plan',
              ] as Array<keyof ChangeSupervisorFormData>
            ).map((label) => {
              const readonly = new Set<keyof ChangeSupervisorFormData>([
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Current Supervision Roster',
              ]).has(label);
              const isLong = label === 'Current Supervision Roster' || label === 'Change Rationale' || label === 'Continuity Plan';
              const isSelect = label === 'Role To Change' || label === 'Incoming Academic Is UWC Internal';
              const locked = !['draft', 'returned_by_supervisor', 'returned_by_dept', 'returned_by_chairperson', 'returned_by_faculty'].includes(changeSupervisorRecord?.status ?? 'draft');
              const selectOptions: SelectOption[] | undefined = !isSelect
                ? undefined
                : label === 'Role To Change'
                  ? [
                    { value: '' },
                    { value: 'Primary Supervisor' },
                    { value: 'Administrative Supervisor' },
                    { value: 'Co-supervisor 1' },
                    { value: 'Co-supervisor 2' },
                  ]
                  : [{ value: 'Yes' }, { value: 'No' }];
              return (
                <ModuleField<ChangeSupervisorFormData>
                  key={label}
                  label={label}
                  value={changeSupervisorData[label]}
                  disabled={readonly || locked}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveChangeSupervisorField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitChangeSupervisorModule} disabled={!['draft', 'returned_by_supervisor', 'returned_by_dept', 'returned_by_chairperson', 'returned_by_faculty'].includes(changeSupervisorRecord?.status ?? 'draft')}>Submit CHANGE_SUPERVISOR</Button>
              <ReviewActionButtons
                currentStatus={changeSupervisorRecord?.status}
                steps={[
                  {
                    approveLabel: 'Supervisor Approve',
                    returnLabel: 'Supervisor Return',
                    enabledWhen: 'awaiting_supervisor_review',
                    onApprove: () => onReviewChangeSupervisorModule('approved', 'supervisor'),
                    onReturn: () => onReviewChangeSupervisorModule('returned', 'supervisor'),
                  },
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewChangeSupervisorModule('approved', 'dept'),
                    onReturn: () => onReviewChangeSupervisorModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Chair Approve',
                    returnLabel: 'Chair Return',
                    enabledWhen: 'awaiting_chairperson_review',
                    onApprove: () => onReviewChangeSupervisorModule('approved', 'chair'),
                    onReturn: () => onReviewChangeSupervisorModule('returned', 'chair'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewChangeSupervisorModule('approved', 'faculty'),
                    onReturn: () => onReviewChangeSupervisorModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintChangeSupervisor}>Generate CHANGE_SUPERVISOR PDF</Button>
              {toGeneratedFormUrl(changeSupervisorPdfPath) && (
                <a href={toGeneratedFormUrl(changeSupervisorPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open CHANGE_SUPERVISOR PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}

      {activeModule === 'add_co_supervisor' && caseRecordId && addCoSupervisorData && (
        <Card>
          <h2 className='mb-3 text-base font-bold'>ADD_CO_SUPERVISOR Module</h2>
          <p className='mb-3 text-sm text-muted'>This module adds an additional co-supervisor to the active supervision roster.</p>
          <div className='mb-3 text-sm text-muted'>Status: {addCoSupervisorRecord?.status ?? 'draft'} • Completion: {addCoSupervisorRecord?.completion_percent ?? 0}%</div>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12'>
            {(
              [
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Thesis Title',
                'Supervisor',
                'Current Co-supervisors',
                'Proposed Co-supervisor',
                'Proposed Co-supervisor Qualification',
                'Proposed Co-supervisor Is UWC Internal',
                'Motivation For Addition',
              ] as Array<keyof AddCoSupervisorFormData>
            ).map((label) => {
              const readonly = new Set<keyof AddCoSupervisorFormData>([
                'Student Full Name',
                'Student Number',
                'Department',
                'Degree',
                'Thesis Title',
                'Supervisor',
                'Current Co-supervisors',
              ]).has(label);
              const isLong = label === 'Current Co-supervisors' || label === 'Motivation For Addition';
              const isSelect = label === 'Proposed Co-supervisor Is UWC Internal';
              const locked = !['draft', 'returned_by_supervisor', 'returned_by_dept', 'returned_by_chairperson', 'returned_by_faculty'].includes(addCoSupervisorRecord?.status ?? 'draft');
              const selectOptions: SelectOption[] | undefined = isSelect ? [{ value: 'Yes' }, { value: 'No' }] : undefined;
              return (
                <ModuleField<AddCoSupervisorFormData>
                  key={label}
                  label={label}
                  value={addCoSupervisorData[label]}
                  disabled={readonly || locked}
                  isLong={isLong}
                  options={selectOptions}
                  onChange={onSaveAddCoSupervisorField}
                />
              );
            })}
          </div>
          <div className='mt-4'>
            <div className='flex flex-wrap gap-2'>
              <Button onClick={onSubmitAddCoSupervisorModule} disabled={!['draft', 'returned_by_supervisor', 'returned_by_dept', 'returned_by_chairperson', 'returned_by_faculty'].includes(addCoSupervisorRecord?.status ?? 'draft')}>Submit ADD_CO_SUPERVISOR</Button>
              <ReviewActionButtons
                currentStatus={addCoSupervisorRecord?.status}
                steps={[
                  {
                    approveLabel: 'Supervisor Approve',
                    returnLabel: 'Supervisor Return',
                    enabledWhen: 'awaiting_supervisor_review',
                    onApprove: () => onReviewAddCoSupervisorModule('approved', 'supervisor'),
                    onReturn: () => onReviewAddCoSupervisorModule('returned', 'supervisor'),
                  },
                  {
                    approveLabel: 'Dept Approve',
                    returnLabel: 'Dept Return',
                    enabledWhen: 'awaiting_dept_review',
                    onApprove: () => onReviewAddCoSupervisorModule('approved', 'dept'),
                    onReturn: () => onReviewAddCoSupervisorModule('returned', 'dept'),
                  },
                  {
                    approveLabel: 'Chair Approve',
                    returnLabel: 'Chair Return',
                    enabledWhen: 'awaiting_chairperson_review',
                    onApprove: () => onReviewAddCoSupervisorModule('approved', 'chair'),
                    onReturn: () => onReviewAddCoSupervisorModule('returned', 'chair'),
                  },
                  {
                    approveLabel: 'Faculty Approve',
                    returnLabel: 'Faculty Return',
                    enabledWhen: 'awaiting_faculty_review',
                    onApprove: () => onReviewAddCoSupervisorModule('approved', 'faculty'),
                    onReturn: () => onReviewAddCoSupervisorModule('returned', 'faculty'),
                  },
                ]}
              />
              <Button onClick={onPrintAddCoSupervisor}>Generate ADD_CO_SUPERVISOR PDF</Button>
              {toGeneratedFormUrl(addCoSupervisorPdfPath) && (
                <a href={toGeneratedFormUrl(addCoSupervisorPdfPath) ?? '#'} target='_blank' rel='noreferrer' className='inline-flex items-center rounded-xl border border-accent/60 px-3 py-2 text-sm font-semibold text-accent'>
                  Open ADD_CO_SUPERVISOR PDF
                </a>
              )}
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

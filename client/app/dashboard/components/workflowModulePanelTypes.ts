import type {
  AddCoSupervisorFormData,
  AppointArbiterFormData,
  AppointExaminersFormData,
  ChangeExaminersFormData,
  ChangeSupervisorFormData,
  ChangeTitleFormData,
  ExaminerSummaryCvFormData,
  IntentionToSubmitFormData,
  ModuleFormRecord,
} from '@/lib/api';

export interface WorkflowModulePanelsProps {
  activeModule: string;
  caseRecordId: number | null;
  toGeneratedFormUrl: (rawPath: string | null) => string | null;

  itsRecord: ModuleFormRecord | null;
  itsData: IntentionToSubmitFormData | null;
  itsPdfPath: string | null;
  onSaveItsField: (label: keyof IntentionToSubmitFormData, value: string) => void;
  onSubmitItsModule: () => void;
  onReviewItsModule: (decision: 'approved' | 'returned', by: 'supervisor' | 'dept') => void;
  onPrintIts: () => void;

  appointRecord: ModuleFormRecord | null;
  appointData: AppointExaminersFormData | null;
  appointPdfPath: string | null;
  onSaveAppointField: (label: keyof AppointExaminersFormData, value: string) => void;
  onSubmitAppointModule: () => void;
  onReviewAppointModule: (decision: 'approved' | 'returned', by: 'dept' | 'chair' | 'faculty') => void;
  onPrintAppoint: () => void;

  changeRecord: ModuleFormRecord | null;
  changeData: ChangeExaminersFormData | null;
  changePdfPath: string | null;
  onSaveChangeField: (label: keyof ChangeExaminersFormData, value: string) => void;
  onSubmitChangeModule: () => void;
  onReviewChangeModule: (decision: 'approved' | 'returned', by: 'dept' | 'chair' | 'faculty') => void;
  onPrintChange: () => void;

  changeTitleRecord: ModuleFormRecord | null;
  changeTitleData: ChangeTitleFormData | null;
  changeTitlePdfPath: string | null;
  onSaveChangeTitleField: (label: keyof ChangeTitleFormData, value: string) => void;
  onSubmitChangeTitleModule: () => void;
  onReviewChangeTitleModule: (decision: 'approved' | 'returned', by: 'supervisor' | 'dept' | 'chair' | 'faculty') => void;
  onPrintChangeTitle: () => void;

  changeSupervisorRecord: ModuleFormRecord | null;
  changeSupervisorData: ChangeSupervisorFormData | null;
  changeSupervisorPdfPath: string | null;
  onSaveChangeSupervisorField: (label: keyof ChangeSupervisorFormData, value: string) => void;
  onSubmitChangeSupervisorModule: () => void;
  onReviewChangeSupervisorModule: (decision: 'approved' | 'returned', by: 'supervisor' | 'dept' | 'chair' | 'faculty') => void;
  onPrintChangeSupervisor: () => void;

  addCoSupervisorRecord: ModuleFormRecord | null;
  addCoSupervisorData: AddCoSupervisorFormData | null;
  addCoSupervisorPdfPath: string | null;
  onSaveAddCoSupervisorField: (label: keyof AddCoSupervisorFormData, value: string) => void;
  onSubmitAddCoSupervisorModule: () => void;
  onReviewAddCoSupervisorModule: (decision: 'approved' | 'returned', by: 'supervisor' | 'dept' | 'chair' | 'faculty') => void;
  onPrintAddCoSupervisor: () => void;

  summaryRecord: ModuleFormRecord | null;
  summaryData: ExaminerSummaryCvFormData | null;
  summaryPdfPath: string | null;
  onSaveSummaryField: (label: keyof ExaminerSummaryCvFormData, value: string) => void;
  onSubmitSummaryModule: () => void;
  onReviewSummaryModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintSummary: () => void;

  arbiterRecord: ModuleFormRecord | null;
  arbiterData: AppointArbiterFormData | null;
  arbiterPdfPath: string | null;
  onSaveArbiterField: (label: keyof AppointArbiterFormData, value: string) => void;
  onSubmitArbiterModule: () => void;
  onReviewArbiterModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintArbiter: () => void;
}

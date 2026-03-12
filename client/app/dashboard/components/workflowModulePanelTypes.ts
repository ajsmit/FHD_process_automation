import type {
  AddCoSupervisorFormData,
  AppointArbiterFormData,
  AppointExaminersFormData,
  ChangeExaminersFormData,
  ChangeSupervisorFormData,
  ChangeTitleFormData,
  ExaminerSummaryCvFormData,
  IntentionToSubmitFormData,
  LeaveOfAbsenceFormData,
  ModuleFormRecord,
  OtherRequestFormData,
  ProgressReportFormData,
  ReadmissionRequestFormData,
  SupervisorSummativeReportFormData,
  UpgradeMscToPhdFormData,
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

  progressReportRecord: ModuleFormRecord | null;
  progressReportData: ProgressReportFormData | null;
  progressReportPdfPath: string | null;
  onSaveProgressReportField: (label: keyof ProgressReportFormData, value: string) => void;
  onSubmitProgressReportModule: () => void;
  onReviewProgressReportModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintProgressReport: () => void;

  leaveRecord: ModuleFormRecord | null;
  leaveData: LeaveOfAbsenceFormData | null;
  leavePdfPath: string | null;
  onSaveLeaveField: (label: keyof LeaveOfAbsenceFormData, value: string) => void;
  onSubmitLeaveModule: () => void;
  onReviewLeaveModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintLeave: () => void;

  readmissionRecord: ModuleFormRecord | null;
  readmissionData: ReadmissionRequestFormData | null;
  readmissionPdfPath: string | null;
  onSaveReadmissionField: (label: keyof ReadmissionRequestFormData, value: string) => void;
  onSubmitReadmissionModule: () => void;
  onReviewReadmissionModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintReadmission: () => void;

  upgradeRecord: ModuleFormRecord | null;
  upgradeData: UpgradeMscToPhdFormData | null;
  upgradePdfPath: string | null;
  onSaveUpgradeField: (label: keyof UpgradeMscToPhdFormData, value: string) => void;
  onSubmitUpgradeModule: () => void;
  onReviewUpgradeModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintUpgrade: () => void;

  summativeRecord: ModuleFormRecord | null;
  summativeData: SupervisorSummativeReportFormData | null;
  summativePdfPath: string | null;
  onSaveSummativeField: (label: keyof SupervisorSummativeReportFormData, value: string) => void;
  onSubmitSummativeModule: () => void;
  onReviewSummativeModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintSummative: () => void;

  otherRequestRecord: ModuleFormRecord | null;
  otherRequestData: OtherRequestFormData | null;
  otherRequestPdfPath: string | null;
  onSaveOtherRequestField: (label: keyof OtherRequestFormData, value: string) => void;
  onSubmitOtherRequestModule: () => void;
  onReviewOtherRequestModule: (decision: 'approved' | 'returned', by: 'dept' | 'faculty') => void;
  onPrintOtherRequest: () => void;
}

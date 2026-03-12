import { useState } from 'react';
import {
  getAddCoSupervisor,
  getAppointArbiter,
  getAppointExaminers,
  getChangeSupervisor,
  getChangeTitle,
  getChangeExaminers,
  getExaminerSummaryCv,
  getIntentionToSubmit,
  getLeaveOfAbsence,
  getOtherRequest,
  getProgressReport,
  getReadmissionRequest,
  getSupervisorSummativeReport,
  getUpgradeMscToPhd,
  patchAddCoSupervisor,
  patchAppointArbiter,
  patchAppointExaminers,
  patchChangeSupervisor,
  patchChangeTitle,
  patchChangeExaminers,
  patchExaminerSummaryCv,
  patchIntentionToSubmit,
  patchLeaveOfAbsence,
  patchOtherRequest,
  patchProgressReport,
  patchReadmissionRequest,
  patchSupervisorSummativeReport,
  patchUpgradeMscToPhd,
  printAddCoSupervisor,
  printAppointArbiter,
  printAppointExaminers,
  printChangeSupervisor,
  printChangeTitle,
  printChangeExaminers,
  printExaminerSummaryCv,
  printIntentionToSubmit,
  printLeaveOfAbsence,
  printOtherRequest,
  printProgressReport,
  printReadmissionRequest,
  printSupervisorSummativeReport,
  printUpgradeMscToPhd,
  reviewAddCoSupervisorByChair,
  reviewAddCoSupervisorByDept,
  reviewAddCoSupervisorByFaculty,
  reviewAddCoSupervisorBySupervisor,
  reviewAppointArbiterByDept,
  reviewAppointArbiterByFaculty,
  reviewAppointExaminersByChair,
  reviewAppointExaminersByDept,
  reviewAppointExaminersByFaculty,
  reviewChangeSupervisorByChair,
  reviewChangeSupervisorByDept,
  reviewChangeSupervisorByFaculty,
  reviewChangeSupervisorBySupervisor,
  reviewChangeTitleByChair,
  reviewChangeTitleByDept,
  reviewChangeTitleByFaculty,
  reviewChangeTitleBySupervisor,
  reviewChangeExaminersByChair,
  reviewChangeExaminersByDept,
  reviewChangeExaminersByFaculty,
  reviewExaminerSummaryCvByDept,
  reviewExaminerSummaryCvByFaculty,
  reviewIntentionToSubmitByDept,
  reviewIntentionToSubmitBySupervisor,
  reviewLeaveOfAbsenceByDept,
  reviewLeaveOfAbsenceByFaculty,
  reviewOtherRequestByDept,
  reviewOtherRequestByFaculty,
  reviewProgressReportByDept,
  reviewProgressReportByFaculty,
  reviewReadmissionRequestByDept,
  reviewReadmissionRequestByFaculty,
  reviewSupervisorSummativeReportByDept,
  reviewSupervisorSummativeReportByFaculty,
  reviewUpgradeMscToPhdByDept,
  reviewUpgradeMscToPhdByFaculty,
  submitAddCoSupervisor,
  submitAppointArbiter,
  submitAppointExaminers,
  submitChangeSupervisor,
  submitChangeTitle,
  submitChangeExaminers,
  submitExaminerSummaryCv,
  submitIntentionToSubmit,
  submitLeaveOfAbsence,
  submitOtherRequest,
  submitProgressReport,
  submitReadmissionRequest,
  submitSupervisorSummativeReport,
  submitUpgradeMscToPhd,
  type AddCoSupervisorFormData,
  type AppointArbiterFormData,
  type AppointExaminersFormData,
  type ChangeSupervisorFormData,
  type ChangeTitleFormData,
  type ChangeExaminersFormData,
  type ExaminerSummaryCvFormData,
  type IntentionToSubmitFormData,
  type LeaveOfAbsenceFormData,
  type ModuleFormRecord,
  type OtherRequestFormData,
  type ProgressReportFormData,
  type ReadmissionRequestFormData,
  type SupervisorSummativeReportFormData,
  type UpgradeMscToPhdFormData,
} from '@/lib/api';

type ReviewDecisionValue = 'approved' | 'returned';
type ReviewHandler = (caseId: number, decision: ReviewDecisionValue) => Promise<{ record: ModuleFormRecord }>;

export function useDashboardPhaseBModules(setInfo: (message: string | null) => void) {
  const [itsRecord, setItsRecord] = useState<ModuleFormRecord | null>(null);
  const [itsData, setItsData] = useState<IntentionToSubmitFormData | null>(null);
  const [itsPdfPath, setItsPdfPath] = useState<string | null>(null);

  const [appointRecord, setAppointRecord] = useState<ModuleFormRecord | null>(null);
  const [appointData, setAppointData] = useState<AppointExaminersFormData | null>(null);
  const [appointPdfPath, setAppointPdfPath] = useState<string | null>(null);

  const [changeTitleRecord, setChangeTitleRecord] = useState<ModuleFormRecord | null>(null);
  const [changeTitleData, setChangeTitleData] = useState<ChangeTitleFormData | null>(null);
  const [changeTitlePdfPath, setChangeTitlePdfPath] = useState<string | null>(null);

  const [changeSupervisorRecord, setChangeSupervisorRecord] = useState<ModuleFormRecord | null>(null);
  const [changeSupervisorData, setChangeSupervisorData] = useState<ChangeSupervisorFormData | null>(null);
  const [changeSupervisorPdfPath, setChangeSupervisorPdfPath] = useState<string | null>(null);

  const [addCoSupervisorRecord, setAddCoSupervisorRecord] = useState<ModuleFormRecord | null>(null);
  const [addCoSupervisorData, setAddCoSupervisorData] = useState<AddCoSupervisorFormData | null>(null);
  const [addCoSupervisorPdfPath, setAddCoSupervisorPdfPath] = useState<string | null>(null);

  const [changeRecord, setChangeRecord] = useState<ModuleFormRecord | null>(null);
  const [changeData, setChangeData] = useState<ChangeExaminersFormData | null>(null);
  const [changePdfPath, setChangePdfPath] = useState<string | null>(null);

  const [summaryRecord, setSummaryRecord] = useState<ModuleFormRecord | null>(null);
  const [summaryData, setSummaryData] = useState<ExaminerSummaryCvFormData | null>(null);
  const [summaryPdfPath, setSummaryPdfPath] = useState<string | null>(null);

  const [arbiterRecord, setArbiterRecord] = useState<ModuleFormRecord | null>(null);
  const [arbiterData, setArbiterData] = useState<AppointArbiterFormData | null>(null);
  const [arbiterPdfPath, setArbiterPdfPath] = useState<string | null>(null);

  const [progressReportRecord, setProgressReportRecord] = useState<ModuleFormRecord | null>(null);
  const [progressReportData, setProgressReportData] = useState<ProgressReportFormData | null>(null);
  const [progressReportPdfPath, setProgressReportPdfPath] = useState<string | null>(null);

  const [leaveRecord, setLeaveRecord] = useState<ModuleFormRecord | null>(null);
  const [leaveData, setLeaveData] = useState<LeaveOfAbsenceFormData | null>(null);
  const [leavePdfPath, setLeavePdfPath] = useState<string | null>(null);

  const [readmissionRecord, setReadmissionRecord] = useState<ModuleFormRecord | null>(null);
  const [readmissionData, setReadmissionData] = useState<ReadmissionRequestFormData | null>(null);
  const [readmissionPdfPath, setReadmissionPdfPath] = useState<string | null>(null);

  const [upgradeRecord, setUpgradeRecord] = useState<ModuleFormRecord | null>(null);
  const [upgradeData, setUpgradeData] = useState<UpgradeMscToPhdFormData | null>(null);
  const [upgradePdfPath, setUpgradePdfPath] = useState<string | null>(null);

  const [summativeRecord, setSummativeRecord] = useState<ModuleFormRecord | null>(null);
  const [summativeData, setSummativeData] = useState<SupervisorSummativeReportFormData | null>(null);
  const [summativePdfPath, setSummativePdfPath] = useState<string | null>(null);

  const [otherRequestRecord, setOtherRequestRecord] = useState<ModuleFormRecord | null>(null);
  const [otherRequestData, setOtherRequestData] = useState<OtherRequestFormData | null>(null);
  const [otherRequestPdfPath, setOtherRequestPdfPath] = useState<string | null>(null);

  async function refreshIntentionToSubmit(caseId: number) {
    const response = await getIntentionToSubmit(caseId);
    setItsRecord(response.record);
    setItsData(response.formData);
    setItsPdfPath(response.record.pdf_path);
  }

  async function refreshAppointExaminers(caseId: number) {
    const response = await getAppointExaminers(caseId);
    setAppointRecord(response.record);
    setAppointData(response.formData);
    setAppointPdfPath(response.record.pdf_path);
  }

  async function refreshChangeTitle(caseId: number) {
    const response = await getChangeTitle(caseId);
    setChangeTitleRecord(response.record);
    setChangeTitleData(response.formData);
    setChangeTitlePdfPath(response.record.pdf_path);
  }

  async function refreshChangeSupervisor(caseId: number) {
    const response = await getChangeSupervisor(caseId);
    setChangeSupervisorRecord(response.record);
    setChangeSupervisorData(response.formData);
    setChangeSupervisorPdfPath(response.record.pdf_path);
  }

  async function refreshAddCoSupervisor(caseId: number) {
    const response = await getAddCoSupervisor(caseId);
    setAddCoSupervisorRecord(response.record);
    setAddCoSupervisorData(response.formData);
    setAddCoSupervisorPdfPath(response.record.pdf_path);
  }

  async function refreshChangeExaminers(caseId: number) {
    const response = await getChangeExaminers(caseId);
    setChangeRecord(response.record);
    setChangeData(response.formData);
    setChangePdfPath(response.record.pdf_path);
  }

  async function refreshExaminerSummaryCv(caseId: number) {
    const response = await getExaminerSummaryCv(caseId);
    setSummaryRecord(response.record);
    setSummaryData(response.formData);
    setSummaryPdfPath(response.record.pdf_path);
  }

  async function refreshAppointArbiter(caseId: number) {
    const response = await getAppointArbiter(caseId);
    setArbiterRecord(response.record);
    setArbiterData(response.formData);
    setArbiterPdfPath(response.record.pdf_path);
  }

  async function refreshProgressReport(caseId: number) {
    const response = await getProgressReport(caseId);
    setProgressReportRecord(response.record);
    setProgressReportData(response.formData);
    setProgressReportPdfPath(response.record.pdf_path);
  }

  async function refreshLeaveOfAbsence(caseId: number) {
    const response = await getLeaveOfAbsence(caseId);
    setLeaveRecord(response.record);
    setLeaveData(response.formData);
    setLeavePdfPath(response.record.pdf_path);
  }

  async function refreshReadmissionRequest(caseId: number) {
    const response = await getReadmissionRequest(caseId);
    setReadmissionRecord(response.record);
    setReadmissionData(response.formData);
    setReadmissionPdfPath(response.record.pdf_path);
  }

  async function refreshUpgradeMscToPhd(caseId: number) {
    const response = await getUpgradeMscToPhd(caseId);
    setUpgradeRecord(response.record);
    setUpgradeData(response.formData);
    setUpgradePdfPath(response.record.pdf_path);
  }

  async function refreshSupervisorSummativeReport(caseId: number) {
    const response = await getSupervisorSummativeReport(caseId);
    setSummativeRecord(response.record);
    setSummativeData(response.formData);
    setSummativePdfPath(response.record.pdf_path);
  }

  async function refreshOtherRequest(caseId: number) {
    const response = await getOtherRequest(caseId);
    setOtherRequestRecord(response.record);
    setOtherRequestData(response.formData);
    setOtherRequestPdfPath(response.record.pdf_path);
  }

  async function saveItsField(caseId: number | null, label: keyof IntentionToSubmitFormData, value: string) {
    if (!caseId || !itsData) return;
    const response = await patchIntentionToSubmit(caseId, { [label]: value } as Partial<IntentionToSubmitFormData>);
    setItsRecord(response.record);
    setItsData(response.formData);
    setInfo(`Saved ITS field: ${label}`);
  }

  async function submitItsModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitIntentionToSubmit(caseId);
    setItsRecord(response.record);
    await refreshIntentionToSubmit(caseId);
    setInfo('INTENTION_TO_SUBMIT submitted.');
  }

  async function reviewItsModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'supervisor' | 'dept') {
    if (!caseId) return;
    const handlers: Record<'supervisor' | 'dept', ReviewHandler> = {
      supervisor: reviewIntentionToSubmitBySupervisor,
      dept: reviewIntentionToSubmitByDept,
    };
    const response = await handlers[by](caseId, decisionValue);
    setItsRecord(response.record);
    await refreshIntentionToSubmit(caseId);
    setInfo(`INTENTION_TO_SUBMIT ${decisionValue} by ${by}.`);
  }

  async function handlePrintIts(caseId: number | null) {
    if (!caseId) return;
    const response = await printIntentionToSubmit(caseId);
    setItsPdfPath(response.pdfPath);
    setInfo('INTENTION_TO_SUBMIT PDF generated.');
  }

  async function saveAppointField(caseId: number | null, label: keyof AppointExaminersFormData, value: string) {
    if (!caseId || !appointData) return;
    const response = await patchAppointExaminers(caseId, { [label]: value } as Partial<AppointExaminersFormData>);
    setAppointRecord(response.record);
    setAppointData(response.formData);
    setInfo(`Saved APPOINT_EXAMINERS field: ${label}`);
  }

  async function submitAppointModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitAppointExaminers(caseId);
    setAppointRecord(response.record);
    await refreshAppointExaminers(caseId);
    setInfo('APPOINT_EXAMINERS submitted.');
  }

  async function reviewAppointModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'chair' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'chair' | 'faculty', ReviewHandler> = {
      dept: reviewAppointExaminersByDept,
      chair: reviewAppointExaminersByChair,
      faculty: reviewAppointExaminersByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setAppointRecord(response.record);
    await refreshAppointExaminers(caseId);
    setInfo(`APPOINT_EXAMINERS ${decisionValue} by ${by}.`);
  }

  async function handlePrintAppoint(caseId: number | null) {
    if (!caseId) return;
    const response = await printAppointExaminers(caseId);
    setAppointPdfPath(response.pdfPath);
    setInfo('APPOINT_EXAMINERS PDF generated.');
  }

  async function saveChangeTitleField(caseId: number | null, label: keyof ChangeTitleFormData, value: string) {
    if (!caseId || !changeTitleData) return;
    const response = await patchChangeTitle(caseId, { [label]: value } as Partial<ChangeTitleFormData>);
    setChangeTitleRecord(response.record);
    setChangeTitleData(response.formData);
    setInfo(`Saved CHANGE_TITLE field: ${label}`);
  }

  async function submitChangeTitleModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitChangeTitle(caseId);
    setChangeTitleRecord(response.record);
    await refreshChangeTitle(caseId);
    setInfo('CHANGE_TITLE submitted.');
  }

  async function reviewChangeTitleModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'supervisor' | 'dept' | 'chair' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'supervisor' | 'dept' | 'chair' | 'faculty', ReviewHandler> = {
      supervisor: reviewChangeTitleBySupervisor,
      dept: reviewChangeTitleByDept,
      chair: reviewChangeTitleByChair,
      faculty: reviewChangeTitleByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setChangeTitleRecord(response.record);
    await refreshChangeTitle(caseId);
    setInfo(`CHANGE_TITLE ${decisionValue} by ${by}.`);
  }

  async function handlePrintChangeTitle(caseId: number | null) {
    if (!caseId) return;
    const response = await printChangeTitle(caseId);
    setChangeTitlePdfPath(response.pdfPath);
    setInfo('CHANGE_TITLE PDF generated.');
  }

  async function saveChangeSupervisorField(caseId: number | null, label: keyof ChangeSupervisorFormData, value: string) {
    if (!caseId || !changeSupervisorData) return;
    const response = await patchChangeSupervisor(caseId, { [label]: value } as Partial<ChangeSupervisorFormData>);
    setChangeSupervisorRecord(response.record);
    setChangeSupervisorData(response.formData);
    setInfo(`Saved CHANGE_SUPERVISOR field: ${label}`);
  }

  async function submitChangeSupervisorModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitChangeSupervisor(caseId);
    setChangeSupervisorRecord(response.record);
    await refreshChangeSupervisor(caseId);
    setInfo('CHANGE_SUPERVISOR submitted.');
  }

  async function reviewChangeSupervisorModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'supervisor' | 'dept' | 'chair' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'supervisor' | 'dept' | 'chair' | 'faculty', ReviewHandler> = {
      supervisor: reviewChangeSupervisorBySupervisor,
      dept: reviewChangeSupervisorByDept,
      chair: reviewChangeSupervisorByChair,
      faculty: reviewChangeSupervisorByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setChangeSupervisorRecord(response.record);
    await refreshChangeSupervisor(caseId);
    setInfo(`CHANGE_SUPERVISOR ${decisionValue} by ${by}.`);
  }

  async function handlePrintChangeSupervisor(caseId: number | null) {
    if (!caseId) return;
    const response = await printChangeSupervisor(caseId);
    setChangeSupervisorPdfPath(response.pdfPath);
    setInfo('CHANGE_SUPERVISOR PDF generated.');
  }

  async function saveAddCoSupervisorField(caseId: number | null, label: keyof AddCoSupervisorFormData, value: string) {
    if (!caseId || !addCoSupervisorData) return;
    const response = await patchAddCoSupervisor(caseId, { [label]: value } as Partial<AddCoSupervisorFormData>);
    setAddCoSupervisorRecord(response.record);
    setAddCoSupervisorData(response.formData);
    setInfo(`Saved ADD_CO_SUPERVISOR field: ${label}`);
  }

  async function submitAddCoSupervisorModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitAddCoSupervisor(caseId);
    setAddCoSupervisorRecord(response.record);
    await refreshAddCoSupervisor(caseId);
    setInfo('ADD_CO_SUPERVISOR submitted.');
  }

  async function reviewAddCoSupervisorModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'supervisor' | 'dept' | 'chair' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'supervisor' | 'dept' | 'chair' | 'faculty', ReviewHandler> = {
      supervisor: reviewAddCoSupervisorBySupervisor,
      dept: reviewAddCoSupervisorByDept,
      chair: reviewAddCoSupervisorByChair,
      faculty: reviewAddCoSupervisorByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setAddCoSupervisorRecord(response.record);
    await refreshAddCoSupervisor(caseId);
    setInfo(`ADD_CO_SUPERVISOR ${decisionValue} by ${by}.`);
  }

  async function handlePrintAddCoSupervisor(caseId: number | null) {
    if (!caseId) return;
    const response = await printAddCoSupervisor(caseId);
    setAddCoSupervisorPdfPath(response.pdfPath);
    setInfo('ADD_CO_SUPERVISOR PDF generated.');
  }

  async function saveChangeField(caseId: number | null, label: keyof ChangeExaminersFormData, value: string) {
    if (!caseId || !changeData) return;
    const response = await patchChangeExaminers(caseId, { [label]: value } as Partial<ChangeExaminersFormData>);
    setChangeRecord(response.record);
    setChangeData(response.formData);
    setInfo(`Saved CHANGE_EXAMINERS field: ${label}`);
  }

  async function submitChangeModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitChangeExaminers(caseId);
    setChangeRecord(response.record);
    await refreshChangeExaminers(caseId);
    setInfo('CHANGE_EXAMINERS submitted.');
  }

  async function reviewChangeModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'chair' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'chair' | 'faculty', ReviewHandler> = {
      dept: reviewChangeExaminersByDept,
      chair: reviewChangeExaminersByChair,
      faculty: reviewChangeExaminersByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setChangeRecord(response.record);
    await refreshChangeExaminers(caseId);
    setInfo(`CHANGE_EXAMINERS ${decisionValue} by ${by}.`);
  }

  async function handlePrintChange(caseId: number | null) {
    if (!caseId) return;
    const response = await printChangeExaminers(caseId);
    setChangePdfPath(response.pdfPath);
    setInfo('CHANGE_EXAMINERS PDF generated.');
  }

  async function saveSummaryField(caseId: number | null, label: keyof ExaminerSummaryCvFormData, value: string) {
    if (!caseId || !summaryData) return;
    const response = await patchExaminerSummaryCv(caseId, { [label]: value } as Partial<ExaminerSummaryCvFormData>);
    setSummaryRecord(response.record);
    setSummaryData(response.formData);
    setInfo(`Saved EXAMINER_SUMMARY_CV field: ${label}`);
  }

  async function submitSummaryModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitExaminerSummaryCv(caseId);
    setSummaryRecord(response.record);
    await refreshExaminerSummaryCv(caseId);
    setInfo('EXAMINER_SUMMARY_CV submitted.');
  }

  async function reviewSummaryModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewExaminerSummaryCvByDept,
      faculty: reviewExaminerSummaryCvByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setSummaryRecord(response.record);
    await refreshExaminerSummaryCv(caseId);
    setInfo(`EXAMINER_SUMMARY_CV ${decisionValue} by ${by}.`);
  }

  async function handlePrintSummary(caseId: number | null) {
    if (!caseId) return;
    const response = await printExaminerSummaryCv(caseId);
    setSummaryPdfPath(response.pdfPath);
    setInfo('EXAMINER_SUMMARY_CV PDF generated.');
  }

  async function saveArbiterField(caseId: number | null, label: keyof AppointArbiterFormData, value: string) {
    if (!caseId || !arbiterData) return;
    const response = await patchAppointArbiter(caseId, { [label]: value } as Partial<AppointArbiterFormData>);
    setArbiterRecord(response.record);
    setArbiterData(response.formData);
    setInfo(`Saved APPOINT_ARBITER field: ${label}`);
  }

  async function submitArbiterModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitAppointArbiter(caseId);
    setArbiterRecord(response.record);
    await refreshAppointArbiter(caseId);
    setInfo('APPOINT_ARBITER submitted.');
  }

  async function reviewArbiterModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewAppointArbiterByDept,
      faculty: reviewAppointArbiterByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setArbiterRecord(response.record);
    await refreshAppointArbiter(caseId);
    setInfo(`APPOINT_ARBITER ${decisionValue} by ${by}.`);
  }

  async function handlePrintArbiter(caseId: number | null) {
    if (!caseId) return;
    const response = await printAppointArbiter(caseId);
    setArbiterPdfPath(response.pdfPath);
    setInfo('APPOINT_ARBITER PDF generated.');
  }

  async function saveProgressReportField(caseId: number | null, label: keyof ProgressReportFormData, value: string) {
    if (!caseId || !progressReportData) return;
    const response = await patchProgressReport(caseId, { [label]: value } as Partial<ProgressReportFormData>);
    setProgressReportRecord(response.record);
    setProgressReportData(response.formData);
    setInfo(`Saved PROGRESS_REPORT field: ${label}`);
  }

  async function submitProgressReportModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitProgressReport(caseId);
    setProgressReportRecord(response.record);
    await refreshProgressReport(caseId);
    setInfo('PROGRESS_REPORT submitted.');
  }

  async function reviewProgressReportModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewProgressReportByDept,
      faculty: reviewProgressReportByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setProgressReportRecord(response.record);
    await refreshProgressReport(caseId);
    setInfo(`PROGRESS_REPORT ${decisionValue} by ${by}.`);
  }

  async function handlePrintProgressReport(caseId: number | null) {
    if (!caseId) return;
    const response = await printProgressReport(caseId);
    setProgressReportPdfPath(response.pdfPath);
    setInfo('PROGRESS_REPORT PDF generated.');
  }

  async function saveLeaveField(caseId: number | null, label: keyof LeaveOfAbsenceFormData, value: string) {
    if (!caseId || !leaveData) return;
    const response = await patchLeaveOfAbsence(caseId, { [label]: value } as Partial<LeaveOfAbsenceFormData>);
    setLeaveRecord(response.record);
    setLeaveData(response.formData);
    setInfo(`Saved LEAVE_OF_ABSENCE field: ${label}`);
  }

  async function submitLeaveModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitLeaveOfAbsence(caseId);
    setLeaveRecord(response.record);
    await refreshLeaveOfAbsence(caseId);
    setInfo('LEAVE_OF_ABSENCE submitted.');
  }

  async function reviewLeaveModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewLeaveOfAbsenceByDept,
      faculty: reviewLeaveOfAbsenceByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setLeaveRecord(response.record);
    await refreshLeaveOfAbsence(caseId);
    setInfo(`LEAVE_OF_ABSENCE ${decisionValue} by ${by}.`);
  }

  async function handlePrintLeave(caseId: number | null) {
    if (!caseId) return;
    const response = await printLeaveOfAbsence(caseId);
    setLeavePdfPath(response.pdfPath);
    setInfo('LEAVE_OF_ABSENCE PDF generated.');
  }

  async function saveReadmissionField(caseId: number | null, label: keyof ReadmissionRequestFormData, value: string) {
    if (!caseId || !readmissionData) return;
    const response = await patchReadmissionRequest(caseId, { [label]: value } as Partial<ReadmissionRequestFormData>);
    setReadmissionRecord(response.record);
    setReadmissionData(response.formData);
    setInfo(`Saved READMISSION_REQUEST field: ${label}`);
  }

  async function submitReadmissionModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitReadmissionRequest(caseId);
    setReadmissionRecord(response.record);
    await refreshReadmissionRequest(caseId);
    setInfo('READMISSION_REQUEST submitted.');
  }

  async function reviewReadmissionModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewReadmissionRequestByDept,
      faculty: reviewReadmissionRequestByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setReadmissionRecord(response.record);
    await refreshReadmissionRequest(caseId);
    setInfo(`READMISSION_REQUEST ${decisionValue} by ${by}.`);
  }

  async function handlePrintReadmission(caseId: number | null) {
    if (!caseId) return;
    const response = await printReadmissionRequest(caseId);
    setReadmissionPdfPath(response.pdfPath);
    setInfo('READMISSION_REQUEST PDF generated.');
  }

  async function saveUpgradeField(caseId: number | null, label: keyof UpgradeMscToPhdFormData, value: string) {
    if (!caseId || !upgradeData) return;
    const response = await patchUpgradeMscToPhd(caseId, { [label]: value } as Partial<UpgradeMscToPhdFormData>);
    setUpgradeRecord(response.record);
    setUpgradeData(response.formData);
    setInfo(`Saved UPGRADE_MSC_TO_PHD field: ${label}`);
  }

  async function submitUpgradeModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitUpgradeMscToPhd(caseId);
    setUpgradeRecord(response.record);
    await refreshUpgradeMscToPhd(caseId);
    setInfo('UPGRADE_MSC_TO_PHD submitted.');
  }

  async function reviewUpgradeModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewUpgradeMscToPhdByDept,
      faculty: reviewUpgradeMscToPhdByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setUpgradeRecord(response.record);
    await refreshUpgradeMscToPhd(caseId);
    setInfo(`UPGRADE_MSC_TO_PHD ${decisionValue} by ${by}.`);
  }

  async function handlePrintUpgrade(caseId: number | null) {
    if (!caseId) return;
    const response = await printUpgradeMscToPhd(caseId);
    setUpgradePdfPath(response.pdfPath);
    setInfo('UPGRADE_MSC_TO_PHD PDF generated.');
  }

  async function saveSummativeField(caseId: number | null, label: keyof SupervisorSummativeReportFormData, value: string) {
    if (!caseId || !summativeData) return;
    const response = await patchSupervisorSummativeReport(caseId, { [label]: value } as Partial<SupervisorSummativeReportFormData>);
    setSummativeRecord(response.record);
    setSummativeData(response.formData);
    setInfo(`Saved SUPERVISOR_SUMMATIVE_REPORT field: ${label}`);
  }

  async function submitSummativeModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitSupervisorSummativeReport(caseId);
    setSummativeRecord(response.record);
    await refreshSupervisorSummativeReport(caseId);
    setInfo('SUPERVISOR_SUMMATIVE_REPORT submitted.');
  }

  async function reviewSummativeModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewSupervisorSummativeReportByDept,
      faculty: reviewSupervisorSummativeReportByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setSummativeRecord(response.record);
    await refreshSupervisorSummativeReport(caseId);
    setInfo(`SUPERVISOR_SUMMATIVE_REPORT ${decisionValue} by ${by}.`);
  }

  async function handlePrintSummative(caseId: number | null) {
    if (!caseId) return;
    const response = await printSupervisorSummativeReport(caseId);
    setSummativePdfPath(response.pdfPath);
    setInfo('SUPERVISOR_SUMMATIVE_REPORT PDF generated.');
  }

  async function saveOtherRequestField(caseId: number | null, label: keyof OtherRequestFormData, value: string) {
    if (!caseId || !otherRequestData) return;
    const response = await patchOtherRequest(caseId, { [label]: value } as Partial<OtherRequestFormData>);
    setOtherRequestRecord(response.record);
    setOtherRequestData(response.formData);
    setInfo(`Saved OTHER_REQUEST field: ${label}`);
  }

  async function submitOtherRequestModule(caseId: number | null) {
    if (!caseId) return;
    const response = await submitOtherRequest(caseId);
    setOtherRequestRecord(response.record);
    await refreshOtherRequest(caseId);
    setInfo('OTHER_REQUEST submitted.');
  }

  async function reviewOtherRequestModule(caseId: number | null, decisionValue: ReviewDecisionValue, by: 'dept' | 'faculty') {
    if (!caseId) return;
    const handlers: Record<'dept' | 'faculty', ReviewHandler> = {
      dept: reviewOtherRequestByDept,
      faculty: reviewOtherRequestByFaculty,
    };
    const response = await handlers[by](caseId, decisionValue);
    setOtherRequestRecord(response.record);
    await refreshOtherRequest(caseId);
    setInfo(`OTHER_REQUEST ${decisionValue} by ${by}.`);
  }

  async function handlePrintOtherRequest(caseId: number | null) {
    if (!caseId) return;
    const response = await printOtherRequest(caseId);
    setOtherRequestPdfPath(response.pdfPath);
    setInfo('OTHER_REQUEST PDF generated.');
  }

  return {
    itsRecord,
    itsData,
    itsPdfPath,
    appointRecord,
    appointData,
    appointPdfPath,
    changeTitleRecord,
    changeTitleData,
    changeTitlePdfPath,
    changeSupervisorRecord,
    changeSupervisorData,
    changeSupervisorPdfPath,
    addCoSupervisorRecord,
    addCoSupervisorData,
    addCoSupervisorPdfPath,
    changeRecord,
    changeData,
    changePdfPath,
    summaryRecord,
    summaryData,
    summaryPdfPath,
    arbiterRecord,
    arbiterData,
    arbiterPdfPath,
    progressReportRecord,
    progressReportData,
    progressReportPdfPath,
    leaveRecord,
    leaveData,
    leavePdfPath,
    readmissionRecord,
    readmissionData,
    readmissionPdfPath,
    upgradeRecord,
    upgradeData,
    upgradePdfPath,
    summativeRecord,
    summativeData,
    summativePdfPath,
    otherRequestRecord,
    otherRequestData,
    otherRequestPdfPath,
    refreshIntentionToSubmit,
    refreshAppointExaminers,
    refreshChangeTitle,
    refreshChangeSupervisor,
    refreshAddCoSupervisor,
    refreshChangeExaminers,
    refreshExaminerSummaryCv,
    refreshAppointArbiter,
    refreshProgressReport,
    refreshLeaveOfAbsence,
    refreshReadmissionRequest,
    refreshUpgradeMscToPhd,
    refreshSupervisorSummativeReport,
    refreshOtherRequest,
    saveItsField,
    submitItsModule,
    reviewItsModule,
    handlePrintIts,
    saveAppointField,
    submitAppointModule,
    reviewAppointModule,
    handlePrintAppoint,
    saveChangeTitleField,
    submitChangeTitleModule,
    reviewChangeTitleModule,
    handlePrintChangeTitle,
    saveChangeSupervisorField,
    submitChangeSupervisorModule,
    reviewChangeSupervisorModule,
    handlePrintChangeSupervisor,
    saveAddCoSupervisorField,
    submitAddCoSupervisorModule,
    reviewAddCoSupervisorModule,
    handlePrintAddCoSupervisor,
    saveChangeField,
    submitChangeModule,
    reviewChangeModule,
    handlePrintChange,
    saveSummaryField,
    submitSummaryModule,
    reviewSummaryModule,
    handlePrintSummary,
    saveArbiterField,
    submitArbiterModule,
    reviewArbiterModule,
    handlePrintArbiter,
    saveProgressReportField,
    submitProgressReportModule,
    reviewProgressReportModule,
    handlePrintProgressReport,
    saveLeaveField,
    submitLeaveModule,
    reviewLeaveModule,
    handlePrintLeave,
    saveReadmissionField,
    submitReadmissionModule,
    reviewReadmissionModule,
    handlePrintReadmission,
    saveUpgradeField,
    submitUpgradeModule,
    reviewUpgradeModule,
    handlePrintUpgrade,
    saveSummativeField,
    submitSummativeModule,
    reviewSummativeModule,
    handlePrintSummative,
    saveOtherRequestField,
    submitOtherRequestModule,
    reviewOtherRequestModule,
    handlePrintOtherRequest,
  };
}

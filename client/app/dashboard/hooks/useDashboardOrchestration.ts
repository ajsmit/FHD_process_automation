import { resolveApiOrigin } from '@/lib/api';
import { useDashboardCoreCase } from './useDashboardCoreCase';
import { useDashboardOpsFeeds } from './useDashboardOpsFeeds';
import { useDashboardPhaseBModules } from './useDashboardPhaseBModules';
import { useDashboardProfilesMou } from './useDashboardProfilesMou';

const apiOrigin = resolveApiOrigin();

export function useDashboardOrchestration() {
  const core = useDashboardCoreCase();
  const ops = useDashboardOpsFeeds();
  const profiles = useDashboardProfilesMou(apiOrigin, core.setInfo);
  const phaseB = useDashboardPhaseBModules(core.setInfo);

  async function runSasiCheck() {
    await core.runSasiCheck({
      refreshCaseNotifications: ops.refreshCaseNotifications,
      refreshSupervisorProfiles: profiles.refreshSupervisorProfiles,
      refreshMou: profiles.refreshMou,
    });
  }

  async function saveField(label: Parameters<typeof core.saveField>[0], value: Parameters<typeof core.saveField>[1]) {
    await core.saveField(label, value, {
      refreshSupervisorProfiles: profiles.refreshSupervisorProfiles,
      refreshMou: profiles.refreshMou,
      isMouCompleted: profiles.mouRecord?.status === 'completed',
    });
  }

  async function sendExternalProfileLink(
    role: Parameters<typeof core.sendExternalProfileLink>[0],
    emailInput: Parameters<typeof core.sendExternalProfileLink>[1],
  ) {
    await core.sendExternalProfileLink(role, emailInput, {
      refreshToDoItems: ops.refreshToDoItems,
    });
  }

  async function handleStudentVet() {
    await core.handleStudentVet(ops.refreshCaseNotifications);
  }

  async function handleSupervisorReview() {
    await core.handleSupervisorReview(ops.refreshCaseNotifications);
  }

  async function handleDeptReview() {
    await core.handleDeptReview(ops.refreshCaseNotifications);
  }

  async function handleFacultyReview() {
    await core.handleFacultyReview(ops.refreshCaseNotifications);
  }

  async function handleChairpersonSign() {
    await core.handleChairpersonSign(ops.refreshCaseNotifications);
  }

  async function handleDeptSendFaculty() {
    await core.handleDeptSendFaculty(ops.refreshCaseNotifications);
  }

  async function triggerReminder() {
    await ops.triggerReminder(core.caseRecord?.id ?? null, core.setInfo);
  }

  async function loadModuleData(moduleKey: string) {
    core.setActiveModule(moduleKey);
    core.setError(null);
    core.setInfo(null);

    const caseId = core.caseRecord?.id;
    const moduleLoaders: Record<string, () => Promise<void>> = {
      title_registration: async () => {
        if (caseId) {
          await core.refreshExternalInviteStatuses(caseId);
        }
      },
      mou: async () => {
        if (caseId) {
          await profiles.refreshMou(caseId);
        }
      },
      intention_to_submit: async () => {
        if (caseId) {
          await phaseB.refreshIntentionToSubmit(caseId);
        }
      },
      appoint_examiners: async () => {
        if (caseId) {
          await phaseB.refreshAppointExaminers(caseId);
        }
      },
      change_title: async () => {
        if (caseId) {
          await phaseB.refreshChangeTitle(caseId);
        }
      },
      change_supervisor: async () => {
        if (caseId) {
          await phaseB.refreshChangeSupervisor(caseId);
        }
      },
      add_co_supervisor: async () => {
        if (caseId) {
          await phaseB.refreshAddCoSupervisor(caseId);
        }
      },
      change_examiners: async () => {
        if (caseId) {
          await phaseB.refreshChangeExaminers(caseId);
        }
      },
      examiner_summary_cv: async () => {
        if (caseId) {
          await phaseB.refreshExaminerSummaryCv(caseId);
        }
      },
      appoint_arbiter: async () => {
        if (caseId) {
          await phaseB.refreshAppointArbiter(caseId);
        }
      },
      progress_report: async () => {
        if (caseId) {
          await phaseB.refreshProgressReport(caseId);
        }
      },
      leave_of_absence: async () => {
        if (caseId) {
          await phaseB.refreshLeaveOfAbsence(caseId);
        }
      },
      readmission_request: async () => {
        if (caseId) {
          await phaseB.refreshReadmissionRequest(caseId);
        }
      },
      upgrade_msc_to_phd: async () => {
        if (caseId) {
          await phaseB.refreshUpgradeMscToPhd(caseId);
        }
      },
      supervisor_summative_report: async () => {
        if (caseId) {
          await phaseB.refreshSupervisorSummativeReport(caseId);
        }
      },
      other_request: async () => {
        if (caseId) {
          await phaseB.refreshOtherRequest(caseId);
        }
      },
      supervisor_profiles: async () => {
        if (caseId) {
          await profiles.refreshSupervisorProfiles(caseId);
        }
      },
      pipeline: async () => {
        await ops.loadPipeline();
      },
      tasks: async () => {
        await ops.loadTasks();
      },
      to_do: async () => {
        await ops.refreshToDoItems();
      },
      people: async () => {
        await ops.loadPeople();
      },
      team: async () => {
        await ops.loadPeople();
      },
      approvals: async () => {
        await ops.loadNotifications(caseId);
      },
      system: async () => {
        await ops.loadNotifications(caseId);
      },
    };

    const loader = moduleLoaders[moduleKey];
    if (loader) {
      await loader();
    }
  }

  async function updateProfileField(profileId: number, patch: Record<string, unknown>) {
    await profiles.updateProfileField(core.caseRecord?.id ?? null, profileId, patch);
  }

  async function handleSubmitProfile(profileId: number) {
    await profiles.handleSubmitProfile(core.caseRecord?.id ?? null, profileId);
  }

  async function handleRequestProfiles() {
    await profiles.handleRequestProfiles(core.caseRecord?.id ?? null);
  }

  async function handleSupervisorProfileReminder() {
    await profiles.handleSupervisorProfileReminder(core.caseRecord?.id ?? null, ops.refreshCaseNotifications);
  }

  async function handleUploadProfileCv(profileId: number, file: File) {
    await profiles.handleUploadProfileCv(core.caseRecord?.id ?? null, profileId, file);
  }

  async function saveMouField(label: Parameters<typeof profiles.saveMouField>[1], value: Parameters<typeof profiles.saveMouField>[2]) {
    await profiles.saveMouField(core.caseRecord?.id ?? null, label, value);
  }

  async function handleCompleteMou() {
    await profiles.handleCompleteMou(core.caseRecord?.id ?? null, runSasiCheck);
  }

  async function handlePrintMou() {
    await profiles.handlePrintMou(core.caseRecord?.id ?? null);
  }

  async function saveItsField(label: Parameters<typeof phaseB.saveItsField>[1], value: string) {
    await phaseB.saveItsField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitItsModule() {
    await phaseB.submitItsModule(core.caseRecord?.id ?? null);
  }

  async function reviewItsModule(decisionValue: 'approved' | 'returned', by: 'supervisor' | 'dept') {
    await phaseB.reviewItsModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintIts() {
    await phaseB.handlePrintIts(core.caseRecord?.id ?? null);
  }

  async function saveAppointField(label: Parameters<typeof phaseB.saveAppointField>[1], value: string) {
    await phaseB.saveAppointField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitAppointModule() {
    await phaseB.submitAppointModule(core.caseRecord?.id ?? null);
  }

  async function reviewAppointModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'chair' | 'faculty') {
    await phaseB.reviewAppointModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintAppoint() {
    await phaseB.handlePrintAppoint(core.caseRecord?.id ?? null);
  }

  async function saveChangeTitleField(label: Parameters<typeof phaseB.saveChangeTitleField>[1], value: string) {
    await phaseB.saveChangeTitleField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitChangeTitleModule() {
    await phaseB.submitChangeTitleModule(core.caseRecord?.id ?? null);
  }

  async function reviewChangeTitleModule(decisionValue: 'approved' | 'returned', by: 'supervisor' | 'dept' | 'chair' | 'faculty') {
    await phaseB.reviewChangeTitleModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintChangeTitle() {
    await phaseB.handlePrintChangeTitle(core.caseRecord?.id ?? null);
  }

  async function saveChangeSupervisorField(label: Parameters<typeof phaseB.saveChangeSupervisorField>[1], value: string) {
    await phaseB.saveChangeSupervisorField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitChangeSupervisorModule() {
    await phaseB.submitChangeSupervisorModule(core.caseRecord?.id ?? null);
  }

  async function reviewChangeSupervisorModule(decisionValue: 'approved' | 'returned', by: 'supervisor' | 'dept' | 'chair' | 'faculty') {
    await phaseB.reviewChangeSupervisorModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintChangeSupervisor() {
    await phaseB.handlePrintChangeSupervisor(core.caseRecord?.id ?? null);
  }

  async function saveAddCoSupervisorField(label: Parameters<typeof phaseB.saveAddCoSupervisorField>[1], value: string) {
    await phaseB.saveAddCoSupervisorField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitAddCoSupervisorModule() {
    await phaseB.submitAddCoSupervisorModule(core.caseRecord?.id ?? null);
  }

  async function reviewAddCoSupervisorModule(decisionValue: 'approved' | 'returned', by: 'supervisor' | 'dept' | 'chair' | 'faculty') {
    await phaseB.reviewAddCoSupervisorModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintAddCoSupervisor() {
    await phaseB.handlePrintAddCoSupervisor(core.caseRecord?.id ?? null);
  }

  async function saveChangeField(label: Parameters<typeof phaseB.saveChangeField>[1], value: string) {
    await phaseB.saveChangeField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitChangeModule() {
    await phaseB.submitChangeModule(core.caseRecord?.id ?? null);
  }

  async function reviewChangeModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'chair' | 'faculty') {
    await phaseB.reviewChangeModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintChange() {
    await phaseB.handlePrintChange(core.caseRecord?.id ?? null);
  }

  async function saveSummaryField(label: Parameters<typeof phaseB.saveSummaryField>[1], value: string) {
    await phaseB.saveSummaryField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitSummaryModule() {
    await phaseB.submitSummaryModule(core.caseRecord?.id ?? null);
  }

  async function reviewSummaryModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewSummaryModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintSummary() {
    await phaseB.handlePrintSummary(core.caseRecord?.id ?? null);
  }

  async function saveArbiterField(label: Parameters<typeof phaseB.saveArbiterField>[1], value: string) {
    await phaseB.saveArbiterField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitArbiterModule() {
    await phaseB.submitArbiterModule(core.caseRecord?.id ?? null);
  }

  async function reviewArbiterModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewArbiterModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintArbiter() {
    await phaseB.handlePrintArbiter(core.caseRecord?.id ?? null);
  }

  async function saveProgressReportField(label: Parameters<typeof phaseB.saveProgressReportField>[1], value: string) {
    await phaseB.saveProgressReportField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitProgressReportModule() {
    await phaseB.submitProgressReportModule(core.caseRecord?.id ?? null);
  }

  async function reviewProgressReportModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewProgressReportModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintProgressReport() {
    await phaseB.handlePrintProgressReport(core.caseRecord?.id ?? null);
  }

  async function saveLeaveField(label: Parameters<typeof phaseB.saveLeaveField>[1], value: string) {
    await phaseB.saveLeaveField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitLeaveModule() {
    await phaseB.submitLeaveModule(core.caseRecord?.id ?? null);
  }

  async function reviewLeaveModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewLeaveModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintLeave() {
    await phaseB.handlePrintLeave(core.caseRecord?.id ?? null);
  }

  async function saveReadmissionField(label: Parameters<typeof phaseB.saveReadmissionField>[1], value: string) {
    await phaseB.saveReadmissionField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitReadmissionModule() {
    await phaseB.submitReadmissionModule(core.caseRecord?.id ?? null);
  }

  async function reviewReadmissionModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewReadmissionModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintReadmission() {
    await phaseB.handlePrintReadmission(core.caseRecord?.id ?? null);
  }

  async function saveUpgradeField(label: Parameters<typeof phaseB.saveUpgradeField>[1], value: string) {
    await phaseB.saveUpgradeField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitUpgradeModule() {
    await phaseB.submitUpgradeModule(core.caseRecord?.id ?? null);
  }

  async function reviewUpgradeModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewUpgradeModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintUpgrade() {
    await phaseB.handlePrintUpgrade(core.caseRecord?.id ?? null);
  }

  async function saveSummativeField(label: Parameters<typeof phaseB.saveSummativeField>[1], value: string) {
    await phaseB.saveSummativeField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitSummativeModule() {
    await phaseB.submitSummativeModule(core.caseRecord?.id ?? null);
  }

  async function reviewSummativeModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewSummativeModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintSummative() {
    await phaseB.handlePrintSummative(core.caseRecord?.id ?? null);
  }

  async function saveOtherRequestField(label: Parameters<typeof phaseB.saveOtherRequestField>[1], value: string) {
    await phaseB.saveOtherRequestField(core.caseRecord?.id ?? null, label, value);
  }

  async function submitOtherRequestModule() {
    await phaseB.submitOtherRequestModule(core.caseRecord?.id ?? null);
  }

  async function reviewOtherRequestModule(decisionValue: 'approved' | 'returned', by: 'dept' | 'faculty') {
    await phaseB.reviewOtherRequestModule(core.caseRecord?.id ?? null, decisionValue, by);
  }

  async function handlePrintOtherRequest() {
    await phaseB.handlePrintOtherRequest(core.caseRecord?.id ?? null);
  }

  return {
    ...core,
    ...ops,
    ...profiles,
    ...phaseB,
    apiOrigin,
    runSasiCheck,
    saveField,
    sendExternalProfileLink,
    handleStudentVet,
    handleSupervisorReview,
    handleDeptReview,
    handleFacultyReview,
    handleChairpersonSign,
    handleDeptSendFaculty,
    loadModuleData,
    triggerReminder,
    updateProfileField,
    handleSubmitProfile,
    handleRequestProfiles,
    handleSupervisorProfileReminder,
    handleUploadProfileCv,
    saveMouField,
    handleCompleteMou,
    handlePrintMou,
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

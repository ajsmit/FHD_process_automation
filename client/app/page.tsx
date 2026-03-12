'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { CaseLookupCard } from './dashboard/components/CaseLookupCard';
import { DashboardSidebar } from './dashboard/components/DashboardSidebar';
import { OperationalPanels } from './dashboard/components/OperationalPanels';
import { WorkflowModulePanels } from './dashboard/components/WorkflowModulePanels';
import { WorkflowSupportPanels } from './dashboard/components/WorkflowSupportPanels';
import { useDashboardOrchestration } from './dashboard/hooks/useDashboardOrchestration';
import { Card } from '@/components/ui/card';
import { TitleRegistrationModule } from './title-registration/components/TitleRegistrationModule';
import { resolveApiOrigin, type CaseStatus } from '@/lib/api';

const modules = [
  'title_registration',
  'to_do',
  'supervisor_profiles',
  'mou',
  'intention_to_submit',
  'appoint_examiners',
  'change_title',
  'change_supervisor',
  'add_co_supervisor',
  'change_examiners',
  'examiner_summary_cv',
  'appoint_arbiter',
  'progress_report',
  'leave_of_absence',
  'readmission_request',
  'upgrade_msc_to_phd',
  'supervisor_summative_report',
  'other_request',
  'pipeline',
  'tasks',
  'people',
  'approvals',
  'system',
  'radar',
  'timelines',
  'calendar',
  'kanban',
  'team',
  'policy',
];

const apiOrigin = resolveApiOrigin();

function statusLabel(status: CaseStatus): string {
  const map: Record<CaseStatus, string> = {
    awaiting_student_vetting: 'Awaiting student vetting',
    awaiting_supervisor_review: 'Awaiting supervisor review',
    returned_by_supervisor: 'Returned by supervisor',
    awaiting_dept_fhd_review: 'Awaiting Dept FHD review',
    awaiting_chairperson_signature: 'Awaiting Chairperson signature',
    awaiting_dept_fhd_send_to_faculty: 'Awaiting Dept FHD send to Faculty',
    returned_by_dept_fhd: 'Returned by Dept FHD',
    sent_to_faculty_fhd: 'Sent to Faculty FHD',
    returned_by_faculty_fhd: 'Returned by Faculty FHD',
    approved: 'Approved',
  };
  return map[status];
}

function statusTone(status: CaseStatus): 'approved' | 'in_progress' | 'action_required' {
  if (status === 'approved') return 'approved';
  if (status.includes('returned')) return 'action_required';
  return 'in_progress';
}

export default function Page() {
  const {
    activeModule,
    studentNumber,
    setStudentNumber,
    student,
    caseRecord,
    formData,
    pipeline,
    toDoItems,
    tasks,
    people,
    peopleDirectory,
    bcbDirectory,
    supervisorProfiles,
    mouRecord,
    mouData,
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
    notifications,
    decision,
    setDecision,
    comments,
    setComments,
    error,
    info,
    loading,
    isSaving,
    lastSavedAt,
    externalSearchByRole,
    setExternalSearchByRole,
    inviteStatusByRole,
    printUrl,
    mouPrintUrl,
    toGeneratedFormUrl,
    runSasiCheck,
    saveField,
    saveFields,
    saveSupervisorFields,
    updateLocalFields,
    saveCoSupervisorFields,
    getCoSupervisorCount,
    setCoSupervisorCount,
    formatInternalPerson,
    internalPersonValue,
    resolveInternalDisplayName,
    formatExternalPerson,
    filteredExternalDirectory,
    sendExternalProfileLink,
    applyExternalLookup,
    handleAdminSupervisorSameAsSupervisorChange,
    handleGeneratePdf,
    handleSaveFormNow,
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
  } = useDashboardOrchestration();

  return (
    <div className='min-h-screen p-4 md:p-8'>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className='mx-auto grid max-w-7xl gap-4 md:grid-cols-[220px_1fr]'>
        <DashboardSidebar
          modules={modules}
          activeModule={activeModule}
          onSelectModule={(moduleKey) => {
            void loadModuleData(moduleKey);
          }}
        />

        <div className='space-y-4'>
          <CaseLookupCard
            studentNumber={studentNumber}
            onStudentNumberChange={setStudentNumber}
            loading={loading}
            onCheckSasi={() => {
              void runSasiCheck();
            }}
            student={student}
            caseRecord={caseRecord}
            statusLabel={statusLabel}
            statusTone={statusTone}
          />

          {activeModule === 'title_registration' && formData && caseRecord && (
            <>
              <TitleRegistrationModule
                formData={formData}
                caseRecord={caseRecord}
                peopleDirectory={peopleDirectory}
                bcbDirectory={bcbDirectory}
                externalSearchByRole={externalSearchByRole}
                setExternalSearchByRole={setExternalSearchByRole}
                filteredExternalDirectory={filteredExternalDirectory}
                formatExternalPerson={formatExternalPerson}
                formatInternalPerson={formatInternalPerson}
                internalPersonValue={internalPersonValue}
                resolveInternalDisplayName={resolveInternalDisplayName}
                getCoSupervisorCount={getCoSupervisorCount}
                setCoSupervisorCount={setCoSupervisorCount}
                saveField={saveField}
                saveFields={saveFields}
                saveSupervisorFields={saveSupervisorFields}
                saveCoSupervisorFields={saveCoSupervisorFields}
                updateLocalFields={updateLocalFields}
                applyExternalLookup={applyExternalLookup}
                sendExternalProfileLink={sendExternalProfileLink}
                handleAdminSupervisorSameAsSupervisorChange={handleAdminSupervisorSameAsSupervisorChange}
                loadModuleData={loadModuleData}
                handleSaveFormNow={handleSaveFormNow}
                handleGeneratePdf={handleGeneratePdf}
                handleStudentVet={handleStudentVet}
                handleSupervisorReview={handleSupervisorReview}
                handleDeptReview={handleDeptReview}
                handleChairpersonSign={handleChairpersonSign}
                handleDeptSendFaculty={handleDeptSendFaculty}
                handleFacultyReview={handleFacultyReview}
                triggerReminder={triggerReminder}
                isSaving={isSaving}
                printUrl={printUrl}
                lastSavedAt={lastSavedAt}
                decision={decision}
                setDecision={setDecision}
                comments={comments}
                setComments={setComments}
                inviteStatusByRole={inviteStatusByRole}
              />
            </>
          )}

          <OperationalPanels
            activeModule={activeModule}
            toDoItems={toDoItems}
            pipeline={pipeline}
            tasks={tasks}
            people={people}
            notifications={notifications}
          />

          <WorkflowSupportPanels
            activeModule={activeModule}
            caseRecordId={caseRecord?.id ?? null}
            supervisorProfiles={supervisorProfiles}
            apiOrigin={apiOrigin}
            onRequestProfiles={() => {
              void handleRequestProfiles();
            }}
            onSupervisorProfileReminder={() => {
              void handleSupervisorProfileReminder();
            }}
            onUpdateProfileField={(profileId, patch) => {
              void updateProfileField(profileId, patch);
            }}
            onSubmitProfile={(profileId) => {
              void handleSubmitProfile(profileId);
            }}
            onUploadProfileCv={(profileId, file) => {
              void handleUploadProfileCv(profileId, file);
            }}
            mouData={mouData}
            mouRecord={mouRecord}
            mouPrintUrl={mouPrintUrl}
            onSaveMouField={(label, value) => {
              void saveMouField(label, value);
            }}
            onPrintMou={() => {
              void handlePrintMou();
            }}
            onCompleteMou={() => {
              void handleCompleteMou();
            }}
          />

          <WorkflowModulePanels
            activeModule={activeModule}
            caseRecordId={caseRecord?.id ?? null}
            toGeneratedFormUrl={toGeneratedFormUrl}
            itsRecord={itsRecord}
            itsData={itsData}
            itsPdfPath={itsPdfPath}
            onSaveItsField={(label, value) => {
              void saveItsField(label, value);
            }}
            onSubmitItsModule={() => {
              void submitItsModule();
            }}
            onReviewItsModule={(nextDecision, by) => {
              void reviewItsModule(nextDecision, by);
            }}
            onPrintIts={() => {
              void handlePrintIts();
            }}
            appointRecord={appointRecord}
            appointData={appointData}
            appointPdfPath={appointPdfPath}
            onSaveAppointField={(label, value) => {
              void saveAppointField(label, value);
            }}
            onSubmitAppointModule={() => {
              void submitAppointModule();
            }}
            onReviewAppointModule={(nextDecision, by) => {
              void reviewAppointModule(nextDecision, by);
            }}
            onPrintAppoint={() => {
              void handlePrintAppoint();
            }}
            changeRecord={changeRecord}
            changeData={changeData}
            changePdfPath={changePdfPath}
            onSaveChangeField={(label, value) => {
              void saveChangeField(label, value);
            }}
            onSubmitChangeModule={() => {
              void submitChangeModule();
            }}
            onReviewChangeModule={(nextDecision, by) => {
              void reviewChangeModule(nextDecision, by);
            }}
            onPrintChange={() => {
              void handlePrintChange();
            }}
            changeTitleRecord={changeTitleRecord}
            changeTitleData={changeTitleData}
            changeTitlePdfPath={changeTitlePdfPath}
            onSaveChangeTitleField={(label, value) => {
              void saveChangeTitleField(label, value);
            }}
            onSubmitChangeTitleModule={() => {
              void submitChangeTitleModule();
            }}
            onReviewChangeTitleModule={(nextDecision, by) => {
              void reviewChangeTitleModule(nextDecision, by);
            }}
            onPrintChangeTitle={() => {
              void handlePrintChangeTitle();
            }}
            changeSupervisorRecord={changeSupervisorRecord}
            changeSupervisorData={changeSupervisorData}
            changeSupervisorPdfPath={changeSupervisorPdfPath}
            onSaveChangeSupervisorField={(label, value) => {
              void saveChangeSupervisorField(label, value);
            }}
            onSubmitChangeSupervisorModule={() => {
              void submitChangeSupervisorModule();
            }}
            onReviewChangeSupervisorModule={(nextDecision, by) => {
              void reviewChangeSupervisorModule(nextDecision, by);
            }}
            onPrintChangeSupervisor={() => {
              void handlePrintChangeSupervisor();
            }}
            addCoSupervisorRecord={addCoSupervisorRecord}
            addCoSupervisorData={addCoSupervisorData}
            addCoSupervisorPdfPath={addCoSupervisorPdfPath}
            onSaveAddCoSupervisorField={(label, value) => {
              void saveAddCoSupervisorField(label, value);
            }}
            onSubmitAddCoSupervisorModule={() => {
              void submitAddCoSupervisorModule();
            }}
            onReviewAddCoSupervisorModule={(nextDecision, by) => {
              void reviewAddCoSupervisorModule(nextDecision, by);
            }}
            onPrintAddCoSupervisor={() => {
              void handlePrintAddCoSupervisor();
            }}
            summaryRecord={summaryRecord}
            summaryData={summaryData}
            summaryPdfPath={summaryPdfPath}
            onSaveSummaryField={(label, value) => {
              void saveSummaryField(label, value);
            }}
            onSubmitSummaryModule={() => {
              void submitSummaryModule();
            }}
            onReviewSummaryModule={(nextDecision, by) => {
              void reviewSummaryModule(nextDecision, by);
            }}
            onPrintSummary={() => {
              void handlePrintSummary();
            }}
            arbiterRecord={arbiterRecord}
            arbiterData={arbiterData}
            arbiterPdfPath={arbiterPdfPath}
            onSaveArbiterField={(label, value) => {
              void saveArbiterField(label, value);
            }}
            onSubmitArbiterModule={() => {
              void submitArbiterModule();
            }}
            onReviewArbiterModule={(nextDecision, by) => {
              void reviewArbiterModule(nextDecision, by);
            }}
            onPrintArbiter={() => {
              void handlePrintArbiter();
            }}
            progressReportRecord={progressReportRecord}
            progressReportData={progressReportData}
            progressReportPdfPath={progressReportPdfPath}
            onSaveProgressReportField={(label, value) => {
              void saveProgressReportField(label, value);
            }}
            onSubmitProgressReportModule={() => {
              void submitProgressReportModule();
            }}
            onReviewProgressReportModule={(nextDecision, by) => {
              void reviewProgressReportModule(nextDecision, by);
            }}
            onPrintProgressReport={() => {
              void handlePrintProgressReport();
            }}
            leaveRecord={leaveRecord}
            leaveData={leaveData}
            leavePdfPath={leavePdfPath}
            onSaveLeaveField={(label, value) => {
              void saveLeaveField(label, value);
            }}
            onSubmitLeaveModule={() => {
              void submitLeaveModule();
            }}
            onReviewLeaveModule={(nextDecision, by) => {
              void reviewLeaveModule(nextDecision, by);
            }}
            onPrintLeave={() => {
              void handlePrintLeave();
            }}
            readmissionRecord={readmissionRecord}
            readmissionData={readmissionData}
            readmissionPdfPath={readmissionPdfPath}
            onSaveReadmissionField={(label, value) => {
              void saveReadmissionField(label, value);
            }}
            onSubmitReadmissionModule={() => {
              void submitReadmissionModule();
            }}
            onReviewReadmissionModule={(nextDecision, by) => {
              void reviewReadmissionModule(nextDecision, by);
            }}
            onPrintReadmission={() => {
              void handlePrintReadmission();
            }}
            upgradeRecord={upgradeRecord}
            upgradeData={upgradeData}
            upgradePdfPath={upgradePdfPath}
            onSaveUpgradeField={(label, value) => {
              void saveUpgradeField(label, value);
            }}
            onSubmitUpgradeModule={() => {
              void submitUpgradeModule();
            }}
            onReviewUpgradeModule={(nextDecision, by) => {
              void reviewUpgradeModule(nextDecision, by);
            }}
            onPrintUpgrade={() => {
              void handlePrintUpgrade();
            }}
            summativeRecord={summativeRecord}
            summativeData={summativeData}
            summativePdfPath={summativePdfPath}
            onSaveSummativeField={(label, value) => {
              void saveSummativeField(label, value);
            }}
            onSubmitSummativeModule={() => {
              void submitSummativeModule();
            }}
            onReviewSummativeModule={(nextDecision, by) => {
              void reviewSummativeModule(nextDecision, by);
            }}
            onPrintSummative={() => {
              void handlePrintSummative();
            }}
            otherRequestRecord={otherRequestRecord}
            otherRequestData={otherRequestData}
            otherRequestPdfPath={otherRequestPdfPath}
            onSaveOtherRequestField={(label, value) => {
              void saveOtherRequestField(label, value);
            }}
            onSubmitOtherRequestModule={() => {
              void submitOtherRequestModule();
            }}
            onReviewOtherRequestModule={(nextDecision, by) => {
              void reviewOtherRequestModule(nextDecision, by);
            }}
            onPrintOtherRequest={() => {
              void handlePrintOtherRequest();
            }}
          />


          {error && (
            <Card className='border-err/40'>
              <p className='flex items-center gap-2 text-sm text-err'><AlertCircle size={14} /> {error}</p>
            </Card>
          )}

          {info && (
            <Card className='border-ok/40'>
              <p className='flex items-center gap-2 text-sm text-ok'><CheckCircle2 size={14} /> {info}</p>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}

import express from 'express';
import {
  checkSasiAndCreateCase,
  getCase,
  getMou,
  getLeaveOfAbsenceModule,
  getOtherRequestModule,
  getReadmissionRequestModule,
  getSupervisorSummativeReportModule,
  getUpgradeMscToPhdModule,
  getIntentionToSubmit,
  getNotifications,
  getExternalInvitesForCase,
  getLandingMessagesForView,
  getManagedLandingMessagesView,
  getFacultyCalendar,
  getPeople,
  getPipeline,
  getAppointExaminers,
  getAppointArbiter,
  getAddCoSupervisor,
  getChangeExaminers,
  getChangeSupervisor,
  getChangeTitle,
  getExaminerSummaryCv,
  getSupervisorProfiles,
  getTasks,
  getToDo,
  markStudentVetted,
  patchForm,
  patchFacultyCalendar,
  patchLandingMessageById,
  patchIntentionToSubmit,
  patchLeaveOfAbsenceModule,
  patchOtherRequestModule,
  patchReadmissionRequestModule,
  patchSupervisorSummativeReportModule,
  patchUpgradeMscToPhdModule,
  patchProgressReportModule,
  patchMou,
  patchAppointExaminers,
  patchAppointArbiter,
  patchAddCoSupervisor,
  patchChangeExaminers,
  patchChangeSupervisor,
  patchChangeTitle,
  patchExaminerSummaryCv,
  patchSupervisorProfile,
  postAppointArbiterDeptReview,
  postAppointArbiterFacultyReview,
  postAddCoSupervisorChairReview,
  postAddCoSupervisorDeptReview,
  postAddCoSupervisorFacultyReview,
  postAddCoSupervisorSupervisorReview,
  postAppointExaminersChairReview,
  postAppointExaminersDeptReview,
  postAppointExaminersFacultyReview,
  postChangeExaminersChairReview,
  postChangeExaminersDeptReview,
  postChangeExaminersFacultyReview,
  postChangeSupervisorChairReview,
  postChangeSupervisorDeptReview,
  postChangeSupervisorFacultyReview,
  postChangeSupervisorSupervisorReview,
  postChangeTitleChairReview,
  postChangeTitleDeptReview,
  postChangeTitleFacultyReview,
  postChangeTitleSupervisorReview,
  postExaminerSummaryCvDeptReview,
  postExaminerSummaryCvFacultyReview,
  postItsDeptReview,
  postItsSupervisorReview,
  postPrintAppointArbiter,
  postPrintAppointExaminers,
  postPrintAddCoSupervisor,
  postPrintChangeExaminers,
  postPrintChangeSupervisor,
  postPrintChangeTitle,
  postPrintExaminerSummaryCv,
  postPrintIntentionToSubmit,
  postPrintLeaveOfAbsence,
  postPrintOtherRequest,
  postPrintReadmissionRequest,
  postPrintSupervisorSummativeReport,
  postPrintUpgradeMscToPhd,
  postPrintProgressReport,
  postSubmitIntentionToSubmit,
  postSubmitLeaveOfAbsence,
  postSubmitOtherRequest,
  postSubmitReadmissionRequest,
  postSubmitSupervisorSummativeReport,
  postSubmitUpgradeMscToPhd,
  postSubmitProgressReport,
  postLandingMessage,
  postSubmitAddCoSupervisor,
  postSubmitAppointExaminers,
  postSubmitAppointArbiter,
  postSubmitChangeExaminers,
  postSubmitChangeSupervisor,
  postSubmitChangeTitle,
  postSubmitExaminerSummaryCv,
  postRequestSupervisorProfiles,
  postSubmitSupervisorProfile,
  postUploadSupervisorProfileCv,
  postSupervisorProfilesReminder,
  printMou,
  printPdf,
  reviewDept,
  reviewFaculty,
  reviewSupervisor,
  sendToFacultyByDept,
  signChairperson,
  markMouCompleted,
  triggerFacultyReminder,
  getProgressReportModule,
  postLeaveOfAbsenceDeptReview,
  postLeaveOfAbsenceFacultyReview,
  postOtherRequestDeptReview,
  postOtherRequestFacultyReview,
  postReadmissionRequestDeptReview,
  postReadmissionRequestFacultyReview,
  postSupervisorSummativeReportDeptReview,
  postSupervisorSummativeReportFacultyReview,
  postUpgradeMscToPhdDeptReview,
  postUpgradeMscToPhdFacultyReview,
  postProgressReportDeptReview,
  postProgressReportFacultyReview,
} from '../../../controllers/titleRegistrationWorkflowController';
import { requireAuth } from '../../../middleware/auth';
import { validateBody, validateParams, validateQuery } from '../../../middleware/requestValidation';
import { requireTransitionAuthorization } from '../../../middleware/transitionAuthorization';
import {
  requireCaseOperationAuthorization,
  requireCollectionOperationAuthorization,
  requireProfileOperationAuthorization,
} from '../../../middleware/workflowAuthorization';
import {
  caseIdParamSchema,
  calendarPatchBodySchema,
  calendarQuerySchema,
  calendarYearParamSchema,
  landingMessageBodySchema,
  landingMessagePatchBodySchema,
  landingMessagesQuerySchema,
  commentsOnlyBodySchema,
  moduleReviewDecisionBodySchema,
  messageIdParamSchema,
  patchPayloadBodySchema,
  pipelineQuerySchema,
  profileIdParamSchema,
  profileCvUploadBodySchema,
  reviewDecisionBodySchema,
  studentNumberParamSchema,
} from '../../../validation/requestSchemas';

const router = express.Router();

router.get('/sasi/:studentNumber/check', requireAuth, validateParams(studentNumberParamSchema), checkSasiAndCreateCase);
router.get('/cases/:caseId', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getCase);
router.patch('/cases/:caseId/form', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('form_edit'), patchForm);
router.post('/cases/:caseId/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('print'), printPdf);
router.post('/cases/:caseId/student-vet', requireAuth, validateParams(caseIdParamSchema), requireTransitionAuthorization('student_vet'), markStudentVetted);
router.post('/cases/:caseId/supervisor-review', requireAuth, validateParams(caseIdParamSchema), validateBody(reviewDecisionBodySchema), requireTransitionAuthorization('supervisor_review'), reviewSupervisor);
router.post('/cases/:caseId/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(reviewDecisionBodySchema), requireTransitionAuthorization('dept_review'), reviewDept);
router.post('/cases/:caseId/chairperson-sign', requireAuth, validateParams(caseIdParamSchema), validateBody(commentsOnlyBodySchema), requireTransitionAuthorization('chairperson_sign'), signChairperson);
router.post('/cases/:caseId/dept-send-faculty', requireAuth, validateParams(caseIdParamSchema), requireTransitionAuthorization('dept_send_faculty'), sendToFacultyByDept);
router.post('/cases/:caseId/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(reviewDecisionBodySchema), requireTransitionAuthorization('faculty_review'), reviewFaculty);
router.post('/cases/:caseId/reminder', requireAuth, validateParams(caseIdParamSchema), requireTransitionAuthorization('reminder'), triggerFacultyReminder);
router.get('/pipeline', requireAuth, validateQuery(pipelineQuerySchema), requireCollectionOperationAuthorization(), getPipeline);
router.get('/faculty-calendar', requireAuth, validateQuery(calendarQuerySchema), requireCollectionOperationAuthorization(), getFacultyCalendar);
router.patch('/faculty-calendar/:year', requireAuth, validateParams(calendarYearParamSchema), validateBody(calendarPatchBodySchema), requireCollectionOperationAuthorization(), patchFacultyCalendar);
router.get('/landing-messages', requireAuth, validateQuery(landingMessagesQuerySchema), requireCollectionOperationAuthorization(), getLandingMessagesForView);
router.get('/landing-messages/manage', requireAuth, requireCollectionOperationAuthorization(), getManagedLandingMessagesView);
router.post('/landing-messages', requireAuth, validateBody(landingMessageBodySchema), requireCollectionOperationAuthorization(), postLandingMessage);
router.patch('/landing-messages/:messageId', requireAuth, validateParams(messageIdParamSchema), validateBody(landingMessagePatchBodySchema), requireCollectionOperationAuthorization(), patchLandingMessageById);
router.get('/tasks', requireAuth, requireCollectionOperationAuthorization(), getTasks);
router.get('/to-do', requireAuth, requireCollectionOperationAuthorization(), getToDo);
router.get('/people', requireAuth, requireCollectionOperationAuthorization(), getPeople);
router.get('/notifications', requireAuth, requireCollectionOperationAuthorization(), getNotifications);
router.get('/cases/:caseId/external-invites', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('external_invites_read'), getExternalInvitesForCase);
router.get('/cases/:caseId/supervisor-profiles', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('supervisor_profiles_read'), getSupervisorProfiles);
router.patch('/supervisor-profiles/:profileId', requireAuth, validateParams(profileIdParamSchema), validateBody(patchPayloadBodySchema), requireProfileOperationAuthorization('profile_edit'), patchSupervisorProfile);
router.post('/supervisor-profiles/:profileId/submit', requireAuth, validateParams(profileIdParamSchema), requireProfileOperationAuthorization('profile_submit'), postSubmitSupervisorProfile);
router.post('/supervisor-profiles/:profileId/upload-cv', requireAuth, validateParams(profileIdParamSchema), validateBody(profileCvUploadBodySchema), requireProfileOperationAuthorization('profile_upload_cv'), postUploadSupervisorProfileCv);
router.post('/cases/:caseId/supervisor-profiles/request', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('supervisor_profiles_request'), postRequestSupervisorProfiles);
router.post('/cases/:caseId/supervisor-profiles/reminder', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('supervisor_profiles_reminder'), postSupervisorProfilesReminder);
router.get('/cases/:caseId/mou', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('mou_read'), getMou);
router.patch('/cases/:caseId/mou', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('mou_edit'), patchMou);
router.post('/cases/:caseId/mou/complete', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('mou_complete'), markMouCompleted);
router.post('/cases/:caseId/mou/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('mou_print'), printMou);
router.get('/cases/:caseId/intention-to-submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getIntentionToSubmit);
router.patch('/cases/:caseId/intention-to-submit', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchIntentionToSubmit);
router.post('/cases/:caseId/intention-to-submit/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitIntentionToSubmit);
router.post('/cases/:caseId/intention-to-submit/supervisor-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_supervisor'), postItsSupervisorReview);
router.post('/cases/:caseId/intention-to-submit/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postItsDeptReview);
router.post('/cases/:caseId/intention-to-submit/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintIntentionToSubmit);
router.get('/cases/:caseId/appoint-examiners', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getAppointExaminers);
router.patch('/cases/:caseId/appoint-examiners', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), patchAppointExaminers);
router.post('/cases/:caseId/appoint-examiners/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), postSubmitAppointExaminers);
router.post('/cases/:caseId/appoint-examiners/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postAppointExaminersDeptReview);
router.post('/cases/:caseId/appoint-examiners/chairperson-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_chairperson'), postAppointExaminersChairReview);
router.post('/cases/:caseId/appoint-examiners/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postAppointExaminersFacultyReview);
router.post('/cases/:caseId/appoint-examiners/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintAppointExaminers);
router.get('/cases/:caseId/change-examiners', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getChangeExaminers);
router.patch('/cases/:caseId/change-examiners', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), patchChangeExaminers);
router.post('/cases/:caseId/change-examiners/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), postSubmitChangeExaminers);
router.post('/cases/:caseId/change-examiners/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postChangeExaminersDeptReview);
router.post('/cases/:caseId/change-examiners/chairperson-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_chairperson'), postChangeExaminersChairReview);
router.post('/cases/:caseId/change-examiners/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postChangeExaminersFacultyReview);
router.post('/cases/:caseId/change-examiners/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintChangeExaminers);
router.get('/cases/:caseId/examiner-summary-cv', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getExaminerSummaryCv);
router.patch('/cases/:caseId/examiner-summary-cv', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), patchExaminerSummaryCv);
router.post('/cases/:caseId/examiner-summary-cv/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), postSubmitExaminerSummaryCv);
router.post('/cases/:caseId/examiner-summary-cv/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postExaminerSummaryCvDeptReview);
router.post('/cases/:caseId/examiner-summary-cv/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postExaminerSummaryCvFacultyReview);
router.post('/cases/:caseId/examiner-summary-cv/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintExaminerSummaryCv);
router.get('/cases/:caseId/appoint-arbiter', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getAppointArbiter);
router.patch('/cases/:caseId/appoint-arbiter', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), patchAppointArbiter);
router.post('/cases/:caseId/appoint-arbiter/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), postSubmitAppointArbiter);
router.post('/cases/:caseId/appoint-arbiter/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postAppointArbiterDeptReview);
router.post('/cases/:caseId/appoint-arbiter/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postAppointArbiterFacultyReview);
router.post('/cases/:caseId/appoint-arbiter/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintAppointArbiter);
router.get('/cases/:caseId/change-title', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getChangeTitle);
router.patch('/cases/:caseId/change-title', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchChangeTitle);
router.post('/cases/:caseId/change-title/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitChangeTitle);
router.post('/cases/:caseId/change-title/supervisor-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_supervisor'), postChangeTitleSupervisorReview);
router.post('/cases/:caseId/change-title/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postChangeTitleDeptReview);
router.post('/cases/:caseId/change-title/chairperson-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_chairperson'), postChangeTitleChairReview);
router.post('/cases/:caseId/change-title/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postChangeTitleFacultyReview);
router.post('/cases/:caseId/change-title/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintChangeTitle);
router.get('/cases/:caseId/change-supervisor', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getChangeSupervisor);
router.patch('/cases/:caseId/change-supervisor', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchChangeSupervisor);
router.post('/cases/:caseId/change-supervisor/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitChangeSupervisor);
router.post('/cases/:caseId/change-supervisor/supervisor-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_supervisor'), postChangeSupervisorSupervisorReview);
router.post('/cases/:caseId/change-supervisor/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postChangeSupervisorDeptReview);
router.post('/cases/:caseId/change-supervisor/chairperson-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_chairperson'), postChangeSupervisorChairReview);
router.post('/cases/:caseId/change-supervisor/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postChangeSupervisorFacultyReview);
router.post('/cases/:caseId/change-supervisor/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintChangeSupervisor);
router.get('/cases/:caseId/add-co-supervisor', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getAddCoSupervisor);
router.patch('/cases/:caseId/add-co-supervisor', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchAddCoSupervisor);
router.post('/cases/:caseId/add-co-supervisor/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitAddCoSupervisor);
router.post('/cases/:caseId/add-co-supervisor/supervisor-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_supervisor'), postAddCoSupervisorSupervisorReview);
router.post('/cases/:caseId/add-co-supervisor/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postAddCoSupervisorDeptReview);
router.post('/cases/:caseId/add-co-supervisor/chairperson-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_chairperson'), postAddCoSupervisorChairReview);
router.post('/cases/:caseId/add-co-supervisor/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postAddCoSupervisorFacultyReview);
router.post('/cases/:caseId/add-co-supervisor/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintAddCoSupervisor);
router.get('/cases/:caseId/progress-report', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getProgressReportModule);
router.patch('/cases/:caseId/progress-report', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchProgressReportModule);
router.post('/cases/:caseId/progress-report/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitProgressReport);
router.post('/cases/:caseId/progress-report/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postProgressReportDeptReview);
router.post('/cases/:caseId/progress-report/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postProgressReportFacultyReview);
router.post('/cases/:caseId/progress-report/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintProgressReport);
router.get('/cases/:caseId/leave-of-absence', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getLeaveOfAbsenceModule);
router.patch('/cases/:caseId/leave-of-absence', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchLeaveOfAbsenceModule);
router.post('/cases/:caseId/leave-of-absence/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitLeaveOfAbsence);
router.post('/cases/:caseId/leave-of-absence/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postLeaveOfAbsenceDeptReview);
router.post('/cases/:caseId/leave-of-absence/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postLeaveOfAbsenceFacultyReview);
router.post('/cases/:caseId/leave-of-absence/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintLeaveOfAbsence);
router.get('/cases/:caseId/readmission-request', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getReadmissionRequestModule);
router.patch('/cases/:caseId/readmission-request', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchReadmissionRequestModule);
router.post('/cases/:caseId/readmission-request/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitReadmissionRequest);
router.post('/cases/:caseId/readmission-request/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postReadmissionRequestDeptReview);
router.post('/cases/:caseId/readmission-request/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postReadmissionRequestFacultyReview);
router.post('/cases/:caseId/readmission-request/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintReadmissionRequest);
router.get('/cases/:caseId/upgrade-msc-to-phd', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getUpgradeMscToPhdModule);
router.patch('/cases/:caseId/upgrade-msc-to-phd', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchUpgradeMscToPhdModule);
router.post('/cases/:caseId/upgrade-msc-to-phd/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitUpgradeMscToPhd);
router.post('/cases/:caseId/upgrade-msc-to-phd/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postUpgradeMscToPhdDeptReview);
router.post('/cases/:caseId/upgrade-msc-to-phd/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postUpgradeMscToPhdFacultyReview);
router.post('/cases/:caseId/upgrade-msc-to-phd/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintUpgradeMscToPhd);
router.get('/cases/:caseId/supervisor-summative-report', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getSupervisorSummativeReportModule);
router.patch('/cases/:caseId/supervisor-summative-report', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), patchSupervisorSummativeReportModule);
router.post('/cases/:caseId/supervisor-summative-report/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_supervisor_edit_submit'), postSubmitSupervisorSummativeReport);
router.post('/cases/:caseId/supervisor-summative-report/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postSupervisorSummativeReportDeptReview);
router.post('/cases/:caseId/supervisor-summative-report/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postSupervisorSummativeReportFacultyReview);
router.post('/cases/:caseId/supervisor-summative-report/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintSupervisorSummativeReport);
router.get('/cases/:caseId/other-request', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('case_read'), getOtherRequestModule);
router.patch('/cases/:caseId/other-request', requireAuth, validateParams(caseIdParamSchema), validateBody(patchPayloadBodySchema), requireCaseOperationAuthorization('module_student_edit_submit'), patchOtherRequestModule);
router.post('/cases/:caseId/other-request/submit', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_student_edit_submit'), postSubmitOtherRequest);
router.post('/cases/:caseId/other-request/dept-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_dept'), postOtherRequestDeptReview);
router.post('/cases/:caseId/other-request/faculty-review', requireAuth, validateParams(caseIdParamSchema), validateBody(moduleReviewDecisionBodySchema), requireCaseOperationAuthorization('module_review_faculty'), postOtherRequestFacultyReview);
router.post('/cases/:caseId/other-request/print', requireAuth, validateParams(caseIdParamSchema), requireCaseOperationAuthorization('module_print'), postPrintOtherRequest);

export default router;

import express from 'express';
import {
  checkSasiAndCreateCase,
  getCase,
  getMou,
  getIntentionToSubmit,
  getNotifications,
  getExternalInvitesForCase,
  getPeople,
  getPipeline,
  getAppointExaminers,
  getAppointArbiter,
  getChangeExaminers,
  getExaminerSummaryCv,
  getSupervisorProfiles,
  getTasks,
  getToDo,
  markStudentVetted,
  patchForm,
  patchIntentionToSubmit,
  patchMou,
  patchAppointExaminers,
  patchAppointArbiter,
  patchChangeExaminers,
  patchExaminerSummaryCv,
  patchSupervisorProfile,
  postSubmitIntentionToSubmit,
  postSubmitAppointExaminers,
  postSubmitAppointArbiter,
  postSubmitChangeExaminers,
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
} from '../../../controllers/titleRegistrationWorkflowController';
import { requireAuth } from '../../../middleware/auth';
import { requireTransitionAuthorization } from '../../../middleware/transitionAuthorization';
import {
  requireCaseOperationAuthorization,
  requireCollectionOperationAuthorization,
  requireProfileOperationAuthorization,
} from '../../../middleware/workflowAuthorization';

const router = express.Router();

router.get('/sasi/:studentNumber/check', checkSasiAndCreateCase);
router.get('/cases/:caseId', requireAuth, requireCaseOperationAuthorization('case_read'), getCase);
router.patch('/cases/:caseId/form', requireAuth, requireCaseOperationAuthorization('form_edit'), patchForm);
router.post('/cases/:caseId/print', requireAuth, requireCaseOperationAuthorization('print'), printPdf);
router.post('/cases/:caseId/student-vet', requireAuth, requireTransitionAuthorization('student_vet'), markStudentVetted);
router.post('/cases/:caseId/supervisor-review', requireAuth, requireTransitionAuthorization('supervisor_review'), reviewSupervisor);
router.post('/cases/:caseId/dept-review', requireAuth, requireTransitionAuthorization('dept_review'), reviewDept);
router.post('/cases/:caseId/chairperson-sign', requireAuth, requireTransitionAuthorization('chairperson_sign'), signChairperson);
router.post('/cases/:caseId/dept-send-faculty', requireAuth, requireTransitionAuthorization('dept_send_faculty'), sendToFacultyByDept);
router.post('/cases/:caseId/faculty-review', requireAuth, requireTransitionAuthorization('faculty_review'), reviewFaculty);
router.post('/cases/:caseId/reminder', requireAuth, requireTransitionAuthorization('reminder'), triggerFacultyReminder);
router.get('/pipeline', requireAuth, requireCollectionOperationAuthorization(), getPipeline);
router.get('/tasks', requireAuth, requireCollectionOperationAuthorization(), getTasks);
router.get('/to-do', requireAuth, requireCollectionOperationAuthorization(), getToDo);
router.get('/people', requireAuth, requireCollectionOperationAuthorization(), getPeople);
router.get('/notifications', requireAuth, requireCollectionOperationAuthorization(), getNotifications);
router.get('/cases/:caseId/external-invites', requireAuth, requireCaseOperationAuthorization('external_invites_read'), getExternalInvitesForCase);
router.get('/cases/:caseId/supervisor-profiles', requireAuth, requireCaseOperationAuthorization('supervisor_profiles_read'), getSupervisorProfiles);
router.patch('/supervisor-profiles/:profileId', requireAuth, requireProfileOperationAuthorization('profile_edit'), patchSupervisorProfile);
router.post('/supervisor-profiles/:profileId/submit', requireAuth, requireProfileOperationAuthorization('profile_submit'), postSubmitSupervisorProfile);
router.post('/supervisor-profiles/:profileId/upload-cv', requireAuth, requireProfileOperationAuthorization('profile_upload_cv'), postUploadSupervisorProfileCv);
router.post('/cases/:caseId/supervisor-profiles/request', requireAuth, requireCaseOperationAuthorization('supervisor_profiles_request'), postRequestSupervisorProfiles);
router.post('/cases/:caseId/supervisor-profiles/reminder', requireAuth, requireCaseOperationAuthorization('supervisor_profiles_reminder'), postSupervisorProfilesReminder);
router.get('/cases/:caseId/mou', requireAuth, requireCaseOperationAuthorization('mou_read'), getMou);
router.patch('/cases/:caseId/mou', requireAuth, requireCaseOperationAuthorization('mou_edit'), patchMou);
router.post('/cases/:caseId/mou/complete', requireAuth, requireCaseOperationAuthorization('mou_complete'), markMouCompleted);
router.post('/cases/:caseId/mou/print', requireAuth, requireCaseOperationAuthorization('mou_print'), printMou);
router.get('/cases/:caseId/intention-to-submit', requireAuth, requireCaseOperationAuthorization('case_read'), getIntentionToSubmit);
router.patch('/cases/:caseId/intention-to-submit', requireAuth, requireCaseOperationAuthorization('form_edit'), patchIntentionToSubmit);
router.post('/cases/:caseId/intention-to-submit/submit', requireAuth, requireCaseOperationAuthorization('form_edit'), postSubmitIntentionToSubmit);
router.get('/cases/:caseId/appoint-examiners', requireAuth, requireCaseOperationAuthorization('case_read'), getAppointExaminers);
router.patch('/cases/:caseId/appoint-examiners', requireAuth, requireCaseOperationAuthorization('form_edit'), patchAppointExaminers);
router.post('/cases/:caseId/appoint-examiners/submit', requireAuth, requireCaseOperationAuthorization('form_edit'), postSubmitAppointExaminers);
router.get('/cases/:caseId/change-examiners', requireAuth, requireCaseOperationAuthorization('case_read'), getChangeExaminers);
router.patch('/cases/:caseId/change-examiners', requireAuth, requireCaseOperationAuthorization('form_edit'), patchChangeExaminers);
router.post('/cases/:caseId/change-examiners/submit', requireAuth, requireCaseOperationAuthorization('form_edit'), postSubmitChangeExaminers);
router.get('/cases/:caseId/examiner-summary-cv', requireAuth, requireCaseOperationAuthorization('case_read'), getExaminerSummaryCv);
router.patch('/cases/:caseId/examiner-summary-cv', requireAuth, requireCaseOperationAuthorization('form_edit'), patchExaminerSummaryCv);
router.post('/cases/:caseId/examiner-summary-cv/submit', requireAuth, requireCaseOperationAuthorization('form_edit'), postSubmitExaminerSummaryCv);
router.get('/cases/:caseId/appoint-arbiter', requireAuth, requireCaseOperationAuthorization('case_read'), getAppointArbiter);
router.patch('/cases/:caseId/appoint-arbiter', requireAuth, requireCaseOperationAuthorization('form_edit'), patchAppointArbiter);
router.post('/cases/:caseId/appoint-arbiter/submit', requireAuth, requireCaseOperationAuthorization('form_edit'), postSubmitAppointArbiter);

export default router;

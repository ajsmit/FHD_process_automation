import { Request, Response } from 'express';
import {
  chairpersonSign,
  checkAndPrefill,
  completeMou,
  deptSendToFaculty,
  deptReview,
  facultyReview,
  generateMouPdf,
  generatePdf,
  getCaseById,
  getOrCreateMou,
  listNotifications,
  listExternalInvitesForCase,
  listPeople,
  listPipeline,
  listSupervisorProfiles,
  listTasks,
  listToDoItems,
  requestSupervisorProfiles,
  sendSupervisorProfilesReminder,
  sendFacultyReminderIfDue,
  studentVet,
  submitSupervisorProfile,
  supervisorReview,
  uploadSupervisorProfileCv,
  updateMou,
  updateSupervisorProfile,
  updateForm,
} from '../services/titleRegistrationWorkflowService';
import {
  getOrCreateAppointArbiter,
  getOrCreateAppointExaminers,
  getOrCreateChangeExaminers,
  getOrCreateExaminerSummaryCv,
  getOrCreateIntentionToSubmit,
  printAppointArbiter,
  printAppointExaminers,
  printChangeExaminers,
  printExaminerSummaryCv,
  printIntentionToSubmit,
  reviewAppointArbiterByDept,
  reviewAppointArbiterByFaculty,
  reviewAppointExaminersByChairperson,
  reviewAppointExaminersByDept,
  reviewAppointExaminersByFaculty,
  reviewChangeExaminersByChairperson,
  reviewChangeExaminersByDept,
  reviewChangeExaminersByFaculty,
  reviewExaminerSummaryCvByDept,
  reviewExaminerSummaryCvByFaculty,
  reviewIntentionToSubmitByDept,
  reviewIntentionToSubmitBySupervisor,
  type ModuleReviewDecision,
  submitAppointArbiter,
  submitAppointExaminers,
  submitChangeExaminers,
  submitExaminerSummaryCv,
  submitIntentionToSubmit,
  updateAppointArbiter,
  updateAppointExaminers,
  updateChangeExaminers,
  updateExaminerSummaryCv,
  updateIntentionToSubmit,
} from '../services/workflow/nextWaveModulesService';
import {
  getOrCreateAddCoSupervisor,
  getOrCreateChangeSupervisor,
  getOrCreateChangeTitle,
  printAddCoSupervisor,
  printChangeSupervisor,
  printChangeTitle,
  reviewAddCoSupervisorByChair,
  reviewAddCoSupervisorByDept,
  reviewAddCoSupervisorByFaculty,
  reviewAddCoSupervisorBySupervisor,
  reviewChangeSupervisorByChair,
  reviewChangeSupervisorByDept,
  reviewChangeSupervisorByFaculty,
  reviewChangeSupervisorBySupervisor,
  reviewChangeTitleByChair,
  reviewChangeTitleByDept,
  reviewChangeTitleByFaculty,
  reviewChangeTitleBySupervisor,
  submitAddCoSupervisor,
  submitChangeSupervisor,
  submitChangeTitle,
  updateAddCoSupervisor,
  updateChangeSupervisor,
  updateChangeTitle,
} from '../services/workflow/changeRequestModulesService';
import type { FormData, MouFormData, ReviewDecision } from '../services/contracts/titleRegistration';
import { toAppError } from '../errors/httpErrors';

function parseCaseId(value: string): number {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) {
    throw new Error('Invalid case id');
  }
  return parsed;
}

function parseDecision(input: unknown): ReviewDecision {
  if (input === 'vetted' || input === 'insufficient') {
    return input;
  }
  throw new Error('Decision must be "vetted" or "insufficient"');
}

function parseModuleDecision(input: unknown): ModuleReviewDecision {
  if (input === 'approved' || input === 'returned') {
    return input;
  }
  throw new Error('Decision must be "approved" or "returned"');
}

function requireActor(req: Request): NonNullable<Request['authUser']> {
  if (!req.authUser) {
    throw new Error('Authentication required.');
  }
  return req.authUser;
}

function handleControllerError(
  res: Response,
  error: unknown,
  fallback: { statusCode: number; code: string; message: string },
): void {
  const appError = toAppError(error, fallback);
  const message = appError.exposeMessage ? appError.message : fallback.message;
  res.status(appError.statusCode).json({ message, code: appError.code, details: appError.details });
}

export async function checkSasiAndCreateCase(req: Request, res: Response): Promise<void> {
  try {
    const studentNumber = typeof req.params.studentNumber === 'string' ? req.params.studentNumber : '';
    const result = await checkAndPrefill(studentNumber);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to check SASI and prefill' });
  }
}

export async function getCase(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getCaseById(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 404, code: 'workflow_controller_error', message: 'Case not found' });
  }
}

export async function patchForm(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const formPatch = req.body as Partial<FormData>;
    const result = await updateForm(caseId, formPatch);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update form' });
  }
}

export async function printPdf(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await generatePdf(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate PDF' });
  }
}

export async function markStudentVetted(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await studentVet(caseId);
    res.status(200).json({ case: result });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to mark student vetted' });
  }
}

export async function reviewSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const decision = parseDecision(req.body?.decision);
    const comments = typeof req.body?.comments === 'string' ? req.body.comments : undefined;
    const result = await supervisorReview(caseId, decision, comments);
    res.status(200).json({ case: result });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed supervisor review' });
  }
}

export async function reviewDept(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const decision = parseDecision(req.body?.decision);
    const comments = typeof req.body?.comments === 'string' ? req.body.comments : undefined;
    const result = await deptReview(caseId, decision, comments);
    res.status(200).json({ case: result });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed dept review' });
  }
}

export async function signChairperson(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const comments = typeof req.body?.comments === 'string' ? req.body.comments : undefined;
    const result = await chairpersonSign(caseId, comments);
    res.status(200).json({ case: result });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed chairperson signature' });
  }
}

export async function sendToFacultyByDept(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await deptSendToFaculty(caseId);
    res.status(200).json({ case: result });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Dept send to Faculty' });
  }
}

export async function reviewFaculty(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const decision = parseDecision(req.body?.decision);
    const comments = typeof req.body?.comments === 'string' ? req.body.comments : undefined;
    const result = await facultyReview(caseId, decision, comments);
    res.status(200).json({ case: result });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed faculty review' });
  }
}

export async function triggerFacultyReminder(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await sendFacultyReminderIfDue(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to send reminder' });
  }
}

export async function getPipeline(req: Request, res: Response): Promise<void> {
  try {
    const items = await listPipeline();
    res.status(200).json({ data: items });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load pipeline' });
  }
}

export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const items = await listTasks();
    res.status(200).json({ data: items });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load tasks' });
  }
}

export async function getToDo(req: Request, res: Response): Promise<void> {
  try {
    const items = await listToDoItems();
    res.status(200).json({ data: items });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load to-do items' });
  }
}

export async function getPeople(req: Request, res: Response): Promise<void> {
  try {
    const people = await listPeople();
    res.status(200).json({ data: people });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load people' });
  }
}

export async function getNotifications(req: Request, res: Response): Promise<void> {
  try {
    const caseId = typeof req.query.caseId === 'string' ? Number.parseInt(req.query.caseId, 10) : undefined;
    const notifications = await listNotifications(caseId);
    res.status(200).json({ data: notifications });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load notifications' });
  }
}

export async function getExternalInvitesForCase(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const data = await listExternalInvitesForCase(caseId);
    res.status(200).json({ data });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load external invite statuses' });
  }
}

export async function getSupervisorProfiles(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const data = await listSupervisorProfiles(caseId);
    res.status(200).json({ data });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'workflow_controller_error', message: 'Failed to load supervisor profiles' });
  }
}

export async function patchSupervisorProfile(req: Request, res: Response): Promise<void> {
  try {
    const profileId = parseCaseId(req.params.profileId);
    const profile = await updateSupervisorProfile(profileId, req.body ?? {});
    res.status(200).json({ profile });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update supervisor profile' });
  }
}

export async function postSubmitSupervisorProfile(req: Request, res: Response): Promise<void> {
  try {
    const profileId = parseCaseId(req.params.profileId);
    const profile = await submitSupervisorProfile(profileId);
    res.status(200).json({ profile });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit supervisor profile' });
  }
}

export async function postRequestSupervisorProfiles(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await requestSupervisorProfiles(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to request supervisor profile completion' });
  }
}

export async function postSupervisorProfilesReminder(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await sendSupervisorProfilesReminder(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to send supervisor profile reminder' });
  }
}

export async function postUploadSupervisorProfileCv(req: Request, res: Response): Promise<void> {
  try {
    const profileId = parseCaseId(req.params.profileId);
    const fileName = typeof req.body?.fileName === 'string' ? req.body.fileName : '';
    const contentBase64 = typeof req.body?.contentBase64 === 'string' ? req.body.contentBase64 : '';
    const profile = await uploadSupervisorProfileCv(profileId, fileName, contentBase64);
    res.status(200).json({ profile });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed CV upload' });
  }
}

export async function getMou(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateMou(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load MOU' });
  }
}

export async function patchMou(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const patch = req.body as Partial<MouFormData>;
    const result = await updateMou(caseId, patch);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update MOU' });
  }
}

export async function markMouCompleted(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await completeMou(caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to complete MOU' });
  }
}

export async function printMou(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await generateMouPdf(caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate MOU PDF' });
  }
}

export async function getIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateIntentionToSubmit(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Intention to Submit' });
  }
}

export async function patchIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateIntentionToSubmit(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Intention to Submit' });
  }
}

export async function postSubmitIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitIntentionToSubmit(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Intention to Submit' });
  }
}

export async function postItsSupervisorReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewIntentionToSubmitBySupervisor(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed ITS supervisor review' });
  }
}

export async function postItsDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewIntentionToSubmitByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed ITS department review' });
  }
}

export async function postPrintIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printIntentionToSubmit(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate ITS PDF' });
  }
}

export async function getAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateAppointExaminers(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Appoint Examiners' });
  }
}

export async function patchAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateAppointExaminers(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Appoint Examiners' });
  }
}

export async function postSubmitAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitAppointExaminers(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Appoint Examiners' });
  }
}

export async function postAppointExaminersDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAppointExaminersByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed APPOINT_EXAMINERS department review' });
  }
}

export async function postAppointExaminersChairReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAppointExaminersByChairperson(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed APPOINT_EXAMINERS chair review' });
  }
}

export async function postAppointExaminersFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAppointExaminersByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed APPOINT_EXAMINERS faculty review' });
  }
}

export async function postPrintAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printAppointExaminers(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate APPOINT_EXAMINERS PDF' });
  }
}

export async function getChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateChangeExaminers(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Change Examiners' });
  }
}

export async function patchChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateChangeExaminers(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Change Examiners' });
  }
}

export async function postSubmitChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitChangeExaminers(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Change Examiners' });
  }
}

export async function postChangeExaminersDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeExaminersByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed CHANGE_EXAMINERS department review' });
  }
}

export async function postChangeExaminersChairReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeExaminersByChairperson(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed CHANGE_EXAMINERS chair review' });
  }
}

export async function postChangeExaminersFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeExaminersByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed CHANGE_EXAMINERS faculty review' });
  }
}

export async function postPrintChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printChangeExaminers(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate CHANGE_EXAMINERS PDF' });
  }
}

export async function getExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateExaminerSummaryCv(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Examiner Summary CV' });
  }
}

export async function patchExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateExaminerSummaryCv(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Examiner Summary CV' });
  }
}

export async function postSubmitExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitExaminerSummaryCv(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Examiner Summary CV' });
  }
}

export async function postExaminerSummaryCvDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewExaminerSummaryCvByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed EXAMINER_SUMMARY_CV department review' });
  }
}

export async function postExaminerSummaryCvFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewExaminerSummaryCvByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed EXAMINER_SUMMARY_CV faculty review' });
  }
}

export async function postPrintExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printExaminerSummaryCv(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate EXAMINER_SUMMARY_CV PDF' });
  }
}

export async function getAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateAppointArbiter(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Appoint Arbiter' });
  }
}

export async function patchAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateAppointArbiter(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Appoint Arbiter' });
  }
}

export async function postSubmitAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitAppointArbiter(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Appoint Arbiter' });
  }
}

export async function postAppointArbiterDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAppointArbiterByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed APPOINT_ARBITER department review' });
  }
}

export async function postAppointArbiterFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAppointArbiterByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed APPOINT_ARBITER faculty review' });
  }
}

export async function postPrintAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printAppointArbiter(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate APPOINT_ARBITER PDF' });
  }
}

export async function getChangeTitle(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateChangeTitle(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Change Title' });
  }
}

export async function patchChangeTitle(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateChangeTitle(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Change Title' });
  }
}

export async function postSubmitChangeTitle(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitChangeTitle(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Change Title' });
  }
}

export async function postChangeTitleSupervisorReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeTitleBySupervisor(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Title supervisor review' });
  }
}

export async function postChangeTitleDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeTitleByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Title department review' });
  }
}

export async function postChangeTitleChairReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeTitleByChair(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Title chair review' });
  }
}

export async function postChangeTitleFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeTitleByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Title faculty review' });
  }
}

export async function postPrintChangeTitle(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printChangeTitle(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate Change Title PDF' });
  }
}

export async function getChangeSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateChangeSupervisor(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Change Supervisor' });
  }
}

export async function patchChangeSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateChangeSupervisor(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Change Supervisor' });
  }
}

export async function postSubmitChangeSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitChangeSupervisor(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Change Supervisor' });
  }
}

export async function postChangeSupervisorSupervisorReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeSupervisorBySupervisor(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Supervisor supervisor review' });
  }
}

export async function postChangeSupervisorDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeSupervisorByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Supervisor department review' });
  }
}

export async function postChangeSupervisorChairReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeSupervisorByChair(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Supervisor chair review' });
  }
}

export async function postChangeSupervisorFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewChangeSupervisorByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Change Supervisor faculty review' });
  }
}

export async function postPrintChangeSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printChangeSupervisor(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate Change Supervisor PDF' });
  }
}

export async function getAddCoSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateAddCoSupervisor(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to load Add Co-supervisor' });
  }
}

export async function patchAddCoSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateAddCoSupervisor(actor, caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to update Add Co-supervisor' });
  }
}

export async function postSubmitAddCoSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitAddCoSupervisor(actor, caseId);
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to submit Add Co-supervisor' });
  }
}

export async function postAddCoSupervisorSupervisorReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAddCoSupervisorBySupervisor(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Add Co-supervisor supervisor review' });
  }
}

export async function postAddCoSupervisorDeptReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAddCoSupervisorByDept(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Add Co-supervisor department review' });
  }
}

export async function postAddCoSupervisorChairReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAddCoSupervisorByChair(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Add Co-supervisor chair review' });
  }
}

export async function postAddCoSupervisorFacultyReview(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const record = await reviewAddCoSupervisorByFaculty(actor, caseId, parseModuleDecision(req.body?.decision));
    res.status(200).json({ record });
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed Add Co-supervisor faculty review' });
  }
}

export async function postPrintAddCoSupervisor(req: Request, res: Response): Promise<void> {
  try {
    const actor = requireActor(req);
    const caseId = parseCaseId(req.params.caseId);
    const result = await printAddCoSupervisor(actor, caseId);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'workflow_controller_error', message: 'Failed to generate Add Co-supervisor PDF' });
  }
}

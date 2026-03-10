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
import type { FormData, MouFormData, ReviewDecision } from '../services/contracts/titleRegistration';

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

export async function checkSasiAndCreateCase(req: Request, res: Response): Promise<void> {
  try {
    const studentNumber = typeof req.params.studentNumber === 'string' ? req.params.studentNumber : '';
    const result = await checkAndPrefill(studentNumber);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to check SASI and prefill', error: error instanceof Error ? error.message : error });
  }
}

export async function getCase(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getCaseById(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : 'Case not found' });
  }
}

export async function patchForm(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const formPatch = req.body as Partial<FormData>;
    const result = await updateForm(caseId, formPatch);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update form' });
  }
}

export async function printPdf(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await generatePdf(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to generate PDF' });
  }
}

export async function markStudentVetted(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await studentVet(caseId);
    res.status(200).json({ case: result });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to mark student vetted' });
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
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed supervisor review' });
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
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed dept review' });
  }
}

export async function signChairperson(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const comments = typeof req.body?.comments === 'string' ? req.body.comments : undefined;
    const result = await chairpersonSign(caseId, comments);
    res.status(200).json({ case: result });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed chairperson signature' });
  }
}

export async function sendToFacultyByDept(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await deptSendToFaculty(caseId);
    res.status(200).json({ case: result });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed Dept send to Faculty' });
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
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed faculty review' });
  }
}

export async function triggerFacultyReminder(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await sendFacultyReminderIfDue(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send reminder' });
  }
}

export async function getPipeline(req: Request, res: Response): Promise<void> {
  try {
    const items = await listPipeline();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load pipeline', error: error instanceof Error ? error.message : error });
  }
}

export async function getTasks(req: Request, res: Response): Promise<void> {
  try {
    const items = await listTasks();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load tasks', error: error instanceof Error ? error.message : error });
  }
}

export async function getToDo(req: Request, res: Response): Promise<void> {
  try {
    const items = await listToDoItems();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load to-do items', error: error instanceof Error ? error.message : error });
  }
}

export async function getPeople(req: Request, res: Response): Promise<void> {
  try {
    const people = await listPeople();
    res.status(200).json({ data: people });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load people', error: error instanceof Error ? error.message : error });
  }
}

export async function getNotifications(req: Request, res: Response): Promise<void> {
  try {
    const caseId = typeof req.query.caseId === 'string' ? Number.parseInt(req.query.caseId, 10) : undefined;
    const notifications = await listNotifications(caseId);
    res.status(200).json({ data: notifications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load notifications', error: error instanceof Error ? error.message : error });
  }
}

export async function getExternalInvitesForCase(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const data = await listExternalInvitesForCase(caseId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load external invite statuses', error: error instanceof Error ? error.message : error });
  }
}

export async function getSupervisorProfiles(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const data = await listSupervisorProfiles(caseId);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load supervisor profiles', error: error instanceof Error ? error.message : error });
  }
}

export async function patchSupervisorProfile(req: Request, res: Response): Promise<void> {
  try {
    const profileId = parseCaseId(req.params.profileId);
    const profile = await updateSupervisorProfile(profileId, req.body ?? {});
    res.status(200).json({ profile });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update supervisor profile' });
  }
}

export async function postSubmitSupervisorProfile(req: Request, res: Response): Promise<void> {
  try {
    const profileId = parseCaseId(req.params.profileId);
    const profile = await submitSupervisorProfile(profileId);
    res.status(200).json({ profile });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit supervisor profile' });
  }
}

export async function postRequestSupervisorProfiles(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await requestSupervisorProfiles(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to request supervisor profile completion' });
  }
}

export async function postSupervisorProfilesReminder(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await sendSupervisorProfilesReminder(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to send supervisor profile reminder' });
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
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed CV upload' });
  }
}

export async function getMou(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateMou(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load MOU' });
  }
}

export async function patchMou(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const patch = req.body as Partial<MouFormData>;
    const result = await updateMou(caseId, patch);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update MOU' });
  }
}

export async function markMouCompleted(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await completeMou(caseId);
    res.status(200).json({ record });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to complete MOU' });
  }
}

export async function printMou(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await generateMouPdf(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to generate MOU PDF' });
  }
}

export async function getIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateIntentionToSubmit(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Intention to Submit' });
  }
}

export async function patchIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateIntentionToSubmit(caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Intention to Submit' });
  }
}

export async function postSubmitIntentionToSubmit(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitIntentionToSubmit(caseId);
    res.status(200).json({ record });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Intention to Submit' });
  }
}

export async function getAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateAppointExaminers(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Appoint Examiners' });
  }
}

export async function patchAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateAppointExaminers(caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Appoint Examiners' });
  }
}

export async function postSubmitAppointExaminers(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitAppointExaminers(caseId);
    res.status(200).json({ record });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Appoint Examiners' });
  }
}

export async function getChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateChangeExaminers(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Change Examiners' });
  }
}

export async function patchChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateChangeExaminers(caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Change Examiners' });
  }
}

export async function postSubmitChangeExaminers(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitChangeExaminers(caseId);
    res.status(200).json({ record });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Change Examiners' });
  }
}

export async function getExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateExaminerSummaryCv(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Examiner Summary CV' });
  }
}

export async function patchExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateExaminerSummaryCv(caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Examiner Summary CV' });
  }
}

export async function postSubmitExaminerSummaryCv(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitExaminerSummaryCv(caseId);
    res.status(200).json({ record });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Examiner Summary CV' });
  }
}

export async function getAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await getOrCreateAppointArbiter(caseId);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to load Appoint Arbiter' });
  }
}

export async function patchAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const result = await updateAppointArbiter(caseId, req.body ?? {});
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to update Appoint Arbiter' });
  }
}

export async function postSubmitAppointArbiter(req: Request, res: Response): Promise<void> {
  try {
    const caseId = parseCaseId(req.params.caseId);
    const record = await submitAppointArbiter(caseId);
    res.status(200).json({ record });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to submit Appoint Arbiter' });
  }
}

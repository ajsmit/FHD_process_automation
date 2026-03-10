import type {
  FormData,
  MouFormData,
  MouFormRecord,
  ReviewDecision,
  SupervisorProfileForm,
  TitleRegistrationCase,
} from './contracts/titleRegistration';
import type { SasiStudent } from './sasiService';
import {
  checkStudentEligibility as checkStudentEligibilityCore,
  checkAndPrefill as checkAndPrefillCore,
  getCaseById as getCaseByIdCore,
  updateForm as updateFormCore,
  generatePdf as generatePdfCore,
  studentVet as studentVetCore,
  supervisorReview as supervisorReviewCore,
  deptReview as deptReviewCore,
  chairpersonSign as chairpersonSignCore,
  deptSendToFaculty as deptSendToFacultyCore,
  facultyReview as facultyReviewCore,
  sendFacultyReminderIfDue as sendFacultyReminderIfDueCore,
} from './rottCaseService';
import {
  completeMou as completeMouCore,
  generateMouPdf as generateMouPdfCore,
  getOrCreateMou as getOrCreateMouCore,
  updateMou as updateMouCore,
} from './mouService';
import {
  listSupervisorProfiles as listSupervisorProfilesCore,
  updateSupervisorProfile as updateSupervisorProfileCore,
  submitSupervisorProfile as submitSupervisorProfileCore,
  requestSupervisorProfiles as requestSupervisorProfilesCore,
  sendSupervisorProfilesReminder as sendSupervisorProfilesReminderCore,
  uploadSupervisorProfileCv as uploadSupervisorProfileCvCore,
} from './supervisorProfileService';
import {
  listExternalInviteItems,
  listNotificationEntries,
  listPeopleEntries,
  listPipelineItems,
  listTaskItems,
  listToDoEntries,
} from './operationsFeedService';

export type {
  FormData,
  MouFormData,
  MouFormRecord,
  ReviewDecision,
  SupervisorProfileForm,
  TitleRegistrationCase,
} from './contracts/titleRegistration';

export function checkStudentEligibility(student: SasiStudent): { eligible: boolean; reasons: string[] } {
  return checkStudentEligibilityCore(student);
}

export async function checkAndPrefill(studentNumber: string): Promise<{ eligible: boolean; reasons: string[]; student?: SasiStudent; caseRecord?: TitleRegistrationCase; formData?: FormData }> {
  return checkAndPrefillCore(studentNumber);
}

export async function getCaseById(caseId: number): Promise<{ case: TitleRegistrationCase; formData: FormData; student: SasiStudent }> {
  return getCaseByIdCore(caseId);
}

export async function updateForm(caseId: number, formPatch: Partial<FormData>): Promise<{ case: TitleRegistrationCase; formData: FormData }> {
  return updateFormCore(caseId, formPatch);
}

export async function generatePdf(caseId: number): Promise<{ pdfPath: string }> {
  return generatePdfCore(caseId);
}

export async function studentVet(caseId: number): Promise<TitleRegistrationCase> {
  return studentVetCore(caseId);
}

export async function supervisorReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<TitleRegistrationCase> {
  return supervisorReviewCore(caseId, decision, comments);
}

export async function deptReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<TitleRegistrationCase> {
  return deptReviewCore(caseId, decision, comments);
}

export async function chairpersonSign(caseId: number, comments?: string): Promise<TitleRegistrationCase> {
  return chairpersonSignCore(caseId, comments);
}

export async function deptSendToFaculty(caseId: number): Promise<TitleRegistrationCase> {
  return deptSendToFacultyCore(caseId);
}

export async function facultyReview(caseId: number, decision: ReviewDecision, comments?: string): Promise<TitleRegistrationCase> {
  return facultyReviewCore(caseId, decision, comments);
}

export async function sendFacultyReminderIfDue(caseId: number): Promise<{ sent: boolean; reason?: string }> {
  return sendFacultyReminderIfDueCore(caseId);
}

export async function getOrCreateMou(caseId: number): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  return getOrCreateMouCore(caseId);
}

export async function updateMou(caseId: number, patch: Partial<MouFormData>): Promise<{ record: MouFormRecord; formData: MouFormData }> {
  return updateMouCore(caseId, patch);
}

export async function completeMou(caseId: number): Promise<MouFormRecord> {
  return completeMouCore(caseId);
}

export async function generateMouPdf(caseId: number): Promise<{ pdfPath: string }> {
  return generateMouPdfCore(caseId);
}

export async function listSupervisorProfiles(caseId: number): Promise<Array<Record<string, unknown>>> {
  return listSupervisorProfilesCore(caseId);
}

export async function updateSupervisorProfile(
  profileId: number,
  patch: Partial<{
    person_title: string;
    qualifications: string;
    contact_email: string;
    external_address: string;
    publication_count: number | null;
    recent_publications: string[];
    contribution_motivation: string;
    new_to_department: 'Yes' | 'No';
    cv_attached: 'Yes' | 'No';
    cv_file_path: string;
  }>,
): Promise<SupervisorProfileForm> {
  return updateSupervisorProfileCore(profileId, patch);
}

export async function submitSupervisorProfile(profileId: number): Promise<SupervisorProfileForm> {
  return submitSupervisorProfileCore(profileId);
}

export async function requestSupervisorProfiles(caseId: number): Promise<{ requested: number }> {
  return requestSupervisorProfilesCore(caseId);
}

export async function sendSupervisorProfilesReminder(caseId: number): Promise<{ sent: boolean; reason?: string }> {
  return sendSupervisorProfilesReminderCore(caseId);
}

export async function uploadSupervisorProfileCv(profileId: number, fileName: string, contentBase64: string): Promise<SupervisorProfileForm> {
  return uploadSupervisorProfileCvCore(profileId, fileName, contentBase64);
}

export async function listPipeline(): Promise<Array<Record<string, unknown>>> {
  return listPipelineItems();
}

export async function listTasks(): Promise<Array<Record<string, unknown>>> {
  return listTaskItems();
}

export async function listExternalInvitesForCase(caseId: number): Promise<Array<Record<string, unknown>>> {
  return listExternalInviteItems(caseId);
}

export async function listToDoItems(): Promise<Array<Record<string, unknown>>> {
  return listToDoEntries();
}

export async function listPeople(): Promise<Array<Record<string, unknown>>> {
  return listPeopleEntries();
}

export async function listNotifications(caseId?: number): Promise<Array<Record<string, unknown>>> {
  return listNotificationEntries(caseId);
}

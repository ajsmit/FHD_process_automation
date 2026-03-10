import type { SupervisorProfileForm } from './contracts/titleRegistration';
import {
  listSupervisorProfiles as listSupervisorProfilesCore,
  updateSupervisorProfile as updateSupervisorProfileCore,
  submitSupervisorProfile as submitSupervisorProfileCore,
  requestSupervisorProfiles as requestSupervisorProfilesCore,
  sendSupervisorProfilesReminder as sendSupervisorProfilesReminderCore,
  uploadSupervisorProfileCv as uploadSupervisorProfileCvCore,
} from './rottCaseService';

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

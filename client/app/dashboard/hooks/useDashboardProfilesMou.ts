import { useMemo, useState } from 'react';
import {
  completeMou,
  getMou,
  getSupervisorProfiles,
  patchMou,
  patchSupervisorProfile,
  printMou,
  requestSupervisorProfiles,
  sendSupervisorProfilesReminder,
  submitSupervisorProfile,
  uploadSupervisorProfileCv,
  type MouFormData,
  type MouFormRecord,
  type SupervisorProfileForm,
} from '@/lib/api';

export function useDashboardProfilesMou(apiOrigin: string, setInfo: (message: string | null) => void) {
  const [supervisorProfiles, setSupervisorProfiles] = useState<SupervisorProfileForm[]>([]);
  const [mouRecord, setMouRecord] = useState<MouFormRecord | null>(null);
  const [mouData, setMouData] = useState<MouFormData | null>(null);
  const [mouPdfPath, setMouPdfPath] = useState<string | null>(null);

  const mouPrintUrl = useMemo(() => {
    if (!mouPdfPath) return null;
    const idx = mouPdfPath.indexOf('/generated_forms/');
    if (idx === -1) return null;
    return `${apiOrigin}${mouPdfPath.slice(idx)}`;
  }, [apiOrigin, mouPdfPath]);

  async function refreshSupervisorProfiles(caseId: number) {
    const response = await getSupervisorProfiles(caseId);
    setSupervisorProfiles(response.data);
  }

  async function refreshMou(caseId: number) {
    const response = await getMou(caseId);
    setMouRecord(response.record);
    setMouData(response.formData);
    setMouPdfPath(response.record.pdf_path);
  }

  async function updateProfileField(caseId: number | null, profileId: number, patch: Record<string, unknown>) {
    await patchSupervisorProfile(profileId, patch as Parameters<typeof patchSupervisorProfile>[1]);
    if (caseId) {
      await refreshSupervisorProfiles(caseId);
    }
    setInfo('Supervisor profile updated.');
  }

  async function handleSubmitProfile(caseId: number | null, profileId: number) {
    await submitSupervisorProfile(profileId);
    if (caseId) {
      await refreshSupervisorProfiles(caseId);
    }
    setInfo('Supervisor profile marked completed.');
  }

  async function handleRequestProfiles(caseId: number | null) {
    if (!caseId) return;
    const response = await requestSupervisorProfiles(caseId);
    await refreshSupervisorProfiles(caseId);
    setInfo(`Requested completion for ${response.requested} supervisor profile form(s).`);
  }

  async function handleSupervisorProfileReminder(
    caseId: number | null,
    refreshCaseNotifications: (id: number) => Promise<void>,
  ) {
    if (!caseId) return;
    const response = await sendSupervisorProfilesReminder(caseId);
    if (response.sent) {
      await refreshCaseNotifications(caseId);
      setInfo('Supervisor profile reminder queued.');
      return;
    }
    setInfo(response.reason ?? 'No reminder sent.');
  }

  async function handleUploadProfileCv(caseId: number | null, profileId: number, file: File) {
    const contentBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    });
    await uploadSupervisorProfileCv(profileId, { fileName: file.name, contentBase64 });
    if (caseId) {
      await refreshSupervisorProfiles(caseId);
    }
    setInfo('CV uploaded for supervisor profile.');
  }

  async function saveMouField(caseId: number | null, label: keyof MouFormData, value: string) {
    if (!caseId || !mouData) return;
    const next = { ...mouData, [label]: value };
    setMouData(next);
    const response = await patchMou(caseId, { [label]: value } as Partial<MouFormData>);
    setMouRecord(response.record);
    setMouData(response.formData);
    setInfo(`Saved MOU field: ${label}`);
  }

  async function handleCompleteMou(caseId: number | null, rerunSasiCheck: () => Promise<void>) {
    if (!caseId) return;
    const response = await completeMou(caseId);
    setMouRecord(response.record);
    await rerunSasiCheck();
    setInfo('MOU completed. Thesis title formalities package is finalized.');
  }

  async function handlePrintMou(caseId: number | null) {
    if (!caseId) return;
    const response = await printMou(caseId);
    setMouPdfPath(response.pdfPath);
    setInfo('MOU PDF generated.');
  }

  return {
    supervisorProfiles,
    mouRecord,
    mouData,
    mouPdfPath,
    mouPrintUrl,
    refreshSupervisorProfiles,
    refreshMou,
    updateProfileField,
    handleSubmitProfile,
    handleRequestProfiles,
    handleSupervisorProfileReminder,
    handleUploadProfileCv,
    saveMouField,
    handleCompleteMou,
    handlePrintMou,
  };
}

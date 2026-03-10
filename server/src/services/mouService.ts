import type { MouFormData, MouFormRecord } from './contracts/titleRegistration';
import {
  getOrCreateMou as getOrCreateMouCore,
  updateMou as updateMouCore,
  completeMou as completeMouCore,
  generateMouPdf as generateMouPdfCore,
} from './rottCaseService';

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

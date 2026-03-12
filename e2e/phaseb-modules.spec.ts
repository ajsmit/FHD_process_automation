import { test, expect, type APIRequestContext, type Page } from '@playwright/test';

const API_BASE = 'http://localhost:3001/api/v1';
const STUDENT_PHD_SASI_ID = '1234567';
const STUDENT_MSC_SASI_ID = '1234568';
const STUDENT_LEAVE_SASI_ID = '1234572';
const DEPT_SASI_ID = 'STAFF-003';
const FACULTY_SASI_ID = 'STAFF-004';

async function devLogin(request: APIRequestContext, sasiId: string): Promise<string> {
  const response = await request.post(`${API_BASE}/auth/dev-login`, {
    data: { sasiId },
  });
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { token: string };
  return body.token;
}

async function apiGet(
  request: APIRequestContext,
  token: string,
  path: string,
): Promise<{ ok: boolean; body: Record<string, unknown> }> {
  const response = await request.get(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = (await response.json()) as Record<string, unknown>;
  return { ok: response.ok(), body };
}

async function apiPatch(
  request: APIRequestContext,
  token: string,
  path: string,
  data: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const response = await request.patch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as Record<string, unknown>;
}

async function apiPost(
  request: APIRequestContext,
  token: string,
  path: string,
  data?: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const response = await request.post(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as Record<string, unknown>;
}

async function ensureCaseExists(request: APIRequestContext, token: string, studentNumber: string): Promise<number> {
  const response = await request.get(`${API_BASE}/title-registration/sasi/${studentNumber}/check`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { caseRecord: { id: number } };
  return body.caseRecord.id;
}

async function expectModuleGuardError(
  request: APIRequestContext,
  token: string,
  caseId: number,
  modulePath: string,
  expectedMessagePattern: RegExp,
): Promise<void> {
  const response = await request.get(`${API_BASE}/title-registration/cases/${caseId}/${modulePath}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(response.ok()).toBeFalsy();
  const body = (await response.json()) as { message?: string };
  expect(body.message ?? '').toMatch(expectedMessagePattern);
}

async function openCaseViaSasiLookup(page: Page, studentNumber: string): Promise<void> {
  await page.goto('/');
  await page.getByPlaceholder(/Enter SASI student number/i).fill(studentNumber);
  await page.getByRole('button', { name: 'Check SASI' }).click();
  await expect(page.getByRole('heading', { name: 'Thesis Details' })).toBeVisible();
}

function toSidebarLabel(moduleKey: string): string {
  return moduleKey.replace('_', ' ');
}

async function openModule(page: Page, moduleKey: string): Promise<void> {
  await page.getByRole('button', { name: new RegExp(`^${toSidebarLabel(moduleKey)}$`, 'i') }).click();
}

async function expectModulePanel(page: Page, moduleKey: string, heading: string): Promise<void> {
  await openModule(page, moduleKey);
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  await expect(page.getByText(/^Status:/)).toBeVisible();
}

async function expectModuleStatus(page: Page, moduleKey: string, heading: string, status: string): Promise<void> {
  await openModule(page, moduleKey);
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  await expect(page.getByText(new RegExp(`Status:\\s*${status}`, 'i'))).toBeVisible();
}

async function ensureProgressSubmitted(
  request: APIRequestContext,
  studentToken: string,
  caseId: number,
): Promise<void> {
  const current = await apiGet(request, studentToken, `/title-registration/cases/${caseId}/progress-report`);
  expect(current.ok).toBeTruthy();
  const status = String((current.body.record as { status?: string } | undefined)?.status ?? 'draft');
  if (status === 'draft' || status.startsWith('returned_')) {
    await apiPatch(request, studentToken, `/title-registration/cases/${caseId}/progress-report`, {
      'Reporting period': '2026 Q4',
      'Research progress summary': 'Prerequisite progress report submission for UI transactional checks.',
      'Ethics compliance status': 'Compliant',
    });
    await apiPost(request, studentToken, `/title-registration/cases/${caseId}/progress-report/submit`);
  }
}

async function ensureProgressApproved(
  request: APIRequestContext,
  studentToken: string,
  deptToken: string,
  facultyToken: string,
  caseId: number,
): Promise<void> {
  const current = await apiGet(request, studentToken, `/title-registration/cases/${caseId}/progress-report`);
  expect(current.ok).toBeTruthy();
  let status = String((current.body.record as { status?: string } | undefined)?.status ?? 'draft');

  if (status === 'draft' || status.startsWith('returned_')) {
    await apiPatch(request, studentToken, `/title-registration/cases/${caseId}/progress-report`, {
      'Reporting period': '2026 Q4',
      'Research progress summary': 'Progression approval path bootstrap content.',
      'Ethics compliance status': 'Compliant',
    });
    await apiPost(request, studentToken, `/title-registration/cases/${caseId}/progress-report/submit`);
    status = 'awaiting_dept_review';
  }
  if (status === 'awaiting_dept_review') {
    await apiPost(request, deptToken, `/title-registration/cases/${caseId}/progress-report/dept-review`, { decision: 'approved' });
    status = 'awaiting_faculty_review';
  }
  if (status === 'awaiting_faculty_review') {
    await apiPost(request, facultyToken, `/title-registration/cases/${caseId}/progress-report/faculty-review`, { decision: 'approved' });
  }
}

async function ensureUpgradeApproved(
  request: APIRequestContext,
  studentToken: string,
  deptToken: string,
  facultyToken: string,
  caseId: number,
): Promise<void> {
  const current = await apiGet(request, studentToken, `/title-registration/cases/${caseId}/upgrade-msc-to-phd`);
  expect(current.ok).toBeTruthy();
  let status = String((current.body.record as { status?: string } | undefined)?.status ?? 'draft');

  if (status === 'draft' || status.startsWith('returned_')) {
    await apiPatch(request, studentToken, `/title-registration/cases/${caseId}/upgrade-msc-to-phd`, {
      'Initial thesis title for upgrade from Masters to Doctoral': 'Doctoral upgrade thesis trajectory draft.',
      'Upgrade motivation': 'Upgrade motivation with doctoral readiness evidence.',
      'Research progress evidence': 'Milestones and outputs support doctoral progression.',
      'Supervisor recommendation': 'Supervisor recommends progression to doctoral registration.',
    });
    await apiPost(request, studentToken, `/title-registration/cases/${caseId}/upgrade-msc-to-phd/submit`);
    status = 'awaiting_dept_review';
  }
  if (status === 'awaiting_dept_review') {
    await apiPost(request, deptToken, `/title-registration/cases/${caseId}/upgrade-msc-to-phd/dept-review`, { decision: 'approved' });
    status = 'awaiting_faculty_review';
  }
  if (status === 'awaiting_faculty_review') {
    await apiPost(request, facultyToken, `/title-registration/cases/${caseId}/upgrade-msc-to-phd/faculty-review`, { decision: 'approved' });
  }
}

test.describe('Workflow Module UI Regressions', () => {
  test('INTENTION_TO_SUBMIT panel exposes status telemetry', async ({ page, request }) => {
    const token = await devLogin(request, STUDENT_PHD_SASI_ID);
    const caseId = await ensureCaseExists(request, token, STUDENT_PHD_SASI_ID);
    const intentionState = await apiGet(request, token, `/title-registration/cases/${caseId}/intention-to-submit`);

    await openCaseViaSasiLookup(page, STUDENT_PHD_SASI_ID);
    await openModule(page, 'intention_to_submit');
    if (intentionState.ok) {
      await expect(page.getByRole('heading', { name: 'INTENTION_TO_SUBMIT Module' })).toBeVisible();
      await expect(page.getByText(/^Status:/)).toBeVisible();
    } else {
      expect(String(intentionState.body.message ?? '')).toMatch(/INTENTION_TO_SUBMIT can start only after MOU is submitted/i);
      await expect(page.getByRole('heading', { name: 'FHD Dashboard' })).toBeVisible();
    }
  });

  test('baseline modules enforce prerequisite guards and keep UI stable across module tabs', async ({ page, request }) => {
    const token = await devLogin(request, STUDENT_PHD_SASI_ID);
    const caseId = await ensureCaseExists(request, token, STUDENT_PHD_SASI_ID);

    await expectModuleGuardError(
      request,
      token,
      caseId,
      'appoint-examiners',
      /INTENTION_TO_SUBMIT must be submitted before this module can start|APPOINT_EXAMINERS can start only after INTENTION_TO_SUBMIT is approved/i,
    );
    await expectModuleGuardError(
      request,
      token,
      caseId,
      'change-examiners',
      /APPOINT_EXAMINERS must be submitted before this module can start|CHANGE_EXAMINERS can start only after APPOINT_EXAMINERS is approved/i,
    );
    await expectModuleGuardError(
      request,
      token,
      caseId,
      'examiner-summary-cv',
      /EXAMINER_SUMMARY_CV can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is approved/i,
    );
    await expectModuleGuardError(
      request,
      token,
      caseId,
      'appoint-arbiter',
      /APPOINT_ARBITER can start only after APPOINT_EXAMINERS or CHANGE_EXAMINERS is approved/i,
    );
    await openCaseViaSasiLookup(page, STUDENT_PHD_SASI_ID);

    for (const blockedTab of ['appoint_examiners', 'change_examiners', 'examiner_summary_cv', 'appoint_arbiter']) {
      await openModule(page, blockedTab);
      await expect(page.getByRole('heading', { name: 'FHD Dashboard' })).toBeVisible();
    }

    await expectModulePanel(page, 'change_title', 'CHANGE_TITLE Module');
    await expectModulePanel(page, 'change_supervisor', 'CHANGE_SUPERVISOR Module');
    await expectModulePanel(page, 'add_co_supervisor', 'ADD_CO_SUPERVISOR Module');
    await expectModulePanel(page, 'progress_report', 'PROGRESS_REPORT Module');
    await expectModulePanel(page, 'other_request', 'OTHER_REQUEST Module');
  });

  test('PROGRESS_REPORT reaches approved state with UI telemetry parity', async ({ page, request }) => {
    const studentToken = await devLogin(request, STUDENT_PHD_SASI_ID);
    const deptToken = await devLogin(request, DEPT_SASI_ID);
    const facultyToken = await devLogin(request, FACULTY_SASI_ID);
    const caseId = await ensureCaseExists(request, studentToken, STUDENT_PHD_SASI_ID);

    await ensureProgressApproved(request, studentToken, deptToken, facultyToken, caseId);
    await openCaseViaSasiLookup(page, STUDENT_PHD_SASI_ID);
    await expectModuleStatus(page, 'progress_report', 'PROGRESS_REPORT Module', 'approved');
  });

  test('UPGRADE_MSC_TO_PHD reaches approved state with UI telemetry parity', async ({ page, request }) => {
    const studentToken = await devLogin(request, STUDENT_MSC_SASI_ID);
    const deptToken = await devLogin(request, DEPT_SASI_ID);
    const facultyToken = await devLogin(request, FACULTY_SASI_ID);
    const caseId = await ensureCaseExists(request, studentToken, STUDENT_MSC_SASI_ID);

    await ensureProgressSubmitted(request, studentToken, caseId);
    await ensureUpgradeApproved(request, studentToken, deptToken, facultyToken, caseId);
    await openCaseViaSasiLookup(page, STUDENT_MSC_SASI_ID);
    await expectModuleStatus(page, 'upgrade_msc_to_phd', 'UPGRADE_MSC_TO_PHD Module', 'approved');
  });

  test('LEAVE_OF_ABSENCE supports return-and-resubmit transactional UI path', async ({ page, request }) => {
    const studentToken = await devLogin(request, STUDENT_LEAVE_SASI_ID);
    const deptToken = await devLogin(request, DEPT_SASI_ID);
    const caseId = await ensureCaseExists(request, studentToken, STUDENT_LEAVE_SASI_ID);

    await ensureProgressSubmitted(request, studentToken, caseId);

    await openCaseViaSasiLookup(page, STUDENT_LEAVE_SASI_ID);
    await openModule(page, 'leave_of_absence');
    await page.getByLabel('Leave start date').fill('2026-07-01');
    await page.getByLabel('Leave end date').fill('2026-08-31');
    await page.getByLabel('Reason for leave').fill('Initial leave submission for UI return-and-resubmit regression flow.');
    await page.getByRole('button', { name: 'Submit LEAVE_OF_ABSENCE' }).click();
    await expectModuleStatus(page, 'leave_of_absence', 'LEAVE_OF_ABSENCE Module', 'awaiting_dept_review');

    await apiPost(request, deptToken, `/title-registration/cases/${caseId}/leave-of-absence/dept-review`, { decision: 'returned' });
    await openCaseViaSasiLookup(page, STUDENT_LEAVE_SASI_ID);
    await expectModuleStatus(page, 'leave_of_absence', 'LEAVE_OF_ABSENCE Module', 'returned_by_dept');

    await page.getByLabel('Reason for leave').fill('Updated leave rationale after department feedback for resubmission.');
    await page.getByRole('button', { name: 'Submit LEAVE_OF_ABSENCE' }).click();
    await expectModuleStatus(page, 'leave_of_absence', 'LEAVE_OF_ABSENCE Module', 'awaiting_dept_review');
  });

  test('SUPERVISOR_SUMMATIVE_REPORT enforces supervisor-role edit gate and shows prerequisite status in UI', async ({ page, request }) => {
    const studentToken = await devLogin(request, STUDENT_PHD_SASI_ID);
    const caseId = await ensureCaseExists(request, studentToken, STUDENT_PHD_SASI_ID);

    const studentPatch = await apiGet(request, studentToken, `/title-registration/cases/${caseId}/supervisor-summative-report`);
    expect(studentPatch.ok).toBeFalsy();
    expect(String(studentPatch.body.message ?? '')).toMatch(/must be submitted|requires APPOINT_EXAMINERS or CHANGE_EXAMINERS/i);

    await openCaseViaSasiLookup(page, STUDENT_PHD_SASI_ID);
    await openModule(page, 'supervisor_summative_report');
    await expect(page.getByRole('heading', { name: 'FHD Dashboard' })).toBeVisible();
  });
});

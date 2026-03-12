import { test, expect, type APIRequestContext, type Page } from '@playwright/test';

const API_BASE = 'http://localhost:3001/api/v1';
const DEMO_STUDENT_SASI_ID = '1234567';

async function devLogin(request: APIRequestContext, sasiId: string): Promise<string> {
  const response = await request.post(`${API_BASE}/auth/dev-login`, {
    data: { sasiId },
  });
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { token: string };
  return body.token;
}

async function ensureCaseExists(request: APIRequestContext, token: string): Promise<number> {
  const response = await request.get(`${API_BASE}/title-registration/sasi/${DEMO_STUDENT_SASI_ID}/check`, {
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

async function openCaseViaSasiLookup(page: Page): Promise<void> {
  await page.goto('/');
  await page.getByPlaceholder(/Enter SASI student number/i).fill(DEMO_STUDENT_SASI_ID);
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

test.describe('Workflow Module UI Regressions', () => {
  test('INTENTION_TO_SUBMIT panel exposes status telemetry', async ({ page, request }) => {
    const token = await devLogin(request, DEMO_STUDENT_SASI_ID);
    await ensureCaseExists(request, token);

    await openCaseViaSasiLookup(page);
    await openModule(page, 'intention_to_submit');
    await expect(page.getByRole('heading', { name: 'INTENTION_TO_SUBMIT Module' })).toBeVisible();
    await expect(page.getByText(/^Status:/)).toBeVisible();
  });

  test('baseline modules enforce prerequisite guards and keep UI stable across module tabs', async ({ page, request }) => {
    const token = await devLogin(request, DEMO_STUDENT_SASI_ID);
    const caseId = await ensureCaseExists(request, token);

    await expectModuleGuardError(
      request,
      token,
      caseId,
      'appoint-examiners',
      /APPOINT_EXAMINERS can start only after INTENTION_TO_SUBMIT is approved/i,
    );
    await expectModuleGuardError(
      request,
      token,
      caseId,
      'change-examiners',
      /APPOINT_EXAMINERS must be submitted before this module can start/i,
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

    await openCaseViaSasiLookup(page);

    for (const blockedTab of ['appoint_examiners', 'change_examiners', 'examiner_summary_cv', 'appoint_arbiter']) {
      await openModule(page, blockedTab);
      await expect(page.getByRole('heading', { name: 'FHD Dashboard' })).toBeVisible();
    }

    await expectModulePanel(page, 'change_title', 'CHANGE_TITLE Module');
    await expectModulePanel(page, 'change_supervisor', 'CHANGE_SUPERVISOR Module');
    await expectModulePanel(page, 'add_co_supervisor', 'ADD_CO_SUPERVISOR Module');
    await expectModulePanel(page, 'progress_report', 'PROGRESS_REPORT Module');
    await expectModulePanel(page, 'leave_of_absence', 'LEAVE_OF_ABSENCE Module');
    await expectModulePanel(page, 'readmission_request', 'READMISSION_REQUEST Module');
    await expectModulePanel(page, 'upgrade_msc_to_phd', 'UPGRADE_MSC_TO_PHD Module');
    await expectModulePanel(page, 'supervisor_summative_report', 'SUPERVISOR_SUMMATIVE_REPORT Module');
    await expectModulePanel(page, 'other_request', 'OTHER_REQUEST Module');
  });
});

import { test, expect, type APIRequestContext, type Page } from '@playwright/test';

const API_BASE = 'http://localhost:3001/api/v1';
const STUDENT_SASI_ID = '1234567';

async function devLogin(request: APIRequestContext, sasiId: string): Promise<string> {
  const response = await request.post(`${API_BASE}/auth/dev-login`, {
    data: { sasiId },
  });
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { token: string };
  return body.token;
}

async function openLandingCase(page: Page, studentNumber: string): Promise<void> {
  await page.goto('/');
  await page.getByPlaceholder(/Enter SASI student number/i).fill(studentNumber);
  await page.getByRole('button', { name: 'Check SASI' }).click();
  await expect(page.getByText(/Faculty Process Calendar/i)).toBeVisible();
}

test.describe('Policy Administration UI Regressions', () => {
  test('faculty can update annual calendar and landing reflects current-year notice', async ({ page }) => {
    const year = String(new Date().getUTCFullYear());
    const uniqueNotice = `Policy regression notice ${Date.now()}`;

    await page.goto('/admin-policy?actor=faculty');
    await expect(page.getByRole('heading', { name: 'Policy and Deadline Administration' })).toBeVisible();

    await page.getByLabel('Academic year').fill(year);
    await page.getByLabel('ROTT submission deadline').fill(`${year}-03-15`);
    await page.getByLabel('Progress report deadline').fill(`${year}-11-10`);
    await page.getByLabel('Intention to submit deadline').fill(`${year}-08-20`);
    await page.getByLabel('Appoint examiners deadline').fill(`${year}-09-25`);
    await page.getByLabel('Faculty published notice').fill(uniqueNotice);
    await page.getByRole('button', { name: 'Save Faculty Calendar' }).click();
    await expect(page.getByText('Faculty deadline calendar updated.')).toBeVisible();

    await openLandingCase(page, STUDENT_SASI_ID);
    await expect(page.getByText(uniqueNotice)).toBeVisible();
  });

  test('dept HD can publish department message and landing shows it for matching department', async ({ page }) => {
    const uniqueMessage = `Department policy bulletin ${Date.now()}`;

    await page.goto('/admin-policy?actor=dept');
    await page.getByRole('textbox', { name: 'Department', exact: true }).fill('Biodiversity & Conservation Biology');
    await page.getByLabel('New Department message').fill(uniqueMessage);
    await page.getByRole('button', { name: 'Publish Department Message' }).click();
    await expect(page.getByText('Department landing message published.')).toBeVisible();
    await expect(page.getByText(uniqueMessage)).toBeVisible();

    await openLandingCase(page, STUDENT_SASI_ID);
    await expect(page.getByRole('heading', { name: 'Thesis Details' })).toBeVisible();
    await expect(page.getByText(uniqueMessage)).toBeVisible();
  });

  test('dept HD is blocked from publishing Faculty landing messages via UI', async ({ page }) => {
    await page.goto('/admin-policy?actor=dept');
    await expect(page.getByRole('heading', { name: 'Policy and Deadline Administration' })).toBeVisible();

    await page.getByLabel('New Faculty message').fill(`Dept unauthorized faculty publish ${Date.now()}`);
    await page.getByRole('button', { name: 'Publish Faculty Message' }).click();
    await expect(page.getByText(/not authorized to publish faculty landing messages/i)).toBeVisible();
  });

  test('dept HD is blocked from publishing messages for non-assigned departments via UI', async ({ page }) => {
    await page.goto('/admin-policy?actor=dept');
    await expect(page.getByRole('heading', { name: 'Policy and Deadline Administration' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Department', exact: true }).fill('Physics');
    await page.getByLabel('New Department message').fill(`Dept unauthorized department publish ${Date.now()}`);
    await page.getByRole('button', { name: 'Publish Department Message' }).click();
    await expect(page.getByText(/assigned departments/i)).toBeVisible();
  });

  test('unauthorized student actor is blocked from policy-admin write actions through UI', async ({ page }) => {
    const year = String(new Date().getUTCFullYear());

    await page.goto('/admin-policy?actor=student');
    await expect(page.getByRole('heading', { name: 'Policy and Deadline Administration' })).toBeVisible();

    await page.getByLabel('Academic year').fill(year);
    await page.getByLabel('Faculty published notice').fill(`Unauthorized UI attempt ${Date.now()}`);
    await page.getByRole('button', { name: 'Save Faculty Calendar' }).click();
    await expect(page.getByText(/only faculty\/system administrators|not authorized/i)).toBeVisible();

    await page.getByLabel('New Faculty message').fill(`Unauthorized faculty publish ${Date.now()}`);
    await page.getByRole('button', { name: 'Publish Faculty Message' }).click();
    await expect(page.getByText(/not authorized|failed to create landing message/i)).toBeVisible();
  });

  test('policy deadline update drives landing overdue warning and ITS progress-report gate', async ({ page, request }) => {
    const now = new Date();
    const year = String(now.getUTCFullYear());
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    await page.goto('/admin-policy?actor=faculty');
    await expect(page.getByRole('heading', { name: 'Policy and Deadline Administration' })).toBeVisible();
    await page.getByLabel('Academic year').fill(year);
    await page.getByLabel('Progress report deadline').fill(yesterday);
    await page.getByRole('button', { name: 'Save Faculty Calendar' }).click();
    await expect(page.getByText('Faculty deadline calendar updated.')).toBeVisible();

    await openLandingCase(page, STUDENT_SASI_ID);
    await expect(page.getByText(/progress report for .* is overdue since/i)).toBeVisible();

    const studentToken = await devLogin(request, STUDENT_SASI_ID);
    const checkResponse = await request.get(`${API_BASE}/title-registration/sasi/${STUDENT_SASI_ID}/check`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    expect(checkResponse.ok()).toBeTruthy();
    const checkBody = (await checkResponse.json()) as { caseRecord: { id: number } };
    const caseId = Number(checkBody.caseRecord.id);

    const itsResponse = await request.get(`${API_BASE}/title-registration/cases/${caseId}/intention-to-submit`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    expect(itsResponse.ok()).toBeFalsy();
    const itsBody = (await itsResponse.json()) as { message?: string };
    expect(itsBody.message ?? '').toMatch(/PROGRESS_REPORT must be submitted before this module can start|INTENTION_TO_SUBMIT can start only after MOU is submitted/i);
  });
});

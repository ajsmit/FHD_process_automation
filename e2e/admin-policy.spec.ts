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

    await page.goto('/admin-policy');
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

    await page.goto('/admin-policy');
    await page.getByRole('textbox', { name: 'Department', exact: true }).fill('Biodiversity & Conservation Biology');
    await page.getByLabel('New Department message').fill(uniqueMessage);
    await page.getByRole('button', { name: 'Publish Department Message' }).click();
    await expect(page.getByText('Department landing message published.')).toBeVisible();
    await expect(page.getByText(uniqueMessage)).toBeVisible();

    await openLandingCase(page, STUDENT_SASI_ID);
    await expect(page.getByRole('heading', { name: 'Thesis Details' })).toBeVisible();
    await expect(page.getByText(uniqueMessage)).toBeVisible();
  });

  test('unauthorized student actor is blocked from policy-admin write endpoints', async ({ request }) => {
    const studentToken = await devLogin(request, STUDENT_SASI_ID);
    const year = String(new Date().getUTCFullYear());

    const calendarResponse = await request.patch(`${API_BASE}/title-registration/faculty-calendar/${year}`, {
      headers: { Authorization: `Bearer ${studentToken}` },
      data: { publishedNotice: `Unauthorized attempt ${Date.now()}` },
    });
    expect(calendarResponse.status()).toBe(403);
    const calendarBody = (await calendarResponse.json()) as { message?: string };
    expect(calendarBody.message ?? '').toMatch(/not authorized|only faculty\/system administrators/i);

    const messageResponse = await request.post(`${API_BASE}/title-registration/landing-messages`, {
      headers: { Authorization: `Bearer ${studentToken}` },
      data: { scope: 'faculty', message: `Unauthorized publish ${Date.now()}` },
    });
    expect([400, 403]).toContain(messageResponse.status());
    const messageBody = (await messageResponse.json()) as { message?: string };
    expect(messageBody.message ?? '').toMatch(/not authorized|only faculty\/system administrators/i);
  });
});

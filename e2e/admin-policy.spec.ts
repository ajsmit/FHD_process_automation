import { test, expect, type Page } from '@playwright/test';

const STUDENT_SASI_ID = '1234567';

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
});

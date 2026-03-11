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

async function createInviteToken(request: APIRequestContext, token: string, caseId: number, email: string): Promise<string> {
  const response = await request.post(`${API_BASE}/directory/external-academics/invite`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      caseId,
      role: 'supervisor',
      email,
    },
  });
  expect(response.ok()).toBeTruthy();
  const body = (await response.json()) as { inviteLink: string };
  return body.inviteLink.split('/').pop() ?? '';
}

async function resetCaseFields(request: APIRequestContext, token: string, caseId: number): Promise<void> {
  const response = await request.patch(`${API_BASE}/title-registration/cases/${caseId}/form`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      'Has Co-supervisor?': 'No',
      'Co-supervisor Title': 'NA',
      'Co-supervisor': 'NA',
      'Co-supervisor Qualifications': 'NA',
      'Co-supervisor is UWC-internal': 'Yes',
      'Co-supervisor External Lookup Id': '',
      'Co-supervisor External First Name': '',
      'Co-supervisor External Surname': '',
      'Co-supervisor External Address': '',
      'Co-supervisor External Email': '',
      'Second Co-supervisor Title': 'NA',
      'Second Co-supervisor': 'NA',
      'Second Co-supervisor Qualifications': 'NA',
      'Second Co-supervisor is UWC-internal': 'Yes',
      'Second Co-supervisor External Lookup Id': '',
      'Second Co-supervisor External First Name': '',
      'Second Co-supervisor External Surname': '',
      'Second Co-supervisor External Address': '',
      'Second Co-supervisor External Email': '',
    },
  });
  expect(response.ok()).toBeTruthy();
}

async function waitForInviteStatus(
  request: APIRequestContext,
  token: string,
  caseId: number,
  role: string,
  email: string,
  expectedStatus: string,
  timeoutMs = 10000,
): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const invitesResponse = await request.get(`${API_BASE}/title-registration/cases/${caseId}/external-invites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(invitesResponse.ok()).toBeTruthy();
    const invitesPayload = (await invitesResponse.json()) as { data: Array<Record<string, string | number | null>> };
    const matchedInvite = invitesPayload.data.find(
      (entry) => entry.role === role && String(entry.email ?? '').toLowerCase() === email.toLowerCase(),
    );
    if (matchedInvite?.status === expectedStatus) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${role} invite status to become "${expectedStatus}"`);
}

function supervisorCard(page: Page) {
  return page.locator('section', { has: page.getByRole('heading', { name: 'Supervisor Details' }) });
}

function thesisDetailsCard(page: Page) {
  return page.locator('section', { has: page.getByRole('heading', { name: 'Thesis Details' }) });
}

function coSupervisorDetailsCard(page: Page) {
  return page.locator('section', { has: page.getByRole('heading', { name: 'Co-supervisor Details' }) });
}

async function openCaseViaSasiLookup(page: Page, sasiId: string): Promise<void> {
  await page.goto('/');
  await page.getByPlaceholder(/Enter SASI student number/i).fill(sasiId);
  await page.getByRole('button', { name: 'Check SASI' }).click();
  await expect(page.getByRole('heading', { name: 'Thesis Details' })).toBeVisible();
}

test.describe('UI End-to-End Regressions', () => {
  test('invalid SASI lookup shows clear failure state', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder(/Enter SASI student number/i).fill('999999999');
    await page.getByRole('button', { name: 'Check SASI' }).click();
    await expect(page.getByText(/not found|failed|cannot/i).first()).toBeVisible();
  });

  test('save/prefill coherence in UI keeps editable values after reload and sanitizes thesis title', async ({ page }) => {
    await openCaseViaSasiLookup(page, DEMO_STUDENT_SASI_ID);

    const thesisTitle = thesisDetailsCard(page).getByRole('textbox', { name: /^Thesis title$/ });
    await thesisTitle.fill('UI parity thesis title...');
    await page.getByRole('button', { name: /^Save$/ }).click();
    await expect(page.getByText(/Information saved at/i).first()).toBeVisible();

    await openCaseViaSasiLookup(page, DEMO_STUDENT_SASI_ID);
    await expect(thesisDetailsCard(page).getByRole('textbox', { name: /^Thesis title$/ })).toHaveValue('UI parity thesis title');
  });

  test('co-supervisor edge guard rejects invalid jump from 0 directly to 2', async ({ page, request }) => {
    const token = await devLogin(request, DEMO_STUDENT_SASI_ID);
    const caseId = await ensureCaseExists(request, token);
    await resetCaseFields(request, token, caseId);

    await openCaseViaSasiLookup(page, DEMO_STUDENT_SASI_ID);

    await coSupervisorDetailsCard(page).locator('select').first().selectOption('0');
    await expect(page.getByText('No co-supervisor fields are required.')).toBeVisible();

    await coSupervisorDetailsCard(page).locator('select').first().selectOption('2');
    await expect(coSupervisorDetailsCard(page).locator('select').first()).toHaveValue('0');
    await expect(page.getByText('No co-supervisor fields are required.')).toBeVisible();
  });

  test('invite completion synchronization updates dashboard status', async ({ page, context, request }) => {
    const token = await devLogin(request, DEMO_STUDENT_SASI_ID);
    const caseId = await ensureCaseExists(request, token);
    const inviteEmail = `invite.sync.${Date.now()}@example.org`;
    const inviteToken = await createInviteToken(request, token, caseId, inviteEmail);
    expect(inviteToken).toBeTruthy();

    const invitePage = await context.newPage();
    await invitePage.goto(`/external-academic/${inviteToken}`);
    await invitePage.getByPlaceholder('Prof / Dr / Mr / Ms').fill('Prof');
    await invitePage.getByLabel('First name').fill('Grace');
    await invitePage.getByLabel('Surname').fill('Hopper');
    await invitePage.getByLabel('Highest qualification').fill('PhD');
    await invitePage.getByLabel('Alternate email').fill('grace.alt@example.org');
    await invitePage.getByLabel('ID / Passport / Other unique number').fill('9001015009087');
    await invitePage.getByLabel('Address').fill('42 Academic Road');
    await invitePage.getByRole('button', { name: 'Submit profile' }).click();
    await expect(invitePage.getByText(/Profile submitted successfully/i)).toBeVisible();
    await invitePage.close();

    // API checks ensure synchronization is not just visual.
    await waitForInviteStatus(request, token, caseId, 'supervisor', inviteEmail, 'completed');

    const caseResponse = await request.get(`${API_BASE}/title-registration/cases/${caseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(caseResponse.ok()).toBeTruthy();
    const casePayload = (await caseResponse.json()) as { formData: Record<string, string> };
    expect(casePayload.formData['Supervisor External First Name']).toBe('Grace');
    expect(casePayload.formData['Supervisor External Surname']).toBe('Hopper');
  });

  test('external invite UI edge cases: invalid token and invalid SA ID validation', async ({ page, request }) => {
    await page.goto('/external-academic/not-a-real-token');
    await expect(page.getByText(/Invite link not found|expired|already been used/i)).toBeVisible();

    const token = await devLogin(request, DEMO_STUDENT_SASI_ID);
    const caseId = await ensureCaseExists(request, token);
    const inviteToken = await createInviteToken(request, token, caseId, 'edge.id.validation@example.org');
    await page.goto(`/external-academic/${inviteToken}`);

    await page.getByPlaceholder('Prof / Dr / Mr / Ms').fill('Dr');
    await page.getByLabel('First name').fill('Edge');
    await page.getByLabel('Surname').fill('Case');
    await page.getByLabel('Highest qualification').fill('PhD');
    await page.getByLabel('Alternate email').fill('edge.alt@example.org');
    await page.getByLabel('Address').fill('1 Validation Way');
    await page.getByLabel('ID / Passport / Other unique number').fill('123');
    await page.getByRole('button', { name: 'Submit profile' }).click();
    await expect(page.getByText(/13 digits/i)).toBeVisible();
  });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import os from 'os';
import path from 'path';
import type { FormData, MouFormData } from '../contracts/titleRegistration';
import { renderMouPdfDocument } from './mouPdfService';
import { renderPhaseBModulePdfDocument } from './phaseBModulePdfService';
import { renderTitleRegistrationPdfDocument } from './titleRegistrationPdfService';

function resolveRepoRoot(): string {
  const candidates = [
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), '..'),
    path.resolve(process.cwd(), '../..'),
  ];
  for (const candidate of candidates) {
    if (existsSync(path.join(candidate, 'server', 'assets'))) {
      return candidate;
    }
  }
  return path.resolve(process.cwd());
}

function sampleRottFormData(): FormData {
  return {
    'Student Title': 'Ms',
    'Student First-Name': 'Jesse',
    'Student Surname': 'Smith',
    'Student Number': '1234567',
    Department: 'Biodiversity & Conservation Biology',
    Degree: 'PHD',
    'Date of first title registration on SASI': '02-01-2026',
    'Student registration active on SASI': 'Yes',
    'PhD by traditional thesis format': true,
    'PhD by publication': false,
    'Masters Full-thesis': false,
    'Masters Mini thesis': false,
    'Masters by publication': false,
    'Supervisor Title': 'Prof',
    Supervisor: 'Bryan Maritz',
    'Supervisor Qualifications': 'PhD',
    'Supervisor is UWC-internal': 'Yes',
    'Supervisor External Lookup Id': '',
    'Supervisor External First Name': '',
    'Supervisor External Surname': '',
    'Supervisor External Address': '',
    'Supervisor External Email': '',
    'Administrative Supervisor same as Supervisor': 'No',
    'Administrative Supervisor (Nominal Role)': 'Brian May',
    'Administrative Supervisor Qualifications (Nominal Role)': 'PhD',
    'Administrative Supervisor is UWC-internal': 'Yes',
    'Administrative Supervisor External Lookup Id': '',
    'Administrative Supervisor External Title': '',
    'Administrative Supervisor External First Name': '',
    'Administrative Supervisor External Surname': '',
    'Administrative Supervisor External Address': '',
    'Administrative Supervisor External Email': '',
    'Has Co-supervisor?': 'Yes',
    'Co-supervisor Title': 'Prof',
    'Co-supervisor': 'Albertus Smit',
    'Co-supervisor Qualifications': 'PhD',
    'Co-supervisor is UWC-internal': 'Yes',
    'Co-supervisor External Lookup Id': '',
    'Co-supervisor External First Name': '',
    'Co-supervisor External Surname': '',
    'Co-supervisor External Address': '',
    'Co-supervisor External Email': '',
    'Second Co-supervisor Title': 'Dr',
    'Second Co-supervisor': 'Bunny Boo',
    'Second Co-supervisor Qualifications': 'PhD',
    'Second Co-supervisor is UWC-internal': 'No',
    'Second Co-supervisor External Lookup Id': '',
    'Second Co-supervisor External First Name': 'Bunny',
    'Second Co-supervisor External Surname': 'Boo',
    'Second Co-supervisor External Address': '94 Main Rd Muizenberg',
    'Second Co-supervisor External Email': 'bunny@example.com',
    'Thesis title': 'Hydroclimate controls on Cnidaria bloom pulses',
    'Key words': 'Biodiversity, Agulhas Current, Physiology, Zooplankton, Cnidaria, Dynamics',
    'Does this project need Ethics clearance?': 'Yes',
    'Ethics clearance reference number': 'ETH-2026-BCB-001',
    'Date on which ethics clearance was issued': '03-01-2026',
    'Has the MOU been submitted?': 'Yes',
    'Year first registered': '2026',
    'Semester first registered': '1',
    'Initial thesis title for upgrade from Masters to Doctoral': '',
    Abstract: 'This abstract is present for PDF smoke test coverage.',
    'PhD proposal link (5-10 pages incl. timeframes)': 'https://example.com/proposal.pdf',
  };
}

function sampleMouFormData(): MouFormData {
  return {
    'Student Full Name': 'Ms Jesse Smith',
    'Student Number': '1234567',
    Degree: 'PHD',
    Department: 'Biodiversity & Conservation Biology',
    'First Year of Registration': '2026',
    'Study Mode': 'FULL TIME',
    'Expected Date of Completion': '2029-12-15',
    'Thesis Title': 'Hydroclimate controls on Cnidaria bloom pulses',
    'Brief Description of Project (<200 words)': 'Short project description for PDF smoke test.',
    'Principal Supervisor': 'Prof Bryan Maritz',
    'Principal Supervisor Highest Qualifications': 'PhD',
    'Principal Supervisor Main Responsibilities': 'Guidance and oversight.',
    'Co-supervisor(s)': 'Prof Albertus Smit',
    'Co-supervisor Highest Qualifications': 'PhD',
    'Co-supervisor Main Responsibilities': 'Support and specialist input.',
    'Supervisor Availability Arrangements': 'Weekly meetings',
    'Student Leave Entitlement Per Annum': '15 days',
    'Student Extended Research Away from UWC Arrangements': 'Pre-approved as required',
    'Prescribed Courses/Workshops': 'Research methods',
    'Time Allocation': '80% research',
    'Space Allocation': 'Shared laboratory',
    'Computer Facilities': 'Department workstation',
    'Financial Arrangements for Project': 'Grant funded',
    'Publication Issues': 'Joint authorship policy',
    'Data Ownership': 'UWC policy applies',
    'Supervisor-Student Meetings': 'Weekly',
    'Progress Reports': 'Quarterly',
    'Study Outputs': 'Publications and thesis',
    'Research Visits/Conferences': 'Annual conference',
    'Other Duties': 'Teaching assistantship',
    'Other Expectations': 'Department seminars',
    'Other Issues Relevant to Study': 'None',
    'Student Signature Confirmed': 'Yes',
    'Supervisor Signature Confirmed': 'Yes',
    'Co-supervisor Signature Confirmed': 'Yes',
    'Dept Chair/PG Coord Signature Confirmed': 'Yes',
  };
}

async function assertPdfWritten(filePath: string): Promise<void> {
  const bytes = await fs.readFile(filePath);
  assert.ok(bytes.length > 1000, 'PDF should not be trivially empty');
  assert.equal(bytes.subarray(0, 4).toString('utf8'), '%PDF');
}

test('renderTitleRegistrationPdfDocument writes a valid PDF file', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'rott-pdf-test-'));
  const outFile = path.join(dir, 'title-registration.pdf');
  await renderTitleRegistrationPdfDocument(outFile, sampleRottFormData(), {
    repoRoot: resolveRepoRoot(),
    coSupervisor1Name: 'Albertus Smit',
    coSupervisor2Name: 'Bunny Boo',
  });
  await assertPdfWritten(outFile);
});

test('renderMouPdfDocument writes a valid PDF file', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'mou-pdf-test-'));
  const outFile = path.join(dir, 'mou.pdf');
  await renderMouPdfDocument(outFile, sampleMouFormData());
  await assertPdfWritten(outFile);
});

test('renderPhaseBModulePdfDocument writes a valid PDF file', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'phaseb-pdf-test-'));
  const outFile = path.join(dir, 'phaseb.pdf');
  await renderPhaseBModulePdfDocument(outFile, {
    title: 'Intention to Submit',
    subtitle: 'Generated from canonical workflow payload (policy-aligned rendering)',
    repoRoot: resolveRepoRoot(),
    fields: [
      { label: 'Student Full Name', value: 'Ms Jesse Smith' },
      { label: 'Student Number', value: '1234567' },
      { label: 'Thesis title', value: 'Hydroclimate controls on Cnidaria bloom pulses.' },
      { label: 'Submission type', value: 'Full thesis' },
      { label: 'Supervisor approval status', value: 'Approved' },
      { label: 'Department PG coordinator approval status', value: 'Approved' },
    ],
  });
  await assertPdfWritten(outFile);
});

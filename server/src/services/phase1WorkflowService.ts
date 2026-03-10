import path from 'path';
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import db from '../db/knex';
import type { SasiStudent } from './sasiService';
import { getStudentByNumber } from './sasiService';

const execFileAsync = promisify(execFile);

export type WorkflowStep =
  | 'mou'
  | 'title_registration'
  | 'supervisor_profile'
  | 'examiners';

export interface Phase1Workflow {
  id: number;
  sasi_student_id: number;
  mou_status: 'pending' | 'completed';
  title_registration_status: 'pending' | 'completed';
  supervisor_profile_status: 'pending' | 'completed';
  examiners_status: 'pending' | 'completed';
  last_blocker: string | null;
}

const stepToStatusColumn: Record<WorkflowStep, keyof Phase1Workflow> = {
  mou: 'mou_status',
  title_registration: 'title_registration_status',
  supervisor_profile: 'supervisor_profile_status',
  examiners: 'examiners_status',
};

const stepToTemplate: Record<WorkflowStep, string> = {
  mou: 'MOU 2026.docx',
  title_registration: 'Title Registration 2026.docx',
  supervisor_profile: 'PROSPECTIVE SUPERVISOR PROFILE (ROTT) 2026.docx',
  examiners: 'Appointment of Examiners 2026.docx',
};

async function createWorkflow(studentId: number): Promise<Phase1Workflow> {
  const [id] = await db('phase1_workflows').insert({ sasi_student_id: studentId });
  const created = await db<Phase1Workflow>('phase1_workflows').where({ id }).first();
  if (!created) {
    throw new Error('Failed to create workflow');
  }
  return created;
}

export async function getOrCreateWorkflow(studentNumber: string): Promise<{ student: SasiStudent; workflow: Phase1Workflow }> {
  const student = await getStudentByNumber(studentNumber);
  if (!student) {
    throw new Error('Student not found in SASI demo database');
  }

  let workflow = await db<Phase1Workflow>('phase1_workflows').where({ sasi_student_id: student.id }).first();
  if (!workflow) {
    workflow = await createWorkflow(student.id);
  }

  return { student, workflow };
}

function validateTransition(workflow: Phase1Workflow, step: WorkflowStep): string | null {
  if (step === 'supervisor_profile') {
    if (workflow.mou_status !== 'completed' || workflow.title_registration_status !== 'completed') {
      return 'Supervisor profile can only be completed after both MOU and Title Registration are completed.';
    }
  }

  if (step === 'examiners' && workflow.supervisor_profile_status !== 'completed') {
    return 'Appointment of Examiners can only be completed after Supervisor Profile. Intention to Submit is handled by canonical module flow, not phase1 step flags.';
  }

  return null;
}

export async function markStepCompleted(studentNumber: string, step: WorkflowStep): Promise<{ student: SasiStudent; workflow: Phase1Workflow }> {
  const { student, workflow } = await getOrCreateWorkflow(studentNumber);
  const blocker = validateTransition(workflow, step);
  if (blocker) {
    await db('phase1_workflows').where({ id: workflow.id }).update({ last_blocker: blocker, updated_at: db.fn.now() });
    throw new Error(blocker);
  }

  const statusColumn = stepToStatusColumn[step];
  await db('phase1_workflows')
    .where({ id: workflow.id })
    .update({ [statusColumn]: 'completed', last_blocker: null, updated_at: db.fn.now() });

  const updated = await db<Phase1Workflow>('phase1_workflows').where({ id: workflow.id }).first();
  if (!updated) {
    throw new Error('Workflow not found after update');
  }
  return { student, workflow: updated };
}

function validateTitleRegistrationInput(input: { studentNumber: string; proposedTitle: string; abstract?: string }): string[] {
  const issues: string[] = [];
  if (!input.studentNumber.trim()) {
    issues.push('Student number is required.');
  }
  if (!input.proposedTitle.trim()) {
    issues.push('Proposed thesis title is required.');
  }
  if (input.proposedTitle.trim().length < 10) {
    issues.push('Proposed thesis title is too short.');
  }
  if (input.abstract && input.abstract.trim().length > 8000) {
    issues.push('Abstract is too long.');
  }
  return issues;
}

export async function submitTitleRegistration(input: {
  studentNumber: string;
  proposedTitle: string;
  abstract?: string;
  supervisorUserId?: number;
}): Promise<{ workflow: Phase1Workflow; policyIssues: string[] }> {
  const { workflow, student } = await getOrCreateWorkflow(input.studentNumber);
  const policyIssues = validateTitleRegistrationInput(input);

  if (student.degree_level === 'PHD' && !input.abstract?.trim()) {
    policyIssues.push('PhD title registration requires an abstract/proposal summary.');
  }

  if (policyIssues.length > 0) {
    await db('phase1_workflows')
      .where({ id: workflow.id })
      .update({ last_blocker: policyIssues.join(' '), updated_at: db.fn.now() });
    return { workflow, policyIssues };
  }

  const studentUser = await db('users').where({ sasi_id: input.studentNumber, role: 'student' }).first();
  const supervisorId = input.supervisorUserId ?? 2;

  if (studentUser) {
    await db('title_registrations').insert({
      student_id: studentUser.id,
      supervisor_id: supervisorId,
      proposed_title: input.proposedTitle.trim(),
      abstract: input.abstract?.trim() ?? null,
    });
  }

  await db('sasi_students')
    .where({ id: student.id })
    .update({ thesis_title: input.proposedTitle.trim(), updated_at: db.fn.now() });

  const marked = await markStepCompleted(input.studentNumber, 'title_registration');
  return { workflow: marked.workflow, policyIssues };
}

function buildOutputPdfPath(studentNumber: string, step: WorkflowStep): string {
  const repoRoot = resolveRepoRoot();
  const outDir = path.join(repoRoot, 'generated_forms', studentNumber);
  return path.join(outDir, `${step}.pdf`);
}

function resolveRepoRoot(): string {
  const candidates = [
    path.resolve(process.cwd()),
    path.resolve(process.cwd(), '..'),
    path.resolve(__dirname, '../../..'),
    path.resolve(__dirname, '../../../..'),
  ];

  for (const candidate of candidates) {
    if (existsSync(path.join(candidate, 'ridiculous_forms'))) {
      return candidate;
    }
  }

  throw new Error('Unable to locate repository root containing ridiculous_forms');
}

export async function generateStepPdf(studentNumber: string, step: WorkflowStep): Promise<{ outputPdf: string; sourceDocx: string }> {
  const { workflow } = await getOrCreateWorkflow(studentNumber);
  const blocker = validateTransition(workflow, step);
  if (blocker && step !== 'mou' && step !== 'title_registration') {
    throw new Error(blocker);
  }

  const repoRoot = resolveRepoRoot();
  const formsDir = path.join(repoRoot, 'ridiculous_forms');
  const sourceDocx = path.join(formsDir, stepToTemplate[step]);
  const outputPdf = buildOutputPdfPath(studentNumber, step);
  const outDir = path.dirname(outputPdf);

  await fs.mkdir(outDir, { recursive: true });

  const script = `
set inFile to POSIX file "${sourceDocx}"
set outFile to "${outputPdf}"
tell application "Microsoft Word"
  open inFile read only true
  set theDoc to active document
  save as theDoc file name outFile file format format PDF
  close theDoc saving no
end tell
`;

  try {
    await execFileAsync('osascript', ['-e', script], { timeout: 20000 });
  } catch (error) {
    // Fallback keeps exact template formatting by duplicating the maintained canonical PDF template.
    const templatePdf = sourceDocx.replace(/\.docx$/i, '.pdf');
    if (!existsSync(templatePdf)) {
      throw error;
    }
    await fs.copyFile(templatePdf, outputPdf);
  }

  await db('generated_documents').insert({
    workflow_id: workflow.id,
    step_key: step,
    source_docx: sourceDocx,
    output_pdf: outputPdf,
  });

  return { outputPdf, sourceDocx };
}

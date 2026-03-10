import { Request, Response } from 'express';
import {
  generateStepPdf,
  getOrCreateWorkflow,
  markStepCompleted,
  submitTitleRegistration,
  type WorkflowStep,
} from '../services/phase1WorkflowService';
import { toAppError } from '../errors/httpErrors';

function handleControllerError(
  res: Response,
  error: unknown,
  fallback: { statusCode: number; code: string; message: string },
): void {
  const appError = toAppError(error, fallback);
  const message = appError.exposeMessage ? appError.message : fallback.message;
  res.status(appError.statusCode).json({ message, code: appError.code, details: appError.details });
}

function parseStep(step: string): WorkflowStep | null {
  const allowed: WorkflowStep[] = ['mou', 'title_registration', 'supervisor_profile', 'examiners'];
  return allowed.includes(step as WorkflowStep) ? (step as WorkflowStep) : null;
}

export async function getWorkflow(req: Request, res: Response): Promise<void> {
  try {
    const { studentNumber } = req.params;
    const result = await getOrCreateWorkflow(studentNumber);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 404, code: 'phase1_workflow_fetch_failed', message: 'Workflow or student not found.' });
  }
}

export async function completeStep(req: Request, res: Response): Promise<void> {
  try {
    const { studentNumber } = req.params;
    if (req.params.step === 'intention_to_submit') {
      res.status(410).json({ message: 'Legacy phase1 intention_to_submit step is retired. Use canonical INTENTION_TO_SUBMIT module flow.' });
      return;
    }
    const step = parseStep(req.params.step);
    if (!step) {
      res.status(400).json({ message: 'Invalid workflow step' });
      return;
    }

    const result = await markStepCompleted(studentNumber, step);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'phase1_step_complete_failed', message: 'Failed to complete step.' });
  }
}

export async function createTitleRegistration(req: Request, res: Response): Promise<void> {
  try {
    const studentNumber = typeof req.body.studentNumber === 'string' ? req.body.studentNumber : '';
    const proposedTitle = typeof req.body.proposedTitle === 'string' ? req.body.proposedTitle : '';
    const abstract = typeof req.body.abstract === 'string' ? req.body.abstract : undefined;

    const result = await submitTitleRegistration({
      studentNumber,
      proposedTitle,
      abstract,
    });

    if (result.policyIssues.length > 0) {
      res.status(422).json({ message: 'Validation failed', policyIssues: result.policyIssues, workflow: result.workflow });
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 500, code: 'phase1_title_registration_failed', message: 'Failed to submit title registration.' });
  }
}

export async function generatePdf(req: Request, res: Response): Promise<void> {
  try {
    const { studentNumber } = req.params;
    if (req.params.step === 'intention_to_submit') {
      res.status(410).json({ message: 'Legacy phase1 intention_to_submit step is retired. Use canonical INTENTION_TO_SUBMIT module flow.' });
      return;
    }
    const step = parseStep(req.params.step);
    if (!step) {
      res.status(400).json({ message: 'Invalid workflow step' });
      return;
    }

    const result = await generateStepPdf(studentNumber, step);
    res.status(200).json(result);
  } catch (error) {
    handleControllerError(res, error, { statusCode: 400, code: 'phase1_pdf_generate_failed', message: 'Failed to generate PDF.' });
  }
}

import express from 'express';
import {
  completeStep,
  createTitleRegistration,
  generatePdf,
  getWorkflow,
} from '../../../controllers/phase1Controller';
import { requireAuth } from '../../../middleware/auth';
import { validateBody, validateParams } from '../../../middleware/requestValidation';
import {
  phase1StepParamSchema,
  phase1TitleRegistrationBodySchema,
  studentNumberParamSchema,
} from '../../../validation/requestSchemas';

const router = express.Router();

router.get('/workflows/:studentNumber', requireAuth, validateParams(studentNumberParamSchema), getWorkflow);
router.post('/workflows/:studentNumber/steps/:step/complete', requireAuth, validateParams(studentNumberParamSchema.merge(phase1StepParamSchema)), completeStep);
router.post('/title-registrations', requireAuth, validateBody(phase1TitleRegistrationBodySchema), createTitleRegistration);
router.post('/workflows/:studentNumber/steps/:step/generate-pdf', requireAuth, validateParams(studentNumberParamSchema.merge(phase1StepParamSchema)), generatePdf);

export default router;

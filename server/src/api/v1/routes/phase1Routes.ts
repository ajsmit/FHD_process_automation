import express from 'express';
import {
  completeStep,
  createTitleRegistration,
  generatePdf,
  getWorkflow,
} from '../../../controllers/phase1Controller';
import { requireAuth } from '../../../middleware/auth';

const router = express.Router();

router.get('/workflows/:studentNumber', requireAuth, getWorkflow);
router.post('/workflows/:studentNumber/steps/:step/complete', requireAuth, completeStep);
router.post('/title-registrations', requireAuth, createTitleRegistration);
router.post('/workflows/:studentNumber/steps/:step/generate-pdf', requireAuth, generatePdf);

export default router;

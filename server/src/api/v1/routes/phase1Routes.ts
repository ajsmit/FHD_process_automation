import express from 'express';
import {
  completeStep,
  createTitleRegistration,
  generatePdf,
  getWorkflow,
} from '../../../controllers/phase1Controller';

const router = express.Router();

router.get('/workflows/:studentNumber', getWorkflow);
router.post('/workflows/:studentNumber/steps/:step/complete', completeStep);
router.post('/title-registrations', createTitleRegistration);
router.post('/workflows/:studentNumber/steps/:step/generate-pdf', generatePdf);

export default router;

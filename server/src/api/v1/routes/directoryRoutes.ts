import express from 'express';
import {
  getDepartments,
  getExternalAcademicInviteByToken,
  getExternalAcademics,
  getStaff,
  postCompleteExternalAcademicInvite,
  postExternalAcademicInvite,
} from '../../../controllers/directoryController';
import { requireAuth } from '../../../middleware/auth';
import { validateBody, validateParams, validateQuery } from '../../../middleware/requestValidation';
import {
  directoryQuerySchema,
  externalInviteCompleteBodySchema,
  externalInviteCreateBodySchema,
  tokenParamSchema,
} from '../../../validation/requestSchemas';

const router = express.Router();

router.get('/departments', requireAuth, validateQuery(directoryQuerySchema), getDepartments);
router.get('/staff', requireAuth, validateQuery(directoryQuerySchema), getStaff);
router.get('/external-academics', requireAuth, validateQuery(directoryQuerySchema), getExternalAcademics);
router.get('/external-supervisors', requireAuth, validateQuery(directoryQuerySchema), getExternalAcademics);
router.post('/external-academics/invite', requireAuth, validateBody(externalInviteCreateBodySchema), postExternalAcademicInvite);
router.get('/external-academics/invites/:token', validateParams(tokenParamSchema), getExternalAcademicInviteByToken);
router.post('/external-academics/invites/:token/complete', validateParams(tokenParamSchema), validateBody(externalInviteCompleteBodySchema), postCompleteExternalAcademicInvite);

export default router;

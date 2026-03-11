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
import { requireRoles } from '../../../middleware/roleAuthorization';
import { validateBody, validateParams, validateQuery } from '../../../middleware/requestValidation';
import {
  directoryQuerySchema,
  externalInviteCompleteBodySchema,
  externalInviteCreateBodySchema,
  tokenParamSchema,
} from '../../../validation/requestSchemas';

const router = express.Router();

router.get('/departments', requireAuth, requireRoles(['supervisor', 'dept_hd_rep', 'dept_chairperson', 'faculty_hd_rep', 'system_admin', 'admin']), validateQuery(directoryQuerySchema), getDepartments);
router.get('/staff', requireAuth, requireRoles(['supervisor', 'dept_hd_rep', 'dept_chairperson', 'faculty_hd_rep', 'system_admin', 'admin']), validateQuery(directoryQuerySchema), getStaff);
router.get('/external-academics', requireAuth, requireRoles(['supervisor', 'dept_hd_rep', 'faculty_hd_rep', 'system_admin', 'admin']), validateQuery(directoryQuerySchema), getExternalAcademics);
router.get('/external-supervisors', requireAuth, requireRoles(['supervisor', 'dept_hd_rep', 'faculty_hd_rep', 'system_admin', 'admin']), validateQuery(directoryQuerySchema), getExternalAcademics);
router.post('/external-academics/invite', requireAuth, requireRoles(['student', 'dept_hd_rep', 'system_admin', 'admin']), validateBody(externalInviteCreateBodySchema), postExternalAcademicInvite);
router.get('/external-academics/invites/:token', validateParams(tokenParamSchema), getExternalAcademicInviteByToken);
router.post('/external-academics/invites/:token/complete', validateParams(tokenParamSchema), validateBody(externalInviteCompleteBodySchema), postCompleteExternalAcademicInvite);

export default router;

import express from 'express';
import * as titleRegistrationController from '../../../controllers/titleRegistrationController';
import { requireAuth } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roleAuthorization';
import { validateBody, validateParams } from '../../../middleware/requestValidation';
import { idParamSchema, titleRegistrationCreateBodySchema } from '../../../validation/requestSchemas';

const router = express.Router();

router.post('/', requireAuth, requireRoles(['system_admin', 'admin']), validateBody(titleRegistrationCreateBodySchema), titleRegistrationController.createTitleRegistration);
router.get('/', requireAuth, requireRoles(['system_admin', 'admin']), titleRegistrationController.getAllTitleRegistrations);
router.get('/:id', requireAuth, requireRoles(['system_admin', 'admin']), validateParams(idParamSchema), titleRegistrationController.getTitleRegistrationById);

export default router;

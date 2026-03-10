import express from 'express';
import * as titleRegistrationController from '../../../controllers/titleRegistrationController';
import { requireAuth } from '../../../middleware/auth';
import { validateBody, validateParams } from '../../../middleware/requestValidation';
import { idParamSchema, titleRegistrationCreateBodySchema } from '../../../validation/requestSchemas';

const router = express.Router();

router.post('/', requireAuth, validateBody(titleRegistrationCreateBodySchema), titleRegistrationController.createTitleRegistration);
router.get('/', requireAuth, titleRegistrationController.getAllTitleRegistrations);
router.get('/:id', requireAuth, validateParams(idParamSchema), titleRegistrationController.getTitleRegistrationById);

export default router;

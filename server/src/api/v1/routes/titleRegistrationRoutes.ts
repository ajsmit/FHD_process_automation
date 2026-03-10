import express from 'express';
import * as titleRegistrationController from '../../../controllers/titleRegistrationController';
import { requireAuth } from '../../../middleware/auth';

const router = express.Router();

router.post('/', requireAuth, titleRegistrationController.createTitleRegistration);
router.get('/', requireAuth, titleRegistrationController.getAllTitleRegistrations);
router.get('/:id', requireAuth, titleRegistrationController.getTitleRegistrationById);

export default router;

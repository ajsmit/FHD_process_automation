import express from 'express';
import * as titleRegistrationController from '../../../controllers/titleRegistrationController';

const router = express.Router();

router.post('/', titleRegistrationController.createTitleRegistration);
router.get('/', titleRegistrationController.getAllTitleRegistrations);
router.get('/:id', titleRegistrationController.getTitleRegistrationById);

export default router;

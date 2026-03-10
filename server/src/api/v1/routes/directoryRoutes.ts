import express from 'express';
import {
  getDepartments,
  getExternalAcademicInviteByToken,
  getExternalAcademics,
  getStaff,
  postCompleteExternalAcademicInvite,
  postExternalAcademicInvite,
} from '../../../controllers/directoryController';

const router = express.Router();

router.get('/departments', getDepartments);
router.get('/staff', getStaff);
router.get('/external-academics', getExternalAcademics);
router.get('/external-supervisors', getExternalAcademics);
router.post('/external-academics/invite', postExternalAcademicInvite);
router.get('/external-academics/invites/:token', getExternalAcademicInviteByToken);
router.post('/external-academics/invites/:token/complete', postCompleteExternalAcademicInvite);

export default router;

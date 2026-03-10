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

const router = express.Router();

router.get('/departments', requireAuth, getDepartments);
router.get('/staff', requireAuth, getStaff);
router.get('/external-academics', requireAuth, getExternalAcademics);
router.get('/external-supervisors', requireAuth, getExternalAcademics);
router.post('/external-academics/invite', requireAuth, postExternalAcademicInvite);
router.get('/external-academics/invites/:token', getExternalAcademicInviteByToken);
router.post('/external-academics/invites/:token/complete', postCompleteExternalAcademicInvite);

export default router;

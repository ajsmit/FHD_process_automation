import express from 'express';
import { getMe, postDevLogin } from '../../../controllers/authController';
import { requireAuth } from '../../../middleware/auth';

const router = express.Router();

router.post('/dev-login', postDevLogin);
router.get('/me', requireAuth, getMe);

export default router;


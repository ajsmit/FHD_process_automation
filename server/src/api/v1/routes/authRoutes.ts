import express from 'express';
import {
  getMe,
  postDevLogin,
  postLogin,
  postProviderLogin,
  postLogout,
  postLogoutAll,
  postRefresh,
} from '../../../controllers/authController';
import { requireAuth } from '../../../middleware/auth';
import { createRateLimit } from '../../../middleware/rateLimit';

const router = express.Router();

const authWindowMs = Number.parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS ?? '60000', 10);
const authMax = Number.parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS ?? '20', 10);
const windowMs = Number.isFinite(authWindowMs) && authWindowMs > 0 ? authWindowMs : 60000;
const maxRequests = Number.isFinite(authMax) && authMax > 0 ? authMax : 20;

const loginRateLimit = createRateLimit({
  windowMs,
  maxRequests,
  message: 'Too many authentication attempts. Please try again later.',
  keyPrefix: 'auth:login',
});

const refreshRateLimit = createRateLimit({
  windowMs,
  maxRequests,
  message: 'Too many refresh attempts. Please try again later.',
  keyPrefix: 'auth:refresh',
});

router.post(
  '/dev-login',
  loginRateLimit,
  postDevLogin,
);
router.post('/login', loginRateLimit, postLogin);
router.post('/provider-login', loginRateLimit, postProviderLogin);
router.post('/refresh', refreshRateLimit, postRefresh);
router.post('/logout', requireAuth, postLogout);
router.post('/logout-all', requireAuth, postLogoutAll);
router.get('/me', requireAuth, getMe);

export default router;

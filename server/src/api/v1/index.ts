import express from 'express';
import titleRegistrationRoutes from './routes/titleRegistrationRoutes';
import sasiRoutes from './routes/sasiRoutes';
import phase1Routes from './routes/phase1Routes';
import titleRegistrationWorkflowRoutes from './routes/titleRegistrationWorkflowRoutes';
import directoryRoutes from './routes/directoryRoutes';
import authRoutes from './routes/authRoutes';

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

function legacyEnabled(): boolean {
  const env = (process.env.ENABLE_LEGACY_PHASE1 ?? 'false').trim().toLowerCase();
  return env === 'true';
}

// Mount title registration routes
router.use('/sasi', sasiRoutes);
router.use('/title-registration', titleRegistrationWorkflowRoutes);
router.use('/directory', directoryRoutes);
router.use('/auth', authRoutes);

if (legacyEnabled()) {
  router.use('/title-registrations', titleRegistrationRoutes);
  router.use('/phase1', phase1Routes);
} else {
  router.use('/title-registrations', (_req, res) => {
    res.status(410).json({ message: 'Legacy endpoint disabled. Use /api/v1/title-registration.' });
  });
  router.use('/phase1', (_req, res) => {
    res.status(410).json({ message: 'Legacy phase1 endpoints are disabled.' });
  });
}


export default router;

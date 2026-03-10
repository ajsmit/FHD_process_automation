import express from 'express';
import { searchSasiStudents } from '../../../controllers/sasiController';
import { requireAuth } from '../../../middleware/auth';

const router = express.Router();

router.get('/students/search', requireAuth, searchSasiStudents);

export default router;

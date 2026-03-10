import express from 'express';
import { searchSasiStudents } from '../../../controllers/sasiController';
import { requireAuth } from '../../../middleware/auth';
import { validateQuery } from '../../../middleware/requestValidation';
import { sasiSearchQuerySchema } from '../../../validation/requestSchemas';

const router = express.Router();

router.get('/students/search', requireAuth, validateQuery(sasiSearchQuerySchema), searchSasiStudents);

export default router;

import express from 'express';
import { searchSasiStudents } from '../../../controllers/sasiController';
import { requireAuth } from '../../../middleware/auth';
import { requireRoles } from '../../../middleware/roleAuthorization';
import { validateQuery } from '../../../middleware/requestValidation';
import { sasiSearchQuerySchema } from '../../../validation/requestSchemas';

const router = express.Router();

router.get('/students/search', requireAuth, requireRoles(['supervisor', 'dept_hd_rep', 'dept_chairperson', 'faculty_hd_rep', 'system_admin', 'admin']), validateQuery(sasiSearchQuerySchema), searchSasiStudents);

export default router;

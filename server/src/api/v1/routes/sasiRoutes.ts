import express from 'express';
import { searchSasiStudents } from '../../../controllers/sasiController';

const router = express.Router();

router.get('/students/search', searchSasiStudents);

export default router;

import express from 'express';
import { createReport } from '../controllers/reportController.js';

const router = express.Router();

// Şikayet ekleme rotası (Şimdilik test için güvenlik duvarı koymadık)
router.post('/add', createReport);

export default router;

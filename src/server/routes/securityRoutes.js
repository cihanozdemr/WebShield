// src/server/routes/securityRoutes.js
import express from 'express';
import { analyzeUrl } from '../controllers/securityController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // 1. Güvenlik görevlisini import ettik

const router = express.Router();

// 2. DİKKAT: authMiddleware fonksiyonunu tam araya koyuyoruz!
// Artık middleware'den (güvenlikten) geçemeyen istek analyzeUrl'ye ulaşamaz.
router.post('/analyze', authMiddleware, analyzeUrl);

export default router;

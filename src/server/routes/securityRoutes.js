// src/server/routes/securityRoutes.js
import express from 'express';
import { analyzeUrl } from '../controllers/securityController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/analyze', authMiddleware, analyzeUrl);

export default router;

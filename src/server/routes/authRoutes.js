// src/server/routes/authRoutes.js
import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Sadece login işlemi için rotamız
router.post('/login', login);

export default router;

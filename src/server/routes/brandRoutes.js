import express from 'express';
import { addBrand } from '../controllers/brandController.js';

const router = express.Router();

router.post('/add', addBrand);

export default router;

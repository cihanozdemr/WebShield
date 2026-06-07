import express from 'express';
import { scanTargetUrl } from '../controllers/scanController.js';

const router = express.Router();

router.post('/', scanTargetUrl);

export default router;

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { scanLimiter } from './middleware/rateLimiter.js';

import express from 'express';
import cors from 'cors';
import securityRoutes from './routes/securityRoutes.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './config/db.js';
import brandRoutes from './routes/brandRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import scanRoutes from './routes/scanRoutes.js';

const app = express();

// 1. Ayarlar (Middleware)
app.use(cors());
app.use(express.json());

connectDB();

// 2. Rotaları Sisteme Bağla
// "/api" ile başlayan tüm istekleri securityRoutes'a gönder
app.use('/api', securityRoutes);
app.use('/auth', authRoutes); // 2. BURAYI EKLE: /auth isteklerini authRoutes'a yönlendir
app.use('/report',scanLimiter, reportRoutes);
app.use('/scan', scanLimiter,scanRoutes); // Alttaki app.use kısımlarının arasına

app.use('/brand', brandRoutes);


// 3. Sunucuyu Başlat
app.listen(3000, () => {
  console.log('🚀 Sentinel Core Server is running on port 3000...');
});

import rateLimit from 'express-rate-limit';

export const scanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    status: 'error',
    message:
      'Çok fazla tarama isteği gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

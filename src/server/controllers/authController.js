// src/controllers/authController.js
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  // 1. Şifre içine gömeceğimiz bilgi (Payload)
  const payload = { role: 'extension_client', app: 'WebShield' };

  // 2. Gizli Anahtarımız (İleride bunu .env dosyasına alacağız, şimdilik burada kalsın)
  const secretKey = 'super-secret-key';

  // 3. Token'ı oluştur (1 saat geçerli olacak)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  res.json({
    status: 'success',
    message: 'Token başarıyla oluşturuldu.',
    token: token,
  });
};

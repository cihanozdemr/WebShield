// src/controllers/authController.js
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
  const payload = { role: 'extension_client', app: 'WebShield' };

  const secretKey = 'super-secret-key';

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  res.json({
    status: 'success',
    message: 'Token başarıyla oluşturuldu.',
    token: token,
  });
};

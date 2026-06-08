// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Erişim Reddedildi: Token bulunamadı veya format hatalı.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secretKey = 'super-secret-key';

    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      message: 'Geçersiz veya süresi dolmuş token!',
    });
  }
};

export default authMiddleware;

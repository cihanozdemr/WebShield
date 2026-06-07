// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // 1. Header'da "Bearer <token>" formatında bir veri var mı?
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Erişim Reddedildi: Token bulunamadı veya format hatalı.',
    });
  }

  // 2. "Bearer " kısmını atıp sadece token metnini alıyoruz
  const token = authHeader.split(' ')[1];

  try {
    const secretKey = 'super-secret-key'; // Token üretirken kullandığımız anahtarın aynısı

    // 3. Token sahte mi veya süresi dolmuş mu kontrol et
    const decoded = jwt.verify(token, secretKey);

    // Eğer her şey tamamsa, şifresi çözülen veriyi isteğin içine koy ve kapıyı aç (next)
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

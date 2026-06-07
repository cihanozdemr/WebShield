import Report from '../models/Report.js';

export const createReport = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ status: 'error', message: 'URL eksik!' });
    }

    // Gelen URL'yi veritabanına kaydediyoruz
    const newReport = await Report.create({
      reportedUrl: url,
      reportedBy: 'eklenti_test_kullanicisi',
      status: 'PENDING',
    });

    res.status(201).json({
      status: 'success',
      message: 'Şikayet başarıyla veritabanına kaydedildi!',
      data: newReport,
    });
  } catch (error) {
    console.error('Veritabanı Hatası:', error);
    res.status(500).json({ status: 'error', message: 'Sunucu hatası oluştu.' });
  }
};

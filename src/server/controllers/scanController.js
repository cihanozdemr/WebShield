import { analyzeUrl } from '../services/analyzer.js';

export const scanTargetUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Taranacak URL eksik!' });
    }

    const analysisResult = await analyzeUrl(url);

    res.status(200).json({
      status: 'success',
      data: analysisResult,
    });
  } catch (error) {
    console.error('Tarama Hatası:', error);
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Analiz sırasında sunucu hatası oluştu.',
      });
  }
};

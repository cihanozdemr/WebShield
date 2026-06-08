// src/controllers/securityController.js

export const analyzeUrl = (req, res) => {
  if (!req.body || !req.body.url) {
    return res.status(400).json({
      status: 'error',
      message: "JSON verisi okunamadı veya 'url' parametresi eksik gönderildi.",
    });
  }

  const receivedUrl = req.body.url;

  console.log('-> [CONTROLLER] Received URL from client:', receivedUrl);

  res.json({
    status: 'success',
    message: 'Controller says: URL processed successfully!',
    analyzedUrl: receivedUrl,
  });
};

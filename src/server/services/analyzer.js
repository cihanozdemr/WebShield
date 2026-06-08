import {
  checkGoogleSafeBrowsing,
  checkVirusTotal,
} from './threatIntelligence.js';

export const analyzeUrl = async (url) => {
  let riskScore = 0;
  let threats = [];


  if (url.length > 75) {
    riskScore += 15;
    threats.push('Şüpheli derecede uzun URL.');
  }

  if (url.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
    riskScore += 30;
    threats.push('Alan adı yerine doğrudan IP adresi kullanılmış.');
  }

  if ((url.match(/\./g) || []).length > 3) {
    riskScore += 20;
    threats.push('Çok fazla alt alan adı (subdomain) içeriyor.');
  }

  if (url.includes('@')) {
    riskScore += 25;
    threats.push("URL içinde tehlikeli '@' karakteri tespit edildi.");
  }


  const [googleResult, vtResult] = await Promise.all([
    checkGoogleSafeBrowsing(url),
    checkVirusTotal(url),
  ]);

  if (googleResult.isMalicious) {
    riskScore += 100;
    threats.push('Google Safe Browsing bu siteyi ZARARLI olarak işaretledi!');
  }

  if (vtResult.isMalicious) {
    riskScore += 100;
    threats.push(`VirusTotal bu siteyi ZARARLI olarak işaretledi!`);
  }

  riskScore = Math.min(riskScore, 100);


  let riskLevel = 'SAFE'; // Güvenli
  if (riskScore > 0) riskLevel = 'LOW'; // Düşük Risk
  if (riskScore > 35) riskLevel = 'MEDIUM'; // Orta Risk
  if (riskScore > 75) riskLevel = 'HIGH'; // Yüksek Risk (Kritik)

  return {
    scannedUrl: url,
    riskScore,
    riskLevel,
    threats,
  };
};

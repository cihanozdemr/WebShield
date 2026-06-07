import {
  checkGoogleSafeBrowsing,
  checkVirusTotal,
} from './threatIntelligence.js';

export const analyzeUrl = async (url) => {
  let riskScore = 0;
  let threats = [];

  // --- 1. AŞAMA: KENDİ KURALLARIMIZ (Heuristic Analysis) ---
  // URL çok uzunsa şüphelidir (Phishing siteleri genelde uzun ve karmaşıktır)
  if (url.length > 75) {
    riskScore += 15;
    threats.push('Şüpheli derecede uzun URL.');
  }

  // Domain yerine IP adresi kullanılmışsa (örn: http://192.168.1.1/login)
  if (url.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)) {
    riskScore += 30;
    threats.push('Alan adı yerine doğrudan IP adresi kullanılmış.');
  }

  // Çok fazla alt alan adı (subdomain) varsa (örn: login.apple.com.secure-update.net)
  if ((url.match(/\./g) || []).length > 3) {
    riskScore += 20;
    threats.push('Çok fazla alt alan adı (subdomain) içeriyor.');
  }

  // URL içinde '@' işareti varsa (Tarayıcıları kandırmak için kullanılır)
  if (url.includes('@')) {
    riskScore += 25;
    threats.push("URL içinde tehlikeli '@' karakteri tespit edildi.");
  }

  // --- 2. AŞAMA: DIŞ İSTİHBARAT (Google & VirusTotal) ---
  // İki ajanı da aynı anda (paralel) çalıştırıyoruz ki hız kaybetmeyelim
  const [googleResult, vtResult] = await Promise.all([
    checkGoogleSafeBrowsing(url),
    checkVirusTotal(url),
  ]);

  if (googleResult.isMalicious) {
    riskScore += 100; // Direkt kırmızı alarm
    threats.push('Google Safe Browsing bu siteyi ZARARLI olarak işaretledi!');
  }

  if (vtResult.isMalicious) {
    riskScore += 100; // Direkt kırmızı alarm
    threats.push(`VirusTotal bu siteyi ZARARLI olarak işaretledi!`);
  }

  // Skoru maksimum 100'de sınırla
  riskScore = Math.min(riskScore, 100);

  // Skora göre seviye belirle
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

import axios from 'axios';

export const checkGoogleSafeBrowsing = async (url) => {
  try {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_KEY;
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    const payload = {
      client: {
        clientId: 'webshield',
        clientVersion: '1.0.0',
      },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url: url }],
      },
    };

    const response = await axios.post(apiUrl, payload);

    if (response.data && response.data.matches) {
      return {
        isMalicious: true,
        details: response.data.matches,
        source: 'Google Safe Browsing',
      };
    }

    return { isMalicious: false, source: 'Google Safe Browsing' };
  } catch (error) {
    return {
      isMalicious: false,
      error: 'API Request Failed',
      source: 'Google Safe Browsing',
    };
  }
};

export const checkVirusTotal = async (url) => {
  try {
    const apiKey = process.env.VIRUSTOTAL_API_KEY;
    const encodedUrl = Buffer.from(url).toString('base64').replace(/=/g, '');
    const apiUrl = `https://www.virustotal.com/api/v3/urls/${encodedUrl}`;

    const response = await axios.get(apiUrl, {
      headers: {
        'x-apikey': apiKey,
      },
    });

    const stats = response.data.data.attributes.last_analysis_stats;

    if (stats.malicious > 0 || stats.phishing > 0) {
      return { isMalicious: true, details: stats, source: 'VirusTotal' };
    }

    return { isMalicious: false, source: 'VirusTotal' };
  } catch (error) {
    return {
      isMalicious: false,
      error: 'API Request Failed',
      source: 'VirusTotal',
    };
  }
};

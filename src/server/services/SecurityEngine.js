class SecurityEngine {
  constructor() {
    this.popularBrands = ['paypal', 'facebook', 'google', 'amazon', 'netflix'];
  }

  calculateDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] =
          b.charAt(i - 1) === a.charAt(j - 1)
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j - 1] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j] + 1,
              );
      }
    }
    return matrix[b.length][a.length];
  }

  analyze(url) {
    const domain = url
      .replace(/(^\w+:|^)\/\//, '')
      .split('/')[0]
      .split('.')[0]
      .toLowerCase();

    let isSuspicious = false;
    let matchedBrand = null;

    for (const brand of this.popularBrands) {
      const distance = this.calculateDistance(domain, brand);
      if (distance > 0 && distance <= 2) {
        isSuspicious = true;
        matchedBrand = brand;
        break;
      }
    }

    return {
      isSuspicious: isSuspicious,
      riskScore: isSuspicious ? 80 : 10,
      message: isSuspicious
        ? `Uyarı: ${domain} domain'i ${matchedBrand} markasını taklit ediyor olabilir!`
        : 'Güvenli görünüyor.',
    };
  }
}

// ESM yapısında export default kullanıyoruz
export default new SecurityEngine();

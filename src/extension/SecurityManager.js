// extension/js/SecurityManager.js
export async function analyzeUrl(url, token) {
  const response = await fetch('http://localhost:3000/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url }),
  });
  return await response.json();
}

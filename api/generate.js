export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح GEMINI_API_KEY غير متوفر في إعدادات Vercel' });
  }

  // قائمة نماذج Gemini المتاحة للتنقل التلقائي عند وجود ضغط
  const MODELS = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ];

  let resultText = null;
  let lastError = null;

  for (const model of MODELS) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: String(promptText) }]
            }
          ]
        }),
      });

      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        resultText = data.candidates[0].content.parts[0].text;
        break; // نجح التوليد، اخرج من الحلقة فوراً
      } else {
        lastError = data.error?.message || 'النموذج مشغول حالياً';
      }
    } catch (err) {
      lastError = err.message;
    }
  }

  if (!resultText) {
    return res.status(503).json({ error: 'الخوادم عليها ضغط حالياً، يرجى المحاولة بعد بضع ثوانٍ.' });
  }

  return res.status(200).json({ result: resultText });
}

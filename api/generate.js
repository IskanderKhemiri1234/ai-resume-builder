export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح GEMINI_API_KEY غير متوفر في إعدادات Vercel' });
  }

  // مصفوفة النماذج الرسمية المجانية والأسرع استجابة
  const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of MODELS) {
    // محاولة الاستدعاء مع إمكانية التكرار التلقائي في حال الضغط اللحظي
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: String(promptText) }] }]
            })
          }
        );

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          return res.status(200).json({ result: data.candidates[0].content.parts[0].text });
        }

        // إذا كان هناك ضغط، انتظر ثانية واحدة ثم أعد المحاولة
        if (response.status === 429 || response.status === 503) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      } catch (err) {
        console.warn(`Attempt failed for ${model}:`, err);
      }
    }
  }

  return res.status(503).json({
    error: 'تعذر الاتصال بمركز الذكاء الاصطناعي حالياً، يرجى إعادة الضغط على الزر فوراً.'
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.OPENROUTER_API_KEY;

  // 1. التحقق من وجود المفتاح في Vercel
  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير مضاف نهائياً في Vercel!' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
        messages: [{ role: 'user', content: String(promptText) }],
      }),
    });

    const data = await response.json();

    // 2. إرجاع نص الخطأ الأصلي القادم من المزود فوراً لتعرف المشكلة بالضبط
    if (!response.ok) {
      return res.status(400).json({ 
        error: `خطأ من OpenRouter (${response.status}): ${data.error?.message || JSON.stringify(data)}` 
      });
    }

    const resultText = data.choices?.[0]?.message?.content;

    if (!resultText) {
      return res.status(500).json({ error: 'الاستجابة فارغة من النموذج' });
    }

    return res.status(200).json({ result: resultText });

  } catch (error) {
    return res.status(500).json({ error: `خطأ في الكود الداخلي: ${error.message}` });
  }
}

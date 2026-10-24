export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // استلام البيانات وتأكيد قراءة النص
  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح GEMINI_API_KEY غير متوفر في إعدادات Vercel' });
  }

  if (!promptText || promptText === '{}') {
    return res.status(400).json({ error: 'لم يتم إرسال بيانات السيرة الذاتية بشكل صحيح' });
  }

  try {
    // الاتصال المباشر بـ Google Gemini API مع ضبط التنسيق الصحيح
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: String(promptText)
              }
            ]
          }
        ]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'خطأ في الاستجابة من Google Gemini');
    }

    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      throw new Error('لم يتم استلام نص من النموذج');
    }

    return res.status(200).json({ result: resultText });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

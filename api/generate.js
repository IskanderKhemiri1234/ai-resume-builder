export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح API غير متوفر في إعدادات Vercel' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://resumaker-ai.vercel.app',
        'X-Title': 'ResuMaker AI',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          { 
            role: 'user', 
            content: `قم بصياغة سيرة ذاتية احترافية ومرتبة باللغة العربية بناءً على المعطيات التالية:\n${promptText}` 
          }
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'خطأ في الاتصال بالخدمة');
    }

    const resultText = data.choices?.[0]?.message?.content;

    if (!resultText) {
      throw new Error('لم يتم استلام رد من النموذج');
    }

    return res.status(200).json({ result: resultText });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://khemiri-resumaker-ai.vercel.app',
        'X-Title': 'ResuMaker AI',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'خطأ من مزود الذكاء الاصطناعي');
    }

    const resultText = data.choices?.[0]?.message?.content;
    
    if (!resultText) {
      throw new Error('لم يتم استلام نص من النموذج');
    }

    return res.status(200).json({ result: resultText });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

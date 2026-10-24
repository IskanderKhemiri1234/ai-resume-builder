export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const geminiKey = process.env.GEMINI_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (!geminiKey && !openrouterKey) {
    return res.status(500).json({ error: 'لم يتم العثور على أي مفتاح API في إعدادات Vercel' });
  }

  // 1. المحاولة الأولى: Google Gemini API المباشر
  if (geminiKey) {
    const geminiModels = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    for (const model of geminiModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
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
      } catch (e) {
        console.warn(`Gemini ${model} failed, moving to next option...`);
      }
    }
  }

  // 2. المحاولة الثانية: OpenRouter (خط دفاع احتياطي متكامل)
  if (openrouterKey) {
    const openrouterModels = [
      'meta-llama/llama-3.3-70b-instruct:free',
      'deepseek/deepseek-r1:free',
      'qwen/qwen-2.5-coder-32b-instruct:free'
    ];

    for (const model of openrouterModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openrouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://resumaker-ai.vercel.app',
            'X-Title': 'ResuMaker AI',
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: String(promptText) }],
          }),
        });

        const data = await response.json();
        if (response.ok && data.choices?.[0]?.message?.content) {
          return res.status(200).json({ result: data.choices[0].message.content });
        }
      } catch (e) {
        console.warn(`OpenRouter ${model} failed, trying next...`);
      }
    }
  }

  return res.status(503).json({
    error: 'جميع السيرفرات مشغولة حالياً، يرجى النقر مرة أخرى فوراً.'
  });
}

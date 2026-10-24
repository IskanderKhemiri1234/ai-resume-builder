export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
  }

  // قائمة بأقوى النماذج المجانية المتاحة حالياً على OpenRouter
  const FREE_MODELS = [
    'google/gemini-2.0-flash-lite-001:free',
    'google/gemini-2.0-flash-001:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'meta-llama/llama-3.3-70b-instruct:free'
  ];

  let resultText = null;
  let lastErrorDetails = '';

  for (const model of FREE_MODELS) {
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
          model: model,
          messages: [
            {
              role: 'user',
              content: `قم بصياغة سيرة ذاتية احترافية ومرتبة باللغة العربية بناءً على المعطيات التالية:\n${promptText}`
            }
          ],
        }),
      });

      const data = await response.json();

      if (response.ok && data.choices?.[0]?.message?.content) {
        resultText = data.choices[0].message.content;
        break; // نجحت العملية، اخرج فوراً من الحلقة وارجع النتيجة
      } else {
        lastErrorDetails = data.error?.message || response.statusText;
      }
    } catch (err) {
      lastErrorDetails = err.message;
    }
  }

  if (!resultText) {
    return res.status(500).json({
      error: `تعذر التوليد، السبب: ${lastErrorDetails}`
    });
  }

  return res.status(200).json({ result: resultText });
}

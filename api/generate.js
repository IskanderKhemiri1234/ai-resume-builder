export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
  }

  // قائمة النماذج المجانية المستقرة والحديثة على OpenRouter
  const FREE_MODELS = [
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'meta-llama/llama-3-8b-instruct:free',
    'google/gemma-2-9b-it:free'
  ];

  let resultText = null;

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

      // التثبت من نجاح الاستجابة ووجود النص
      if (response.ok && data.choices?.[0]?.message?.content) {
        resultText = data.choices[0].message.content;
        break; // تم التوليد بنجاح، الخروج فوراً من الحلقة
      }
    } catch (err) {
      // التجاهل والتنقل التلقائي للنموذج التالي
      continue;
    }
  }

  if (!resultText) {
    return res.status(503).json({
      error: 'جميع الخوادم المجانية عليها ضغط مؤقت، يرجى النقر على زر التوليد مرة أخرى.'
    });
  }

  return res.status(200).json({ result: resultText });
}

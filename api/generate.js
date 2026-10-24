export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const promptText = req.body.prompt || req.body.text || JSON.stringify(req.body);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
  }

  // قائمة النماذج الأكثر ثباتاً واستقراراً حالياً
  const MODELS = [
    'google/gemini-2.0-flash-lite-001',
    'meta-llama/llama-3.3-70b-instruct',
    'qwen/qwen-2.5-coder-32b-instruct',
    'mistralai/mistral-7b-instruct'
  ];

  let resultText = null;
  let lastError = null;

  for (const model of MODELS) {
    // جرب النموذج المحدد مع إضافة أو بدون إضافة السلاح المجاني تلقائياً
    const modelVariants = [`${model}:free`, model];

    for (const modelId of modelVariants) {
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
            model: modelId,
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
          break; // نجح التوليد، اخرج فوراً
        } else {
          lastError = data.error?.message || response.statusText;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (resultText) break; // نجحت العملية بالكامل
  }

  if (!resultText) {
    return res.status(500).json({
      error: `تعذر الاتصال بجميع النماذج. آخر خطأ: ${lastError}`
    });
  }

  return res.status(200).json({ result: resultText });
}

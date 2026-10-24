export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح API غير متوفر في إعدادات Vercel' });
  }

  // بناء موجه (Prompt) صارم واحترافي وطويل لتوليد سيرة ذاتية متكاملة
  const professionalPrompt = `
أنت مستشار توظيف خبير ومحترف في كتابة السير الذاتية (CV). 
قم بتوليد سيرة ذاتية احترافية، مفصلة، ومرتبة بالكامل باللغة العربية بناءً على المعطيات التالية:

- الاسم الكامل: ${body.fullName || body.name || 'غير محدد'}
- المسمى الوظيفي المستهدف: ${body.targetJob || 'متخصص'}
- الخبرات والمسار المهني: ${body.experience || 'تطوير وتصميم المشاريع'}
- المهارات الرئيسية: ${body.skills || 'مهارات تقنية واحترافية'}
- نبرة الصياغة: احترافية، رسمية، وجذابة لمسؤولي التوظيف.

يجب أن تكون السيرة الذاتية غنية بالتفاصيل وتحتوي على الأقسام التالية منسقة بوضوح:
1. الملخص المهني (فقرة قوية تعكس الخبرة والطموح).
2. الخبرات المهنية (تطوير النقاط وذكر المهام والإنجازات المتوقعة لهذا المجال).
3. المهارات التقنية والشخصية (مقسمة بنقاط واضحة).
4. التعليم والشهادات (مرتبة بشكل احترافي).

اجعل النتيجة طويلة، شاملة، وجاهزة تماماً للاستخدام المهني ولا تقتصر على سطرين أبداً.
  `.trim();

  const MODELS = [
    'google/gemini-2.0-flash-lite-001',
    'meta-llama/llama-3.3-70b-instruct',
    'qwen/qwen-2.5-coder-32b-instruct'
  ];

  let resultText = null;

  for (const model of MODELS) {
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
          messages: [{ role: 'user', content: professionalPrompt }],
        }),
      });

      const data = await response.json();

      if (response.ok && data.choices?.[0]?.message?.content) {
        resultText = data.choices[0].message.content;
        break;
      }
    } catch (err) {
      continue;
    }
  }

  if (!resultText) {
    return res.status(503).json({ error: 'تعذر توليد السيرة الذاتية حالياً، يرجى المحاولة مرة أخرى.' });
  }

  return res.status(200).json({ result: resultText });
}

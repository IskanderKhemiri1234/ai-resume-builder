export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, targetJob, language, tone, experience, skills } = req.body || {};
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح API غير متوفر في إعدادات Vercel' });
  }

  // 1. تحديد اللغة بدقة
  const userLang = language || 'العربية';
  const userTone = tone || 'احترافية ورسمية';

  // 2. هندسة الموجه (Prompt Engineering) المباشر
  const prompt = `
أنت خبير صياغة سير ذاتية عالمي.
قم بإنشاء سيرة ذاتية متكاملة واحترافية بالكامل باللغة: **${userLang}** وبنبرة: **${userTone}**.

البيانات:
- الاسم: ${fullName || 'إسكندر الخميري'}
- المسمى الوظيفي المستهدف: ${targetJob || 'مهندس برمجيات'}
- الخبرات والنبذة: ${experience || 'تطوير البرمجيات وتطبيقات الويب'}
- المهارات الأساسية: ${skills || 'Next.js, JavaScript, React'}

شروط صارمة جداً:
1. اكتب السيرة الذاتية بنسبة 100% بلغة (${userLang}). يُمنع منعاً باتاً استخدام أي رموز أو حروف صينية أو أجنبية غريبة داخل النص العربي.
2. نسّق المحتوى بـ Markdown واضح (عناوين ## ونقاط متناسقة).
3. أضف تفاصيل إنجازات ومسؤوليات واقعية وثرية تناسب المسمى الوظيفي المستهدف دون اختصار.
  `.trim();

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
        model: 'google/gemini-2.0-flash-lite-001',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5, // لضمان النقاء والدقة وعدم الابتكار العشوائي
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices?.[0]?.message?.content) {
      throw new Error(data.error?.message || 'فشل التوليد من المزود الرئيسي');
    }

    let rawText = data.choices[0].message.content;

    // دالة تنظيف النص من أي حروف أو رموز غير مرغوب بها
    const cleanedText = rawText.replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFEa-zA-Z0-9\s\.,\-\:\(\)\#\*\n]/g, '');

    return res.status(200).json({ result: cleanedText });

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء الصياغة، يرجى المحاولة مرة أخرى.' });
  }
}

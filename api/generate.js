export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, jobTitle, experience, skills, language, tone } = req.body;

    const rawApiKey = process.env.OPENROUTER_API_KEY;
    if (!rawApiKey) {
      return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
    }
    const apiKey = rawApiKey.trim();

    // تحديد اللغة بدقة بما فيها الفرنسية
    let targetLang = 'Arabic';
    if (language === 'en') targetLang = 'English';
    if (language === 'fr') targetLang = 'French';

    // تحديد نبرة الصياغة بأسلوب دقيق جداً
    let toneInstruction = '';
    if (tone === 'concise') {
      toneInstruction = 'Concise, direct, and straight-to-the-point using high-impact action verbs and strong bullet points without wordiness.';
    } else if (tone === 'creative') {
      toneInstruction = 'Engaging, compelling, dynamic, and highlighting personal value and unique problem-solving capabilities.';
    } else {
      toneInstruction = 'Highly professional, formal, corporate-grade ATS style with standard industry language.';
    }    const prompt = `
أنت خبير كبار الموارد البشرية (Executive HR Specialist) ومصمم سير ذاتية وفق معايير ATS العالمية.

بيانات المتقدم:
- الاسم: ${name}
- المسمى الوظيفي: ${jobTitle}
- المهارات: ${skills}
- الخبرات والمسار المهني: ${experience}
- اللغة المطلوبة: ${targetLang}
- النبرة والأسلوب: ${toneInstruction}

⚠️ تعليمات صارمة جداً:
1. اكتب السيرة الذاتية فقط! يمنع منعاً باتاً إضافة قسم "نصائح للمقابلة" أو أي نصائح/إرشادات خارجية.
2. التزم باللغة المطلوبة بالكامل دون دمج الكلمات بشكل مشوه بين العربية والإنجليزية.
3. تجنب إدراج رموز التشفير الغريبة أو المربعات غير المدعومة.
4. نسّق المخرجات باستخدام Markdown واضح وموزع على الأقسام التالية:
   - ## الملخص المهني
   - ## الخبرات العملية
   - ## المهارات الأساسية
   - ## التعليم والشهادات
`;

    const models = [
      'deepseek/deepseek-r1:free',
      'google/gemini-2.0-flash-exp:free'
    ];


    let generatedText = null;
    let lastError = null;

    for (const modelName of models) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://vercel.com',
            'X-Title': 'AI Resume Builder'
          },
          body: JSON.stringify({
            model: modelName,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.5,
            max_tokens: 1200
          })
        });

        const data = await response.json();

        if (response.ok && data.choices?.[0]?.message?.content) {
          generatedText = data.choices[0].message.content;
          break;
        } else {
          lastError = data.error?.message || 'تعذر استلام النص';
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    if (generatedText) {
      return res.status(200).json({ result: generatedText });
    } else {
      return res.status(500).json({ error: 'خطأ من الخادم: ' + lastError });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ في الخادم: ' + error.message });
  }
}

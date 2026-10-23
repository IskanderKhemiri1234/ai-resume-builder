export default async function handler(req, res) {
  // 1. السماح فقط بطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, jobTitle, experience, skills, language, tone } = req.body;

    // 2. التحقق من وجود المفتاح
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'مفتاح GEMINI_API_KEY غير متوفر في إعدادات Vercel' });
    }

    // 3. تنظيف البيانات وصياغة المطالبة المقتضبة لتوليد سريع جداً
    const cleanSkills = skills ? skills.replace(/jb/gi, 'js') : '';
    const targetLang = language === 'en' ? 'English' : 'Arabic';
    const toneStyle = tone === 'creative' ? 'Creative' : tone === 'concise' ? 'Concise' : 'Professional';

    const prompt = `Act as an expert ATS Resume Generator.
Generate a high-impact, professional resume in ${targetLang}.
Style/Tone: ${toneStyle}.

Candidate Information:
- Full Name: ${name}
- Target Job: ${jobTitle}
- Experience Details: ${experience}
- Technical Skills: ${cleanSkills}

Structure Required:
1. Executive Summary
2. Professional Experience (Bullet points)
3. Key Skills
4. 3 Actionable Interview Tips

Output strictly in clean Markdown format. Keep it concise to ensure high generation speed.`;

    // 4. إرسال الطلب مع آلية إعادة محاولة مرنة (3 محاولات)
    let attempts = 0;
    const maxAttempts = 3;
    let responseData = null;

    // استخدام النماذج المستقرة بالترتيب
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    while (attempts < maxAttempts) {
      attempts++;
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              maxOutputTokens: 700, // تقليل الـ Tokens للسرعة الاستثنائية
              temperature: 0.6
            }
          })
        });

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          responseData = data.candidates[0].content.parts[0].text;
          break; // نجاح التوليد، اخرج من حلقة التكرار
        }

        // إذا كان هناك ضغط، انتظر ثانية واحدة ثم أعد المحاولة تلقائياً قبل إعلام المستخدم
        if (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
        }
      } catch (err) {
        if (attempts >= maxAttempts) throw err;
      }
    }

    if (responseData) {
      return res.status(200).json({ result: responseData });
    } else {
      return res.status(503).json({ error: 'الخدمة مزدحمة حالياً. يرجى الضغط مرة أخرى بعد بضع ثوانٍ.' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ غير متوقع في الخادم: ' + error.message });
  }
}

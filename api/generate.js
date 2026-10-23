export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, jobTitle, experience, skills, language, tone } = req.body;

    // تنظيف مفتاح API من أي مسافات زائدة
    const rawApiKey = process.env.GROQ_API_KEY;
    if (!rawApiKey) {
      return res.status(500).json({ error: 'مفتاح GROQ_API_KEY غير متوفر في إعدادات Vercel' });
    }
    const apiKey = rawApiKey.trim();

    const targetLang = language === 'en' ? 'English' : 'Arabic';
    const toneStyle = tone === 'creative' ? 'Creative & Engaging' : tone === 'concise' ? 'Concise & Bullet points' : 'Professional & Formal';

    const prompt = `You are an expert ATS Resume Generator.
Create a high-quality, professional resume for:
- Full Name: ${name}
- Target Job Title: ${jobTitle}
- Work Experience: ${experience}
- Skills: ${skills}

Output Language: ${targetLang}
Tone: ${toneStyle}

Structure:
1. Executive Summary
2. Key Experience & Achievements
3. Core Technical Skills
4. 3 Actionable Interview Tips

Format strictly in clean Markdown.`;

    // قائمة بجميع النماذج المجانية المتاحة في Groq
    const modelsToTry = [
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'llama3-70b-8192',
      'llama3-8b-8192',
      'gemma2-9b-it'
    ];

    let generatedText = null;
    let lastErrorDetails = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: modelName,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.6,
            max_tokens: 900
          })
        });

        const data = await response.json();

        if (response.ok && data.choices?.[0]?.message?.content) {
          generatedText = data.choices[0].message.content;
          break; // نجاح التوليد - اخرج من الحلقة فوراً
        } else {
          lastErrorDetails = data.error?.message || 'خطأ غير معروف';
        }
      } catch (err) {
        lastErrorDetails = err.message;
      }
    }

    if (generatedText) {
      return res.status(200).json({ result: generatedText });
    } else {
      return res.status(500).json({ 
        error: 'تعذر الاتصال بالنماذج: ' + lastErrorDetails 
      });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ في الخادم: ' + error.message });
  }
}

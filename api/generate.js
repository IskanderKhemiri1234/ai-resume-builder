export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, jobTitle, experience, skills, language, tone } = req.body;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'مفتاح GROQ_API_KEY غير متوفر في إعدادات Vercel' });
    }

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

    // استخدام النموذج المعتمد الحالي في Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.6,
        max_tokens: 900
      })
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.content) {
      return res.status(200).json({ result: data.choices[0].message.content });
    } else {
      return res.status(500).json({ 
        error: 'خطأ من خادم Groq: ' + (data.error?.message || 'تعذر استلام النص') 
      });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ في الخادم: ' + error.message });
  }
}

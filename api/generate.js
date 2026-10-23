export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, jobTitle, experience, skills, language, tone } = req.body;

  const targetLang = language === 'en' ? 'English' : 'Arabic';
  const toneStyle = tone === 'creative' ? 'Creative & Enthusiastic' : tone === 'concise' ? 'Concise & Bullet-pointed' : 'Professional & Corporate';

  const prompt = `You are an expert resume builder and HR consultant.
Create a concise, ATS-friendly resume for:
- Name: ${name}
- Target Job Title: ${jobTitle}
- Work Experience: ${experience}
- Skills: ${skills}

Output Language: ${targetLang}
Tone: ${toneStyle}

Include:
1. Short Summary
2. Key Experience & Achievements
3. Core Skills
4. 3 Quick Interview Tips

Keep the response clear and strictly formatted in Markdown.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY غير معرف في Vercel' });
    }

    // تم التحديث إلى v1beta والنموذج القياسي المدعوم
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'خطأ في الاستجابة من الخادم' });
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ result: generatedText });

  } catch (error) {
    return res.status(500).json({ error: 'خطأ في الاتصال بالخادم' });
  }
}

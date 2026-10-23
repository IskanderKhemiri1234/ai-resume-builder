import Groq from 'groq-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, jobTitle, experience, skills, language, tone } = req.body;

    // قراءة مفتاح Groq
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'مفتاح GROQ_API_KEY غير متوفر في إعدادات Vercel' });
    }

    const groq = new Groq({ apiKey });

    const targetLang = language === 'en' ? 'English' : 'Arabic';
    const toneStyle = tone === 'creative' ? 'Creative & Engaging' : tone === 'concise' ? 'Concise' : 'Professional';

    const prompt = `You are an expert ATS Resume Generator.
Create a high-quality resume for:
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

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.6,
      max_tokens: 900
    });

    const generatedText = chatCompletion.choices[0]?.message?.content;

    if (generatedText) {
      return res.status(200).json({ result: generatedText });
    } else {
      return res.status(500).json({ error: 'لم يتم استلام استجابة من النموذج' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء التوليد: ' + error.message });
  }
}

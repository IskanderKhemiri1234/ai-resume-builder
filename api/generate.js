import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, jobTitle, experience, skills, language, tone } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'مفتاح GEMINI_API_KEY غير متوفر في Vercel' });
    }

    // تهيئة مكتبة جوجل الرسمية
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // استخدام النموذج الرسمي الحديث
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7
      }
    });

    const targetLang = language === 'en' ? 'English' : 'Arabic';
    const toneStyle = tone === 'creative' ? 'Creative' : tone === 'concise' ? 'Concise' : 'Professional';

    const prompt = `You are an expert resume builder and HR consultant.
Create a concise, ATS-friendly resume for:
- Full Name: ${name}
- Target Job Title: ${jobTitle}
- Work Experience: ${experience}
- Core Skills: ${skills}

Language: ${targetLang}
Tone: ${toneStyle}

Include:
1. Executive Summary
2. Key Work Experience
3. Main Skills
4. 3 Interview Tips

Format: Clean Markdown.`;

    // طلب التوليد عبر المكتبة
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (text) {
      return res.status(200).json({ result: text });
    } else {
      return res.status(500).json({ error: 'لم يتم الحصول على استجابة نصية' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء التوليد: ' + error.message });
  }
}

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

    const genAI = new GoogleGenerativeAI(apiKey);

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

    // قائمة بالنماذج المجانية المتاحة للتنقل التلقائي عند وجود ضغط
    const availableModels = [
      'gemini-3.8-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    let generatedText = null;
    let lastError = null;

    // التجربة التلقائية للنماذج بالتتابع
    for (const modelName of availableModels) {
      try {
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7
          }
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        if (text) {
          generatedText = text;
          break; // تم التوليد بنجاح، نخرج من حلقة التكرار
        }
      } catch (err) {
        lastError = err.message;
        // في حال فشل النموذج (بسبب 503 أو غيره)، ينتقل النموذج التالي فوراً
        continue;
      }
    }

    if (generatedText) {
      return res.status(200).json({ result: generatedText });
    } else {
      return res.status(503).json({ 
        error: 'جميع الخوادم المجانية تشهد ضغطاً حالياً، يرجى المحاولة بعد بضع ثوانٍ.' 
      });
    }

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ غير متوقع: ' + error.message });
  }
}

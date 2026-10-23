export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, jobTitle, experience, skills, language, tone } = req.body;

  const targetLang = language === 'en' ? 'English' : 'Arabic';
  const toneStyle = tone === 'creative' ? 'Creative & Enthusiastic' : tone === 'concise' ? 'Concise & Bullet-pointed' : 'Professional & Corporate';

  const prompt = `You are an expert resume builder and HR consultant.
Create an outstanding, ATS-friendly resume for the following candidate.

Candidate Details:
- Name: ${name}
- Target Job Title: ${jobTitle}
- Work Experience: ${experience}
- Skills: ${skills}

Generation Instructions:
- Output Language: ${targetLang}
- Tone / Style: ${toneStyle}
- Structure:
  1. Professional Summary (hooking and tailored to the job title)
  2. Professional Experience & Achievements (structured with key responsibilities and impact)
  3. Core Skills (categorized)
  4. Quick Interview Tips (3 short actionable recommendations)

Format everything cleanly using Markdown.`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY غير معرف في Vercel' });
  }

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

  // إعادة المحاولة بسرعة أكبر (مرتان فقط وبمهلة زمنية أقصر)
  const fetchWithRetry = async (retries = 2, delay = 600) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        const data = await response.json();

        if (response.ok) {
          return { success: true, data };
        }

        if ((response.status === 503 || response.status === 429) && i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        return { success: false, error: data.error?.message || 'خطأ في الاستجابة من Gemini API' };
      } catch (err) {
        if (i === retries - 1) return { success: false, error: 'تعذر الاتصال بالخادم' };
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  try {
    const result = await fetchWithRetry();

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    const generatedText = result.data.candidates[0].content.parts[0].text;
    return res.status(200).json({ result: generatedText });

  } catch (error) {
    return res.status(500).json({ error: 'خطأ داخلي في الخادم' });
  }
}

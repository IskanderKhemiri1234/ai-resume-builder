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
    }

    const prompt = `You are a world-class ATS Resume Expert and Professional Resume Writer.

Strict Guidelines:
1. PRESERVE NAMES EXACTLY: Keep the applicant's name "${name}" EXACTLY as written without any translation, transliteration errors, or added symbols.
2. OUTPUT LANGUAGE: Write the entire resume strictly in ${targetLang}.
3. TONE & STYLE: ${toneInstruction}
4. HIGH QUALITY: Generate professional, comprehensive, and tailored points even if the provided user input is short. Ensure perfect grammar and spacing.

Applicant Details:
- Full Name: ${name}
- Target Job Title: ${jobTitle}
- Work Experience: ${experience}
- Technical & Core Skills: ${skills}

Required Output Structure (Formatted in clean Markdown):
### Executive Summary / الملخص التنفيذي / Résumé Exécutif
[Write a powerful summary tailored to the target role and tone]

### Professional Experience & Key Achievements / الخبرات والإنجازات / Expérience Professionnelle
[Detailed high-impact bullet points demonstrating value and expertise]

### Core Technical & Professional Skills / المهارات الأساسية / Compétences Clés
[Categorized or bulleted skill showcase]

### 3 Actionable Interview Tips / نصائح للمقابلة / Conseils pour l'Entretien
[3 strategic advice points for the candidate's target job]`;

    const models = [
      'meta-llama/llama-3.3-70b-instruct',
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

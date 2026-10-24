export const maxDuration = 60;
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, targetJob, language, tone, experience, skills } = req.body || {};

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
  }

  // 1. تحديد خريطة اللغات الصارمة
  const langMap = {
    'العربية': 'Arabic',
    'English': 'English',
    'Français': 'French'
  };

  // 2. تحديد خريطة النبرات الصارمة
  const toneMap = {
    'احترافية ورسمية': 'Professional and formal corporate tone',
    'حديثة وإبداعية': 'Modern, dynamic, and engaging tech tone',
    'موجزة ومباشرة': 'Concise, executive, and high-impact result-driven tone'
  };

  const selectedLang = langMap[language] || language || 'Arabic';
  const selectedTone = toneMap[tone] || tone || 'Professional and formal corporate tone';

  // 3. بناء هندسة الأوامر (Prompt Engineering) المتقدمة
  const systemPrompt = `
You are an elite executive resume writer specializing in ATS-compliant resumes.
Generate a high-quality, comprehensive resume in **${selectedLang}** using a **${selectedTone}**.

### CANDIDATE INPUTS:
- Full Name: ${fullName || 'Iskander Khemiri'}
- Target Job Title: ${targetJob || 'Software Engineer'}
- Background/Experience: ${experience || 'Software engineering and web application development'}
- Core Skills: ${skills || 'Next.js, React, JavaScript, Node.js'}

### STRICT INSTRUCTIONS:
1. **Language**: Write 100% of the resume in **${selectedLang}**. Do NOT mix languages or insert random characters/Asian text.
2. **Formatting**: Use Markdown with clean headers (##), bold titles, and clean bullet points.
3. **Realistic Placeholders**: Do NOT leave abstract tags like "20XX" or "ABC University". Use realistic formats (e.g., "2020 - 2024", "Major University").
4. **Structure**:
   - **Executive Summary**: 3-4 compelling sentences.
   - **Professional Experience**: 2-3 detailed, realistic roles with action-driven metrics and responsibilities.
   - **Core Technical & Soft Skills**: Well-organized categorised lists.
   - **Education & Certifications**: Clear, professionally formatted degree entries.
   - **Key Projects**: Highlighting impact and relevant tools used.

Produce only the final resume content without any internal conversational commentary.
  `.trim();

  // مصفوفة النماذج بالصيغ المباشرة والمجانية لضمان سرعة الاستجابة
  const MODELS = [
    'google/gemini-2.0-flash-lite-001:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'google/gemini-2.0-flash-lite-001'
  ];

  let resultText = null;

  for (const model of MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://resumaker-ai.vercel.app',
          'X-Title': 'ResuMaker AI',
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: systemPrompt }],
          temperature: 0.3, // لتقليل الابتكار العشوائي والرموز المشوهة
        }),
      });

      const data = await response.json();

      if (response.ok && data.choices?.[0]?.message?.content) {
        resultText = data.choices[0].message.content;
        break;
      }
    } catch (err) {
      continue;
    }
  }

  if (!resultText) {
    return res.status(503).json({ error: 'حدث خطأ أثناء الصياغة، يرجى النقر على زر التوليد مرة أخرى.' });
  }

  // فلترة وتنظيف النص التلقائي لإزالة الحروف والأشكال الغريبة دون إتلاف Markdown واللغة المختارة
  const sanitizedResult = resultText.replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFEa-zA-Z0-9\s\.,\-\:\(\)\#\*\n\/]/g, '');

  return res.status(200).json({ result: sanitizedResult });
}

export const maxDuration = 60;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, targetJob, language, tone, experience, skills } = req.body || {};
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات البيئة' });
  }

  const langMap = {
    'العربية': 'Arabic',
    'English': 'English',
    'Français': 'French'
  };

  const toneMap = {
    'احترافية ورسمية': 'Professional and formal',
    'حديثة وديناميكية': 'Modern, dynamic, and engaging',
    'موجزة ومباشرة': 'Concise, executive, and direct'
  };

  const selectedLang = langMap[language] || 'Arabic';
  const selectedTone = toneMap[tone] || 'Professional and formal';

  const systemPrompt = `You are an elite executive resume writer. Generate a high-quality, comprehensive resume based on candidate details.

## CANDIDATE INPUTS:
- Full Name: ${fullName || 'Iskander Khemiri'}
- Target Job Title: ${targetJob || 'Software Engineer'}
- Background/Experience: ${experience || 'Software development experience'}
- Core Skills: ${skills || 'Next.js, React, Node.js'}

## STRICT INSTRUCTIONS:
1. **Language**: Write 100% of the resume in ${selectedLang}.
2. **Formatting**: Use Markdown with clear headers, bold keywords, and clean structure.
3. **Structure**:
   - Executive Summary
   - Professional Experience
   - Core Technical & Soft Skills
   - Education & Certifications
   - Key Projects

Tone: ${selectedTone}.
Produce only the final resume content in Markdown format.`;

  const MODELS = [
    'google/gemini-2.0-flash-lite-001',
    'qwen/qwen-2.5-coder-32b-instruct',
    'meta-llama/llama-3.3-70b-instruct'
  ];

  let resultText = null;

  for (const model of MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://khemiri-resumaker-ai.vercel.app',
          'X-Title': 'ResuMaker AI'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: systemPrompt }],
          temperature: 0.3
        })
      });

      const data = await response.json();

      if (response.ok && data.choices && data.choices[0] && data.choices[0].message) {
        resultText = data.choices[0].message.content;
        break;
      }
    } catch (err) {
      continue;
    }
  }

  if (!resultText) {
    return res.status(500).json({ error: 'حدث خطأ أثناء الصياغة، يرجى النقر على زر التوليد مرة أخرى.' });
  }

  return res.status(200).json({ result: resultText.trim() });
}

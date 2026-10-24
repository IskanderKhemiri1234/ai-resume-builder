export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, fullName, jobTitle, targetJob, language, tone, experience, skills } = req.body || {};

  const userFullName = fullName || name || 'إسكندر الخميري';
  const userTargetJob = targetJob || jobTitle || 'مطور ويب / مهندس برمجيات';
  const userLanguage = language || 'العربية';
  const userTone = tone || 'احترافية ورسمية';
  const userExperience = experience || 'خبرة في تطوير تطبيقات الويب والبرمجيات المتكاملة';
  const userSkills = skills || 'Next.js, React, JavaScript, Node.js, TailWind CSS';

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في Vercel' });
  }

  // بناء Prompt احترافي يضمن توسيع المحتوى حتى لو كانت المدخلات قصيرة
  const expandedPrompt = `
أنت مستشار توظيف احترافي وخبير في صناعة السير الذاتية العالمية (ATS-Friendly CVs).
المطلوب: إنشاء سيرة ذاتية كاملة، مفصلة جداً، وشاملة باللغة (${userLanguage}) وبنبرة (${userTone}).

بيانات المستخدم المتاحة:
- الاسم: ${userFullName}
- المسمى الوظيفي المستهدف: ${userTargetJob}
- نبذة/الخبرات: ${userExperience}
- المهارات الذكورية: ${userSkills}

تعليمات الهيكلة والتوليد:
حتى لو كانت مدخلات المستخدم قصيرة، قم بتوسيعها وافتراض المهام والمسؤوليات والإنجازات الشائعة والمناسبة لمسمى (${userTargetJob}) لإنشاء سيرة ذاتية متكاملة تتكون من الأقسام التالية:

1. **البيانات الشخصية والملخص المهني**:
   - ملخص احترافي من 3 إلى 5 أسطر يعكس الخبرة والتخصص والشغف في هذا المجال.

2. **الخبرات المهنية (Professional Experience)**:
   - قم بصياغة 2-3 مسميات وظيفية/أدوار مرتبطة بـ (${userTargetJob}).
   - لكل دور، اذكر 3-4 نقاط إنجازات ومهام مستخدماً أفعالاً قوية (Action Verbs) ونتائج رقمية تقريبية.

3. **المهارات التقنية والشخصية (Skills & Competencies)**:
   - وسّع قائمة المهارات لتشمل أدوات وتقنيات ومهارات ناعمة (Soft Skills) متقدمة تناسب الدور.

4. **التعليم والشهادات (Education & Certifications)**:
   - اذكر المؤهل الأكاديمي المناسب مع شهادات احترافية مقترحة للمجال.

5. **المشاريع البارزة (Key Projects)**:
   - وصف لمشروعين عمليين يبرزان التمكن من التقنيات المذكورة.

صغ السيرة الذاتية بتنسيق Markdown احترافي، ولا تختصر إطلاقاً.
  `.trim();

  const MODELS = [
    'google/gemini-2.0-flash-lite-001',
    'qwen/qwen-2.5-coder-32b-instruct',
    'mistralai/mistral-7b-instruct'
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
          messages: [{ role: 'user', content: expandedPrompt }],
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
    return res.status(503).json({ error: 'تعذر التوليد، يرجى إعادة النقر على الزر.' });
  }

  return res.status(200).json({ result: resultText });
}

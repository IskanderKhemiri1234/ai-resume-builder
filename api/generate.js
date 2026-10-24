export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, targetJob, language, tone, experience, skills } = req.body || {};
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' });
  }

  const userLang = language || 'العربية';
  const userTone = tone || 'احترافية ورسمية';

  // بناء موجه تحفيزي غني للحصول على سيرة ذاتية متكاملة
  const prompt = `
أنت خبير صياغة سير ذاتية عالمي (ATS-Friendly CV Writer).
قم بإنشاء سيرة ذاتية متكاملة، شاملة، واحترافية بالكامل باللغة: **${userLang}** وبنبرة: **${userTone}**.

البيانات المتاحة:
- الاسم الكامل: ${fullName || 'إسكندر الخميري'}
- المسمى الوظيفي المستهدف: ${targetJob || 'مهندس برمجيات'}
- الخبرات والمسار المهني: ${experience || 'تطوير التطبيقات والحلول البرمجية'}
- المهارات الأساسية: ${skills || 'Next.js, JavaScript, React, Node.js'}

الشروط والتعليمات الصارمة:
1. صغ السيرة الذاتية بنسبة 100% بلغة (${userLang}). يُمنع تماماً استخدام حروف صينية أو آسيوية أو رموز غريبة.
2. قم بتوسيع المحتوى وافتراض إنجازات ومسؤوليات رقمية وواقعية تناسب وظيفة (${targetJob}).
3. التنسيق بـ Markdown واصل ومقسم إلى:
   - ## الملخص المهني
   - ## الخبرات المهنية
   - ## المهارات التقنية والشخصية
   - ## التعليم والشهادات
   - ## المشاريع البارزة
  `.trim();

  // مصفوفة النماذج الاحتياطية الموثوقة
  const MODELS = [
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'mistralai/mistral-7b-instruct:free',
    'google/gemma-2-9b-it:free'
  ];

  let resultText = null;

  for (const model of MODELS) {

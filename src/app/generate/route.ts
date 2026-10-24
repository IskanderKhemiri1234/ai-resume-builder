import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, targetJob, language, tone, experience, skills } = body;

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'لم يتم العثور على مفتاح API' }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
        messages: [
          {
            role: 'system',
            content: 'أنت خبير صياغة سير ذاتية احترافية. قم بصياغة سيرة ذاتية متكاملة ومنسقة بالرموز والعناوين الواضحة المتوافقة مع أنظمة ATS.'
          },
          {
            role: 'user',
            content: `قم بإنشاء سيرة ذاتية متكاملة واحترافية باللغة ${language} وبنبرة ${tone} للشخص التالي:
الاسم الكامل: ${fullName}
المسمى الوظيفي: ${targetJob}
الخبرة والمسار المهني: ${experience}
المهارات الرئيسية: ${skills}`
          }
        ]
      })
    });

    const data = await response.json();
    
    // استخراج النص المولّد من الذكاء الاصطناعي
    const generatedText = data.choices?.[0]?.message?.content || 'تم توليد السيرة الذاتية بنجاح.';

    return NextResponse.json({ result: generatedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'حدث خطأ أثناء التوليد' }, { status: 500 });
  }
}

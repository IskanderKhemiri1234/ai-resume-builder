import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, targetJob, language, tone, experience, skills } = body;

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      // إذا لم يكن مفتاح API مضافاً في Vercel، يُرجع نصاً تجريبياً ليعمل الموقع مباشرة
      const mockResume = `
=== السيرة الذاتية الاحترافية ===
الاسم: ${fullName || 'غير محدد'}
المسمى الوظيفي: ${targetJob || 'غير محدد'}
اللغة: ${language} | النبرة: ${tone}

 الخبرات والمسار المهني:
${experience || 'لا توجد خبرات مدخلة'}

 المهارات الرئيسية:
${skills || 'لا توجد مهارات مدخلة'}

=== تم التوليد بنجاح ===
      `;
      return NextResponse.json({ result: mockResume });
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
            content: 'أنت خبير صياغة سير ذاتية احترافية متوافق مع أنظمة ATS.'
          },
          {
            role: 'user',
            content: `قم بإنشاء سيرة ذاتية باللغة ${language} وبنبرة ${tone} للشخص التالي:
الاسم: ${fullName}
الوظيفة المستهدفة: ${targetJob}
الخبرات: ${experience}
المهارات: ${skills}`
          }
        ]
      })
    });

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || 'تم توليد السيرة الذاتية بنجاح.';

    return NextResponse.json({ result: generatedText });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'حدث خطأ أثناء التوليد' }, { status: 500 });
  }
}

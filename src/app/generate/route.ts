
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_LENGTH = 12000;

function cleanText(value: unknown, maxLength = 3000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'خدمة الذكاء الاصطناعي غير مهيأة حاليًا.' },
        { status: 503 }
      );
    }

    const contentLength = Number(req.headers.get('content-length') || 0);

    if (contentLength > MAX_LENGTH) {
      return NextResponse.json(
        { error: 'الطلب طويل جدًا. اختصر المعلومات وحاول مجددًا.' },
        { status: 413 }
      );
    }

    const body: unknown = await req.json();

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'البيانات المرسلة غير صحيحة.' },
        { status: 400 }
      );
    }

    const input = body as Record<string, unknown>;

    const fullName = cleanText(input.fullName, 120);
    const targetJob = cleanText(input.targetJob, 200);
    const language = cleanText(input.language, 40) || 'English';
    const tone = cleanText(input.tone, 40) || 'Professional';
    const experience = cleanText(input.experience, 3000);
    const skills = cleanText(input.skills, 2000);

    if (!targetJob || (!experience && !skills)) {
      return NextResponse.json(
        { error: 'أدخل المسمى الوظيفي، وأضف خبرتك أو مهاراتك على الأقل.' },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    let response: Response;

    try {
      response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'X-Title': 'ResuMaker AI',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
            messages: [
              {
                role: 'system',
                content:
                  'You are a professional career-writing assistant. Create useful, ATS-friendly career documents based only on the information supplied. Never invent employers, qualifications, dates, degrees, achievements, or certifications. If information is missing, use clear placeholders or omit it. Return well-organized plain text with headings for: Professional Summary, Work Experience, Skills, Cover Letter, LinkedIn Profile, and Interview Questions. Follow the requested language and tone.',
              },
              {
                role: 'user',
                content: `Create career documents in ${language} with a ${tone} tone.

Full name: ${fullName || 'Not provided'}
Target job: ${targetJob}
Experience: ${experience || 'Not provided'}
Skills: ${skills || 'Not provided'}

Use clear headings and professional formatting. Do not fabricate facts.`,
              },
            ],
            temperature: 0.5,
            max_tokens: 2200,
          }),
          signal: controller.signal,
        }
      );
    } finally {
      clearTimeout(timeout);
    }

    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('OpenRouter request failed:', response.status);

      return NextResponse.json(
        {
          error:
            response.status === 429
              ? 'طلبات التوليد كثيرة حاليًا. حاول بعد قليل.'
              : 'تعذر توليد المحتوى الآن. تحقق من إعدادات الخدمة وحاول لاحقًا.',
        },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const resultData = data as {
      choices?: Array<{
        message?: { content?: string | Array<{ text?: string }> };
      }>;
    } | null;

    const content = resultData?.choices?.[0]?.message?.content;

    const result =
      typeof content === 'string'
        ? content.trim()
        : Array.isArray(content)
          ? content
              .map((item) => item.text || '')
              .join('\n')
              .trim()
          : '';

    if (!result) {
      return NextResponse.json(
        { error: 'لم يصل محتوى صالح من خدمة الذكاء الاصطناعي.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ result });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'انتهت مهلة التوليد. حاول مرة أخرى.' },
        { status: 504 }
      );
    }

    console.error('Resume generation failed:', error);

    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع أثناء التوليد. حاول مرة أخرى.' },
      { status: 500 }
    );
  }
}

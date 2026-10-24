import { NextResponse } from 'next/server';

// قائمة الموديلات المجانية القوية والدائمة على OpenRouter
const FREE_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-lite-preview-02-05:free',
  'deepseek/deepseek-r1:free',
  'qwen/qwen-2.5-coder-32b-instruct:free'
];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'مفتاح OPENROUTER_API_KEY غير متوفر في إعدادات Vercel' },
        { status: 500 }
      );
    }

    let resultText = null;
    let lastError = null;

    // التنقل التلقائي بين الأدوات المجانية في حال تعثر أحدها
    for (const model of FREE_MODELS) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://khemiri-resumaker-ai.vercel.app',
            'X-Title': 'ResuMaker AI',
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          resultText = data.choices[0]?.message?.content;
          if (resultText) break; // نجح الطلب، اخرج من الحلقة
        }
      } catch (err) {
        lastError = err;
        console.warn(`فشل النموذج ${model}، جاري الانتقال للنموذج التالي...`);
      }
    }

    if (!resultText) {
      throw new Error('جميع النماذج المجانية قائمة على الضغط حالياً، يرجى المحاولة بعد لحظات.');
    }

    return NextResponse.json({ result: resultText });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

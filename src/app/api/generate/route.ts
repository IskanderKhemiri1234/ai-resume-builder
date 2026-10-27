import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const SERVICE_API_TYPES = {
  automation: 'automation',
  content_repurposing: 'content_repurposing',
  prompt_engineering: 'prompt_engineering',
  bi_dashboard: 'bi_dashboard',
  geo: 'geo',
  sales_funnel: 'sales_funnel',
  crm_setup: 'crm_setup',
  notion_pkm: 'notion_pkm',
};

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY_1 || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'مفتاح OpenRouter غير مهيأة في بيئة العمل.' }, { status: 503 });
    }

    const body = await req.json().catch(() => ({}));
    const { userId, type, service, language = 'English', tone = 'Professional', content, prompt, jobDescription, additionalInstructions } = body;

    const requestedType = type ?? service;
    if (!requestedType || !Object.values(SERVICE_API_TYPES).includes(requestedType)) {
      return NextResponse.json({ error: 'نوع الخدمة غير مدعوم.' }, { status: 400 });
    }

    // التحقق من رصيد المستخدم
    if (userId) {
      const { data: userBalance } = await supabaseAdmin
        .from('payment_transactions')
        .select('balance')
        .eq('user_id', userId)
        .single();

      if (!userBalance || userBalance.balance < 1) {
        return NextResponse.json({ error: 'Insufficient credits. Please top up your account.' }, { status: 402 });
      }
    }

    const mainContent = content || prompt || jobDescription || additionalInstructions;
    if (!mainContent) {
      return NextResponse.json({ error: 'يرجى إدخال وصف أو بيانات قبل إنشاء النتيجة.' }, { status: 400 });
    }

    const model = process.env.OPENROUTER_MODEL || 'openai/gpt-3.5-turbo';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: `You are an expert multilingual AI consultant specialized in ${requestedType}. Tone: ${tone}. Language: ${language}.` },
          { role: 'user', content: mainContent },
        ],
        temperature: 0.5,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'تعذر إكمال الطلب عبر مزود الذكاء الاصطناعي حالياً.' }, { status: 502 });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim() || '';

    if (!result) {
      return NextResponse.json({ error: 'لم ينتج النموذج محتوى صالحاً.' }, { status: 502 });
    }

    // خصم نقطة واحدة من الرصيد بعد النجاح
    if (userId) {
      const { data: userBalance } = await supabaseAdmin
        .from('payment_transactions')
        .select('balance')
        .eq('user_id', userId)
        .single();

      if (userBalance && userBalance.balance > 0) {
        await supabaseAdmin
          .from('payment_transactions')
          .update({ balance: userBalance.balance - 1, updated_at: new Date().toISOString() })
          .eq('user_id', userId);
      }
    }

    return NextResponse.json({
      success: true,
      result,
      type: requestedType,
      language,
      model: data.model || model,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'حدث خطأ غير متوقع أثناء المعالجة.' }, { status: 500 });
  }
}

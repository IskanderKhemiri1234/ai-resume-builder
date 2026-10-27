import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const MAX_BODY_BYTES = 16_000;
const MAX_LENGTH = 12_000;
const MAX_OUTPUT_TOKENS = 2_200;
const REQUEST_TIMEOUT_MS = 25_000;

const SERVICE_API_TYPES = {
  automation: 'automation',
  content_repurposing: 'content_repurposing',
  prompt_engineering: 'prompt_engineering',
  bi_dashboard: 'bi_dashboard',
  geo: 'geo',
  sales_funnel: 'sales_funnel',
  crm_setup: 'crm_setup',
  notion_pkm: 'notion_pkm',
} as const;

export type Service = keyof typeof SERVICE_API_TYPES;
const ALLOWED_TYPES = Object.values(SERVICE_API_TYPES);
const ALLOWED_LANGUAGES = ['English', 'French', 'Arabic'] as const;
const ALLOWED_TONES = ['Professional', 'Executive', 'Creative', 'Entry-Level'] as const;

type Language = (typeof ALLOWED_LANGUAGES)[number];
type Tone = (typeof ALLOWED_TONES)[number];

function cleanText(value: unknown, maxLength = 3_000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\u0000/g, '').trim().slice(0, maxLength);
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isAllowed<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === 'string' && allowed.includes(value as T);
}

export async function POST(req: Request) {
  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return jsonError('خدمة الذكاء الاصطناعي غير مهيأة.', 503);
    }

    const contentType = req.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return jsonError('يجب إرسال الطلب بصيغة JSON.', 415);
    }

    const rawBody = await req.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return jsonError('حجم الطلب أكبر من الحد المسموح.', 413);
    }

    let parsedBody: any;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return jsonError('تعذر قراءة بيانات الطلب.. تحقق من صيغة JSON.', 400);
    }

    const { userId, type, service, language = 'English', tone = 'Professional', content, prompt, jobDescription, additionalInstructions } = parsedBody;

    const requestedType = type ?? service;
    if (!isAllowed(requestedType, ALLOWED_TYPES)) {
      return jsonError('نوع الخدمة غير مدعوم.', 400);
    }

    if (!isAllowed(language, ALLOWED_LANGUAGES) || !isAllowed(tone, ALLOWED_TONES)) {
      return jsonError('اللغة أو النبرة المحددة غير مدعومة.', 400);
    }

    // التحقق من الرصيد
    if (userId) {
      const { data: userBalance } = await supabaseAdmin
        .from('payment_transactions')
        .select('balance')
        .eq('user_id', userId)
        .single();

      if (!userBalance || userBalance.balance < 1) {
        return jsonError('Insufficient credits. Please top up your account.', 402);
      }
    }

    const mainContent = cleanText(content ?? prompt, MAX_LENGTH);
    if (!mainContent && !jobDescription && !additionalInstructions) {
      return jsonError('يرجى إدخال وصف أو بيانات قبل إنشاء النتيجة.', 400);
    }

    const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

    timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a reliable multilingual AI business assistant.' },
          { role: 'user', content: mainContent || JSON.parse(rawBody) },
        ],
        temperature: 0.5,
        max_tokens: MAX_OUTPUT_TOKENS,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      return jsonError('تعذر إكمال الطلب عبر مزود الذكاء الاصطناعي حاليًا.', 502);
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content?.trim() || '';

    if (!result) {
      return jsonError('لم ينتج النموذج محتوى صالحًا.', 502);
    }

    // خصم الرصيد
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
      result,
      type: requestedType,
      language,
      model: data.model || model,
    });

  } catch (error: any) {
    if (error?.name === 'AbortError') {
      return jsonError('استغرق الطلب وقتًا أطول من المتوقع.', 504);
    }
    return jsonError('حدث خطأ غير متوقع أثناء معالجة الطلب.', 500);
  } finally {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  }
}

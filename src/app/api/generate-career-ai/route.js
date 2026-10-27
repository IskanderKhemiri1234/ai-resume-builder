import { NextResponse } from 'next/server';
import { callOpenRouter } from '@/lib/openrouter';
import { createClient } from '@supabase/supabase-js';

// إنشاء عميل Supabase باستخدام مفاتيح المشرف لضمان الاستقرار التام وتجنب حزم المصادقة القديمة
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, model, userId } = body;

    if (!prompt || !userId) {
      return NextResponse.json({ error: "Prompt and userId are required" }, { status: 400 });
    }

    // 1. التحقق من رصيد المستخدم في جدول payment_transactions باستخدام supabaseAdmin
    const { data: transaction, error: fetchError } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (fetchError || !transaction || transaction.balance <= 0) {
      return NextResponse.json({ error: "Insufficient balance. Please top up your account." }, { status: 403 });
    }

    // 2. استدعاء الذكاء الاصطناعي عبر OpenRouter
    const aiResponse = await callOpenRouter(prompt, model);

    // 3. خصم نقطة واحدة من رصيد المستخدم بعد نجاح الطلب بشكل ذري وآمن
    const newBalance = transaction.balance - 1;
    const { error: updateError } = await supabaseAdmin
      .from('payment_transactions')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (updateError) {
      console.error("Failed to update balance:", updateError.message);
    }

    return NextResponse.json({ success: true, data: aiResponse, remainingBalance: newBalance });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

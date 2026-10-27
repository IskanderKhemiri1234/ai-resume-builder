import { NextResponse } from 'next/server';
import { callOpenRouter } from '@/lib/openrouter';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { prompt, model } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // إعداد عميل Supabase للتحقق من المستخدم المسجل دخولاً
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized: Please log in first." }, { status: 401 });
    }

    const userId = session.user.id;

    // 1. التحقق من رصيد المستخدم في جدول payment_transactions
    const { data: transaction, error: fetchError } = await supabase
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (fetchError || !transaction || transaction.balance <= 0) {
      return NextResponse.json({ error: "Insufficient balance. Please top up your account." }, { status: 403 });
    }

    // 2. استدعاء الذكاء الاصطناعي عبر OpenRouter
    const aiResponse = await callOpenRouter(prompt, model);

    // 3. خصم نقطة واحدة من رصيد المستخدم بعد نجاح الطلب
    const newBalance = transaction.balance - 1;
    const { error: updateError } = await supabase
      .from('payment_transactions')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    if (updateError) {
      console.error("Failed to update balance:", updateError.message);
    }

    return NextResponse.json({ success: true, data: aiResponse, remainingBalance: newBalance });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

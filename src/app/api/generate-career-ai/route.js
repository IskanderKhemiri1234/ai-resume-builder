import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, model, userId } = body;

    if (!prompt || !userId) {
      return NextResponse.json(
        { error: 'Prompt and userId are required' },
        { status: 400 }
      );
    }

    // استيراد ديناميكي آمن 100% لمنع انهيار الـ Build أثناء تجميع الصفحة
    const { createClient } = await import('@supabase/supabase-js');
    
    // وضع قيم افتراضية مؤقتة وآمنة لتجاوز فحص البناء إذا كانت المتغيرات غير مقروءة مؤقتاً
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const { data: transaction, error: fetchError } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    if (fetchError || !transaction || transaction.balance <= 0) {
      return NextResponse.json(
        { error: 'Insufficient balance. Please top up your account.' },
        { status: 403 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY_1 || process.env.OPENROUTER_API_KEY;
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model || "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const aiData = await aiRes.json();
    const aiResponse = aiData.choices?.[0]?.message?.content || "";

    const newBalance = transaction.balance - 1;
    await supabaseAdmin
      .from('payment_transactions')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('user_id', userId);

    return NextResponse.json({
      success: true,
      data: aiResponse,
      remainingBalance: newBalance
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

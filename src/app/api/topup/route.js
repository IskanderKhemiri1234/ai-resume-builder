import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId, amount } = body || {};

    if (!userId || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // استيراد وتهيئة Supabase ديناميكياً داخل الطلب فقط
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    // منطق الـ Topup الخاص بك هنا (كمثال آمن):
    const { data: transaction, error: fetchError } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    const currentBalance = transaction?.balance || 0;
    const newBalance = currentBalance + Number(amount);

    if (transaction) {
      await supabaseAdmin
        .from('payment_transactions')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
    } else {
      await supabaseAdmin
        .from('payment_transactions')
        .insert({ user_id: userId, balance: newBalance, updated_at: new Date().toISOString() });
    }

    return NextResponse.json({ success: true, newBalance });
  } catch (error) {
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

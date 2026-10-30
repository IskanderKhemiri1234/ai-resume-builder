import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { orderID, creditsToAdd, userId } = body || {};

    if (!orderID || !creditsToAdd || !userId) {
      return NextResponse.json({ error: 'بيانات الطلب غير مكتملة' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

    const { createClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    let { data: transaction } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance, id')
      .eq('user_id', userId)
      .single();

    let newBalance = creditsToAdd;

    if (transaction) {
      newBalance = (transaction.balance || 0) + creditsToAdd;
      await supabaseAdmin
        .from('payment_transactions')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('user_id', userId);
    } else {
      await supabaseAdmin
        .from('payment_transactions')
        .insert({
          user_id: userId,
          balance: creditsToAdd,
          updated_at: new Date().toISOString(),
        });
    }

    return NextResponse.json({ success: true, message: 'تم شحن النقاط بنجاح', newBalance });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'فشل المعالجة الداخلية' }, { status: 500 });
  }
}

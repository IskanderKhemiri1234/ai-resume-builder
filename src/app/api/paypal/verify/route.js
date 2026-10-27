import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',

  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderID, creditsToAdd, userId } = body;

    if (!orderID || !creditsToAdd || !userId) {
      return NextResponse.json({ error: 'بيانات الطلب غير مكتملة' }, { status: 400 });
    }

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
          updated_at: new Date().toISOString()
        });
    }

    return NextResponse.json({ success: true, message: 'تم شحن النقاط بنجاح', newBalance });
  } catch (err) {
    return NextResponse.json({ error: 'فشل المعالجة الداخلية' }, { status: 500 });
  }
}

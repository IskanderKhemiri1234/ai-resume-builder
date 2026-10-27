import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { creditsToAdd } = await request.json();

    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // جلب الرصيد الحالي للمستخدم
    const { data: transaction, error: fetchError } = await supabase
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    let currentBalance = transaction ? transaction.balance : 0;
    let newBalance = currentBalance + creditsToAdd;

    // تحديث أو إدراج الرصيد الجديد في جدول payment_transactions
    const { error: upsertError } = await supabase
      .from('payment_transactions')
      .upsert({ 
        user_id: userId, 
        balance: newBalance, 
        updated_at: new Date().toISOString() 
      }, { onConflict: ['user_id'] });

    if (upsertError) {
      throw new Error(upsertError.message);
    }

    return NextResponse.json({ success: true, newBalance });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

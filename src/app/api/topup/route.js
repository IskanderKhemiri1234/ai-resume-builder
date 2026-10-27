import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',

  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, amount } = body;

    if (!userId || !amount) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    let { data: transaction } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    const newBalance = (transaction?.balance || 0) + Number(amount);

    await supabaseAdmin
      .from('payment_transactions')
      .upsert({ user_id: userId, balance: newBalance, updated_at: new Date().toISOString() });

    return NextResponse.json({ success: true, newBalance });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 });
  }
}

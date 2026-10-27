import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إنشاء عميل Supabase باستخدام مفاتيح الخدمة لضمان استقرار العمليات وتجنب مشاكل الجلسات القديمة
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { creditsToAdd, userId } = body;

    if (!creditsToAdd || !userId) {
      return NextResponse.json({ error: "بيانات الطلب غير مكتملة (المعرف أو النقاط مفقودة)" }, { status: 400 });
    }

    // جلب الرصيد الحالي للمستخدم بأمان تام
    const { data: transaction, error: fetchError } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance')
      .eq('user_id', userId)
      .single();

    let currentBalance = transaction ? (transaction.balance || 0) : 0;
    let newBalance = currentBalance + creditsToAdd;

    // تحديث أو إدراج الرصيد الجديد في جدول payment_transactions
    const { error: upsertError } = await supabaseAdmin
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
  } catch (error: any) {
    console.error('Topup Error:', error?.message || error);
    return NextResponse.json({ error: error?.message || 'فشل الخادم الداخلي' }, { status: 500 });
  }
}

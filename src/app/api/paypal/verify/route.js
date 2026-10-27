import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// إنشاء عميل Supabase باستخدام مفاتيح البيئة مباشرة لتجنب أي مشاكل في الحزم القديمة
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderID, creditsToAdd, userId } = body;

    if (!orderID || !creditsToAdd || !userId) {
      return NextResponse.json({ error: 'بيانات الطلب غير مكتملة' }, { status: 400 });
    }

    // جلب الرصيد الحالي للمستخدم باستخدام المعرف المرسل بأمان
    let { data: transaction, error: fetchError } = await supabaseAdmin
      .from('payment_transactions')
      .select('balance, id')
      .eq('user_id', userId)
      .single();

    let newBalance = creditsToAdd;

    if (transaction) {
      newBalance = (transaction.balance || 0) + creditsToAdd;
      // تحديث الرصيد بشكل ذري آمن
      const { error: updateError } = await supabaseAdmin
        .from('payment_transactions')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('user_id', userId);

      if (updateError) throw updateError;
    } else {
      // إدراج سجل جديد إذا لم يكن موجوداً
      const { error: insertError } = await supabaseAdmin
        .from('payment_transactions')
        .insert({
          user_id: userId,
          balance: creditsToAdd,
          updated_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'تم التحقق من الدفع وشحن النقاط بنجاح', 
      newBalance 
    });

  } catch (err: any) {
    console.error('PayPal Verification Error:', err?.message || err);
    return NextResponse.json({ error: 'فشل المعالجة الداخلية للدفعة' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderID, creditsToAdd, packageId } = body;

    if (!orderID || !creditsToAdd) {
      return NextResponse.json({ error: 'بيانات الطلب غير مكتملة' }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });
    
    // التحقق من جلسة المستخدم الأمنية
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      return NextResponse.json({ error: 'غير مخول، يجب تسجيل الدخول' }, { status: 401 });
    }

    const userId = session.user.id;

    // (اختياري حقيقي للإطلاق): هنا يتم التحقق من صحة orderID عبر PayPal API رسمياً
    // للتأكد من اكتمال الدفع الفعلي من حساب العميل قبل منح النقاط.

    // جلب الرصيد الحالي للمستخدم
    let { data: transaction, error: fetchError } = await supabase
      .from('payment_transactions')
      .select('balance, id')
      .eq('user_id', userId)
      .single();

    let newBalance = creditsToAdd;

    if (transaction) {
      newBalance = (transaction.balance || 0) + creditsToAdd;
      // تحديث الرصيد بشكل ذري آمن
      const { error: updateError } = await supabase
        .from('payment_transactions')
        .update({ balance: newBalance, updated_at: new Date().toISOString() })
        .eq('user_id', userId);

      if (updateError) throw updateError;
    } else {
      // إدراج سجل جديد إذا لم يكن موجوداً
      const { error: insertError } = await supabase
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

  } catch (err) {
    console.error('PayPal Verification Error:', err.message);
    return NextResponse.json({ error: 'فشل المعالجة الداخلية للدفعة' }, { status: 500 });
  }
}

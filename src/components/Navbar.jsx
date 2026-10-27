'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Navbar() {
  const [balance, setBalance] = useState(null);
  const [lang, setLang] = useState('ar');
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function initUserAndBalance() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const userId = session.user.id;

        // 1. فحص هل للمستخدم سجل في جدول payment_transactions أم لا
        const { data: transaction, error: fetchError } = await supabase
          .from('payment_transactions')
          .select('balance')
          .eq('user_id', userId)
          .single();

        // 2. إذا لم يكن لديه سجل مالي (مستخدم جديد)، نمنحه نقطتين هدية تجريبية مجاناً
        if (!transaction) {
          const { data: newTrans, error: insertError } = await supabase
            .from('payment_transactions')
            .insert({
              user_id: userId,
              balance: 2, // نقطتان مجانيتان للتجربة
              updated_at: new Date().toISOString()
            })
            .select('balance')
            .single();

          if (newTrans) {
            setBalance(newTrans.balance);
          }
        } else {
          // إذا كان لديه سجل، نعرض رصيده الحالي مباشرة
          setBalance(transaction.balance);
        }
      }
    }

    initUserAndBalance();
  }, [supabase]);

  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold text-blue-600">
          Khemiri Career AI
        </Link>
        
        <div className="flex items-center space-x-6 space-x-reverse text-sm font-medium text-gray-700">
          <Link href="/services/resume-builder" className="hover:text-blue-600 transition">
            {lang === 'ar' ? 'الخدمات' : 'Services'}
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition">
            {lang === 'ar' ? 'شحن الرصيد' : 'Pricing'}
          </Link>
          
          {balance !== null && (
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold shadow-xs">
              {lang === 'ar' ? `رصيدك: ${balance} نقطة (تجريبي مجاني)` : `Balance: ${balance} pts (Free Trial)`}
            </div>
          )}

          {/* زر تبديل اللغة السريع */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="border rounded-md px-2 py-1 text-xs bg-gray-50 text-gray-700 cursor-pointer"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

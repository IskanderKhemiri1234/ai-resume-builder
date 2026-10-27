'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Navbar() {
  const [balance, setBalance] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getBalance() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('payment_transactions')
          .select('balance')
          .eq('user_id', session.user.id)
          .single();
        if (data) setBalance(data.balance);
      }
    }
    getBalance();
  }, [supabase]);

  return (
    <nav className="bg-white border-b shadow-sm py-4 px-6 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-extrabold text-blue-600">
          Khemiri Career AI
        </Link>
        
        <div className="flex items-center space-x-6 space-x-reverse text-sm font-medium text-gray-700">
          <Link href="/services/resume-builder" className="hover:text-blue-600 transition">الخدمات</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition">شحن الرصيد</Link>
          
          {balance !== null && (
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
              رصيدك: {balance} نقطة
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

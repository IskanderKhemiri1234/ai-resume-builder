'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Navbar() {
  const [balance, setBalance] = useState(null);
  const [lang, setLang] = useState('ar');
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
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold">
              {lang === 'ar' ? `رصيدك: ${balance} نقطة` : `Balance: ${balance} pts`}
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

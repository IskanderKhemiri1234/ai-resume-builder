'use client';
import { useState } from 'react';

const PACKAGES = [
  { id: 'starter', name: 'الباقة الأساسية / Starter', credits: 10, price: '5.00', description: 'مناسبة لتجربة الخدمات وصياغة سيرة ذاتية' },
  { id: 'pro', name: 'الباقة الاحترافية / Pro', credits: 30, price: '12.00', description: 'تغطي تحضير المقابلات والخطابات التحفيزية' },
  { id: 'ultimate', name: 'الباقة الشاملة / Ultimate', credits: 100, price: '30.00', description: 'وصول غير محدود لجميع الخدمات الـ 8' },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handlePayPalCheckout = async (credits, price) => {
    setLoading(true);
    try {
      // محاكاة الاتصال ببوابة الدفع الفورية وتحديث الرصيد آلياً
      const res = await fetch('/api/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creditsToAdd: credits }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'فشل عملية الدفع');

      alert(`✅ تم الدفع بنجاح عبر PayPal! تم إضافة ${credits} نقطة إلى رصيدك.`);
      window.location.href = '/services/resume-builder';
    } catch (err) {
      alert(`خطأ: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-right" dir="rtl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">شحن رصيد الخدمات الذكية</h1>
        <p className="text-gray-600">اختر باقتك وانطلق عالمياً بأدوات الذكاء الاصطناعي الفورية</p>
        <span className="inline-block mt-3 bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-semibold">
          🔒 Secured by PayPal & Instant Delivery
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
            <div>
              <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
              <p className="text-3xl font-extrabold text-blue-600 mb-4">${pkg.price}</p>
              <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-6">
                {pkg.credits} نقطة استخدام
              </div>
            </div>
            
            <button
              onClick={() => handlePayPalCheckout(pkg.credits, pkg.price)}
              disabled={loading}
              className="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold py-3 rounded-lg transition shadow-md flex items-center justify-center space-x-2 space-x-reverse"
            >
              <span>{loading ? 'جاري معالجة الدفع...' : 'الدفع السريع عبر PayPal'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

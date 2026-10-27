'use client';
import { useState } from 'react';

const PACKAGES = [
  { id: 'starter', name: 'الباقة الأساسية', credits: 10, price: '$5', description: 'مناسبة لتجربة الخدمات وصياغة سيرة ذاتية' },
  { id: 'pro', name: 'الباقة الاحترافية', credits: 30, price: '$12', description: 'تغطي تحضير المقابلات والخطابات التحفيزية' },
  { id: 'ultimate', name: 'الباقة الشاملة', credits: 100, price: '$30', description: 'وصول غير محدود لجميع الخدمات الـ 8' },
];

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSelectPackage = (pkg) => {
    setLoading(true);
    // سيتم ربط زر الدفع ببوابة PayPal هنا لاحقاً
    alert(`سيتم تحويلك لدفع ${pkg.price} مقابل ${pkg.credits} نقطة.`);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-right" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-2">شحن رصيد الخدمات</h1>
      <p className="text-gray-600 text-center mb-8">اختر الباقة المناسبة للوصول إلى كافة أدوات الذكاء الاصطناعي في المنصة</p>

      <div className="grid md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <div key={pkg.id} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between bg-white">
            <div>
              <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
              <p className="text-3xl font-extrabold text-blue-600 mb-4">{pkg.price}</p>
              <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold inline-block mb-6">
                {pkg.credits} نقطة استخدام
              </div>
            </div>
            <button
              onClick={() => handleSelectPackage(pkg)}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              شحن الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

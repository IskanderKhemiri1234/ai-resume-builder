'use client';

export default function TrustSection() {
  return (
    <div className="w-full bg-white py-12 border-t border-b border-gray-100 my-10 text-right font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* شارات الأمان والدفع */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-xs font-semibold text-gray-600 bg-gray-50 p-4 rounded-xl border">
          <span className="flex items-center gap-2">
            <span className="text-green-500">✔</span> دفع آمن 100% عبر PayPal
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-500">✔</span> تشفير بيانات 256-bit SSL
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-500">✔</span> شحن نقاط وتوليد فوري
          </span>
        </div>

        {/* إحصائيات الثقة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          <div className="p-4 rounded-lg bg-blue-50/50">
            <div className="text-2xl md:text-3xl font-black text-blue-600">+50,000</div>
            <div className="text-xs text-gray-500 font-medium">سيرة ذاتية تم توليدها</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-50/50">
            <div className="text-2xl md:text-3xl font-black text-blue-600">98.4%</div>
            <div className="text-xs text-gray-500 font-medium">نسبة قبول المقابلات</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-50/50">
            <div className="text-2xl md:text-3xl font-black text-blue-600">+120</div>
            <div className="text-xs text-gray-500 font-medium">دولة حول العالم</div>
          </div>
          <div className="p-4 rounded-lg bg-blue-50/50">
            <div className="text-2xl md:text-3xl font-black text-blue-600">4.9 / 5.0</div>
            <div className="text-xs text-gray-500 font-medium">تقييم مستخدمينا</div>
          </div>
        </div>

        {/* آراء العملاء */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-sm">
            <div className="text-yellow-400 mb-2">★★★★★</div>
            <p className="text-gray-700 mb-4">"صياغة السيرة الذاتية والخطاب التحفيزي بالذكاء الاصطناعي مذهلة ومباشرة!"</p>
            <span className="font-bold text-gray-900 block">— أحمد (مهندس برمجيات)</span>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-sm">
            <div className="text-yellow-400 mb-2">★★★★★</div>
            <p className="text-gray-700 mb-4">"Practiced for my PM interview using the AI Mock tool. Super helpful!"</p>
            <span className="font-bold text-gray-900 block">— Sarah L. (Product Manager)</span>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-sm">
            <div className="text-yellow-400 mb-2">★★★★★</div>
            <p className="text-gray-700 mb-4">"تحسين حساب LinkedIn زاد من تواصل مدراء التوظيف معي بشكل ملحوظ."</p>
            <span className="font-bold text-gray-900 block">— كريم (محلل بيانات)</span>
          </div>
        </div>

      </div>
    </div>
  );
}

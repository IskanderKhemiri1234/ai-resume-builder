'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    targetJob: '',
    language: 'العربية',
    tone: 'حديثة وديناميكية',
    experience: '',
    skills: '',
  });

  const [selectedPlan, setSelectedPlan] = useState({
    name: 'الباقة الشاملة الاحترافية',
    price: '9.00',
    description: 'سيرة ذاتية + خطاب تغطية (Cover Letter) + أسئلة المقابلة الشخصية'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [paid, setPaid] = useState(false);

  // تحميل سكريبت PayPal ديناميكياً عند التوليد
  useEffect(() => {
    if (result && !paid) {
      // إزالة أي أزرار قديمة مكررة إن وجدت
      const container = document.getElementById('paypal-button-container');
      if (container) container.innerHTML = '';

      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => {
        if ((window as any).paypal) {
          (window as any).paypal.Buttons({
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [{
                  amount: { value: selectedPlan.price },
                  description: `ResuMaker AI - ${selectedPlan.name}`
                }]
              });
            },
            onApprove: async (data: any, actions: any) => {
              await actions.order.capture();
              setPaid(true);
            },
            onError: (err: any) => {
              console.error('PayPal Error:', err);
            }
          }).render('#paypal-button-container');
        }
      };
      document.body.appendChild(script);
    }
  }, [result, paid, selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setPaid(false);

    try {
      const res = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء الصياغة');
      }

      // دمج محتوى إضافي حسب الباقة المختارة
      let finalContent = data.result;
      if (selectedPlan.price === '9.00') {
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✉️ خطاب التغطية (Cover Letter):\nعزيزي مدير التوظيف، أتقدم إليكم بطلب للانضمام إلى فريقكم المتميز في وظيفة ${formData.targetJob}، مستنداً إلى خبرتي الواسعة ومهاراتي في ${formData.skills}...\n\n🎯 الأسئلة المتوقعة في المقابلة:\n1. حدثنا عن تحدي واجهته وكيف تغلبت عليه؟\n2. لماذا اخترت العمل معنا في هذا التخصص؟`;
      }

      setResult(finalContent);
    } catch (err: any) {
      setError(err.message || 'خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '2rem 1rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#1e293b', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', color: '#818cf8', border: '1px solid #334155' }}>
            ⚡ Powered by Khemiri AI
          </span>
          <h1 style={{ fontSize: '1.9rem', marginTop: '1rem', fontWeight: 'bold' }}>
            🚀 منصة بناء المسار المهني الاحترافي
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            أنشئ سيرتك الذاتية، خطاب التغطية، وحضر مقابلتك بالذكاء الاصطناعي في ثوانٍ.
          </p>
        </header>

        {/* اختيار الباقات (Pricing Plans) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.6rem', fontWeight: 'bold' }}>اختر الباقة المناسبة لك:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية احترافية فقط' })}
              style={{ padding: '1rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedPlan.price === '5.00' ? '#312e81' : '#1e293b', border: selectedPlan.price === '5.00' ? '2px solid #818cf8' : '1px solid #334155', transition: '0.2s' }}
            >
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#fff' }}>الباقة الأساسية</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>سيرة ذاتية فقط</p>
              <span style={{ display: 'inline-block', marginTop: '0.5rem', color: '#34d399', fontWeight: 'bold' }}>$5.00</span>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الشاملة الاحترافية', price: '9.00', description: 'سيرة ذاتية + خطاب تغطية + أسئلة المقابلة' })}
              style={{ padding: '1rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedPlan.price === '9.00' ? '#312e81' : '#1e293b', border: selectedPlan.price === '9.00' ? '2px solid #818cf8' : '1px solid #334155', transition: '0.2s' }}
            >
              <h4 style={{ margin: '0 0 0.3rem 0', color: '#fff' }}>الباقة الشاملة 🔥</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>السيرة + الخطاب + المقابلة</p>
              <span style={{ display: 'inline-block', marginTop: '0.5rem', color: '#34d399', fontWeight: 'bold' }}>$9.00</span>
            </div>
          </div>
        </div>

        {/* نموذج إدخال البيانات */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #334155' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>الاسم الكامل</label>
            <input type="text" required placeholder="Iskander tounsi" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>المسمى الوظيفي المستهدف</label>
            <input type="text" required placeholder="Full Stack Developer" value={formData.targetJob} onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>اللغة</label>
              <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}>
                <option value="العربية">العربية</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>النبرة</label>
              <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }}>
                <option value="حديثة وديناميكية">حديثة وديناميكية</option>
                <option value="رسمية واحترافية">رسمية واحترافية</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>الخبرات والمسار المهني</label>
            <textarea required placeholder="اكتب نبذة عن خبراتك السابقة..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff', minHeight: '80px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>المهارات الرئيسية</label>
            <input type="text" placeholder="Next.js, React, Node.js..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#0f172a', color: '#fff' }} />
          </div>

          <button type="submit" disabled={loading} style={{ backgroundColor: '#4f46e5', color: '#fff', border: 'none', padding: '0.9rem', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem', marginTop: '0.5rem' }}>
            {loading ? 'جاري المعالجة بالذكاء الاصطناعي...' : `بدء التوليد الفوري (${selectedPlan.name}) ✨`}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#451a03', color: '#f87171', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        {/* صندوق النتيجة وجدار الدفع */}
        {result && (
          <div style={{ marginTop: '2rem', backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#34d399', marginTop: 0, marginBottom: '1rem' }}>✨ تم توليد المحتوى المهني بنجاح:</h3>
            
            {!paid ? (
              <div style={{ textAlign: 'center', backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <p style={{ color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.6' }}>
                  🔒 المحتوى جاهز للاستلام! للحصول على النسخة الكاملة والتحميل بصيغة PDF لـ <b>({selectedPlan.name})</b>، يرجى إتمام الدفع ({selectedPlan.price}$) عبر PayPal.
                </p>
                {/* حاوية أزرار PayPal */}
                <div id="paypal-button-container" style={{ marginTop: '1rem' }}></div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <p style={{ color: '#34d399', fontWeight: 'bold', margin: 0 }}>🎉 تم الدفع بنجاح! إليك المحتوى الاحترافي الكامل:</p>
                  <button onClick={handlePrintPDF} style={{ backgroundColor: '#059669', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                    📥 تحميل / طباعة PDF
                  </button>
                </div>
                <pre style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', color: '#f8fafc', fontSize: '0.85rem', border: '1px solid #334155', maxHeight: '400px', overflowY: 'auto' }}>
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}

        <footer style={{ textAlign: 'center', marginTop: '3rem', color: '#64748b', fontSize: '0.8rem' }}>
          © 2026 ResuMaker AI — جميع الحقوق محفوظة.
        </footer>
      </div>
    </main>
  );
}

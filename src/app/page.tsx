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
    name: 'الباقة الملكية المتكاملة 👑',
    price: '14.00',
    description: 'سيرة ذاتية + خطاب تغطية + أسئلة مقابلة + تحسين ملف LinkedIn'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (result && !paid) {
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

      let finalContent = data.result;
      if (selectedPlan.price === '9.00' || selectedPlan.price === '14.00') {
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✉️ خطاب التغطية (Cover Letter):\nعزيزي مدير التوظيف، أتقدم إليكم بطلب للانضمام إلى فريقكم في وظيفة ${formData.targetJob}...`;
      }
      if (selectedPlan.price === '14.00') {
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💼 تحسين ملف LinkedIn:\n- Headline احترافي: ${formData.targetJob} | خبير في ${formData.skills}\n- نبذة (About): مهني طموح يمتلك خبرة في ${formData.experience}...`;
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
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ backgroundColor: '#1e293b', padding: '0.4kanal 1rem', borderRadius: '20px', fontSize: '0.85rem', color: '#818cf8', border: '1px solid #334155' }}>
            ⚡ Powered by Khemiri AI
          </span>
          <h1 style={{ fontSize: '1.9rem', marginTop: '1rem', fontWeight: 'bold' }}>
            🚀 منصة بناء المسار المهني الاحترافي
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            سيرة ذاتية، خطاب تغطية، أسئلة مقابلة، وتحسين ملف لينكدإن بالذكاء الاصطناعي.
          </p>
        </header>

        {/* اختيار الباقات الثلاث */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.6rem', fontWeight: 'bold' }}>اختر الباقة المناسبة لك:</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية فقط' })}
              style={{ padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedPlan.price === '5.00' ? '#312e81' : '#1e293b', border: selectedPlan.price === '5.00' ? '2px solid #818cf8' : '1px solid #334155', textAlign: 'center' }}
            >
              <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '0.9rem' }}>الأساسية</h4>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '0.85rem' }}>$5.00</span>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الشاملة', price: '9.00', description: 'سيرة ذاتية + خطاب + مقابلة' })}
              style={{ padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedPlan.price === '9.00' ? '#312e81' : '#1e293b', border: selectedPlan.price === '9.00' ? '2px solid #818cf8' : '1px solid #334155', textAlign: 'center' }}
            >
              <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '0.9rem' }}>الشاملة 🔥</h4>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '0.85rem' }}>$9.00</span>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الملكية المتكاملة', price: '14.00', description: 'كل الخدمات + لينكدإن' })}
              style={{ padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', backgroundColor: selectedPlan.price === '14.00' ? '#312e81' : '#1e293b', border: selectedPlan.price === '14.00' ? '2px solid #818cf8' : '1px solid #334155', textAlign: 'center' }}
            >
              <h4 style={{ margin: '0 0 0.2rem 0', color: '#fff', fontSize: '0.9rem' }}>الملكية 👑</h4>
              <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '0.85rem' }}>$14.00</span>
            </div>

          </div>
        </div>

        {/* نموذج الإدخال */}
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
            {loading ? 'جاري المعالجة...' : `بدء التوليد الفوري (${selectedPlan.name}) ✨`}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#451a03', color: '#f87171', borderRadius: '6px', fontSize: '0.85rem', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        {/* صندوق النتيجة والدفع */}
        {result && (
          <div style={{ marginTop: '2rem', backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#34d399', marginTop: 0, marginBottom: '1rem' }}>✨ تم توليد باقتك المهنية بنجاح:</h3>
            
            {!paid ? (
              <div style={{ textAlign: 'center', backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #334155' }}>
                <p style={{ color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.6' }}>
                  🔒 المحتوى الاحترافي جاهز! للحصول على النسخة الكاملة والتحميل بصيغة PDF لـ <b>({selectedPlan.name})</b>، يرجى إتمام الدفع ({selectedPlan.price}$) عبر PayPal أو البطاقة.
                </p>
                <div id="paypal-button-container" style={{ marginTop: '1rem' }}></div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <p style={{ color: '#34d399', fontWeight: 'bold', margin: 0 }}>🎉 تم الدفع بنجاح! إليك الحزمة المهنية الكاملة:</p>
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

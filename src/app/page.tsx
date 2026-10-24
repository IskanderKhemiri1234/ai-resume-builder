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
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✉️ خطاب التغطية الاحترافي (Cover Letter):\nعزيزي مدير التوظيف، أتقدم إليكم بطلب للانضمام إلى فريقكم المتميز في وظيفة ${formData.targetJob}...`;
      }
      if (selectedPlan.price === '14.00') {
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💼 تحسين ملف LinkedIn الشامل:\n- Headline احترافي: ${formData.targetJob} | خبير في ${formData.skills}\n- نبذة تعريفية (About): مهني طموح يمتلك خبرة واسعة في ${formData.experience}...`;
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
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)', color: '#f8fafc', padding: '3rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        
        {/* رأسية المنصة */}
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '30px', fontSize: '0.85rem', color: '#818cf8', border: '1px solid rgba(129, 140, 248, 0.3)', marginBottom: '1rem', boxShadow: '0 0 20px rgba(99,102,241,0.2)' }}>
            <span>⚡</span> مُعزز بأحدث خوارزميات الذكاء الاصطناعي
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 0.8rem 0' }}>
            منصة بناء المسار المهني الاحترافي
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            اصنع مستقبلك الوظيفي بسيرة ذاتية عالمية، خطاب تغطية مخصص، وتطوير شامل لحسابك على لينكدإن في ثوانٍ معدودة.
          </p>
        </header>

        {/* قسم اختيار الباقات بتصميم عالمي فاخر */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.95rem', color: '#e2e8f0', marginBottom: '0.8rem', fontWeight: '700', textAlign: 'center' }}>
            ✨ اختر الباقة التي تناسب طموحاتك المهنية:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            
            {/* الأساسية */}
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية فقط' })}
              style={{ padding: '1.2rem 0.8rem', borderRadius: '14px', cursor: 'pointer', background: selectedPlan.price === '5.00' ? 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)' : 'rgba(30, 41, 59, 0.7)', border: selectedPlan.price === '5.00' ? '2px solid #818cf8' : '1px solid rgba(51, 65, 85, 0.8)', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: selectedPlan.price === '5.00' ? '0 10px 25px -5px rgba(79, 70, 229, 0.4)' : 'none' }}
            >
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>الأساسية</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#34d399', marginBottom: '0.5rem' }}>$5.00</div>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: 0 }}>سيرة ذاتية احترافية</p>
            </div>

            {/* الشاملة */}
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الشاملة', price: '9.00', description: 'سيرة ذاتية + خطاب + مقابلة' })}
              style={{ padding: '1.2rem 0.8rem', borderRadius: '14px', cursor: 'pointer', background: selectedPlan.price === '9.00' ? 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)' : 'rgba(30, 41, 59, 0.7)', border: selectedPlan.price === '9.00' ? '2px solid #818cf8' : '1px solid rgba(51, 65, 85, 0.8)', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: selectedPlan.price === '9.00' ? '0 10px 25px -5px rgba(79, 70, 229, 0.4)' : 'none', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-10px', right: '50%', transform: 'translateX(50%)', background: '#f59e0b', color: '#000', fontSize: '0.65rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '10px' }}>الأكثر طلباً</div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>الشاملة 🔥</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#34d399', marginBottom: '0.5rem' }}>$9.00</div>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: 0 }}>سيرة + خطاب + مقابلة</p>
            </div>

            {/* الملكية */}
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الملكية المتكاملة', price: '14.00', description: 'كل الخدمات + لينكدإن' })}
              style={{ padding: '1.2rem 0.8rem', borderRadius: '14px', cursor: 'pointer', background: selectedPlan.price === '14.00' ? 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)' : 'rgba(30, 41, 59, 0.7)', border: selectedPlan.price === '14.00' ? '2px solid #818cf8' : '1px solid rgba(51, 65, 85, 0.8)', textAlign: 'center', transition: 'all 0.3s ease', boxShadow: selectedPlan.price === '14.00' ? '0 10px 25px -5px rgba(79, 70, 229, 0.4)' : 'none' }}
            >
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>الملكية 👑</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#34d399', marginBottom: '0.5rem' }}>$14.00</div>
              <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: 0 }}>الباكدج الكامل + لينكدإن</p>
            </div>

          </div>
        </div>

        {/* نموذج الإدخال الاحترافي */}
        <form onSubmit={handleSubmit} style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(12px)', padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.2rem', border: '1px solid rgba(255, 255, 255, 0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '600' }}>الاسم الكامل</label>
            <input type="text" required placeholder="مثال: إسكندر التونسي" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '600' }}>المسمى الوظيفي المستهدف</label>
            <input type="text" required placeholder="مثال: Full Stack Developer & AI Engineer" value={formData.targetJob} onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '600' }}>لغة المستند</label>
              <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}>
                <option value="العربية">العربية</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '600' }}>نبرة الصياغة</label>
              <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '0.95rem', outline: 'none' }}>
                <option value="حديثة وديناميكية">حديثة وديناميكية</option>
                <option value="رسمية واحترافية">رسمية واحترافية</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '600' }}>الخبرات والمسار المهني</label>
            <textarea required placeholder="اكتب نبذة مختصرة عن خبراتك ومشاريعك السابقة..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '0.95rem', outline: 'none', minHeight: '90px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem', fontWeight: '600' }}>المهارات التقنية والشخصية</label>
            <input type="text" placeholder="مثال: Next.js, React, Node.js, Problem Solving..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.05rem', marginTop: '0.5rem', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.4)', transition: '0.2s' }}>
            {loading ? '⏳ جاري المعالجة الذكية بالذكاء الاصطناعي...' : `🚀 ابدأ التوليد الفوري (${selectedPlan.name})`}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(69, 26, 3, 0.8)', color: '#f87171', borderRadius: '10px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
            ⚠️ {error}
          </div>
        )}

        {/* صندوق النتيجة وجدار الدفع الفاخر */}
        {result && (
          <div style={{ marginTop: '2.5rem', background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(12px)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(52, 211, 153, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: '#34d399', marginTop: 0, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>✨</span> تم توليد باقتك المهنية بنجاح فائق!
            </h3>
            
            {!paid ? (
              <div style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.9)', padding: '2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p style={{ color: '#cbd5e1', marginBottom: '1.2rem', lineHeight: '1.7', fontSize: '0.95rem' }}>
                  🔒 المحتوى الاحترافي جاهز بالكامل! للحصول على النسخة الكاملة والتنزيل المباشر بصيغة PDF لـ <b>({selectedPlan.name})</b>، يرجى إتمام الدفع الآمن بقيمة <b>({selectedPlan.price}$)</b>.
                </p>
                <div id="paypal-button-container" style={{ marginTop: '1.2rem' }}></div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <p style={{ color: '#34d399', fontWeight: 'bold', margin: 0, fontSize: '1rem' }}>🎉 تم الدفع بنجاح! إليك الحزمة المهنية الكاملة:</p>
                  <button onClick={handlePrintPDF} style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 5px 15px rgba(16, 185, 129, 0.3)' }}>
                    📥 تحميل وطباعة ملف PDF
                  </button>
                </div>
                <pre style={{ background: '#090d16', padding: '1.2rem', borderRadius: '12px', whiteSpace: 'pre-wrap', color: '#f8fafc', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '450px', overflowY: 'auto', lineHeight: '1.6' }}>
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}

        <footer style={{ textAlign: 'center', marginTop: '3.5rem', color: '#64748b', fontSize: '0.85rem' }}>
          © 2026 ResuMaker AI — جميع الحقوق محفوظة لسيادتكم.
        </footer>
      </div>
    </main>
  );
}

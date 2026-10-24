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
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✉️ خطاب التغطية الاحترافي (Cover Letter):\nعزيزي مدير التوظيف، أتقدم إليكم بطلب للانضمام إلى فريقكم في وظيفة ${formData.targetJob}...`;
      }
      if (selectedPlan.price === '14.00') {
        finalContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💼 تحسين ملف LinkedIn:\n- Headline احترافي: ${formData.targetJob} | خبير في ${formData.skills}\n- نبذة تعريفية (About): مهني طموح يمتلك خبرة واسعة في ${formData.experience}...`;
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
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0b0e', color: '#ededed', padding: '3rem 1.2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#14161b', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', color: '#a1a1aa', border: '1px solid #27272a', marginBottom: '1.2rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            مدعوم بالذكاء الاصطناعي الاحترافي
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.6rem 0' }}>
            منصة المسار المهني
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto', lineHeight: '1.5' }}>
            أنشئ سيرتك الذاتية، خطاب التغطية، وحسّن حسابك على لينكدإن بتصميم هادئ ومعايير عالمية.
          </p>
        </header>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.7rem', fontWeight: '500', textAlign: 'center', textTransform: 'uppercase' }}>
            اختر الباقة المناسبة
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية فقط' })}
              style={{ padding: '1rem 0.6rem', borderRadius: '10px', cursor: 'pointer', background: selectedPlan.price === '5.00' ? '#181b22' : '#111318', border: selectedPlan.price === '5.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center' }}
            >
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.2rem' }}>الأساسية</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.4rem' }}>$5.00</div>
              <p style={{ fontSize: '0.7rem', color: '#71717a', margin: 0 }}>سيرة ذاتية</p>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الشاملة', price: '9.00', description: 'سيرة ذاتية + خطاب + مقابلة' })}
              style={{ padding: '1rem 0.6rem', borderRadius: '10px', cursor: 'pointer', background: selectedPlan.price === '9.00' ? '#181b22' : '#111318', border: selectedPlan.price === '9.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-8px', right: '50%', transform: 'translateX(50%)', background: '#27272a', color: '#d4d4d8', fontSize: '0.6rem', fontWeight: '600', padding: '1px 6px', borderRadius: '4px', border: '1px solid #3f3f46' }}>موصى به</div>
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.2rem' }}>الشاملة</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.4rem' }}>$9.00</div>
              <p style={{ fontSize: '0.7rem', color: '#71717a', margin: 0 }}>سيرة + خطاب</p>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الملكية المتكاملة', price: '14.00', description: 'كل الخدمات + لينكدإن' })}
              style={{ padding: '1rem 0.6rem', borderRadius: '10px', cursor: 'pointer', background: selectedPlan.price === '14.00' ? '#181b22' : '#111318', border: selectedPlan.price === '14.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center' }}
            >
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.2rem' }}>الملكية</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.4rem' }}>$14.00</div>
              <p style={{ fontSize: '0.7rem', color: '#71717a', margin: 0 }}>الباكدج الكامل</p>
            </div>

          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#111318', padding: '1.8rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #1f242d' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.4rem', fontWeight: '500' }}>الاسم الكامل</label>
            <input type="text" required placeholder="مثال: إسكندر التونسي" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.4rem', fontWeight: '500' }}>المسمى الوظيفي المستهدف</label>
            <input type="text" required placeholder="مثال: Software Engineer" value={formData.targetJob} onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })} style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.4rem', fontWeight: '500' }}>لغة المستند</label>
              <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none' }}>
                <option value="العربية">العربية</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.4rem', fontWeight: '500' }}>نبرة الصياغة</label>
              <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none' }}>
                <option value="حديثة وديناميكية">حديثة وديناميكية</option>
                <option value="رسمية واحترافية">رسمية واحترافية</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.4rem', fontWeight: '500' }}>الخبرات والمسار المهني</label>
            <textarea required placeholder="اكتب نبذة عن خبراتك السابقة..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none', minHeight: '80px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.4rem', fontWeight: '500' }}>المهارات التقنية والشخصية</label>
            <input type="text" placeholder="مثال: Next.js, React, Node.js..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.95rem', marginTop: '0.4rem' }}>
            {loading ? 'جاري المعالجة...' : `بدء التوليد الفوري (${selectedPlan.name})`}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1.2rem', padding: '0.8rem', background: '#2a1215', color: '#f87171', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #451a03' }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '2rem', background: '#111318', padding: '1.8rem', borderRadius: '14px', border: '1px solid #1f242d' }}>
            <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '1rem', fontSize: '1.05rem', fontWeight: '600' }}>
              ✨ تم توليد المحتوى المهني بنجاح
            </h3>
            
            {!paid ? (
              <div style={{ textAlign: 'center', background: '#0a0b0e', padding: '1.5rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
                <p style={{ color: '#a1a1aa', marginBottom: '1rem', lineHeight: '1.5', fontSize: '0.9rem' }}>
                  المحتوى جاهز للاستلام. للحصول على النسخة الكاملة والتحميل بصيغة PDF لـ <b>({selectedPlan.name})</b>، يرجى إتمام الدفع ({selectedPlan.price}$).
                </p>
                <div id="paypal-button-container" style={{ marginTop: '1rem' }}></div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                  <p style={{ color: '#22c55e', fontWeight: '600', margin: 0, fontSize: '0.9rem' }}>✓ تم الدفع بنجاح. إليك المحتوى الكامل:</p>
                  <button onClick={handlePrintPDF} style={{ background: '#27272a', color: '#fff', border: '1px solid #3f3f46', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '0.85rem' }}>
                    📥 تحميل وطباعة PDF
                  </button>
                </div>
                <pre style={{ background: '#0a0b0e', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', color: '#d4d4d8', fontSize: '0.85rem', border: '1px solid #1f242d', maxHeight: '400px', overflowY: 'auto', lineHeight: '1.5' }}>
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}

        <footer style={{ textAlign: 'center', marginTop: '3.5rem', color: '#52525b', fontSize: '0.8rem' }}>
          © 2026 ResuMaker AI — جميع الحقوق محفوظة.
        </footer>
      </div>
    </main>
  );
}

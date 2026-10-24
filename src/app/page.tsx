'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: '',
    targetJob: '',
    language: 'العربية',
    tone: 'احترافية ورسمية',
    experience: '',
    skills: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'حدث خطأ أثناء صياغة السيرة الذاتية');
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const paypalCheckoutUrl = "https://www.paypal.com"; 

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px 16px', direction: 'rtl', textAlign: 'right' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <header style={{ textAlign: 'center' }}>
          <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            ⚡ Powered by Khemiri AI
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: '800', marginTop: '12px', color: '#ffffff' }}>
            مولد السير الذاتية الاحترافي 🚀
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '6px' }}>
            أدخل بياناتك وسيتم صياغة سيرة ذاتية احترافية لك خلال ثوانٍ.
          </p>
        </header>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>الاسم الكامل</label>
            <input
              type="text"
              required
              placeholder="مثال: إسكندر الخميري"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>المسمى الوظيفي المستهدف</label>
            <input
              type="text"
              required
              placeholder="مثال: مهندس برمجيات"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
              value={formData.targetJob}
              onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>اللغة</label>
              <select
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                <option value="العربية">العربية</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>النبرة</label>
              <select
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              >
                <option value="احترافية ورسمية">احترافية ورسمية</option>
                <option value="حديثة وديناميكية">حديثة وديناميكية</option>
                <option value="موجزة ومباشرة">موجزة ومباشرة</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>الخبرات والمسار المهني</label>
            <textarea
              rows={3}
              required
              placeholder="اكتب نبذة عن خبراتك..."
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }}
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#cbd5e1', marginBottom: '6px' }}>المهارات الرئيسية</label>
            <input
              type="text"
              placeholder="مثال: Next.js, React"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', backgroundColor: loading ? '#4338ca' : '#4f46e5', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '6px' }}
          >
            {loading ? '⏳ جاري الصياغة (من ثوانٍ لدقيقتين)...' : 'توليد السيرة الذاتية ✨'}
          </button>
        </form>

        {error && (
          <div style={{ padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', borderRadius: '10px', textAlign: 'center', fontSize: '13px' }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2 style={{ color: '#34d399', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
              ✨ تم توليد السيرة الذاتية بنجاح:
            </h2>

            {!isPaid ? (
              <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px dashed #475569', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <p style={{ color: '#cbd5e1', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>
                  🔒 السيرة الذاتية جاهزة! للحصول على النسخة الكاملة والتحميل، يرجى إتمام الدفع عبر PayPal.
                </p>
                <a
                  href={paypalCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: '#ffc439', color: '#111', fontWeight: 'bold', padding: '10px 24px', borderRadius: '30px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
                >
                  💳 الدفع بواسطة PayPal (5$)
                </a>
                <button
                  onClick={() => setIsPaid(true)}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  (معاينة السيرة الذاتية بدون دفع للاختبار)
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: '#0f172a', padding: '14px', borderRadius: '12px', border: '1px solid #334155', overflowX: 'auto' }}>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#e2e8f0', fontSize: '13px', lineHeight: '1.6', fontFamily: 'inherit', margin: 0 }}>
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}

        <footer style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', paddingTop: '10px', borderTop: '1px solid #334155' }}>
          <p>© {new Date().getFullYear()} ResuMaker AI — جميع الحقوق محفوظة.</p>
        </footer>

      </div>
    </main>
  );
}

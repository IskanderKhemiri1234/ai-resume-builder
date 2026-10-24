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
      setError(err.message || 'حدث خطأ أثناء الاتصال');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '40px 16px', fontFamily: 'sans-serif' }} dir="rtl">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
            ⚡ Powered by Khemiri AI
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '12px' }}>مولد السير الذاتية الاحترافي 🚀</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>أدخل بياناتك وسيتم صياغة سيرة ذاتية احترافية لك خلال ثوانٍ.</p>
        </header>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #334155' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>الاسم الكامل</label>
            <input
              type="text"
              required
              placeholder="مثال: إسكندر الخميري"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>المسمى الوظيفي المستهدف</label>
            <input
              type="text"
              required
              placeholder="مثال: مهندس برمجيات"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
              value={formData.targetJob}
              onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>اللغة</label>
              <select
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                <option value="العربية">🇸🇦 العربية</option>
                <option value="English">🇬🇧 English</option>
                <option value="Français">🇫🇷 Français</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>النبرة</label>
              <select
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              >
                <option value="احترافية ورسمية">احترافية ورسمية</option>
                <option value="حديثة وديناميكية">حديثة وديناميكية</option>
                <option value="موجزة ومباشرة">موجزة ومباشرة</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>الخبرات ونبذة عن المسار المهني</label>
            <textarea
              rows={4}
              required
              placeholder="اكتب نبذة عن خبراتك وسجلك المهني..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box', resize: 'vertical' }}
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '6px' }}>المهارات الرئيسية</label>
            <input
              type="text"
              placeholder="مثال: Next.js, React, إدارة المشاريع"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' }}
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '14px', backgroundColor: loading ? '#4338ca' : '#4f46e5', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? '⏳ جاري الصياغة بالذكاء الاصطناعي (قد يستغرق حتى دقيقتين)...' : 'توليد السيرة الذاتية ✨'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', borderRadius: '8px', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '20px', backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
            <h2 style={{ color: '#34d399', fontSize: '18px', marginBottom: '12px' }}>السيرة الذاتية الناتجة:</h2>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', fontFamily: 'inherit' }}>{result}</pre>
          </div>
        )}

        <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
          <div style={{ marginBottom: '8px' }}>
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 8px' }}>سياسة الخصوصية</a> • 
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 8px' }}>نبذة عن الخدمة</a> • 
            <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 8px' }}>الدعم الفني</a>
          </div>
          <p>© {new Date().getFullYear()} ResuMaker AI — جميع الحقوق محفوظة.</p>
        </footer>

      </div>
    </main>
  );
}

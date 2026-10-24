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
        throw new Error(data.error || `خطأ من السيرفر (رمز ${res.status})`);
      }

      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 dir-rtl" dir="rtl">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* الهيدر */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-semibold border border-indigo-500/20">
            ⚡ Powered by Khemiri AI
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            مولد السير الذاتية الاحترافي 🚀
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            أدخل بياناتك وسيم صياغة سيرة ذاتية احترافية لك خلال ثوانٍ معدودة.
          </p>
        </header>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-2xl backdrop-blur-sm">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">الاسم الكامل</label>
            <input
              type="text"
              required
              placeholder="مثال: إسكندر الخميري"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">المسمى الوظيفي المستهدف</label>
            <input
              type="text"
              required
              placeholder="مثال: مطور ويب / مهندس برمجيات"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.targetJob}
              onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">لغة السيرة الذاتية</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                <option value="العربية">🇸🇦 العربية</option>
                <option value="English">🇬🇧 English</option>
                <option value="Français">🇫🇷 Français</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">نبرة الصياغة</label>
              <select
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
            <label className="block text-xs font-medium text-slate-300 mb-2">الخبرات والمسار المهني (نبذة عني)</label>
            <textarea
              rows={4}
              required
              placeholder="اكتب نبذة عن خبراتك والشركات التي عملت بها أو مشاريعك..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">المهارات الرئيسية</label>
            <input
              type="text"
              placeholder="مثال: JavaScript, Next.js, القيادة, حل المشكلات"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>⏳ جاري الصياغة بالذكاء الاصطناعي...</>
            ) : (
              <>توليد السيرة الذاتية ✨</>
            )}
          </button>
        </form>

        {/* تنبيه الخطأ */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        {/* النتيجة */}
        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-emerald-400">السيرة الذاتية المبتكرة:</h2>
            <div className="prose prose-invert max-w-none text-slate-300 text-sm whitespace-pre-wrap leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {result}
            </div>
          </div>
        )}

        {/* الفوتر */}
        <footer className="text-center pt-8 border-t border-slate-800/80 text-xs text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} ResuMaker AI — جميع الحقوق محفوظة.</p>
        </footer>

      </div>
    </main>
  );
}

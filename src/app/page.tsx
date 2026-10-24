import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between items-center p-6">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">ResuMaker AI</h1>
        <p className="text-slate-400">مولد السير الذاتية الاحترافي بالذكاء الاصطناعي</p>
      </header>
      <div className="w-full max-w-2xl mx-auto p-4 bg-slate-800 rounded-xl">
        <p className="text-slate-300 text-sm mb-4 text-center">
          أدخل بياناتك وسيتم صياغة سيرة ذاتية احترافية ومفصلة (قد يستغرق التوليد من ثوانٍ إلى دقيقتين لضمان أعلى جودة).
        </p>
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
          {loading...⌛️? "جاري التوليد بواسطة الذكاء الاصطناعي" : "توليد السيرة الذاتية"} ✨
        </button>
      </div>
      <footer className="w-full text-center py-6 mt-12 border-t border-slate-800">
        <a 
          href="/privacy-terms" 
          className="text-slate-400 hover:text-white transition-colors text-sm underline"
        >
          Privacy Policy & Terms of Service
        </a>
        <p className="text-xs text-slate-500 mt-2">
          &copy; 2026 ResuMaker AI. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

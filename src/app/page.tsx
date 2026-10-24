import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between items-center p-6">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold mb-2">ResuMaker AI</h1>
        <p className="text-slate-400">مولد السير الذاتية الاحترافي بالذكاء الاصطناعي</p>
      </header>

      <div className="w-full max-w-2xl bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl text-center">
        <p className="text-slate-300 mb-6">أدخل بياناتك وسيتك صياغة سيرة ذاتية احترافية خلال ثوانٍ</p>
        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all">
          توليد السيرة الذاتية ✨
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

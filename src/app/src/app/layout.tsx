import React from 'react';

export const metadata = {
  title: 'ResuMaker AI - مولد السير الذاتية',
  description: 'إنشاء سيرة ذاتية احترافية بالذكاء الاصطناعي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body className="bg-slate-950 text-white min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          {children}
        </div>
        
        {/* الفوتر القانوني الموحد للموقع */}
        <footer className="w-full text-center py-6 border-t border-slate-800 bg-slate-950">
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
      </body>
    </html>
  );
}

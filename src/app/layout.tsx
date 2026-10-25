import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ResuMaker AI - مولد السير الذاتية الاحترافي',
  description: 'إنشاء سير ذاتية احترافية بالذكاء الاصطناعي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a' }}>
        {children}
      </body>
    </html>
  );
}

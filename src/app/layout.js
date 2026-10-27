import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Khemiri Career AI',
  description: 'منصة الذكاء الاصطناعي الشاملة لتطوير الحسابات والسير الذاتية',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
        {/* شريط الملاحة العلوي */}
        <Navbar />
        
        {/* محتوى الصفحات */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}

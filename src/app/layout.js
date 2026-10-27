import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Khemiri Career AI',
  description: 'منصة الذكاء الاصطناعي الشاملة لتطوير الحسابات والسير الذاتية',
};

export default function RootLayout({ children }) {
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';

  return (
    <html lang="ar" dir="rtl">
      <head>
        {paypalClientId && (
          <script 
            src={`https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`} 
            async 
          />
        )}
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
        {/* شريط الملاحة العلوي الموحد */}
        <Navbar />
        
        {/* محتوى الصفحات الديناميكي */}
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}

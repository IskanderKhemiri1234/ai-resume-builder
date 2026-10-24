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
  const [authModal, setAuthModal] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [supportSent, setSupportSent] = useState(false);

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

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSent(true);
    setTimeout(() => {
      setSupportSent(false);
      setSupportModal(false);
    }, 2000);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0b0e', color: '#ededed', padding: '2.5rem 1.25rem', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      <style jsx global>{`
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; border-color: #52525b; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .khemiri-badge {
          animation: subtlePulse 3s infinite ease-in-out;
        }
        /* نظام شبكي ذكي لضمان التناسق الأفقي والعمودي بمعايير عالمية */
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.2rem;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.2rem;
        }
        @media (max-width: 768px) {
          .grid-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 0.6rem !important;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .grid-3 > div {
            min-width: 105px;
          }
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        
        {/* Navbar علوي أنيق */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid #1f242d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span style={{ fontWeight: '700', fontSize: '1.05rem', color: '#fff', letterSpacing: '-0.02em' }}>ResuMaker AI</span>
          </div>
          
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <span onClick={() => setAboutModal(true)} style={{ color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>About</span>
            <span onClick={() => setSupportModal(true)} style={{ color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>Support</span>
            <button onClick={() => setAuthModal(true)} style={{ background: '#181b22', color: '#fff', border: '1px solid #27272a', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer' }}>
              {userEmail ? 'Account' : 'Sign In'}
            </button>
          </div>
        </nav>

        {/* Modal: About Us */}
        {aboutModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '500px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '700' }}>About ResuMaker AI</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Enterprise-grade career platform engineered under <b>Khemiri AI</b> standards. We empower professionals worldwide to build ATS-optimized resumes and high-impact career assets.
              </p>
              <button onClick={() => setAboutModal(false)} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal: Support

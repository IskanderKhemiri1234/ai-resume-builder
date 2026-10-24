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
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0b0e', color: '#ededed', padding: '2.5rem 1.5rem', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      <style jsx global>{`
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; border-color: #52525b; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .khemiri-badge {
          animation: subtlePulse 3s infinite ease-in-out;
        }
      `}</style>

      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        
        {/* Navbar علوي أنيق بمعايير عالمية */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', paddingBottom: '1.2rem', borderBottom: '1px solid #1f242d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span style={{ fontWeight: '700', fontSize: '1rem', color: '#fff', letterSpacing: '-0.02em' }}>ResuMaker AI</span>
          </div>
          
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <span onClick={() => setAboutModal(true)} style={{ color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>About Us</span>
            <span onClick={() => setSupportModal(true)} style={{ color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}>Help & Support</span>
            <button onClick={() => setAuthModal(true)} style={{ background: '#181b22', color: '#fff', border: '1px solid #27272a', padding: '0.45rem 0.9rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '500', cursor: 'pointer' }}>
              {userEmail ? userEmail : 'Sign In'}
            </button>
            <button onClick={() => setAuthModal(true)} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '0.45rem 0.9rem', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' }}>
              Get Started
            </button>
          </div>
        </nav>

        {/* نافذة About Us المنبثقة */}
        {aboutModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.2rem', borderRadius: '16px', width: '100%', maxWidth: '520px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.3rem', fontWeight: '700' }}>About ResuMaker AI</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                ResuMaker AI is an enterprise-grade career suite designed to empower job seekers globally. Powered by advanced AI models developed under <b>Khemiri AI</b>, our platform streamlines resume creation, cover letter formulation, and LinkedIn profile optimization for maximum ATS compatibility.
              </p>
              <div style={{ background: '#0a0b0e', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d', marginBottom: '1.2rem' }}>
                <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>🌍 Our Mission</div>
                <div style={{ color: '#71717a', fontSize: '0.8rem' }}>To bridge the gap between talented professionals and global recruiters through high-impact, AI-driven career documents.</div>
              </div>
              <button onClick={() => setAboutModal(false)} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.65rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* نافذة Help & Support المنبثقة */}
        {supportModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.2rem', borderRadius: '16px', width: '100%', maxWidth: '450px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.2rem', fontWeight: '700' }}>Customer Support 🎧</h3>
              <p style={{ color: '#71717a', fontSize: '0.82rem', marginBottom: '1.2rem' }}>Have a question or need assistance with your download? Send us a message.</p>

              {supportSent ? (
                <div style={{ padding: '1rem', background: '#052e16', color: '#22c55e', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem' }}>
                  ✓ Thank you! Your ticket has been submitted. Our team will respond within 24 hours.
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Your Email</label>
                    <input type="email" required placeholder="name@company.com" style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Message / Issue</label>
                    <textarea required placeholder="Describe your inquiry..." style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.85rem', outline: 'none', minHeight: '80px' }} />
                  </div>
                  <button type="submit" style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                    Send Support Request
                  </button>
                  <button type="button" onClick={() => setSupportModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'center' }}>
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* نافذة Auth Modal */}
        {authModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.2rem', borderRadius: '16px', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}>
              
              <h3 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.3rem', fontWeight: '700' }}>Welcome to ResuMaker AI</h3>
              <p style={{ color: '#71717a', fontSize: '0.85rem', marginBottom: '1.6rem' }}>Sign in or create an account to manage your AI career documents.</p>
              
              <button onClick={() => { setUserEmail('alex.dev@gmail.com'); setAuthModal(false); }} style={{ width: '100%', background: '#ffffff', color: '#000000', border: '1px solid #e4e4e7', padding: '0.75rem', borderRadius: '10px', fontWeight: '600', marginBottom: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                Continue with Google
              </button>

              <div style={{ display: 'flex', alignItems: 'center', margin: '1.2rem 0', gap: '0.8rem' }}>
                <div style={{ flex: 1, height: '1px', background: '#27272a' }}></div>
                <span style={{ color: '#52525b', fontSize: '0.75rem', textTransform: 'uppercase' }}>or email</span>
                <div style={{ flex: 1, height: '1px', background: '#27272a' }}></div>
              </div>

              <input type="email" placeholder="name@company.com" style={{ width: '100%', padding: '0.75rem 0.9rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', marginBottom: '1rem', outline: 'none', fontSize: '0.9rem' }} />
              
              <button onClick={() => { setUserEmail('user@company.com'); setAuthModal(false); }} style={{ width: '100%', background: '#27272a', color: '#fff', border: '1px solid #3f3f46', padding: '0.75rem', borderRadius: '10px', fontWeight: '600', marginBottom: '1.2rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                Continue with Magic Link
              </button>

              <p style={{ color: '#52525b', fontSize: '0.75rem', lineHeight: '1.5', margin: 0 }}>
                By signing in, you agree to our{' '}
                <span onClick={() => setTermsModal(true)} style={{ color: '#a1a1aa', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span>{' '}
                and{' '}
                <span onClick={() => setTermsModal(true)} style={{ color: '#a1a1aa', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>.
              </p>

              <button onClick={() => setAuthModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer', fontSize:

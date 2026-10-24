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
        finalContent += '\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n✉️ خطاب التغطية الاحترافي (Cover Letter):\nعزيزي مدير التوظيف، أتقدم إليكم بطلب للانضمام إلى فريقكم...';
      }
      if (selectedPlan.price === '14.00') {
        finalContent += '\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n💼 تحسين ملف LinkedIn:\n- Headline احترافي وخبير في المجال...';
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
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0b0e', color: '#ededed', padding: '2.5rem 1.25rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      <style jsx global>{`
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; border-color: #52525b; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .khemiri-badge {
          animation: subtlePulse 3s infinite ease-in-out;
        }
        .global-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }
        .global-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .netflix-horizontal-scroll {
            display: flex !important;
            overflow-x: auto !important;
            gap: 1rem !important;
            padding-bottom: 0.8rem !important;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .netflix-horizontal-scroll > div {
            min-width: 240px !important;
            flex: 0 0 auto !important;
            scroll-snap-align: start;
          }
          .global-grid-3, .global-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Navbar */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid #1f242d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#fff' }}>ResuMaker AI</span>
          </div>
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <span onClick={() => setAboutModal(true)} style={{ color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer' }}>About</span>
            <span onClick={() => setSupportModal(true)} style={{ color: '#a1a1aa', fontSize: '0.85rem', cursor: 'pointer' }}>Support</span>
            <button onClick={() => setAuthModal(true)} style={{ background: '#181b22', color: '#fff', border: '1px solid #27272a', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.82rem', cursor: 'pointer' }}>
              {userEmail ? 'Account' : 'Sign In'}
            </button>
          </div>
        </nav>

        {aboutModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '500px' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>About ResuMaker AI</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Enterprise-grade career platform engineered under <b>Khemiri AI</b> standards.
              </p>
              <button onClick={() => setAboutModal(false)} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {supportModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '450px' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Customer Support 🎧</h3>
              {supportSent ? (
                <div style={{ padding: '1rem', background: '#052e16', color: '#22c55e', borderRadius: '8px', textAlign: 'center' }}>✓ Submitted successfully!</div>
              ) : (
                <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="email" required placeholder="name@company.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none' }} />
                  <textarea required placeholder="Describe your issue..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none', minHeight: '100px' }} />
                  <button type="submit" style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Send</button>
                  <button type="button" onClick={() => setSupportModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer' }}>Cancel</button>
                </form>
              )}
            </div>
          </div>
        )}

        {authModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Sign In</h3>
              <button onClick={() => { setUserEmail('alex.dev@gmail.com'); setAuthModal(false); }} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: '600', marginBottom: '1.2rem', cursor: 'pointer' }}>Continue with Google</button>
              <button onClick={() => setAuthModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        )}

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="khemiri-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#14161b', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.82rem', color: '#d4d4d8', border: '1px solid #27272a', marginBottom: '1.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span>⚡ Powered by Khemiri AI</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: '800', color: '#ffffff', margin: '0 0 0.8rem 0' }}>Career Path Platform</h1>
          <p style={{ color: '#71717a', fontSize: '1.05rem', maxWidth: '620px', margin: '0 auto', lineHeight: '1.6' }}>Create your resume, cover letter, and optimize your LinkedIn profile with elite global standards.</p>
        </header>

        {/* Stats */}
        <div className="global-grid-3" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ background: '#111318', padding: '1.4rem', borderRadius: '14px', border: '1px solid #1f242d' }}><div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>14,500+</div><div style={{ fontSize: '0.78rem', color: '#71717a' }}>Successful CVs</div></div>
          <div style={{ background: '#111318', padding: '1.4rem', borderRadius: '14px', border: '1px solid #1f242d' }}><div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>99.8%</div><div style={{ fontSize: '0.78rem', color: '#71717a' }}>Satisfaction Rate</div></div>
          <div style={{ background: '#111318', padding: '1.4rem', borderRadius: '14px', border: '1px solid #1f242d' }}><div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>ATS</div><div style={{ fontSize: '0.78rem', color: '#71717a' }}>100% Compatible</div></div>
        </div>

        {/* Packages */}
        <div style={{ marginBottom: '3.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '1.2rem', fontWeight: '700', textAlign: 'center', letterSpacing: '0.1em' }}>CHOOSE THE RIGHT PACKAGE</label>
          <div className="global-grid-3 netflix-horizontal-scroll">
            <div onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية' })} style={{ padding: '1.8rem 1.2rem', borderRadius: '16px', cursor: 'pointer', background: selectedPlan.price === '5.00' ? '#181b22' : '#111318', border: selectedPlan.price === '5.00' ? '1px solid #a1a1aa' : '1px solid #1f242d', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: '600' }}>Basic</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: '0.4rem 0' }}>$5.00</div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>Resume Only</p>
            </div>
            <div onClick={() => setSelectedPlan({ name: 'الباقة الشاملة', price: '9.00', description: 'سيرة ذاتية + خطاب' })} style={{ padding: '1.8rem 1.2rem', borderRadius: '16px', cursor: 'pointer', background: selectedPlan.price === '9.00' ? '#181b22' : '#111318', border: selectedPlan.price === '9.00' ? '1px solid #a1a1aa' : '1px solid #1f242d', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-11px', right: '50%', transform: 'translateX(50%)', background: '#fff', color: '#000', fontSize: '0.68rem', fontWeight: '800', padding: '3px 10px', borderRadius: '6px' }}>RECOMMENDED</div>
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: '600' }}>Comprehensive</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: '0.4rem 0' }}>$9.00</div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>Resume + Speech</p>
            </div>
            <div onClick={() => setSelectedPlan({ name: 'الباقة الملكية المتكاملة', price: '14.00', description: 'كل الخدمات' })} style={{ padding: '1.8rem 1.2rem', borderRadius: '16px', cursor: 'pointer', background: selectedPlan.price === '14.00' ? '#181b22' : '#111318', border: selectedPlan.price === '14.00' ? '1px solid #a1a1aa' : '1px solid #1f242d', textAlign: 'center' }}>
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: '600' }}>Royalty 👑</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', margin: '0.4rem 0' }}>$14.00</div>
              <p style={{ fontSize: '0.8rem', color: '#71717a', margin: 0 }}>The Complete Package</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: '#111318', padding: '2.5rem 2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #1f242d' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '700' }}>Full Name</label>
            <input type="text" required placeholder="Example: Iskandar al-Tunisi" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '700' }}>Target Job Title</label>
            <input type="text" required placeholder="Example: Software Engineer" value={formData.targetJob} onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none' }} />
          </div>
          <div className="global-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '700' }}>Language</label>
              <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none' }}>
                <option value="العربية">Arabic</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '700' }}>Tone</label>
              <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none' }}>
                <option value="حديثة وديناميكية">Modern</option>
                <option value="رسمية واحترافية">Formal</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '700' }}>Experience</label>
            <textarea required placeholder="Summary..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none', minHeight: '110px' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.88rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '700' }}>Skills</label>
            <input type="text" placeholder="React, Node.js..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', outline: 'none' }} />
          </div>
          <button type="submit" disabled={loading} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '1.1rem', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', width: '100%' }}>
            {loading ? 'Processing...' : `Start Generation (${selectedPlan.name})`}
          </button>
        </form>

        {error && <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#2a1215', color: '#f87171', borderRadius: '10px', textAlign: 'center' }}>⚠️ {error}</div>}

        {result && (
          <div style={{ marginTop: '3rem', background: '#111318', padding: '2.5rem 2rem', borderRadius: '20px', border: '1px solid #1f242d' }}>
            <h3 style={{ color: '#fff', marginBottom: '1.2rem' }}>✨ Generated Successfully</h3>
            {!paid ? (
              <div style={{ textAlign: 'center', background: '#0a0b0e', padding: '2rem', borderRadius: '16px' }}>
                <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>Unlock for <b>{selectedPlan.price}$</b></p>
                <div id="paypal-button-container"></div>
              </div>
            ) : (
              <div>
                <button onClick={handlePrintPDF} style={{ background: '#27272a', color: '#fff', border: 'none', padding: '0.65rem 1.3rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem' }}>📥 Download PDF</button>
                <pre style={{ background: '#0a0b0e', padding: '1.5rem', borderRadius: '14px', whiteSpace: 'pre-wrap', color: '#d4d4d8', fontSize: '0.9rem' }}>{result}</pre>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: '4.5rem', color: '#52525b', fontSize: '0.82rem', borderTop: '1px solid #1f242d', paddingTop: '2.2rem' }}>
          <div>© 2026 ResuMaker AI — Powered by Khemiri AI. All rights reserved.</div>
        </footer>

      </div>
    </main>
  );
}

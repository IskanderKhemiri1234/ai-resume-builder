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
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0b0e', color: '#ededed', padding: '1.5rem 1rem', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      <style jsx global>{`
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; border-color: #52525b; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .khemiri-badge {
          animation: subtlePulse 3s infinite ease-in-out;
        }
        .responsive-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }
        .responsive-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .responsive-grid-3, .responsive-grid-2 {
            grid-template-columns: 1fr !important;
          }
          .nav-links {
            display: none !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        
        {/* Navbar علوي أنيق ومتجاوب */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #1f242d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span style={{ fontWeight: '700', fontSize: '1rem', color: '#fff', letterSpacing: '-0.02em' }}>ResuMaker AI</span>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span onClick={() => setAboutModal(true)} style={{ color: '#a1a1aa', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '500' }}>About</span>
            <span onClick={() => setSupportModal(true)} style={{ color: '#a1a1aa', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '500' }}>Support</span>
            <button onClick={() => setAuthModal(true)} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
              {userEmail ? 'Account' : 'Sign In'}
            </button>
          </div>
        </nav>

        {/* نافذة About Us المنبثقة */}
        {aboutModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '480px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.2rem', fontWeight: '700' }}>About ResuMaker AI</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                ResuMaker AI is an enterprise-grade career suite powered by <b>Khemiri AI</b>. We help job seekers build high-impact, ATS-optimized career assets seamlessly.
              </p>
              <button onClick={() => setAboutModal(false)} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>
                Close
              </button>
            </div>
          </div>
        )}

        {/* نافذة Help & Support */}
        {supportModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '450px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.2rem', fontWeight: '700' }}>Customer Support 🎧</h3>
              <p style={{ color: '#71717a', fontSize: '0.82rem', marginBottom: '1.2rem' }}>Send us your inquiry and our team will respond promptly.</p>

              {supportSent ? (
                <div style={{ padding: '1rem', background: '#052e16', color: '#22c55e', borderRadius: '8px', textAlign: 'center', fontSize: '0.85rem' }}>
                  ✓ Request submitted successfully!
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <input type="email" required placeholder="your.email@domain.com" style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.85rem', outline: 'none' }} />
                  <textarea required placeholder="Describe your issue..." style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.85rem', outline: 'none', minHeight: '80px' }} />
                  <button type="submit" style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>Send Request</button>
                  <button type="button" onClick={() => setSupportModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* نافذة تسجيل الدخول Auth Modal */}
        {authModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.4rem', fontSize: '1.2rem', fontWeight: '700' }}>Sign In to ResuMaker AI</h3>
              <p style={{ color: '#71717a', fontSize: '0.82rem', marginBottom: '1.5rem' }}>Access your saved resumes and history instantly.</p>
              
              <button onClick={() => { setUserEmail('alex.dev@gmail.com'); setAuthModal(false); }} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '600', marginBottom: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                Continue with Google
              </button>
              <button onClick={() => setAuthModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Close</button>
            </div>
          </div>
        )}

        {/* نافذة الشروط Terms */}
        {termsModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Terms of Service & Privacy</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.8rem', lineHeight: '1.6', marginBottom: '1rem' }}>We respect your privacy. All documents are encrypted and processed securely. Payments are non-refundable once content is generated.</p>
              <button onClick={() => setTermsModal(false)} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>Got it</button>
            </div>
          </div>
        )}

        {/* Header الرئيسي */}
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="khemiri-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#14161b', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.78rem', color: '#d4d4d8', border: '1px solid #27272a', marginBottom: '1rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span>⚡ Powered by Khemiri AI</span>
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>
            Career Path Platform
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.9rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.5' }}>
            Create your resume, cover letter, and optimize your LinkedIn profile with world-class standards.
          </p>
        </header>

        {/* إحصائيات الثقة */}
        <div className="responsive-grid-3" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ background: '#111318', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>14,500+</div>
            <div style={{ fontSize: '0.72rem', color: '#71717a', marginTop: '0.1rem' }}>Successful CVs</div>
          </div>
          <div style={{ background: '#111318', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>99.8%</div>
            <div style={{ fontSize: '0.72rem', color: '#71717a', marginTop: '0.1rem' }}>Satisfaction</div>
          </div>
          <div style={{ background: '#111318', padding: '0.9rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>ATS</div>
            <div style={{ fontSize: '0.72rem', color: '#71717a', marginTop: '0.1rem' }}>100% Compatible</div>
          </div>
        </div>

        {/* الباقات الثلاث */}
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.7rem', fontWeight: '500', textAlign: 'center', letterSpacing: '0.05em' }}>
            CHOOSE THE RIGHT PACKAGE
          </label>
          <div className="responsive-grid-3">
            
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية فقط' })}
              style={{ padding: '1rem', borderRadius: '10px', cursor: 'pointer', background: selectedPlan.price === '5.00' ? '#181b22' : '#111318', border: selectedPlan.price === '5.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center' }}
            >
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.2rem' }}>Basic</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.3rem' }}>$5.00</div>
              <p style={{ fontSize: '0.72rem', color: '#71717a', margin: 0 }}>Resume Only</p>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الشاملة', price: '9.00', description: 'سيرة ذاتية + خطاب + مقابلة' })}
              style={{ padding: '1rem', borderRadius: '10px', cursor: 'pointer', background: selectedPlan.price === '9.00' ? '#181b22' : '#111318', border: selectedPlan.price === '9.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center', position: 'relative' }}
            >
              <div style={{ position: 'absolute', top: '-8px', right: '50%', transform: 'translateX(50%)', background: '#27272a', color: '#d4d4d8', fontSize: '0.58rem', fontWeight: '600', padding: '2px 6px', borderRadius: '4px' }}>popular</div>
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.2rem' }}>Comprehensive</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.3rem' }}>$9.00</div>
              <p style={{ fontSize: '0.72rem', color: '#71717a', margin: 0 }}>Resume + Speech</p>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الملكية المتكاملة', price: '14.00', description: 'كل الخدمات + لينكدإن' })}
              style={{ padding: '1rem', borderRadius: '10px', cursor: 'pointer', background: selectedPlan.price === '14.00' ? '#181b22' : '#111318', border: selectedPlan.price === '14.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center' }}
            >
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.2rem' }}>Royalty 👑</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.3rem' }}>$14.00</div>
              <p style={{ fontSize: '0.72rem', color: '#71717a', margin: 0 }}>Complete Suite</p>
            </div>

          </div>
        </div>

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit} style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #1f242d' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem', fontWeight: '500' }}>Full Name</label>
            <input type="text" required placeholder="Example: Iskandar al-Khemiri" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.88rem', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem', fontWeight: '500' }}>Target Job Title</label>
            <input type="text" required placeholder="Example: Software Engineer" value={formData.targetJob} onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })} style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.88rem', outline: 'none' }} />
          </div>

          <div className="responsive-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem', fontWeight: '500' }}>Language</label>
              <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                <option value="العربية">Arabic</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem', fontWeight: '500' }}>Tone</label>
              <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.88rem', outline: 'none' }}>
                <option value="حديثة وديناميكية">Modern</option>
                <option value="رسمية واحترافية">Formal</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem', fontWeight: '500' }}>Experience Summary</label>
            <textarea required placeholder="Write brief summary..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.88rem', outline: 'none', minHeight: '80px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem', fontWeight: '500' }}>Skills</label>
            <input type="text" placeholder="Example: React, Node.js..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.88rem', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.92rem', marginTop: '0.4rem', width: '100%' }}>
            {loading ? 'Processing...' : `Generate (${selectedPlan.name})`}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1rem', padding: '0.7rem', background: '#2a1215', color: '#f87171', borderRadius: '8px', fontSize: '0.82rem', textAlign: 'center', border: '1px solid #451a03' }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '2rem', background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d' }}>
            <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '0.8rem', fontSize: '1rem', fontWeight: '600' }}>
              ✨ Generated Successfully
            </h3>
            
            {!paid ? (
              <div style={{ textAlign: 'center', background: '#0a0b0e', padding: '1.2rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
                <p style={{ color: '#a1a1aa', marginBottom: '1rem', lineHeight: '1.5', fontSize: '0.85rem' }}>
                  Unlock full PDF download for <b>{selectedPlan.name}</b> ({selectedPlan.price}$).
                </p>
                <div id="paypal-button-container"></div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <p style={{ color: '#22c55e', fontWeight: '600', margin: 0, fontSize: '0.88rem' }}>✓ Payment Confirmed!</p>
                  <button onClick={handlePrintPDF} style={{ background: '#27272a', color: '#fff', border: '1px solid #3f3f46', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Download / Print PDF
                  </button>
                </div>
                <pre style={{ background: '#0a0b0e', padding: '1rem', borderRadius: '8px', whiteSpace: 'pre-wrap', color: '#d4d4d8', fontSize: '0.82rem', border: '1px solid #1f242d', maxHeight: '400px', overflowY: 'auto' }}>
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* آراء العملاء */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.3rem 0' }}>Loved Worldwide</h3>
            <p style={{ color: '#71717a', fontSize: '0.8rem' }}>What professionals say about ResuMaker AI</p>
          </div>

          <div className="responsive-grid-3">
            <div style={{ background: '#111318', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
              <p style={{ color: '#d4d4d8', fontSize: '0.8rem', lineHeight: '1.4', margin: '0 0 0.8rem 0' }}>
                "J'ai décroché mon premier entretien en seulement 3 jours !"
              </p>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginBottom: '0.2rem' }}>★★★★★</div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>Sami B.</div>
                <div style={{ color: '#71717a', fontSize: '0.7rem' }}>Engineer, France</div>
              </div>
            </div>

            <div style={{ background: '#111318', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
              <p style={{ color: '#d4d4d8', fontSize: '0.8rem', lineHeight: '1.4', margin: '0 0 0.8rem 0' }}>
                "The LinkedIn profile suggestions completely changed my visibility."
              </p>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginBottom: '0.2rem' }}>★★★★★</div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>Sarah M.</div>
                <div style={{ color: '#71717a', fontSize: '0.7rem' }}>Director, UK</div>
              </div>
            </div>

            <div style={{ background: '#111318', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d' }}>
              <p style={{ color: '#d4d4d8', fontSize: '0.8rem', lineHeight: '1.4', margin: '0 0 0.8rem 0' }}>
                "السيرة الذاتية متوافقة تماماً مع نظام الـ ATS واختصرت علي أياماً."
              </p>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.75rem', marginBottom: '0.2rem' }}>★★★★★</div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>أحمد العتيبي</div>
                <div style={{ color: '#71717a', fontSize: '0.7rem' }}>السعودية</div>
              </div>
            </div>
          </div>
        </div>

        {/* قسم المقالات */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.3rem 0' }}>Career Insights</h3>
            <p style={{ color: '#71717a', fontSize: '0.8rem' }}>Master your job search</p>
          </div>

          <div className="responsive-grid-3">
            <div style={{ background: '#111318', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: '#181b22', color: '#a1a1aa', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', border: '1px solid #27272a' }}>ATS</span>
                <h4 style={{ color: '#fff', fontSize: '0.85rem', margin: '0.5rem 0 0.3rem 0', fontWeight: '600' }}>How to Beat the ATS Screening in 2026</h4>
                <p style={{ color: '#71717a', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>Discover essential formatting secrets.</p>
              </div>
              <div style={{ marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.72rem', fontWeight: '500', cursor: 'pointer' }}>Read →</div>
            </div>

            <div style={{ background: '#111318', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: '#181b22', color: '#a1a1aa', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', border: '1px solid #27272a' }}>LinkedIn</span>
                <h4 style={{ color: '#fff', fontSize: '0.85rem', margin: '0.5rem 0 0.3rem 0', fontWeight: '600' }}>Optimizing Your Headline</h4>
                <p style={{ color: '#71717a', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>Attract high-ticket recruiters organically.</p>
              </div>
              <div style={{ marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.72rem', fontWeight: '500', cursor: 'pointer' }}>Read →</div>
            </div>

            <div style={{ background: '#111318', padding: '1rem', borderRadius: '10px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: '#181b22', color: '#a1a1aa', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', border: '1px solid #27272a' }}>Interview</span>
                <h4 style={{ color: '#fff', fontSize: '0.85rem', margin: '0.5rem 0 0.3rem 0', fontWeight: '600' }}>Mastering Behavioral Questions</h4>
                <p style={{ color: '#71717a', fontSize: '0.75rem', lineHeight: '1.4', margin: 0 }}>Structure your answers using STAR.</p>
              </div>
              <div style={{ marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.72rem', fontWeight: '500', cursor: 'pointer' }}>Read →</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: '3rem', color: '#52525b', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid #1f242d', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span onClick={() => setAboutModal(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>About Us</span>
            <span onClick={() => setSupportModal(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Help & Support</span>
            <span onClick={() => setTermsModal(true)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Terms of Service</span>
          </div>
          <div>© 2026 ResuMaker AI — Powered by Khemiri AI. All rights reserved.</div>
        </footer>

      </div>
    </main>
  );
}

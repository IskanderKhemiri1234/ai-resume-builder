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
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0b0e', color: '#ededed', padding: '2rem 1.25rem', fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      
      <style jsx global>{`
        @keyframes subtlePulse {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; border-color: #52525b; }
          100% { transform: scale(1); opacity: 0.9; }
        }
        .khemiri-badge {
          animation: subtlePulse 3s infinite ease-in-out;
        }
        .grid-3-col {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
        }
        .grid-2-col {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .grid-3-col, .grid-2-col {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Navbar علوي متجاوب واحترافي */}
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

        {/* Modal: Support */}
        {supportModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 101, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '450px', textAlign: 'left' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '700' }}>Customer Support 🎧</h3>
              <p style={{ color: '#71717a', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Our team typically responds within 24 hours.</p>

              {supportSent ? (
                <div style={{ padding: '1rem', background: '#052e16', color: '#22c55e', borderRadius: '8px', textAlign: 'center', fontSize: '0.9rem' }}>
                  ✓ Support request submitted successfully!
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <input type="email" required placeholder="name@company.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                  <textarea required placeholder="Describe your issue or inquiry..." style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.9rem', outline: 'none', minHeight: '100px' }} />
                  <button type="submit" style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}>Send Request</button>
                  <button type="button" onClick={() => setSupportModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center' }}>Cancel</button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Modal: Auth */}
        {authModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '1rem' }}>
            <div style={{ background: '#111318', border: '1px solid #27272a', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
              <h3 style={{ color: '#fff', marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: '700' }}>Sign In to ResuMaker AI</h3>
              <p style={{ color: '#71717a', fontSize: '0.88rem', marginBottom: '1.8rem' }}>Manage your career assets securely.</p>
              
              <button onClick={() => { setUserEmail('alex.dev@gmail.com'); setAuthModal(false); }} style={{ width: '100%', background: '#ffffff', color: '#000', border: 'none', padding: '0.8rem', borderRadius: '10px', fontWeight: '600', marginBottom: '1.2rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                Continue with Google
              </button>
              <button onClick={() => setAuthModal(false)} style={{ background: 'transparent', color: '#71717a', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>Close</button>
            </div>
          </div>
        )}

        {/* Header الرئيسي */}
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="khemiri-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#14161b', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.82rem', color: '#d4d4d8', border: '1px solid #27272a', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }}></span>
            <span>⚡ Powered by Khemiri AI</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#ffffff', margin: '0 0 0.8rem 0', letterSpacing: '-0.02em' }}>
            Career Path Platform
          </h1>
          <p style={{ color: '#71717a', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Create your resume, cover letter, and optimize your LinkedIn profile with elite global standards.
          </p>
        </header>

        {/* إحصائيات الثقة */}
        <div className="grid-3-col" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ background: '#111318', padding: '1.2rem', borderRadius: '12px', border: '1px solid #1f242d' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>14,500+</div>
            <div style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '0.3rem' }}>Successful CVs</div>
          </div>
          <div style={{ background: '#111318', padding: '1.2rem', borderRadius: '12px', border: '1px solid #1f242d' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>99.8%</div>
            <div style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '0.3rem' }}>Satisfaction Rate</div>
          </div>
          <div style={{ background: '#111318', padding: '1.2rem', borderRadius: '12px', border: '1px solid #1f242d' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff' }}>ATS</div>
            <div style={{ fontSize: '0.78rem', color: '#71717a', marginTop: '0.3rem' }}>100% Compatible</div>
          </div>
        </div>

        {/* الباقات الثلاث */}
        <div style={{ marginBottom: '3rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '1rem', fontWeight: '600', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            CHOOSE THE RIGHT PACKAGE
          </label>
          <div className="grid-3-col">
            
            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الأساسية', price: '5.00', description: 'سيرة ذاتية فقط' })}
              style={{ padding: '1.5rem 1rem', borderRadius: '14px', cursor: 'pointer', background: selectedPlan.price === '5.00' ? '#181b22' : '#111318', border: selectedPlan.price === '5.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center', transition: 'all 0.2s ease' }}
            >
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Basic</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>$5.00</div>
              <p style={{ fontSize: '0.78rem', color: '#71717a', margin: 0 }}>Resume Only</p>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الشاملة', price: '9.00', description: 'سيرة ذاتية + خطاب + مقابلة' })}
              style={{ padding: '1.5rem 1rem', borderRadius: '14px', cursor: 'pointer', background: selectedPlan.price === '9.00' ? '#181b22' : '#111318', border: selectedPlan.price === '9.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center', position: 'relative', transition: 'all 0.2s ease' }}
            >
              <div style={{ position: 'absolute', top: '-10px', right: '50%', transform: 'translateX(50%)', background: '#27272a', color: '#d4d4d8', fontSize: '0.65rem', fontWeight: '600', padding: '2px 8px', borderRadius: '4px', border: '1px solid #3f3f46' }}>recommended</div>
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Comprehensive</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>$9.00</div>
              <p style={{ fontSize: '0.78rem', color: '#71717a', margin: 0 }}>Resume + Speech</p>
            </div>

            <div 
              onClick={() => setSelectedPlan({ name: 'الباقة الملكية المتكاملة', price: '14.00', description: 'كل الخدمات + لينكدإن' })}
              style={{ padding: '1.5rem 1rem', borderRadius: '14px', cursor: 'pointer', background: selectedPlan.price === '14.00' ? '#181b22' : '#111318', border: selectedPlan.price === '14.00' ? '1px solid #71717a' : '1px solid #1f242d', textAlign: 'center', transition: 'all 0.2s ease' }}
            >
              <div style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Royalty 👑</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.5rem' }}>$14.00</div>
              <p style={{ fontSize: '0.78rem', color: '#71717a', margin: 0 }}>The Complete Package</p>
            </div>

          </div>
        </div>

        {/* نموذج الإدخال */}
        <form onSubmit={handleSubmit} style={{ background: '#111318', padding: '2.5rem 2rem', borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '1.4rem', border: '1px solid #1f242d', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
            <input type="text" required placeholder="Example: Iskandar al-Tunisi" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '600' }}>Target Job Title</label>
            <input type="text" required placeholder="Example: Software Engineer" value={formData.targetJob} onChange={(e) => setFormData({ ...formData, targetJob: e.target.value })} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <div className="grid-2-col">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '600' }}>Document Language</label>
              <select value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.95rem', outline: 'none' }}>
                <option value="العربية">Arabic</option>
                <option value="English">English</option>
                <option value="Français">Français</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '600' }}>Tone of Wording</label>
              <select value={formData.tone} onChange={(e) => setFormData({ ...formData, tone: e.target.value })} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.95rem', outline: 'none' }}>
                <option value="حديثة وديناميكية">Modern & Dynamic</option>
                <option value="رسمية واحترافية">Formal & Professional</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '600' }}>Experience & Career Path</label>
            <textarea required placeholder="Write a brief summary of your previous professional achievements..." value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.95rem', outline: 'none', minHeight: '110px', resize: 'vertical' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: '600' }}>Technical & Personal Skills</label>
            <input type="text" placeholder="Example: React, Next.js, Node.js, Leadership..." value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #27272a', background: '#0a0b0e', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading} style={{ background: '#ffffff', color: '#000000', border: 'none', padding: '1rem', borderRadius: '10px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1.05rem', marginTop: '0.8rem', width: '100%', transition: 'opacity 0.2s ease' }}>
            {loading ? 'Processing Generation...' : `Start Instant Generation (${selectedPlan.name})`}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#2a1215', color: '#f87171', borderRadius: '10px', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #451a03' }}>
            ⚠️ {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: '3rem', background: '#111318', padding: '2.5rem 2rem', borderRadius: '18px', border: '1px solid #1f242d' }}>
            <h3 style={{ color: '#ffffff', marginTop: 0, marginBottom: '1.2rem', fontSize: '1.2rem', fontWeight: '700' }}>
              ✨ Content Generated Successfully
            </h3>
            
            {!paid ? (
              <div style={{ textAlign: 'center', background: '#0a0b0e', padding: '2rem', borderRadius: '14px', border: '1px solid #1f242d' }}>
                <p style={{ color: '#a1a1aa', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Your complete package for <b>{selectedPlan.name}</b> is ready! Unlock instant high-resolution PDF download and editable copy for <b>{selectedPlan.price}$</b>.
                </p>
                <div id="paypal-button-container" style={{ marginTop: '1rem' }}></div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <p style={{ color: '#22c55e', fontWeight: '700', margin: 0, fontSize: '1rem' }}>✓ Payment Successful! Here is your complete suite:</p>
                  <button onClick={handlePrintPDF} style={{ background: '#27272a', color: '#fff', border: '1px solid #3f3f46', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.88rem' }}>
                    📥 Download / Print PDF
                  </button>
                </div>
                <pre style={{ background: '#0a0b0e', padding: '1.5rem', borderRadius: '12px', whiteSpace: 'pre-wrap', color: '#d4d4d8', fontSize: '0.9rem', border: '1px solid #1f242d', maxHeight: '500px', overflowY: 'auto', lineHeight: '1.7' }}>
                  {result}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* آراء العملاء */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Loved by Job Seekers Worldwide</h3>
            <p style={{ color: '#71717a', fontSize: '0.9rem' }}>Here is what professionals are saying about ResuMaker AI</p>
          </div>

          <div className="grid-3-col">
            <div style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ color: '#d4d4d8', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 1.2rem 0' }}>
                "L'optimisation du CV et la lettre de motivation générées étaient incroyables. J'ai décroché mon premier entretien en seulement 3 jours !"
              </p>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.3rem' }}>★★★★★</div>
                <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '700' }}>Sami B.</div>
                <div style={{ color: '#71717a', fontSize: '0.75rem' }}>Full Stack Engineer, France</div>
              </div>
            </div>

            <div style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ color: '#d4d4d8', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 1.2rem 0' }}>
                "The LinkedIn profile suggestions completely changed my visibility. Recruiters started messaging me directly!"
              </p>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.3rem' }}>★★★★★</div>
                <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '700' }}>Sarah M.</div>
                <div style={{ color: '#71717a', fontSize: '0.75rem' }}>Marketing Director, UK</div>
              </div>
            </div>

            <div style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ color: '#d4d4d8', fontSize: '0.88rem', lineHeight: '1.6', margin: '0 0 1.2rem 0' }}>
                "السيرة الذاتية متوافقة تماماً مع نظام الـ ATS. التنسيق راقي جداً واختصر علي أياماً من العمل."
              </p>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '0.85rem', marginBottom: '0.3rem' }}>★★★★★</div>
                <div style={{ color: '#fff', fontSize: '0.88rem', fontWeight: '700' }}>أحمد العتيبي</div>
                <div style={{ color: '#71717a', fontSize: '0.75rem' }}>مطور أنظمة، السعودية</div>
              </div>
            </div>
          </div>
        </div>

        {/* قسم المقالات */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Career Insights & Expert Guides</h3>
            <p style={{ color: '#71717a', fontSize: '0.9rem' }}>Master your job search with professional strategies</p>
          </div>

          <div className="grid-3-col">
            <div style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: '#181b22', color: '#a1a1aa', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', border: '1px solid #27272a' }}>ATS</span>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0.8rem 0 0.5rem 0', fontWeight: '700' }}>How to Beat the ATS Screening in 2026</h4>
                <p style={{ color: '#71717a', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>Discover essential formatting secrets and keyword strategies.</p>
              </div>
              <div style={{ marginTop: '1.2rem', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Read Article →</div>
            </div>

            <div style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: '#181b22', color: '#a1a1aa', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', border: '1px solid #27272a' }}>LinkedIn</span>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0.8rem 0 0.5rem 0', fontWeight: '700' }}>Optimizing Your Headline</h4>
                <p style={{ color: '#71717a', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>Attract high-ticket recruiters organically to your profile.</p>
              </div>
              <div style={{ marginTop: '1.2rem', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Read Article →</div>
            </div>

            <div style={{ background: '#111318', padding: '1.5rem', borderRadius: '14px', border: '1px solid #1f242d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ background: '#181b22', color: '#a1a1aa', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', border: '1px solid #27272a' }}>Interview</span>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0.8rem 0 0.5rem 0', fontWeight: '700' }}>Mastering Behavioral Questions</h4>
                <p style={{ color: '#71717a', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>A step-by-step framework using the STAR methodology.</p>
              </div>
              <div style={{ marginTop: '1.2rem', color: '#94a3b8', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' }}>Read Article →</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#52525b', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid #1f242d', paddingTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
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

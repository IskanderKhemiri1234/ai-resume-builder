'use client';

import React, { useState } from 'react';

export default function ResuMakerUltimatePlatform() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English (US / UK)');
  const [tone, setTone] = useState('Executive C-Level');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [activeTab, setActiveTab] = useState('resume');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('ResuMaker AI: Powered by Khemiri — Elite Career Package Generated Successfully!');
    }, 1500);
  };

  return (
    <div style={{
      backgroundColor: '#030307',
      color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      width: '100%',
      padding: '1.25rem 1rem 4rem 1rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Top Banner / Announcement */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '50px',
        padding: '0.65rem 1rem',
        margin: '0.5rem 0 1.5rem 0',
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '700',
        color: '#818cf8',
        boxShadow: '0 0 20px rgba(99,102,241,0.15)'
      }}>
        ✨ Powered by Khemiri AI Engine — Western Market Recruitment Standards
      </div>

      {/* Header */}
      <header style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid #1e293b',
        marginBottom: '2.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '1.3rem',
            color: '#fff',
            boxShadow: '0 0 20px rgba(99,102,241,0.5)'
          }}>R</div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fff' }}>
              ResuMaker <span style={{ color: '#818cf8' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Powered by Khemiri
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button style={{
            backgroundColor: '#1e293b',
            border: 'none',
            color: '#fff',
            padding: '0.6rem 1.1rem',
            borderRadius: '10px',
            fontSize: '0.75rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}>Sign In</button>
          <button style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            border: 'none',
            color: '#fff',
            padding: '0.6rem 1.1rem',
            borderRadius: '10px',
            fontSize: '0.75rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(79,70,229,0.4)'
          }}>Get Started</button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', maxWidth: '750px', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '900', lineHeight: '1.15', color: '#fff', margin: '0 0 1rem 0' }}>
          Career Path Platform Elite
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 2rem 0' }}>
          Architect your elite executive resume, high-converting cover letter, and optimize your LinkedIn profile with global standards engineered by Khemiri.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '650px', margin: '0 auto' }}>
          {[
            { n: '+14.5K', l: 'Elite CVs' },
            { n: '99.8%', l: 'Success Rate' },
            { n: '100%', l: 'ATS Pass' }
          ].map((st, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '1rem 0.5rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fff' }}>{st.n}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '800', marginTop: '4px' }}>{st.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Generator Form Card */}
      <section style={{
        width: '100%',
        maxWidth: '680px',
        backgroundColor: '#0f172a',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '24px',
        padding: '1.75rem',
        boxSizing: 'border-box',
        marginBottom: '4rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
      }}>
        {/* Tab Buttons */}
        <div style={{ display: 'flex', backgroundColor: '#020617', padding: '4px', borderRadius: '12px', marginBottom: '1.5rem' }}>
          {['resume', 'cover', 'linkedin'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '0.6rem 0',
                borderRadius: '9px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                color: activeTab === tab ? '#fff' : '#64748b',
                fontWeight: '800',
                fontSize: '0.75rem',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {tab === 'resume' ? 'Resume ATS' : tab === 'cover' ? 'Cover Letter' : 'LinkedIn'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              FULL NAME & CREDENTIALS
            </label>
            <input
              type="text"
              placeholder="e.g. Iskandar Khemiri, MBA"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                color: '#fff',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              TARGET POSITION
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Principal AI Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                color: '#fff',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                LANGUAGE
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              >
                <option value="English (US)">English (US / UK Standard)</option>
                <option value="French">French (European Corporate)</option>
                <option value="Arabic">Arabic (GCC Standard)</option>
              </select>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                TONE
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  color: '#fff',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
              >
                <option value="Executive C-Level">Executive C-Level</option>
                <option value="Modern Corporate">Modern Corporate</option>
                <option value="Creative Tech">Creative Tech</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              CAREER SUMMARY
            </label>
            <textarea
              rows={3}
              placeholder="Briefly state your achievements..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                color: '#fff',
                fontSize: '0.85rem',
                resize: 'none',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              CORE SKILLS
            </label>
            <input
              type="text"
              placeholder="e.g. Next.js, AI Architecture, Leadership"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#020617',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                color: '#fff',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              border: 'none',
              borderRadius: '14px',
              padding: '1.1rem',
              color: '#fff',
              fontWeight: '900',
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 10px 25px rgba(79,70,229,0.4)'
            }}
          >
            {isGenerating ? 'Processing AI Generation...' : '🚀 Start Instant Generation'}
          </button>
        </form>
      </section>

      {/* Global Pricing Section (PayPal & Stripe) */}
      <section style={{ width: '100%', maxWidth: '1000px', textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginBottom: '0.4rem' }}>Transparent Pricing</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Secure international checkouts via PayPal & Stripe</p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { title: 'Starter', price: '$9', desc: 'Single Application with ATS Standard Formatting', btn: 'Pay via PayPal' },
            { title: 'Professional Suite', price: '$29', desc: 'Complete Suite: Resume + Cover Letter + LinkedIn Optimization', btn: 'Pay via PayPal / Stripe', highlight: true },
            { title: 'Executive Access', price: '$59', desc: 'Unlimited AI Generations & Priority Career Routing', btn: 'Pay via PayPal' }
          ].map((pl, i) => (
            <div key={i} style={{
              flex: '1 1 280px',
              maxWidth: '320px',
              backgroundColor: pl.highlight ? 'rgba(79,70,229,0.15)' : '#0f172a',
              border: pl.highlight ? '2px solid #6366f1' : '1px solid #1e293b',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#818cf8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{pl.title}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem' }}>{pl.price}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '1.5rem' }}>{pl.desc}</div>
              </div>
              <button style={{
                width: '100%',
                backgroundColor: pl.highlight ? '#4f46e5' : '#1e293b',
                border: 'none',
                color: '#fff',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>{pl.btn}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section with Star Ratings */}
      <section style={{ width: '100%', maxWidth: '1000px', textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginBottom: '0.4rem' }}>Loved by Job Seekers Worldwide</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>Verified reviews from elite professionals across the US, UK & Europe</p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { quote: "The ATS compatibility feature completely transformed my job hunt in New York. Recruiters started messaging me directly within 48 hours!", name: "Sarah Miller", role: "Marketing Director, NY" },
            { quote: "Building a world-class executive resume took less than 3 minutes. Powered by Khemiri AI is an absolute technological masterpiece.", name: "Sami Ben Ali", role: "Senior Architect, London" },
            { quote: "The LinkedIn profile optimization modules gave my professional network 5x more organic reach across Europe.", name: "Ahmad Khemiri", role: "Business Analyst, Paris" }
          ].map((item, idx) => (
            <div key={idx} style={{
              flex: '1 1 280px',
              maxWidth: '320px',
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ color: '#fbbf24', fontSize: '1.1rem', letterSpacing: '2px', marginBottom: '1rem' }}>★★★★★</div>
                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>"{item.quote}"</p>
              </div>
              <div>
                <div style={{ fontWeight: '800', color: '#fff', fontSize: '0.85rem' }}>{item.name}</div>
                <div style={{ color: '#818cf8', fontSize: '0.7rem', fontWeight: '700', marginTop: '2px' }}>{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        width: '100%',
        maxWidth: '1000px',
        borderTop: '1px solid #1e293b',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#475569'
      }}>
        © 2026 ResuMaker AI Platform (Powered by Khemiri). All rights reserved.
      </footer>

    </div>
  );
}

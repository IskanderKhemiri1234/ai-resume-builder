'use client';

import React, { useState } from 'react';

export default function ResuMakerMasterpiece() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English (US / UK Standard)');
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
      alert('ResuMaker AI: Powered by Khemiri Engine — Generation Started!');
    }, 1500);
  };

  return (
    <div style={{
      backgroundColor: '#030307',
      color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      width: '100%',
      padding: '1rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      
      {/* Top Banner */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '50px',
        padding: '0.6rem 1rem',
        margin: '0.5rem 0 1.5rem 0',
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '700',
        color: '#818cf8'
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
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '1.2rem',
            color: '#fff'
          }}>R</div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fff' }}>
              ResuMaker <span style={{ color: '#818cf8' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '700', color: '#64748b' }}>
              Powered by Khemiri
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{
            backgroundColor: '#1e293b',
            border: 'none',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '700'
          }}>Sign In</button>
          <button style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            border: 'none',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '800'
          }}>Get Started</button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ textAlign: 'center', maxWidth: '700px', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', lineHeight: '1.2', color: '#fff', margin: '0 0 1rem 0' }}>
          Career Path Platform Elite
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
          Architect your elite executive resume, high-converting cover letter, and optimize your LinkedIn profile with global standards engineered by Khemiri.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
          {[
            { n: '+14.5K', l: 'Elite CVs' },
            { n: '99.8%', l: 'Success Rate' },
            { n: '100%', l: 'ATS Pass' }
          ].map((st, i) => (
            <div key={i} style={{ flex: 1, backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '0.75rem 0.25rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fff' }}>{st.n}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '700' }}>{st.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Form Card */}
      <section style={{
        width: '100%',
        maxWidth: '650px',
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '20px',
        padding: '1.5rem',
        boxSizing: 'border-box',
        marginBottom: '3rem'
      }}>
        {/* Tab Buttons */}
        <div style={{ display: 'flex', backgroundColor: '#020617', padding: '4px', borderRadius: '10px', marginBottom: '1.2rem' }}>
          {['resume', 'cover', 'linkedin'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '0.5rem 0',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                color: activeTab === tab ? '#fff' : '#64748b',
                fontWeight: '800',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {tab === 'resume' ? 'Resume ATS' : tab === 'cover' ? 'Cover Letter' : 'LinkedIn'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.3rem' }}>
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
                borderRadius: '10px',
                padding: '0.75rem',
                color: '#fff',
                fontSize: '0.85rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.3rem' }}>
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
                borderRadius: '10px',
                padding: '0.75rem',
                color: '#fff',
                fontSize: '0.85rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.3rem' }}>
                LANGUAGE
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  color: '#fff',
                  fontSize: '0.8rem',
                  boxSizing: 'border-box'
                }}
              >
                <option value="English (US)">English (US / UK)</option>
                <option value="French">French (EU)</option>
                <option value="Arabic">Arabic (GCC)</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.3rem' }}>
                TONE
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: '#020617',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  color: '#fff',
                  fontSize: '0.8rem',
                  boxSizing: 'border-box'
                }}
              >
                <option value="Executive C-Level">Executive C-Level</option>
                <option value="Modern Corporate">Modern Corporate</option>
                <option value="Creative Tech">Creative Tech</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.3rem' }}>
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
                borderRadius: '10px',
                padding: '0.75rem',
                color: '#fff',
                fontSize: '0.85rem',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.3rem' }}>
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
                borderRadius: '10px',
                padding: '0.75rem',
                color: '#fff',
                fontSize: '0.85rem',
                boxSizing: 'border-box'
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
              borderRadius: '12px',
              padding: '1rem',
              color: '#fff',
              fontWeight: '900',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '0.5rem'
            }}
          >
            {isGenerating ? 'Processing...' : '🚀 Start Instant Generation'}
          </button>
        </form>
      </section>

      {/* Pricing */}
      <section style={{ width: '100%', maxWidth: '900px', textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff', marginBottom: '0.3rem' }}>Transparent Pricing</h2>
        <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1.5rem' }}>PayPal & Stripe Ready</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { title: 'Starter', price: '$9', desc: 'Single Application', btn: 'Pay via PayPal' },
            { title: 'Professional Suite', price: '$29', desc: 'Resume + Cover + LinkedIn', btn: 'Pay via PayPal / Stripe', h: true },
            { title: 'Executive', price: '$59', desc: 'Unlimited AI Access', btn: 'Pay via PayPal' }
          ].map((pl, i) => (
            <div key={i} style={{
              flex: '1 1 250px',
              backgroundColor: pl.h ? 'rgba(79,70,229,0.2)' : '#0f172a',
              border: pl.h ? '2px solid #6366f1' : '1px solid #1e293b',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#818cf8', marginBottom: '0.25rem' }}>{pl.title}</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem' }}>{pl.price}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1rem' }}>{pl.desc}</div>
              </div>
              <button style={{
                width: '100%',
                backgroundColor: pl.h ? '#4f46e5' : '#1e293b',
                border: 'none',
                color: '#fff',
                padding: '0.75rem',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '0.75rem'
              }}>{pl.btn}</button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem', fontSize: '0.7rem', color: '#475569' }}>
        © 2026 ResuMaker AI Platform (Powered by Khemiri). All rights reserved.
      </footer>

    </div>
  );
}

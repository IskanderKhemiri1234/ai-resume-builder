'use client';

import React, { useState } from 'react';

export default function ResuMakerNextGen() {
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
      alert('ResuMaker AI: Powered by Khemiri Engine — Elite Career Package Generated Successfully!');
    }, 2000);
  };

  return (
    <div style={{
      backgroundColor: '#030307',
      color: '#f1f5f9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      margin: 0,
      padding: '0 1rem 4rem 1rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }}>

      {/* Dynamic Background Glow Effect */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(79,70,229,0.25) 0%, rgba(6,182,212,0.15) 50%, rgba(0,0,0,0) 80%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Announcement Bar */}
      <div style={{
        width: '100%',
        maxWdith: '1200px',
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '999px',
        padding: '0.6rem 1.2rem',
        marginTop: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '700',
        color: '#818cf8',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        boxShadow: '0 0 20px rgba(99,102,241,0.2)',
        zIndex: 1
      }}>
        ✨ Powered by Khemiri AI Engine — Global Recruitment Standard for US, UK & Europe
      </div>

      {/* Header */}
      <header style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '2.5rem',
        zIndex: 1
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
            fontSize: '1.4rem',
            color: '#fff',
            boxShadow: '0 0 25px rgba(99,102,241,0.6)'
          }}>R</div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ffffff', leading: '1' }}>
              ResuMaker <span style={{ color: '#818cf8' }}>AI</span>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', tracking: '2px', textTransform: 'uppercase' }}>
              Powered by Khemiri
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e2e8f0',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}>Sign In</button>
          <button style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            border: 'none',
            color: '#ffffff',
            padding: '0.6rem 1.2rem',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(79,70,229,0.4)'
          }}>Get Started Free</button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        width: '100%',
        maxWidth: '1100px',
        textAlign: 'center',
        marginBottom: '3rem',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '900',
          lineHeight: '1.15',
          margin: '0 0 1rem 0',
          color: '#ffffff'
        }}>
          Career Path <br />
          <span style={{
            background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #22d3ee 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Platform Elite</span>
        </h1>
        <p style={{
          color: '#94a3b8',
          fontSize: '0.95rem',
          maxWidth: '650px',
          margin: '0 auto 2rem auto',
          lineHeight: '1.6'
        }}>
          Architect your elite executive resume, high-converting cover letter, and optimize your LinkedIn profile with world-class global standards engineered by Khemiri.
        </p>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          {[
            { num: '+14.5K', label: 'Elite CVs' },
            { num: '99.8%', label: 'Success Rate' },
            { num: '100%', label: 'ATS Pass' }
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1,
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1rem 0.5rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fff' }}>{stat.num}</div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '700', uppercase: 'true', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Form Card */}
      <section style={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        borderRadius: '24px',
        padding: '2rem 1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        marginBottom: '4rem',
        boxSizing: 'border-box',
        zIndex: 1
      }}>

        {/* Form Tabs */}
        <div style={{
          display: 'flex',
          backgroundColor: '#020617',
          padding: '4px',
          borderRadius: '14px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {['resume', 'cover', 'linkedin'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '0.6rem 0',
                borderRadius: '10px',
                border: 'none',
                backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                color: activeTab === tab ? '#fff' : '#64748b',
                fontWeight: '800',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab === 'resume' ? 'Resume ATS' : tab === 'cover' ? 'Cover Letter' : 'LinkedIn'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
              Full Name & Credentials
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
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
              Target Global Position
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
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
                Language
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
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="English (US)">English (US / UK Standard)</option>
                <option value="French">French (European Corporate)</option>
                <option value="Arabic">Arabic (GCC Standard)</option>
              </select>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
                Executive Tone
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
                  outline: 'none',
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
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
              Career Milestones & Summary
            </label>
            <textarea
              rows={4}
              placeholder="Briefly state your achievements and background..."
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
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
              Core Technical Skills
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
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #06b6d4 100%)',
              border: 'none',
              borderRadius: '14px',
              padding: '1.1rem',
              color: '#fff',
              fontWeight: '900',
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(79,70,229,0.5)',
              marginTop: '0.5rem'
            }}
          >
            {isGenerating ? 'Processing AI Generation...' : '🚀 Start Instant Generation'}
          </button>
        </form>
      </section>

      {/* Pricing Section */}
      <section style={{ width: '100%', maxWidth: '1000px', textAlign: 'center', marginBottom: '4rem', zIndex: 1 }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem' }}>Transparent Global Pricing</h2>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '2rem' }}>PayPal & Stripe Infrastructure Ready</p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { title: 'Starter', price: '$9', desc: 'Single ATS Application', btn: 'Pay via PayPal' },
            { title: 'Professional Suite', price: '$29', desc: 'Resume + Cover Letter + LinkedIn Optimization', btn: 'Pay via PayPal / Stripe', highlight: true },
            { title: 'Executive Access', price: '$59', desc: 'Unlimited AI Generations & Priority Support', btn: 'Pay via PayPal' }
          ].map((plan, i) => (
            <div key={i} style={{
              flex: '1 1 280px',
              maxWidth: '320px',
              backgroundColor: plan.highlight ? 'rgba(79,70,229,0.15)' : 'rgba(15, 23, 42, 0.8)',
              border: plan.highlight ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#818cf8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{plan.title}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#fff', marginBottom: '0.5rem' }}>{plan.price}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '1.5rem' }}>{plan.desc}</div>
              </div>
              <button style={{
                width: '100%',
                backgroundColor: plan.highlight ? '#4f46e5' : '#1e293b',
                border: 'none',
                color: '#fff',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>{plan.btn}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        width: '100%',
        maxWidth: '1100px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.75rem',
        color: '#475569',
        zIndex: 1
      }}>
        © 2026 ResuMaker AI Platform (Powered by Khemiri). All rights reserved.
      </footer>

    </div>
  );
}

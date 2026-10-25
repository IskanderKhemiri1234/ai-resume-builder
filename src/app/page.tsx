
'use client';

import React, { FormEvent, useState } from 'react';

type DocumentType = 'resume' | 'cover' | 'linkedin';

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    description: 'For your next application.',
    features: [
      'One application draft',
      'Resume improvement',
      'Cover letter draft',
      'Text download',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 29,
    description: 'A more complete application package.',
    features: [
      'Everything in Starter',
      'Job-specific customization',
      'LinkedIn profile draft',
      'Interview preparation prompts',
    ],
    featured: true,
  },
  {
    id: 'executive',
    name: 'Career Plus',
    price: 59,
    description: 'For a broader job-search workflow.',
    features: [
      'Multiple application drafts',
      'Additional cover letters',
      'Interview practice toolkit',
      'Job-search planning guide',
    ],
  },
];

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    color: '#172033',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  } as React.CSSProperties,
  container: {
    width: 'min(1120px, calc(100% - 40px))',
    margin: '0 auto',
  } as React.CSSProperties,
  button: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: '13px 20px',
    border: 0,
    borderRadius: 12,
    background: '#4f46e5',
    color: '#fff',
    fontSize: 14,
    fontWeight: 750,
    cursor: 'pointer',
    textDecoration: 'none',
  } as React.CSSProperties,
  field: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 14px',
    border: '1px solid #dbe2ed',
    borderRadius: 11,
    background: '#fff',
    color: '#172033',
    fontSize: 14,
    outlineColor: '#818cf8',
  } as React.CSSProperties,
  label: {
    display: 'block',
    marginBottom: 7,
    color: '#344054',
    fontSize: 13,
    fontWeight: 700,
  } as React.CSSProperties,
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function ResuMakerPage() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Professional');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [documentType, setDocumentType] =
    useState<DocumentType>('resume');

  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);

  const scrollToTool = () => {
    document.getElementById('builder')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  async function handleGenerate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setResult('');

    if (!experience.trim() && !skills.trim()) {
      setError('Add your experience or at least one relevant skill.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          targetJob: jobTitle.trim(),
          language,
          tone,
          experience: experience.trim(),
          skills: skills.trim(),
          jobDescription: jobDescription.trim(),
          documentType,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof data.error === 'string'
            ? data.error
            : 'We could not create your draft. Please try again.'
        );
      }

      if (typeof data.result !== 'string' || !data.result.trim()) {
        throw new Error('The generated draft was empty. Please try again.');
      }

      setResult(data.result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadDraft() {
    if (!result) return;

    const blob = new Blob([result], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `${documentType}-draft.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  async function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailStatus('');
    setEmailLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof data.error === 'string'
            ? data.error
            : 'Subscription is temporarily unavailable.'
        );
      }

      setEmailStatus(
        'Thanks for subscribing. Please check your inbox if confirmation is required.'
      );
      setEmail('');
    } catch (err) {
      setEmailStatus(
        err instanceof Error
          ? err.message
          : 'Subscription is temporarily unavailable.'
      );
    } finally {
      setEmailLoading(false);
    }
  }

  function checkout(plan: Plan) {
    const checkoutUrls: Record<string, string | undefined> = {
      starter: process.env.NEXT_PUBLIC_CHECKOUT_STARTER,
      professional: process.env.NEXT_PUBLIC_CHECKOUT_PROFESSIONAL,
      executive: process.env.NEXT_PUBLIC_CHECKOUT_EXECUTIVE,
    };

    const url = checkoutUrls[plan.id];

    if (!url) {
      alert(
        'This plan is not available for purchase yet. Please check back soon.'
      );
      return;
    }

    try {
      const parsed = new URL(url);

      if (parsed.protocol !== 'https:') {
        alert('The checkout link is not configured securely.');
        return;
      }

      window.location.assign(parsed.toString());
    } catch {
      alert('The checkout link is not configured correctly.');
    }
  }

  const sectionTitle: React.CSSProperties = {
    fontSize: 'clamp(28px, 4vw, 40px)',
    letterSpacing: '-1.3px',
    lineHeight: 1.15,
    margin: '0 0 14px',
    color: '#111827',
  };

  return (
    <main style={styles.page}>
      <div
        style={{
          background: '#eef2ff',
          color: '#4338ca',
          padding: '10px 16px',
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        A smarter way to prepare for your next career move
      </div>

      <header
        style={{
          background: '#fff',
          borderBottom: '1px solid #e8edf5',
        }}
      >
        <div
          style={{
            ...styles.container,
            minHeight: 78,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <a
            href="/"
            aria-label="ResuMaker AI homepage"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              textDecoration: 'none',
              color: '#111827',
              fontWeight: 850,
              fontSize: 21,
              letterSpacing: '-0.7px',
            }}
          >
            <span
              style={{
                display: 'grid',
                placeItems: 'center',
                width: 40,
                height: 40,
                borderRadius: 12,
                background: '#4f46e5',
                color: '#fff',
                fontSize: 22,
              }}
            >
              R
            </span>
            ResuMaker <span style={{ color: '#4f46e5', marginLeft: -7 }}>AI</span>
          </a>

          <nav
            aria-label="Main navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              fontSize: 13,
              fontWeight: 650,
            }}
          >
            <a href="#features" style={{ color: '#475467', textDecoration: 'none' }}>
              Features
            </a>
            <a href="#pricing" style={{ color: '#475467', textDecoration: 'none' }}>
              Pricing
            </a>
            <button
              type="button"
              onClick={scrollToTool}
              style={{ ...styles.button, padding: '10px 15px' }}
            >
              Get started
            </button>
          </nav>
        </div>
      </header>

      <section
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, #e0e7ff 0%, #f8fafc 64%)',
          padding: '78px 0 68px',
        }}
      >
        <div
          style={{
            ...styles.container,
            textAlign: 'center',
            maxWidth: 850,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid #c7d2fe',
              background: 'rgba(255,255,255,0.8)',
              color: '#4338ca',
              borderRadius: 30,
              padding: '8px 13px',
              fontSize: 12,
              fontWeight: 750,
              marginBottom: 24,
            }}
          >
            <span aria-hidden="true">✦</span>
            Your experience. Your next opportunity.
          </div>

          <h1
            style={{
              fontSize: 'clamp(38px, 7vw, 66px)',
              lineHeight: 1.04,
              letterSpacing: '-3px',
              margin: '0 auto 22px',
              maxWidth: 800,
              color: '#101828',
            }}
          >
            Make your next career move
            <span style={{ color: '#4f46e5' }}> your strongest yet.</span>
          </h1>

          <p
            style={{
              maxWidth: 660,
              margin: '0 auto 30px',
              color: '#667085',
              fontSize: 17,
              lineHeight: 1.8,
            }}
          >
            Turn your real experience into a tailored resume, a compelling
            cover letter, or a stronger LinkedIn profile. Start with a free
            draft and refine it on your terms.
          </p>

          <button
            type="button"
            onClick={scrollToTool}
            style={{ ...styles.button, padding: '16px 24px', fontSize: 15 }}
          >
            Create your free draft <span aria-hidden="true">→</span>
          </button>

          <p style={{ color: '#667085', fontSize: 12, marginTop: 15 }}>
            No payment required to create a draft. Review all content before applying.
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px 24px',
              marginTop: 36,
              color: '#475467',
              fontSize: 12,
              fontWeight: 650,
            }}
          >
            <span>✓ Built around your experience</span>
            <span>✓ Tailored to the role</span>
            <span>✓ You review every detail</span>
          </div>
        </div>
      </section>

      <section id="features" style={{ padding: '68px 0' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 38 }}>
            <p
              style={{
                color: '#4f46e5',
                fontSize: 12,
                fontWeight: 850,
                letterSpacing: 1.5,
              }}
            >
              CAREER TOOLS, MADE PRACTICAL
            </p>
            <h2 style={sectionTitle}>Everything you need to tell your story.</h2>
            <p style={{ color: '#667085', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
              Create application materials that communicate your strengths
              clearly without losing your individual experience.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 235px), 1fr))',
              gap: 18,
            }}
          >
            {[
              {
                icon: '▤',
                title: 'Resume builder',
                description:
                  'Organize your experience, skills and achievements into a focused professional draft.',
              },
              {
                icon: '✉',
                title: 'Cover letter writer',
                description:
                  'Connect your background to a target role with a personalized cover letter.',
              },
              {
                icon: '◎',
                title: 'LinkedIn profile',
                description:
                  'Develop a clearer headline, summary and professional positioning.',
              },
              {
                icon: '⌕',
                title: 'Job-specific tailoring',
                description:
                  'Use a job description to identify relevant skills and experience to highlight.',
              },
            ].map((feature) => (
              <article
                key={feature.title}
                style={{
                  background: '#fff',
                  border: '1px solid #e6eaf2',
                  borderRadius: 18,
                  padding: 25,
                  boxShadow: '0 4px 18px rgba(16,24,40,0.025)',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    background: '#eef2ff',
                    color: '#4f46e5',
                    fontSize: 23,
                    marginBottom: 20,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 17, margin: '0 0 10px', color: '#101828' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#667085', fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="builder" style={{ padding: '20px 0 78px', scrollMarginTop: 24 }}>
        <div style={{ ...styles.container, maxWidth: 850 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <p
              style={{
                color: '#4f46e5',
                fontSize: 12,
                fontWeight: 850,
                letterSpacing: 1.4,
              }}
            >
              YOUR FREE FIRST DRAFT
            </p>
            <h2 style={sectionTitle}>Let's build your next application.</h2>
            <p style={{ color: '#667085', lineHeight: 1.7, fontSize: 14 }}>
              Share only the information needed to create your draft.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 22,
              padding: 'clamp(18px, 4vw, 36px)',
              boxShadow: '0 18px 55px rgba(16,24,40,0.055)',
            }}
          >
            <div
              role="tablist"
              aria-label="Choose a document"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                background: '#f1f5f9',
                padding: 5,
                gap: 4,
                borderRadius: 13,
                marginBottom: 27,
              }}
            >
              {([
                ['resume', 'Resume'],
                ['cover', 'Cover letter'],
                ['linkedin', 'LinkedIn'],
              ] as [DocumentType, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={documentType === value}
                  onClick={() => {
                    setDocumentType(value);
                    setResult('');
                    setError('');
                  }}
                  style={{
                    border: 0,
                    borderRadius: 9,
                    padding: '12px 5px',
                    background: documentType === value ? '#fff' : 'transparent',
                    color: documentType === value ? '#4338ca' : '#667085',
                    fontSize: 13,
                    fontWeight: 750,
                    boxShadow: documentType === value ? '0 1px 4px #dbe2ed' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleGenerate} style={{ display: 'grid', gap: 19 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                  gap: 17,
                }}
              >
                <Field label="Full name">
                  <input
                    style={styles.field}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </Field>

                <Field label="Target position">
                  <input
                    style={styles.field}
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Product Designer"
                    maxLength={120}
                    required
                  />
                </Field>

                <Field label="Output language">
                  <select
                    style={styles.field}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                  </select>
                </Field>

                <Field label="Writing style">
                  <select
                    style={styles.field}
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                  >
                    <option value="Professional">Professional</option>
                    <option value="Executive">Executive</option>
                    <option value="Creative">Creative</option>
                    <option value="Entry-Level">Entry-level</option>
                  </select>
                </Field>
              </div>

              <Field label="Experience and achievements">
                <textarea
                  style={{ ...styles.field, minHeight: 125, resize: 'vertical' }}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Describe your roles, responsibilities, projects and achievements. Include measurable results where you know them."
                  maxLength={4000}
                />
              </Field>

              <Field label="Core skills">
                <input
                  style={styles.field}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="JavaScript, project management, customer service..."
                  maxLength={1000}
                />
              </Field>

              <Field label="Target job description (optional)">
                <textarea
                  style={{ ...styles.field, minHeight: 110, resize: 'vertical' }}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description to tailor your draft to the role."
                  maxLength={6000}
                />
              </Field>

              <p style={{ color: '#667085', fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                Tip: Include only genuine skills and achievements. Never enter
                confidential information from a current employer.
              </p>

              {error && (
                <div
                  role="alert"
                  style={{
                    background: '#fff1f2',
                    border: '1px solid #fecdd3',
                    color: '#9f1239',
                    padding: 14,
                    borderRadius: 11,
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.button,
                  width: '100%',
                  padding: 16,
                  opacity: loading ? 0.65 : 1,
                  cursor: loading ? 'wait' : 'pointer',
                }}
              >
                {loading ? 'Creating your draft…' : 'Create my free draft →'}
              </button>
            </form>

            {result && (
              <section
                aria-live="polite"
                style={{
                  marginTop: 27,
                  border: '1px solid #c7d2fe',
                  borderRadius: 15,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: 18,
                    background: '#eef2ff',
                    borderBottom: '1px solid #c7d2fe',
                  }}
                >
                  <h3 style={{ color: '#312e81', margin: 0, fontSize: 16 }}>
                    Your draft is ready to review
                  </h3>
                  <p style={{ color: '#4338ca', fontSize: 12, margin: '6px 0 0' }}>
                    Check all details before using this draft.
                  </p>
                </div>

                <div style={{ padding: 20 }}>
                  <h4 style={{ margin: '0 0 4px', color: '#101828' }}>{fullName}</h4>
                  <p style={{ margin: '0 0 18px', color: '#4f46e5', fontSize: 13 }}>
                    {jobTitle}
                  </p>
                  <pre
                    style={{
                      whiteSpace: 'pre-wrap',
                      overflowWrap: 'anywhere',
                      fontFamily: 'inherit',
                      color: '#344054',
                      fontSize: 14,
                      lineHeight: 1.85,
                      margin: 0,
                    }}
                  >
                    {result}
                  </pre>
                  <button
                    type="button"
                    onClick={downloadDraft}
                    style={{ ...styles.button, marginTop: 22 }}
                  >
                    Download text draft ↓
                  </button>
                  <p style={{ color: '#667085', fontSize: 12, lineHeight: 1.7 }}>
                    This download is a text file, not a formatted PDF or DOCX.
                    ATS compatibility and employment outcomes are not guaranteed.
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: '76px 0', background: '#fff' }}>
        <div style={styles.container}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p
              style={{
                color: '#4f46e5',
                fontSize: 12,
                fontWeight: 850,
                letterSpacing: 1.4,
              }}
            >
              STRAIGHTFORWARD PRICING
            </p>
            <h2 style={sectionTitle}>Invest in your next opportunity.</h2>
            <p style={{ color: '#667085', fontSize: 14, lineHeight: 1.7 }}>
              Proposed one-time prices. Check plan availability before purchasing.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: 20,
              alignItems: 'stretch',
            }}
          >
            {plans.map((plan) => (
              <article
                key={plan.id}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  border: plan.featured ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                  borderRadius: 20,
                  padding: 26,
                  boxShadow: plan.featured
                    ? '0 12px 36px rgba(79,70,229,0.09)'
                    : '0 4px 18px rgba(16,24,40,0.025)',
                }}
              >
                {plan.featured && (
                  <div
                    style={{
                      color: '#4338ca',
                      background: '#eef2ff',
                      padding: '7px 10px',
                      borderRadius: 8,
                      fontSize: 11,
                      fontWeight: 850,
                      alignSelf: 'flex-start',
                      marginBottom: 13,
                    }}
                  >
                    MOST COMPLETE
                  </div>
                )}

                <h3 style={{ color: '#101828', margin: '0 0 8px', fontSize: 18 }}>
                  {plan.name}
                </h3>
                <p style={{ color: '#667085', fontSize: 13, minHeight: 38, lineHeight: 1.6 }}>
                  {plan.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                  <span style={{ color: '#101828', fontSize: 42, fontWeight: 850, letterSpacing: -2 }}>
                    ${plan.price}
                  </span>
                  <span style={{ color: '#667085', fontSize: 12 }}>proposed price</span>
                </div>

                <div style={{ height: 1, background: '#eaecf0', margin: '22px 0' }} />

                <ul style={{ paddingLeft: 20, margin: '0 0 25px', flex: 1, color: '#475467', fontSize: 13, lineHeight: 2.2 }}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => checkout(plan)}
                  style={{
                    ...styles.button,
                    width: '100%',
                    background: plan.featured ? '#4f46e5' : '#f1f5f9',
                    color: plan.featured ? '#fff' : '#344054',
                  }}
                >
                  View plan availability
                </button>
              </article>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: '#667085', fontSize: 12, lineHeight: 1.7, marginTop: 24 }}>
            Final plan benefits, billing terms and refund conditions must be
            published before accepting payment.
          </p>
        </div>
      </section>

      <section style={{ padding: '75px 0' }}>
        <div style={styles.container}>
          <div
            style={{
              maxWidth: 780,
              margin: '0 auto',
              padding: 'clamp(24px, 5vw, 44px)',
              background: '#eef2ff',
              border: '1px solid #e0e7ff',
              borderRadius: 23,
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#4f46e5', fontSize: 12, fontWeight: 850, letterSpacing: 1.3 }}>
              CAREER NOTES
            </div>
            <h2 style={{ ...sectionTitle, fontSize: 'clamp(26px, 4vw, 34px)', marginTop: 12 }}>
              Make your next application count.
            </h2>
            <p style={{ color: '#667085', fontSize: 14, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 23px' }}>
              Get practical guidance on resumes, job applications and
              interview preparation. Subscribe only if you want email updates.
            </p>

            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                maxWidth: 490,
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                aria-label="Your email address"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...styles.field, flex: '1 1 220px' }}
              />
              <button
                type="submit"
                disabled={emailLoading}
                style={{
                  ...styles.button,
                  opacity: emailLoading ? 0.65 : 1,
                }}
              >
                {emailLoading ? 'Submitting…' : 'Join free'}
              </button>
            </form>

            {emailStatus && (
              <p role="status" style={{ color: '#344054', fontSize: 13, lineHeight: 1.7 }}>
                {emailStatus}
              </p>
            )}

            <p style={{ color: '#667085', fontSize: 11, lineHeight: 1.7, marginBottom: 0 }}>
              You can unsubscribe at any time. Read our privacy notice to learn
              how your information is handled.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ background: '#101828', color: '#d0d5dd', padding: '38px 0' }}>
        <div style={styles.container}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 22,
            }}
          >
            <div>
              <div style={{ color: '#fff', fontWeight: 850, fontSize: 19 }}>
                ResuMaker <span style={{ color: '#a5b4fc' }}>AI</span>
              </div>
              <p style={{ fontSize: 12, color: '#98a2b3', lineHeight: 1.7 }}>
                Practical tools for your next career move.
              </p>
            </div>

            <nav aria-label="Legal links" style={{ display: 'flex', flexWrap: 'wrap', gap: 18, fontSize: 12 }}>
              <a href="/privacy" style={{ color: '#d0d5dd' }}>Privacy</a>
              <a href="/terms" style={{ color: '#d0d5dd' }}>Terms</a>
              <a href="/contact" style={{ color: '#d0d5dd' }}>Contact</a>
            </nav>
          </div>

          <div style={{ borderTop: '1px solid #344054', marginTop: 25, paddingTop: 20 }}>
            <p style={{ color: '#98a2b3', fontSize: 11, lineHeight: 1.8, margin: 0 }}>
              ResuMaker AI provides writing assistance, not a guarantee of
              interviews, employment or ATS acceptance. Always verify the
              accuracy of your application materials before submitting them.
            </p>
            <p style={{ color: '#98a2b3', fontSize: 11, marginBottom: 0 }}>
              © {new Date().getFullYear()} ResuMaker AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

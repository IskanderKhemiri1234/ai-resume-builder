
'use client';

import React, { FormEvent, useMemo, useState } from 'react';

/*
  ResuMaker AI — Revenue-ready frontend starter

  BEFORE LAUNCH:
  1. Add real hosted checkout URLs below.
  2. Connect real AI generation through a server-side API route.
  3. Connect the email form to a mailing-list provider.
  4. Add approved affiliate URLs.
  5. Publish real Privacy, Terms, Contact and Refund pages.
  6. Never place secret API keys in this client-side file.
  7. Do not claim fake ATS scores, customer reviews or success rates.
*/

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  checkoutUrl: string;
  featured?: boolean;
};

const CHECKOUT_URLS: Record<string, string> = {
  starter: '',
  professional: '',
  executive: '',
};

const AFFILIATE_LINKS = {
  interviewTool: '',
  jobSearchTool: '',
};

const products: Product[] = [
  {
    id: 'starter',
    title: 'Starter',
    price: '$9',
    description: 'For one job application.',
    features: [
      'Resume improvement checklist',
      'Cover-letter draft',
      'Downloadable text draft',
    ],
    checkoutUrl: CHECKOUT_URLS.starter,
  },
  {
    id: 'professional',
    title: 'Professional Suite',
    price: '$29',
    description: 'A complete application package.',
    features: [
      'Resume improvement',
      'Tailored cover-letter draft',
      'LinkedIn profile checklist',
    ],
    checkoutUrl: CHECKOUT_URLS.professional,
    featured: true,
  },
  {
    id: 'executive',
    title: 'Executive Access',
    price: '$59',
    description: 'For a broader job-search workflow.',
    features: [
      'Multiple application drafts',
      'Interview practice prompts',
      'Job-search planning worksheet',
    ],
    checkoutUrl: CHECKOUT_URLS.executive,
  },
];

function track(
  eventName: string,
  details: Record<string, string> = {}
) {
  /*
    Optional analytics integration point.
    Connect your analytics provider before relying on these events.
  */
  if (typeof window === 'undefined') return;

  const analyticsWindow = window as Window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push({
      event: eventName,
      ...details,
    });
  }
}

export default function ResuMakerInteractive() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [language, setLanguage] = useState('English (US / UK)');
  const [tone, setTone] = useState('Modern Corporate');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const [activeTab, setActiveTab] = useState<
    'resume' | 'cover' | 'linkedin'
  >('resume');

  const [showPreview, setShowPreview] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const skillList = useMemo(
    () =>
      skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
    [skills]
  );

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#020617',
    border: '1px solid #273449',
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 800,
    color: '#aab8cc',
    marginBottom: '0.45rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  const primaryButtonStyle: React.CSSProperties = {
    width: '100%',
    background:
      'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem',
    color: '#fff',
    fontWeight: 900,
    fontSize: '0.9rem',
    cursor: 'pointer',
  };

  // STEP 1: Free tool and lead-in experience
  const handleGetStarted = () => {
    document
      .getElementById('free-tool')
      ?.scrollIntoView({ behavior: 'smooth' });

    track('get_started_clicked');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowPreview(true);

    track('free_preview_created', {
      tool: activeTab,
      language,
    });
  };

  // STEP 2 + STEP 3: Paid plans and real hosted checkout
  const handleCheckout = (product: Product) => {
    track('checkout_clicked', {
      product: product.id,
      price: product.price,
    });

    if (!product.checkoutUrl) {
      alert(
        `Checkout for ${product.title} is not configured yet. ` +
        'Add a real payment checkout URL in CHECKOUT_URLS.'
      );
      return;
    }

    // Use your payment provider's real hosted checkout URL.
    window.location.assign(product.checkoutUrl);
  };

  // A local draft download, not a real AI-generated PDF
  const handleDownloadDraft = () => {
    let content = '';

    if (activeTab === 'cover') {
      content = `${fullName}
${jobTitle}

COVER LETTER DRAFT

Dear Hiring Manager,

I am applying for the ${jobTitle} position.

${experience}

My relevant skills include ${
        skillList.join(', ') ||
        'the skills required for this position'
      }.

I would welcome the opportunity to discuss how my experience
can contribute to your team.

Sincerely,
${fullName}`;
    } else if (activeTab === 'linkedin') {
      content = `${fullName}
${jobTitle}

LINKEDIN PROFILE DRAFT

Headline:
${jobTitle} | ${skillList.slice(0, 3).join(' | ')}

About:
${experience}

Core Skills:
${skillList.join(', ')}`;
    } else {
      content = `${fullName}
${jobTitle}

PROFESSIONAL SUMMARY
${experience}

CORE SKILLS
${skillList.map((skill) => `- ${skill}`).join('\n')}

TARGET ROLE
${jobTitle}

Language: ${language}
Writing style: ${tone}

This is a draft based on the information you entered.
Verify all details before applying for a job.`;
    }

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${activeTab}-draft.txt`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    track('draft_downloaded', { tool: activeTab });
  };

  // STEP 5: Email capture demo
  const handleLeadSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /*
      This only demonstrates the frontend.
      Connect an email marketing service or API to save addresses.
    */
    setEmailSubmitted(true);
    track('career_updates_signup');
  };

  return (
    <main
      style={{
        backgroundColor: '#030307',
        color: '#f1f5f9',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        minHeight: '100vh',
        width: '100%',
        padding: '1rem 1rem 4rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Announcement banner */}
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          backgroundColor: '#0f172a',
          border: '1px solid #334155',
          borderRadius: '50px',
          padding: '0.65rem 1rem',
          margin: '0.5rem 0 1.25rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#a5b4fc',
        }}
      >
        ✨ ResuMaker AI — practical tools for your next career move
      </div>

      {/* Header */}
      <header
        style={{
          width: '100%',
          maxWidth: '1000px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 0',
          borderBottom: '1px solid #1e293b',
          marginBottom: '2.5rem',
        }}
      >
        <a
          href="/"
          aria-label="ResuMaker AI home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background:
                'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.3rem',
              color: '#fff',
            }}
          >
            R
          </div>

          <div>
            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 900,
                color: '#fff',
              }}
            >
              ResuMaker <span style={{ color: '#818cf8' }}>AI</span>
            </div>

            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                color: '#94a3b8',
                letterSpacing: '1.3px',
              }}
            >
              CAREER GROWTH HUB
            </div>
          </div>
        </a>

        <button
          onClick={handleGetStarted}
          style={{
            background:
              'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            border: 0,
            color: '#fff',
            padding: '0.7rem 1rem',
            borderRadius: 10,
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          Try Free Tool
        </button>
      </header>

      {/* STEP 1: Free product */}
      <section
        style={{
          textAlign: 'center',
          maxWidth: 760,
          marginBottom: '3rem',
        }}
      >
        <p
          style={{
            color: '#67e8f9',
            fontWeight: 800,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
          }}
        >
          BUILD A STRONGER APPLICATION
        </p>

        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.25rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            color: '#fff',
            margin: '0 0 1rem',
          }}
        >
          Make your next application more compelling.
        </h1>

        <p
          style={{
            color: '#a3b1c6',
            fontSize: '1rem',
            lineHeight: 1.7,
            margin: '0 auto 1.5rem',
            maxWidth: 650,
          }}
        >
          Draft a resume, cover letter, or LinkedIn profile from
          your own experience. Start free, review the result,
          and upgrade only if you need more.
        </p>

        <button
          onClick={handleGetStarted}
          style={{ ...primaryButtonStyle, maxWidth: 260 }}
        >
          Create a Free Draft ↓
        </button>

        <p
          style={{
            color: '#64748b',
            fontSize: '0.72rem',
            marginTop: '0.8rem',
          }}
        >
          No job offer or ATS score is guaranteed.
        </p>
      </section>

      {/* Free tool form */}
      <section
        id="free-tool"
        style={{
          width: '100%',
          maxWidth: 700,
          backgroundColor: '#0f172a',
          border: '1px solid rgba(99,102,241,0.35)',
          borderRadius: 24,
          padding: 'clamp(1rem, 4vw, 1.75rem)',
          boxSizing: 'border-box',
          marginBottom: '4rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
        }}
      >
        <h2
          style={{
            margin: '0 0 0.4rem',
            color: '#fff',
            fontSize: '1.35rem',
          }}
        >
          Free career draft tool
        </h2>

        <p
          style={{
            margin: '0 0 1rem',
            color: '#94a3b8',
            fontSize: '0.82rem',
            lineHeight: 1.6,
          }}
        >
          This version creates a basic draft in your browser.
          Connect a secure AI API to enable genuine AI generation.
        </p>

        <div
          style={{
            display: 'flex',
            backgroundColor: '#020617',
            padding: 4,
            borderRadius: 12,
            marginBottom: '1.5rem',
          }}
        >
          {(['resume', 'cover', 'linkedin'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setShowPreview(false);
              }}
              style={{
                flex: 1,
                padding: '0.7rem 0.25rem',
                borderRadius: 9,
                border: 0,
                backgroundColor:
                  activeTab === tab ? '#4f46e5' : 'transparent',
                color: activeTab === tab ? '#fff' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.72rem',
                cursor: 'pointer',
              }}
            >
              {tab === 'resume'
                ? 'Resume'
                : tab === 'cover'
                ? 'Cover Letter'
                : 'LinkedIn'}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <label style={labelStyle}>Full name</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div>
            <label style={labelStyle}>Target position</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="e.g. Marketing Manager"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              maxLength={120}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Language</label>
              <select
                style={inputStyle}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>English (US / UK)</option>
                <option>French</option>
                <option>Arabic</option>
              </select>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Writing style</label>
              <select
                style={inputStyle}
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Modern Corporate</option>
                <option>Executive C-Level</option>
                <option>Creative Tech</option>
                <option>Entry-Level Professional</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>
              Experience and achievements
            </label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical' }}
              rows={4}
              placeholder="Describe your experience, responsibilities, and achievements..."
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              maxLength={4000}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Core skills (separate with commas)
            </label>
            <input
              style={inputStyle}
              type="text"
              placeholder="Project management, Excel, customer service"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              maxLength={1000}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Job description (optional)
            </label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical' }}
              rows={3}
              placeholder="Paste the job ad to compare its requirements with your skills..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              maxLength={6000}
            />
          </div>

          <button type="submit" style={primaryButtonStyle}>
            Create My Free Draft
          </button>
        </form>

        {showPreview && (
          <div
            style={{
              marginTop: '1.5rem',
              backgroundColor: '#020617',
              border: '1px solid #4f46e5',
              borderRadius: 16,
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                color: '#67e8f9',
                fontWeight: 900,
                fontSize: '0.8rem',
                marginBottom: '0.8rem',
              }}
            >
              YOUR DRAFT IS READY TO REVIEW
            </div>

            <div
              style={{
                backgroundColor: '#0f172a',
                padding: '1rem',
                borderRadius: 10,
                lineHeight: 1.6,
                overflowWrap: 'anywhere',
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  margin: '0 0 0.2rem',
                }}
              >
                {fullName}
              </h3>

              <div
                style={{
                  color: '#a5b4fc',
                  fontWeight: 800,
                  marginBottom: '1rem',
                }}
              >
                {jobTitle}
              </div>

              <div
                style={{
                  color: '#e2e8f0',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                }}
              >
                {activeTab === 'resume'
                  ? 'PROFESSIONAL SUMMARY'
                  : activeTab === 'cover'
                  ? 'COVER LETTER DRAFT'
                  : 'LINKEDIN PROFILE DRAFT'}
              </div>

              <p
                style={{
                  color: '#cbd5e1',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.86rem',
                }}
              >
                {experience}
              </p>

              {activeTab === 'resume' && (
                <>
                  <div
                    style={{
                      color: '#e2e8f0',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                    }}
                  >
                    CORE SKILLS
                  </div>

                  <p
                    style={{
                      color: '#cbd5e1',
                      fontSize: '0.86rem',
                    }}
                  >
                    {skillList.length
                      ? skillList.join(' · ')
                      : 'Add your relevant skills above.'}
                  </p>
                </>
              )}

              {jobDescription.trim() && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    borderTop: '1px solid #273449',
                    paddingTop: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      color: '#e2e8f0',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                    }}
                  >
                    JOB DESCRIPTION PROVIDED
                  </div>

                  <p
                    style={{
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      marginBottom: 0,
                    }}
                  >
                    {jobDescription.trim().length} characters entered.
                    Automated matching requires a connected AI backend.
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleDownloadDraft}
              style={{
                ...primaryButtonStyle,
                marginTop: '1rem',
                background: '#059669',
              }}
            >
              Download Draft (.txt)
            </button>

            <p
              style={{
                color: '#64748b',
                fontSize: '0.72rem',
                lineHeight: 1.5,
                marginBottom: 0,
              }}
            >
              This is a basic text draft, not a certified ATS score
              or a PDF. Verify every statement before applying.
            </p>
          </div>
        )}
      </section>

      {/* STEP 2: Direct product sales */}
      <section
        style={{
          width: '100%',
          maxWidth: 1000,
          textAlign: 'center',
          marginBottom: '4rem',
        }}
      >
        <p
          style={{
            color: '#67e8f9',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.12em',
          }}
        >
          UPGRADE WHEN YOU ARE READY
        </p>

        <h2
          style={{
            fontSize: 'clamp(1.7rem, 5vw, 2.2rem)',
            fontWeight: 900,
            color: '#fff',
            margin: '0 0 0.5rem',
          }}
        >
          Simple, transparent pricing
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.85rem',
            margin: '0 auto 2rem',
            maxWidth: 600,
          }}
        >
          Proposed one-time offers. Confirm the actual billing model,
          deliverables and refund terms before publishing.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}
        >
          {products.map((product) => (
            <article
              key={product.id}
              style={{
                flex: '1 1 250px',
                maxWidth: 320,
                backgroundColor: product.featured
                  ? 'rgba(79,70,229,0.14)'
                  : '#0f172a',
                border: product.featured
                  ? '2px solid #6366f1'
                  : '1px solid #1e293b',
                borderRadius: 20,
                padding: '1.5rem',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
              }}
            >
              {product.featured && (
                <div
                  style={{
                    color: '#a5b4fc',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    marginBottom: '0.5rem',
                  }}
                >
                  FEATURED PLAN
                </div>
              )}

              <h3
                style={{
                  color: '#fff',
                  fontSize: '1rem',
                  margin: '0 0 0.5rem',
                }}
              >
                {product.title}
              </h3>

              <div
                style={{
                  color: '#fff',
                  fontSize: '2.4rem',
                  fontWeight: 900,
                }}
              >
                {product.price}
              </div>

              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '0.82rem',
                }}
              >
                {product.description}
              </p>

              <ul
                style={{
                  paddingLeft: '1.2rem',
                  color: '#cbd5e1',
                  fontSize: '0.8rem',
                  lineHeight: 1.8,
                  flex: 1,
                }}
              >
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(product)}
                style={{
                  width: '100%',
                  backgroundColor: product.featured
                    ? '#4f46e5'
                    : '#1e293b',
                  border: 0,
                  color: '#fff',
                  padding: '0.85rem',
                  borderRadius: 11,
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Continue to checkout
              </button>

              {!product.checkoutUrl && (
                <p
                  style={{
                    color: '#fbbf24',
                    fontSize: '0.68rem',
                    marginBottom: 0,
                  }}
                >
                  Checkout setup required before launch.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* STEP 3: Payment setup notice */}
      <section
        style={{
          width: '100%',
          maxWidth: 1000,
          backgroundColor: '#0b1220',
          border: '1px solid #243149',
          borderRadius: 18,
          padding: '1.25rem',
          boxSizing: 'border-box',
          marginBottom: '3rem',
        }}
      >
        <h2
          style={{
            color: '#fff',
            fontSize: '1.1rem',
            margin: '0 0 0.6rem',
          }}
        >
          Secure checkout setup
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.84rem',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          Add real hosted checkout URLs to CHECKOUT_URLS.
          Do not link payment buttons to generic provider homepages.
          Never expose secret API keys in this client-side component.
          Use a provider available to your business and country.
        </p>
      </section>

      {/* STEP 4: Affiliate revenue */}
      <section
        style={{
          width: '100%',
          maxWidth: 1000,
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <p
            style={{
              color: '#67e8f9',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
            }}
          >
            CAREER TOOLS WE MAY RECOMMEND
          </p>

          <h2
            style={{
              color: '#fff',
              fontSize: '1.7rem',
              margin: '0 0 0.5rem',
            }}
          >
            Keep building your career
          </h2>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '0.85rem',
              maxWidth: 650,
              margin: '0 auto',
            }}
          >
            Recommend relevant services that genuinely help job seekers.
            Clearly disclose any affiliate relationship.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            {
              title: 'Interview practice',
              description:
                'Practice common questions and structure stronger answers.',
              url: AFFILIATE_LINKS.interviewTool,
              id: 'interview',
            },
            {
              title: 'Job-search tools',
              description:
                'Explore tools for organizing applications and finding relevant roles.',
              url: AFFILIATE_LINKS.jobSearchTool,
              id: 'jobsearch',
            },
          ].map((item) => (
            <div
              key={item.id}
              style={{
                flex: '1 1 280px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: 16,
                padding: '1.25rem',
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  margin: '0 0 0.5rem',
                  fontSize: '1rem',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '0.82rem',
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </p>

              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  onClick={() =>
                    track('affiliate_link_clicked', {
                      placement: item.id,
                    })
                  }
                  style={{
                    color: '#a5b4fc',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                  }}
                >
                  Explore partner tool ↗
                </a>
              ) : (
                <span
                  style={{
                    color: '#fbbf24',
                    fontSize: '0.75rem',
                  }}
                >
                  Partner link not configured yet
                </span>
              )}

              <p
                style={{
                  color: '#64748b',
                  fontSize: '0.68rem',
                  marginBottom: 0,
                }}
              >
                Any affiliate relationship must be disclosed clearly.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STEP 5: Email list / future marketing */}
      <section
        style={{
          width: '100%',
          maxWidth: 700,
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: 20,
          padding: '1.5rem',
          boxSizing: 'border-box',
          marginBottom: '3rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: '#fff',
            margin: '0 0 0.5rem',
            fontSize: '1.4rem',
          }}
        >
          Get practical career tips
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.84rem',
            lineHeight: 1.6,
          }}
        >
          Offer useful job-search advice, product updates and relevant
          offers to people who choose to subscribe.
        </p>

        {emailSubmitted ? (
          <p
            role="status"
            style={{
              color: '#6ee7b7',
              fontSize: '0.85rem',
            }}
          >
            Demo only: connect an email service to save this subscription.
          </p>
        ) : (
          <form
            onSubmit={handleLeadSubmit}
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
            }}
          >
            <input
              aria-label="Email address"
              style={{
                ...inputStyle,
                flex: '1 1 220px',
              }}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              style={{
                ...primaryButtonStyle,
                width: 'auto',
                flex: '0 0 auto',
              }}
            >
              Join free
            </button>
          </form>
        )}

        <p
          style={{
            color: '#64748b',
            fontSize: '0.68rem',
            marginBottom: 0,
          }}
        >
          Connect a real mailing-list service and publish a privacy notice
          before collecting email addresses.
        </p>
      </section>

      {/* STEP 6: Trust, privacy and performance measurement */}
      <section
        style={{
          width: '100%',
          maxWidth: 1000,
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            {
              title: 'Privacy first',
              description:
                'Explain what data you collect, why you collect it, and how users can request deletion.',
            },
            {
              title: 'Clear terms',
              description:
                'Publish accurate pricing, cancellation and refund conditions before accepting payment.',
            },
            {
              title: 'Measure the funnel',
              description:
                'Track preview creation, checkout clicks, completed purchases and affiliate referrals.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                flex: '1 1 240px',
                backgroundColor: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: 16,
                padding: '1.25rem',
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  margin: '0 0 0.5rem',
                  fontSize: '0.95rem',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '0.8rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          width: '100%',
          maxWidth: 1000,
          borderTop: '1px solid #1e293b',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: '#64748b',
          lineHeight: 1.8,
        }}
      >
        <div>
          © {new Date().getFullYear()} ResuMaker AI. All rights reserved.
        </div>

        <div style={{ marginTop: '0.35rem' }}>
          <a
            href="/privacy"
            style={{ color: '#94a3b8', margin: '0 0.5rem' }}
          >
            Privacy
          </a>

          <a
            href="/terms"
            style={{ color: '#94a3b8', margin: '0 0.5rem' }}
          >
            Terms
          </a>

          <a
            href="/contact"
            style={{ color: '#94a3b8', margin: '0 0.5rem' }}
          >
            Contact
          </a>
        </div>

        <p
          style={{
            maxWidth: 700,
            margin: '0.8rem auto 0',
            fontSize: '0.68rem',
          }}
        >
          ResuMaker AI provides drafting assistance, not a guarantee
          of interviews, employment or ATS acceptance. Users should
          verify the accuracy of all resume details before applying.
        </p>
      </footer>
    </main>
  );
}

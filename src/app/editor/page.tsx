
'use client';

import { useMemo, useState } from 'react';

type Resume = {
  name: string;
  role: string;
  email: string;
  location: string;
  summary: string;
  experience: string;
  skills: string;
  education: string;
};

const initialResume: Resume = {
  name: 'Alex Morgan',
  role: 'Frontend Developer',
  email: 'alex@example.com',
  location: 'London, UK',
  summary:
    'Frontend developer focused on building accessible, responsive web experiences. Experienced in JavaScript and Next.js.',
  experience:
    'Frontend Developer\n2023 – Present\nBuilt and maintained web interfaces using JavaScript and Next.js.',
  skills: 'JavaScript, Next.js, React, HTML, CSS',
  education: 'Add your education here',
};

const templates = [
  { id: 'classic', name: 'Classic', description: 'Clean and timeless' },
  { id: 'modern', name: 'Modern', description: 'Bold and contemporary' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and focused' },
] as const;

type TemplateId = (typeof templates)[number]['id'];

export default function EditorPage() {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [template, setTemplate] = useState<TemplateId>('modern');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [savedMessage, setSavedMessage] = useState('');

  const isArabic = language === 'ar';

  const update = (field: keyof Resume, value: string) => {
    setResume((current) => ({ ...current, [field]: value }));
    setSavedMessage('');
  };

  const previewClass = useMemo(
    () => `resume-paper template-${template}`,
    [template],
  );

  function saveDraft() {
    try {
      localStorage.setItem(
        'resumaker-editor-draft-v1',
        JSON.stringify({ resume, template, language }),
      );
      setSavedMessage(
        isArabic ? 'تم حفظ المسودة على هذا الجهاز.' : 'Draft saved on this device.',
      );
    } catch {
      setSavedMessage(
        isArabic
          ? 'تعذر الحفظ. تحقق من إعدادات المتصفح.'
          : 'Could not save. Check your browser settings.',
      );
    }
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem('resumaker-editor-draft-v1');
      if (!raw) {
        setSavedMessage(isArabic ? 'لا توجد مسودة محفوظة.' : 'No saved draft found.');
        return;
      }

      const data = JSON.parse(raw);
      if (
        !data ||
        typeof data !== 'object' ||
        !data.resume ||
        typeof data.resume !== 'object'
      ) {
        setSavedMessage(isArabic ? 'المسودة غير صالحة.' : 'Saved draft is invalid.');
        return;
      }

      const nextResume = data.resume as Resume;
      const validFields: (keyof Resume)[] = [
        'name', 'role', 'email', 'location',
        'summary', 'experience', 'skills', 'education',
      ];

      const cleaned = { ...initialResume };
      for (const field of validFields) {
        if (typeof nextResume[field] === 'string') {
          cleaned[field] = nextResume[field].slice(0, 10000);
        }
      }

      setResume(cleaned);
      if (['classic', 'modern', 'minimal'].includes(data.template)) {
        setTemplate(data.template);
      }
      if (data.language === 'ar' || data.language === 'en') {
        setLanguage(data.language);
      }
      setSavedMessage(isArabic ? 'تم تحميل المسودة.' : 'Draft loaded.');
    } catch {
      setSavedMessage(isArabic ? 'تعذر تحميل المسودة.' : 'Could not load draft.');
    }
  }

  const labels = isArabic
    ? {
        title: 'محرّر السيرة الذاتية',
        subtitle: 'عدّل بياناتك وشاهد التغييرات مباشرة.',
        details: 'المعلومات الشخصية',
        name: 'الاسم الكامل',
        role: 'المسمى الوظيفي',
        email: 'البريد الإلكتروني',
        location: 'الموقع',
        summary: 'النبذة المهنية',
        experience: 'الخبرة والإنجازات',
        skills: 'المهارات',
        education: 'التعليم',
        design: 'اختر التصميم',
        preview: 'معاينة مباشرة',
        save: 'حفظ المسودة',
        load: 'تحميل المسودة',
        language: 'لغة المعاينة',
        empty: 'أضف معلوماتك لتظهر هنا.',
      }
    : {
        title: 'Resume Studio',
        subtitle: 'Edit your details and see every change instantly.',
        details: 'Personal details',
        name: 'Full name',
        role: 'Target job title',
        email: 'Email address',
        location: 'Location',
        summary: 'Professional summary',
        experience: 'Experience & achievements',
        skills: 'Skills',
        education: 'Education',
        design: 'Choose a design',
        preview: 'Live preview',
        save: 'Save draft',
        load: 'Load draft',
        language: 'Preview language',
        empty: 'Add your details to see them here.',
      };

  return (
    <main className="studio" dir={isArabic ? 'rtl' : 'ltr'}>
      <header className="studio-header">
        <a href="/" className="brand">ResuMaker<span> AI</span></a>
        <span className="free-tag">{isArabic ? 'المحرّر المجاني' : 'FREE EDITOR'}</span>
      </header>

      <section className="studio-intro">
        <p className="eyebrow">RESUMAKER AI STUDIO</p>
        <h1>{labels.title}</h1>
        <p>{labels.subtitle}</p>
      </section>

      <div className="studio-layout">
        <section className="editor-panel">
          <div className="panel-heading">
            <h2>{labels.details}</h2>
            <button type="button" className="small-button" onClick={loadDraft}>
              {labels.load}
            </button>
          </div>

          <div className="field-grid">
            <Field label={labels.name} value={resume.name}
              onChange={(v) => update('name', v)} />
            <Field label={labels.role} value={resume.role}
              onChange={(v) => update('role', v)} />
            <Field label={labels.email} value={resume.email}
              onChange={(v) => update('email', v)} type="email" />
            <Field label={labels.location} value={resume.location}
              onChange={(v) => update('location', v)} />
          </div>

          <TextField label={labels.summary} value={resume.summary}
            onChange={(v) => update('summary', v)} />
          <TextField label={labels.experience} value={resume.experience}
            onChange={(v) => update('experience', v)} rows={6} />
          <Field label={labels.skills} value={resume.skills}
            onChange={(v) => update('skills', v)} />
          <TextField label={labels.education} value={resume.education}
            onChange={(v) => update('education', v)} rows={3} />

          <button type="button" className="primary-button" onClick={saveDraft}>
            {labels.save}
          </button>
          {savedMessage && <p className="status-message" role="status">{savedMessage}</p>}
          <p className="privacy-note">
            {isArabic
              ? 'تُحفظ المسودة في هذا المتصفح فقط، وليست نسخة احتياطية على الإنترنت.'
              : 'Drafts are saved in this browser only, not backed up online.'}
          </p>
        </section>

        <section className="preview-panel">
          <div className="panel-heading">
            <h2>{labels.preview}</h2>
            <label className="language-picker">
              <span>{labels.language}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </label>
          </div>

          <h3 className="design-heading">{labels.design}</h3>
          <div className="template-picker">
            {templates.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`template-option ${template === item.id ? 'selected' : ''}`}
                onClick={() => setTemplate(item.id)}
                aria-pressed={template === item.id}
              >
                <span className={`template-swatch swatch-${item.id}`}>
                  <span />
                  <span />
                  <span />
                </span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </button>
            ))}
          </div>

          <article
            className={previewClass}
            dir={isArabic ? 'rtl' : 'ltr'}
            lang={isArabic ? 'ar' : 'en'}
          >
            <div className="resume-top">
              <h1>{resume.name || (isArabic ? 'الاسم الكامل' : 'Your Name')}</h1>
              <p className="resume-role">{resume.role}</p>
              <p className="resume-contact">
                {[resume.email, resume.location].filter(Boolean).join(' · ')}
              </p>
            </div>

            <ResumeSection title={isArabic ? 'النبذة المهنية' : 'PROFILE'}
              content={resume.summary} empty={labels.empty} />
            <ResumeSection title={isArabic ? 'الخبرة' : 'EXPERIENCE'}
              content={resume.experience} empty={labels.empty} />
            <ResumeSection title={isArabic ? 'المهارات' : 'SKILLS'}
              content={resume.skills} empty={labels.empty} />
            <ResumeSection title={isArabic ? 'التعليم' : 'EDUCATION'}
              content={resume.education} empty={labels.empty} />
          </article>

          <p className="preview-footnote">
            {isArabic
              ? 'هذه معاينة داخل المتصفح. تصدير PDF وDOCX سيُضاف في المرحلة التالية.'
              : 'This is a browser preview. PDF and DOCX export comes in the next stage.'}
          </p>
        </section>
      </div>

      <style jsx>{`
        .studio {
          --ink: #172033;
          --muted: #667085;
          --line: #e5e7eb;
          --accent: #4f46e5;
          min-height: 100vh;
          padding: 24px clamp(16px, 4vw, 56px) 64px;
          color: var(--ink);
          background: #f7f8fc;
          font-family: Arial, Helvetica, sans-serif;
        }
        .studio-header, .panel-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .studio-header {
          max-width: 1440px;
          margin: 0 auto;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--line);
        }
        .brand {
          color: var(--ink);
          font-weight: 800;
          font-size: 21px;
          text-decoration: none;
          letter-spacing: -0.7px;
        }
        .brand span { color: var(--accent); }
        .free-tag, .eyebrow {
          color: var(--accent);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }
        .studio-intro { max-width: 1440px; margin: 30px auto; }
        .eyebrow { margin: 0 0 8px; }
        .studio-intro h1 { margin: 0; font-size: clamp(27px, 4vw, 42px); letter-spacing: -1.4px; }
        .studio-intro > p:last-child { color: var(--muted); margin-top: 10px; }
        .studio-layout {
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 24px;
          align-items: start;
        }
        .editor-panel, .preview-panel {
          min-width: 0;
          background: white;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: clamp(16px, 2.5vw, 28px);
          box-shadow: 0 8px 28px rgba(20, 30, 60, .035);
        }
        .panel-heading { margin-bottom: 22px; flex-wrap: wrap; }
        .panel-heading h2 { font-size: 17px; margin: 0; }
        .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
        .field label { font-size: 12px; color: #475467; font-weight: 700; }
        .field input, .field textarea, .language-picker select {
          width: 100%;
          min-width: 0;
          border: 1px solid #d9dce5;
          border-radius: 9px;
          padding: 11px 12px;
          color: var(--ink);
          background: #fff;
          font: inherit;
          font-size: 14px;
          outline: none;
        }
        .field input:focus, .field textarea:focus, .language-picker select:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, .1);
        }
        .field textarea { resize: vertical; line-height: 1.6; }
        .small-button {
          background: white; border: 1px solid var(--line); border-radius: 8px;
          padding: 9px 11px; color: var(--ink); cursor: pointer;
        }
        .primary-button {
          width: 100%; padding: 13px; border: 0; border-radius: 10px;
          color: white; background: var(--accent); font-weight: 700; cursor: pointer;
        }
        .status-message { color: #15803d; font-size: 13px; }
        .privacy-note, .preview-footnote { color: var(--muted); font-size: 12px; line-height: 1.6; }
        .language-picker { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); }
        .language-picker select { width: auto; padding: 8px; }
        .design-heading { font-size: 12px; color: var(--muted); margin: 0 0 10px; }
        .template-picker { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; margin-bottom: 22px; }
        .template-option {
          min-width: 0; display: flex; flex-direction: column; align-items: flex-start;
          gap: 5px; padding: 10px; border: 1px solid var(--line); border-radius: 10px;
          background: white; cursor: pointer; text-align: start;
        }
        .template-option.selected { border: 2px solid var(--accent); padding: 9px; background: #f8f7ff; }
        .template-option strong { font-size: 12px; }
        .template-option small { color: var(--muted); font-size: 10px; }
        .template-swatch { width: 100%; height: 56px; padding: 9px; display: flex; flex-direction: column; gap: 5px; background: #f1f3f7; border-radius: 5px; }
        .template-swatch span { display: block; width: 80%; height: 4px; background: #b7bfce; border-radius: 4px; }
        .template-swatch span:first-child { width: 48%; height: 7px; background: #374151; margin-bottom: 3px; }
        .swatch-modern { background: #eef2ff; border-inline-start: 5px solid #4f46e5; }
        .swatch-minimal { background: white; border: 1px solid #e5e7eb; }
        .resume-paper {
          max-width: 680px; min-height: 680px; margin: 0 auto;
          padding: clamp(22px, 4vw, 48px);
          background: white; color: #202938; border: 1px solid #e6e8ee;
          box-shadow: 0 10px 30px rgba(20, 30, 60, .08);
          overflow-wrap: anywhere; unicode-bidi: plaintext;
          font-family: Arial, Helvetica, sans-serif; line-height: 1.6;
        }
        .resume-top { padding-bottom: 18px; border-bottom: 2px solid #d8dce5; }
        .resume-top h1 { margin: 0; font-size: clamp(25px, 4vw, 34px); line-height: 1.2; overflow-wrap: anywhere; }
        .resume-role { margin: 9px 0 4px; color: #4f46e5; font-weight: 700; }
        .resume-contact { margin: 0; color: #667085; font-size: 12px; overflow-wrap: anywhere; }
        .resume-section { margin-top: 23px; }
        .resume-section h2 { margin: 0 0 8px; font-size: 11px; letter-spacing: 1.2px; color: #4f46e5; }
        .resume-section p { margin: 0; white-space: pre-wrap; font-size: 13px; overflow-wrap: anywhere; }
        .template-classic .resume-top { border-bottom: 3px double #374151; }
        .template-classic .resume-role, .template-classic .resume-section h2 { color: #374151; }
        .template-modern .resume-top { border-bottom: 4px solid #4f46e5; }
        .template-minimal { box-shadow: none; border-color: #e5e7eb; }
        .template-minimal .resume-top { border-bottom: 1px solid #e5e7eb; }
        .template-minimal .resume-role, .template-minimal .resume-section h2 { color: #52525b; }
        @media (max-width: 900px) {
          .studio-layout { grid-template-columns: 1fr; }
          .preview-panel { order: -1; }
          .resume-paper { min-height: 560px; }
        }
        @media (max-width: 480px) {
          .field-grid { grid-template-columns: 1fr; gap: 0; }
          .template-option { padding: 7px; }
          .template-option.selected { padding: 6px; }
          .template-option small { line-height: 1.3; }
          .language-picker { flex-wrap: wrap; }
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="field">
      <label>
        {label}
        <input
          type={type}
          value={value}
          maxLength={1000}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <div className="field">
      <label>
        {label}
        <textarea
          value={value}
          maxLength={10000}
          rows={rows}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  );
}

function ResumeSection({
  title,
  content,
  empty,
}: {
  title: string;
  content: string;
  empty: string;
}) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <p>{content.trim() || empty}</p>
    </section>
  );
}

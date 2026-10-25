
'use client';

import { useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'fr' | 'ar';
type Template = 'modern' | 'classic' | 'minimal';

type Resume = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
};

const STORAGE_KEY = 'resumaker-pro-resume-v1';

const EMPTY_RESUME: Resume = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  summary: '',
  experience: '',
  education: '',
  skills: '',
};

const COPY = {
  en: {
    eyebrow: 'YOUR NEXT CAREER MOVE',
    heading: 'Build a resume that opens doors.',
    subtitle: 'Create, personalize and preview your professional resume.',
    editor: 'Resume details',
    preview: 'Live preview',
    name: 'Full name',
    title: 'Professional title',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    website: 'Website or LinkedIn',
    summary: 'Professional summary',
    experience: 'Experience and achievements',
    education: 'Education and certifications',
    skills: 'Skills',
    templates: 'Choose your template',
    modern: 'Modern',
    classic: 'Classic',
    minimal: 'Minimal',
    save: 'Save draft',
    clear: 'Clear',
    export: 'Export PDF',
    saved: 'Draft saved on this device.',
    privacy: 'Your draft is stored locally in this browser.',
    profile: 'PROFILE',
    work: 'EXPERIENCE',
    study: 'EDUCATION',
    abilities: 'SKILLS',
    contact: 'CONTACT',
    placeholder: 'Your information will appear here.',
    confirm: 'Clear all resume details?',
    language: 'Language',
  },
  fr: {
    eyebrow: 'VOTRE PROCHAINE ÉTAPE',
    heading: 'Créez un CV qui ouvre des portes.',
    subtitle: 'Créez, personnalisez et prévisualisez votre CV professionnel.',
    editor: 'Informations du CV',
    preview: 'Aperçu en direct',
    name: 'Nom complet',
    title: 'Intitulé professionnel',
    email: 'E-mail',
    phone: 'Téléphone',
    location: 'Localisation',
    website: 'Site web ou LinkedIn',
    summary: 'Profil professionnel',
    experience: 'Expérience et réalisations',
    education: 'Formation et certifications',
    skills: 'Compétences',
    templates: 'Choisissez un modèle',
    modern: 'Moderne',
    classic: 'Classique',
    minimal: 'Minimaliste',
    save: 'Enregistrer',
    clear: 'Effacer',
    export: 'Exporter en PDF',
    saved: 'Brouillon enregistré sur cet appareil.',
    privacy: 'Votre brouillon est enregistré dans ce navigateur.',
    profile: 'PROFIL',
    work: 'EXPÉRIENCE',
    study: 'FORMATION',
    abilities: 'COMPÉTENCES',
    contact: 'CONTACT',
    placeholder: 'Vos informations apparaîtront ici.',
    confirm: 'Effacer toutes les informations du CV ?',
    language: 'Langue',
  },
  ar: {
    eyebrow: 'خطوتك المهنية القادمة',
    heading: 'أنشئ سيرة ذاتية تفتح لك الأبواب.',
    subtitle: 'أنشئ سيرتك الذاتية وخصصها وشاهد النتيجة مباشرة.',
    editor: 'بيانات السيرة الذاتية',
    preview: 'معاينة مباشرة',
    name: 'الاسم الكامل',
    title: 'المسمى الوظيفي',
    email: 'البريد الإلكتروني',
    phone: 'رقم الهاتف',
    location: 'المدينة والدولة',
    website: 'الموقع أو LinkedIn',
    summary: 'النبذة المهنية',
    experience: 'الخبرة والإنجازات',
    education: 'التعليم والشهادات',
    skills: 'المهارات',
    templates: 'اختر التصميم',
    modern: 'عصري',
    classic: 'كلاسيكي',
    minimal: 'بسيط',
    save: 'حفظ المسودة',
    clear: 'مسح البيانات',
    export: 'تصدير PDF',
    saved: 'حُفظت المسودة على هذا الجهاز.',
    privacy: 'تُحفظ المسودة محليًا في هذا المتصفح.',
    profile: 'النبذة المهنية',
    work: 'الخبرة المهنية',
    study: 'التعليم',
    abilities: 'المهارات',
    contact: 'التواصل',
    placeholder: 'ستظهر معلوماتك هنا.',
    confirm: 'هل تريد مسح بيانات السيرة الذاتية؟',
    language: 'اللغة',
  },
} as const;

export default function EditorPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [template, setTemplate] = useState<Template>('modern');
  const [resume, setResume] = useState<Resume>(EMPTY_RESUME);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');

  const t = COPY[language];
  const rtl = language === 'ar';

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as {
          resume?: Partial<Resume>;
          language?: Language;
          template?: Template;
        };

        if (data.resume) {
          setResume({ ...EMPTY_RESUME, ...data.resume });
        }

        if (
          data.language === 'en' ||
          data.language === 'fr' ||
          data.language === 'ar'
        ) {
          setLanguage(data.language);
        }

        if (
          data.template === 'modern' ||
          data.template === 'classic' ||
          data.template === 'minimal'
        ) {
          setTemplate(data.template);
        }
      }
    } catch {
      // Keep the editor available if local data is invalid.
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;

    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ resume, language, template }),
        );
        setStatus('');
      } catch {
        setStatus(
          language === 'ar'
            ? 'تعذّر الحفظ المحلي.'
            : language === 'fr'
              ? 'Enregistrement local indisponible.'
              : 'Local saving is unavailable.',
        );
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [resume, language, template, ready]);

  const completion = useMemo(() => {
    const fields = [
      resume.name,
      resume.title,
      resume.email,
      resume.summary,
      resume.experience,
      resume.education,
      resume.skills,
    ];

    return Math.round(
      (fields.filter((field) => field.trim()).length / fields.length) *
        100,
    );
  }, [resume]);

  function update(field: keyof Resume, value: string) {
    setResume((current) => ({ ...current, [field]: value }));
    setStatus('');
  }

  function saveDraft() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resume, language, template }),
      );
      setStatus(t.saved);
    } catch {
      setStatus(
        language === 'ar'
          ? 'تعذّر الحفظ. تحقق من إعدادات المتصفح.'
          : language === 'fr'
            ? 'Échec de l’enregistrement.'
            : 'Could not save the draft.',
      );
    }
  }

  function clearDraft() {
    if (!window.confirm(t.confirm)) return;
    setResume(EMPTY_RESUME);
    setStatus('');
  }

  function exportPdf() {
    window.print();
  }

  const fields: {
    key: keyof Resume;
    label: string;
    multiline?: boolean;
  }[] = [
    { key: 'name', label: t.name },
    { key: 'title', label: t.title },
    { key: 'email', label: t.email },
    { key: 'phone', label: t.phone },
    { key: 'location', label: t.location },
    { key: 'website', label: t.website },
    { key: 'summary', label: t.summary, multiline: true },
    { key: 'experience', label: t.experience, multiline: true },
    { key: 'education', label: t.education, multiline: true },
    { key: 'skills', label: t.skills, multiline: true },
  ];

  return (
    <main className="resume-app" dir={rtl ? 'rtl' : 'ltr'}>
      <header className="topbar no-print">
        <a href="/" className="brand">
          ResuMaker <span>AI</span>
        </a>

        <label className="language-control">
          <span>{t.language}</span>
          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value as Language)
            }
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </label>
      </header>

      <section className="intro no-print">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.heading}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="workspace">
        <section className="editor-card no-print">
          <div className="section-heading">
            <div>
              <h2>{t.editor}</h2>
              <p>{completion}%</p>
            </div>
            <button className="button button-primary" onClick={saveDraft}>
              {t.save}
            </button>
          </div>

          <div className="progress">
            <span style={{ width: `${completion}%` }} />
          </div>

          <div className="form-grid">
            {fields.map((field) => (
              <label
                key={field.key}
                className={`form-field ${
                  field.multiline ? 'wide-field' : ''
                }`}
              >
                <span>{field.label}</span>
                {field.multiline ? (
                  <textarea
                    rows={field.key === 'experience' ? 6 : 3}
                    value={resume[field.key]}
                    onChange={(event) =>
                      update(field.key, event.target.value)
                    }
                  />
                ) : (
                  <input
                    type={field.key === 'email' ? 'email' : 'text'}
                    value={resume[field.key]}
                    onChange={(event) =>
                      update(field.key, event.target.value)
                    }
                  />
                )}
              </label>
            ))}
          </div>

          <div className="editor-actions">
            <button className="button button-primary" onClick={exportPdf}>
              {t.export}
            </button>
            <button className="button button-quiet" onClick={clearDraft}>
              {t.clear}
            </button>
          </div>

          <p className="status" role="status">
            {status || t.privacy}
          </p>
        </section>

        <section className="preview-area">
          <div className="preview-heading no-print">
            <div>
              <h2>{t.preview}</h2>
              <p>ResuMaker AI · Resume Studio</p>
            </div>
          </div>

          <div className="template-list no-print">
            {(['modern', 'classic', 'minimal'] as Template[]).map(
              (item) => (
                <button
                  key={item}
                  className={`template-chip ${
                    template === item ? 'active' : ''
                  }`}
                  onClick={() => setTemplate(item)}
                  aria-pressed={template === item}
                >
                  {t[item]}
                </button>
              ),
            )}
          </div>

          <article
            className={`resume-sheet theme-${template}`}
            dir="auto"
            lang={language}
          >
            <header className="resume-header">
              <h1>{resume.name || t.name}</h1>
              <p className="resume-title">
                {resume.title || t.title}
              </p>

              <div className="contact-row">
                {[resume.email, resume.phone, resume.location, resume.website]
                  .filter(Boolean)
                  .map((item, index) => (
                    <span key={`${item}-${index}`} dir="auto">
                      {item}
                    </span>
                  ))}
              </div>
            </header>

            <ResumeSection
              title={t.profile}
              value={resume.summary}
              empty={t.placeholder}
            />
            <ResumeSection
              title={t.work}
              value={resume.experience}
              empty={t.placeholder}
            />
            <ResumeSection
              title={t.study}
              value={resume.education}
              empty={t.placeholder}
            />
            <ResumeSection
              title={t.abilities}
              value={resume.skills}
              empty={t.placeholder}
            />
          </article>

          <p className="pdf-note no-print">
            {language === 'ar'
              ? 'في نافذة الطباعة اختر «حفظ بصيغة PDF».'
              : language === 'fr'
                ? 'Dans la fenêtre d’impression, choisissez « Enregistrer au format PDF ».'
                : 'In the print dialog, choose “Save as PDF”.'}
          </p>
        </section>
      </div>

      <footer className="footer no-print">
        <span>ResuMaker AI</span>
        <span>Build your next opportunity.</span>
      </footer>

      <style jsx>{`
        .resume-app {
          --ink: #172033;
          --muted: #667085;
          --line: #e4e7ef;
          --brand: #635bff;
          --surface: #ffffff;
          min-height: 100vh;
          padding: 24px clamp(14px, 4vw, 56px) 40px;
          background: #f6f7fc;
          color: var(--ink);
          font-family: Arial, Helvetica, sans-serif;
        }

        * { box-sizing: border-box; }

        .topbar, .section-heading, .preview-heading, .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .topbar {
          max-width: 1500px;
          margin: auto;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--line);
        }

        .brand {
          text-decoration: none;
          color: var(--ink);
          font-size: 23px;
          font-weight: 850;
          letter-spacing: -1px;
        }

        .brand span { color: var(--brand); }

        .language-control {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--muted);
          font-size: 12px;
        }

        .language-control select {
          padding: 9px 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: white;
          color: var(--ink);
        }

        .intro { max-width: 1500px; margin: 34px auto 26px; }
        .eyebrow {
          color: var(--brand);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .intro h1 {
          max-width: 800px;
          margin: 10px 0;
          font-size: clamp(30px, 4.5vw, 52px);
          line-height: 1.08;
          letter-spacing: -1.8px;
        }

        .intro > p:last-child { color: var(--muted); line-height: 1.7; }

        .workspace {
          max-width: 1500px;
          margin: auto;
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          gap: 24px;
          align-items: start;
        }

        .editor-card, .preview-area {
          min-width: 0;
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: clamp(16px, 2.5vw, 28px);
          box-shadow: 0 12px 40px rgba(25, 35, 70, .045);
        }

        .section-heading h2, .preview-heading h2 {
          margin: 0;
          font-size: 18px;
        }

        .section-heading p, .preview-heading p {
          margin: 6px 0 0;
          color: var(--muted);
          font-size: 12px;
        }

        .progress {
          height: 6px;
          margin: 18px 0 22px;
          background: #ececf6;
          border-radius: 20px;
          overflow: hidden;
        }

        .progress span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #635bff, #a78bfa);
          border-radius: inherit;
          transition: width .2s ease;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 0;
          color: #344054;
          font-size: 12px;
          font-weight: 700;
        }

        .form-field input, .form-field textarea {
          width: 100%;
          min-width: 0;
          padding: 12px;
          border: 1px solid #dfe2eb;
          border-radius: 10px;
          background: #fff;
          color: var(--ink);
          font: inherit;
          font-size: 14px;
          font-weight: 400;
          outline: none;
        }

        .form-field textarea { resize: vertical; line-height: 1.65; }
        .form-field input:focus, .form-field textarea:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px #635bff18;
        }

        .wide-field { grid-column: 1 / -1; }

        .button {
          padding: 11px 15px;
          border: 0;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }

        .button-primary { color: white; background: var(--brand); }
        .button-quiet { color: #344054; background: #f0f1f7; }
        .editor-actions { display: flex; gap: 10px; margin-top: 22px; flex-wrap: wrap; }
        .status, .pdf-note { color: var(--muted); font-size: 11px; line-height: 1.7; }
        .preview-heading { margin-bottom: 18px; }

        .template-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .template-chip {
          padding: 9px 13px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: white;
          color: #475467;
          cursor: pointer;
          font-size: 12px;
        }
        .template-chip.active {
          color: var(--brand);
          border-color: var(--brand);
          background: #f5f4ff;
        }

        .resume-sheet {
          max-width: 800px;
          min-height: 780px;
          margin: auto;
          padding: clamp(24px, 4vw, 48px);
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 32px #1720330c;
          color: #202938;
          overflow-wrap: anywhere;
          line-height: 1.65;
        }

        .resume-header {
          padding-bottom: 20px;
          border-bottom: 3px solid var(--brand);
        }

        .resume-header h1 {
          margin: 0;
          font-size: clamp(27px, 4vw, 38px);
          line-height: 1.2;
          overflow-wrap: anywhere;
        }

        .resume-title { color: var(--brand); font-weight: 700; margin: 8px 0; }
        .contact-row { display: flex; flex-wrap: wrap; gap: 6px 13px; color: #667085; font-size: 11px; }
        .resume-section { margin-top: 25px; break-inside: avoid; }
        .resume-section h2 { margin: 0 0 9px; color: var(--brand); font-size: 11px; letter-spacing: 1.2px; }
        .resume-section p { margin: 0; white-space: pre-wrap; font-size: 12px; line-height: 1.8; }

        .theme-classic .resume-header { border-bottom: 3px double #344054; }
        .theme-classic .resume-title, .theme-classic .resume-section h2 { color: #344054; }
        .theme-minimal { box-shadow: none; }
        .theme-minimal .resume-header { border-bottom: 1px solid #e5e7eb; }
        .theme-minimal .resume-title, .theme-minimal .resume-section h2 { color: #52525b; }

        .footer { max-width: 1500px; margin: 25px auto 0; color: var(--muted); font-size: 11px; }

        @media (max-width: 950px) {
          .workspace { grid-template-columns: 1fr; }
          .preview-area { order: -1; }
          .resume-sheet { min-height: 600px; }
        }

        @media (max-width: 520px) {
          .form-grid { grid-template-columns: 1fr; }
          .wide-field { grid-column: auto; }
          .intro h1 { letter-spacing: -1px; }
          .footer { flex-direction: column; align-items: flex-start; }
          .resume-sheet { padding: 22px 17px; min-height: 500px; }
        }

        @media print {
          @page { size: A4; margin: 14mm; }
          :global(body) { background: white !important; }
          .resume-app { padding: 0 !important; background: white !important; }
          .no-print { display: none !important; }
          .workspace { display: block !important; margin: 0 !important; }
          .preview-area { padding: 0 !important; border: 0 !important; box-shadow: none !important; }
          .resume-sheet {
            max-width: none !important;
            min-height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: 0 !important;
            box-shadow: none !important;
          }
          .resume-section { break-inside: avoid; }
          .resume-header, .resume-section h2, .resume-title {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}

function ResumeSection({
  title,
  value,
  empty,
}: {
  title: string;
  value: string;
  empty: string;
}) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <p dir="auto">{value.trim() || empty}</p>
    </section>
  );
}

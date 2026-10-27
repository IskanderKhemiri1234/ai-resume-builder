
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Language = 'en' | 'fr' | 'ar';

const services = [
  {
    id: 'automation',
    title: {
      en: 'AI Automation',
      fr: 'Automatisation IA',
      ar: 'أتمتة العمليات',
    },
    description: {
      en: 'Streamline repetitive tasks and build smarter workflows.',
      fr: 'Automatisez les tâches répétitives et optimisez vos processus.',
      ar: 'أتمت المهام المتكررة وأنشئ سير عمل أكثر ذكاءً.',
    },
    icon: '⌘',
    theme: 'purple',
  },
  {
    id: 'content_repurposing',
    title: {
      en: 'Content Repurposing',
      fr: 'Réutilisation de contenu',
      ar: 'إعادة تدوير المحتوى',
    },
    description: {
      en: 'Turn one idea into multiple useful content formats.',
      fr: 'Transformez une idée en plusieurs formats de contenu.',
      ar: 'حوّل الفكرة الواحدة إلى أشكال متعددة من المحتوى.',
    },
    icon: '▤',
    theme: 'orange',
  },
  {
    id: 'bi_dashboard',
    title: {
      en: 'BI & Dashboards',
      fr: 'Données et tableaux de bord',
      ar: 'البيانات ولوحات المعلومات',
    },
    description: {
      en: 'Turn business data into clearer insights and decisions.',
      fr: 'Transformez vos données en analyses et décisions utiles.',
      ar: 'حوّل بياناتك إلى مؤشرات وقرارات أوضح.',
    },
    icon: '▥',
    theme: 'blue',
  },
  {
    id: 'prompt_engineering',
    title: {
      en: 'Prompt Engineering',
      fr: 'Ingénierie des prompts',
      ar: 'هندسة الأوامر',
    },
    description: {
      en: 'Create structured prompts for more useful AI results.',
      fr: 'Créez des prompts structurés pour de meilleurs résultats.',
      ar: 'أنشئ أوامر احترافية للحصول على نتائج أفضل.',
    },
    icon: '›_',
    theme: 'teal',
  },
  {
    id: 'sales_funnel',
    title: {
      en: 'Sales Funnel',
      fr: 'Tunnel de vente',
      ar: 'قمع المبيعات',
    },
    description: {
      en: 'Plan customer journeys from discovery to conversion.',
      fr: 'Planifiez le parcours client jusqu’à la conversion.',
      ar: 'خطط لرحلة العميل من الاكتشاف إلى الشراء.',
    },
    icon: '◈',
    theme: 'pink',
  },
  {
    id: 'geo',
    title: {
      en: 'Generative Engine Optimization',
      fr: 'Optimisation pour les moteurs IA',
      ar: 'تحسين الظهور في محركات الذكاء الاصطناعي',
    },
    description: {
      en: 'Improve content clarity for search and AI discovery.',
      fr: 'Améliorez la visibilité de vos contenus dans la recherche.',
      ar: 'حسّن وضوح محتواك لمحركات البحث وأدوات الذكاء الاصطناعي.',
    },
    icon: '◎',
    theme: 'violet',
  },
  {
    id: 'notion_pkm',
    title: {
      en: 'Notion & PKM',
      fr: 'Notion et gestion des connaissances',
      ar: 'مساحات العمل والمعرفة',
    },
    description: {
      en: 'Organize ideas, notes, projects and knowledge systems.',
      fr: 'Organisez vos idées, notes, projets et connaissances.',
      ar: 'نظّم أفكارك وملاحظاتك ومشاريعك ومعارفك.',
    },
    icon: '⊞',
    theme: 'yellow',
  },
  {
    id: 'crm_setup',
    title: {
      en: 'CRM Setup',
      fr: 'Gestion de la relation client',
      ar: 'إدارة علاقات العملاء',
    },
    description: {
      en: 'Structure customer relationships and follow-up workflows.',
      fr: 'Structurez vos relations clients et vos suivis.',
      ar: 'نظّم علاقات العملاء ومتابعة فرص البيع.',
    },
    icon: '♧',
    theme: 'mint',
  },
] as const;

const copy = {
  en: {
    announcement: 'Your intelligent workspace for work and productivity',
    subtitle: 'AI WORKSPACE · BUILT FOR YOUR NEXT MOVE',
    heroStart: 'Turn your ideas into',
    heroAccent: 'real results.',
    heroDescription:
      'Explore practical AI tools for content, automation, analytics, business and career development.',
    search: 'Search services...',
    services: 'Explore AI services',
    viewAll: 'Clear search',
    start: 'Open workspace',
    features: 'One platform. Multiple workflows.',
    featureText:
      'Move from ideas to useful deliverables with tools designed around real tasks.',
    career: 'Career workspace',
    careerText:
      'Build a resume, prepare a cover letter or improve your LinkedIn profile.',
    careerButton: 'Open career editor',
    footer:
      'Tools and results depend on the services configured for your account.',
    home: 'Home',
    tools: 'Services',
    projects: 'Projects',
    account: 'Account',
    empty: 'No matching services. Try another search.',
    menu: 'Navigation',
  },
  fr: {
    announcement: 'Votre espace intelligent de travail et de productivité',
    subtitle: 'ESPACE IA · PENSE POUR VOTRE PROGRESSION',
    heroStart: 'Transformez vos idées en',
    heroAccent: 'résultats concrets.',
    heroDescription:
      'Découvrez des outils IA pour le contenu, l’automatisation, les données, les affaires et votre carrière.',
    search: 'Rechercher un service...',
    services: 'Explorez les services IA',
    viewAll: 'Effacer la recherche',
    start: 'Ouvrir l’espace',
    features: 'Une plateforme. Plusieurs processus.',
    featureText:
      'Passez des idées à des résultats utiles grâce à des outils conçus pour des tâches concrètes.',
    career: 'Espace carrière',
    careerText:
      'Créez un CV, préparez une lettre de motivation ou améliorez votre profil LinkedIn.',
    careerButton: 'Ouvrir l’éditeur carrière',
    footer:
      'Les outils et résultats dépendent des services configurés pour votre compte.',
    home: 'Accueil',
    tools: 'Services',
    projects: 'Projets',
    account: 'Compte',
    empty: 'Aucun service correspondant. Essayez une autre recherche.',
    menu: 'Navigation',
  },
  ar: {
    announcement: 'مساحتك الذكية للعمل والإنتاجية',
    subtitle: 'مساحة ذكاء اصطناعي · لخطوتك القادمة',
    heroStart: 'حوّل أفكارك إلى',
    heroAccent: 'نتائج حقيقية.',
    heroDescription:
      'اكتشف أدوات عملية للمحتوى والأتمتة والتحليلات والأعمال وتطوير المسار المهني.',
    search: 'ابحث عن خدمة...',
    services: 'استكشف خدمات الذكاء الاصطناعي',
    viewAll: 'مسح البحث',
    start: 'افتح مساحة العمل',
    features: 'منصة واحدة. مهام متعددة.',
    featureText:
      'انتقل من الأفكار إلى نتائج عملية باستخدام أدوات مصممة لإنجاز مهام حقيقية.',
    career: 'المساحة المهنية',
    careerText:
      'أنشئ سيرتك الذاتية أو خطاب التقديم أو حسّن ملفك المهني على LinkedIn.',
    careerButton: 'افتح المحرر المهني',
    footer: 'تعتمد الأدوات والنتائج على الخدمات المهيأة فعلياً لحسابك.',
    home: 'الرئيسية',
    tools: 'الخدمات',
    projects: 'مشاريعي',
    account: 'حسابي',
    empty: 'لم نعثر على خدمة مطابقة. جرّب كلمة أخرى.',
    menu: 'التنقل',
  },
} as const;

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('en');
  const [search, setSearch] = useState('');
  const [activeNav, setActiveNav] = useState('tools');
  const [menuOpen, setMenuOpen] = useState(false);

  const t = copy[language];
  const isRTL = language === 'ar';

  const visibleServices = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) return services;

    return services.filter((service) => {
      const item = service.title[language];
      const description = service.description[language];

      return `${item} ${description} ${service.id}`
        .toLocaleLowerCase()
        .includes(query);
    });
  }, [language, search]);

  return (
    <main className="kai-app" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="kai-container">
        <div className="kai-header">
          <Link href="/" className="kai-brand" aria-label="Khemiri AI home">
            <span className="kai-brand-mark">✧</span>
            <span>
              <span className="kai-brand-name">
                Khemiri <span>AI</span>
              </span>
              <span className="kai-brand-subtitle">{t.announcement}</span>
            </span>
          </Link>

          <div className="kai-header-actions">
            <label>
              <span className="sr-only">Language</span>
              <select
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value as Language)
                }
                aria-label="Select language"
                style={{
                  maxWidth: 105,
                  padding: '10px 8px',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </label>

            <button
              type="button"
              className="kai-icon-button"
              aria-label={t.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              ☰
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="kai-panel"
            aria-label={t.menu}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 18,
              marginBottom: 22,
            }}
          >
            <Link href="/">{t.home}</Link>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              {t.tools}
            </a>
            <Link href="/editor">{t.careerButton}</Link>
            <a href="#career" onClick={() => setMenuOpen(false)}>
              {t.career}
            </a>
          </nav>
        )}

        <section className="kai-hero">
          <div className="kai-hero-label">
            <span aria-hidden="true">✦</span>
            {t.subtitle}
          </div>

          <h1>
            {t.heroStart}{' '}
            <span className="kai-gradient-text">{t.heroAccent}</span>
          </h1>

          <p className="kai-hero-description">{t.heroDescription}</p>

          <label className="kai-search">
            <span className="kai-search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.search}
              aria-label={t.search}
            />
            {search && (
              <button
                type="button"
                className="kai-icon-button"
                aria-label={t.viewAll}
                onClick={() => setSearch('')}
              >
                ×
              </button>
            )}
          </label>
        </section>

        <section className="kai-section" id="services">
          <div className="kai-section-heading">
            <h2>{t.services}</h2>
            <button type="button" onClick={() => setSearch('')}>
              {t.viewAll}
            </button>
          </div>

          <div className="kai-service-grid">
            {visibleServices.map((service) => (
              <Link
                href={`/editor?service=${service.id}`}
                key={service.id}
                className={`kai-service-card kai-theme-${service.theme}`}
              >
                <span className="kai-service-icon" aria-hidden="true">
                  {service.icon}
                </span>
                <h3>{service.title[language]}</h3>
                <p className="kai-service-description">
                  {service.description[language]}
                </p>
                <span className="kai-service-link">
                  {t.start} <span aria-hidden="true">←</span>
                </span>
              </Link>
            ))}
          </div>

          {visibleServices.length === 0 && (
            <p role="status" className="kai-panel">
              {t.empty}
            </p>
          )}
        </section>

        <section className="kai-section" id="career">
          <div className="kai-panel">
            <h2>{t.career}</h2>
            <p className="kai-hero-description">{t.careerText}</p>
            <Link href="/editor" className="kai-button">
              {t.careerButton} <span aria-hidden="true">←</span>
            </Link>
          </div>
        </section>

        <footer className="kai-footer">
          <strong>Khemiri AI</strong>
          <p>{t.footer}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </footer>
      </div>

      <nav className="kai-bottom-nav" aria-label="Main navigation">
        {[
          { id: 'home', icon: '⌂', label: t.home, href: '/' },
          { id: 'tools', icon: '⊞', label: t.tools, href: '#services' },
          { id: 'projects', icon: '▱', label: t.projects, href: '/editor' },
          { id: 'account', icon: '♙', label: t.account, href: '/editor' },
        ].map((item) => (
          <a
            href={item.href}
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            className={`kai-nav-item ${
              activeNav === item.id ? 'is-active' : ''
            }`}
          >
            <span className="kai-nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </main>
  );
}

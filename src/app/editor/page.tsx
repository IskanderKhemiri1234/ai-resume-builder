
'use client';
import { useSearchParams } from 'next/navigation';
import { SERVICES, SERVICE_API_TYPES } from '@/types/service';
import type { Service } from '@/types/service';

import { useEffect, useMemo, useState } from 'react';
type Language = 'en' | 'fr' | 'ar';
type Template = 'modern' | 'classic' | 'minimal';



type Tone =
  | 'Professional'
  | 'Executive'
  | 'Creative'
  | 'Entry-Level';

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

type ServiceForm = {
  content: string;
  jobDescription: string;
  additionalInstructions: string;
};

const STORAGE_KEY = 'resumaker-pro-resume-v1';
const SERVICE_STORAGE_KEY = 'resumaker-career-service-v1';

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

const EMPTY_FORM: ServiceForm = {
  content: '',
  jobDescription: '',
  additionalInstructions: '',
};

const COPY = {
  en: {
    eyebrow: 'YOUR CAREER WORKSPACE',
    heading: 'Your next career move starts here.',
    subtitle:
      'Create professional documents, prepare for interviews, and plan your next move with AI.',
    servicesTitle: 'Choose a service',
    servicesSubtitle: 'What would you like help with today?',
    editor: 'Resume details',
    preview: 'Document preview',
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
    export: 'Print / Save PDF',
    saved: 'Draft saved on this device.',
    privacy: 'Your draft is stored locally in this browser.',
    profile: 'PROFILE',
    work: 'EXPERIENCE',
    study: 'EDUCATION',
    abilities: 'SKILLS',
    placeholder: 'Your information will appear here.',
    confirm: 'Clear all resume details?',
    language: 'Language',
    tone: 'Writing style',
    professional: 'Professional',
    executive: 'Executive',
    creative: 'Creative',
    entry: 'Entry level',
    generate: 'Generate with AI',
    generating: 'Generating your content...',
    generated: 'AI content generated. Review it before using it.',
    generateError: 'Generation failed.',
    content: 'Your information',
    contentHint:
      'Add your background, goals, experience, or the details needed for this service.',
    job: 'Target job or context',
    jobHint:
      'Paste the job description or explain the situation. This is optional.',
    instructions: 'Additional instructions',
    instructionsHint:
      'Describe your preferred format, length, or specific requirements.',
    result: 'AI result',
    resultHint: 'You can edit the result before printing or copying it.',
    copy: 'Copy result',
    copied: 'Result copied.',
    back: 'All services',
    start: 'Start with this service',
    printHint: 'Use the print dialog and select Save as PDF.',
    required: 'Please provide some information before generating.',
    services: {
      resume: {
        title: 'Resume / CV',
        description: 'Build and improve a professional resume.',
        icon: 'CV',
        contentLabel: 'Your career information',
        jobLabel: 'Target job description',
      },
      cover: {
        title: 'Cover letter',
        description: 'Write a tailored letter for a job application.',
        icon: 'CL',
        contentLabel: 'Your background and experience',
        jobLabel: 'Job description and company',
      },
      linkedin: {
        title: 'LinkedIn profile',
        description: 'Improve your headline, summary, and profile.',
        icon: 'in',
        contentLabel: 'Your experience and career goals',
        jobLabel: 'Target role or industry',
      },
      interview: {
        title: 'Interview preparation',
        description: 'Practice questions and prepare strong answers.',
        icon: 'Q&A',
        contentLabel: 'Your background and interview details',
        jobLabel: 'Role and interview description',
      },
      career: {
        title: 'Career guidance',
        description: 'Build a practical career development plan.',
        icon: 'GO',
        contentLabel: 'Your current situation and goals',
        jobLabel: 'Target role or career direction',
      },
      job_application: {
        title: 'Job application',
        description: 'Prepare a tailored application and message.',
        icon: 'JOB',
        contentLabel: 'Your background and application details',
        jobLabel: 'Job posting and employer',
      },
      professional_bio: {
        title: 'Professional bio',
        description: 'Write a polished professional biography.',
        icon: 'BIO',
        contentLabel: 'Your background, achievements, and goals',
        jobLabel: 'Audience or intended use',
      },
      email: {
        title: 'Professional email',
        description: 'Write a clear and effective work email.',
        icon: '@',
        contentLabel: 'What you want to communicate',
        jobLabel: 'Recipient and situation',
      },
    },
  },
  fr: {
    eyebrow: 'VOTRE ESPACE CARRIÈRE',
    heading: 'Votre prochaine étape commence ici.',
    subtitle:
      'Créez des documents professionnels, préparez vos entretiens et développez votre carrière avec l’IA.',
    servicesTitle: 'Choisissez un service',
    servicesSubtitle: 'De quoi avez-vous besoin aujourd’hui ?',
    editor: 'Informations du CV',
    preview: 'Aperçu du document',
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
    export: 'Imprimer / PDF',
    saved: 'Brouillon enregistré sur cet appareil.',
    privacy: 'Votre brouillon est enregistré dans ce navigateur.',
    profile: 'PROFIL',
    work: 'EXPÉRIENCE',
    study: 'FORMATION',
    abilities: 'COMPÉTENCES',
    placeholder: 'Vos informations apparaîtront ici.',
    confirm: 'Effacer toutes les informations du CV ?',
    language: 'Langue',
    tone: 'Style rédactionnel',
    professional: 'Professionnel',
    executive: 'Direction',
    creative: 'Créatif',
    entry: 'Débutant',
    generate: 'Générer avec l’IA',
    generating: 'Génération en cours...',
    generated: 'Contenu généré. Relisez-le avant utilisation.',
    generateError: 'La génération a échoué.',
    content: 'Vos informations',
    contentHint:
      'Ajoutez votre parcours, vos objectifs et les informations nécessaires.',
    job: 'Poste ou contexte cible',
    jobHint:
      'Collez l’offre d’emploi ou décrivez la situation. Facultatif.',
    instructions: 'Instructions complémentaires',
    instructionsHint:
      'Précisez le format, la longueur ou vos exigences.',
    result: 'Résultat de l’IA',
    resultHint:
      'Vous pouvez modifier le résultat avant de l’imprimer ou de le copier.',
    copy: 'Copier le résultat',
    copied: 'Résultat copié.',
    back: 'Tous les services',
    start: 'Utiliser ce service',
    printHint: 'Choisissez « Enregistrer au format PDF » dans la fenêtre d’impression.',
    required: 'Veuillez fournir quelques informations.',
    services: {
      resume: {
        title: 'CV professionnel',
        description: 'Créez et améliorez votre CV.',
        icon: 'CV',
        contentLabel: 'Votre parcours professionnel',
        jobLabel: 'Description du poste visé',
      },
      cover: {
        title: 'Lettre de motivation',
        description: 'Rédigez une lettre adaptée à une offre.',
        icon: 'LM',
        contentLabel: 'Votre parcours et vos expériences',
        jobLabel: 'Offre et entreprise',
      },
      linkedin: {
        title: 'Profil LinkedIn',
        description: 'Améliorez votre titre et votre profil.',
        icon: 'in',
        contentLabel: 'Votre expérience et vos objectifs',
        jobLabel: 'Poste ou secteur visé',
      },
      interview: {
        title: 'Préparation aux entretiens',
        description: 'Préparez des questions et des réponses solides.',
        icon: 'Q/R',
        contentLabel: 'Votre parcours et les détails de l’entretien',
        jobLabel: 'Poste et description de l’entretien',
      },
      career: {
        title: 'Conseils de carrière',
        description: 'Élaborez un plan de développement professionnel.',
        icon: 'GO',
        contentLabel: 'Votre situation et vos objectifs',
        jobLabel: 'Poste ou orientation souhaitée',
      },
      job_application: {
        title: 'Candidature',
        description: 'Préparez une candidature personnalisée.',
        icon: 'JOB',
        contentLabel: 'Votre parcours et votre candidature',
        jobLabel: 'Offre et employeur',
      },
      professional_bio: {
        title: 'Biographie professionnelle',
        description: 'Rédigez une présentation professionnelle.',
        icon: 'BIO',
        contentLabel: 'Votre parcours et vos réalisations',
        jobLabel: 'Public et utilisation prévue',
      },
      email: {
        title: 'E-mail professionnel',
        description: 'Rédigez un e-mail clair et efficace.',
        icon: '@',
        contentLabel: 'Votre message et votre objectif',
        jobLabel: 'Destinataire et situation',
      },
    },
  },
  ar: {
    eyebrow: 'مساحة تطوير مسارك المهني',
    heading: 'خطوتك المهنية القادمة تبدأ هنا.',
    subtitle:
      'أنشئ مستندات احترافية، واستعد للمقابلات، وطوّر مسارك المهني بمساعدة الذكاء الاصطناعي.',
    servicesTitle: 'اختر الخدمة المناسبة',
    servicesSubtitle: 'ما الذي تريد إنجازه اليوم؟',
    editor: 'بيانات السيرة الذاتية',
    preview: 'معاينة المستند',
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
    export: 'طباعة / حفظ PDF',
    saved: 'حُفظت المسودة على هذا الجهاز.',
    privacy: 'تُحفظ المسودة محليًا في هذا المتصفح.',
    profile: 'النبذة المهنية',
    work: 'الخبرة المهنية',
    study: 'التعليم',
    abilities: 'المهارات',
    placeholder: 'ستظهر معلوماتك هنا.',
    confirm: 'هل تريد مسح بيانات السيرة الذاتية؟',
    language: 'اللغة',
    tone: 'أسلوب الكتابة',
    professional: 'احترافي',
    executive: 'تنفيذي',
    creative: 'إبداعي',
    entry: 'مبتدئ',
    generate: 'إنشاء بالذكاء الاصطناعي',
    generating: 'جارٍ إنشاء المحتوى...',
    generated: 'تم إنشاء المحتوى. راجعه قبل استخدامه.',
    generateError: 'تعذر إنشاء المحتوى.',
    content: 'معلوماتك',
    contentHint:
      'أدخل خبراتك وأهدافك والمعلومات الضرورية لإنجاز الخدمة.',
    job: 'الوظيفة أو السياق المستهدف',
    jobHint:
      'ألصق وصف الوظيفة أو اشرح الموقف. هذا الحقل اختياري.',
    instructions: 'تعليمات إضافية',
    instructionsHint:
      'حدد التنسيق أو الطول أو المتطلبات التي تريدها.',
    result: 'نتيجة الذكاء الاصطناعي',
    resultHint:
      'يمكنك تعديل النتيجة قبل نسخها أو طباعتها.',
    copy: 'نسخ النتيجة',
    copied: 'تم نسخ النتيجة.',
    back: 'جميع الخدمات',
    start: 'ابدأ بهذه الخدمة',
    printHint: 'اختر «حفظ بصيغة PDF» في نافذة الطباعة.',
    required: 'يرجى إدخال بعض المعلومات قبل بدء التوليد.',
    services: {
      resume: {
        title: 'السيرة الذاتية',
        description: 'أنشئ سيرة ذاتية احترافية وطوّرها.',
        icon: 'CV',
        contentLabel: 'معلوماتك المهنية',
        jobLabel: 'وصف الوظيفة المستهدفة',
      },
      cover: {
        title: 'رسالة التغطية',
        description: 'اكتب رسالة مخصصة للتقدم إلى وظيفة.',
        icon: 'CL',
        contentLabel: 'خبراتك ومسارك المهني',
        jobLabel: 'وصف الوظيفة واسم الشركة',
      },
      linkedin: {
        title: 'ملف LinkedIn',
        description: 'حسّن العنوان والنبذة والملف المهني.',
        icon: 'in',
        contentLabel: 'خبراتك وأهدافك المهنية',
        jobLabel: 'الوظيفة أو المجال المستهدف',
      },
      interview: {
        title: 'التحضير للمقابلات',
        description: 'تدرّب على الأسئلة وأعد إجابات قوية.',
        icon: 'Q&A',
        contentLabel: 'خبراتك وتفاصيل المقابلة',
        jobLabel: 'الوظيفة وتفاصيل المقابلة',
      },
      career: {
        title: 'التوجيه المهني',
        description: 'ضع خطة عملية لتطوير مسارك المهني.',
        icon: 'GO',
        contentLabel: 'وضعك الحالي وأهدافك',
        jobLabel: 'الوظيفة أو المسار الذي تستهدفه',
      },
      job_application: {
        title: 'طلب التوظيف',
        description: 'جهّز طلب توظيف ورسالة مخصصة.',
        icon: 'JOB',
        contentLabel: 'خبراتك وتفاصيل الطلب',
        jobLabel: 'إعلان الوظيفة وصاحب العمل',
      },
      professional_bio: {
        title: 'التعريف المهني',
        description: 'اكتب نبذة احترافية عن نفسك.',
        icon: 'BIO',
        contentLabel: 'مسارك وإنجازاتك وأهدافك',
        jobLabel: 'الجمهور والغرض من النبذة',
      },
      email: {
        title: 'رسائل العمل',
        description: 'اكتب رسالة مهنية واضحة وفعالة.',
        icon: '@',
        contentLabel: 'ما تريد إيصاله والهدف من الرسالة',
        jobLabel: 'المستلم والموقف',
      },
    },
  },
} as const;

const SERVICE_IDS: Service[] = SERVICES.map(
  (service) => service.id
);

type ServiceDisplay = {
  title: string;
  description: string;
  icon: string;
  contentLabel: string;
  jobLabel: string;
};

const SERVICE_DISPLAY: Record<
  Service,
  Record<Language, ServiceDisplay>
> = {
  automation: {
    en: {
      title: 'AI Automation',
      description: 'Design intelligent workflows and automate repetitive business tasks.',
      icon: 'AUTO',
      contentLabel: 'Business process and workflow',
      jobLabel: 'Automation goals and requirements',
    },
    fr: {
      title: 'Automatisation IA',
      description: 'Concevez des flux intelligents et automatisez les tâches répétitives.',
      icon: 'AUTO',
      contentLabel: 'Processus métier et flux de travail',
      jobLabel: 'Objectifs et exigences d’automatisation',
    },
    ar: {
      title: 'أتمتة الأعمال بالذكاء الاصطناعي',
      description: 'صمّم تدفقات عمل ذكية وأتمت المهام المتكررة.',
      icon: 'AUTO',
      contentLabel: 'العملية التجارية وتدفق العمل',
      jobLabel: 'أهداف الأتمتة والمتطلبات',
    },
  },
  content_repurposing: {
    en: {
      title: 'Content Repurposing',
      description: 'Transform existing content into multiple formats and channels.',
      icon: 'CONTENT',
      contentLabel: 'Original content and source material',
      jobLabel: 'Target platforms and audience',
    },
    fr: {
      title: 'Réutilisation de contenu',
      description: 'Transformez un contenu existant en plusieurs formats.',
      icon: 'CONTENT',
      contentLabel: 'Contenu original et documents sources',
      jobLabel: 'Plateformes cibles et public',
    },
    ar: {
      title: 'إعادة توظيف المحتوى',
      description: 'حوّل المحتوى الحالي إلى صيغ متعددة تناسب منصات مختلفة.',
      icon: 'CONTENT',
      contentLabel: 'المحتوى الأصلي والمواد المصدرية',
      jobLabel: 'المنصات والجمهور المستهدف',
    },
  },
  prompt_engineering: {
    en: {
      title: 'Prompt Engineering',
      description: 'Create structured prompts for more reliable AI outputs.',
      icon: 'PROMPT',
      contentLabel: 'Task, context and desired AI output',
      jobLabel: 'AI tool and specific constraints',
    },
    fr: {
      title: 'Ingénierie des prompts',
      description: 'Créez des instructions structurées pour de meilleurs résultats IA.',
      icon: 'PROMPT',
      contentLabel: 'Tâche, contexte et résultat attendu',
      jobLabel: 'Outil IA et contraintes spécifiques',
    },
    ar: {
      title: 'هندسة الأوامر الذكية',
      description: 'أنشئ تعليمات دقيقة للحصول على نتائج أفضل من الذكاء الاصطناعي.',
      icon: 'PROMPT',
      contentLabel: 'المهمة والسياق والنتيجة المطلوبة',
      jobLabel: 'أداة الذكاء الاصطناعي والقيود المطلوبة',
    },
  },
  bi_dashboard: {
    en: {
      title: 'BI & Dashboards',
      description: 'Structure business metrics, reports and dashboard requirements.',
      icon: 'DATA',
      contentLabel: 'Business data and reporting needs',
      jobLabel: 'KPIs, audience and dashboard goals',
    },
    fr: {
      title: 'BI et tableaux de bord',
      description: 'Structurez les indicateurs, rapports et besoins de visualisation.',
      icon: 'DATA',
      contentLabel: 'Données métier et besoins de reporting',
      jobLabel: 'KPI, public et objectifs du tableau de bord',
    },
    ar: {
      title: 'ذكاء الأعمال ولوحات البيانات',
      description: 'نظّم مؤشرات الأداء والتقارير ومتطلبات لوحات البيانات.',
      icon: 'DATA',
      contentLabel: 'بيانات الأعمال واحتياجات التقارير',
      jobLabel: 'مؤشرات الأداء والجمهور وأهداف اللوحة',
    },
  },
  geo: {
    en: {
      title: 'Generative Engine Optimization',
      description: 'Improve how your brand and content can be understood by AI search systems.',
      icon: 'GEO',
      contentLabel: 'Brand, website and existing content',
      jobLabel: 'Target audience, topics and visibility goals',
    },
    fr: {
      title: 'Optimisation pour les moteurs génératifs',
      description: 'Améliorez la compréhension de votre marque par les systèmes de recherche IA.',
      icon: 'GEO',
      contentLabel: 'Marque, site web et contenu existant',
      jobLabel: 'Public cible, sujets et objectifs de visibilité',
    },
    ar: {
      title: 'تحسين الظهور في محركات الذكاء الاصطناعي',
      description: 'حسّن قابلية فهم علامتك ومحتواك لدى أنظمة البحث المعتمدة على الذكاء الاصطناعي.',
      icon: 'GEO',
      contentLabel: 'العلامة التجارية والموقع والمحتوى الحالي',
      jobLabel: 'الجمهور والموضوعات وأهداف الظهور',
    },
  },
  sales_funnel: {
    en: {
      title: 'Sales Funnel',
      description: 'Plan customer journeys, conversion steps and follow-up messaging.',
      icon: 'FUNNEL',
      contentLabel: 'Product, offer and current sales process',
      jobLabel: 'Target customers and conversion objective',
    },
    fr: {
      title: 'Entonnoir de vente',
      description: 'Planifiez le parcours client, les conversions et les relances.',
      icon: 'FUNNEL',
      contentLabel: 'Produit, offre et processus de vente actuel',
      jobLabel: 'Clients cibles et objectif de conversion',
    },
    ar: {
      title: 'مسار المبيعات',
      description: 'خطّط لرحلة العميل وخطوات التحويل ورسائل المتابعة.',
      icon: 'FUNNEL',
      contentLabel: 'المنتج والعرض وعملية البيع الحالية',
      jobLabel: 'العملاء المستهدفون وهدف التحويل',
    },
  },
  crm_setup: {
    en: {
      title: 'CRM Setup',
      description: 'Organize customer records, pipeline stages and follow-up processes.',
      icon: 'CRM',
      contentLabel: 'Customer workflow and current CRM setup',
      jobLabel: 'Team needs, pipeline and integrations',
    },
    fr: {
      title: 'Configuration CRM',
      description: 'Organisez les fiches clients, les étapes commerciales et les suivis.',
      icon: 'CRM',
      contentLabel: 'Flux client et configuration CRM actuelle',
      jobLabel: 'Besoins de l’équipe, pipeline et intégrations',
    },
    ar: {
      title: 'إعداد نظام إدارة العملاء',
      description: 'نظّم بيانات العملاء ومراحل المبيعات وعمليات المتابعة.',
      icon: 'CRM',
      contentLabel: 'مسار العملاء وإعداد نظام CRM الحالي',
      jobLabel: 'احتياجات الفريق ومراحل البيع والتكاملات',
    },
  },
  notion_pkm: {
    en: {
      title: 'Notion & Knowledge Management',
      description: 'Structure a practical workspace for notes, projects and knowledge.',
      icon: 'NOTION',
      contentLabel: 'Notes, projects and information to organize',
      jobLabel: 'Workspace structure and collaboration needs',
    },
    fr: {
      title: 'Notion et gestion des connaissances',
      description: 'Organisez les notes, projets et connaissances dans un espace pratique.',
      icon: 'NOTION',
      contentLabel: 'Notes, projets et informations à organiser',
      jobLabel: 'Structure de l’espace et besoins de collaboration',
    },
    ar: {
      title: 'Notion وإدارة المعرفة',
      description: 'نظّم الملاحظات والمشروعات والمعرفة في مساحة عمل عملية.',
      icon: 'NOTION',
      contentLabel: 'الملاحظات والمشروعات والمعلومات المطلوب تنظيمها',
      jobLabel: 'هيكل مساحة العمل واحتياجات التعاون',
    },
  },
};

function toApiLanguage(language: Language) {
  const languages: Record<Language, string> = {
    en: 'English',
    fr: 'French',
    ar: 'Arabic',
  };

  return languages[language];
}

function toApiTone(tone: Tone) {
  return tone;
}

function resumeToText(resume: Resume) {
  return [
    `Full name: ${resume.name}`,
    `Professional title: ${resume.title}`,
    `Email: ${resume.email}`,
    `Phone: ${resume.phone}`,
    `Location: ${resume.location}`,
    `Website or LinkedIn: ${resume.website}`,
    `Professional summary: ${resume.summary}`,
    `Experience and achievements: ${resume.experience}`,
    `Education and certifications: ${resume.education}`,
    `Skills: ${resume.skills}`,
  ]
    .filter((line) => !line.endsWith(': '))
    .join('\n');
}

function getErrorMessage(
  data: unknown,
  fallback: string,
): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof data.error === 'string'
  ) {
    return data.error;
  }

  return fallback;
}

export default function EditorPage() {
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState<Language>('en');
  const [template, setTemplate] = useState<Template>('modern');
  const [resume, setResume] = useState<Resume>(EMPTY_RESUME);
  const [service, setService] = useState<Service | null>(null);
  const [tone, setTone] = useState<Tone>('Professional');
  const [form, setForm] = useState<ServiceForm>(EMPTY_FORM);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  
useEffect(() => {
  if (!ready) return;

  const requestedService = searchParams.get('service');

  if (
    requestedService &&
    SERVICE_IDS.includes(requestedService as Service)
  ) {
    setService(requestedService as Service);
    setError('');
    setStatus('');
  }
}, [ready, searchParams]);


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

      const serviceRaw = localStorage.getItem(
        SERVICE_STORAGE_KEY,
      );

      if (serviceRaw) {
        const data = JSON.parse(serviceRaw) as {
          service?: Service;
          tone?: Tone;
          form?: Partial<ServiceForm>;
          result?: string;
        };

        if (
          data.service &&
          SERVICE_IDS.includes(data.service)
        ) {
          setService(data.service);
        }

        if (
          data.tone === 'Professional' ||
          data.tone === 'Executive' ||
          data.tone === 'Creative' ||
          data.tone === 'Entry-Level'
        ) {
          setTone(data.tone);
        }

        if (data.form) {
          setForm({ ...EMPTY_FORM, ...data.form });
        }

        if (typeof data.result === 'string') {
          setResult(data.result);
        }
      }
    } catch {
      // Keep the workspace available if stored data is invalid.
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

        localStorage.setItem(
          SERVICE_STORAGE_KEY,
          JSON.stringify({
            service,
            tone,
            form,
            result,
          }),
        );
      } catch {
        setStatus(
          language === 'ar'
            ? 'تعذّر الحفظ المحلي. تحقق من مساحة المتصفح.'
            : language === 'fr'
              ? 'Enregistrement local indisponible.'
              : 'Local saving is unavailable.',
        );
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [resume, language, template, service, tone, form, result, ready]);

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
      (fields.filter((field) => field.trim()).length /
        fields.length) *
        100,
    );
  }, [resume]);

  function updateResume(field: keyof Resume, value: string) {
    setResume((current) => ({
      ...current,
      [field]: value,
    }));

    setStatus('');
  }

  function updateForm(
    field: keyof ServiceForm,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setError('');
    setStatus('');
  }

  function saveDraft() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ resume, language, template }),
      );

      localStorage.setItem(
        SERVICE_STORAGE_KEY,
        JSON.stringify({
          service,
          tone,
          form,
          result,
        }),
      );

      setStatus(t.saved);
    } catch {
      setStatus(
        language === 'ar'
          ? 'تعذّر الحفظ المحلي.'
          : language === 'fr'
            ? 'Échec de l’enregistrement.'
            : 'Could not save the draft.',
      );
    }
  }

  function clearResume() {
    if (!window.confirm(t.confirm)) return;

    setResume(EMPTY_RESUME);
    setStatus('');
  }  

function selectService(nextService: string) {
    setService(nextService);
    setError('');
    setStatus('');
    setResult('');

    if (String(nextService) === 'resume') {
        setForm((current) => ({
            ...current,
            content: resumeToText(resume),
        
    
function backToServices() {
    if (loading) return;
    setService(null);
    setError('');
    setStatus('');
}


  
  
  async function generateContent(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!service || loading) return;

    const content =
      service === 'resume'
        ? resumeToText(resume)
        : form.content.trim();

    const jobDescription = form.jobDescription.trim();
    const additionalInstructions =
      form.additionalInstructions.trim();

    if (!content && !jobDescription && !additionalInstructions) {
      setError(t.required);
      return;
    }

    setLoading(true);
    setError('');
    setStatus('');
    setResult('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: SERVICE_API_TYPES[service],
          language: toApiLanguage(language),
          tone: toApiTone(tone),
          content,
          jobDescription,
          additionalInstructions,
        }),
      });

      const data: unknown = await response.json();

      if (!response.ok) {
        throw new Error(
          getErrorMessage(data, t.generateError),
        );
      }

      if (
        typeof data !== 'object' ||
        data === null ||
        !('result' in data) ||
        typeof data.result !== 'string' ||
        !data.result.trim()
      ) {
        throw new Error(t.generateError);
      }

      setResult(data.result);
      setStatus(t.generated);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t.generateError,
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setStatus(t.copied);
    } catch {
      setError(
        language === 'ar'
          ? 'تعذّر النسخ تلقائيًا. حدّد النص وانسخه يدويًا.'
          : language === 'fr'
            ? 'Copie automatique impossible. Sélectionnez et copiez le texte manuellement.'
            : 'Automatic copy failed. Select and copy the text manually.',
      );
    }
  }

  function printDocument() {
    window.print();
  }

  const resumeFields: {
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
    {
      key: 'experience',
      label: t.experience,
      multiline: true,
    },
    {
      key: 'education',
      label: t.education,
      multiline: true,
    },
    { key: 'skills', label: t.skills, multiline: true },
  ];

 const serviceCopy = service
  ? SERVICE_DISPLAY[service][language]
  : null; 

  return (
    <main
      className="career-app"
      dir={rtl ? 'rtl' : 'ltr'}
      lang={language}
    >
      <header className="topbar no-print">
        <a href="/" className="brand">
          Khemiri <span>Career AI</span>
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

      {!service ? (
        <section className="service-hub no-print">
          <div className="hub-heading">
            <div>
              <h2>{t.servicesTitle}</h2>
              <p>{t.servicesSubtitle}</p>
            </div>
            <span className="hub-count">08 SERVICES</span>
          </div>

          <div className="service-grid">
            {SERVICE_IDS.map((id) => {
              const item = SERVICE_DISPLAY[id][language];

              return (
                <button
                  key={id}
                  type="button"
                  className="service-card"
                  onClick={() => selectService(id)}
                >
                  <span className="service-icon">
                    {item.icon}
                  </span>
                  <span className="service-card-title">
                    {item.title}
                  </span>
                  <span className="service-description">
                    {item.description}
                  </span>
                  <span className="service-open">
                    {t.start} →
                  </span>
                </button>
              );
            })}
          </div>

          <p className="privacy-note">{t.privacy}</p>
        </section>
      ) : (
        <div className="workspace">
          <section className="editor-card no-print">
            <div className="section-heading">
              <div>
                <button
                  type="button"
                  className="back-button"
                  onClick={backToServices}
                  disabled={loading}
                >
                  ← {t.back}
                </button>
                <h2>{serviceCopy?.title}</h2>
                <p>{serviceCopy?.description}</p>
              </div>

              <button
                type="button"
                className="button button-quiet"
                onClick={saveDraft}
              >
                {t.save}
              </button>
            </div>

            <form onSubmit={generateContent}>
              {service === 'resume' ? (
                <>
                  <div className="completion-row">
                    <span>{t.editor}</span>
                    <strong>{completion}%</strong>
                  </div>

                  <div
                    className="progress"
                    role="progressbar"
                    aria-valuenow={completion}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${completion}%` }} />
                  </div>

                  <div className="form-grid">
                    {resumeFields.map((field) => (
                      <label
                        key={field.key}
                        className={`form-field ${
                          field.multiline ? 'wide-field' : ''
                        }`}
                      >
                        <span>{field.label}</span>
                        {field.multiline ? (
                          <textarea
                            rows={
                              field.key === 'experience' ? 6 : 3
                            }
                            value={resume[field.key]}
                            onChange={(event) => {
                              updateResume(
                                field.key,
                                event.target.value,
                              );

                              setForm((current) => ({
                                ...current,
                                content: resumeToText({
                                  ...resume,
                                  [field.key]: event.target.value,
                                }),
                              }));
                            }}
                          />
                        ) : (
                          <input
                            type={
                              field.key === 'email'
                                ? 'email'
                                : 'text'
                            }
                            value={resume[field.key]}
                            onChange={(event) => {
                              updateResume(
                                field.key,
                                event.target.value,
                              );

                              setForm((current) => ({
                                ...current,
                                content: resumeToText({
                                  ...resume,
                                  [field.key]: event.target.value,
                                }),
                              }));
                            }}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <label className="form-field">
                  <span>
                    {serviceCopy?.contentLabel || t.content}
                  </span>
                  <textarea
                    rows={9}
                    maxLength={7000}
                    value={form.content}
                    onChange={(event) =>
                      updateForm('content', event.target.value)
                    }
                    placeholder={t.contentHint}
                  />
                  <small>{t.contentHint}</small>
                </label>
              )}

              <label className="form-field field-spaced">
                <span>
                  {serviceCopy?.jobLabel || t.job}
                </span>
                <textarea
                  rows={4}
                  maxLength={4000}
                  value={form.jobDescription}
                  onChange={(event) =>
                    updateForm(
                      'jobDescription',
                      event.target.value,
                    )
                  }
                  placeholder={t.jobHint}
                />
              </label>

              <label className="form-field field-spaced">
                <span>{t.instructions}</span>
                <textarea
                  rows={3}
                  maxLength={2000}
                  value={form.additionalInstructions}
                  onChange={(event) =>
                    updateForm(
                      'additionalInstructions',
                      event.target.value,
                    )
                  }
                  placeholder={t.instructionsHint}
                />
              </label>

              <label className="form-field field-spaced">
                <span>{t.tone}</span>
                <select
                  value={tone}
                  onChange={(event) =>
                    setTone(event.target.value as Tone)
                  }
                >
                  <option value="Professional">
                    {t.professional}
                  </option>
                  <option value="Executive">
                    {t.executive}
                  </option>
                  <option value="Creative">{t.creative}</option>
                  <option value="Entry-Level">{t.entry}</option>
                </select>
              </label>

              {error && (
                <div className="message error-message" role="alert">
                  {error}
                </div>
              )}

              {status && (
                <div className="message success-message" role="status">
                  {status}
                </div>
              )}

              <div className="editor-actions">
                <button
                  type="submit"
                  className="button button-primary generate-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      {t.generating}
                    </>
                  ) : (
                    t.generate
                  )}
                </button>

                {service === 'resume' && (
                  <button
                    type="button"
                    className="button button-quiet"
                    onClick={clearResume}
                    disabled={loading}
                  >
                    {t.clear}
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="preview-area">
            {service === 'resume' && (
              <>
                <div className="preview-heading no-print">
                  <div>
                    <h2>{t.preview}</h2>
                    <p>Khemiri Career AI · Resume Studio</p>
                  </div>
                </div>

                <div className="template-list no-print">
                  {(
                    ['modern', 'classic', 'minimal'] as Template[]
                  ).map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`template-chip ${
                        template === item ? 'active' : ''
                      }`}
                      onClick={() => setTemplate(item)}
                      aria-pressed={template === item}
                    >
                      {t[item]}
                    </button>
                  ))}
                </div>
              </>
            )}

            {result ? (
              <section className="result-panel">
                <div className="result-heading no-print">
                  <div>
                    <h2>{t.result}</h2>
                    <p>{t.resultHint}</p>
                  </div>
                  <button
                    type="button"
                    className="button button-quiet"
                    onClick={copyResult}
                  >
                    {t.copy}
                  </button>
                </div>

                {service === 'resume' ? (
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
                        {[
                          resume.email,
                          resume.phone,
                          resume.location,
                          resume.website,
                        ]
                          .filter(Boolean)
                          .map((item, index) => (
                            <span key={`${item}-${index}`} dir="auto">
                              {item}
                            </span>
                          ))}
                      </div>
                    </header>

                    <div className="generated-resume">
                      <textarea
                        className="result-editor resume-result-editor"
                        aria-label={t.result}
                        value={result}
                        onChange={(event) =>
                          setResult(event.target.value)
                        }
                      />
                    </div>
                  </article>
                ) : (
                  <textarea
                    className="result-editor"
                    aria-label={t.result}
                    value={result}
                    onChange={(event) =>
                      setResult(event.target.value)
                    }
                    spellCheck
                  />
                )}

                <div className="editor-actions no-print">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={printDocument}
                  >
                    {t.export}
                  </button>
                </div>

                <p className="pdf-note no-print">{t.printHint}</p>
              </section>
            ) : (
              <div className="empty-preview">
                <div className="empty-icon">✦</div>
                <h2>{t.result}</h2>
                <p>{t.resultHint}</p>
              </div>
            )}
          </section>
        </div>
      )}

      <footer className="footer no-print">
        <span>Khemiri Career AI</span>
        <span>Build your next opportunity.</span>
      </footer>

      <style jsx>{`
        .career-app {
          --ink: #172033;
          --muted: #667085;
          --line: #e4e7ef;
          --brand: #635bff;
          --surface: #ffffff;
          min-height: 100vh;
          padding: 24px clamp(14px, 4vw, 56px) 40px;
          background:
            radial-gradient(ellipse at 10% 0%, #e9e7ff 0, transparent 34%),
            #f6f7fc;
          color: var(--ink);
          font-family: Arial, Helvetica, sans-serif;
        }

        * { box-sizing: border-box; }

        button, input, textarea, select { font: inherit; }
        button:disabled { opacity: .65; cursor: not-allowed; }

        .topbar, .section-heading, .preview-heading,
        .result-heading, .footer, .hub-heading {
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
          font-size: 22px;
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

        .language-control select, .form-field select {
          padding: 10px 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: white;
          color: var(--ink);
        }

        .intro {
          max-width: 1500px;
          margin: 38px auto 30px;
        }

        .eyebrow {
          color: var(--brand);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .intro h1 {
          max-width: 850px;
          margin: 10px 0;
          font-size: clamp(32px, 5vw, 58px);
          line-height: 1.08;
          letter-spacing: -1.8px;
        }

        .intro > p:last-child {
          max-width: 680px;
          color: var(--muted);
          line-height: 1.8;
        }

        .service-hub, .workspace {
          max-width: 1500px;
          margin: auto;
        }

        .hub-heading { margin-bottom: 22px; }
        .hub-heading h2 { margin: 0; font-size: 23px; }
        .hub-heading p { color: var(--muted); font-size: 13px; }

        .hub-count {
          padding: 8px 12px;
          border: 1px solid #dcd9ff;
          border-radius: 999px;
          background: #f0efff;
          color: var(--brand);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .8px;
          white-space: nowrap;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          min-height: 225px;
          padding: 23px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: white;
          color: var(--ink);
          text-align: start;
          cursor: pointer;
          box-shadow: 0 8px 30px #17203306;
          transition: transform .18s ease, box-shadow .18s ease,
            border-color .18s ease;
        }

        .service-card:hover {
          transform: translateY(-3px);
          border-color: #b8b2ff;
          box-shadow: 0 16px 36px #635bff14;
        }

        .service-icon {
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          margin-bottom: 20px;
          border-radius: 13px;
          background: #f0efff;
          color: var(--brand);
          font-size: 13px;
          font-weight: 850;
        }

        .service-card-title { font-size: 16px; font-weight: 800; }
        .service-description {
          margin-top: 9px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .service-open {
          margin-top: auto;
          padding-top: 20px;
          color: var(--brand);
          font-size: 11px;
          font-weight: 800;
        }

        .privacy-note, .pdf-note {
          color: var(--muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .workspace {
          display: grid;
          grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
          gap: 24px;
          align-items: start;
        }

        .editor-card, .preview-area {
          min-width: 0;
          padding: clamp(16px, 2.5vw, 28px);
          border: 1px solid var(--line);
          border-radius: 20px;
          background: white;
          box-shadow: 0 12px 40px #1923460b;
        }

        .section-heading { align-items: flex-start; margin-bottom: 24px; }
        .section-heading h2, .preview-heading h2,
        .result-heading h2 { margin: 12px 0 0; font-size: 19px; }

        .section-heading p, .preview-heading p,
        .result-heading p {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .back-button {
          padding: 0;
          border: 0;
          background: transparent;
          color: var(--brand);
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .completion-row {
          display: flex;
          justify-content: space-between;
          color: var(--muted);
          font-size: 12px;
        }

        .progress {
          height: 6px;
          margin: 12px 0 22px;
          overflow: hidden;
          border-radius: 20px;
          background: #ececf6;
        }

        .progress span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #635bff, #a78bfa);
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

        .form-field input, .form-field textarea,
        .form-field select {
          width: 100%;
          min-width: 0;
          padding: 12px;
          border: 1px solid #dfe2eb;
          border-radius: 10px;
          background: white;
          color: var(--ink);
          font-size: 14px;
          font-weight: 400;
          outline: none;
        }

        .form-field textarea {
          resize: vertical;
          line-height: 1.75;
        }

        .form-field input:focus, .form-field textarea:focus,
        .form-field select:focus, .result-editor:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px #635bff18;
          outline: none;
        }

        .form-field small {
          color: var(--muted);
          font-size: 11px;
          line-height: 1.7;
          font-weight: 400;
        }

        .wide-field { grid-column: 1 / -1; }
        .field-spaced { margin-top: 19px; }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 15px;
          border: 0;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }

        .button-primary { color: white; background: var(--brand); }
        .button-primary:hover { background: #5148ec; }
        .button-quiet { color: #344054; background: #f0f1f7; }

        .editor-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .generate-button { min-height: 44px; }

        .spinner {
          width: 15px;
          height: 15px;
          border: 2px solid #ffffff80;
          border-top-color: white;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .message {
          margin-top: 18px;
          padding: 12px;
          border-radius: 10px;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .error-message { background: #fff0f0; color: #b42318; }
        .success-message { background: #ecfdf3; color: #067647; }

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
          border-color: var(--brand);
          background: #f5f4ff;
          color: var(--brand);
        }

        .empty-preview {
          display: flex;
          min-height: 350px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 28px;
          border: 1px dashed #d8d9e7;
          border-radius: 16px;
          background: #fafaff;
          text-align: center;
        }

        .empty-icon {
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: #f0efff;
          color: var(--brand);
          font-size: 28px;
        }

        .empty-preview h2 { margin: 18px 0 8px; font-size: 18px; }
        .empty-preview p { max-width: 280px; color: var(--muted); font-size: 12px; line-height: 1.8; }

        .result-panel { min-width: 0; }
        .result-heading { align-items: flex-start; margin-bottom: 18px; }
        .result-editor {
          display: block;
          width: 100%;
          min-height: 430px;
          padding: 17px;
          resize: vertical;
          border: 1px solid #dfe2eb;
          border-radius: 12px;
          background: white;
          color: var(--ink);
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 1.9;
          overflow-wrap: anywhere;
          white-space: pre-wrap;
        }

        .resume-sheet {
          max-width: 800px;
          min-height: 780px;
          margin: auto;
          padding: clamp(24px, 4vw, 48px);
          border: 1px solid #e5e7eb;
          background: white;
          color: #202938;
          box-shadow: 0 10px 32px #1720330c;
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
        .generated-resume { margin-top: 20px; }
        .resume-result-editor { min-height: 600px; border: 0; padding: 0; box-shadow: none; border-radius: 0; }

        .theme-classic .resume-header { border-bottom: 3px double #344054; }
        .theme-classic .resume-title { color: #344054; }
        .theme-minimal { box-shadow: none; }
        .theme-minimal .resume-header { border-bottom: 1px solid #e5e7eb; }
        .theme-minimal .resume-title { color: #52525b; }

        .footer {
          max-width: 1500px;
          margin: 28px auto 0;
          color: var(--muted);
          font-size: 11px;
        }

        @media (max-width: 1100px) {
          .service-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .workspace { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .service-grid { grid-template-columns: 1fr; }
          .service-card { min-height: 180px; padding: 19px; }
          .form-grid { grid-template-columns: 1fr; }
          .wide-field { grid-column: auto; }
          .intro h1 { letter-spacing: -1px; }
          .hub-heading { align-items: flex-start; }
          .footer { flex-direction: column; align-items: flex-start; }
          .resume-sheet { min-height: 500px; padding: 22px 17px; }
          .section-heading { flex-wrap: wrap; }
        }

        @media print {
          @page { size: A4; margin: 14mm; }

          :global(body) { background: white !important; }

          .career-app {
            padding: 0 !important;
            background: white !important;
          }

          .no-print { display: none !important; }

          .workspace { display: block !important; margin: 0 !important; }
          .editor-card { display: none !important; }

          .preview-area {
            padding: 0 !important;
            border: 0 !important;
            box-shadow: none !important;
          }

          .result-panel { display: block !important; }

          .result-editor {
            min-height: 0 !important;
            height: auto !important;
            overflow: visible !important;
            padding: 0 !important;
            border: 0 !important;
            box-shadow: none !important;
            resize: none !important;
            color: black !important;
            background: white !important;
            white-space: pre-wrap !important;
          }

          .resume-sheet {
            max-width: none !important;
            min-height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            border: 0 !important;
            box-shadow: none !important;
          }

          .resume-header, .resume-title {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </main>
  );
}

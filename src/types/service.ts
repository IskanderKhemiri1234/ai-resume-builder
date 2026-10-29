export const SERVICE_API_TYPES = {
  resume: 'resume',
  cover: 'cover_letter',
  linkedin: 'linkedin_profile',
  interview: 'interview_prep',
  career: 'career_guidance',
  job_application: 'job_application',
  professional_bio: 'professional_bio',
  email: 'professional_email',
  automation: 'automation',
  content_repurposing: 'content_repurposing',
  prompt_engineering: 'prompt_engineering',
  bi_dashboard: 'bi_dashboard',
  geo: 'geo',
  sales_funnel: 'sales_funnel',
  crm_setup: 'crm_setup',
  notion_pkm: 'notion_pkm',
} as const;

export type Service = keyof typeof SERVICE_API_TYPES;

export type ServiceApiType =
  (typeof SERVICE_API_TYPES)[Service];

export interface ServiceDefinition {
  id: Service;
  type: ServiceApiType;
  name: string;
  englishName: string;
  description: string;
  icon: string;
}

export const SERVICES: readonly ServiceDefinition[] = [
  
  {
    id: 'resume',
    type: SERVICE_API_TYPES.resume,
    name: 'السيرة الذاتية الاحترافية',
    englishName: 'Resume / CV',
    description: 'أنشئ سيرة ذاتية احترافية وطوّرها.',
    icon: 'file-text',
  },
  {
    id: 'cover',
    type: SERVICE_API_TYPES.cover,
    name: 'رسالة التغطية',
    englishName: 'Cover Letter',
    description: 'اكتب رسالة مخصصة للتقدم إلى وظيفة.',
    icon: 'mail',
  },
  {
    id: 'linkedin',
    type: SERVICE_API_TYPES.linkedin,
    name: 'ملف LinkedIn',
    englishName: 'LinkedIn Profile',
    description: 'حسّن العنوان والنبذة والملف المهني.',
    icon: 'linkedin',
  },
  {
    id: 'interview',
    type: SERVICE_API_TYPES.interview,
    name: 'التحضير للمقابلات',
    englishName: 'Interview Prep',
    description: 'تدرّب على الأسئلة وأعد إجابات قوية.',
    icon: 'message-circle',
  },
  {
    id: 'career',
    type: SERVICE_API_TYPES.career,
    name: 'التوجيه المهني',
    englishName: 'Career Guidance',
    description: 'ضع خطة عملية لتطوير مسارك المهني.',
    icon: 'compass',
  },
  {
    id: 'job_application',
    type: SERVICE_API_TYPES.job_application,
    name: 'طلب التوظيف',
    englishName: 'Job Application',
    description: 'جهّز طلب توظيف ورسالة مخصصة.',
    icon: 'briefcase',
  },
  {
    id: 'professional_bio',
    type: SERVICE_API_TYPES.professional_bio,
    name: 'التعريف المهني',
    englishName: 'Professional Bio',
    description: 'اكتب نبذة احترافية عن نفسك.',
    icon: 'user',
  },
  {
    id: 'email',
    type: SERVICE_API_TYPES.email,
    name: 'رسائل العمل',
    englishName: 'Professional Email',
    description: 'اكتب رسالة مهنية واضحة وفعالة.',
    icon: 'at-sign',
  },
  // نسختك القديمة - بقيت كما هي حرفيا
  {
    id: 'automation',
    type: SERVICE_API_TYPES.automation,
    name: 'أتمتة العمليات والربط الذكي',
    englishName: 'AI Automation',
    description:
      'أنشئ سير عمل ذكيًا واربط التطبيقات والمهام المتكررة.',
    icon: 'workflow',
  },
  {
    id: 'content_repurposing',
    type: SERVICE_API_TYPES.content_repurposing,
    name: 'إعادة تدوير المحتوى الرقمي',
    englishName: 'Content Repurposing',
    description:
      'حوّل المحتوى إلى منشورات ومقاطع قصيرة ورسائل ونشرات.',
    icon: 'clapperboard',
  },
  {
    id: 'prompt_engineering',
    type: SERVICE_API_TYPES.prompt_engineering,
    name: 'هندسة الأوامر المخصصة',
    englishName: 'Prompt Engineering',
    description:
      'صمّم أوامر دقيقة وقابلة لإعادة الاستخدام مع أمثلة توضيحية.',
    icon: 'terminal',
  },
  {
    id: 'bi_dashboard',
    type: SERVICE_API_TYPES.bi_dashboard,
    name: 'لوحات البيانات والتحليلات',
    englishName: 'BI & Dashboards',
    description:
      'حلّل البيانات وحدد مؤشرات الأداء والرسوم المناسبة.',
    icon: 'chart-no-axes-combined',
  },
  {
    id: 'geo',
    type: SERVICE_API_TYPES.geo,
    name: 'تحسين الظهور في محركات البحث الذكية',
    englishName: 'GEO',
    description:
      'حسّن بنية المحتوى ووضوحه لمحركات الإجابة المدعومة بالذكاء الاصطناعي.',
    icon: 'search-check',
  },
  {
    id: 'sales_funnel',
    type: SERVICE_API_TYPES.sales_funnel,
    name: 'كتابة واستراتيجية قمع المبيعات',
    englishName: 'Sales Funnel',
    description:
      'صمّم رحلة العميل وصفحات الهبوط ورسائل المتابعة.',
    icon: 'funnel',
  },
  {
    id: 'crm_setup',
    type: SERVICE_API_TYPES.crm_setup,
    name: 'إدارة علاقات العملاء والأتمتة',
    englishName: 'CRM Setup',
    description:
      'نظّم بيانات العملاء والصفقات ومراحل المتابعة والأتمتة.',
    icon: 'users',
  },
  {
    id: 'notion_pkm',
    type: SERVICE_API_TYPES.notion_pkm,
    name: 'تصميم قوالب ومساحات العمل',
    englishName: '【entity-Notion¦canonical_name=Notion】 & PKM',
    description:
      'أنشئ هيكلًا لإدارة المشاريع والمهام والمعرفة والملاحظات.',
    icon: 'layout-dashboard',
  },
] as const;

export function isService(value: unknown): value is Service {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(
      SERVICE_API_TYPES,
      value,
    )
  );
}

export function getService(
  id: Service,
): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.id === id);
}

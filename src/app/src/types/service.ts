export const SERVICE_API_TYPES = {
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
    englishName: 'Notion & PKM',
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

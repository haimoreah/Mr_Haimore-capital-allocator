import type { BucketKey, RiskProfile } from './allocationRules'

export const copy = {
  appTitle: 'موزّع رأس المال',
  appSubtitle:
    'أداة تعليمية تساعدك على تقسيم رأس مالك قبل الدخول إلى السوق، بعيدًا عن التداول العاطفي.',

  capitalLabel: 'إجمالي رأس المال المتاح',
  capitalPlaceholder: 'مثال: 10000',
  capitalCurrencyHint: 'أدخل المبلغ بعملتك المفضّلة (دون كتابة رمز العملة)',

  riskProfileLabel: 'أسلوبك في إدارة رأس المال',
  submit: 'احسب التوزيع',

  resultsTitle: 'التوزيع المقترح',
  amountOf: (percentage: number) => `${percentage}٪ من رأس المال`,

  disclaimerTitle: 'تنويه مهم',
  disclaimer:
    'هذه الأداة تعليمية بحتة، ولا تُعد توصية استثمارية أو تنبؤًا بالسوق أو إشارة تداول. الهدف هو تعليم مبادئ إدارة رأس المال فقط. اتخذ قراراتك الاستثمارية بعد بحث مستقل أو استشارة مختص مرخّص.',

  footerOpenSource: 'أداة مفتوحة المصدر ضمن مجموعة أدوات Mr Haimore',

  validation: {
    required: 'الرجاء إدخال مبلغ رأس المال',
    positive: 'يجب أن يكون المبلغ رقمًا أكبر من صفر',
  },
} as const

export const riskProfileCopy: Record<
  RiskProfile,
  { label: string; description: string }
> = {
  conservative: {
    label: 'حذِر',
    description: 'أولوية للسيولة والأمان، مناسب للمبتدئين',
  },
  balanced: {
    label: 'متوازن',
    description: 'توزيع متوسط بين الدخول والاحتياط',
  },
  growth: {
    label: 'نمو',
    description: 'دخول أكبر في السوق مع الاحتفاظ باحتياط أساسي',
  },
}

export const bucketCopy: Record<
  BucketKey,
  { label: string; description: string }
> = {
  firstEntry: {
    label: 'الدخول الأول للسوق',
    description: 'الجزء الذي تستخدمه لأول عملية شراء، دون استثمار كل رأس المال دفعة واحدة.',
  },
  futureOpportunities: {
    label: 'فرص الشراء المستقبلية',
    description: 'مبلغ محجوز لاستغلال فرص لاحقة أو تعزيز مراكزك عند الحاجة.',
  },
  liquidity: {
    label: 'السيولة المتاحة',
    description: 'مبلغ نقدي جاهز للاستخدام المرن دون المساس بخطتك الاستثمارية.',
  },
  emergencyReserve: {
    label: 'الاحتياطي الطارئ',
    description: 'مبلغ لا يُستخدم في السوق، مخصص للظروف الطارئة خارج الاستثمار.',
  },
}

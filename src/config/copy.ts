import type { BucketKey, RiskProfile } from './allocationRules'

export const PERSONAL_PAGE_URL = 'https://www.instagram.com/mr_haimore/'
export const SUPPORT_URL = 'https://t.me/AmwalSupport'

export const copy = {
  appTitle: 'توزيع رأس المال',
  appSubtitle: 'قسّم رأس مالك حسب أسلوبك في الاستثمار.',

  capitalLabel: 'كم رأس مالك؟',
  capitalPlaceholder: 'مثال: 10000',
  capitalCurrencyHint: 'أدخل المبلغ الذي تريد توزيعه.',

  riskProfileLabel: 'اختر أسلوبك',
  submit: 'احسب التوزيع',

  resultsTitle: 'التوزيع المقترح',

  disclaimerTitle: 'تنويه',
  disclaimer:
    'هذه الأداة تعليمية، وتهدف إلى مساعدتك على تنظيم رأس المال، ولا تعتبر توصية استثمارية أو ضمانًا لتحقيق الأرباح.',

  validation: {
    required: 'أدخل مبلغًا صحيحًا أولًا.',
  },

  howItWorksTitle: 'كيف تعمل الأداة؟',
  howItWorksSteps: [
    {
      title: 'أدخل رأس مالك',
      description: 'اكتب المبلغ الكلي اللي بدك تستثمره — بأي عملة.',
    },
    {
      title: 'اختر أسلوبك',
      description: 'دفاعي، متوسط، أو هجومي — حسب راحتك بالمخاطرة.',
    },
    {
      title: 'شوف التوزيع',
      description: 'بنقسم المبلغ فورًا على أربع فئات واضحة وجاهزة للتنفيذ.',
    },
  ],

  whyAllocateTitle: 'شو الفائدة من توزيع رأس المال؟',
  whyAllocateSteps: [
    {
      title: 'تتجنب القرار العاطفي',
      description: 'ما بتدخل كل مبلغك دفعة وحدة بدافع الحماس أو الخوف من فوات الفرصة.',
    },
    {
      title: 'تستغل الفرص الجاية',
      description: 'بيضل عندك مبلغ جاهز تعزّز فيه مركزك لو السوق نزل وصارت الأسعار أرخص.',
    },
    {
      title: 'راحة بال وسيولة جاهزة',
      description: 'بتعرف مسبقًا وين رايح كل درهم، وبيضل عندك احتياطي خارج السوق لأي طارئ.',
    },
  ],

  supportTitle: 'تواصل مع فريق الدعم للإجابة على جميع استفساراتك',
  supportButton: 'تواصل معنا على تيليجرام',
} as const

export const riskProfileCopy: Record<
  RiskProfile,
  { label: string; bullets: readonly string[] }
> = {
  defensive: {
    label: 'دفاعي',
    bullets: [
      'سيولة أكبر للتعزيز إذا نزل السوق.',
      'استفادة أقل إذا استمر السوق بالصعود.',
      'مناسب للأسواق الهابطة.',
    ],
  },
  balanced: {
    label: 'متوسط',
    bullets: [
      'توازن بين الدخول والتعزيز.',
      'استفادة متوازنة من الصعود.',
      'مناسب لمعظم المستثمرين.',
    ],
  },
  aggressive: {
    label: 'هجومي',
    bullets: [
      'دخول أكبر من البداية.',
      'استفادة أكبر إذا استمر السوق بالصعود.',
      'سيولة أقل للتعزيز.',
    ],
  },
}

export const bucketCopy: Record<
  BucketKey,
  { label: string; description: string }
> = {
  firstEntry: {
    label: 'الدخول الأول',
    description: 'المبلغ الذي تدخل به السوق في أول صفقة.',
  },
  firstReinforcement: {
    label: 'التعزيز الأول',
    description: 'مبلغ محجوز لتعزيز مركزك عند أول فرصة.',
  },
  secondReinforcement: {
    label: 'التعزيز الثاني',
    description: 'مبلغ لتعزيز إضافي إذا استمر السوق بالنزول.',
  },
  reserveLiquidity: {
    label: 'السيولة الاحتياطية',
    description:
      'مبلغ تحتفظ به إذا استمر السوق بالنزول بعد تنفيذ الدخولات الثلاث.',
  },
}

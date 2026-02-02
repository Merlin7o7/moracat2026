/**
 * Moracat Translations - English & Arabic
 */

export type Language = 'en' | 'ar';

export const translations = {
  // Common
  common: {
    moracat: { en: 'Moracat', ar: 'مرقط' },
    joinWaitlist: { en: 'Join Waitlist', ar: 'انضم للقائمة' },
    startNow: { en: 'Start Now', ar: 'ابدأ الآن' },
    learnMore: { en: 'Learn More', ar: 'اعرف المزيد' },
    subscribe: { en: 'Subscribe', ar: 'اشترك' },
    submit: { en: 'Submit', ar: 'إرسال' },
    next: { en: 'Next', ar: 'التالي' },
    back: { en: 'Back', ar: 'رجوع' },
    continue: { en: 'Continue', ar: 'متابعة' },
    close: { en: 'Close', ar: 'إغلاق' },
    login: { en: 'Login', ar: 'تسجيل الدخول' },
    register: { en: 'Register', ar: 'إنشاء حساب' },
    email: { en: 'Email', ar: 'البريد الإلكتروني' },
    password: { en: 'Password', ar: 'كلمة المرور' },
    name: { en: 'Name', ar: 'الاسم' },
    phone: { en: 'Phone', ar: 'الهاتف' },
    perMonth: { en: '/month', ar: '/شهر' },
    sar: { en: 'SAR', ar: 'ر.س' },
    monthly: { en: 'Monthly', ar: 'شهري' },
    yearly: { en: 'Yearly', ar: 'سنوي' },
    save: { en: 'Save', ar: 'وفر' },
    popular: { en: 'Popular', ar: 'الأكثر شعبية' },
  },

  // Navigation
  nav: {
    howItWorks: { en: 'How it Works', ar: 'كيف يعمل' },
    products: { en: 'Products', ar: 'المنتجات' },
    subscription: { en: 'Subscription', ar: 'الاشتراك' },
    about: { en: 'About', ar: 'عن مرقط' },
    faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    builder: { en: 'Build Package', ar: 'بناء الباقة' },
  },

  // Hero Section
  hero: {
    badge: { en: 'Premium Cat Food Subscription', ar: 'اشتراك طعام قطط فاخر' },
    title1: { en: 'Premium Nutrition', ar: 'تغذية فاخرة' },
    title2: { en: 'for Your', ar: 'لقططك' },
    title3: { en: 'Feline Royalty', ar: 'الملكية' },
    subtitle: {
      en: 'Deliver gourmet, vet-approved meals to your doorstep. Because your cat deserves nothing but the best.',
      ar: 'توصيل وجبات فاخرة معتمدة من الأطباء البيطريين إلى باب منزلك. لأن قطتك تستحق الأفضل فقط.'
    },
    stat1Label: { en: 'Happy Cats', ar: 'قطط سعيدة' },
    stat2Label: { en: 'Cities Covered', ar: 'مدن مغطاة' },
    stat3Label: { en: 'Vet Approved', ar: 'معتمد بيطرياً' },
  },

  // How It Works
  howItWorks: {
    badge: { en: 'Simple Process', ar: 'عملية بسيطة' },
    title: { en: 'How Moracat Works', ar: 'كيف يعمل مرقط' },
    subtitle: {
      en: 'Getting premium cat food delivered has never been easier',
      ar: 'لم يكن الحصول على طعام القطط الفاخر أسهل من قبل'
    },
    step1Title: { en: 'Choose Your Plan', ar: 'اختر خطتك' },
    step1Desc: {
      en: 'Select from our curated subscription plans designed for different cat needs and preferences.',
      ar: 'اختر من خطط الاشتراك المصممة لاحتياجات وتفضيلات القطط المختلفة.'
    },
    step2Title: { en: 'Customize Box', ar: 'خصص صندوقك' },
    step2Desc: {
      en: 'Tell us about your cat and we\'ll personalize each box with the perfect mix of food and treats.',
      ar: 'أخبرنا عن قطتك وسنخصص كل صندوق بالمزيج المثالي من الطعام والحلوى.'
    },
    step3Title: { en: 'Doorstep Delivery', ar: 'التوصيل للباب' },
    step3Desc: {
      en: 'Receive your monthly box of premium cat essentials delivered right to your doorstep.',
      ar: 'استلم صندوقك الشهري من مستلزمات القطط الفاخرة مباشرة إلى باب منزلك.'
    },
    step4Title: { en: 'Happy Cat', ar: 'قطة سعيدة' },
    step4Desc: {
      en: 'Watch your feline friend enjoy gourmet meals and treats while staying healthy and happy.',
      ar: 'شاهد صديقك القط يستمتع بالوجبات والحلوى الفاخرة مع البقاء بصحة وسعادة.'
    },
  },

  // Products
  products: {
    badge: { en: 'Our Products', ar: 'منتجاتنا' },
    title: { en: 'Premium Cat Essentials', ar: 'مستلزمات القطط الفاخرة' },
    subtitle: {
      en: 'Carefully selected products that your cat will love',
      ar: 'منتجات مختارة بعناية سيحبها قطك'
    },
    wetFood: { en: 'Wet Food', ar: 'طعام رطب' },
    wetFoodDesc: { en: 'Premium gourmet wet food with real meat', ar: 'طعام رطب فاخر مع لحوم حقيقية' },
    dryFood: { en: 'Dry Food', ar: 'طعام جاف' },
    dryFoodDesc: { en: 'Nutritious kibble for balanced diet', ar: 'طعام جاف مغذي لنظام غذائي متوازن' },
    treats: { en: 'Treats', ar: 'حلوى' },
    treatsDesc: { en: 'Delicious rewards for your cat', ar: 'مكافآت لذيذة لقطتك' },
    litter: { en: 'Premium Litter', ar: 'رمل فاخر' },
    litterDesc: { en: 'High-quality odor-control litter', ar: 'رمل عالي الجودة للتحكم بالرائحة' },
    toys: { en: 'Interactive Toys', ar: 'ألعاب تفاعلية' },
    toysDesc: { en: 'Fun toys to keep your cat active', ar: 'ألعاب ممتعة لإبقاء قطتك نشيطة' },
    grooming: { en: 'Grooming', ar: 'العناية' },
    groomingDesc: { en: 'Care products for a healthy coat', ar: 'منتجات عناية لفراء صحي' },
  },

  // Subscription Plans
  subscription: {
    badge: { en: 'Pricing Plans', ar: 'خطط الأسعار' },
    title: { en: 'Choose Your Plan', ar: 'اختر خطتك' },
    subtitle: {
      en: 'Flexible subscription plans to suit every cat owner',
      ar: 'خطط اشتراك مرنة تناسب كل مالك قطط'
    },
    basic: { en: 'Basic', ar: 'أساسي' },
    basicDesc: { en: 'Essential nutrition for your cat', ar: 'تغذية أساسية لقطتك' },
    premium: { en: 'Premium', ar: 'متميز' },
    premiumDesc: { en: 'Quality nutrition with treats', ar: 'تغذية عالية الجودة مع الحلوى' },
    luxury: { en: 'Luxury', ar: 'فاخر' },
    luxuryDesc: { en: 'Premium experience with toys & treats', ar: 'تجربة فاخرة مع الألعاب والحلوى' },
    ultimate: { en: 'Ultimate', ar: 'الأفضل' },
    ultimateDesc: { en: 'The complete royal treatment', ar: 'المعاملة الملكية الكاملة' },
    choosePlan: { en: 'Choose Plan', ar: 'اختر الخطة' },
    includes: { en: 'Includes:', ar: 'يشمل:' },
    wetCans: { en: 'wet food cans', ar: 'علب طعام رطب' },
    dryKg: { en: 'kg dry food', ar: 'كجم طعام جاف' },
    litterL: { en: 'L litter', ar: 'لتر رمل' },
    treatPacks: { en: 'treat packs', ar: 'عبوات حلوى' },
    toyItems: { en: 'toys', ar: 'ألعاب' },
    groomingItems: { en: 'grooming items', ar: 'أدوات عناية' },
  },

  // Custom Builder
  builder: {
    badge: { en: 'Custom Builder', ar: 'البناء المخصص' },
    title: { en: 'Build Your Perfect Package', ar: 'ابنِ باقتك المثالية' },
    subtitle: {
      en: 'Customize every detail of your cat\'s subscription box',
      ar: 'خصص كل تفاصيل صندوق اشتراك قطتك'
    },
    step1: { en: 'Your Cat', ar: 'قطتك' },
    step2: { en: 'Package', ar: 'الباقة' },
    step3: { en: 'Add-ons', ar: 'الإضافات' },
    step4: { en: 'Duration', ar: 'المدة' },
    catTypeTitle: { en: 'Tell us about your cat(s)', ar: 'أخبرنا عن قطتك (قططك)' },
    catTypeSubtitle: { en: 'Select the option that best describes your household', ar: 'اختر الخيار الذي يصف منزلك بشكل أفضل' },
    tierTitle: { en: 'Choose your package tier', ar: 'اختر مستوى باقتك' },
    tierSubtitle: { en: 'Each tier includes more goodies for your furry friend', ar: 'كل مستوى يشمل المزيد من الأشياء الجيدة لصديقك الفروي' },
    addOnsTitle: { en: 'Customize with add-ons', ar: 'خصص مع الإضافات' },
    addOnsSubtitle: { en: 'Add extra items to your monthly box (optional)', ar: 'أضف عناصر إضافية لصندوقك الشهري (اختياري)' },
    durationTitle: { en: 'Choose subscription duration', ar: 'اختر مدة الاشتراك' },
    durationSubtitle: { en: 'Longer commitments save you more!', ar: 'الالتزام لمدة أطول يوفر لك أكثر!' },
    yourPackage: { en: 'Your Package', ar: 'باقتك' },
    whatsIncluded: { en: "What's Included", ar: 'ماذا يشمل' },
    monthlyPrice: { en: 'Monthly Price', ar: 'السعر الشهري' },
    durationDiscount: { en: 'Duration Discount', ar: 'خصم المدة' },
    total: { en: 'Total', ar: 'المجموع' },
  },

  // About
  about: {
    badge: { en: 'Our Story', ar: 'قصتنا' },
    title: { en: 'Why Moracat?', ar: 'لماذا مرقط؟' },
    subtitle: {
      en: 'We\'re passionate cat lovers dedicated to providing the best nutrition for your feline companions',
      ar: 'نحن محبون متحمسون للقطط ملتزمون بتقديم أفضل تغذية لرفاقك من القطط'
    },
    mission: { en: 'Our Mission', ar: 'مهمتنا' },
    missionText: {
      en: 'To revolutionize cat care in Saudi Arabia by delivering premium, vet-approved nutrition directly to cat owners.',
      ar: 'إحداث ثورة في رعاية القطط في المملكة العربية السعودية من خلال توصيل تغذية فاخرة ومعتمدة من الأطباء البيطريين مباشرة لأصحاب القطط.'
    },
    feature1: { en: 'Vet Approved', ar: 'معتمد بيطرياً' },
    feature1Desc: { en: 'All products reviewed by veterinary experts', ar: 'جميع المنتجات مراجعة من خبراء بيطريين' },
    feature2: { en: 'Premium Quality', ar: 'جودة فاخرة' },
    feature2Desc: { en: 'Only the finest ingredients for your cat', ar: 'أجود المكونات فقط لقطتك' },
    feature3: { en: 'Free Delivery', ar: 'توصيل مجاني' },
    feature3Desc: { en: 'Fast, free shipping across Saudi Arabia', ar: 'شحن سريع ومجاني في جميع أنحاء المملكة' },
    feature4: { en: 'Flexible Plans', ar: 'خطط مرنة' },
    feature4Desc: { en: 'Pause, skip, or cancel anytime', ar: 'أوقف أو تخطى أو ألغِ في أي وقت' },
  },

  // FAQ
  faq: {
    badge: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    title: { en: 'Frequently Asked Questions', ar: 'الأسئلة المتكررة' },
    subtitle: {
      en: 'Everything you need to know about Moracat',
      ar: 'كل ما تحتاج معرفته عن مرقط'
    },
    q1: { en: 'How does the subscription work?', ar: 'كيف يعمل الاشتراك؟' },
    a1: {
      en: 'Choose your plan, customize your box based on your cat\'s needs, and we\'ll deliver premium cat food and supplies to your door every month.',
      ar: 'اختر خطتك، خصص صندوقك بناءً على احتياجات قطتك، وسنوصل طعام ومستلزمات القطط الفاخرة إلى بابك كل شهر.'
    },
    q2: { en: 'Can I change my subscription?', ar: 'هل يمكنني تغيير اشتراكي؟' },
    a2: {
      en: 'Yes! You can upgrade, downgrade, pause, or cancel your subscription at any time through your account dashboard.',
      ar: 'نعم! يمكنك ترقية أو تخفيض أو إيقاف أو إلغاء اشتراكك في أي وقت من خلال لوحة تحكم حسابك.'
    },
    q3: { en: 'What areas do you deliver to?', ar: 'ما هي المناطق التي توصلون إليها؟' },
    a3: {
      en: 'We currently deliver to all major cities in Saudi Arabia including Riyadh, Jeddah, Dammam, and more. Check availability in your area.',
      ar: 'نقوم حالياً بالتوصيل إلى جميع المدن الرئيسية في المملكة العربية السعودية بما في ذلك الرياض وجدة والدمام والمزيد. تحقق من التوفر في منطقتك.'
    },
    q4: { en: 'Are the products vet-approved?', ar: 'هل المنتجات معتمدة بيطرياً؟' },
    a4: {
      en: 'Yes, all our products are reviewed and approved by veterinary nutritionists to ensure they meet the highest standards for cat health.',
      ar: 'نعم، جميع منتجاتنا مراجعة ومعتمدة من أخصائيي التغذية البيطريين لضمان تلبيتها لأعلى معايير صحة القطط.'
    },
    q5: { en: 'What if my cat doesn\'t like the food?', ar: 'ماذا لو لم يحب قطي الطعام؟' },
    a5: {
      en: 'We offer a satisfaction guarantee. If your cat doesn\'t love their food, contact us and we\'ll work with you to find the perfect match.',
      ar: 'نقدم ضمان الرضا. إذا لم يحب قطك طعامه، تواصل معنا وسنعمل معك لإيجاد الخيار المثالي.'
    },
  },

  // Waitlist Form
  waitlist: {
    badge: { en: 'Coming Soon', ar: 'قريباً' },
    title: { en: 'Join the Waitlist', ar: 'انضم لقائمة الانتظار' },
    subtitle: {
      en: 'Be the first to know when we launch and get exclusive early-bird offers',
      ar: 'كن أول من يعرف عند إطلاقنا واحصل على عروض حصرية للمنضمين مبكراً'
    },
    namePlaceholder: { en: 'Your Name', ar: 'اسمك' },
    emailPlaceholder: { en: 'your@email.com', ar: 'بريدك@الإلكتروني.com' },
    phonePlaceholder: { en: '+966 5X XXX XXXX', ar: '+966 5X XXX XXXX' },
    catsLabel: { en: 'Number of Cats', ar: 'عدد القطط' },
    selectCats: { en: 'Select number of cats', ar: 'اختر عدد القطط' },
    success: { en: 'You\'re on the list! We\'ll be in touch soon.', ar: 'أنت في القائمة! سنتواصل معك قريباً.' },
    error: { en: 'Something went wrong. Please try again.', ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.' },
    alreadyRegistered: { en: 'This email is already registered!', ar: 'هذا البريد الإلكتروني مسجل مسبقاً!' },
  },

  // Footer
  footer: {
    description: {
      en: 'Premium cat food subscription service, delivering gourmet nutrition to your feline royalty across Saudi Arabia.',
      ar: 'خدمة اشتراك طعام القطط الفاخرة، نوصل التغذية الفاخرة لقططك الملكية في جميع أنحاء المملكة العربية السعودية.'
    },
    newsletter: { en: 'Subscribe to our newsletter', ar: 'اشترك في نشرتنا الإخبارية' },
    newsletterPlaceholder: { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
    company: { en: 'Company', ar: 'الشركة' },
    aboutUs: { en: 'About Us', ar: 'عن مرقط' },
    howItWorksLink: { en: 'How It Works', ar: 'كيف يعمل' },
    ourProducts: { en: 'Our Products', ar: 'منتجاتنا' },
    careers: { en: 'Careers', ar: 'الوظائف' },
    support: { en: 'Support', ar: 'الدعم' },
    contactUs: { en: 'Contact Us', ar: 'تواصل معنا' },
    shippingInfo: { en: 'Shipping Info', ar: 'معلومات الشحن' },
    returns: { en: 'Returns', ar: 'الإرجاع' },
    contact: { en: 'Contact', ar: 'التواصل' },
    copyright: { en: 'All rights reserved. Made with', ar: 'جميع الحقوق محفوظة. صنع بـ' },
    inSaudi: { en: 'in Saudi Arabia', ar: 'في المملكة العربية السعودية' },
    privacyPolicy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    termsOfService: { en: 'Terms of Service', ar: 'شروط الخدمة' },
    cookiePolicy: { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
  },

  // Auth
  auth: {
    loginTitle: { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    loginSubtitle: { en: 'Sign in to your account', ar: 'سجل الدخول إلى حسابك' },
    registerTitle: { en: 'Create Account', ar: 'إنشاء حساب' },
    registerSubtitle: { en: 'Join the Moracat family today', ar: 'انضم لعائلة مرقط اليوم' },
    orContinueWith: { en: 'Or continue with', ar: 'أو تابع باستخدام' },
    orRegisterWith: { en: 'Or register with email', ar: 'أو سجل بالبريد الإلكتروني' },
    noAccount: { en: "Don't have an account?", ar: 'ليس لديك حساب؟' },
    haveAccount: { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
    signInWithGoogle: { en: 'Sign in with Google', ar: 'تسجيل الدخول بحساب Google' },
    signUpWithGoogle: { en: 'Sign up with Google', ar: 'التسجيل بحساب Google' },
    forgotPassword: { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
  },

  // Start Now Page
  startNow: {
    title: { en: 'Start Your Journey', ar: 'ابدأ رحلتك' },
    subtitle: {
      en: 'Choose how you want to get started with Moracat',
      ar: 'اختر كيف تريد البدء مع مرقط'
    },
    option1Title: { en: 'Quick Start', ar: 'بداية سريعة' },
    option1Desc: {
      en: 'Choose a pre-built subscription plan and customize later',
      ar: 'اختر خطة اشتراك جاهزة وخصصها لاحقاً'
    },
    option2Title: { en: 'Custom Build', ar: 'بناء مخصص' },
    option2Desc: {
      en: 'Build your perfect package from scratch',
      ar: 'ابنِ باقتك المثالية من الصفر'
    },
    option3Title: { en: 'Talk to Us', ar: 'تحدث معنا' },
    option3Desc: {
      en: 'Need help? Our team can guide you',
      ar: 'تحتاج مساعدة؟ فريقنا يمكنه إرشادك'
    },
  },
} as const;

export type TranslationKey = keyof typeof translations;

/**
 * Get translation for a key
 */
export function t(
  section: TranslationKey,
  key: string,
  lang: Language
): string {
  const sectionTranslations = translations[section] as Record<string, { en: string; ar: string }>;
  const translation = sectionTranslations?.[key];
  return translation?.[lang] || key;
}

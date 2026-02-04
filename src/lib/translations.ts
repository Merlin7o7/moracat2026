/**
 * Moracat Translations - English & Arabic
 * Brand Voice: Clean, friendly, professional, confident but not salesy
 */

export type Language = 'en' | 'ar';

export const translations = {
  // Common UI Elements
  common: {
    moracat: { en: 'Moracat', ar: 'مرقط' },
    joinWaitlist: { en: 'Reserve My Spot — 20% Off First Order', ar: 'احجز مكاني — خصم 20% على الطلب الأول' },
    calculatePlan: { en: 'Calculate My Plan', ar: 'احسب خطتي' },
    learnMore: { en: 'Learn More', ar: 'اعرف المزيد' },
    subscribe: { en: 'Subscribe', ar: 'اشترك' },
    submit: { en: 'Submit', ar: 'إرسال' },
    next: { en: 'Next', ar: 'التالي' },
    back: { en: 'Back', ar: 'رجوع' },
    continue: { en: 'Continue', ar: 'متابعة' },
    close: { en: 'Close', ar: 'إغلاق' },
    login: { en: 'Sign In', ar: 'تسجيل الدخول' },
    email: { en: 'Email', ar: 'البريد الإلكتروني' },
    password: { en: 'Password', ar: 'كلمة المرور' },
    name: { en: 'Name', ar: 'الاسم' },
    phone: { en: 'Phone', ar: 'رقم الجوال' },
    perMonth: { en: '/month', ar: '/شهرياً' },
    sar: { en: 'SAR', ar: 'ر.س' },
    monthly: { en: 'Monthly', ar: 'شهري' },
    yearly: { en: 'Yearly', ar: 'سنوي' },
    save: { en: 'Save', ar: 'وفّر' },
    popular: { en: 'Recommended', ar: 'موصى به' },
    comingSoon: { en: 'Coming Soon', ar: 'قريباً' },
    launchingSoon: { en: 'Launching Soon', ar: 'الإطلاق قريباً' },
    saveAndJoin: { en: 'Save Plan & Join Waitlist', ar: 'احفظ الخطة وانضم للقائمة' },
    register: { en: 'Create Account', ar: 'إنشاء حساب' },
    startNow: { en: 'Get Started', ar: 'ابدأ الآن' },
  },

  // Navigation
  nav: {
    howItWorks: { en: 'How It Works', ar: 'كيف نعمل' },
    products: { en: 'What We Deliver', ar: 'ماذا نوصّل' },
    subscription: { en: 'Plans', ar: 'الباقات' },
    calculator: { en: 'Calculator', ar: 'احسب خطتك' },
    vetSupport: { en: 'Vet Support', ar: 'دعم بيطري' },
    about: { en: 'About', ar: 'عن مرقط' },
    faq: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
  },

  // Hero Section - Pre-launch focused
  hero: {
    badge: { en: 'Saudi Arabia\'s First Cat Food Subscription', ar: 'أول اشتراك طعام قطط في السعودية' },
    title1: { en: 'Your Cat\'s Nutrition,', ar: 'تغذية قطتك،' },
    title2: { en: 'Delivered', ar: 'توصَل' },
    title3: { en: 'Monthly', ar: 'شهرياً' },
    subtitle: {
      en: 'Premium cat food from trusted brands — personalized, vet-approved, and delivered monthly. Say goodbye to pet store runs.',
      ar: 'طعام قطط فاخر من علامات تجارية موثوقة — مخصص، معتمد بيطرياً، ويوصَل شهرياً. ودّع زيارات المحلات.'
    },
    ctaPrimary: { en: 'Join the Waitlist', ar: 'انضم لقائمة الانتظار' },
    ctaSecondary: { en: 'Calculate My Cat\'s Plan', ar: 'احسب خطة قطتي' },
    trustBadge1: { en: 'Vet-Approved Portions', ar: 'كميات معتمدة بيطرياً' },
    trustBadge2: { en: 'Free Delivery to Jeddah, Riyadh & All Major Cities', ar: 'توصيل مجاني لجدة والرياض وجميع المدن الرئيسية' },
    trustBadge3: { en: 'Cancel Anytime', ar: 'إلغاء في أي وقت' },
  },

  // How It Works - Simplified journey
  howItWorks: {
    badge: { en: 'Simple Process', ar: 'خطوات بسيطة' },
    title: { en: 'How Moracat Works', ar: 'كيف يعمل مرقط' },
    subtitle: {
      en: 'Getting your cat\'s food delivered has never been simpler',
      ar: 'الحصول على طعام قطتك لم يكن بهذه السهولة من قبل'
    },
    step1Title: { en: 'Tell Us About Your Cat', ar: 'أخبرنا عن قطتك' },
    step1Desc: {
      en: 'Share your cat\'s age, weight, and preferences. We\'ll recommend the right portions.',
      ar: 'شاركنا عمر قطتك ووزنها وتفضيلاتها. سنوصي بالكميات المناسبة.'
    },
    step2Title: { en: 'We Build Your Plan', ar: 'نبني خطتك' },
    step2Desc: {
      en: 'Our system creates a personalized monthly box with the right mix of dry and wet food.',
      ar: 'نظامنا يصمم صندوقاً شهرياً مخصصاً بالمزيج المثالي من الطعام الجاف والرطب.'
    },
    step3Title: { en: 'Delivered to Your Door', ar: 'توصيل لباب بيتك' },
    step3Desc: {
      en: 'Your monthly supply arrives on schedule. Free delivery across Saudi Arabia.',
      ar: 'تصلك كمية الشهر في موعدها. توصيل مجاني في جميع أنحاء المملكة.'
    },
    step4Title: { en: 'Happy, Healthy Cat', ar: 'قطة سعيدة وصحية' },
    step4Desc: {
      en: 'Consistent nutrition, no running out of food, and vet support when you need it.',
      ar: 'تغذية منتظمة، لا نفاد للطعام، ودعم بيطري عند الحاجة.'
    },
  },

  // Products - What we deliver
  products: {
    badge: { en: 'What\'s in Your Box', ar: 'محتويات صندوقك' },
    title: { en: 'Quality Products, Every Month', ar: 'منتجات مميزة كل شهر' },
    subtitle: {
      en: 'We partner with trusted brands to deliver nutrition your cat will love',
      ar: 'نتعاون مع علامات تجارية موثوقة لتوصيل تغذية تحبها قطتك'
    },
    wetFood: { en: 'Premium Wet Food', ar: 'طعام رطب فاخر' },
    wetFoodDesc: { en: 'Daily supplement with real meat for hydration and taste', ar: 'مكمل يومي بلحوم حقيقية للترطيب والطعم المميز' },
    dryFood: { en: 'Balanced Dry Food', ar: 'طعام جاف متوازن' },
    dryFoodDesc: { en: 'Complete nutrition as the foundation of your cat\'s diet', ar: 'تغذية كاملة كأساس لنظام قطتك الغذائي' },
    treats: { en: 'Healthy Treats', ar: 'مكافآت صحية' },
    treatsDesc: { en: 'Reward your cat with vet-approved snacks', ar: 'كافئ قطتك بوجبات خفيفة معتمدة بيطرياً' },
    litter: { en: 'Premium Litter', ar: 'رمل فاخر' },
    litterDesc: { en: 'High-quality, odor-control litter for a clean home', ar: 'رمل عالي الجودة يتحكم بالرائحة لمنزل نظيف' },
    toys: { en: 'Interactive Toys', ar: 'ألعاب تفاعلية' },
    toysDesc: { en: 'Keep your cat active and entertained', ar: 'حافظ على نشاط قطتك وترفيهها' },
    grooming: { en: 'Grooming Essentials', ar: 'أدوات العناية' },
    groomingDesc: { en: 'Care products for a healthy, shiny coat', ar: 'منتجات عناية لفراء صحي ولامع' },
  },

  // Subscription Plans
  subscription: {
    badge: { en: 'Choose Your Plan', ar: 'اختر باقتك' },
    title: { en: 'Simple, Transparent Pricing', ar: 'أسعار بسيطة وواضحة' },
    subtitle: {
      en: 'All plans include free delivery and vet support access',
      ar: 'جميع الباقات تشمل توصيل مجاني ودعم بيطري'
    },
    basic: { en: 'Essential', ar: 'الأساسية' },
    basicDesc: { en: 'Complete nutrition for your cat', ar: 'تغذية كاملة لقطتك' },
    premium: { en: 'Premium', ar: 'المتميزة' },
    premiumDesc: { en: 'Nutrition plus treats for extra joy', ar: 'تغذية مع مكافآت لسعادة أكبر' },
    luxury: { en: 'Complete', ar: 'الشاملة' },
    luxuryDesc: { en: 'Full care with toys and treats', ar: 'عناية كاملة مع ألعاب ومكافآت' },
    ultimate: { en: 'Royal', ar: 'الملكية' },
    ultimateDesc: { en: 'The complete care experience', ar: 'تجربة العناية الكاملة' },
    choosePlan: { en: 'Join Waitlist', ar: 'انضم للقائمة' },
    includes: { en: 'Includes:', ar: 'تشمل:' },
    wetCans: { en: 'wet food cans', ar: 'علب طعام رطب' },
    dryKg: { en: 'kg dry food', ar: 'كجم طعام جاف' },
    litterL: { en: 'L litter', ar: 'لتر رمل' },
    treatPacks: { en: 'treat packs', ar: 'عبوات مكافآت' },
    toyItems: { en: 'toys', ar: 'ألعاب' },
    groomingItems: { en: 'grooming items', ar: 'أدوات عناية' },
    savingsNote: { en: 'Save up to 20% vs. retail prices', ar: 'وفّر حتى 20% مقارنة بأسعار التجزئة' },
  },

  // Builder - Subscription Calculator Tool
  builder: {
    badge: { en: 'Plan Calculator', ar: 'حاسبة الخطة' },
    title: { en: 'Build Your Perfect Plan', ar: 'ابنِ خطتك المثالية' },
    subtitle: { en: 'Customize your cat\'s monthly box and see pricing in real-time', ar: 'خصص صندوق قطتك الشهري وشاهد الأسعار مباشرة' },
    step1: { en: 'Cat Type', ar: 'نوع القط' },
    step2: { en: 'Package', ar: 'الباقة' },
    step3: { en: 'Add-ons', ar: 'الإضافات' },
    step4: { en: 'Duration', ar: 'المدة' },
    catTypeTitle: { en: 'What type of cat do you have?', ar: 'ما نوع قطتك؟' },
    catTypeSubtitle: { en: 'We\'ll adjust portions based on your cat\'s needs', ar: 'سنضبط الكميات بناءً على احتياجات قطتك' },
    tierTitle: { en: 'Choose your package', ar: 'اختر باقتك' },
    tierSubtitle: { en: 'All packages include wet food, dry food, and litter', ar: 'جميع الباقات تشمل طعام رطب وجاف ورمل' },
    addOnsTitle: { en: 'Add extras to your box', ar: 'أضف إضافات لصندوقك' },
    addOnsSubtitle: { en: 'Optional items to enhance your cat\'s experience', ar: 'عناصر اختيارية لتحسين تجربة قطتك' },
    durationTitle: { en: 'Choose your commitment', ar: 'اختر مدة الاشتراك' },
    durationSubtitle: { en: 'Longer commitments unlock bigger savings', ar: 'المدد الأطول توفر خصومات أكبر' },
    yourPackage: { en: 'Your Package', ar: 'باقتك' },
    whatsIncluded: { en: 'What\'s Included', ar: 'ماذا تشمل' },
    monthlyPrice: { en: 'Monthly Price', ar: 'السعر الشهري' },
    durationDiscount: { en: 'Duration Discount', ar: 'خصم المدة' },
    total: { en: 'Total', ar: 'الإجمالي' },
  },

  // Calculator (formerly Builder) - Guided recommendation tool
  calculator: {
    badge: { en: 'Plan Calculator', ar: 'حاسبة الخطة' },
    title: { en: 'Find Your Cat\'s Perfect Plan', ar: 'اعثر على الخطة المثالية لقطتك' },
    subtitle: {
      en: 'Answer a few questions and we\'ll recommend the right portions and plan',
      ar: 'أجب على بعض الأسئلة وسنوصي بالكميات والخطة المناسبة'
    },
    step1: { en: 'Your Cat', ar: 'قطتك' },
    step2: { en: 'Recommendation', ar: 'التوصية' },
    step3: { en: 'Join Waitlist', ar: 'انضم للقائمة' },

    catTypeTitle: { en: 'Tell us about your cat(s)', ar: 'أخبرنا عن قطتك' },
    catTypeSubtitle: { en: 'We\'ll calculate the right portions based on your cat\'s needs', ar: 'سنحسب الكميات المناسبة بناءً على احتياجات قطتك' },

    catTypeKitten: { en: 'Kitten', ar: 'قط صغير' },
    catTypeKittenDesc: { en: 'Under 1 year old', ar: 'أقل من سنة' },
    catTypeAdult: { en: 'Adult Cat', ar: 'قط بالغ' },
    catTypeAdultDesc: { en: '1-7 years old', ar: 'من 1-7 سنوات' },
    catTypeSenior: { en: 'Senior Cat', ar: 'قط كبير' },
    catTypeSeniorDesc: { en: '7+ years old', ar: 'أكثر من 7 سنوات' },
    catTypeMulti: { en: 'Multiple Cats', ar: 'عدة قطط' },
    catTypeMultiDesc: { en: '2 or more cats', ar: 'قطتان أو أكثر' },

    recommendationTitle: { en: 'Your Recommended Plan', ar: 'الخطة الموصى بها' },
    recommendationSubtitle: { en: 'Based on your cat\'s profile, here\'s what we recommend', ar: 'بناءً على معلومات قطتك، إليك توصيتنا' },

    monthlyEstimate: { en: 'Estimated Monthly Cost', ar: 'التكلفة الشهرية المتوقعة' },
    whatsIncluded: { en: 'What\'s Included', ar: 'ماذا تشمل' },

    saveAndJoinTitle: { en: 'Save This Plan', ar: 'احفظ هذه الخطة' },
    saveAndJoinSubtitle: { en: 'Join the waitlist to lock in your personalized plan', ar: 'انضم لقائمة الانتظار لحفظ خطتك المخصصة' },

    yourPlan: { en: 'Your Plan Summary', ar: 'ملخص خطتك' },
  },

  // Vet Support Section - Key differentiator
  vetSupport: {
    badge: { en: 'Expert Care', ar: 'رعاية متخصصة' },
    title: { en: 'Vet Support Included', ar: 'دعم بيطري مشمول' },
    subtitle: {
      en: 'Every Moracat subscriber gets access to professional veterinary guidance',
      ar: 'كل مشترك في مرقط يحصل على إرشاد بيطري احترافي'
    },
    feature1Title: { en: 'Portion Guidance', ar: 'إرشاد الكميات' },
    feature1Desc: {
      en: 'Vets help calculate the right food portions for your cat\'s age, weight, and activity level',
      ar: 'الأطباء البيطريون يساعدون في حساب الكميات المناسبة لعمر قطتك ووزنها ونشاطها'
    },
    feature2Title: { en: 'Food Validation', ar: 'اعتماد الغذاء' },
    feature2Desc: {
      en: 'All our products are reviewed and approved by veterinary nutritionists',
      ar: 'جميع منتجاتنا مراجعة ومعتمدة من أخصائيي التغذية البيطريين'
    },
    feature3Title: { en: 'Partner Discounts', ar: 'خصومات الشركاء' },
    feature3Desc: {
      en: 'Exclusive discounts at partner vet clinics and pet stores across Saudi Arabia',
      ar: 'خصومات حصرية في عيادات بيطرية ومتاجر حيوانات شريكة في جميع أنحاء المملكة'
    },
    feature4Title: { en: 'Diet Consultations', ar: 'استشارات غذائية' },
    feature4Desc: {
      en: 'Get advice on your cat\'s dietary needs and any concerns you have',
      ar: 'احصل على نصائح حول احتياجات قطتك الغذائية وأي استفسارات لديك'
    },
    note: {
      en: 'Vet support is available to all active subscribers at no extra cost',
      ar: 'الدعم البيطري متاح لجميع المشتركين الفعالين بدون تكلفة إضافية'
    },
  },

  // About - Why Moracat
  about: {
    badge: { en: 'Why Moracat', ar: 'لماذا مرقط' },
    title: { en: 'Built for Saudi Cat Parents', ar: 'مصمم لمحبي القطط في السعودية' },
    subtitle: {
      en: 'We understand the challenge of caring for cats with a busy schedule',
      ar: 'نفهم تحدي رعاية القطط مع جدول مشغول'
    },
    mission: { en: 'Our Mission', ar: 'مهمتنا' },
    missionText: {
      en: 'To make premium cat nutrition accessible and convenient for every cat owner in Saudi Arabia.',
      ar: 'جعل التغذية الفاخرة للقطط متاحة ومريحة لكل مالك قط في المملكة العربية السعودية.'
    },
    feature1: { en: 'Saudi-Focused', ar: 'مخصص للسعودية' },
    feature1Desc: { en: 'Designed for the Saudi market with local delivery networks', ar: 'مصمم للسوق السعودي بشبكات توصيل محلية' },
    feature2: { en: 'Vet-Approved', ar: 'معتمد بيطرياً' },
    feature2Desc: { en: 'All products reviewed by veterinary experts', ar: 'جميع المنتجات مراجعة من خبراء بيطريين' },
    feature3: { en: 'Free Delivery', ar: 'توصيل مجاني' },
    feature3Desc: { en: 'Free shipping to all major Saudi cities', ar: 'شحن مجاني لجميع المدن السعودية الرئيسية' },
    feature4: { en: 'Flexible Plans', ar: 'خطط مرنة' },
    feature4Desc: { en: 'Pause, skip, or cancel anytime with no penalties', ar: 'أوقف أو تخطى أو ألغِ في أي وقت بدون غرامات' },
  },

  // FAQ
  faq: {
    badge: { en: 'Questions', ar: 'الأسئلة الشائعة' },
    title: { en: 'Frequently Asked Questions', ar: 'الأسئلة المتكررة' },
    subtitle: {
      en: 'Everything you need to know about Moracat',
      ar: 'كل ما تحتاج معرفته عن مرقط'
    },
    q1: { en: 'When will Moracat launch?', ar: 'متى سيُطلق مرقط؟' },
    a1: {
      en: 'We\'re launching in Q2 2026. Waitlist members get 20% off their first order plus free premium treats. Reserve your spot now!',
      ar: 'نحن سنُطلق في الربع الثاني من 2026. أعضاء قائمة الانتظار يحصلون على خصم 20% على طلبهم الأول بالإضافة إلى مكافآت فاخرة مجانية. احجز مكانك الآن!'
    },
    q2: { en: 'How does the subscription work?', ar: 'كيف يعمل الاشتراك؟' },
    a2: {
      en: 'Tell us about your cat, we recommend a plan with the right food portions, and deliver everything to your door monthly. Simple.',
      ar: 'أخبرنا عن قطتك، نوصي بخطة بالكميات المناسبة، ونوصل كل شيء لباب بيتك شهرياً. بسيط.'
    },
    q3: { en: 'What areas do you deliver to?', ar: 'ما هي المناطق التي توصلون إليها؟' },
    a3: {
      en: 'We deliver to all major cities in Saudi Arabia including Riyadh, Jeddah, Dammam, and more. Free delivery on all orders.',
      ar: 'نوصل لجميع المدن الرئيسية في السعودية بما فيها الرياض وجدة والدمام وغيرها. توصيل مجاني لجميع الطلبات.'
    },
    q4: { en: 'Can I change or cancel my subscription?', ar: 'هل يمكنني تغيير أو إلغاء اشتراكي؟' },
    a4: {
      en: 'Yes, you have full control. Upgrade, downgrade, pause, or cancel anytime through your dashboard. No hidden fees or penalties.',
      ar: 'نعم، لديك تحكم كامل. رقِّ أو خفِّض أو أوقف أو ألغِ في أي وقت من خلال لوحة التحكم. لا رسوم خفية أو غرامات.'
    },
    q5: { en: 'What if my cat doesn\'t like the food?', ar: 'ماذا لو لم يحب قطي الطعام؟' },
    a5: {
      en: 'We offer a satisfaction guarantee. Contact us and we\'ll work with you to find the right products for your cat.',
      ar: 'نقدم ضمان الرضا. تواصل معنا وسنعمل معك لإيجاد المنتجات المناسبة لقطتك.'
    },
    q6: { en: 'How is the vet support provided?', ar: 'كيف يُقدم الدعم البيطري؟' },
    a6: {
      en: 'Active subscribers can access vet consultations through our platform for guidance on portions, diet, and general cat nutrition questions.',
      ar: 'يمكن للمشتركين الفعالين الوصول لاستشارات بيطرية عبر منصتنا للإرشاد حول الكميات والنظام الغذائي وأسئلة التغذية العامة.'
    },
  },

  // Waitlist Form - Pre-launch focused
  waitlist: {
    badge: { en: 'Join Early', ar: 'انضم مبكراً' },
    title: { en: 'Join the Waitlist', ar: 'انضم لقائمة الانتظار' },
    subtitle: {
      en: 'Be the first to know when we launch and get exclusive early-access benefits',
      ar: 'كن أول من يعرف عند إطلاقنا واحصل على مميزات الوصول المبكر الحصرية'
    },
    namePlaceholder: { en: 'Your Name', ar: 'اسمك' },
    emailPlaceholder: { en: 'your@email.com', ar: 'بريدك@الالكتروني.com' },
    phonePlaceholder: { en: '+966 5X XXX XXXX', ar: '+966 5X XXX XXXX' },
    catsLabel: { en: 'Number of Cats', ar: 'عدد القطط' },
    selectCats: { en: 'How many cats?', ar: 'كم عدد قططك؟' },
    success: { en: 'You\'re on the list! We\'ll contact you as soon as we launch.', ar: 'أنت في القائمة! سنتواصل معك فور إطلاقنا.' },
    error: { en: 'Something went wrong. Please try again.', ar: 'حدث خطأ. يرجى المحاولة مرة أخرى.' },
    alreadyRegistered: { en: 'This email is already on the waitlist!', ar: 'هذا البريد الإلكتروني مسجل مسبقاً في القائمة!' },
    perk1: { en: '20% off your first order', ar: 'خصم 20% على طلبك الأول' },
    perk2: { en: 'Free premium treats on signup', ar: 'مكافآت فاخرة مجانية عند التسجيل' },
    perk3: { en: 'Priority access before public launch', ar: 'أولوية الوصول قبل الإطلاق العام' },
    perk4: { en: 'Exclusive early-member pricing', ar: 'أسعار حصرية للأعضاء المبكرين' },
    waitlistCount: { en: 'cat parents on the waitlist', ar: 'من محبي القطط في قائمة الانتظار' },
    reserveSpot: { en: 'Reserve Your Spot', ar: 'احجز مكانك' },
    successTitle: { en: 'You\'re on the list!', ar: 'أنت في القائمة!' },
    addAnother: { en: 'Add Another Cat Parent', ar: 'أضف شخص آخر' },
    privacyNote: { en: 'By joining, you agree to receive launch updates. We respect your privacy.', ar: 'بالانضمام، توافق على استلام تحديثات الإطلاق. نحترم خصوصيتك.' },
  },

  // Footer
  footer: {
    description: {
      en: 'Saudi Arabia\'s first personalized cat food subscription. Premium nutrition delivered monthly.',
      ar: 'أول اشتراك طعام قطط مخصص في السعودية. تغذية فاخرة توصَل شهرياً.'
    },
    newsletter: { en: 'Get launch updates', ar: 'احصل على تحديثات الإطلاق' },
    newsletterPlaceholder: { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
    company: { en: 'Company', ar: 'الشركة' },
    aboutUs: { en: 'About Us', ar: 'عن مرقط' },
    howItWorksLink: { en: 'How It Works', ar: 'كيف نعمل' },
    ourProducts: { en: 'What We Deliver', ar: 'ماذا نوصّل' },
    support: { en: 'Support', ar: 'الدعم' },
    contactUs: { en: 'Contact Us', ar: 'تواصل معنا' },
    shippingInfo: { en: 'Shipping Info', ar: 'معلومات الشحن' },
    faqLink: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    contact: { en: 'Contact', ar: 'التواصل' },
    careers: { en: 'Careers', ar: 'الوظائف' },
    returns: { en: 'Returns', ar: 'الإرجاع' },
    cookiePolicy: { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
    copyright: { en: 'All rights reserved. Made with', ar: 'جميع الحقوق محفوظة. صنع بـ' },
    inSaudi: { en: 'in Saudi Arabia', ar: 'في المملكة العربية السعودية' },
    privacyPolicy: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    termsOfService: { en: 'Terms of Service', ar: 'شروط الخدمة' },
  },

  // Start Page - Getting started options
  startNow: {
    title: { en: 'How Would You Like to Start?', ar: 'كيف تود أن تبدأ؟' },
    subtitle: { en: 'Choose the path that works best for you', ar: 'اختر الطريقة المناسبة لك' },
    option1Title: { en: 'Quick Start', ar: 'البدء السريع' },
    option1Desc: { en: 'Choose from our ready-made subscription plans', ar: 'اختر من باقاتنا الجاهزة' },
    option2Title: { en: 'Build Your Own', ar: 'ابنِ خطتك' },
    option2Desc: { en: 'Customize every detail of your cat\'s plan', ar: 'خصص كل تفاصيل خطة قطتك' },
    option3Title: { en: 'Talk to Us', ar: 'تحدث معنا' },
    option3Desc: { en: 'Join the waitlist and we\'ll help you get started', ar: 'انضم لقائمة الانتظار وسنساعدك على البدء' },
  },

  // Auth - Simplified for waitlist users
  auth: {
    loginTitle: { en: 'Welcome Back', ar: 'مرحباً بعودتك' },
    loginSubtitle: { en: 'Sign in to view your waitlist status', ar: 'سجل الدخول لعرض حالة قائمة الانتظار' },
    orContinueWith: { en: 'Or continue with', ar: 'أو تابع باستخدام' },
    signInWithGoogle: { en: 'Sign in with Google', ar: 'تسجيل الدخول بحساب Google' },
    signUpWithGoogle: { en: 'Sign up with Google', ar: 'التسجيل بحساب Google' },
    forgotPassword: { en: 'Forgot password?', ar: 'نسيت كلمة المرور؟' },
    registerTitle: { en: 'Join the Waitlist', ar: 'انضم لقائمة الانتظار' },
    registerSubtitle: { en: 'Create an account to secure your spot', ar: 'أنشئ حساباً لتأمين مكانك' },
    orRegisterWith: { en: 'Or register with', ar: 'أو سجّل باستخدام' },
    noAccount: { en: 'Don\'t have an account?', ar: 'ليس لديك حساب؟' },
    haveAccount: { en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' },
  },

  // Dashboard - Pre-launch mode
  dashboard: {
    welcome: { en: 'Welcome back, {name}!', ar: 'مرحباً بعودتك، {name}!' },
    welcomeSubtitle: { en: 'Your spot on the waitlist is secured. We\'ll notify you when we launch.', ar: 'مكانك في قائمة الانتظار محجوز. سنبلغك عند الإطلاق.' },

    // Launching Soon Banner
    launchingTitle: { en: 'Launching Soon', ar: 'الإطلاق قريباً' },
    launchingSubtitle: { en: 'We\'re putting the finishing touches on Moracat', ar: 'نضع اللمسات الأخيرة على مرقط' },
    waitlistConfirmed: { en: 'Your waitlist spot is confirmed', ar: 'تم تأكيد مكانك في قائمة الانتظار' },

    // Profile Section
    yourProfile: { en: 'Your Profile', ar: 'ملفك الشخصي' },
    numberOfCats: { en: 'Number of Cats', ar: 'عدد القطط' },
    status: { en: 'Status', ar: 'الحالة' },
    onWaitlist: { en: 'On Waitlist', ar: 'في قائمة الانتظار' },
    betaTester: { en: 'App Beta Tester', ar: 'مختبر التطبيق التجريبي' },

    // Estimated Plan
    estimatedPlan: { en: 'Estimated Plan', ar: 'الخطة المتوقعة' },
    estimatedPrice: { en: 'Estimated Price', ar: 'السعر المتوقع' },
    planNote: { en: 'Final pricing confirmed at launch', ar: 'السعر النهائي يُؤكد عند الإطلاق' },

    // Vet Support (locked)
    vetSupport: { en: 'Vet Support', ar: 'الدعم البيطري' },
    vetLocked: { en: 'Available After Launch', ar: 'متاح بعد الإطلاق' },
    vetLockedDesc: { en: 'Vet consultations and partner discounts unlock when Moracat launches', ar: 'الاستشارات البيطرية وخصومات الشركاء تتوفر عند إطلاق مرقط' },

    // Waitlist Perks
    yourPerks: { en: 'Your Early Access Perks', ar: 'مميزات الوصول المبكر' },
    perk1: { en: '20% First Order Discount', ar: 'خصم 20% على الطلب الأول' },
    perk1Desc: { en: 'Exclusive discount for waitlist members', ar: 'خصم حصري لأعضاء قائمة الانتظار' },
    perk2: { en: 'Free Premium Treats', ar: 'مكافآت فاخرة مجانية' },
    perk2Desc: { en: 'A surprise treat pack with your first order', ar: 'عبوة مكافآت مفاجئة مع طلبك الأول' },
    perk3: { en: 'Priority Access', ar: 'أولوية الوصول' },
    perk3Desc: { en: 'First to order when we launch', ar: 'الأولوية في الطلب عند الإطلاق' },

    // Legacy keys (for compatibility)
    welcomeBack: { en: 'Welcome back,', ar: 'مرحباً بعودتك،' },
    catParent: { en: 'Cat Parent', ar: 'محب القطط' },
    statusLabel: { en: 'Status', ar: 'الحالة' },
    statusWaitlist: { en: 'On Waitlist', ar: 'في قائمة الانتظار' },
    statusLaunchingSoon: { en: 'Launching Soon', ar: 'الإطلاق قريباً' },
    yourPlan: { en: 'Your Saved Plan', ar: 'خطتك المحفوظة' },
    noPlanYet: { en: 'No plan saved yet', ar: 'لم تحفظ خطة بعد' },
    calculatePlanCta: { en: 'Calculate Your Plan', ar: 'احسب خطتك' },
    estimatedMonthly: { en: 'Estimated Monthly', ar: 'التكلفة الشهرية المتوقعة' },
    catProfile: { en: 'Cat Profile', ar: 'ملف القط' },
    editProfile: { en: 'Edit', ar: 'تعديل' },
    vetSupportTab: { en: 'Vet Support', ar: 'الدعم البيطري' },
    vetSupportLocked: { en: 'Available After Launch', ar: 'متاح بعد الإطلاق' },
    vetSupportTeaser: {
      en: 'Get access to vet consultations, portion guidance, and partner discounts when we launch.',
      ar: 'احصل على استشارات بيطرية وإرشاد الكميات وخصومات الشركاء عند الإطلاق.'
    },
    waitlistPosition: { en: 'You\'re #', ar: 'ترتيبك #' },
    waitlistNote: { en: 'in the waitlist', ar: 'في قائمة الانتظار' },
    signOut: { en: 'Sign Out', ar: 'تسجيل الخروج' },
    notifications: { en: 'Notifications', ar: 'الإشعارات' },
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

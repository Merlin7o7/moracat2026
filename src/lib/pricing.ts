/**
 * Moracat Subscription Pricing
 * Fixed-tier pricing model based on actual business requirements
 *
 * We are a CURATION service, NOT a manufacturer.
 * We curate premium brands: Josera, Applaws, BioSand, Churu, Kit Cat
 */

// Partner Brands
export const PARTNER_BRANDS = {
  wetFood: [
    { id: 'applaws', name: 'Applaws', nameAr: 'أبلاوز' },
    { id: 'kitcat', name: 'Kit Cat', nameAr: 'كيت كات' },
  ],
  dryFood: [
    { id: 'josera', name: 'Josera', nameAr: 'جوسيرا' },
  ],
  litter: [
    { id: 'biosand', name: 'BioSand', nameAr: 'بايوساند' },
  ],
  treats: [
    { id: 'churu', name: 'Churu', nameAr: 'تشورو' },
    { id: 'kitcat_treats', name: 'Kit Cat Treats', nameAr: 'حلوى كيت كات' },
  ],
} as const;

// Cat types with feeding multipliers
export type CatType = 'adult' | 'kitten' | 'senior' | 'multiCat';

export const CAT_TYPE_CONFIG: Record<CatType, {
  label: string;
  labelAr: string;
  quantityMultiplier: number;
  description: string;
  descriptionAr: string;
}> = {
  adult: {
    label: 'Adult Cat',
    labelAr: 'قط بالغ',
    quantityMultiplier: 1.0,
    description: '1-7 years old',
    descriptionAr: 'من 1-7 سنوات',
  },
  kitten: {
    label: 'Kitten',
    labelAr: 'قط صغير',
    quantityMultiplier: 0.75,
    description: 'Under 1 year old',
    descriptionAr: 'أقل من سنة',
  },
  senior: {
    label: 'Senior Cat',
    labelAr: 'قط كبير',
    quantityMultiplier: 0.85,
    description: '7+ years old',
    descriptionAr: 'أكثر من 7 سنوات',
  },
  multiCat: {
    label: 'Multiple Cats',
    labelAr: 'عدة قطط',
    quantityMultiplier: 2.0,
    description: '2 or more cats (doubles quantities)',
    descriptionAr: 'قطتان أو أكثر (تضاعف الكميات)',
  },
};

// Subscription tiers - FIXED PRICING MODEL
export type SubscriptionTier = 'basic' | 'premium' | 'luxury' | 'ultimate';

export interface TierConfig {
  label: string;
  labelAr: string;
  description: string;
  descriptionAr: string;
  color: string;
  // Fixed monthly price in SAR
  fixedPrice: number;
  // Estimated retail value (for savings display)
  retailValue: number;
  // Quantities included
  wetCans: number;
  dryKg: number;
  litterL: number;
  treatPacks: number;
  toys: number;
  groomingItems: number;
  gizzardMeals: number;
  // Flags
  isPopular: boolean;
}

export const TIER_CONFIG: Record<SubscriptionTier, TierConfig> = {
  basic: {
    label: 'Essential',
    labelAr: 'الأساسية',
    description: 'Complete nutrition for your cat',
    descriptionAr: 'تغذية كاملة لقطتك',
    color: '#f7dec9', // beige
    fixedPrice: 260,
    retailValue: 325, // ~20% savings
    wetCans: 30,
    dryKg: 2.5,
    litterL: 12,
    treatPacks: 0,
    toys: 0,
    groomingItems: 0,
    gizzardMeals: 0,
    isPopular: false,
  },
  premium: {
    label: 'Premium',
    labelAr: 'المتميزة',
    description: 'Nutrition plus treats for extra joy',
    descriptionAr: 'تغذية مع مكافآت لسعادة أكبر',
    color: '#045b46', // green (popular)
    fixedPrice: 305,
    retailValue: 381, // ~20% savings
    wetCans: 30,
    dryKg: 2.5,
    litterL: 12,
    treatPacks: 1,
    toys: 0,
    groomingItems: 0,
    gizzardMeals: 0,
    isPopular: true,
  },
  luxury: {
    label: 'Complete',
    labelAr: 'الشاملة',
    description: 'Full care with toys and extra treats',
    descriptionAr: 'عناية كاملة مع ألعاب ومكافآت إضافية',
    color: '#f86c2f', // orange
    fixedPrice: 365,
    retailValue: 456, // ~20% savings
    wetCans: 30,
    dryKg: 2.5,
    litterL: 12,
    treatPacks: 2,
    toys: 1,
    groomingItems: 0,
    gizzardMeals: 0,
    isPopular: false,
  },
  ultimate: {
    label: 'Royal',
    labelAr: 'الملكية',
    description: 'The complete royal treatment',
    descriptionAr: 'تجربة العناية الملكية الكاملة',
    color: '#ffb7b8', // pink
    fixedPrice: 430,
    retailValue: 538, // ~20% savings
    wetCans: 30,
    dryKg: 2.5,
    litterL: 12,
    treatPacks: 2,
    toys: 1,
    groomingItems: 1,
    gizzardMeals: 1,
    isPopular: false,
  },
};

// Flavor/Brand preferences for customization
export interface BrandPreference {
  wetFoodBrand: 'applaws' | 'kitcat';
  treatBrand: 'churu' | 'kitcat_treats';
}

// Subscription configuration
export interface SubscriptionConfig {
  tier: SubscriptionTier;
  catType: CatType;
  brandPreferences?: BrandPreference;
}

// Price breakdown for display
export interface PriceBreakdown {
  fixedPrice: number;
  retailValue: number;
  savings: number;
  savingsPercentage: number;
  quantities: {
    wetCans: number;
    dryKg: number;
    litterL: number;
    treatPacks: number;
    toys: number;
    groomingItems: number;
    gizzardMeals: number;
  };
}

/**
 * Calculate the subscription price and quantities based on configuration
 */
export function calculatePrice(config: SubscriptionConfig): PriceBreakdown {
  const tier = TIER_CONFIG[config.tier];
  const catMultiplier = CAT_TYPE_CONFIG[config.catType].quantityMultiplier;

  // Calculate quantities (multiplied for multi-cat households)
  const quantities = {
    wetCans: Math.ceil(tier.wetCans * catMultiplier),
    dryKg: tier.dryKg * catMultiplier,
    litterL: Math.ceil(tier.litterL * catMultiplier),
    treatPacks: tier.treatPacks,
    toys: tier.toys,
    groomingItems: tier.groomingItems,
    gizzardMeals: tier.gizzardMeals,
  };

  // Price scales with quantity for multi-cat
  const priceMultiplier = config.catType === 'multiCat' ? 1.8 : 1; // 80% more for multi-cat (not 100% - bulk discount)
  const fixedPrice = Math.round(tier.fixedPrice * priceMultiplier);
  const retailValue = Math.round(tier.retailValue * priceMultiplier);

  const savings = retailValue - fixedPrice;
  const savingsPercentage = Math.round((savings / retailValue) * 100);

  return {
    fixedPrice,
    retailValue,
    savings,
    savingsPercentage,
    quantities,
  };
}

/**
 * Get all tier prices for comparison
 */
export function getAllTierPrices(catType: CatType = 'adult'): Record<SubscriptionTier, PriceBreakdown> {
  const tiers: SubscriptionTier[] = ['basic', 'premium', 'luxury', 'ultimate'];
  const prices: Partial<Record<SubscriptionTier, PriceBreakdown>> = {};

  for (const tier of tiers) {
    prices[tier] = calculatePrice({ tier, catType });
  }

  return prices as Record<SubscriptionTier, PriceBreakdown>;
}

/**
 * Calculate annual savings compared to retail
 */
export function calculateAnnualSavings(config: SubscriptionConfig): number {
  const breakdown = calculatePrice(config);
  return breakdown.savings * 12;
}

/**
 * Calculate savings vs current monthly spend
 */
export function calculateSavingsVsCurrentSpend(
  currentMonthlySpend: number,
  tier: SubscriptionTier,
  catType: CatType = 'adult'
): { monthly: number; annual: number; percentage: number } {
  const breakdown = calculatePrice({ tier, catType });
  const monthlySavings = currentMonthlySpend - breakdown.fixedPrice;
  const annualSavings = monthlySavings * 12;
  const percentage = Math.round((monthlySavings / currentMonthlySpend) * 100);

  return {
    monthly: Math.max(0, monthlySavings),
    annual: Math.max(0, annualSavings),
    percentage: Math.max(0, percentage),
  };
}

/**
 * Format price in SAR
 */
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('en-SA')} SAR`;
}

/**
 * Format price in Arabic
 */
export function formatPriceAr(amount: number): string {
  return `${amount.toLocaleString('ar-SA')} ر.س`;
}

/**
 * Get tier features as a list for display
 */
export function getTierFeatures(tier: SubscriptionTier, language: 'en' | 'ar'): string[] {
  const config = TIER_CONFIG[tier];
  const features: string[] = [];

  if (language === 'en') {
    features.push(`${config.wetCans} premium wet food cans`);
    features.push(`${config.dryKg}kg dry food`);
    features.push(`${config.litterL}L premium litter`);
    if (config.treatPacks > 0) features.push(`${config.treatPacks} treat pack${config.treatPacks > 1 ? 's' : ''}`);
    if (config.toys > 0) features.push(`${config.toys} interactive toy${config.toys > 1 ? 's' : ''}`);
    if (config.groomingItems > 0) features.push(`${config.groomingItems} grooming item${config.groomingItems > 1 ? 's' : ''}`);
    if (config.gizzardMeals > 0) features.push(`${config.gizzardMeals} gizzard meal${config.gizzardMeals > 1 ? 's' : ''}`);
  } else {
    features.push(`${config.wetCans} علبة طعام رطب فاخر`);
    features.push(`${config.dryKg} كجم طعام جاف`);
    features.push(`${config.litterL} لتر رمل فاخر`);
    if (config.treatPacks > 0) features.push(`${config.treatPacks} ${config.treatPacks > 1 ? 'عبوات' : 'عبوة'} مكافآت`);
    if (config.toys > 0) features.push(`${config.toys} ${config.toys > 1 ? 'ألعاب' : 'لعبة'} تفاعلية`);
    if (config.groomingItems > 0) features.push(`${config.groomingItems} ${config.groomingItems > 1 ? 'أدوات' : 'أداة'} عناية`);
    if (config.gizzardMeals > 0) features.push(`${config.gizzardMeals} ${config.gizzardMeals > 1 ? 'وجبات' : 'وجبة'} قوانص`);
  }

  return features;
}

// Legacy exports for compatibility
export type SubscriptionDuration = 1;
export const DURATION_CONFIG = {
  1: { label: 'Monthly', labelAr: 'شهري', discountPercentage: 0 },
} as const;

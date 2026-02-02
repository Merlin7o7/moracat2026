/**
 * Moracat Subscription Pricing Calculator
 * Based on MoraCat_Optimized_Subscription_Strategy_Mixed_Diet_Approach
 *
 * Pricing Formula: Final Price = (Product Cost + 8% Overhead + SAR 46 Operations + 20% Profit) ÷ 0.971
 */

// Product costs (SAR)
export const PRODUCT_COSTS = {
  wetFood: 3.25,      // SAR per can
  dryFood: 5.64,      // SAR per kg
  litter: 2.71,       // SAR per liter
  treats: 29.40,      // SAR per pack
  toys: 15.00,        // SAR per item
  grooming: 10.00,    // SAR per item
  gizzardMeal: 35.00, // SAR per pack
} as const;

// Fixed costs
export const FIXED_COSTS = {
  operationsPerBox: 46,  // SAR per box (packaging, logistics, fulfillment)
  overheadPercentage: 0.08, // 8% overhead
  minProfitMargin: 0.20, // 20% minimum profit margin
  vatAdjustment: 0.971, // VAT adjustment factor
} as const;

// Cat types with feeding multipliers
export type CatType = 'adult' | 'kitten' | 'multiCat2to3' | 'multiCat4plus';

export const CAT_TYPE_CONFIG: Record<CatType, {
  label: string;
  labelAr: string;
  feedingMultiplier: number;
  description: string;
}> = {
  adult: {
    label: 'Adult Cat',
    labelAr: 'قط بالغ',
    feedingMultiplier: 1.0,
    description: '1 adult cat (1+ years)',
  },
  kitten: {
    label: 'Kitten',
    labelAr: 'قطة صغيرة',
    feedingMultiplier: 0.75,
    description: '1 kitten (under 1 year)',
  },
  multiCat2to3: {
    label: 'Multi-Cat (2-3)',
    labelAr: 'عدة قطط (2-3)',
    feedingMultiplier: 2.5,
    description: '2-3 cats household',
  },
  multiCat4plus: {
    label: 'Multi-Cat (4+)',
    labelAr: 'عدة قطط (4+)',
    feedingMultiplier: 4.0,
    description: '4+ cats household',
  },
};

// Subscription tiers
export type SubscriptionTier = 'basic' | 'premium' | 'luxury' | 'ultimate';

export interface TierConfig {
  label: string;
  labelAr: string;
  description: string;
  color: string;
  baseWetCans: number;       // Cans of wet food per month
  baseDryKg: number;         // Kg of dry food per month
  baseLitterL: number;       // Liters of litter per month
  includesTreats: boolean;
  includesGizzardMeal: boolean;
  includesToys: boolean;
  includesGrooming: boolean;
  treatsPerMonth: number;    // Number of treat packs
  toysPerMonth: number;      // Number of toys
  groomingPerMonth: number;  // Number of grooming items
  gizzardMealsPerMonth: number;
}

export const TIER_CONFIG: Record<SubscriptionTier, TierConfig> = {
  basic: {
    label: 'Basic',
    labelAr: 'أساسي',
    description: 'Essential nutrition for your cat',
    color: '#f7dec9', // beige
    baseWetCans: 15,
    baseDryKg: 1.5,
    baseLitterL: 10,
    includesTreats: false,
    includesGizzardMeal: false,
    includesToys: false,
    includesGrooming: false,
    treatsPerMonth: 0,
    toysPerMonth: 0,
    groomingPerMonth: 0,
    gizzardMealsPerMonth: 0,
  },
  premium: {
    label: 'Premium',
    labelAr: 'متميز',
    description: 'Quality nutrition with treats',
    color: '#ffb7b8', // pink
    baseWetCans: 20,
    baseDryKg: 2,
    baseLitterL: 15,
    includesTreats: true,
    includesGizzardMeal: false,
    includesToys: false,
    includesGrooming: false,
    treatsPerMonth: 1,
    toysPerMonth: 0,
    groomingPerMonth: 0,
    gizzardMealsPerMonth: 0,
  },
  luxury: {
    label: 'Luxury',
    labelAr: 'فاخر',
    description: 'Premium experience with toys & treats',
    color: '#f86c2f', // orange
    baseWetCans: 25,
    baseDryKg: 2.5,
    baseLitterL: 20,
    includesTreats: true,
    includesGizzardMeal: true,
    includesToys: true,
    includesGrooming: false,
    treatsPerMonth: 2,
    toysPerMonth: 1,
    groomingPerMonth: 0,
    gizzardMealsPerMonth: 1,
  },
  ultimate: {
    label: 'Ultimate',
    labelAr: 'الأفضل',
    description: 'The complete royal treatment',
    color: '#045b46', // green
    baseWetCans: 30,
    baseDryKg: 3,
    baseLitterL: 25,
    includesTreats: true,
    includesGizzardMeal: true,
    includesToys: true,
    includesGrooming: true,
    treatsPerMonth: 2,
    toysPerMonth: 2,
    groomingPerMonth: 1,
    gizzardMealsPerMonth: 2,
  },
};

// Duration discounts
export type SubscriptionDuration = 1 | 3 | 6 | 12;

export const DURATION_CONFIG: Record<SubscriptionDuration, {
  label: string;
  labelAr: string;
  discountPercentage: number;
}> = {
  1: { label: '1 Month', labelAr: 'شهر واحد', discountPercentage: 0 },
  3: { label: '3 Months', labelAr: '3 أشهر', discountPercentage: 0.05 },
  6: { label: '6 Months', labelAr: '6 أشهر', discountPercentage: 0.10 },
  12: { label: '12 Months', labelAr: '12 شهر', discountPercentage: 0.15 },
};

// Add-ons configuration
export interface AddOn {
  id: string;
  label: string;
  labelAr: string;
  description: string;
  unitCost: number;
  unit: string;
  maxQuantity: number;
}

export const ADD_ONS: AddOn[] = [
  {
    id: 'extraWetFood',
    label: 'Extra Wet Food',
    labelAr: 'طعام رطب إضافي',
    description: 'Additional premium wet food cans',
    unitCost: PRODUCT_COSTS.wetFood,
    unit: 'cans',
    maxQuantity: 20,
  },
  {
    id: 'extraDryFood',
    label: 'Extra Dry Food',
    labelAr: 'طعام جاف إضافي',
    description: 'Additional premium dry food',
    unitCost: PRODUCT_COSTS.dryFood,
    unit: 'kg',
    maxQuantity: 5,
  },
  {
    id: 'extraLitter',
    label: 'Extra Litter',
    labelAr: 'رمل إضافي',
    description: 'Additional premium litter',
    unitCost: PRODUCT_COSTS.litter,
    unit: 'liters',
    maxQuantity: 20,
  },
  {
    id: 'extraTreats',
    label: 'Extra Treats',
    labelAr: 'حلوى إضافية',
    description: 'Additional treat packs',
    unitCost: PRODUCT_COSTS.treats,
    unit: 'packs',
    maxQuantity: 4,
  },
  {
    id: 'gizzardMeal',
    label: 'Gizzard Meal',
    labelAr: 'وجبة قوانص',
    description: 'Premium gizzard meal supplement',
    unitCost: PRODUCT_COSTS.gizzardMeal,
    unit: 'packs',
    maxQuantity: 4,
  },
  {
    id: 'toys',
    label: 'Interactive Toys',
    labelAr: 'ألعاب تفاعلية',
    description: 'Fun toys for your cat',
    unitCost: PRODUCT_COSTS.toys,
    unit: 'items',
    maxQuantity: 3,
  },
  {
    id: 'grooming',
    label: 'Grooming Items',
    labelAr: 'أدوات العناية',
    description: 'Grooming and care products',
    unitCost: PRODUCT_COSTS.grooming,
    unit: 'items',
    maxQuantity: 3,
  },
];

// Subscription configuration
export interface SubscriptionConfig {
  tier: SubscriptionTier;
  catType: CatType;
  duration: SubscriptionDuration;
  addOns: Record<string, number>; // addOnId -> quantity
}

// Price breakdown
export interface PriceBreakdown {
  productCost: number;
  overhead: number;
  operations: number;
  profit: number;
  subtotal: number;
  vatAdjustment: number;
  monthlyPrice: number;
  durationDiscount: number;
  finalMonthlyPrice: number;
  totalPrice: number;
  isValidConfig: boolean;
  marginPercentage: number;
  itemBreakdown: {
    wetFood: { quantity: number; cost: number };
    dryFood: { quantity: number; cost: number };
    litter: { quantity: number; cost: number };
    treats: { quantity: number; cost: number };
    gizzardMeal: { quantity: number; cost: number };
    toys: { quantity: number; cost: number };
    grooming: { quantity: number; cost: number };
    addOns: { quantity: number; cost: number };
  };
}

/**
 * Calculate the subscription price based on configuration
 */
export function calculatePrice(config: SubscriptionConfig): PriceBreakdown {
  const tier = TIER_CONFIG[config.tier];
  const catMultiplier = CAT_TYPE_CONFIG[config.catType].feedingMultiplier;
  const durationConfig = DURATION_CONFIG[config.duration];

  // Calculate base quantities with cat type multiplier
  const wetFoodQty = Math.ceil(tier.baseWetCans * catMultiplier);
  const dryFoodQty = tier.baseDryKg * catMultiplier;
  const litterQty = Math.ceil(tier.baseLitterL * catMultiplier);
  const treatsQty = tier.treatsPerMonth;
  const gizzardQty = tier.gizzardMealsPerMonth;
  const toysQty = tier.toysPerMonth;
  const groomingQty = tier.groomingPerMonth;

  // Calculate base product costs
  const wetFoodCost = wetFoodQty * PRODUCT_COSTS.wetFood;
  const dryFoodCost = dryFoodQty * PRODUCT_COSTS.dryFood;
  const litterCost = litterQty * PRODUCT_COSTS.litter;
  const treatsCost = treatsQty * PRODUCT_COSTS.treats;
  const gizzardCost = gizzardQty * PRODUCT_COSTS.gizzardMeal;
  const toysCost = toysQty * PRODUCT_COSTS.toys;
  const groomingCost = groomingQty * PRODUCT_COSTS.grooming;

  // Calculate add-ons cost
  let addOnsCost = 0;
  let addOnsQty = 0;
  for (const addOn of ADD_ONS) {
    const qty = config.addOns[addOn.id] || 0;
    if (qty > 0) {
      addOnsCost += qty * addOn.unitCost;
      addOnsQty += qty;
    }
  }

  // Total product cost
  const productCost = wetFoodCost + dryFoodCost + litterCost + treatsCost +
                      gizzardCost + toysCost + groomingCost + addOnsCost;

  // Calculate overhead (8% of product cost)
  const overhead = productCost * FIXED_COSTS.overheadPercentage;

  // Operations cost (fixed per box)
  const operations = FIXED_COSTS.operationsPerBox;

  // Calculate required profit (20% minimum)
  const costBeforeProfit = productCost + overhead + operations;
  const profit = costBeforeProfit * FIXED_COSTS.minProfitMargin;

  // Subtotal before VAT adjustment
  const subtotal = costBeforeProfit + profit;

  // Apply VAT adjustment (divide by 0.971)
  const vatAdjustment = subtotal / FIXED_COSTS.vatAdjustment - subtotal;
  const monthlyPrice = subtotal + vatAdjustment;

  // Apply duration discount
  const discountAmount = monthlyPrice * durationConfig.discountPercentage;
  const finalMonthlyPrice = monthlyPrice - discountAmount;

  // Total price for the subscription period
  const totalPrice = finalMonthlyPrice * config.duration;

  // Calculate actual margin percentage
  const marginPercentage = (finalMonthlyPrice - productCost - overhead - operations) / finalMonthlyPrice;

  // Validate configuration (margin must be at least 20%)
  const isValidConfig = marginPercentage >= FIXED_COSTS.minProfitMargin;

  return {
    productCost: roundToTwo(productCost),
    overhead: roundToTwo(overhead),
    operations: roundToTwo(operations),
    profit: roundToTwo(profit),
    subtotal: roundToTwo(subtotal),
    vatAdjustment: roundToTwo(vatAdjustment),
    monthlyPrice: roundToTwo(monthlyPrice),
    durationDiscount: roundToTwo(discountAmount),
    finalMonthlyPrice: roundToTwo(finalMonthlyPrice),
    totalPrice: roundToTwo(totalPrice),
    isValidConfig,
    marginPercentage: roundToTwo(marginPercentage * 100),
    itemBreakdown: {
      wetFood: { quantity: wetFoodQty, cost: roundToTwo(wetFoodCost) },
      dryFood: { quantity: roundToTwo(dryFoodQty), cost: roundToTwo(dryFoodCost) },
      litter: { quantity: litterQty, cost: roundToTwo(litterCost) },
      treats: { quantity: treatsQty, cost: roundToTwo(treatsCost) },
      gizzardMeal: { quantity: gizzardQty, cost: roundToTwo(gizzardCost) },
      toys: { quantity: toysQty, cost: roundToTwo(toysCost) },
      grooming: { quantity: groomingQty, cost: roundToTwo(groomingCost) },
      addOns: { quantity: addOnsQty, cost: roundToTwo(addOnsCost) },
    },
  };
}

/**
 * Get the default configuration for a tier
 */
export function getDefaultConfig(tier: SubscriptionTier = 'premium'): SubscriptionConfig {
  return {
    tier,
    catType: 'adult',
    duration: 1,
    addOns: {},
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
 * Round to two decimal places
 */
function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Check if a configuration meets minimum profit margin
 */
export function isConfigProfitable(config: SubscriptionConfig): boolean {
  const breakdown = calculatePrice(config);
  return breakdown.isValidConfig;
}

/**
 * Get savings amount for a duration
 */
export function getSavingsForDuration(
  config: SubscriptionConfig,
  duration: SubscriptionDuration
): number {
  const baseConfig = { ...config, duration: 1 as SubscriptionDuration };
  const basePrice = calculatePrice(baseConfig).finalMonthlyPrice;

  const durationConfig = { ...config, duration };
  const durationPrice = calculatePrice(durationConfig).finalMonthlyPrice;

  return roundToTwo((basePrice - durationPrice) * duration);
}

/**
 * Get pre-defined package prices (for existing subscription component)
 */
export function getPackagePrices(): Record<string, { monthly: number; yearly: number }> {
  const tiers: SubscriptionTier[] = ['basic', 'premium', 'luxury', 'ultimate'];
  const packages: Record<string, { monthly: number; yearly: number }> = {};

  for (const tier of tiers) {
    const monthlyConfig: SubscriptionConfig = {
      tier,
      catType: 'adult',
      duration: 1,
      addOns: {},
    };
    const yearlyConfig: SubscriptionConfig = {
      tier,
      catType: 'adult',
      duration: 12,
      addOns: {},
    };

    packages[tier] = {
      monthly: calculatePrice(monthlyConfig).finalMonthlyPrice,
      yearly: calculatePrice(yearlyConfig).finalMonthlyPrice,
    };
  }

  return packages;
}

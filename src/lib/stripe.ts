import Stripe from "stripe";
import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js";

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// Client-side Stripe promise (singleton)
let stripePromise: Promise<StripeClient | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
  }
  return stripePromise;
};

// Price IDs for subscription tiers (create these in Stripe Dashboard)
export const STRIPE_PRICE_IDS = {
  // Monthly prices
  basic_monthly: "price_basic_monthly",
  premium_monthly: "price_premium_monthly",
  luxury_monthly: "price_luxury_monthly",
  ultimate_monthly: "price_ultimate_monthly",

  // 3-month prices (5% discount)
  basic_3month: "price_basic_3month",
  premium_3month: "price_premium_3month",
  luxury_3month: "price_luxury_3month",
  ultimate_3month: "price_ultimate_3month",

  // 6-month prices (10% discount)
  basic_6month: "price_basic_6month",
  premium_6month: "price_premium_6month",
  luxury_6month: "price_luxury_6month",
  ultimate_6month: "price_ultimate_6month",

  // 12-month prices (15% discount)
  basic_yearly: "price_basic_yearly",
  premium_yearly: "price_premium_yearly",
  luxury_yearly: "price_luxury_yearly",
  ultimate_yearly: "price_ultimate_yearly",
} as const;

// Helper to get price ID based on tier and duration
export function getPriceId(
  tier: "basic" | "premium" | "luxury" | "ultimate",
  duration: 1 | 3 | 6 | 12
): string {
  const durationKey = duration === 1 ? "monthly" :
                      duration === 3 ? "3month" :
                      duration === 6 ? "6month" : "yearly";

  return STRIPE_PRICE_IDS[`${tier}_${durationKey}` as keyof typeof STRIPE_PRICE_IDS];
}

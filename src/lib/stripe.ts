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
// Fixed monthly pricing model - all tiers are monthly only
export const STRIPE_PRICE_IDS = {
  basic: "price_basic_monthly",
  premium: "price_premium_monthly",
  luxury: "price_luxury_monthly",
  ultimate: "price_ultimate_monthly",
} as const;

// Helper to get price ID based on tier
export function getPriceId(
  tier: "basic" | "premium" | "luxury" | "ultimate"
): string {
  return STRIPE_PRICE_IDS[tier];
}

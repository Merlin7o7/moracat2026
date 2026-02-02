import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import {
  calculatePrice,
  type SubscriptionConfig,
  TIER_CONFIG,
  CAT_TYPE_CONFIG,
  DURATION_CONFIG,
  ADD_ONS,
} from "@/lib/pricing";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const config: SubscriptionConfig = body.config;

    if (!config || !config.tier || !config.catType || !config.duration) {
      return NextResponse.json(
        { error: "Invalid subscription configuration" },
        { status: 400 }
      );
    }

    // Calculate the price
    const priceBreakdown = calculatePrice(config);
    const tierConfig = TIER_CONFIG[config.tier];
    const catConfig = CAT_TYPE_CONFIG[config.catType];
    const durationConfig = DURATION_CONFIG[config.duration];

    // Build line items description
    const description = [
      `${tierConfig.label} Package`,
      `Cat Type: ${catConfig.label}`,
      `Duration: ${durationConfig.label}`,
    ].join(" | ");

    // Build add-ons description
    const addOnItems = Object.entries(config.addOns)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const addOn = ADD_ONS.find((a) => a.id === id);
        return addOn ? `${addOn.label} x${qty}` : null;
      })
      .filter(Boolean);

    const fullDescription = addOnItems.length > 0
      ? `${description} | Add-ons: ${addOnItems.join(", ")}`
      : description;

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer_email: session?.user?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "sar",
            product_data: {
              name: `Moracat ${tierConfig.label} Subscription`,
              description: fullDescription,
              images: ["https://moracat.co/og-image.png"],
            },
            unit_amount: Math.round(priceBreakdown.finalMonthlyPrice * 100), // Convert to halalas
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          tier: config.tier,
          catType: config.catType,
          duration: config.duration.toString(),
          addOns: JSON.stringify(config.addOns),
          userId: session?.user?.id || "",
        },
      },
      metadata: {
        tier: config.tier,
        catType: config.catType,
        duration: config.duration.toString(),
      },
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/#builder?canceled=true`,
      allow_promotion_codes: true,
      locale: "auto",
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

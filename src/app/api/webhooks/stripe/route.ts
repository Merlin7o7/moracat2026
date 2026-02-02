import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "customer.subscription.created": {
        const subscription = event.data.object;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const customerEmail = session.customer_email;
  const metadata = session.metadata;

  console.log("Checkout completed:", {
    customerId,
    subscriptionId,
    customerEmail,
    metadata,
  });

  // Find user by email and update with Stripe customer ID
  if (customerEmail) {
    await db.user.updateMany({
      where: { email: customerEmail },
      data: {
        stripeCustomerId: customerId,
      },
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionCreated(subscription: any) {
  const customerId = subscription.customer as string;
  const metadata = subscription.metadata || {};

  console.log("Subscription created:", {
    subscriptionId: subscription.id,
    customerId,
    status: subscription.status,
    metadata,
  });

  // Find user by Stripe customer ID and create/update subscription record
  const user = await db.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (user) {
    const periodStart = subscription.current_period_start
      ? new Date(subscription.current_period_start * 1000)
      : null;
    const periodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : null;

    await db.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items?.data?.[0]?.price?.id || "",
        status: subscription.status || "active",
        tier: metadata.tier || "premium",
        catType: metadata.catType || "adult",
        duration: parseInt(metadata.duration || "1"),
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      },
      update: {
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items?.data?.[0]?.price?.id || "",
        status: subscription.status || "active",
        tier: metadata.tier || "premium",
        catType: metadata.catType || "adult",
        duration: parseInt(metadata.duration || "1"),
        currentPeriodStart: periodStart,
        currentPeriodEnd: periodEnd,
      },
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdated(subscription: any) {
  console.log("Subscription updated:", {
    subscriptionId: subscription.id,
    status: subscription.status,
  });

  const periodStart = subscription.current_period_start
    ? new Date(subscription.current_period_start * 1000)
    : undefined;
  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000)
    : undefined;

  await db.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status,
      ...(periodStart && { currentPeriodStart: periodStart }),
      ...(periodEnd && { currentPeriodEnd: periodEnd }),
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(subscription: any) {
  console.log("Subscription deleted:", {
    subscriptionId: subscription.id,
  });

  await db.subscription.updateMany({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: "canceled",
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentSucceeded(invoice: any) {
  console.log("Payment succeeded:", {
    invoiceId: invoice.id,
    subscriptionId: invoice.subscription,
    amountPaid: invoice.amount_paid,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(invoice: any) {
  console.log("Payment failed:", {
    invoiceId: invoice.id,
    subscriptionId: invoice.subscription,
  });

  // Update subscription status
  if (invoice.subscription) {
    await db.subscription.updateMany({
      where: { stripeSubscriptionId: invoice.subscription as string },
      data: {
        status: "past_due",
      },
    });
  }
}

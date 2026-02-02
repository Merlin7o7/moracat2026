"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui";

const faqItems = [
  {
    title: "What makes Moracat different from other cat food brands?",
    content:
      "Moracat is specifically designed for the Saudi market with premium, vet-approved ingredients. We use no artificial preservatives or fillers, and all our recipes are formulated by veterinary nutritionists. Plus, we offer convenient doorstep delivery across all of KSA.",
  },
  {
    title: "How do I know which food is right for my cat?",
    content:
      "When you sign up, we'll ask about your cat's age, breed, weight, and any dietary requirements. Our nutrition experts will recommend the perfect formula. You can also consult our in-house vets for personalized advice at no extra cost.",
  },
  {
    title: "Can I change my subscription plan?",
    content:
      "Absolutely! You can upgrade, downgrade, pause, or cancel your subscription at any time through your account dashboard. Changes take effect from your next billing cycle. No penalties or hidden fees.",
  },
  {
    title: "How fresh is the food, and how is it stored?",
    content:
      "Our food is freshly prepared and packaged in temperature-controlled facilities. We use nitrogen-flushed packaging to preserve freshness without artificial preservatives. Store in a cool, dry place and use within 4 weeks of opening for optimal nutrition.",
  },
  {
    title: "Do you deliver to all areas in Saudi Arabia?",
    content:
      "Yes! We deliver to all major cities and regions across Saudi Arabia, including Riyadh, Jeddah, Dammam, Makkah, Madinah, and more. Delivery is free on all subscription orders.",
  },
  {
    title: "What if my cat doesn't like the food?",
    content:
      "We offer a 30-day satisfaction guarantee. If your cat doesn't love our food, contact us within 30 days of delivery, and we'll either exchange it for a different formula or provide a full refund - no questions asked.",
  },
  {
    title: "Is your packaging eco-friendly?",
    content:
      "Yes! We're committed to sustainability. Our packaging is made from recycled materials and is fully recyclable. Our delivery boxes are designed to be reused or easily recycled.",
  },
  {
    title: "Can I purchase one-time orders without subscribing?",
    content:
      "Of course! While subscriptions offer the best value with free delivery and discounts, you can also make one-time purchases from our products page. Standard delivery fees apply for non-subscription orders.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re
              looking for, feel free to contact our support team.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion items={faqItems} />
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <p className="text-gray-600 mb-2">Still have questions?</p>
            <a
              href="mailto:hello@moracat.sa"
              className="inline-flex items-center gap-2 text-[var(--brand-green)] font-semibold hover:text-[var(--brand-orange)] transition-colors"
            >
              Contact our support team
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

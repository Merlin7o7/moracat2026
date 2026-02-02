"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui";

const plans = [
  {
    name: "Monthly",
    arabicName: "شهري",
    price: 299,
    period: "/month",
    description: "Perfect for trying out our service",
    features: [
      "Free delivery across KSA",
      "Personalized nutrition plan",
      "Premium cat food (4kg/month)",
      "Email support",
      "Cancel anytime",
    ],
    popular: false,
    savings: null,
  },
  {
    name: "Quarterly",
    arabicName: "ربع سنوي",
    price: 269,
    period: "/month",
    description: "Most popular choice for cat parents",
    features: [
      "Everything in Monthly",
      "Priority delivery",
      "Premium cat food (4kg/month)",
      "WhatsApp support",
      "Free treats included",
      "10% savings",
    ],
    popular: true,
    savings: "Save 10%",
  },
  {
    name: "Annual",
    arabicName: "سنوي",
    price: 239,
    period: "/month",
    description: "Best value for dedicated cat lovers",
    features: [
      "Everything in Quarterly",
      "VIP delivery scheduling",
      "Premium cat food (4kg/month)",
      "24/7 priority support",
      "Monthly surprise gifts",
      "Exclusive member perks",
      "20% savings",
    ],
    popular: false,
    savings: "Save 20%",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Subscription() {
  return (
    <section id="subscription" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
            Subscription Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Flexible subscription options to suit every cat parent.
            All plans include free delivery and personalized nutrition.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-[var(--brand-green)] text-white shadow-2xl scale-105"
                  : "bg-[var(--brand-beige)] hover:shadow-xl"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-[var(--brand-orange)] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Savings Badge */}
              {plan.savings && !plan.popular && (
                <div className="absolute -top-3 right-4">
                  <div className="bg-[var(--brand-orange)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {plan.savings}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.popular ? "text-white" : "text-[var(--brand-green)]"
                  }`}
                >
                  {plan.name}
                </h3>
                <span
                  className={`text-sm ${
                    plan.popular ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {plan.arabicName}
                </span>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-end justify-center gap-1">
                  <span
                    className={`text-4xl md:text-5xl font-bold ${
                      plan.popular ? "text-white" : "text-[var(--brand-green)]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-lg mb-1 ${
                      plan.popular ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    SAR{plan.period}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    plan.popular ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular
                          ? "bg-white/20"
                          : "bg-[var(--brand-green)]/10"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular
                            ? "text-white"
                            : "text-[var(--brand-green)]"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant={plan.popular ? "primary" : "secondary"}
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-[var(--brand-green)] hover:bg-white/90"
                    : ""
                }`}
                onClick={() => {
                  const element = document.querySelector("#waitlist");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-10"
        >
          All plans include a 30-day satisfaction guarantee. No questions asked.
        </motion.p>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { TIER_CONFIG, type SubscriptionTier, getTierFeatures } from "@/lib/pricing";

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
  const { language, isRTL } = useLanguage();
  const sub = translations.subscription;
  const common = translations.common;

  const tiers: SubscriptionTier[] = ['basic', 'premium', 'luxury', 'ultimate'];

  const scrollToWaitlist = () => {
    const element = document.querySelector("#waitlist");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="subscription"
      className="py-20 md:py-32 bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
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
            {sub.badge[language]}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            {sub.title[language]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {sub.subtitle[language]}
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {tiers.map((tierKey) => {
            const tier = TIER_CONFIG[tierKey];
            const features = getTierFeatures(tierKey, language);

            return (
              <motion.div
                key={tierKey}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl p-6 transition-all duration-300 ${
                  tier.isPopular
                    ? "bg-[var(--brand-green)] text-white shadow-2xl md:scale-105"
                    : "bg-[var(--brand-beige)] hover:shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 bg-[var(--brand-orange)] text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      <Sparkles className="w-4 h-4" />
                      {common.popular[language]}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-4 pt-2">
                  <h3
                    className={`text-xl font-bold mb-1 ${
                      tier.isPopular ? "text-white" : "text-[var(--brand-green)]"
                    }`}
                  >
                    {tier.label}
                  </h3>
                  <p
                    className={`text-sm ${
                      tier.isPopular ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    {language === 'ar' ? tier.descriptionAr : tier.description}
                  </p>
                </div>

                {/* Price with Retail Comparison */}
                <div className="text-center mb-6">
                  {/* Retail Value (crossed out) */}
                  <div className={`flex items-center justify-center gap-2 mb-1 ${
                    tier.isPopular ? "text-white/60" : "text-gray-400"
                  }`}>
                    <Tag className="w-3 h-3" />
                    <span className="text-sm line-through">
                      {tier.retailValue} {common.sar[language]}
                    </span>
                    <span className="text-xs">
                      {language === 'en' ? 'Retail' : 'التجزئة'}
                    </span>
                  </div>

                  {/* Moracat Price */}
                  <div className="flex items-end justify-center gap-1">
                    <span
                      className={`text-3xl md:text-4xl font-bold ${
                        tier.isPopular ? "text-white" : "text-[var(--brand-green)]"
                      }`}
                    >
                      {tier.fixedPrice}
                    </span>
                    <span
                      className={`text-sm mb-1 ${
                        tier.isPopular ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {common.sar[language]}{common.perMonth[language]}
                    </span>
                  </div>

                  {/* Savings Badge */}
                  <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                    tier.isPopular
                      ? "bg-[var(--brand-orange)] text-white"
                      : "bg-[var(--brand-green)]/10 text-[var(--brand-green)]"
                  }`}>
                    {common.save[language]} {Math.round(((tier.retailValue - tier.fixedPrice) / tier.retailValue) * 100)}%
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          tier.isPopular
                            ? "bg-white/20"
                            : "bg-[var(--brand-green)]/10"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            tier.isPopular
                              ? "text-white"
                              : "text-[var(--brand-green)]"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm ${
                          tier.isPopular ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={tier.isPopular ? "primary" : "secondary"}
                  className={`w-full ${
                    tier.isPopular
                      ? "bg-white text-[var(--brand-green)] hover:bg-white/90"
                      : ""
                  }`}
                  onClick={scrollToWaitlist}
                >
                  {sub.choosePlan[language]}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Savings Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[var(--brand-green)] font-medium mt-10"
        >
          {sub.savingsNote[language]}
        </motion.p>

        {/* Partner Brands Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-sm mt-4"
        >
          {language === 'en'
            ? 'Featuring premium brands: Josera, Applaws, BioSand, Churu, Kit Cat'
            : 'تضم علامات تجارية فاخرة: جوسيرا، أبلاوز، بايوساند، تشورو، كيت كات'}
        </motion.p>
      </div>
    </section>
  );
}

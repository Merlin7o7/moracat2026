"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const plans = [
  {
    id: "basic",
    name: { en: "Essential", ar: "الأساسية" },
    price: 260,
    image: "/images/plan-basic.png",
    features: {
      en: ["30 wet food cans", "2.5kg dry food", "12L premium litter"],
      ar: ["30 علبة طعام رطب", "2.5 كجم طعام جاف", "12 لتر رمل فاخر"],
    },
  },
  {
    id: "premium",
    name: { en: "Premium", ar: "المتميزة" },
    price: 305,
    image: "/images/plan-premium.png",
    popular: true,
    features: {
      en: ["30 wet food cans", "2.5kg dry food", "12L premium litter", "1 treat pack"],
      ar: ["30 علبة طعام رطب", "2.5 كجم طعام جاف", "12 لتر رمل فاخر", "عبوة مكافآت"],
    },
  },
  {
    id: "ultimate",
    name: { en: "Royal", ar: "الملكية" },
    price: 430,
    image: "/images/plan-ultimate.png",
    features: {
      en: ["30 wet food cans", "2.5kg dry food", "12L premium litter", "2 treat packs", "1 toy", "1 grooming item"],
      ar: ["30 علبة طعام رطب", "2.5 كجم طعام جاف", "12 لتر رمل فاخر", "عبوتين مكافآت", "لعبة واحدة", "أداة عناية"],
    },
  },
];

export function BoxShowcase() {
  const { language, isRTL } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[1];

  return (
    <section
      id="box-showcase"
      className="py-20 md:py-32 bg-[#1a1a1a]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
            {language === "en" ? "See What's Inside" : "شاهد محتويات الصندوق"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {language === "en" ? "Your Monthly Box" : "صندوقك الشهري"}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {language === "en"
              ? "Premium products, carefully curated for your cat's health and happiness"
              : "منتجات فاخرة، منتقاة بعناية لصحة وسعادة قطتك"}
          </p>
        </motion.div>

        {/* Plan Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative px-6 py-3 rounded-full font-semibold transition-all ${
                selectedPlan === plan.id
                  ? "bg-[var(--brand-green)] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {plan.popular && selectedPlan === plan.id && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--brand-orange)] rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </span>
              )}
              {plan.name[language]}
            </button>
          ))}
        </div>

        {/* Product Image */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPlan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src={currentPlan.image}
                  alt={`${currentPlan.name[language]} plan contents`}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>

              {/* Info Overlay */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`absolute bottom-6 ${isRTL ? "left-6" : "right-6"} bg-white rounded-2xl p-6 shadow-2xl max-w-xs`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[var(--brand-green)]">
                    {currentPlan.name[language]}
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[var(--brand-green)]">
                      {currentPlan.price}
                    </span>
                    <span className="text-sm text-gray-500 block">
                      {language === "en" ? "SAR/month" : "ر.س/شهرياً"}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {currentPlan.features[language].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[var(--brand-green)] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-10 text-sm"
        >
          {language === "en"
            ? "* Product brands may vary based on availability. Quality always guaranteed."
            : "* قد تختلف العلامات التجارية حسب التوفر. الجودة مضمونة دائماً."}
        </motion.p>
      </div>
    </section>
  );
}

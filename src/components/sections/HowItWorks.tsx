"use client";

import { motion } from "framer-motion";
import { Cat, Package, Truck, Heart } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export function HowItWorks() {
  const { language, isRTL } = useLanguage();
  const hiw = translations.howItWorks;

  const steps = [
    {
      icon: Cat,
      number: "01",
      titleKey: "step1Title" as const,
      descKey: "step1Desc" as const,
      color: "var(--brand-orange)",
    },
    {
      icon: Package,
      number: "02",
      titleKey: "step2Title" as const,
      descKey: "step2Desc" as const,
      color: "var(--brand-green)",
    },
    {
      icon: Truck,
      number: "03",
      titleKey: "step3Title" as const,
      descKey: "step3Desc" as const,
      color: "var(--brand-pink)",
    },
    {
      icon: Heart,
      number: "04",
      titleKey: "step4Title" as const,
      descKey: "step4Desc" as const,
      color: "var(--brand-green)",
    },
  ];

  return (
    <section
      id="how-it-works"
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
            {hiw.badge[language]}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            {hiw.title[language]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {hiw.subtitle[language]}
          </p>
        </motion.div>

        {/* Steps Grid - 2x2 on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative text-center"
            >
              {/* Step Card */}
              <div className="bg-[var(--brand-beige)] rounded-3xl p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 h-full">
                {/* Icon Container */}
                <div className="relative mx-auto w-16 h-16 md:w-20 md:h-20 mb-6">
                  <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{ backgroundColor: step.color }}
                  />
                  <div
                    className="absolute inset-2 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: step.color }}
                  >
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span
                      className="text-xs md:text-sm font-bold"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold text-[var(--brand-green)] mb-3">
                  {hiw[step.titleKey][language]}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {hiw[step.descKey][language]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

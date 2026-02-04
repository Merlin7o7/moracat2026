"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Scale,
  BadgeCheck,
  Percent,
  MessageCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const features = [
  {
    icon: Scale,
    titleKey: "feature1Title" as const,
    descKey: "feature1Desc" as const,
    color: "var(--brand-green)",
  },
  {
    icon: BadgeCheck,
    titleKey: "feature2Title" as const,
    descKey: "feature2Desc" as const,
    color: "var(--brand-orange)",
  },
  {
    icon: Percent,
    titleKey: "feature3Title" as const,
    descKey: "feature3Desc" as const,
    color: "var(--brand-pink)",
  },
  {
    icon: MessageCircle,
    titleKey: "feature4Title" as const,
    descKey: "feature4Desc" as const,
    color: "var(--brand-green)",
  },
];

export function VetSupport() {
  const { language, isRTL } = useLanguage();
  const vet = translations.vetSupport;
  const common = translations.common;

  const scrollToWaitlist = () => {
    const element = document.querySelector("#waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="vet-support"
      className="py-20 md:py-32 bg-gradient-to-b from-white to-[var(--brand-beige)]"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--brand-green)]/10 px-4 py-2 rounded-full mb-6">
            <Stethoscope className="w-4 h-4 text-[var(--brand-green)]" />
            <span className="text-sm font-medium text-[var(--brand-green)]">
              {vet.badge[language]}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            {vet.title[language]}
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {vet.subtitle[language]}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    className="w-6 h-6"
                    style={{ color: feature.color }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--brand-green)] mb-2">
                    {vet[feature.titleKey][language]}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {vet[feature.descKey][language]}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[var(--brand-green)] rounded-2xl p-6 md:p-8 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-[var(--brand-orange)]" />
              <span className="text-lg font-medium">
                {vet.note[language]}
              </span>
            </div>

            <Button
              onClick={scrollToWaitlist}
              variant="outline"
              size="lg"
              className="bg-white text-[var(--brand-green)] border-white hover:bg-white/90 hover:text-[var(--brand-green)]"
            >
              {common.joinWaitlist[language]}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

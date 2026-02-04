"use client";

import { motion } from "framer-motion";
import { MapPin, Shield, Truck, RefreshCw } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function About() {
  const { language, isRTL } = useLanguage();
  const about = translations.about;

  const features = [
    {
      icon: MapPin,
      titleKey: "feature1" as const,
      descKey: "feature1Desc" as const,
      color: "var(--brand-orange)",
    },
    {
      icon: Shield,
      titleKey: "feature2" as const,
      descKey: "feature2Desc" as const,
      color: "var(--brand-green)",
    },
    {
      icon: Truck,
      titleKey: "feature3" as const,
      descKey: "feature3Desc" as const,
      color: "var(--brand-pink)",
    },
    {
      icon: RefreshCw,
      titleKey: "feature4" as const,
      descKey: "feature4Desc" as const,
      color: "var(--brand-green)",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
              {about.badge[language]}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
              {about.title[language]}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {about.subtitle[language]}
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--brand-green)] rounded-3xl p-8 md:p-10 text-white text-center mb-12"
          >
            <div className="text-4xl mb-4">🇸🇦</div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              {about.mission[language]}
            </h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {about.missionText[language]}
            </p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <span className="text-3xl font-bold">مرقط</span>
              <p className="text-white/60 text-sm mt-1">Moracat</p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
                    <h4 className="font-bold text-[var(--brand-green)] mb-1">
                      {about[feature.titleKey][language]}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {about[feature.descKey][language]}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

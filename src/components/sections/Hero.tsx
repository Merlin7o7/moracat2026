"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Truck, Calculator } from "lucide-react";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function Hero() {
  const { language, isRTL } = useLanguage();
  const hero = translations.hero;
  const common = translations.common;

  const scrollToWaitlist = () => {
    const element = document.querySelector("#waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCalculator = () => {
    const element = document.querySelector("#builder");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Pattern - pointer-events-none to allow clicks through */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[var(--brand-orange)]" />
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-[var(--brand-pink)]" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 rounded-full bg-[var(--brand-green)]" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 rounded-full bg-[var(--brand-orange)]" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-6"
            >
              <Sparkles className="w-4 h-4 text-[var(--brand-orange)]" />
              <span className="text-sm font-medium text-[var(--brand-green)]">
                {hero.badge[language]}
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--brand-green)] leading-tight mb-6">
              {hero.title1[language]}{" "}
              <span className="text-[var(--brand-orange)]">{hero.title2[language]}</span>{" "}
              {hero.title3[language]}
            </h1>

            {/* Subheading */}
            <p className={`text-lg md:text-xl text-gray-700 mb-8 max-w-xl ${isRTL ? "mr-auto lg:mr-0" : "mx-auto lg:mx-0"}`}>
              {hero.subtitle[language]}
            </p>

            {/* CTA Buttons - Primary: Join Waitlist, Secondary: Calculator */}
            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}>
              <Button
                onClick={scrollToWaitlist}
                variant="primary"
                size="lg"
                className="group w-full sm:w-auto"
              >
                {hero.ctaPrimary[language]}
                <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`} />
              </Button>
              <Button
                onClick={scrollToCalculator}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Calculator className="w-5 h-5" />
                {hero.ctaSecondary[language]}
              </Button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={`flex flex-wrap gap-6 mt-10 ${isRTL ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-5 h-5 text-[var(--brand-green)]" />
                <span>{hero.trustBadge1[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-5 h-5 text-[var(--brand-orange)]" />
                <span>{hero.trustBadge2[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-5 h-5 text-[var(--brand-pink)]" />
                <span>{hero.trustBadge3[language]}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Subscription Box Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative z-10"
            >
              {/* Subscription Box 3D Image */}
              <div className="relative w-full max-w-lg mx-auto">
                <Image
                  src="/images/box-3d.png"
                  alt="MoraCat Subscription Box"
                  width={600}
                  height={600}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-5 right-5 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <span className="text-3xl">🐱</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-5 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl">❤️</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
              className="absolute top-1/2 -right-5 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <span className="text-xl">✨</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

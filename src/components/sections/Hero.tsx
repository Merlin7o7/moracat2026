"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Shield } from "lucide-react";
import Link from "next/link";
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

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
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

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? "justify-center lg:justify-end" : "justify-center lg:justify-start"}`}>
              <Link href="/start">
                <Button
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  {common.startNow[language]}
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </Link>
              <Button
                onClick={() => {
                  const element = document.querySelector("#how-it-works");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                variant="outline"
                size="lg"
              >
                {common.learnMore[language]}
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
                <span>{hero.stat3Label[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Heart className="w-5 h-5 text-[var(--brand-pink)]" />
                <span>{language === "en" ? "Made with Love" : "صنع بحب"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sparkles className="w-5 h-5 text-[var(--brand-orange)]" />
                <span>{language === "en" ? "Premium Ingredients" : "مكونات فاخرة"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Cat Illustration */}
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
              {/* Cat Food Bowl Illustration */}
              <div className="relative w-full max-w-md mx-auto aspect-square">
                {/* Main Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-pink)] to-[var(--brand-orange)]/30 rounded-full" />

                {/* Cat Silhouette */}
                <div className="absolute inset-8 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    fill="none"
                  >
                    {/* Cat face outline */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="var(--brand-green)"
                    />
                    {/* Ears */}
                    <path
                      d="M50 60 L70 100 L30 100 Z"
                      fill="var(--brand-green)"
                    />
                    <path
                      d="M150 60 L170 100 L130 100 Z"
                      fill="var(--brand-green)"
                    />
                    {/* Inner ears */}
                    <path
                      d="M55 70 L68 95 L42 95 Z"
                      fill="var(--brand-pink)"
                    />
                    <path
                      d="M145 70 L158 95 L132 95 Z"
                      fill="var(--brand-pink)"
                    />
                    {/* Eyes */}
                    <ellipse
                      cx="75"
                      cy="95"
                      rx="12"
                      ry="15"
                      fill="var(--brand-orange)"
                    />
                    <ellipse
                      cx="125"
                      cy="95"
                      rx="12"
                      ry="15"
                      fill="var(--brand-orange)"
                    />
                    {/* Pupils */}
                    <ellipse cx="75" cy="95" rx="5" ry="12" fill="black" />
                    <ellipse cx="125" cy="95" rx="5" ry="12" fill="black" />
                    {/* Nose */}
                    <path
                      d="M100 115 L95 125 L105 125 Z"
                      fill="var(--brand-pink)"
                    />
                    {/* Mouth */}
                    <path
                      d="M100 125 Q95 135 85 130"
                      stroke="var(--brand-beige)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M100 125 Q105 135 115 130"
                      stroke="var(--brand-beige)"
                      strokeWidth="3"
                      fill="none"
                    />
                    {/* Whiskers */}
                    <line
                      x1="40"
                      y1="110"
                      x2="70"
                      y2="115"
                      stroke="var(--brand-beige)"
                      strokeWidth="2"
                    />
                    <line
                      x1="40"
                      y1="120"
                      x2="70"
                      y2="120"
                      stroke="var(--brand-beige)"
                      strokeWidth="2"
                    />
                    <line
                      x1="40"
                      y1="130"
                      x2="70"
                      y2="125"
                      stroke="var(--brand-beige)"
                      strokeWidth="2"
                    />
                    <line
                      x1="160"
                      y1="110"
                      x2="130"
                      y2="115"
                      stroke="var(--brand-beige)"
                      strokeWidth="2"
                    />
                    <line
                      x1="160"
                      y1="120"
                      x2="130"
                      y2="120"
                      stroke="var(--brand-beige)"
                      strokeWidth="2"
                    />
                    <line
                      x1="160"
                      y1="130"
                      x2="130"
                      y2="125"
                      stroke="var(--brand-beige)"
                      strokeWidth="2"
                    />
                    {/* Crown */}
                    <path
                      d="M70 45 L75 25 L85 40 L100 15 L115 40 L125 25 L130 45"
                      fill="var(--brand-orange)"
                      stroke="var(--brand-orange)"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-10 right-10 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <span className="text-3xl">🐱</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-20 left-10 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl">❤️</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
              className="absolute top-1/2 right-0 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
            >
              <span className="text-xl">✨</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

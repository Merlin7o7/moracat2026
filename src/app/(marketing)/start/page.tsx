"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Package, Wrench, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button, Card, LanguageToggle } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const options = [
  {
    id: "quick",
    icon: Package,
    titleKey: "option1Title" as const,
    descKey: "option1Desc" as const,
    href: "/#subscription",
    color: "var(--brand-green)",
    bgColor: "bg-[var(--brand-green)]/10",
  },
  {
    id: "custom",
    icon: Wrench,
    titleKey: "option2Title" as const,
    descKey: "option2Desc" as const,
    href: "/#builder",
    color: "var(--brand-orange)",
    bgColor: "bg-[var(--brand-orange)]/10",
  },
  {
    id: "contact",
    icon: MessageCircle,
    titleKey: "option3Title" as const,
    descKey: "option3Desc" as const,
    href: "/#waitlist",
    color: "var(--brand-pink)",
    bgColor: "bg-[var(--brand-pink)]/20",
  },
];

export default function StartPage() {
  const { language, isRTL } = useLanguage();
  const t = translations.startNow;
  const common = translations.common;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--brand-beige)]/50 to-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Moracat"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <LanguageToggle variant="pill" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                className="w-20 h-20 rounded-full bg-[var(--brand-green)]/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Sparkles className="w-10 h-10 text-[var(--brand-green)]" />
              </motion.div>
            </div>
            <h1
              className="text-3xl md:text-5xl font-bold text-[var(--brand-green)] mb-4"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {t.title[language]}
            </h1>
            <p
              className="text-lg text-gray-600 max-w-xl mx-auto"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {t.subtitle[language]}
            </p>
          </motion.div>

          {/* Options Grid */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link href={option.href}>
                  <Card
                    className="h-full p-6 hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${option.bgColor} flex items-center justify-center mb-4`}
                    >
                      <option.icon
                        className="w-7 h-7"
                        style={{ color: option.color }}
                      />
                    </div>
                    <h3
                      className="text-xl font-bold text-[var(--brand-green)] mb-2"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {t[option.titleKey][language]}
                    </h3>
                    <p
                      className="text-gray-600 mb-4"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {t[option.descKey][language]}
                    </p>
                    <div
                      className={`flex items-center gap-2 text-[var(--brand-orange)] font-medium group-hover:gap-3 transition-all ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span>{common.startNow[language]}</span>
                      <ArrowRight
                        className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                      />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Access Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-500 mb-4" dir={isRTL ? "rtl" : "ltr"}>
              {language === "en"
                ? "Already have an account?"
                : "لديك حساب بالفعل؟"}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button variant="outline" size="md">
                  {common.login[language]}
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="md">
                  {common.register[language]}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-[var(--brand-green)] transition-colors"
            >
              {language === "en" ? "← Back to Homepage" : "→ العودة للصفحة الرئيسية"}
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface LanguageToggleProps {
  variant?: "default" | "minimal" | "pill";
  className?: string;
}

export function LanguageToggle({ variant = "default", className = "" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage();

  if (variant === "minimal") {
    return (
      <motion.button
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 text-sm font-medium text-[var(--brand-green)] hover:text-[var(--brand-orange)] transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
      >
        <Globe className="w-4 h-4" />
        <span>{language === "en" ? "عربي" : "EN"}</span>
      </motion.button>
    );
  }

  if (variant === "pill") {
    return (
      <motion.div
        className={`relative flex items-center bg-gray-100 rounded-full p-1 ${className}`}
        initial={false}
      >
        <button
          onClick={() => language !== "en" && toggleLanguage()}
          className={`relative z-10 px-3 py-1 text-sm font-medium rounded-full transition-colors ${
            language === "en" ? "text-white" : "text-gray-600"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => language !== "ar" && toggleLanguage()}
          className={`relative z-10 px-3 py-1 text-sm font-medium rounded-full transition-colors ${
            language === "ar" ? "text-white" : "text-gray-600"
          }`}
        >
          عربي
        </button>
        <motion.div
          className="absolute top-1 bottom-1 bg-[var(--brand-green)] rounded-full"
          initial={false}
          animate={{
            x: language === "en" ? 0 : "100%",
            width: language === "en" ? "calc(50% - 4px)" : "calc(50% - 4px)",
          }}
          style={{ left: 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-gray-200 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Switch to ${language === "en" ? "Arabic" : "English"}`}
    >
      <Globe className="w-4 h-4 text-[var(--brand-green)]" />
      <span className="text-sm font-medium text-[var(--brand-green)]">
        {language === "en" ? "العربية" : "English"}
      </span>
    </motion.button>
  );
}

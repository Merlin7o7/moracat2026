"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { type Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "moracat-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && (stored === "en" || stored === "ar")) {
      setLanguageState(stored);
    }
    setMounted(true);
  }, []);

  // Update localStorage and document direction when language changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  const isRTL = language === "ar";

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{ language: "en", setLanguage, toggleLanguage, isRTL: false }}
      >
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/**
 * Hook to get translations with current language
 */
export function useTranslation() {
  const { language, isRTL } = useLanguage();

  const t = useCallback(
    <T extends Record<string, { en: string; ar: string }>>(
      translations: T,
      key: keyof T
    ): string => {
      const translation = translations[key];
      return translation?.[language] || String(key);
    },
    [language]
  );

  return { t, language, isRTL };
}

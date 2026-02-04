"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calculator } from "lucide-react";
import Image from "next/image";
import { Button, LanguageToggle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const navLinks = [
  { href: "#how-it-works", labelKey: "howItWorks" as const },
  { href: "#products", labelKey: "products" as const },
  { href: "#subscription", labelKey: "subscription" as const },
  { href: "#vet-support", labelKey: "vetSupport" as const },
  { href: "#about", labelKey: "about" as const },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, isRTL } = useLanguage();
  const nav = translations.nav;
  const common = translations.common;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Enlarged with breathing room */}
          <motion.a
            href="/"
            className="flex items-center py-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="/logo.png"
              alt="Moracat - مرقط"
              width={180}
              height={60}
              className="h-12 w-auto md:h-16 lg:h-[72px] object-contain"
              priority
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-[var(--brand-green)] font-medium hover:text-[var(--brand-orange)] transition-colors duration-300 relative group"
              >
                {nav[link.labelKey][language]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--brand-orange)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle variant="minimal" />
            <Button
              onClick={() => scrollToSection("#builder")}
              variant="outline"
              size="sm"
            >
              <Calculator className="w-4 h-4" />
              {nav.calculator[language]}
            </Button>
            <Button
              onClick={() => scrollToSection("#waitlist")}
              variant="primary"
              size="md"
            >
              {common.joinWaitlist[language]}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle variant="minimal" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[var(--brand-green)]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              aria-label="Mobile navigation"
            >
              <div className="py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-[var(--brand-green)] font-medium py-2 hover:text-[var(--brand-orange)] transition-colors duration-300 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {nav[link.labelKey][language]}
                  </button>
                ))}
                <div className="flex flex-col gap-2 mt-2">
                  <Button
                    onClick={() => scrollToSection("#builder")}
                    variant="outline"
                    className="w-full"
                  >
                    <Calculator className="w-4 h-4" />
                    {nav.calculator[language]}
                  </Button>
                  <Button
                    onClick={() => scrollToSection("#waitlist")}
                    variant="primary"
                  >
                    {common.joinWaitlist[language]}
                  </Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

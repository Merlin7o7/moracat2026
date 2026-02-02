"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Package, Sparkles, User, Menu } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface NavItem {
  id: string;
  href: string;
  icon: typeof Home;
  labelEn: string;
  labelAr: string;
  isSection?: boolean;
}

const navItems: NavItem[] = [
  { id: "home", href: "#", icon: Home, labelEn: "Home", labelAr: "الرئيسية", isSection: true },
  { id: "products", href: "#products", icon: Package, labelEn: "Products", labelAr: "المنتجات", isSection: true },
  { id: "builder", href: "#builder", icon: Sparkles, labelEn: "Builder", labelAr: "الباقة", isSection: true },
  { id: "account", href: "/login", icon: User, labelEn: "Account", labelAr: "حسابي", isSection: false },
];

export function MobileNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Determine active section
      const sections = ["home", "products", "builder", "waitlist"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section) ||
                        (section === "home" ? document.body : null);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (item: NavItem) => {
    if (item.isSection) {
      const element = item.href === "#"
        ? document.body
        : document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg safe-area-inset-bottom"
        >
          <div className="flex items-center justify-around py-2 px-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              const content = (
                <motion.div
                  className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors ${
                    isActive
                      ? "text-[var(--brand-green)]"
                      : "text-gray-500"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative">
                    <Icon className="w-6 h-6" />
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--brand-orange)]"
                      />
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium">
                    {language === "ar" ? item.labelAr : item.labelEn}
                  </span>
                </motion.div>
              );

              if (item.isSection) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className="focus:outline-none"
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link key={item.id} href={item.href}>
                  {content}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

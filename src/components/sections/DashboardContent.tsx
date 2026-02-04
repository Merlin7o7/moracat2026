"use client";

import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Cat,
  Bell,
  LogOut,
  Clock,
  Sparkles,
  Lock,
  Stethoscope,
  Package,
  CheckCircle,
  Gift,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  numberOfPets?: number;
  betaTester?: boolean;
}

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const { language, isRTL } = useLanguage();
  const dashboard = translations.dashboard;
  const common = translations.common;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  // Pre-launch perks for waitlisted users
  const waitlistPerks = [
    {
      icon: Gift,
      titleKey: "perk1" as const,
      descKey: "perk1Desc" as const,
      color: "var(--brand-orange)",
    },
    {
      icon: Sparkles,
      titleKey: "perk2" as const,
      descKey: "perk2Desc" as const,
      color: "var(--brand-green)",
    },
    {
      icon: Heart,
      titleKey: "perk3" as const,
      descKey: "perk3Desc" as const,
      color: "var(--brand-pink)",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--brand-beige)]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Dashboard Header */}
      <header className="bg-[var(--brand-green)] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[var(--brand-green)] font-bold text-lg">
                    M
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">Moracat</span>
                  <span className="text-xs text-white/70">مرقط</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label={language === "en" ? "Notifications" : "الإشعارات"}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--brand-orange)] rounded-full" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {language === "en" ? "Sign Out" : "تسجيل الخروج"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-[var(--brand-green)] mb-2">
            {dashboard.welcome[language].replace("{name}", user.name?.split(" ")[0] || (language === "en" ? "Cat Parent" : "محب القطط"))}
          </h1>
          <p className="text-gray-600">
            {dashboard.welcomeSubtitle[language]}
          </p>
        </motion.div>

        {/* Launching Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[var(--brand-green)] to-[var(--brand-green)]/80 rounded-3xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--brand-orange)] rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{dashboard.launchingTitle[language]}</h2>
                <p className="text-white/80">{dashboard.launchingSubtitle[language]}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[var(--brand-orange)]">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{dashboard.waitlistConfirmed[language]}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cat Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-bold text-[var(--brand-green)] mb-4">
              {dashboard.yourProfile[language]}
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-[var(--brand-beige)] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Cat className="w-10 h-10 text-[var(--brand-orange)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--brand-green)] mb-2">
                    {user.name || (language === "en" ? "Cat Parent" : "محب القطط")}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{user.email}</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {dashboard.numberOfCats[language]}
                      </p>
                      <p className="text-xl font-bold text-[var(--brand-green)]">
                        {user.numberOfPets || 1} {language === "en" ? (user.numberOfPets === 1 ? "cat" : "cats") : "قطط"}
                      </p>
                    </div>
                    <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {dashboard.status[language]}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[var(--brand-orange)] rounded-full animate-pulse" />
                        <span className="font-semibold text-[var(--brand-orange)]">
                          {dashboard.onWaitlist[language]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {user.betaTester && (
                    <div className="mt-4 p-3 bg-[var(--brand-green)]/10 rounded-xl flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[var(--brand-green)]" />
                      <span className="text-sm font-medium text-[var(--brand-green)]">
                        {dashboard.betaTester[language]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Estimated Plan Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-[var(--brand-green)] mb-4">
              {dashboard.estimatedPlan[language]}
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--brand-green)]/10 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-[var(--brand-green)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--brand-green)]">
                    {language === "en" ? "Premium Plan" : "الباقة المميزة"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {language === "en" ? "Recommended for you" : "موصى بها لك"}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm text-gray-500">
                      {dashboard.estimatedPrice[language]}
                    </span>
                    <div className="text-2xl font-bold text-[var(--brand-green)]">
                      305 <span className="text-sm font-normal">{common.sar[language]}{common.perMonth[language]}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-green)]" />
                  {language === "en" ? "30 wet food cans" : "30 علبة طعام رطب"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-green)]" />
                  {language === "en" ? "2.5kg dry food" : "2.5 كجم طعام جاف"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-green)]" />
                  {language === "en" ? "12L premium litter" : "12 لتر رمل ممتاز"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[var(--brand-green)]" />
                  {language === "en" ? "1 treat pack" : "عبوة حلوى واحدة"}
                </li>
              </ul>

              <p className="text-xs text-gray-400 text-center">
                {dashboard.planNote[language]}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Vet Support - Locked */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-[var(--brand-green)] mb-4">
            {dashboard.vetSupport[language]}
          </h2>
          <div className="bg-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-bold text-[var(--brand-green)] mb-2">
                  {dashboard.vetLocked[language]}
                </h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  {dashboard.vetLockedDesc[language]}
                </p>
              </div>
            </div>

            {/* Blurred content behind */}
            <div className="flex items-start gap-6 opacity-50">
              <div className="w-16 h-16 bg-[var(--brand-green)]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Stethoscope className="w-8 h-8 text-[var(--brand-green)]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--brand-green)] mb-2">
                  {language === "en" ? "Vet-Backed Nutrition Guidance" : "إرشادات تغذية مدعومة من الأطباء البيطريين"}
                </h3>
                <p className="text-gray-600">
                  {language === "en"
                    ? "Get personalized portion recommendations and dietary advice from certified veterinary nutritionists."
                    : "احصل على توصيات حصص مخصصة ونصائح غذائية من أخصائيي تغذية بيطريين معتمدين."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Waitlist Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-[var(--brand-green)] mb-4">
            {dashboard.yourPerks[language]}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {waitlistPerks.map((perk, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${perk.color}15` }}
                >
                  <perk.icon
                    className="w-6 h-6"
                    style={{ color: perk.color }}
                  />
                </div>
                <h3 className="font-bold text-[var(--brand-green)] mb-1">
                  {dashboard[perk.titleKey][language]}
                </h3>
                <p className="text-gray-600 text-sm">
                  {dashboard[perk.descKey][language]}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Link href="/">
            <Button variant="outline">
              {language === "en" ? "Back to Home" : "العودة للرئيسية"}
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

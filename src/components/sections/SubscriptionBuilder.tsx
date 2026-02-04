"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Cat,
  Package,
  Palette,
  Eye,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button, Card } from "@/components/ui";
import {
  calculatePrice,
  getTierFeatures,
  TIER_CONFIG,
  CAT_TYPE_CONFIG,
  PARTNER_BRANDS,
  type CatType,
  type SubscriptionTier,
  type BrandPreference,
} from "@/lib/pricing";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

interface BuilderConfig {
  catType: CatType;
  tier: SubscriptionTier;
  brandPreferences: BrandPreference;
}

export function SubscriptionBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<BuilderConfig>({
    catType: "adult",
    tier: "premium",
    brandPreferences: {
      wetFoodBrand: "applaws",
      treatBrand: "churu",
    },
  });
  const { language, isRTL } = useLanguage();
  const builder = translations.builder;
  const common = translations.common;

  const steps = [
    { id: "catProfile", label: { en: "Your Cat", ar: "قطتك" }, icon: Cat },
    { id: "tier", label: { en: "Choose Plan", ar: "اختر الباقة" }, icon: Package },
    { id: "customize", label: { en: "Customize", ar: "خصص" }, icon: Palette },
    { id: "preview", label: { en: "Preview Box", ar: "معاينة الصندوق" }, icon: Eye },
  ];

  const priceBreakdown = useMemo(
    () => calculatePrice({ tier: config.tier, catType: config.catType, brandPreferences: config.brandPreferences }),
    [config]
  );

  const features = useMemo(
    () => getTierFeatures(config.tier, language),
    [config.tier, language]
  );

  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const scrollToWaitlist = () => {
    const element = document.querySelector("#waitlist");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="builder"
      className="py-20 bg-gradient-to-b from-white to-[var(--brand-beige)]/30"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] rounded-full text-sm font-medium mb-4">
            {builder.badge[language]}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-green)] mb-4">
            {builder.title[language]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {builder.subtitle[language]}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 md:gap-4">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className="flex items-center"
                >
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                      index <= currentStep
                        ? "bg-[var(--brand-green)] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span
                    className={`hidden md:block ${isRTL ? "mr-2" : "ml-2"} text-sm font-medium ${
                      index <= currentStep ? "text-[var(--brand-green)]" : "text-gray-400"
                    }`}
                  >
                    {step.label[language]}
                  </span>
                  {index < steps.length - 1 && (
                    <Chevron className="w-4 h-4 mx-2 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Builder Panel */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Cat Profile */}
                  {currentStep === 0 && (
                    <motion.div
                      key="catProfile"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
                          {builder.catTypeTitle[language]}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {builder.catTypeSubtitle[language]}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {(Object.keys(CAT_TYPE_CONFIG) as CatType[]).map((catType) => {
                          const catConfig = CAT_TYPE_CONFIG[catType];
                          const isSelected = config.catType === catType;

                          return (
                            <motion.button
                              key={catType}
                              onClick={() => setConfig((prev) => ({ ...prev, catType }))}
                              className={`p-4 rounded-xl border-2 ${isRTL ? "text-right" : "text-left"} transition-all ${
                                isSelected
                                  ? "border-[var(--brand-green)] bg-[var(--brand-green)]/5"
                                  : "border-gray-200 hover:border-[var(--brand-green)]/50"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-[var(--brand-green)]">
                                    {language === "ar" ? catConfig.labelAr : catConfig.label}
                                  </h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {language === "ar" ? catConfig.descriptionAr : catConfig.description}
                                  </p>
                                </div>
                                {isSelected && (
                                  <Check className="w-5 h-5 text-[var(--brand-green)]" />
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Tier Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="tier"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
                          {builder.tierTitle[language]}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {builder.tierSubtitle[language]}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {(Object.keys(TIER_CONFIG) as SubscriptionTier[]).map((tier) => {
                          const tierConfig = TIER_CONFIG[tier];
                          const isSelected = config.tier === tier;

                          return (
                            <motion.button
                              key={tier}
                              onClick={() => setConfig((prev) => ({ ...prev, tier }))}
                              className={`p-4 rounded-xl border-2 ${isRTL ? "text-right" : "text-left"} transition-all relative ${
                                isSelected
                                  ? "border-[var(--brand-green)] bg-[var(--brand-green)]/5"
                                  : "border-gray-200 hover:border-[var(--brand-green)]/50"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {tierConfig.isPopular && (
                                <span className="absolute -top-2 right-4 px-2 py-0.5 bg-[var(--brand-orange)] text-white text-xs rounded-full">
                                  {common.popular[language]}
                                </span>
                              )}
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-[var(--brand-green)]">
                                    {language === "ar" ? tierConfig.labelAr : tierConfig.label}
                                  </h4>
                                  <p className="text-sm text-gray-500">
                                    {language === "ar" ? tierConfig.descriptionAr : tierConfig.description}
                                  </p>
                                </div>
                                {isSelected && (
                                  <Check className="w-5 h-5 text-[var(--brand-green)]" />
                                )}
                              </div>
                              <div className="flex items-end gap-2 mt-3">
                                <span className="text-2xl font-bold text-[var(--brand-green)]">
                                  {tierConfig.fixedPrice}
                                </span>
                                <span className="text-sm text-gray-500 mb-0.5">
                                  {common.sar[language]}{common.perMonth[language]}
                                </span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Brand Customization */}
                  {currentStep === 2 && (
                    <motion.div
                      key="customize"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
                          {language === "en" ? "Choose Your Brands" : "اختر علاماتك التجارية"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {language === "en"
                            ? "Select your preferred brands for each product category"
                            : "اختر علاماتك التجارية المفضلة لكل فئة منتج"}
                        </p>
                      </div>

                      {/* Wet Food Brand */}
                      <div>
                        <label className="block text-sm font-medium text-[var(--brand-green)] mb-3">
                          {language === "en" ? "Wet Food Brand" : "علامة الطعام الرطب"}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {PARTNER_BRANDS.wetFood.map((brand) => (
                            <button
                              key={brand.id}
                              onClick={() =>
                                setConfig((prev) => ({
                                  ...prev,
                                  brandPreferences: {
                                    ...prev.brandPreferences,
                                    wetFoodBrand: brand.id as "applaws" | "kitcat",
                                  },
                                }))
                              }
                              className={`p-4 rounded-xl border-2 transition-all ${
                                config.brandPreferences.wetFoodBrand === brand.id
                                  ? "border-[var(--brand-green)] bg-[var(--brand-green)]/5"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span className="font-semibold text-[var(--brand-green)]">
                                {language === "ar" ? brand.nameAr : brand.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Treat Brand (only if tier includes treats) */}
                      {TIER_CONFIG[config.tier].treatPacks > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-[var(--brand-green)] mb-3">
                            {language === "en" ? "Treat Brand" : "علامة المكافآت"}
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {PARTNER_BRANDS.treats.map((brand) => (
                              <button
                                key={brand.id}
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    brandPreferences: {
                                      ...prev.brandPreferences,
                                      treatBrand: brand.id as "churu" | "kitcat_treats",
                                    },
                                  }))
                                }
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  config.brandPreferences.treatBrand === brand.id
                                    ? "border-[var(--brand-green)] bg-[var(--brand-green)]/5"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                <span className="font-semibold text-[var(--brand-green)]">
                                  {language === "ar" ? brand.nameAr : brand.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fixed brands note */}
                      <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">
                          <strong>{language === "en" ? "Dry Food:" : "الطعام الجاف:"}</strong>{" "}
                          {language === "en" ? "Josera Premium" : "جوسيرا المميز"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>{language === "en" ? "Litter:" : "الرمل:"}</strong>{" "}
                          {language === "en" ? "BioSand Premium" : "بايوساند المميز"}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Box Preview */}
                  {currentStep === 3 && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
                          {language === "en" ? "Your Box Preview" : "معاينة صندوقك"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {language === "en"
                            ? "Here's what you'll receive every month"
                            : "إليك ما ستستلمه كل شهر"}
                        </p>
                      </div>

                      {/* Box Visual */}
                      <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a]">
                        <Image
                          src={
                            config.tier === "basic"
                              ? "/images/plan-basic.png"
                              : config.tier === "premium"
                              ? "/images/plan-premium.png"
                              : "/images/plan-ultimate.png"
                          }
                          alt="Your subscription box"
                          width={800}
                          height={500}
                          className="w-full h-auto"
                        />
                      </div>

                      {/* Brand Summary */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 mb-1">
                            {language === "en" ? "Wet Food" : "طعام رطب"}
                          </p>
                          <p className="font-semibold text-[var(--brand-green)]">
                            {config.brandPreferences.wetFoodBrand === "applaws" ? "Applaws" : "Kit Cat"}
                          </p>
                        </div>
                        <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 mb-1">
                            {language === "en" ? "Dry Food" : "طعام جاف"}
                          </p>
                          <p className="font-semibold text-[var(--brand-green)]">Josera</p>
                        </div>
                        {TIER_CONFIG[config.tier].treatPacks > 0 && (
                          <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                            <p className="text-xs text-gray-500 mb-1">
                              {language === "en" ? "Treats" : "مكافآت"}
                            </p>
                            <p className="font-semibold text-[var(--brand-green)]">
                              {config.brandPreferences.treatBrand === "churu" ? "Churu" : "Kit Cat"}
                            </p>
                          </div>
                        )}
                        <div className="bg-[var(--brand-beige)]/50 rounded-xl p-4">
                          <p className="text-xs text-gray-500 mb-1">
                            {language === "en" ? "Litter" : "رمل"}
                          </p>
                          <p className="font-semibold text-[var(--brand-green)]">BioSand</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="disabled:opacity-50"
                  >
                    {common.back[language]}
                  </Button>

                  {currentStep < steps.length - 1 ? (
                    <Button variant="primary" onClick={nextStep}>
                      {common.continue[language]}
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={scrollToWaitlist}>
                      <Sparkles className="w-5 h-5" />
                      {common.joinWaitlist[language]}
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            {/* Price Summary Panel */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-[var(--brand-green)] mb-4">
                  {builder.yourPackage[language]}
                </h3>

                {/* Selected Options */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{steps[0].label[language]}</span>
                    <span className="font-medium">
                      {language === "ar"
                        ? CAT_TYPE_CONFIG[config.catType].labelAr
                        : CAT_TYPE_CONFIG[config.catType].label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{steps[1].label[language]}</span>
                    <span className="font-medium">
                      {language === "ar"
                        ? TIER_CONFIG[config.tier].labelAr
                        : TIER_CONFIG[config.tier].label}
                    </span>
                  </div>
                </div>

                {/* What's Included */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {builder.whatsIncluded[language]}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-4 h-4 text-[var(--brand-green)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {language === "en" ? "Retail Value" : "قيمة التجزئة"}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      {priceBreakdown.retailValue} SAR
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-sm text-gray-500">{builder.total[language]}</span>
                      <div className="text-2xl font-bold text-[var(--brand-green)]">
                        {priceBreakdown.fixedPrice}
                        <span className="text-sm font-normal text-gray-500">
                          {common.perMonth[language]}
                        </span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] rounded-full text-xs font-semibold">
                      {common.save[language]} {priceBreakdown.savingsPercentage}%
                    </div>
                  </div>
                </div>

                {/* Reserve This Plan Button */}
                <Button
                  variant="primary"
                  className="w-full mt-6"
                  onClick={scrollToWaitlist}
                >
                  <Sparkles className="w-4 h-4" />
                  {language === "en" ? "Reserve This Plan" : "احجز هذه الباقة"}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

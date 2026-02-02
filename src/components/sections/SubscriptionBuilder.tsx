"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cat,
  Package,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";
import { Button, Card } from "@/components/ui";
import {
  calculatePrice,
  formatPrice,
  formatPriceAr,
  CAT_TYPE_CONFIG,
  TIER_CONFIG,
  DURATION_CONFIG,
  ADD_ONS,
  type CatType,
  type SubscriptionTier,
  type SubscriptionDuration,
  type SubscriptionConfig,
} from "@/lib/pricing";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function SubscriptionBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [config, setConfig] = useState<SubscriptionConfig>({
    tier: "premium",
    catType: "adult",
    duration: 1,
    addOns: {},
  });
  const { language, isRTL } = useLanguage();
  const builder = translations.builder;
  const common = translations.common;

  const steps = [
    { id: "catType", labelKey: "step1" as const, icon: Cat },
    { id: "tier", labelKey: "step2" as const, icon: Package },
    { id: "addOns", labelKey: "step3" as const, icon: Sparkles },
    { id: "duration", labelKey: "step4" as const, icon: Clock },
  ];

  const priceBreakdown = useMemo(() => calculatePrice(config), [config]);
  const price = language === "ar" ? formatPriceAr : formatPrice;

  const updateConfig = <K extends keyof SubscriptionConfig>(
    key: K,
    value: SubscriptionConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateAddOn = (addOnId: string, delta: number) => {
    const addOn = ADD_ONS.find((a) => a.id === addOnId);
    if (!addOn) return;

    const currentQty = config.addOns[addOnId] || 0;
    const newQty = Math.max(0, Math.min(addOn.maxQuantity, currentQty + delta));

    setConfig((prev) => ({
      ...prev,
      addOns: { ...prev.addOns, [addOnId]: newQty },
    }));
  };

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

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        language === "en"
          ? "Failed to start checkout. Please try again."
          : "فشل في بدء الدفع. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <section id="builder" className="py-20 bg-gradient-to-b from-white to-[var(--brand-beige)]/30" dir={isRTL ? "rtl" : "ltr"}>
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
                  onClick={() => goToStep(index)}
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
                      index <= currentStep
                        ? "text-[var(--brand-green)]"
                        : "text-gray-400"
                    }`}
                  >
                    {builder[step.labelKey][language]}
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
                  {/* Step 1: Cat Type */}
                  {currentStep === 0 && (
                    <motion.div
                      key="catType"
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
                        {(Object.keys(CAT_TYPE_CONFIG) as CatType[]).map(
                          (catType) => {
                            const catConfig = CAT_TYPE_CONFIG[catType];
                            const isSelected = config.catType === catType;

                            return (
                              <motion.button
                                key={catType}
                                onClick={() => updateConfig("catType", catType)}
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
                                    <p className="text-xs text-[var(--brand-orange)]">
                                      {language === "ar" ? catConfig.label : catConfig.labelAr}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {catConfig.description}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-5 h-5 text-[var(--brand-green)]" />
                                  )}
                                </div>
                              </motion.button>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Package Tier */}
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
                        {(Object.keys(TIER_CONFIG) as SubscriptionTier[]).map(
                          (tier) => {
                            const tierConfig = TIER_CONFIG[tier];
                            const isSelected = config.tier === tier;

                            return (
                              <motion.button
                                key={tier}
                                onClick={() => updateConfig("tier", tier)}
                                className={`p-4 rounded-xl border-2 ${isRTL ? "text-right" : "text-left"} transition-all ${
                                  isSelected
                                    ? "border-[var(--brand-green)] bg-[var(--brand-green)]/5"
                                    : "border-gray-200 hover:border-[var(--brand-green)]/50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: tierConfig.color }}
                                      />
                                      <h4 className="font-semibold text-[var(--brand-green)]">
                                        {language === "ar" ? tierConfig.labelAr : tierConfig.label}
                                      </h4>
                                    </div>
                                    <p className="text-xs text-[var(--brand-orange)]">
                                      {language === "ar" ? tierConfig.label : tierConfig.labelAr}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-5 h-5 text-[var(--brand-green)]" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 mb-3">
                                  {tierConfig.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                                    {tierConfig.baseWetCans} {language === "ar" ? "علب رطب" : "wet cans"}
                                  </span>
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                                    {tierConfig.baseDryKg}{language === "ar" ? " كجم جاف" : "kg dry"}
                                  </span>
                                  {tierConfig.includesTreats && (
                                    <span className="text-xs px-2 py-0.5 bg-[var(--brand-orange)]/10 text-[var(--brand-orange)] rounded">
                                      + {language === "ar" ? "حلوى" : "Treats"}
                                    </span>
                                  )}
                                  {tierConfig.includesToys && (
                                    <span className="text-xs px-2 py-0.5 bg-[var(--brand-pink)]/20 text-[var(--brand-orange)] rounded">
                                      + {language === "ar" ? "ألعاب" : "Toys"}
                                    </span>
                                  )}
                                </div>
                              </motion.button>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Add-ons */}
                  {currentStep === 2 && (
                    <motion.div
                      key="addOns"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
                          {builder.addOnsTitle[language]}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {builder.addOnsSubtitle[language]}
                        </p>
                      </div>

                      <div className="space-y-3">
                        {ADD_ONS.map((addOn) => {
                          const qty = config.addOns[addOn.id] || 0;

                          return (
                            <div
                              key={addOn.id}
                              className="flex items-center justify-between p-4 rounded-xl border border-gray-200"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-[var(--brand-green)]">
                                    {language === "ar" ? addOn.labelAr : addOn.label}
                                  </h4>
                                  <span className="text-xs text-gray-400">
                                    {language === "ar" ? addOn.label : addOn.labelAr}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {price(addOn.unitCost)} / {addOn.unit}
                                </p>
                              </div>

                              <div className="flex items-center gap-3">
                                <motion.button
                                  onClick={() => updateAddOn(addOn.id, -1)}
                                  disabled={qty === 0}
                                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="w-8 text-center font-medium">
                                  {qty}
                                </span>
                                <motion.button
                                  onClick={() => updateAddOn(addOn.id, 1)}
                                  disabled={qty >= addOn.maxQuantity}
                                  className="w-8 h-8 rounded-full bg-[var(--brand-green)] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Duration */}
                  {currentStep === 3 && (
                    <motion.div
                      key="duration"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-[var(--brand-green)] mb-2">
                          {builder.durationTitle[language]}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {builder.durationSubtitle[language]}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        {(
                          Object.keys(DURATION_CONFIG).map(Number) as SubscriptionDuration[]
                        ).map((duration) => {
                          const durationConfig = DURATION_CONFIG[duration];
                          const isSelected = config.duration === duration;
                          const discount = durationConfig.discountPercentage * 100;

                          return (
                            <motion.button
                              key={duration}
                              onClick={() => updateConfig("duration", duration)}
                              className={`p-4 rounded-xl border-2 ${isRTL ? "text-right" : "text-left"} transition-all relative overflow-hidden ${
                                isSelected
                                  ? "border-[var(--brand-green)] bg-[var(--brand-green)]/5"
                                  : "border-gray-200 hover:border-[var(--brand-green)]/50"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {discount > 0 && (
                                <span className={`absolute top-0 ${isRTL ? "left-0 rounded-br-lg" : "right-0 rounded-bl-lg"} bg-[var(--brand-orange)] text-white text-xs px-2 py-0.5`}>
                                  {common.save[language]} {discount}%
                                </span>
                              )}
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-[var(--brand-green)]">
                                    {language === "ar" ? durationConfig.labelAr : durationConfig.label}
                                  </h4>
                                  <p className="text-xs text-[var(--brand-orange)]">
                                    {language === "ar" ? durationConfig.label : durationConfig.labelAr}
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
                    <Button
                      variant="primary"
                      onClick={handleCheckout}
                      isLoading={isCheckingOut}
                      disabled={!priceBreakdown.isValidConfig}
                    >
                      <CreditCard className="w-5 h-5" />
                      {language === "en" ? "Subscribe Now" : "اشترك الآن"}
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
                    <span className="text-gray-600">{builder.step1[language]}</span>
                    <span className="font-medium">
                      {language === "ar" ? CAT_TYPE_CONFIG[config.catType].labelAr : CAT_TYPE_CONFIG[config.catType].label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{builder.step2[language]}</span>
                    <span className="font-medium">
                      {language === "ar" ? TIER_CONFIG[config.tier].labelAr : TIER_CONFIG[config.tier].label}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{builder.step4[language]}</span>
                    <span className="font-medium">
                      {language === "ar" ? DURATION_CONFIG[config.duration].labelAr : DURATION_CONFIG[config.duration].label}
                    </span>
                  </div>
                </div>

                {/* Item Breakdown */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {builder.whatsIncluded[language]}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === "ar" ? "طعام رطب" : "Wet Food"}</span>
                      <span>{priceBreakdown.itemBreakdown.wetFood.quantity} {language === "ar" ? "علب" : "cans"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === "ar" ? "طعام جاف" : "Dry Food"}</span>
                      <span>{priceBreakdown.itemBreakdown.dryFood.quantity}{language === "ar" ? " كجم" : "kg"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{language === "ar" ? "رمل" : "Litter"}</span>
                      <span>{priceBreakdown.itemBreakdown.litter.quantity}{language === "ar" ? " لتر" : "L"}</span>
                    </div>
                    {priceBreakdown.itemBreakdown.treats.quantity > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === "ar" ? "حلوى" : "Treats"}</span>
                        <span>{priceBreakdown.itemBreakdown.treats.quantity} {language === "ar" ? "عبوات" : "packs"}</span>
                      </div>
                    )}
                    {priceBreakdown.itemBreakdown.gizzardMeal.quantity > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === "ar" ? "قوانص" : "Gizzard Meal"}</span>
                        <span>{priceBreakdown.itemBreakdown.gizzardMeal.quantity} {language === "ar" ? "عبوات" : "packs"}</span>
                      </div>
                    )}
                    {priceBreakdown.itemBreakdown.toys.quantity > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === "ar" ? "ألعاب" : "Toys"}</span>
                        <span>{priceBreakdown.itemBreakdown.toys.quantity} {language === "ar" ? "قطع" : "items"}</span>
                      </div>
                    )}
                    {priceBreakdown.itemBreakdown.grooming.quantity > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">{language === "ar" ? "عناية" : "Grooming"}</span>
                        <span>{priceBreakdown.itemBreakdown.grooming.quantity} {language === "ar" ? "قطع" : "items"}</span>
                      </div>
                    )}
                    {priceBreakdown.itemBreakdown.addOns.quantity > 0 && (
                      <div className="flex justify-between text-[var(--brand-orange)]">
                        <span>{builder.step3[language]}</span>
                        <span>+{priceBreakdown.itemBreakdown.addOns.quantity} {language === "ar" ? "قطع" : "items"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price Calculation */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{builder.monthlyPrice[language]}</span>
                    <span>{price(priceBreakdown.monthlyPrice)}</span>
                  </div>
                  {priceBreakdown.durationDiscount > 0 && (
                    <div className="flex justify-between text-sm text-[var(--brand-green)]">
                      <span>{builder.durationDiscount[language]}</span>
                      <span>-{price(priceBreakdown.durationDiscount)}</span>
                    </div>
                  )}
                </div>

                {/* Final Price */}
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-sm text-gray-500">{builder.total[language]}</span>
                      <div className="text-2xl font-bold text-[var(--brand-green)]">
                        {price(priceBreakdown.finalMonthlyPrice)}
                        <span className="text-sm font-normal text-gray-500">{common.perMonth[language]}</span>
                      </div>
                    </div>
                    {config.duration > 1 && (
                      <div className={isRTL ? "text-left" : "text-right"}>
                        <span className="text-xs text-gray-500">
                          {config.duration} {language === "ar" ? "أشهر" : "months"}
                        </span>
                        <div className="font-semibold text-[var(--brand-orange)]">
                          {price(priceBreakdown.totalPrice)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profitability Warning */}
                {!priceBreakdown.isValidConfig && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      {language === "ar"
                        ? "هذا التكوين يتطلب تعديلات. يرجى تعديل اختياراتك."
                        : "This configuration requires adjustments. Please modify your selections."}
                    </p>
                  </motion.div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

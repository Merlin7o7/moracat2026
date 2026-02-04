"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { TIER_CONFIG, calculateSavingsVsCurrentSpend, type SubscriptionTier } from "@/lib/pricing";

export function SavingsCalculator() {
  const { language, isRTL } = useLanguage();
  const [currentSpend, setCurrentSpend] = useState(400);
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('premium');

  const savings = useMemo(() => {
    return calculateSavingsVsCurrentSpend(currentSpend, selectedTier, 'adult');
  }, [currentSpend, selectedTier]);

  const tierPrice = TIER_CONFIG[selectedTier].fixedPrice;

  const scrollToWaitlist = () => {
    const element = document.querySelector("#waitlist");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="savings-calculator"
      className="py-20 md:py-32 bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-green)]/90"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-[var(--brand-orange)]" />
              <span className="text-white text-sm font-medium">
                {language === 'en' ? 'Savings Calculator' : 'حاسبة التوفير'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {language === 'en' ? 'See How Much You\'ll Save' : 'شاهد كم ستوفر'}
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              {language === 'en'
                ? 'Enter your current monthly spend on cat supplies and see your potential savings with Moracat'
                : 'أدخل إنفاقك الشهري الحالي على مستلزمات القطط وشاهد توفيرك المحتمل مع مرقط'}
            </p>
          </motion.div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <label className="block text-[var(--brand-green)] font-semibold mb-4">
                  {language === 'en' ? 'Your Current Monthly Spend' : 'إنفاقك الشهري الحالي'}
                </label>

                {/* Slider */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>200 SAR</span>
                    <span>800 SAR</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    step="25"
                    value={currentSpend}
                    onChange={(e) => setCurrentSpend(Number(e.target.value))}
                    className="w-full h-3 bg-[var(--brand-beige)] rounded-full appearance-none cursor-pointer accent-[var(--brand-orange)]"
                  />
                  <div className="text-center mt-4">
                    <span className="text-4xl font-bold text-[var(--brand-green)]">
                      {currentSpend}
                    </span>
                    <span className="text-gray-500 ml-2">
                      {language === 'en' ? 'SAR/month' : 'ر.س/شهرياً'}
                    </span>
                  </div>
                </div>

                {/* Tier Selection */}
                <label className="block text-[var(--brand-green)] font-semibold mb-3">
                  {language === 'en' ? 'Compare with Plan' : 'قارن مع الباقة'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['basic', 'premium', 'luxury', 'ultimate'] as SubscriptionTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedTier === tier
                          ? 'bg-[var(--brand-green)] text-white'
                          : 'bg-[var(--brand-beige)] text-[var(--brand-green)] hover:bg-[var(--brand-green)]/10'
                      }`}
                    >
                      {language === 'ar' ? TIER_CONFIG[tier].labelAr : TIER_CONFIG[tier].label}
                      <span className="block text-xs opacity-70">
                        {TIER_CONFIG[tier].fixedPrice} SAR
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Section */}
              <div className="bg-[var(--brand-beige)]/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--brand-green)] mb-6 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-[var(--brand-orange)]" />
                  {language === 'en' ? 'Your Savings' : 'توفيرك'}
                </h3>

                {savings.monthly > 0 ? (
                  <>
                    {/* Monthly Savings */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {language === 'en' ? 'Monthly Savings' : 'التوفير الشهري'}
                      </p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-[var(--brand-green)]">
                          {savings.monthly}
                        </span>
                        <span className="text-gray-500 mb-1">SAR</span>
                        <span className="text-[var(--brand-orange)] font-semibold text-sm mb-1">
                          ({savings.percentage}% {language === 'en' ? 'less' : 'أقل'})
                        </span>
                      </div>
                    </div>

                    {/* Annual Savings */}
                    <div className="mb-6 p-4 bg-[var(--brand-orange)]/10 rounded-xl">
                      <p className="text-sm text-[var(--brand-orange)] mb-1">
                        {language === 'en' ? 'Annual Savings' : 'التوفير السنوي'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[var(--brand-orange)]" />
                        <span className="text-2xl font-bold text-[var(--brand-orange)]">
                          {savings.annual} SAR
                        </span>
                      </div>
                    </div>

                    {/* Comparison */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          {language === 'en' ? 'Your current spend' : 'إنفاقك الحالي'}
                        </span>
                        <span className="line-through text-gray-400">{currentSpend} SAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">
                          {language === 'en' ? 'Moracat price' : 'سعر مرقط'}
                        </span>
                        <span className="font-semibold text-[var(--brand-green)]">{tierPrice} SAR</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-600 mb-2">
                      {language === 'en'
                        ? 'Great news! You\'re already spending efficiently.'
                        : 'أخبار رائعة! أنت تنفق بكفاءة بالفعل.'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'en'
                        ? 'With Moracat, you\'ll get premium quality and convenience.'
                        : 'مع مرقط، ستحصل على جودة فاخرة وراحة.'}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <Button
                  variant="primary"
                  className="w-full mt-6"
                  onClick={scrollToWaitlist}
                >
                  {language === 'en' ? 'Start Saving Now' : 'ابدأ التوفير الآن'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

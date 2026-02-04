"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const comparisonItems = [
  {
    traditional: { en: "Visit multiple stores", ar: "زيارة عدة متاجر" },
    moracat: { en: "One box, delivered", ar: "صندوق واحد، يوصَل لك" },
  },
  {
    traditional: { en: "Pay full retail prices", ar: "دفع أسعار التجزئة الكاملة" },
    moracat: { en: "Save up to 20%", ar: "وفّر حتى 20%" },
  },
  {
    traditional: { en: "Track what you need", ar: "تتبع ما تحتاجه" },
    moracat: { en: "Auto-refill, never run out", ar: "تعبئة تلقائية، لا نفاد أبداً" },
  },
  {
    traditional: { en: "Research brands alone", ar: "البحث عن العلامات بنفسك" },
    moracat: { en: "Vet-curated selections", ar: "اختيارات منتقاة بيطرياً" },
  },
  {
    traditional: { en: "No support", ar: "بدون دعم" },
    moracat: { en: "Free vet guidance included", ar: "إرشاد بيطري مجاني مشمول" },
  },
];

export function WhyMoracat() {
  const { language, isRTL } = useLanguage();

  return (
    <section
      id="why-moracat"
      className="py-20 md:py-32 bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
            {language === "en" ? "Why Subscribe?" : "لماذا تشترك؟"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            {language === "en" ? "Why Moracat?" : "لماذا مرقط؟"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {language === "en"
              ? "See how Moracat makes caring for your cat easier and more affordable"
              : "شاهد كيف يجعل مرقط رعاية قطتك أسهل وأوفر"}
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 rounded-2xl p-4 text-center">
              <h3 className="font-bold text-gray-600">
                {language === "en" ? "Shopping Yourself" : "التسوق بنفسك"}
              </h3>
            </div>
            <div className="bg-[var(--brand-green)] rounded-2xl p-4 text-center">
              <h3 className="font-bold text-white">
                {language === "en" ? "Moracat Subscription" : "اشتراك مرقط"}
              </h3>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-3">
            {comparisonItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Traditional */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-600 text-sm md:text-base">
                    {item.traditional[language]}
                  </span>
                </div>

                {/* Moracat */}
                <div className="bg-[var(--brand-green)]/5 rounded-xl p-4 flex items-center gap-3 border-2 border-[var(--brand-green)]/20">
                  <div className="w-6 h-6 rounded-full bg-[var(--brand-green)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[var(--brand-green)] font-medium text-sm md:text-base">
                    {item.moracat[language]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

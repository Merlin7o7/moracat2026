"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function FAQ() {
  const { language, isRTL } = useLanguage();
  const faq = translations.faq;

  const faqItems = [
    { title: faq.q1[language], content: faq.a1[language] },
    { title: faq.q2[language], content: faq.a2[language] },
    { title: faq.q3[language], content: faq.a3[language] },
    { title: faq.q4[language], content: faq.a4[language] },
    { title: faq.q5[language], content: faq.a5[language] },
    { title: faq.q6[language], content: faq.a6[language] },
  ];

  return (
    <section
      id="faq"
      className="py-20 md:py-32 bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
              {faq.badge[language]}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
              {faq.title[language]}
            </h2>
            <p className="text-gray-600 text-lg">
              {faq.subtitle[language]}
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion items={faqItems} />
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <p className="text-gray-600 mb-2">
              {language === "en" ? "Still have questions?" : "لا زال لديك أسئلة؟"}
            </p>
            <a
              href="mailto:hello@moracat.co"
              className={`inline-flex items-center gap-2 text-[var(--brand-green)] font-semibold hover:text-[var(--brand-orange)] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
            >
              {language === "en" ? "Contact our support team" : "تواصل مع فريق الدعم"}
              <svg
                className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

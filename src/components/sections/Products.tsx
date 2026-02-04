"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Wheat,
  Cookie,
  Sparkles,
  Gamepad2,
  Brush,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function Products() {
  const { language, isRTL } = useLanguage();
  const products = translations.products;

  const productCategories = [
    {
      icon: Droplets,
      titleKey: "wetFood" as const,
      descKey: "wetFoodDesc" as const,
      emoji: "🥫",
      color: "var(--brand-orange)",
    },
    {
      icon: Wheat,
      titleKey: "dryFood" as const,
      descKey: "dryFoodDesc" as const,
      emoji: "🍚",
      color: "var(--brand-green)",
    },
    {
      icon: Cookie,
      titleKey: "treats" as const,
      descKey: "treatsDesc" as const,
      emoji: "🍪",
      color: "var(--brand-pink)",
    },
    {
      icon: Sparkles,
      titleKey: "litter" as const,
      descKey: "litterDesc" as const,
      emoji: "✨",
      color: "var(--brand-green)",
    },
    {
      icon: Gamepad2,
      titleKey: "toys" as const,
      descKey: "toysDesc" as const,
      emoji: "🎾",
      color: "var(--brand-orange)",
    },
    {
      icon: Brush,
      titleKey: "grooming" as const,
      descKey: "groomingDesc" as const,
      emoji: "🪥",
      color: "var(--brand-pink)",
    },
  ];

  return (
    <section
      id="products"
      className="py-20 md:py-32"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
            {products.badge[language]}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            {products.title[language]}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {products.subtitle[language]}
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {productCategories.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Product Image Area */}
              <div className="relative h-36 bg-gradient-to-br from-[var(--brand-beige)] to-white flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {product.emoji}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${product.color}15` }}
                  >
                    <product.icon
                      className="w-5 h-5"
                      style={{ color: product.color }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--brand-green)]">
                    {products[product.titleKey][language]}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {products[product.descKey][language]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

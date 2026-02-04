"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

const partnerBrands = [
  {
    id: 'josera',
    name: 'Josera',
    nameAr: 'جوسيرا',
    category: { en: 'Premium Dry Food', ar: 'طعام جاف فاخر' },
    color: '#1a4d2e',
  },
  {
    id: 'applaws',
    name: 'Applaws',
    nameAr: 'أبلاوز',
    category: { en: 'Natural Wet Food', ar: 'طعام رطب طبيعي' },
    color: '#e63946',
  },
  {
    id: 'biosand',
    name: 'BioSand',
    nameAr: 'بايوساند',
    category: { en: 'Premium Litter', ar: 'رمل فاخر' },
    color: '#457b9d',
  },
  {
    id: 'churu',
    name: 'Churu',
    nameAr: 'تشورو',
    category: { en: 'Creamy Treats', ar: 'مكافآت كريمية' },
    color: '#f4a261',
  },
  {
    id: 'kitcat',
    name: 'Kit Cat',
    nameAr: 'كيت كات',
    category: { en: 'Quality Cat Care', ar: 'عناية بالقطط' },
    color: '#2a9d8f',
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function BrandGrid() {
  const { language, isRTL } = useLanguage();

  return (
    <section
      id="brands"
      className="py-16 md:py-24 bg-[var(--brand-beige)]/30"
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
            {language === 'en' ? 'Trusted Partners' : 'شركاء موثوقون'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-green)] mb-4">
            {language === 'en' ? 'Premium Brands We Curate' : 'علامات تجارية فاخرة ننتقيها لك'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'We partner with the best cat care brands to bring you quality products your cat will love'
              : 'نتعاون مع أفضل علامات رعاية القطط لنوفر لك منتجات عالية الجودة سيحبها قطك'}
          </p>
        </motion.div>

        {/* Brand Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto"
        >
          {partnerBrands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all text-center"
            >
              {/* Brand Logo Placeholder */}
              <div
                className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${brand.color}15` }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: brand.color }}
                >
                  {brand.name.charAt(0)}
                </span>
              </div>

              {/* Brand Name */}
              <h3 className="font-bold text-[var(--brand-green)] mb-1">
                {language === 'ar' ? brand.nameAr : brand.name}
              </h3>

              {/* Category */}
              <p className="text-xs text-gray-500">
                {brand.category[language]}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

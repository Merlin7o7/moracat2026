"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Scissors,
  Users,
  Calendar,
  Gift,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const ecosystemServices = [
  {
    id: 'vet-care',
    icon: Stethoscope,
    titleEn: 'Vet Care Access',
    titleAr: 'الوصول للرعاية البيطرية',
    descEn: 'Discounted consultations and priority access at partner clinics',
    descAr: 'استشارات مخفضة وأولوية الوصول في العيادات الشريكة',
    status: 'coming_soon',
    color: 'var(--brand-green)',
  },
  {
    id: 'grooming',
    icon: Scissors,
    titleEn: 'Grooming Services',
    titleAr: 'خدمات العناية',
    descEn: 'Mobile grooming at your doorstep with member discounts',
    descAr: 'خدمات تجميل متنقلة عند باب بيتك مع خصومات للأعضاء',
    status: 'coming_soon',
    color: 'var(--brand-orange)',
  },
  {
    id: 'community',
    icon: Users,
    titleEn: 'Cat Parent Community',
    titleAr: 'مجتمع محبي القطط',
    descEn: 'Connect with other cat parents, share tips, and get advice',
    descAr: 'تواصل مع محبي القطط الآخرين، شارك النصائح، واحصل على الإرشادات',
    status: 'beta',
    color: 'var(--brand-pink)',
  },
  {
    id: 'events',
    icon: Calendar,
    titleEn: 'Exclusive Events',
    titleAr: 'فعاليات حصرية',
    descEn: 'Cat cafes, adoption days, and member meetups across KSA',
    descAr: 'مقاهي القطط، أيام التبني، ولقاءات الأعضاء في جميع أنحاء المملكة',
    status: 'coming_soon',
    color: 'var(--brand-green)',
  },
  {
    id: 'loyalty',
    icon: Gift,
    titleEn: 'Rewards Program',
    titleAr: 'برنامج المكافآت',
    descEn: 'Earn points on every order, redeem for free products and upgrades',
    descAr: 'اكسب نقاط على كل طلب، استبدلها بمنتجات مجانية وترقيات',
    status: 'coming_soon',
    color: 'var(--brand-orange)',
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

export function Ecosystem() {
  const { language, isRTL } = useLanguage();

  const getStatusBadge = (status: string) => {
    if (status === 'beta') {
      return {
        text: language === 'en' ? 'Beta' : 'تجريبي',
        className: 'bg-[var(--brand-green)] text-white',
      };
    }
    return {
      text: language === 'en' ? 'Coming Soon' : 'قريباً',
      className: 'bg-gray-200 text-gray-600',
    };
  };

  return (
    <section
      id="ecosystem"
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
          className="text-center mb-16"
        >
          <span className="inline-block text-[var(--brand-orange)] font-semibold mb-3">
            {language === 'en' ? 'The Moracat Ecosystem' : 'منظومة مرقط'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-green)] mb-4">
            {language === 'en' ? 'More Than Just Food' : 'أكثر من مجرد طعام'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {language === 'en'
              ? 'We\'re building a complete care ecosystem for cat parents in Saudi Arabia'
              : 'نحن نبني منظومة رعاية متكاملة لمحبي القطط في المملكة العربية السعودية'}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {ecosystemServices.map((service) => {
            const statusBadge = getStatusBadge(service.status);

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="relative bg-[var(--brand-beige)]/50 rounded-2xl p-6 hover:shadow-lg transition-all group"
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.className}`}>
                    {statusBadge.text}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon
                    className="w-7 h-7"
                    style={{ color: service.color }}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[var(--brand-green)] mb-2">
                  {language === 'ar' ? service.titleAr : service.titleEn}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {language === 'ar' ? service.descAr : service.descEn}
                </p>

                {/* Learn More Link */}
                <div className={`flex items-center gap-1 text-[var(--brand-orange)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{language === 'en' ? 'Learn more' : 'اعرف المزيد'}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            {language === 'en'
              ? 'Join the waitlist to get early access to all ecosystem features'
              : 'انضم لقائمة الانتظار للحصول على وصول مبكر لجميع ميزات المنظومة'}
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 text-[var(--brand-green)] font-semibold hover:text-[var(--brand-orange)] transition-colors"
          >
            {language === 'en' ? 'Join the Waitlist' : 'انضم لقائمة الانتظار'}
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

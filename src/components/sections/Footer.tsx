"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Facebook,
  Send,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import { newsletterSchema, type NewsletterData } from "@/lib/validations";
import { subscribeNewsletter } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/moracat_sa", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/moracat_sa", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com/moracat_sa", label: "Facebook" },
];

export function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, isRTL } = useLanguage();
  const footer = translations.footer;
  const nav = translations.nav;

  const footerLinks = {
    company: [
      { label: footer.aboutUs[language], href: "#about" },
      { label: footer.howItWorksLink[language], href: "#how-it-works" },
      { label: footer.ourProducts[language], href: "#products" },
      { label: footer.careers[language], href: "#" },
    ],
    support: [
      { label: nav.faq[language], href: "#faq" },
      { label: footer.contactUs[language], href: "#" },
      { label: footer.shippingInfo[language], href: "#" },
      { label: footer.returns[language], href: "#" },
    ],
    legal: [
      { label: footer.privacyPolicy[language], href: "/privacy" },
      { label: footer.termsOfService[language], href: "/terms" },
      { label: footer.cookiePolicy[language], href: "#" },
    ],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterData) => {
    setIsSubmitting(true);
    try {
      const result = await subscribeNewsletter(data.email);
      if (result.success) {
        setIsSubscribed(true);
        reset();
        toast.success(
          language === "en"
            ? "Thanks for subscribing!"
            : "شكراً للاشتراك!"
        );
        setTimeout(() => setIsSubscribed(false), 3000);
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      toast.error(
        language === "en"
          ? "Something went wrong. Please try again."
          : "حدث خطأ. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[var(--brand-green)] text-white pt-16 pb-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Moracat - مرقط"
                  width={140}
                  height={48}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-white/70 mb-6 max-w-sm">
                {footer.description[language]}
              </p>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-3">{footer.newsletter[language]}</h4>
                {isSubscribed ? (
                  <p className="text-[var(--brand-orange)]">
                    {language === "en" ? "Thanks for subscribing!" : "شكراً للاشتراك!"}
                  </p>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex gap-2"
                  >
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder={footer.newsletterPlaceholder[language]}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-300 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isSubmitting}
                      className="px-4"
                      aria-label={language === "en" ? "Subscribe to newsletter" : "اشترك في النشرة الإخبارية"}
                    >
                      <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">{footer.company[language]}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">{footer.support[language]}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">{footer.contact[language]}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/70">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a
                  href="mailto:hello@moracat.co"
                  className="hover:text-white transition-colors"
                >
                  hello@moracat.co
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a
                  href="tel:+966501234567"
                  className="hover:text-white transition-colors"
                  dir="ltr"
                >
                  +966 50 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  {language === "en" ? "Riyadh, Saudi Arabia" : "الرياض، المملكة العربية السعودية"}
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-sm text-center md:text-start">
              &copy; {new Date().getFullYear()} Moracat. {footer.copyright[language]} ❤️ {footer.inSaudi[language]} 🇸🇦
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--brand-orange)] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

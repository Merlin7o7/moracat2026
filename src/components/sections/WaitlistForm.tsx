"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, Cat, CheckCircle, Sparkles, AlertCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button, Input } from "@/components/ui";
import { leadFormSchema, type LeadFormData } from "@/lib/validations";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

interface ExtendedFormData extends LeadFormData {
  betaTester?: boolean;
}

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isBetaTester, setIsBetaTester] = useState(false);
  const { language, isRTL } = useLanguage();
  const waitlist = translations.waitlist;
  const common = translations.common;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      numberOfPets: 1,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, betaTester: isBetaTester }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error?.includes("already")) {
          setError(waitlist.alreadyRegistered[language]);
          toast.error(
            language === "en"
              ? "This email is already registered!"
              : "هذا البريد الإلكتروني مسجل مسبقاً!"
          );
        } else {
          setError(result.error || waitlist.error[language]);
          toast.error(
            language === "en"
              ? "Something went wrong. Please try again."
              : "حدث خطأ. يرجى المحاولة مرة أخرى."
          );
        }
        return;
      }

      setIsSubmitted(true);
      reset();
      setIsBetaTester(false);
      toast.success(
        language === "en"
          ? "Welcome to Moracat! Check your email for confirmation."
          : "مرحباً بك في مرقط! تحقق من بريدك الإلكتروني للتأكيد.",
        {
          duration: 5000,
          icon: "🎉",
        }
      );
    } catch (err) {
      console.error("Form submission error:", err);
      setError(waitlist.error[language]);
      toast.error(
        language === "en"
          ? "Network error. Please try again."
          : "خطأ في الشبكة. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const perks = language === "en"
    ? [
        "20% off your first order",
        "Free premium treats on signup",
        "Priority access to new products",
        "Exclusive member-only offers",
      ]
    : [
        "خصم 20% على طلبك الأول",
        "حلوى مجانية عند التسجيل",
        "أولوية الوصول للمنتجات الجديدة",
        "عروض حصرية للأعضاء",
      ];

  return (
    <section id="waitlist" className="py-20 md:py-32" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Background Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--brand-green)] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid md:grid-cols-2">
              {/* Left Side - Info */}
              <div className="p-8 md:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {waitlist.badge[language]}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {waitlist.title[language]}
                  </h2>
                  <p className="text-white/80 mb-8">
                    {waitlist.subtitle[language]}
                  </p>

                  <ul className="space-y-4">
                    {perks.map((perk, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[var(--brand-orange)] flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white/90">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Cat Emoji Decoration */}
                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span className="text-2xl">🐱</span>
                      <span>
                        {language === "en"
                          ? "Join 5,000+ cat parents on the waitlist"
                          : "انضم لأكثر من 5,000 من محبي القطط في قائمة الانتظار"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-20 h-20 bg-[var(--brand-green)] rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-[var(--brand-green)] mb-3">
                        {language === "en" ? "You're In! 🐱" : "أنت معنا! 🐱"}
                      </h3>
                      <p className="text-[var(--brand-green)] font-medium mb-2">
                        {language === "en" ? "Thanks for joining the Moracat family." : "شكراً لانضمامك لعائلة مرقط."}
                      </p>
                      <p className="text-gray-600 mb-6 text-sm">
                        {language === "en"
                          ? "You're now on our early access list. We'll email you as soon as we launch — plus you'll get 20% off your first order."
                          : "أنت الآن في قائمة الوصول المبكر. سنراسلك فور إطلاقنا — بالإضافة إلى خصم 20% على طلبك الأول."}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        {language === "en" ? "Add Another Cat Parent" : "أضف محب قطط آخر"}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-5"
                    >
                      <h3 className="text-xl font-bold text-[var(--brand-green)] mb-6">
                        {language === "en" ? "Reserve Your Spot" : "احجز مكانك"}
                      </h3>

                      {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <Input
                        label={language === "en" ? "Full Name" : "الاسم الكامل"}
                        placeholder={waitlist.namePlaceholder[language]}
                        icon={<User className="w-5 h-5" />}
                        error={errors.name?.message}
                        {...register("name")}
                      />

                      <Input
                        label={common.email[language]}
                        type="email"
                        placeholder={waitlist.emailPlaceholder[language]}
                        icon={<Mail className="w-5 h-5" />}
                        error={errors.email?.message}
                        {...register("email")}
                      />

                      <Input
                        label={language === "en" ? "Phone Number (KSA)" : "رقم الهاتف (السعودية)"}
                        type="tel"
                        placeholder={waitlist.phonePlaceholder[language]}
                        icon={<Phone className="w-5 h-5" />}
                        error={errors.phone?.message}
                        {...register("phone")}
                      />

                      <div>
                        <label
                          htmlFor="numberOfPets"
                          className="block text-sm font-medium text-[var(--brand-green)] mb-2"
                        >
                          {waitlist.catsLabel[language]}
                        </label>
                        <div className="relative">
                          <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-400`}>
                            <Cat className="w-5 h-5" />
                          </div>
                          <select
                            id="numberOfPets"
                            className={`w-full ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border-2 border-gray-200 bg-white text-black appearance-none transition-all duration-300 focus:outline-none focus:border-[var(--brand-green)] focus:ring-2 focus:ring-[var(--brand-green)]/20`}
                            {...register("numberOfPets", { valueAsNumber: true })}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num} {language === "en" ? (num === 1 ? "cat" : "cats") : (num === 1 ? "قط" : "قطط")}
                              </option>
                            ))}
                            <option value={11}>{language === "en" ? "10+ cats" : "+10 قطط"}</option>
                          </select>
                          <div className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 pointer-events-none`}>
                            <svg
                              className="w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        {errors.numberOfPets && (
                          <p className="mt-1 text-sm text-red-500" role="alert">
                            {errors.numberOfPets.message}
                          </p>
                        )}
                      </div>

                      {/* Beta Tester Toggle */}
                      <div className="p-4 bg-[var(--brand-beige)]/50 rounded-xl">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <div className="relative flex items-center">
                            <input
                              type="checkbox"
                              checked={isBetaTester}
                              onChange={(e) => setIsBetaTester(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--brand-green)]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--brand-green)]"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-4 h-4 text-[var(--brand-orange)]" />
                              <span className="text-sm font-medium text-[var(--brand-green)]">
                                {language === "en"
                                  ? "Interested in Beta Testing our App"
                                  : "مهتم بتجربة تطبيقنا التجريبي"}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {language === "en"
                                ? "Get early access to our mobile app and help shape its features"
                                : "احصل على وصول مبكر لتطبيقنا وساعد في تشكيل ميزاته"}
                            </p>
                          </div>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        isLoading={isSubmitting}
                      >
                        {isSubmitting
                          ? (language === "en" ? "Joining..." : "جاري الانضمام...")
                          : common.joinWaitlist[language]}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        {language === "en"
                          ? "By joining, you agree to receive updates about Moracat. We respect your privacy and will never spam you."
                          : "بالانضمام، توافق على تلقي تحديثات عن مرقط. نحن نحترم خصوصيتك ولن نرسل لك رسائل غير مرغوب فيها."}
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

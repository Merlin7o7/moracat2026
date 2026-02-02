"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Lock, Phone, Eye, EyeOff, AlertCircle, Cat } from "lucide-react";
import { toast } from "sonner";
import { Button, Input, LanguageToggle } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    numberOfCats: z.number().min(1).max(20).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language, isRTL } = useLanguage();
  const auth = translations.auth;
  const common = translations.common;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      numberOfCats: 1,
    },
  });

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
          numberOfCats: data.numberOfCats,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMsg = result.error?.includes("already")
          ? (language === "en" ? "This email is already registered" : "هذا البريد الإلكتروني مسجل مسبقاً")
          : (language === "en" ? "Registration failed" : "فشل التسجيل");
        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }

      // Auto sign in after registration
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      toast.success(
        language === "en"
          ? "Welcome to Moracat!"
          : "مرحباً بك في مرقط!",
        { icon: "🎉" }
      );
      router.push("/dashboard");
      router.refresh();
    } catch {
      const errorMsg = language === "en"
        ? "Something went wrong. Please try again."
        : "حدث خطأ. يرجى المحاولة مرة أخرى.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Language Toggle */}
      <div className="flex justify-end mb-4">
        <LanguageToggle variant="pill" />
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.png"
            alt="Moracat - مرقط"
            width={160}
            height={56}
            className="h-14 w-auto mx-auto"
          />
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-[var(--brand-green)] text-center mb-2">
          {auth.registerTitle[language]}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {auth.registerSubtitle[language]}
        </p>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Google Sign Up */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full mb-6"
          onClick={handleGoogleSignIn}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {auth.signUpWithGoogle[language]}
        </Button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              {auth.orRegisterWith[language]}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={language === "en" ? "Full Name" : "الاسم الكامل"}
            placeholder={language === "en" ? "Enter your name" : "أدخل اسمك"}
            icon={<User className="w-5 h-5" />}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label={common.email[language]}
            type="email"
            placeholder={language === "en" ? "your@email.com" : "بريدك@الإلكتروني.com"}
            icon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label={language === "en" ? "Phone (Optional)" : "الهاتف (اختياري)"}
            type="tel"
            placeholder="05XXXXXXXX"
            icon={<Phone className="w-5 h-5" />}
            error={errors.phone?.message}
            {...register("phone")}
          />

          <div>
            <label className="block text-sm font-medium text-[var(--brand-green)] mb-2">
              {language === "en" ? "Number of Cats" : "عدد القطط"}
            </label>
            <div className="relative">
              <div className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-gray-400`}>
                <Cat className="w-5 h-5" />
              </div>
              <select
                className={`w-full ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"} py-3 rounded-xl border-2 border-gray-200 bg-white text-black appearance-none transition-all duration-300 focus:outline-none focus:border-[var(--brand-green)] focus:ring-2 focus:ring-[var(--brand-green)]/20`}
                {...register("numberOfCats", { valueAsNumber: true })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {language === "en" ? (num === 1 ? "cat" : "cats") : (num === 1 ? "قط" : "قطط")}
                  </option>
                ))}
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
          </div>

          <div className="relative">
            <Input
              label={common.password[language]}
              type={showPassword ? "text" : "password"}
              placeholder={language === "en" ? "Create a password" : "أنشئ كلمة مرور"}
              icon={<Lock className="w-5 h-5" />}
              error={errors.password?.message}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute ${isRTL ? "left-4" : "right-4"} top-[38px] text-gray-400 hover:text-gray-600`}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <Input
            label={language === "en" ? "Confirm Password" : "تأكيد كلمة المرور"}
            type={showPassword ? "text" : "password"}
            placeholder={language === "en" ? "Confirm your password" : "أكد كلمة مرورك"}
            icon={<Lock className="w-5 h-5" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              {common.register[language]}
            </Button>
          </div>
        </form>

        {/* Terms */}
        <p className="mt-6 text-xs text-center text-gray-500">
          {language === "en" ? (
            <>
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[var(--brand-green)] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[var(--brand-green)] hover:underline">
                Privacy Policy
              </Link>
            </>
          ) : (
            <>
              بإنشاء حساب، فإنك توافق على{" "}
              <Link href="/terms" className="text-[var(--brand-green)] hover:underline">
                شروط الخدمة
              </Link>{" "}
              و{" "}
              <Link href="/privacy" className="text-[var(--brand-green)] hover:underline">
                سياسة الخصوصية
              </Link>
            </>
          )}
        </p>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-gray-600">
          {auth.haveAccount[language]}{" "}
          <Link
            href="/login"
            className="text-[var(--brand-green)] font-semibold hover:underline"
          >
            {common.login[language]}
          </Link>
        </p>
      </div>

      {/* Back to Home */}
      <p className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-[var(--brand-green)] transition-colors"
        >
          {language === "en" ? "← Back to Homepage" : "→ العودة للصفحة الرئيسية"}
        </Link>
      </p>
    </motion.div>
  );
}

function RegisterLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-[var(--brand-beige)] to-white">
      <Suspense fallback={<RegisterLoading />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}

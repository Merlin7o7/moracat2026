"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button, Input, LanguageToggle } from "@/components/ui";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
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
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          language === "en"
            ? "Invalid email or password"
            : "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        );
        toast.error(
          language === "en"
            ? "Invalid credentials"
            : "بيانات الدخول غير صحيحة"
        );
      } else {
        toast.success(
          language === "en"
            ? "Welcome back!"
            : "مرحباً بعودتك!",
          { icon: "👋" }
        );
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError(
        language === "en"
          ? "Something went wrong. Please try again."
          : "حدث خطأ. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
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
          {auth.loginTitle[language]}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {auth.loginSubtitle[language]}
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

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label={common.email[language]}
            type="email"
            placeholder={language === "en" ? "your@email.com" : "بريدك@الإلكتروني.com"}
            icon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <div className="relative">
            <Input
              label={common.password[language]}
              type={showPassword ? "text" : "password"}
              placeholder={language === "en" ? "Enter your password" : "أدخل كلمة المرور"}
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-[var(--brand-green)] focus:ring-[var(--brand-green)]"
              />
              <span className="text-gray-600">
                {language === "en" ? "Remember me" : "تذكرني"}
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-[var(--brand-orange)] hover:underline"
            >
              {auth.forgotPassword[language]}
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            {common.login[language]}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              {auth.orContinueWith[language]}
            </span>
          </div>
        </div>

        {/* Google Sign In */}
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
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
          {auth.signInWithGoogle[language]}
        </Button>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-gray-600">
          {auth.noAccount[language]}{" "}
          <Link
            href="/register"
            className="text-[var(--brand-green)] font-semibold hover:underline"
          >
            {common.register[language]}
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

function LoginLoading() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-8" />
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-[var(--brand-beige)] to-white">
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

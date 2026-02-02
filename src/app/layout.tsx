import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { LanguageProvider } from "@/lib/language-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moracat.co"),
  title: {
    default: "Moracat | مرقط - Premium Cat Food Subscription Saudi Arabia",
    template: "%s | Moracat مرقط",
  },
  description:
    "Gourmet nutrition for your feline royalty, delivered to your door in KSA. Premium cat food subscription service with personalized plans. اشتراك طعام قطط فاخر في السعودية.",
  keywords: [
    "cat food",
    "premium cat food",
    "cat food subscription",
    "Saudi Arabia",
    "KSA",
    "pet food delivery",
    "مرقط",
    "طعام قطط",
    "اشتراك طعام قطط",
    "طعام قطط السعودية",
    "توصيل طعام حيوانات",
  ],
  authors: [{ name: "Moracat" }],
  creator: "Moracat",
  publisher: "Moracat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Moracat | مرقط - Premium Cat Food Subscription",
    description:
      "Gourmet nutrition for your feline royalty, delivered to your door in KSA. اشتراك طعام قطط فاخر في السعودية",
    url: "https://moracat.co",
    siteName: "Moracat مرقط",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Moracat - Premium Cat Food Subscription",
      },
    ],
    locale: "en_SA",
    alternateLocale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moracat | مرقط - Premium Cat Food Subscription",
    description:
      "Gourmet nutrition for your feline royalty, delivered to your door in KSA.",
    images: ["/og-image.png"],
    creator: "@moracat_sa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexArabic.variable} antialiased font-sans`}
      >
        <LanguageProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "var(--brand-green)",
                  color: "white",
                  border: "none",
                },
                className: "sonner-toast",
              }}
              richColors
              closeButton
            />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

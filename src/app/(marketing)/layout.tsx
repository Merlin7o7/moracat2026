import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MobileNav, WhatsAppButton } from "@/components/ui";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="md:pb-0 pb-20">{children}</main>
      <Footer />
      <MobileNav />
      <WhatsAppButton />
    </>
  );
}

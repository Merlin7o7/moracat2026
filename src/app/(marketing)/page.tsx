import {
  Hero,
  HowItWorks,
  Products,
  BrandGrid,
  Subscription,
  BoxShowcase,
  SavingsCalculator,
  SubscriptionBuilder,
  VetSupport,
  Ecosystem,
  About,
  FAQ,
  WaitlistForm,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Products />
      <BrandGrid />
      <VetSupport />
      <Subscription />
      <BoxShowcase />
      <SavingsCalculator />
      <SubscriptionBuilder />
      <Ecosystem />
      <About />
      <FAQ />
      <WaitlistForm />
    </>
  );
}

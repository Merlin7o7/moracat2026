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
  WhyMoracat,
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
      <WhyMoracat />
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

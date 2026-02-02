import {
  Hero,
  HowItWorks,
  Products,
  Subscription,
  SubscriptionBuilder,
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
      <Subscription />
      <SubscriptionBuilder />
      <About />
      <FAQ />
      <WaitlistForm />
    </>
  );
}

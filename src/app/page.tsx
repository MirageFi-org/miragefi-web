import { Header } from "@/components/Header";
import { Hero } from "@/components/home/Hero";
import { PricingLedger } from "@/components/home/PricingLedger";
import { SessionClock } from "@/components/home/SessionClock";
import { VenueLanes } from "@/components/home/VenueLanes";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <div className="page">
          <PricingLedger />
          <SessionClock />
          <VenueLanes />
        </div>
      </main>
      <Footer />
    </div>
  );
}

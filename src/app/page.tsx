import { Header } from "@/components/Header";
import { Hero } from "@/components/home/Hero";
import { PricingLedger } from "@/components/home/PricingLedger";
import { SessionClock } from "@/components/home/SessionClock";
import { VenueLanes } from "@/components/home/VenueLanes";
import { CompareTable } from "@/components/home/CompareTable";
import { ChainBand } from "@/components/home/ChainBand";
import { PromiseGrid } from "@/components/home/PromiseGrid";
import { Questions } from "@/components/home/Questions";
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
          <CompareTable />
        </div>
        <ChainBand />
        <div className="page">
          <PromiseGrid />
          <Questions />
        </div>
      </main>
      <Footer />
    </div>
  );
}

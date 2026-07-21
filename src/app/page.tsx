import { Header } from "@/components/Header";
import { Hero } from "@/components/home/Hero";
import { PricingLedger } from "@/components/home/PricingLedger";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <div className="page">
          <PricingLedger />
        </div>
      </main>
      <Footer />
    </div>
  );
}

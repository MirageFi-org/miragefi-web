import { Header } from "@/components/Header";
import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import SplitSection from "@/components/landing/SplitSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <SplitSection />
      <CTASection />
      <Footer />
    </main>
  );
}

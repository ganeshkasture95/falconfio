import CaseStudiesSection from "@/components/CaseStudiesSection";
import CTASection from "@/components/CTASection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import PricingSection from "@/components/PricingSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import TechnologySection from "@/components/TechnologySection";
import AnimatedGrid from "@/components/AnimatedGrid";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Global Animated Grid Background */}
      <AnimatedGrid intensity="medium" className="fixed inset-0 -z-30" />
      
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <DifferentiatorsSection />
      <TechnologySection />
      <PricingSection />
      <CaseStudiesSection />
      <CTASection />
      <Footer />
    </main>
  );
}

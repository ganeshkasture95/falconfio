import AgentsBand from "@/components/sections/AgentsBand";
import Commitments from "@/components/sections/Commitments";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Problem from "@/components/sections/Problem";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import StackStrip from "@/components/sections/StackStrip";
import SuccessStories from "@/components/sections/SuccessStories";
import TechStack from "@/components/sections/TechStack";
import ToolsTeaser from "@/components/sections/ToolsTeaser";
import WhyFalconfio from "@/components/sections/WhyFalconfio";

/** Section order follows PRD §6.1. Testimonials (row 13) stay hidden until there are verified quotes. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <StackStrip />
      <WhyFalconfio />
      <SuccessStories />
      <Services />
      <Problem />
      <AgentsBand />
      <Commitments />
      <TechStack />
      <Process />
      <Industries />
      <ToolsTeaser />
      <Faq />
      <FinalCta />
    </>
  );
}

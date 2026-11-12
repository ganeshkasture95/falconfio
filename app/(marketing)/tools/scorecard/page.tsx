import type { Metadata } from "next";
import Scorecard from "@/components/tools/Scorecard";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Architecture Scalability Scorecard",
  description: "Answer 12 quick questions and get a free score out of 100 for how well your system will handle growth, with your top three risks and what to fix first.",
};

export default function ScorecardPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool · 5 minutes"
        title={
          <>
            Will your architecture survive <span className="text-periwinkle">10× growth?</span>
          </>
        }
        intro="Twelve quick questions across six areas. You get a score out of 100, a picture of your strengths and gaps, and the three things to fix first. No sign-up needed."
        guide="The Architecture Scorecard: a free self-assessment of how ready your system is for growth."
        className="pb-24"
      />
      <section className="bg-background-tint pb-20 sm:pb-24">
        <Container className="relative z-10 -mt-20 max-w-5xl">
          <Scorecard />
        </Container>
      </section>
    </>
  );
}

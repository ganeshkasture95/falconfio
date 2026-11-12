import type { Metadata } from "next";
import { Suspense } from "react";
import Estimator from "@/components/tools/Estimator";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Project Cost & Timeline Estimator",
  description: "Pick what you want to build and get a rough timeline, team size and the best way to work with us, in under a minute.",
};

export default function EstimatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tool · 1 minute"
        title={
          <>
            How long will your project <span className="text-periwinkle">really take?</span>
          </>
        }
        intro="Choose what you want to build. You get a rough timeline, the team size it needs and the way of working that fits, and you can share the link with your team."
        guide="The Project Estimator: a quick, rough guide to timeline and team size for your project."
        className="pb-24"
      />
      <section className="bg-background-tint pb-20 sm:pb-24">
        <Container className="relative z-10 -mt-20">
          <Suspense fallback={<div className="h-[640px] animate-pulse rounded-3xl border border-border bg-card" aria-hidden />}>
            <Estimator />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

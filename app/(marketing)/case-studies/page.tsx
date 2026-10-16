import type { Metadata } from "next";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import FinalCta from "@/components/sections/FinalCta";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { getCaseStudies } from "@/lib/content/case-studies";

export const metadata: Metadata = {
  title: "Case studies",
  description: "How Falconfio builds systems that scale and AI agents that pay for themselves, told through real projects and their results.",
};

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  const industries = [...new Set(studies.map((s) => s.meta.industry))];

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white" data-guide="All our case studies: the problem, what we built and the results.">
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <Eyebrow onDark>Our work</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Results we can show, <span className="text-periwinkle">not just promise</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Each story covers the problem, the architecture we chose and the numbers that moved. Pick one that looks like your
            situation.
          </p>
          <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8">
            <div>
              <dt className="text-sm text-white/70">Case studies</dt>
              <dd className="mt-1 text-3xl font-bold">{studies.length}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/70">Industries</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {industries.map((i) => (
                  <span key={i} className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {studies.map((s, i) => (
              <CaseStudyCard key={s.slug} study={s} wide={i === 0 && studies.length % 2 === 1} />
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

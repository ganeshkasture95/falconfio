import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { ButtonLink, Container, SectionHeader } from "@/components/ui/primitives";
import { getCaseStudies } from "@/lib/content/case-studies";

export default async function SuccessStories() {
  const studies = (await getCaseStudies()).filter((s) => s.meta.featured).slice(0, 4);
  if (studies.length === 0) return null;

  return (
    <section id="case-studies" className="bg-background py-20 sm:py-24" data-guide="Real projects and their results. Click any card to read the full story.">
      <Container>
        <SectionHeader
          eyebrow="Our work"
          title="Success stories"
          intro="Every product has its own constraints. Here is how we turned them into systems that scale and agents that pay for themselves."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {studies.map((s, i) => (
            <CaseStudyCard key={s.slug} study={s} wide={i === 0 && studies.length % 2 === 1} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/case-studies" variant="outline" arrow>
            See all case studies
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

import { TechLogo } from "@/components/brand/TechLogo";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { techStack } from "@/content/data/site";

export default function TechStack() {
  return (
    <section id="technology" className="bg-background py-20 sm:py-24" data-guide="Our tech stack, grouped by area. Hover a logo to see where it fits.">
      <Container>
        <SectionHeader
          align="left"
          eyebrow="Our tech stack"
          title="Proven tools, chosen for the job"
          intro="We pick boring, battle-tested technology for the core and modern tools where they give you an edge."
        />
        <dl className="mt-12 divide-y divide-border border-y border-border">
          {techStack.map((row) => (
            <div key={row.group} className="grid gap-4 py-6 md:grid-cols-[220px_1fr] md:items-center">
              <dt className="font-semibold">{row.group}</dt>
              <dd className="flex flex-wrap gap-2">
                {row.items.map((t) => (
                  <span
                    key={t}
                    data-guide={`${t}: part of our ${row.group.toLowerCase()} toolkit.`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2 pr-3.5 text-sm font-medium transition-colors hover:border-primary hover:bg-background-alt"
                  >
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-background-alt">
                      <TechLogo name={t} className="size-4" />
                    </span>
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

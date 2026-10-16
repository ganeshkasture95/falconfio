import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Icon, SectionHeader } from "@/components/ui/primitives";
import { industries } from "@/content/data/site";

export default function Industries() {
  return (
    <section id="industries" className="bg-background py-20 sm:py-24" data-guide="Industries we know well. Each tile opens a page with the problems we solve there.">
      <Container>
        <SectionHeader
          eyebrow="Our expertise"
          title="Industries we build for"
          intro="Each industry has its own rules, data and failure modes. We bring patterns that already work in yours."
        />
      </Container>
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:overflow-visible lg:px-8">
        {industries.map((ind) => (
          <li key={ind.name} className="w-[240px] shrink-0 snap-start lg:w-auto">
            <Link
              href={`/solutions/${ind.slug}`}
              data-guide={`${ind.name}: see the agents, architecture patterns and case studies for this industry.`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background-alt transition-all hover:-translate-y-1 hover:border-primary"
            >
              <span className="relative flex aspect-[16/10] items-center justify-center bg-navy text-white">
                <span className="bg-dots absolute inset-0 opacity-50" aria-hidden />
                <Icon name={ind.icon} className="relative size-12 transition-transform group-hover:scale-110" />
              </span>
              <span className="flex items-center justify-between px-5 py-4 font-semibold">
                {ind.name}
                <ArrowUpRight className="size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

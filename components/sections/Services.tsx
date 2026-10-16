import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Container, Icon, SectionHeader } from "@/components/ui/primitives";
import { catalogue, solutionCount } from "@/content/data/services";
import { services } from "@/content/data/site";
import { cn } from "@/lib/utils";

export default function Services() {
  return (
    <section id="services" className="bg-background-tint py-20 sm:py-24" data-guide="Everything we can build for you. Each card opens a page with details, examples and pricing.">
      <Container>
        <SectionHeader
          eyebrow="Our services"
          title="Engineering and AI, built around what you need"
          intro="Whether you are launching an MVP, scaling past your first million users, or putting AI agents to work, one senior team takes you from plan to production."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const featured = s.slug === "ai";
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-guide={`${s.title}: ${s.description.split(". ")[0]}.`}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all hover:-translate-y-1",
                  featured
                    ? "border-navy bg-navy text-white shadow-featured"
                    : "border-border bg-card hover:border-primary hover:shadow-card",
                )}
              >
                <div className="relative -mx-7 -mt-7 mb-6 aspect-[16/9] overflow-hidden bg-navy">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {featured && <span className="absolute inset-0 bg-navy/25" aria-hidden />}
                </div>
                {featured && (
                  <span className="absolute right-6 top-0 z-10 rounded-b-lg bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
                    Core pillar
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl",
                      featured ? "bg-white/10 text-white" : "bg-accent text-primary",
                    )}
                  >
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <h3 className="text-xl font-semibold leading-snug">{s.title}</h3>
                </div>
                <p className={cn("mt-5 flex-1 text-[15px] leading-relaxed", featured ? "text-white/80" : "text-muted-foreground")}>
                  {s.description}
                </p>
                <span className={cn("mt-7 inline-flex items-center gap-1.5 text-sm font-semibold", featured ? "text-white" : "text-primary")}>
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/services" variant="outline" arrow>
            See all {catalogue.length} services and {solutionCount} solutions
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

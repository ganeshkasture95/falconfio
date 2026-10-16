import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import FinalCta from "@/components/sections/FinalCta";
import SolutionFinder, { type FinderItem } from "@/components/services/SolutionFinder";
import { ButtonLink, Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { catalogue, serviceGroups, solutionCount, solutionId } from "@/content/data/services";
import { engagements, site } from "@/content/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every service Falconfio offers: web and mobile products, MVPs, design, scalable architecture, DevOps, AI agents, data, integrations, testing, security, rescue and technical leadership.",
};

const finderItems: FinderItem[] = catalogue.flatMap((s) =>
  s.solutions.map((sol) => ({ title: sol.title, body: sol.body, service: s.title, href: `/services/${s.slug}#${solutionId(sol.title)}` })),
);

export default function ServicesPage() {
  return (
    <>
      {/* Header + finder */}
      <section
        className="relative overflow-hidden bg-navy text-white"
        data-guide="Everything we offer, in one place. Search for what you need, or browse by area below."
      >
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Eyebrow onDark>Services</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              One team for everything your product <span className="text-periwinkle">needs</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Design, build, scale, automate and secure. Start with one service or combine several, and work with the same senior engineers
              from first call to launch.
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-8">
              {[
                [catalogue.length, "Services"],
                [solutionCount, "Solutions"],
                [serviceGroups.length, "Areas of expertise"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dd className="text-3xl font-bold">{n}</dd>
                  <dt className="mt-1 text-sm text-white/70">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <SolutionFinder items={finderItems} />
        </Container>
      </section>

      {/* Area jump links */}
      <nav aria-label="Service areas" className="sticky top-[72px] z-30 border-b border-border bg-background/95 backdrop-blur">
        <Container className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {serviceGroups.map((g, i) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="shrink-0 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <span className="mr-1.5 font-mono text-xs text-muted-foreground">0{i + 1}</span>
              {g.title}
            </a>
          ))}
        </Container>
      </nav>

      {/* Every service, by area */}
      {serviceGroups.map((g, gi) => {
        const items = catalogue.filter((s) => s.group === g.id);
        return (
          <section
            key={g.id}
            id={g.id}
            className={cn("scroll-mt-32 py-20 sm:py-24", gi % 2 === 1 ? "bg-background-tint" : "bg-background")}
            data-guide={`${g.title}: ${g.intro}`}
          >
            <Container className="grid gap-10 lg:grid-cols-[300px_1fr]">
              <div className="lg:sticky lg:top-40 lg:self-start">
                <span className="font-mono text-sm font-semibold text-primary">0{gi + 1}</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">{g.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{g.intro}</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {items.map((s) => {
                  const wide = items.length % 2 === 1 && items.length > 1 && s === items[0];
                  return (
                    <article
                      key={s.slug}
                      data-guide={`${s.title}: ${s.short} Click to see all ${s.solutions.length} solutions.`}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift",
                        wide && "md:col-span-2 md:flex-row",
                      )}
                    >
                      <div
                        className={cn("relative aspect-[16/9] overflow-hidden bg-navy", wide && "md:aspect-auto md:w-[42%] md:shrink-0")}
                      >
                        <Image
                          src={s.image.src}
                          alt={s.image.alt}
                          fill
                          sizes={
                            wide
                              ? "(min-width: 1024px) 380px, (min-width: 768px) 42vw, 100vw"
                              : "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                          }
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                                                <span className="absolute bottom-4 left-4 inline-flex size-12 items-center justify-center rounded-2xl border-2 border-white bg-navy text-white shadow-float">
                          <Icon name={s.icon} className="size-6" />
                        </span>
                        {s.core && (
                          <span className="absolute right-4 top-4 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-navy">
                            Core
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="text-xl font-semibold">
                          <Link href={`/services/${s.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                            {s.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                        <ul className={cn("mt-5 grid gap-x-6 gap-y-2 border-t border-border pt-5 text-sm", wide && "sm:grid-cols-2")}>
                          {s.solutions.map((sol) => (
                            <li key={sol.title} className="flex items-start gap-2">
                              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                              {sol.title}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
                          Explore the service
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </Container>
          </section>
        );
      })}

      {/* Engagement models */}
      <section
        className="bg-navy py-20 text-white sm:py-24"
        data-guide="Four ways to work with us, from a fixed project to an ongoing retainer."
      >
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow onDark>Ways to work with us</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">Start the way that suits you</h2>
            </div>
            <ButtonLink href={site.bookingUrl} variant="white">
              Help me choose
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((e) => (
              <Link
                key={e.code}
                href={e.href}
                className="group rounded-2xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-white/40 hover:bg-white/10"
              >
                <span className="font-mono text-sm text-periwinkle">{e.code}</span>
                <h3 className="mt-3 text-lg font-semibold">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{e.body}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div className="pt-20 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}

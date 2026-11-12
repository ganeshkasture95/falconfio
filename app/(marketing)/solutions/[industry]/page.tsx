import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import FinalCta from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, Container, Icon, SectionHeader } from "@/components/ui/primitives";
import { agentCatalogue } from "@/content/data/agents";
import { getIndustry, industryPages } from "@/content/data/industries";
import { getService } from "@/content/data/services";
import { site } from "@/content/data/site";
import { getCaseStudies } from "@/lib/content/case-studies";

export function generateStaticParams() {
  return industryPages.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[industry]">): Promise<Metadata> {
  const ind = getIndustry((await params).industry);
  if (!ind) return {};
  return { title: `Software & AI agents for ${ind.name}`, description: `${ind.headline}. ${ind.intro}` };
}

export default async function IndustryPage({ params }: PageProps<"/solutions/[industry]">) {
  const ind = getIndustry((await params).industry);
  if (!ind) notFound();

  const agents = ind.agents.map((slug) => agentCatalogue.find((a) => a.slug === slug)).filter((a) => a !== undefined);
  const services = ind.services.map(getService).filter((s) => s !== undefined);
  const studies = ind.caseStudyIndustry ? (await getCaseStudies()).filter((c) => c.meta.industry === ind.caseStudyIndustry) : [];
  const others = industryPages.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <PageHero
        eyebrow={`Industries · ${ind.name}`}
        title={ind.headline}
        intro={ind.intro}
        guide={`${ind.name}: the problems we solve, the agents and architecture we use, and the rules we design for.`}
        back={{ href: "/#industries", label: "All industries" }}
        aside={
          <div className="hidden justify-center lg:flex">
            <span className="inline-flex size-48 items-center justify-center rounded-[48px] border border-white/20 bg-white/5 text-periwinkle">
              <Icon name={ind.icon} className="size-24" />
            </span>
          </div>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.bookingUrl} variant="white">
            Book a free discovery call
          </ButtonLink>
          <ButtonLink href="#agents" variant="ghostOnDark">
            See the agents
          </ButtonLink>
        </div>
      </PageHero>

      {/* Pains */}
      <section className="bg-background py-20 sm:py-24" data-guide={`Common problems for ${ind.name.toLowerCase()} teams.`}>
        <Container>
          <SectionHeader align="left" eyebrow="The problem" title={`What slows ${ind.name.toLowerCase()} teams down`} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ind.pains.map((p) => (
              <li key={p.title} className="rounded-2xl border border-border bg-card p-6">
                <AlertTriangle className="size-5 text-primary" aria-hidden />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Agents */}
      <section id="agents" className="scroll-mt-24 bg-background-tint py-20 sm:py-24" data-guide={`AI agents that fit ${ind.name.toLowerCase()} work. Click one to see it in the catalogue.`}>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader align="left" eyebrow="AI agents" title="Agents that take work off your team" />
            <ButtonLink href="/agents" variant="outline" arrow>
              Try the live demos
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {agents.map((a) => (
              <li key={a.slug} className="flex flex-col rounded-3xl border border-border bg-card p-7">
                <span className="w-fit rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{a.fn}</span>
                <h3 className="mt-4 text-xl font-semibold">{a.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <UserCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {a.human}
                </p>
                <Link href={`/agents#${a.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary hover:underline">
                  See how it works <ArrowRight className="size-4" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Pattern + compliance */}
      <section className="bg-navy py-20 text-white sm:py-24" data-guide="The architecture pattern we usually use here, and the regulations we design for.">
        <Container className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <SectionHeader onDark align="left" eyebrow="Architecture pattern" title={ind.pattern.title} />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {ind.pattern.steps.map(([t, b], i) => (
                <li key={t} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                  <span className="font-mono text-sm text-periwinkle">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{b}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="self-start rounded-3xl bg-white p-7 text-navy">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="size-5 text-primary" aria-hidden /> Built for the rules you work under
            </h2>
            <ul className="mt-5 grid gap-3">
              {ind.compliance.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /> {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">We prepare systems and evidence; certification is done by an independent auditor.</p>
          </aside>
        </Container>
      </section>

      {/* Services */}
      <section className="bg-background py-20 sm:py-24" data-guide={`The services ${ind.name.toLowerCase()} clients use most.`}>
        <Container>
          <SectionHeader align="left" eyebrow="How we help" title="Services we combine for you" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold group-hover:text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {studies.length > 0 && (
        <section className="bg-background-tint py-20 sm:py-24" data-guide="Related projects and their results.">
          <Container>
            <SectionHeader align="left" eyebrow="Proof" title="Related case studies" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {studies.map((c) => (
                <CaseStudyCard key={c.slug} study={c} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Other industries */}
      <section className="bg-background py-16" data-guide="Other industries we work with.">
        <Container>
          <h2 className="text-sm font-semibold text-muted-foreground">Other industries</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/solutions/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">
                  <Icon name={o.icon} className="size-4" /> {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

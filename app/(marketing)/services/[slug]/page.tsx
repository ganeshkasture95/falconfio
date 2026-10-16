import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Plus, Sparkles } from "lucide-react";
import { TechLogo, hasTechLogo } from "@/components/brand/TechLogo";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import FinalCta from "@/components/sections/FinalCta";
import { ButtonLink, Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { catalogue, getService, serviceGroups, solutionId } from "@/content/data/services";
import { site } from "@/content/data/site";
import { getCaseStudies } from "@/lib/content/case-studies";

export function generateStaticParams() {
  return catalogue.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.description };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const group = serviceGroups.find((g) => g.id === s.group)!;
  const studies = (await getCaseStudies()).filter((c) => s.caseStudies?.includes(c.slug));
  const related = [
    ...catalogue.filter((c) => c.group === s.group && c.slug !== s.slug),
    ...catalogue.filter((c) => c.group !== s.group && c.core && c.slug !== s.slug),
  ].slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy text-white" data-guide={`${s.title}: ${s.short}`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative pb-20 pt-10 sm:pb-24">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/75">
            <Link href="/services" className="inline-flex items-center gap-2 hover:text-white">
              <ArrowLeft className="size-4" aria-hidden /> All services
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/services#${group.id}`} className="hover:text-white">
              {group.title}
            </Link>
          </nav>
          <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-white text-navy">
                <Icon name={s.icon} className="size-8" />
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">{s.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{s.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={site.bookingUrl} variant="white" guide="Book a free 30-minute call about this service with an engineer.">
                  Book a free discovery call
                </ButtonLink>
                <ButtonLink href="#solutions" variant="ghostOnDark">
                  See all {s.solutions.length} solutions
                </ButtonLink>
              </div>
            </div>
            <div className="relative sm:pb-16 lg:pb-20">
              <figure className="relative aspect-[3/2] overflow-hidden rounded-3xl border-2 border-white/15 bg-navy-900">
                <Image src={s.image.src} alt={s.image.alt} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
                <figcaption className="absolute right-3 top-3 rounded-full bg-navy/80 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur">
                  Photo:{" "}
                  <a href={s.image.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                    {s.image.credit}
                  </a>
                </figcaption>
              </figure>
              <div
                className="relative mx-4 -mt-10 rounded-3xl border border-white/15 bg-navy p-6 shadow-float sm:absolute sm:bottom-0 sm:-left-6 sm:right-10 sm:m-0 lg:-left-10"
                data-guide="Who this service usually helps most."
              >
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-periwinkle">Ideal for</h2>
                <ul className="mt-4 grid gap-3">
                  {s.idealFor.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]">
                      <Check className="mt-0.5 size-5 shrink-0 text-periwinkle" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section id="solutions" className="scroll-mt-24 bg-background py-20 sm:py-24" data-guide={`Everything we can do within ${s.title}. Hover a card for details.`}>
        <Container>
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {s.solutions.length} ways we can help
          </h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.solutions.map((sol, i) => (
              <div
                key={sol.title}
                id={solutionId(sol.title)}
                data-guide={`${sol.title}: ${sol.body}`}
                className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 transition-all target:border-primary target:shadow-lift hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
              >
                <span className="font-mono text-xs font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{sol.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sol.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deliverables + outcomes */}
      <section className="bg-background-tint py-20 sm:py-24" data-guide="What you get from us, and what changes for your business.">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold tracking-tight">What you get</h2>
            <ul className="mt-6 grid gap-4">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-navy p-8 text-white">
            <h2 className="text-2xl font-bold tracking-tight">What changes for you</h2>
            <ul className="mt-6 grid gap-4">
              {s.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 size-5 shrink-0 text-periwinkle" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-background py-20 sm:py-24" data-guide="How an engagement for this service usually runs, step by step.">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Our approach</h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {s.approach.map(([stage, text], i) => (
              <li key={stage} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-navy font-mono text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                {i < s.approach.length - 1 && (
                  <ArrowRight className="absolute -right-3 top-9 z-10 hidden size-5 rounded-full bg-background text-primary md:block" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Tech */}
      <section className="bg-background pb-20 sm:pb-24" data-guide="The tools we usually use for this service.">
        <Container>
          <div className="rounded-3xl border border-border bg-background-tint p-8 sm:p-10">
            <h2 className="text-xl font-bold">Tools we use</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.tech.map((t) => (
                <li
                  key={t}
                  data-guide={`${t}: one of the tools we use for ${s.title.toLowerCase()}.`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2 pr-3.5 text-sm font-medium"
                >
                  {hasTechLogo(t) && (
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-background-alt">
                      <TechLogo name={t} className="size-4" />
                    </span>
                  )}
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Case studies */}
      {studies.length > 0 && (
        <section className="bg-background-tint py-20 sm:py-24" data-guide="Projects where we delivered this service.">
          <Container>
            <Eyebrow>Proof</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Related case studies</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {studies.map((c) => (
                <CaseStudyCard key={c.slug} study={c} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-background py-20 sm:py-24" data-guide="Common questions about this service. Click one to open the answer.">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Questions we often hear</h2>
            <p className="mt-4 text-muted-foreground">
              Something else on your mind?{" "}
              <Link href="/contact" className="font-semibold text-primary underline underline-offset-2">
                Ask us directly
              </Link>
              .
            </p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-background-tint py-20 sm:py-24" data-guide="Services that often go together with this one.">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Often combined with</h2>
            <ButtonLink href="/services" variant="outline" arrow>
              All services
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/services/${r.slug}`}
                className="group rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name={r.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold group-hover:text-primary">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.short}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div className="bg-background pt-20 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}

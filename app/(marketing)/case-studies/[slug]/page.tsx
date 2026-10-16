import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, CalendarDays, Factory } from "lucide-react";
import { TechLogo, hasTechLogo } from "@/components/brand/TechLogo";
import CaseStudyCard, { splitResult } from "@/components/case-studies/CaseStudyCard";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { site } from "@/content/data/site";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return { title: study.meta.title, description: study.meta.description };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();
  const { meta, Content } = study;
  const more = (await getCaseStudies()).filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-navy text-white" data-guide={`Case study: ${meta.title}. Scroll for the challenge, our approach and the results.`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative pb-16 pt-10 sm:pb-20">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-medium text-white/75 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden /> All case studies
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Eyebrow onDark>{meta.industry}</Eyebrow>
            {meta.status === "draft" && (
              <span className="rounded-full border border-white/40 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                Draft · not verified
              </span>
            )}
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">{meta.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{meta.description}</p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
            <li className="inline-flex items-center gap-2">
              <Building2 className="size-4 text-periwinkle" aria-hidden /> {meta.client}
            </li>
            <li className="inline-flex items-center gap-2">
              <Factory className="size-4 text-periwinkle" aria-hidden /> {meta.industry}
            </li>
            <li className="inline-flex items-center gap-2">
              <CalendarDays className="size-4 text-periwinkle" aria-hidden /> {formatDate(meta.date)}
            </li>
          </ul>
        </Container>
      </section>

      {/* Results */}
      <section className="relative -mt-px bg-background" data-guide="The headline results of this project.">
        <Container className="py-14">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">The results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {meta.results.map((r) => {
              const { figure, caption } = splitResult(r);
              return (
                <div key={r} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card">
                  <span className="absolute left-6 top-0 h-1 w-10 rounded-b-full bg-primary" aria-hidden />
                  {figure && <dt className="text-4xl font-bold tracking-tight text-foreground">{figure}</dt>}
                  <dd className={figure ? "mt-2 text-sm leading-relaxed text-muted-foreground" : "text-sm font-medium leading-relaxed"}>
                    {caption}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      </section>

      {/* Story + sidebar */}
      <section className="bg-background pb-20 sm:pb-24">
        <Container className="grid gap-12 border-t border-border pt-14 lg:grid-cols-[1fr_320px]">
          <article className="prose-falcon min-w-0 max-w-3xl">
            <Content />
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-background-tint p-6" data-guide="The technologies and services behind this project.">
              <h2 className="text-sm font-semibold">At a glance</h2>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Client</dt>
                  <dd className="mt-0.5 font-medium">{meta.client}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Industry</dt>
                  <dd className="mt-0.5 font-medium">{meta.industry}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Technologies</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {meta.technologies.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium">
                        {hasTechLogo(t) && <TechLogo name={t} className="size-3.5" />}
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-4 rounded-2xl bg-navy p-6 text-white">
              <p className="text-lg font-semibold">Facing something similar?</p>
              <p className="mt-2 text-sm text-white/80">Talk to the engineers who built this. 30 minutes, no sales script.</p>
              <ButtonLink href={site.bookingUrl} variant="white" className="mt-5 w-full">
                Book a free call
              </ButtonLink>
            </div>
          </aside>
        </Container>
      </section>

      {more.length > 0 && (
        <section className="bg-background-tint py-20 sm:py-24" data-guide="More case studies you might find useful.">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight">More case studies</h2>
              <ButtonLink href="/case-studies" variant="outline" arrow>
                See all
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {more.map((s) => (
                <CaseStudyCard key={s.slug} study={s} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

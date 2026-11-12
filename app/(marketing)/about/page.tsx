import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Eye, Handshake, Sparkles, Target } from "lucide-react";
import { FalcoMark } from "@/components/brand/FalcoMark";
import { LogoMark } from "@/components/brand/Logo";
import FinalCta from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, Container, Icon, SectionHeader } from "@/components/ui/primitives";
import { products } from "@/content/data/products";
import { catalogue, serviceGroups } from "@/content/data/services";
import { reasons, site } from "@/content/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Falconfio is a technical brand by ${site.parent}: a senior team that builds products that scale and AI agents that do real work.`,
};

const values = [
  { icon: Target, title: "Precision", body: "We measure before we change, and we design for the load you'll have, not the load you have today." },
  { icon: Sparkles, title: "Speed with care", body: "Working software every week, without cutting the corners that cost you later." },
  { icon: Eye, title: "Honesty", body: "Clear estimates, early warnings, and a straight answer when something isn't the right fit, even if that means less work for us." },
  { icon: Handshake, title: "Ownership", body: "We treat your product like our own, and we leave you owning everything: code, data and know-how." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Precision at speed, <span className="text-periwinkle">for teams who build</span>
          </>
        }
        intro={`Falconfio is a technical brand by ${site.parent}. We're a senior engineering team that helps companies build products that keep working as they grow, and AI agents that take real work off people's plates.`}
        guide="About Falconfio: who we are, what we believe and how we work."
        aside={
          <div className="hidden justify-center lg:flex">
            <div className="flex size-64 items-center justify-center rounded-[56px] bg-white">
              <LogoMark className="w-44" title="Falconfio" />
            </div>
          </div>
        }
      />

      {/* Story */}
      <section className="bg-background py-20 sm:py-24" data-guide="Why Falconfio exists.">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeader align="left" eyebrow="Our story" title="Why we started Falconfio" />
          <div className="grid gap-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              We kept seeing the same story. A product finds its market, users arrive, and the system that got it there starts to crack: slow pages,
              risky releases, a cloud bill that grows faster than revenue. Teams that should be building features spend their weeks firefighting.
            </p>
            <p>
              At the same time, AI promised to take repetitive work off people&apos;s plates, but most attempts stopped at a demo. They didn&apos;t connect to
              the tools people actually use, and nobody trusted them to act.
            </p>
            <p className="text-foreground">
              Falconfio exists to fix both. We build software that is ready for growth from day one, and AI agents that work inside your tools with
              guardrails and a person in the loop. Like the falcon in our logo, we aim to be precise and fast.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-navy py-20 text-white sm:py-24" data-guide="The values behind how we work.">
        <Container>
          <SectionHeader onDark eyebrow="What we believe" title="Four values we hold ourselves to" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: I, title, body }) => (
              <li key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <I className="size-6 text-periwinkle" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How we're different */}
      <section className="bg-background py-20 sm:py-24" data-guide="What makes working with us different.">
        <Container>
          <SectionHeader eyebrow="How we work" title="What you can expect from us" />
          <ul className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <li key={r.title}>
                <span className="font-mono text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <ButtonLink href="/how-we-work" variant="outline" arrow>
              See how a project runs
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="bg-background-tint py-20 sm:py-24" data-guide="Everything we do, grouped by area.">
        <Container>
          <SectionHeader align="left" eyebrow="What we do" title={`${catalogue.length} services, one team`} />
          <ul className="mt-12 grid gap-4 md:grid-cols-5">
            {serviceGroups.map((g) => (
              <li key={g.id}>
                <Link href={`/services#${g.id}`} className="group block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary">
                  <Compass className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-4 font-semibold group-hover:text-primary">{g.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.intro}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Products + Falco + GK TechMatrix */}
      <section className="bg-background py-20 sm:py-24" data-guide="Our own products, our AI guide Falco, and our parent company.">
        <Container className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-8">
            <h2 className="text-xl font-semibold">We build our own products, too</h2>
            <ul className="mt-5 grid gap-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products#${p.slug}`} className="flex items-center justify-between rounded-xl bg-background-alt px-4 py-3 text-sm font-semibold hover:text-primary">
                    <span>
                      {p.name} <span className="font-normal text-muted-foreground">· {p.tagline}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-navy p-8 text-white">
            <FalcoMark className="size-14" />
            <h2 className="mt-5 text-xl font-semibold">Meet Falco</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Our AI guide pops up as you browse and explains what you&apos;re looking at. It&apos;s a small taste of the agents we build for clients.
            </p>
            <Link href="/agents" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-periwinkle hover:underline">
              See our AI agents <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <Icon name="Building2" className="size-6" />
            </span>
            <h2 className="mt-5 text-xl font-semibold">Part of {site.parent}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Falconfio is the technical brand of {site.parent}, focused on product engineering, cloud architecture and AI agents.
            </p>
            <Link href="/careers" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Work with us <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

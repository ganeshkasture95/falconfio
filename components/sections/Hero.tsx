import Link from "next/link";
import { ArrowUpRight, Gauge } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { heroStats, site } from "@/content/data/site";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative overflow-hidden" data-guide="This is what we do: build products that keep working as you grow, and AI agents that take work off your team.">
      <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" aria-hidden />
      <Container className="relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <Eyebrow>Precision at speed</Eyebrow>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]">
            Products that scale.{" "}
            <span className="relative whitespace-nowrap text-primary">
              AI agents that work.
              <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <path d="M2 9 C 80 2, 200 2, 298 6" stroke="var(--brand-periwinkle-300)" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We design and build web, mobile and cloud products that hold up when you grow, and custom AI agents that take real
            work off your team&apos;s plate.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={site.bookingUrl} guide="Book a free 30-minute call with an engineer. No sales script, just honest advice.">
              Book a free discovery call
            </ButtonLink>
            <ButtonLink href="/agents" variant="outline" arrow guide="Try our AI agents live: interactive demos and a catalogue of what each one does and the tools it connects to.">
              Explore AI agents
            </ButtonLink>
          </div>

          <Link
            href="/tools/scorecard"
            data-guide="A free 5-minute quiz that scores how well your system will handle growth, and tells you what to fix first."
            className="group mt-8 flex max-w-md items-center gap-4 rounded-2xl border border-border bg-card p-3 pr-4 transition-colors hover:border-primary"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <Gauge className="size-5" aria-hidden />
            </span>
            <span className="flex-1">
              <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Free tool</span>
              <span className="block text-sm font-semibold">Will your architecture survive 10× growth?</span>
            </span>
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-primary transition-transform group-hover:rotate-45">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>

          <dl className="mt-10 grid grid-cols-3 border-t border-border pt-8" data-guide="A few numbers from our track record so far.">
            {heroStats.map((s, i) => (
              <div key={s.label} className={i > 0 ? "border-l border-border pl-4 sm:pl-6" : ""}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

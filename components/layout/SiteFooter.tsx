import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { engagements, footerColumns, site } from "@/content/data/site";

async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-tint" data-guide="The footer: every page on the site, ways to work with us, and how to reach us. Falconfio is a technical brand by GK TechMatrix.">
      <Container className="relative pt-16 sm:pt-20">
        {/* Top: brand + project card */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div className="max-w-md">
            <Logo />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              A technical brand by <span className="text-foreground">{site.parent}</span>
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Precision at speed. We build products that hold up at scale, and AI agents that do real work, so your team can
              focus on what only it can do.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-float">
            <h2 className="text-lg font-bold">Have a project in mind?</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">Tell us what you are building. We reply within one business day.</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href={site.bookingUrl}
                className="inline-flex items-center gap-2 rounded-[10px] bg-cta px-4 py-2.5 text-sm font-semibold text-cta-foreground hover:bg-cta-hover"
              >
                Book a call <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
                <Mail className="size-4 text-primary" aria-hidden />
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <hr className="my-12 border-border" />

        {/* Link columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <span className="size-1.5 rounded-[2px] bg-primary" aria-hidden />
                {col.title}
              </h3>
              <ul className={col.title === "Services" ? "mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2" : "mt-4 grid gap-3"}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[15px] font-medium text-foreground transition-colors hover:text-primary">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-12 border-border" />

        {/* Ways to work together */}
        <div>
          <h3 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span className="size-1.5 rounded-[2px] bg-primary" aria-hidden />
            Ways to work with us
          </h3>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <p className="text-2xl font-bold tracking-tight sm:text-3xl">One team. Four ways to start.</p>
            <Link href="/how-we-work" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Compare engagement models <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engagements.map((e) => (
              <Link
                key={e.code}
                href={e.href}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent font-mono text-xs font-bold text-primary">{e.code}</span>
                <span className="mt-4 font-semibold">{e.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{e.body}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-border py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> Falconfio, a technical brand by {site.parent}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms &amp; Conditions</Link>
          </div>
        </div>
      </Container>

      {/* Big faded wordmark */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="-mb-[0.22em] text-center text-[22vw] font-extrabold leading-none tracking-tighter text-primary/10">Falconfio</p>
      </div>
    </footer>
  );
}

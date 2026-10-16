import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ChatMock, ListMock } from "@/components/products/PhoneMock";
import FinalCta from "@/components/sections/FinalCta";
import { ButtonLink, Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { products } from "@/content/data/products";
import { getService } from "@/content/data/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our products",
  description: "In-house products designed, built and run by the Falconfio team at GK TechMatrix: NotelineAI and CommitList.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white" data-guide="Products we build and run ourselves. The same team builds client work.">
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative py-20 sm:py-24">
          <Eyebrow onDark>In-house products</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            We build our own products, <span className="text-periwinkle">too</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Shipping and running our own apps keeps us honest. Every lesson about design, AI, app stores and keeping users happy
            goes straight into the work we do for clients.
          </p>
          <ul className="mt-10 flex flex-wrap gap-3">
            {products.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold transition-colors hover:border-white hover:bg-white/10"
                >
                  {p.name}
                  <span className="text-white/60">· {p.status}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {products.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={cn("scroll-mt-24 py-20 sm:py-24", flip ? "bg-background-tint" : "bg-background")}
            data-guide={`${p.name}: ${p.tagline}. ${p.status}.`}
          >
            <Container className="grid items-center gap-14 lg:grid-cols-2">
              <div className={cn(flip && "lg:order-2")}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    <span className="size-1.5 rounded-full bg-success" aria-hidden />
                    {p.status}
                  </span>
                  {p.platforms.map((pl) => (
                    <span key={pl} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                      {pl}
                    </span>
                  ))}
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">{p.name}</h2>
                <p className="mt-3 text-xl font-medium text-primary">{p.tagline}</p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{p.description}</p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px]">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                        <Check className="size-3" aria-hidden />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Made for:</span> {p.audience.join(" · ")}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-guide={`Opens ${p.name} in a new tab.`}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold transition-colors",
                        l.primary ? "bg-cta text-cta-foreground hover:bg-cta-hover" : "border border-primary text-primary hover:bg-accent",
                      )}
                    >
                      {l.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ))}
                </div>

                <div className="mt-10 border-t border-border pt-6">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    What it shows we can do for you
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.shows.map((slug) => {
                      const s = getService(slug);
                      return s ? (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}`}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-2 pr-3.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                          >
                            <span className="inline-flex size-6 items-center justify-center rounded-full bg-navy text-white">
                              <Icon name={s.icon} className="size-3.5" />
                            </span>
                            {s.title}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>

              <div className={cn("relative", flip && "lg:order-1")}>
                <div className="bg-blueprint absolute inset-0 rounded-[40px] border border-border" aria-hidden />
                <div className="relative py-10">
                  {p.mock === "chat" ? <ChatMock /> : <ListMock />}
                  <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Illustration</p>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="bg-background py-20 sm:py-24" data-guide="Have an app idea? We build products like these for clients.">
        <Container>
          <div className="grid gap-8 rounded-[32px] border border-border bg-background-tint p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Have an app idea of your own?</h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                The team that built these products can take yours from idea to the app store, with design, AI and launch handled.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href="/services/mvp">Startup MVP Sprints</ButtonLink>
              <ButtonLink href="/services/product" variant="outline" arrow>
                Product engineering
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}

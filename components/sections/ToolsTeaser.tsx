import Link from "next/link";
import { ArrowUpRight, Calculator, Gauge } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/primitives";

const tools = [
  {
    href: "/tools/scorecard",
    icon: Gauge,
    kicker: "5 minutes · free report",
    title: "Architecture Scalability Scorecard",
    body: "Answer 20 questions about your stack and get a score across six areas, your top three risks, and what to fix first.",
  },
  {
    href: "/tools/estimator",
    icon: Calculator,
    kicker: "2 minutes · instant range",
    title: "Project Cost & Timeline Estimator",
    body: "Pick your product type, platforms and features to get an honest cost range and timeline you can plan around.",
  },
];

export default function ToolsTeaser() {
  return (
    <section className="bg-background-tint py-20 sm:py-24" data-guide="Free self-serve tools. Get an answer in minutes without talking to sales.">
      <Container>
        <SectionHeader eyebrow="Free tools" title="Get answers before you talk to anyone" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tools.map(({ href, icon: Icon, kicker, title, body }) => (
            <Link
              key={href}
              href={href}
              data-guide={`${title}: ${body}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-card"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-navy text-white">
                <Icon className="size-7" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{kicker}</span>
              <span className="mt-2 text-2xl font-semibold">{title}</span>
              <span className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{body}</span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Start now
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

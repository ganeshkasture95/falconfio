import type { Metadata } from "next";
import { Bot, Cloud, Code2, Mail, PenTool, Rocket, ShieldCheck, Smartphone, Sparkles, Wrench } from "lucide-react";
import FinalCta from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { site } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join Falconfio, a technical brand by ${site.parent}. We hire engineers and designers who care about building software that lasts.`,
};

const why = [
  { icon: Rocket, title: "Real problems", body: "Systems under real load, products with real users, and agents that do real work." },
  { icon: Sparkles, title: "AI every day", body: "You'll build with and for modern AI models, with the guardrails that make them trustworthy." },
  { icon: Code2, title: "Ship weekly", body: "Short cycles, working demos and fast feedback, not months of slides." },
  { icon: Wrench, title: "Our own products", body: "Alongside client work, we build and run our own apps like NotelineAI and CommitList." },
];

const roles = [
  { icon: Code2, title: "Full-stack engineers", body: "TypeScript, React, Next.js and Node.js, with a feel for good architecture." },
  { icon: Smartphone, title: "Mobile engineers", body: "React Native and Expo, or native Swift and Kotlin." },
  { icon: Bot, title: "AI engineers", body: "Agents, retrieval, evaluation and the plumbing that connects models to real tools." },
  { icon: Cloud, title: "DevOps & platform", body: "Cloud, Kubernetes, Terraform, CI/CD and observability." },
  { icon: PenTool, title: "Product designers", body: "Research, UX and UI, with design systems that engineers love." },
  { icon: ShieldCheck, title: "Quality & security", body: "Test automation, performance and secure-by-default engineering." },
];

const steps = [
  ["Say hello", "Send your CV or portfolio and a few lines about the work you're proudest of."],
  ["Intro call", "A relaxed conversation about you, us and the kind of work you want to do."],
  ["Technical conversation", "We talk through real problems together, the way we'd work as a team."],
  ["Meet the team", "A final chat with the people you'd work with, then a decision quickly."],
];

export default function CareersPage() {
  const mail = (role: string) => `mailto:${site.email}?subject=${encodeURIComponent(`Careers: ${role}`)}`;
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build software that lasts, <span className="text-periwinkle">with people who care</span>
          </>
        }
        intro={`Falconfio is a senior team inside ${site.parent}. We grow carefully and hire people who love building things properly.`}
        guide="Careers at Falconfio: why join, the roles we hire for, and how to apply."
      >
        <a
          href={mail("General application")}
          className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-white/90"
        >
          <Mail className="size-4" aria-hidden /> Send us your CV
        </a>
      </PageHero>

      <section className="bg-background py-20 sm:py-24" data-guide="Why people enjoy working here.">
        <Container>
          <SectionHeader eyebrow="Why join" title="What the work is like" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ icon: I, title, body }) => (
              <li key={title} className="rounded-2xl border border-border bg-card p-6">
                <I className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-background-tint py-20 sm:py-24" data-guide="The kinds of roles we hire for. Click one to apply by email.">
        <Container>
          <SectionHeader
            align="left"
            eyebrow="Who we hire"
            title="Roles we hire for"
            intro="We don't always have a role open, but we're always glad to meet great people. Pick the closest fit and tell us about yourself."
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roles.map(({ icon: I, title, body }) => (
              <li key={title}>
                <a href={mail(title)} className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                    <I className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold group-hover:text-primary">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{body}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <Mail className="size-4" aria-hidden /> Apply
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-navy py-20 text-white sm:py-24" data-guide="How our hiring process works, step by step.">
        <Container>
          <SectionHeader onDark eyebrow="How hiring works" title="Four simple steps" />
          <ol className="mt-14 grid gap-4 md:grid-cols-4">
            {steps.map(([t, b], i) => (
              <li key={t} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-white font-mono text-sm font-bold text-navy">{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="bg-background pt-20 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}

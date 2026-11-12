import type { Metadata } from "next";
import { Check, FileLock2, GitBranch, KeyRound, LifeBuoy, MessagesSquare, MonitorPlay, Plus, ScrollText, Users } from "lucide-react";
import FinalCta from "@/components/sections/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink, Container, SectionHeader } from "@/components/ui/primitives";
import { commitments, engagements, process, site } from "@/content/data/site";

export const metadata: Metadata = {
  title: "How we work",
  description:
    "How a Falconfio project runs: discover, blueprint, build and scale. Engagement models, weekly cadence, code ownership, security and support after launch.",
};

/** Detail for each engagement model; ids match the anchors used across the site (#project, #squad…). */
const models: Record<string, { id: string; bestFor: string; includes: string[]; billing: string }> = {
  "01": {
    id: "project",
    bestFor: "A clear goal with a defined scope: an MVP, a new product, a migration or a single AI agent.",
    includes: ["Fixed scope and milestones agreed up front", "Price range agreed before we start", "Weekly demos and a launch plan", "Handover, documentation and 30 days of support"],
    billing: "Per milestone",
  },
  "02": {
    id: "squad",
    bestFor: "Ongoing product work where priorities change and you want senior capacity without hiring.",
    includes: ["A senior team sized to your roadmap", "Joins your tools and rituals", "Weekly demos and a monthly review", "Scale the team up or down monthly"],
    billing: "Monthly",
  },
  "03": {
    id: "review",
    bestFor: "A product that is slowing down, costing too much, or about to face a big jump in traffic.",
    includes: ["Code, architecture, infrastructure and cost review", "Interviews with your team", "A written report with a prioritised plan", "A walkthrough call with your leadership"],
    billing: "Fixed fee, about two weeks",
  },
  "04": {
    id: "retainer",
    bestFor: "Teams running AI agents in production who want them tuned, monitored and extended over time.",
    includes: ["New agents and improvements each month", "Quality and cost monitoring", "Monthly report of time and money saved", "Priority help when something changes"],
    billing: "Monthly",
  },
};

const cadence = [
  { icon: MonitorPlay, title: "Weekly demo", body: "Working software in a preview environment you can click through, every week." },
  { icon: ScrollText, title: "Written update", body: "What shipped, what's next, risks and decisions needed, in one short note." },
  { icon: MessagesSquare, title: "Shared channel", body: "A Slack or Teams channel with the engineers doing the work, not an account manager." },
  { icon: Users, title: "Monthly review", body: "Progress against the success metrics we agreed, and the plan for next month." },
];

const trust = [
  { icon: GitBranch, title: "You own everything", body: "Code lives in your repository from the first commit. Cloud accounts, domains and licences are in your name." },
  { icon: FileLock2, title: "Confidential by default", body: "We're happy to sign your NDA before the first call. Your data and ideas stay yours." },
  { icon: KeyRound, title: "Least-privilege access", body: "We ask only for the access the work needs, use your SSO where possible, and hand everything back at the end." },
  { icon: LifeBuoy, title: "Support after launch", body: "Every project includes post-launch support, and managed support is available after that." },
];

const faqs = [
  { q: "Do you work with our existing team?", a: "Yes. We can own a whole product, a feature area, or work alongside your engineers inside your process." },
  { q: "How do you estimate cost?", a: "After the discovery call and blueprint we give you a written price range per milestone. If the scope changes, we agree the change before doing the work." },
  { q: "Which time zones do you work in?", a: "We agree overlap hours with you at the start so there is always time for live conversations." },
  { q: "What if we want to take the work in-house?", a: "That is a good outcome. We document as we go and run handover sessions, so your team can own it without us." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={
          <>
            Clear steps, working software every week, <span className="text-periwinkle">no surprises</span>
          </>
        }
        intro="Every engagement follows the same simple rhythm: understand the problem, agree a plan you can trust, ship in short sprints, then keep improving with real data."
        guide="How a Falconfio project runs, the ways you can work with us, and how we keep you in control."
      >
        <ul className="mt-10 flex flex-wrap gap-3">
          {Object.values(models).map((m, i) => (
            <li key={m.id}>
              <a href={`#${m.id}`} className="inline-flex rounded-full border border-white/25 px-4 py-2 text-sm font-semibold hover:border-white hover:bg-white/10">
                {engagements[i].title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Process */}
      <section className="bg-background py-20 sm:py-24" data-guide="The four phases of every project, and what happens in each.">
        <Container>
          <SectionHeader align="left" eyebrow="The process" title="Four phases, from first call to growth" />
          <ol className="mt-14 grid gap-6 lg:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="relative rounded-3xl border border-border bg-card p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-navy font-mono text-sm font-bold text-white">{i + 1}</span>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary">{p.time}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{p.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <ul className="mt-5 grid gap-3 border-t border-border pt-5">
                  {p.points.map((pt) => (
                    <li key={pt.title} className="text-sm">
                      <span className="font-semibold">{pt.title}.</span> <span className="text-muted-foreground">{pt.body}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Engagement models */}
      <section className="bg-background-tint py-20 sm:py-24" data-guide="Four ways to work with us. Pick the one that fits your situation.">
        <Container>
          <SectionHeader align="left" eyebrow="Engagement models" title="Four ways to start" intro="Not sure which fits? Book a call and we'll recommend one, or a mix." />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {engagements.map((e) => {
              const m = models[e.code];
              return (
                <article key={e.code} id={m.id} className="scroll-mt-28 flex flex-col rounded-3xl border border-border bg-card p-8 target:border-primary target:shadow-lift">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-primary">{e.code}</span>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{m.billing}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold">{e.title}</h3>
                  <p className="mt-2 text-muted-foreground">{e.body}</p>
                  <p className="mt-5 rounded-xl bg-background-alt px-4 py-3 text-sm">
                    <span className="font-semibold">Best for:</span> {m.bestFor}
                  </p>
                  <ul className="mt-5 grid gap-2.5">
                    {m.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {x}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={site.bookingUrl} variant="outline" arrow className="mt-8 self-start">
                    Talk about this option
                  </ButtonLink>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Cadence */}
      <section className="bg-navy py-20 text-white sm:py-24" data-guide="How we keep you informed every week of the project.">
        <Container>
          <SectionHeader onDark eyebrow="Communication" title="You always know where things stand" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cadence.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <Icon className="size-6 text-periwinkle" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-12 grid gap-6 border-t border-white/15 pt-10 sm:grid-cols-3 lg:grid-cols-5">
            {commitments.map((c) => (
              <div key={c.label}>
                <dt className="text-sm text-white/70">{c.label}</dt>
                <dd className="mt-1 text-2xl font-bold">{c.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Ownership & security */}
      <section className="bg-background py-20 sm:py-24" data-guide="Ownership, confidentiality, access and support: the promises behind every project.">
        <Container>
          <SectionHeader align="left" eyebrow="Ownership & security" title="Your product, your data, your code" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {trust.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-5 rounded-3xl border border-border bg-card p-7">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span>
                  <span className="block text-lg font-semibold">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-background-tint py-20 sm:py-24" data-guide="Common questions about working with us. Click one to open the answer.">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeader align="left" eyebrow="FAQ" title="Questions about working with us" />
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
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

      <div className="bg-background pt-20 sm:pt-24">
        <FinalCta />
      </div>
    </>
  );
}

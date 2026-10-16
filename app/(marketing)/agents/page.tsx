import type { Metadata } from "next";
import { BarChart3, ClipboardCheck, Eye, KeyRound, Lock, Plus, Repeat, ScrollText, UserCheck, Wallet } from "lucide-react";
import AgentBuilder from "@/components/agents/AgentBuilder";
import AgentCatalogue from "@/components/agents/AgentCatalogue";
import AgentNetwork from "@/components/agents/AgentNetwork";
import AgentPrompt from "@/components/agents/AgentPrompt";
import Playground from "@/components/agents/Playground";
import FinalCta from "@/components/sections/FinalCta";
import { ButtonLink, Container, Eyebrow, SectionHeader } from "@/components/ui/primitives";
import { agentCatalogue } from "@/content/data/agents";

export const metadata: Metadata = {
  title: "AI Agents",
  description:
    "See AI agents at work: live demos of knowledge chat, document AI, inbox triage, tool use, voice and guardrails, plus a catalogue of agents we build for sales, support, operations, finance, people and marketing.",
};

const loop = [
  ["Perceive", "Reads the new email, ticket, document or event."],
  ["Plan", "Works out the steps and the tools it needs."],
  ["Act", "Uses your tools: CRM, inbox, calendar, database."],
  ["Check", "Validates its work and asks a person when unsure."],
  ["Learn", "Feedback and corrections make the next run better."],
] as const;

const controls = [
  { icon: UserCheck, title: "Human in the loop", body: "You choose which decisions need a person. Agents ask, then act." },
  { icon: KeyRound, title: "Least-privilege access", body: "Each agent can only touch the tools and data its job needs." },
  { icon: ScrollText, title: "Full audit log", body: "Every step, tool call and decision is recorded and searchable." },
  { icon: ClipboardCheck, title: "Tested before launch", body: "Evaluation suites check accuracy and safety on real examples." },
  { icon: Wallet, title: "Cost tracking", body: "See what each agent costs to run against the time it saves." },
  { icon: Lock, title: "Your data stays yours", body: "Enterprise model providers that don't train on your data, in the region you choose." },
];

const faqs = [
  { q: "What is an AI agent, exactly?", a: "Software that uses a language model to understand a task, plan the steps, and use your tools to complete it, like a capable assistant who works inside your CRM, inbox or database, with rules you set." },
  { q: "Are these demos real?", a: "They are scripted illustrations with made-up data, so you can see each capability in a few seconds. Real agents are built around your own tools, data and rules." },
  { q: "How long does it take to build one?", a: "A first working agent on your real data usually takes a few weeks. We start small, prove it on one workflow, then expand." },
  { q: "What if an agent makes a mistake?", a: "We design for it: confidence checks, guardrails, an audit log, and a person in the loop for anything unusual or high-value." },
  { q: "Which AI models do you use?", a: "We pick the right model for each job, often Claude or OpenAI models, and can switch providers without rebuilding the agent." },
];

export default function AgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-midnight text-white" data-guide="Our AI agents page. Describe a task to see how an agent would handle it.">
        <div className="bg-dots absolute inset-0 opacity-50" aria-hidden />
        <Container className="relative grid items-center gap-16 pb-24 pt-16 sm:pt-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Eyebrow onDark>AI agents</Eyebrow>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
              Agents that do the work, <span className="text-periwinkle">not just the talking</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              They read, decide and act inside the tools you already use, with guardrails and a person in the loop. Try it: tell us
              a task.
            </p>
            <div className="mt-8 max-w-xl">
              <AgentPrompt />
            </div>
          </div>
          <AgentNetwork />
        </Container>
      </section>

      {/* Playground */}
      <section id="playground" className="bg-navy py-20 sm:py-24" data-guide="Live demos of six AI capabilities. Pick one on the left and watch it work.">
        <Container>
          <SectionHeader
            onDark
            eyebrow="Playground"
            title="Watch AI at work"
            intro="Six things our agents do every day. Pick one and watch it happen. In the tool-using demo, you get to approve the action."
          />
          <div className="mt-12">
            <Playground />
          </div>
        </Container>
      </section>

      {/* How an agent thinks */}
      <section className="bg-background py-20 sm:py-24" data-guide="How an agent works: it loops through perceive, plan, act, check and learn.">
        <Container>
          <SectionHeader eyebrow="Under the hood" title="How an agent thinks" intro="Every agent runs the same loop, many times a day. The check step is where your rules and people come in." />
          <ol className="relative mt-14 grid gap-4 md:grid-cols-5">
            {loop.map(([t, b], i) => (
              <li
                key={t}
                className="relative rounded-2xl border-2 border-border p-6 animate-[agent-loop_10s_linear_infinite]"
                style={{ animationDelay: `${i * 2}s` }}
              >
                <span className="font-mono text-xs font-semibold opacity-70">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Repeat className="size-4 text-primary" aria-hidden /> …and back to the start, with every run logged.
          </p>
        </Container>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="scroll-mt-20 bg-background-tint py-20 sm:py-24" data-guide="Our agent catalogue. Filter by team to find agents for your department.">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Catalogue</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{agentCatalogue.length} agents, ready to adapt</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Proven patterns we tailor to your tools and rules. Don&apos;t see your use case? We build custom agents too.
              </p>
            </div>
            <ButtonLink href="#builder" variant="outline" arrow>
              Design your own
            </ButtonLink>
          </div>
          <div className="mt-10">
            <AgentCatalogue />
          </div>
        </Container>
      </section>

      {/* Builder */}
      <section id="builder" className="scroll-mt-20 bg-background py-20 sm:py-24" data-guide="Design your own agent in four clicks and get its spec.">
        <Container>
          <SectionHeader align="left" eyebrow="Agent builder" title="Design your agent in four clicks" intro="Pick a team, a job, the tools and how independent it should be. We'll start from this spec." />
          <div className="mt-12">
            <AgentBuilder />
          </div>
        </Container>
      </section>

      {/* Control & safety */}
      <section className="bg-navy py-20 text-white sm:py-24" data-guide="How you stay in control: approvals, permissions, audit logs, testing, cost tracking and data privacy.">
        <Container>
          <SectionHeader onDark eyebrow="Control & safety" title="Powerful, and always under your control" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controls.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <Icon className="size-6 text-periwinkle" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Eye className="size-4 text-periwinkle" aria-hidden /> Live dashboards
            </span>
            <span className="inline-flex items-center gap-2">
              <BarChart3 className="size-4 text-periwinkle" aria-hidden /> Monthly value report
            </span>
            <span className="inline-flex items-center gap-2">
              <UserCheck className="size-4 text-periwinkle" aria-hidden /> Approval flows
            </span>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20 sm:py-24" data-guide="Common questions about AI agents. Click one to open the answer.">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Questions about agents</h2>
          </div>
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

      <FinalCta />
    </>
  );
}

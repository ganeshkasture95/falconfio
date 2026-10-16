import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { agents } from "@/content/data/site";

export default function AgentsBand() {
  return (
    <section className="bg-background py-20 sm:py-24" data-guide="Our AI agents: software that reads, decides and acts inside your tools, with a human in the loop.">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-white sm:px-12 sm:py-20">
          {/* light beams */}
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" aria-hidden />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <Eyebrow onDark className="border-white/20 bg-transparent text-white">Falconfio AI agents</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">When engineering meets AI</h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              Agents that read, decide and act inside your tools, with guardrails, audit logs and a human in the loop where it
              matters. Pick one from our catalogue or have one built for your workflow.
            </p>
          </div>

          <ul className="relative mt-12 grid gap-4 md:grid-cols-3">
            {agents.map((a) => (
              <li key={a.name} data-guide={`${a.name}: ${a.body}`} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-periwinkle">{a.fn}</span>
                <h3 className="mt-3 text-lg font-semibold">{a.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{a.body}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {a.tools.map((t) => (
                    <li key={t} className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium text-white/85">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/agents" variant="white" arrow>
              Browse the agent catalogue
            </ButtonLink>
            <ButtonLink href="/contact?topic=agent" variant="ghostOnDark">
              Build a custom agent
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

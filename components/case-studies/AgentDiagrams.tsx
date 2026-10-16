import { BrainCircuit, Handshake, Radar, Route, ShieldCheck, UserCheck } from "lucide-react";

/** Diagrams used inside case-study MDX (registered in mdx-components.tsx). Drawn in brand tokens. */

const agents = [
  { icon: Route, name: "Re-Router", body: "Finds the best alternative route by cost, time and capacity." },
  { icon: Handshake, name: "Negotiator", body: "Contacts carriers and vendors to secure new slots and terms." },
  { icon: ShieldCheck, name: "Compliance", body: "Checks every plan against trade, customs and environmental rules." },
];

/** Orchestrator → specialist agents → human approval. */
export function AgentFlow() {
  return (
    <figure className="not-prose my-10 overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/20 bg-white/5 p-4">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Radar className="size-5 text-periwinkle" aria-hidden />
        </span>
        <p className="text-sm text-white/80">
          <span className="font-semibold text-white">Live signals</span> · weather, GPS, port status, news
        </p>
      </div>
      <div className="mx-auto h-6 w-px bg-white/30" aria-hidden />
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-white p-4 text-navy">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-royal text-white">
          <BrainCircuit className="size-5" aria-hidden />
        </span>
        <p className="text-sm">
          <span className="font-semibold">Orchestrator agent</span>
          <br />
          Spots the disruption and hands out the work.
        </p>
      </div>
      <div className="mx-auto hidden h-6 w-2/3 border-x border-t border-white/30 sm:block" aria-hidden />
      <div className="mx-auto h-6 w-px bg-white/30 sm:hidden" aria-hidden />
      <ul className="grid gap-3 sm:grid-cols-3">
        {agents.map(({ icon: Icon, name, body }) => (
          <li key={name} className="rounded-2xl border border-white/20 bg-white/5 p-4">
            <Icon className="size-5 text-periwinkle" aria-hidden />
            <p className="mt-3 text-sm font-semibold">{name} agent</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">{body}</p>
          </li>
        ))}
      </ul>
      <div className="mx-auto h-6 w-px bg-white/30" aria-hidden />
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border-2 border-dashed border-periwinkle p-4">
        <UserCheck className="size-5 shrink-0 text-periwinkle" aria-hidden />
        <p className="text-sm text-white/80">
          <span className="font-semibold text-white">Human approval</span> only for high-value or unusual cases
        </p>
      </div>
      <figcaption className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
        The agent architecture, simplified
      </figcaption>
    </figure>
  );
}

const trace = [
  ["Detect", "Port strike reported at the planned destination. 14 shipments affected."],
  ["Plan", "Re-Router compares 3 alternative ports on cost, delay and capacity."],
  ["Check", "Compliance confirms customs rules for the best option. No conflicts."],
  ["Act", "Negotiator books new berth slots and updates the carriers."],
  ["Report", "Cost change is under the approval limit, so the team just gets a summary."],
] as const;

/** One agent decision, step by step. */
export function AgentTrace() {
  return (
    <figure className="not-prose my-10 rounded-3xl border border-border bg-background-tint p-6 sm:p-8">
      <ol className="relative grid gap-5 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-border">
        {trace.map(([step, text], i) => (
          <li key={step} className="relative flex gap-4">
            <span className="relative z-10 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-xs font-bold text-white">
              {i + 1}
            </span>
            <p className="pt-1 text-[15px] leading-relaxed">
              <span className="font-semibold text-foreground">{step}.</span>{" "}
              <span className="text-muted-foreground">{text}</span>
            </p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        Example: how the agents handle a re-routing
      </figcaption>
    </figure>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CornerDownLeft, Sparkles, UserCheck, Wand2 } from "lucide-react";
import { matchAgent, type Agent } from "@/content/data/agents";
import { useStill, useTimeline } from "./hooks";

const examples = [
  "Answer customer support tickets",
  "Qualify leads and book sales calls",
  "Pull data out of invoices",
  "Screen job applications",
  "Answer the phone and book appointments",
];

/** Hero prompt: describe a task, and an "agent plan" streams back with the closest matching agent. */
export default function AgentPrompt() {
  const still = useStill();
  const [text, setText] = useState("");
  const [hint, setHint] = useState(0);
  const [run, setRun] = useState<{ id: number; task: string; agent: Agent | null } | null>(null);

  useEffect(() => {
    if (still) return;
    const iv = setInterval(() => setHint((h) => (h + 1) % examples.length), 2600);
    return () => clearInterval(iv);
  }, [still]);

  const plan = (task: string) => {
    if (!task.trim()) return;
    setRun({ id: Date.now(), task, agent: matchAgent(task) });
  };

  return (
    <div data-guide="Describe a task in your own words and see how an agent would handle it.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          plan(text);
        }}
        className="flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white p-2 pl-4 focus-within:border-periwinkle"
      >
        <Wand2 className="size-5 shrink-0 text-primary" aria-hidden />
        <label htmlFor="agent-task" className="sr-only">
          Describe a task for an AI agent
        </label>
        <input
          id="agent-task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`e.g. ${examples[hint]}`}
          autoComplete="off"
          className="h-11 min-w-0 flex-1 bg-transparent text-base text-navy placeholder:text-muted-foreground focus:outline-none"
        />
        <button type="submit" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-cta px-4 text-sm font-semibold text-cta-foreground hover:bg-cta-hover">
          Plan it <CornerDownLeft className="size-4" aria-hidden />
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {examples.slice(0, 3).map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => {
              setText(e);
              plan(e);
            }}
            className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/85 transition-colors hover:border-white hover:bg-white/10"
          >
            {e}
          </button>
        ))}
      </div>
      {run && <Plan key={run.id} task={run.task} agent={run.agent} still={still} />}
    </div>
  );
}

const BEATS = [500, 450, 450, 450, 450, 450, 400] as const;

function Plan({ task, agent, still }: { task: string; agent: Agent | null; still: boolean }) {
  const step = useTimeline(BEATS, still);
  const steps = agent?.steps ?? ["Understand the task and the rules", "Connect to the tools you already use", "Do the work, with guardrails", "Report back and learn from feedback"];

  return (
    <div className="mt-4 rounded-2xl border border-white/20 bg-navy-900 p-5 text-sm text-white" aria-live="polite">
      <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-periwinkle">
        <Sparkles className="size-3.5" aria-hidden /> Agent plan
      </p>
      <p className="mt-2 text-white/70">&ldquo;{task}&rdquo;</p>
      {step === 0 ? (
        <span className="mt-4 flex gap-1" aria-label="Planning">
          {[0, 1, 2].map((d) => (
            <span key={d} className="size-1.5 animate-[guide-dot_1s_ease-in-out_infinite] rounded-full bg-periwinkle" style={{ animationDelay: `${d * 0.15}s` }} />
          ))}
        </span>
      ) : (
        <>
          <p className="mt-4 animate-[hero-rise_0.35s_ease-out_both] font-semibold">
            {agent ? <>Closest match: {agent.name}</> : <>A custom agent, built for this task</>}
          </p>
          <ol className="mt-3 grid gap-2">
            {steps.map(
              (s, i) =>
                step > i + 1 && (
                  <li key={s} className="flex animate-[hero-rise_0.35s_ease-out_both] items-start gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[10px]">{i + 1}</span>
                    <span className="text-white/85">{s}</span>
                  </li>
                ),
            )}
          </ol>
          {step >= 6 && (
            <p className="mt-3 flex animate-[hero-rise_0.35s_ease-out_both] items-start gap-2 text-white/70">
              <UserCheck className="mt-0.5 size-4 shrink-0 text-periwinkle" aria-hidden />
              {agent ? agent.human : "You decide when a person needs to check its work."}
            </p>
          )}
          {step >= 7 && (
            <div className="mt-4 flex animate-[hero-rise_0.35s_ease-out_both] flex-wrap items-center gap-2 border-t border-white/15 pt-4">
              {agent?.tools.map((t) => (
                <span key={t} className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs text-white/80">
                  {t}
                </span>
              ))}
              <Link
                href={agent ? `/contact?agent=${agent.slug}` : "/contact"}
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline"
              >
                Request this agent <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

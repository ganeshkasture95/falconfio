"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plug, UserCheck } from "lucide-react";
import { agentCatalogue, departments, type Department } from "@/content/data/agents";
import { cn } from "@/lib/utils";

/** The agent catalogue, filterable by department. */
export default function AgentCatalogue() {
  const [dept, setDept] = useState<Department | "All">("All");
  const list = dept === "All" ? agentCatalogue : agentCatalogue.filter((a) => a.fn === dept);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter agents by department">
        {(["All", ...departments] as const).map((d) => {
          const n = d === "All" ? agentCatalogue.length : agentCatalogue.filter((a) => a.fn === d).length;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={dept === d}
              onClick={() => setDept(d)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                dept === d ? "border-navy bg-navy text-white" : "border-border bg-card hover:border-primary hover:text-primary",
              )}
            >
              {d} <span className={cn("ml-1 font-mono text-xs", dept === d ? "text-white/70" : "text-muted-foreground")}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <li
            key={a.slug}
            id={a.slug}
            data-guide={`${a.name}: ${a.body}`}
            className="flex animate-[hero-rise_0.35s_ease-out_both] scroll-mt-28 flex-col rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift"
          >
            <span className="w-fit rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">{a.fn}</span>
            <h3 className="mt-4 text-xl font-semibold">{a.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
            <ol className="mt-5 grid gap-2 border-t border-border pt-5">
              {a.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[10px] font-bold text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-background-alt px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
              <UserCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="font-semibold text-foreground">Human check:</span> {a.human}
              </span>
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <Plug className="size-3.5 text-muted-foreground" aria-hidden />
              {a.tools.map((t) => (
                <span key={t} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={`/contact?agent=${a.slug}`}
              className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary hover:underline"
            >
              Request this agent <ArrowRight className="size-4" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

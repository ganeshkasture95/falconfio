"use client";

import { useState } from "react";
import { FileSearch, Inbox, MessagesSquare, Mic, RotateCcw, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentDemo, GuardDemo, InboxDemo, KnowledgeDemo, ToolDemo, VoiceDemo } from "./demos";
import { useSeen, useStill } from "./hooks";

const tabs: { id: string; icon: LucideIcon; title: string; body: string; Demo: React.ComponentType<{ still: boolean }> }[] = [
  { id: "knowledge", icon: MessagesSquare, title: "Knowledge chat", body: "Answers from your documents, with sources. Says so when it doesn't know.", Demo: KnowledgeDemo },
  { id: "documents", icon: FileSearch, title: "Document AI", body: "Reads invoices and forms, checks the data, and flags anything unclear.", Demo: DocumentDemo },
  { id: "inbox", icon: Inbox, title: "Inbox triage", body: "Sorts every email, handles the routine ones, routes the rest.", Demo: InboxDemo },
  { id: "tools", icon: Workflow, title: "Tool-using agent", body: "Works across your CRM, calendar and email, and asks before acting.", Demo: ToolDemo },
  { id: "voice", icon: Mic, title: "Voice agent", body: "Answers calls in a natural voice and books appointments.", Demo: VoiceDemo },
  { id: "guardrails", icon: ShieldCheck, title: "Guardrails", body: "Blocks unsafe requests and hides personal data, automatically.", Demo: GuardDemo },
];

/** Interactive playground: one scripted demo per AI capability. */
export default function Playground() {
  const still = useStill();
  const [tab, setTab] = useState(0);
  const [run, setRun] = useState(0);
  const [ref, seen] = useSeen<HTMLDivElement>();
  const { Demo, title } = tabs[tab];

  return (
    <div ref={ref} className="grid overflow-hidden rounded-[32px] border border-white/15 bg-midnight lg:grid-cols-[320px_1fr]">
      <div role="tablist" aria-label="AI capabilities" aria-orientation="vertical" className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4 [scrollbar-width:none]">
        {tabs.map((t, i) => {
          const on = i === tab;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => {
                setTab(i);
                setRun((r) => r + 1);
              }}
              data-guide={`${t.title}: ${t.body} Click to watch it work.`}
              className={cn(
                "group flex shrink-0 items-start gap-3 rounded-2xl p-3 text-left transition-colors lg:p-4",
                on ? "bg-white text-navy" : "text-white hover:bg-white/5",
              )}
            >
              <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-xl", on ? "bg-royal text-white" : "bg-white/10 text-periwinkle")}>
                <t.icon className="size-[18px]" aria-hidden />
              </span>
              <span>
                <span className="block whitespace-nowrap text-sm font-semibold">{t.title}</span>
                <span className={cn("mt-0.5 hidden text-xs leading-snug lg:block", on ? "text-muted-foreground" : "text-white/55")}>{t.body}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${tabs[tab].id}`} aria-labelledby={`tab-${tabs[tab].id}`} className="min-w-0 p-5 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-periwinkle">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            Live demo · {title}
          </p>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:border-white"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Replay
          </button>
        </div>
        <div className="min-h-[360px]">{seen && <Demo key={`${tab}-${run}`} still={still} />}</div>
        <p className="mt-6 text-[11px] text-white/45">Illustrative demo with made-up data. Real agents are built around your tools, rules and data.</p>
      </div>
    </div>
  );
}

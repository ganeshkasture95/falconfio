"use client";

import { useEffect, useState } from "react";
import { FileText, Headphones, Mic, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import { FalcoMark } from "@/components/brand/FalcoMark";
import { cn } from "@/lib/utils";
import { useStill } from "./hooks";

/** Hero visual: an orchestrator with specialist agents around it; work pulses along the links. */

const nodes = [
  {
    icon: Headphones,
    label: "Support",
    says: "Answered a refund question from your policy doc",
  },
  {
    icon: TrendingUp,
    label: "Sales",
    says: "Scored a new lead 86/100 and booked a call",
  },
  {
    icon: FileText,
    label: "Documents",
    says: "Extracted 14 line items from an invoice",
  },
  {
    icon: Wallet,
    label: "Finance",
    says: "Matched an invoice to its purchase order",
  },
  { icon: Mic, label: "Voice", says: "Booked an appointment over the phone" },
  {
    icon: ShieldCheck,
    label: "Guardrails",
    says: "Blocked an unsafe request and logged it",
  },
];

const pos = nodes.map((_, i) => {
  const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
});

export default function AgentNetwork() {
  const still = useStill();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (still) return;
    const iv = setInterval(() => setActive((a) => (a + 1) % nodes.length), 2200);
    return () => clearInterval(iv);
  }, [still]);

  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div
        className="relative aspect-square w-full"
        role="img"
        aria-label="Diagram: an orchestrator agent coordinating support, sales, documents, finance, voice and guardrail agents"
        data-guide="A live view of an agent team: the orchestrator in the middle hands work to specialist agents. Watch the activity feed below."
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="0.3" strokeDasharray="1 1.5" />
          {pos.map((p, i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={p.x} y2={p.y} stroke="white" strokeOpacity="0.15" strokeWidth="0.35" />
              <line
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                pathLength={100}
                stroke={i === active ? "white" : "var(--brand-periwinkle-300)"}
                strokeWidth={i === active ? 0.9 : 0.6}
                strokeLinecap="round"
                strokeDasharray="6 94"
                className="animate-[agent-flow_1.6s_linear_infinite]"
                style={{ animationDelay: `${i * -0.27}s` }}
              />
            </g>
          ))}
        </svg>

        {/* orchestrator */}
        <div className="absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute -inset-2 animate-[guide-spin_6s_linear_infinite] rounded-full border-2 border-dashed border-periwinkle/60"
            aria-hidden
          />
          <FalcoMark className="size-full rounded-full shadow-float ring-2 ring-white" />
          <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-navy">
            Falco · Orchestrator
          </span>
        </div>

        {/* specialists */}
        {nodes.map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%` }}
          >
            <span
              className={cn(
                "relative inline-flex size-12 items-center justify-center rounded-2xl border transition-all duration-500 sm:size-14",
                i === active ? "scale-110 border-white bg-white text-navy" : "border-white/25 bg-navy-900 text-periwinkle",
              )}
            >
              {i === active && (
                <span
                  className="absolute -inset-1.5 animate-[guide-ping_1.4s_ease-out_infinite] rounded-2xl border-2 border-white"
                  aria-hidden
                />
              )}
              <Icon className="size-5 sm:size-6" aria-hidden />
            </span>
            <span className={cn("text-[11px] font-semibold transition-colors", i === active ? "text-white" : "text-white/60")}>
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* activity feed */}
      <p
        key={active}
        aria-hidden
        className="mx-auto mt-6 flex w-fit max-w-full animate-[hero-rise_0.4s_ease-out_both] items-center gap-2 rounded-full border border-white/20 bg-navy px-4 py-2 text-xs text-white shadow-pop"
      >
        <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
        <span className="truncate">
          <span className="font-semibold">{nodes[active].label}:</span> {nodes[active].says}
        </span>
      </p>
    </div>
  );
}

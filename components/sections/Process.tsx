"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { process } from "@/content/data/site";
import { cn } from "@/lib/utils";

export default function Process() {
  const [active, setActive] = useState(0);
  const step = process[active];

  return (
    <section id="how-we-work" className="bg-navy py-20 text-white sm:py-24" data-guide="How a project runs, step by step. Click a step on the left to see what happens in it.">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow onDark>How we work</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">From first call to scale, in four steps</h2>
          </div>
          <p className="text-base leading-relaxed text-white/75 lg:pb-1">
            A clear process with fixed checkpoints. You see working software every week, and you always know what happens next
            and what it will cost.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div role="tablist" aria-label="Process steps" aria-orientation="vertical" className="relative flex flex-col gap-2 lg:border-r lg:border-white/10 lg:pr-6">
            {process.map((p, i) => (
              <button
                key={p.step}
                role="tab"
                id={`step-tab-${i}`}
                aria-selected={active === i}
                aria-controls="step-panel"
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") setActive((active + 1) % process.length);
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") setActive((active - 1 + process.length) % process.length);
                }}
                tabIndex={active === i ? 0 : -1}
                className={cn(
                  "group relative flex gap-4 rounded-2xl px-4 py-4 text-left transition-colors",
                  active === i ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold",
                    active === i ? "bg-white text-navy" : "bg-white/10 text-white/70",
                  )}
                >
                  {i + 1}
                </span>
                <span>
                  <span className={cn("block text-lg font-semibold", active === i ? "text-white" : "text-white/70")}>{p.step}</span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-periwinkle">{p.time}</span>
                  {active === i && <span className="mt-2 block text-sm leading-relaxed text-white/75">{p.summary}</span>}
                </span>
                {active === i && <span className="absolute -right-[25px] top-4 bottom-4 hidden w-0.5 rounded-full bg-periwinkle lg:block" aria-hidden />}
              </button>
            ))}
          </div>

          <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-2xl font-bold">
                <span className="font-mono text-periwinkle">/{String(active + 1).padStart(2, "0")}</span> {step.step}
              </p>
              <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-xs text-white/80">{step.time}</span>
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {step.points.map((pt) => (
                <li key={pt.title} className="rounded-2xl bg-white/[0.06] p-5">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/10">
                    <Check className="size-4 text-periwinkle" aria-hidden />
                  </span>
                  <p className="mt-4 font-semibold">{pt.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{pt.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

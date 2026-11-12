"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/** Architecture Scalability Scorecard. Scoring version is sent with results so changes stay traceable. */
const VERSION = "v1";

type Dimension = { id: string; name: string; fix: string; service: string };
const dimensions: Dimension[] = [
  { id: "data", name: "Data layer", fix: "Index hot queries, add read replicas and caching, and plan partitioning before tables get huge.", service: "architecture" },
  { id: "perf", name: "Performance", fix: "Set performance budgets, cache at the edge, and load-test before every big launch.", service: "architecture" },
  { id: "obs", name: "Observability", fix: "Add tracing, error tracking and alerts on user-facing symptoms, so you hear about problems first.", service: "devops" },
  { id: "delivery", name: "Delivery", fix: "Automate tests and deploys, add preview environments and feature flags, and ship small changes often.", service: "devops" },
  { id: "cost", name: "Cloud cost", fix: "Tag resources, right-size servers, and review spend monthly against usage.", service: "architecture" },
  { id: "ai", name: "AI readiness", fix: "Clean up and document your data, pick one high-value workflow, and pilot an agent with human review.", service: "ai" },
];

const options = ["Not at all", "A little", "Mostly", "Fully"];
const questions: { dim: string; q: string }[] = [
  { dim: "data", q: "Your slowest database queries are known, indexed and monitored." },
  { dim: "data", q: "You could handle 10× today's data without redesigning the database." },
  { dim: "perf", q: "Key pages and APIs respond fast even at peak traffic." },
  { dim: "perf", q: "You load-test before launches and big campaigns." },
  { dim: "obs", q: "You hear about outages from alerts, not from customers." },
  { dim: "obs", q: "You can trace a slow request through every service it touches." },
  { dim: "delivery", q: "Deploys are automated and happen at least weekly without drama." },
  { dim: "delivery", q: "A bad release can be rolled back in minutes." },
  { dim: "cost", q: "You know what each part of the system costs to run." },
  { dim: "cost", q: "Cloud spend grows slower than revenue or usage." },
  { dim: "ai", q: "Your business data is clean, documented and easy to query." },
  { dim: "ai", q: "You have identified workflows where AI could save real time." },
];

const band = (n: number) =>
  n >= 80 ? { label: "Ready to scale", tone: "text-success" } : n >= 55 ? { label: "Solid, with gaps", tone: "text-primary" } : n >= 30 ? { label: "At risk under growth", tone: "text-warning" } : { label: "Fragile", tone: "text-strike" };

export default function Scorecard() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [i, setI] = useState(0);
  const done = answers.every((a) => a !== null);
  const [showResult, setShowResult] = useState(false);

  const pick = (v: number) => {
    setAnswers((a) => a.map((x, k) => (k === i ? v : x)));
    if (i < questions.length - 1) setTimeout(() => setI((n) => Math.min(n + 1, questions.length - 1)), 180);
  };

  if (showResult && done) return <Result answers={answers as number[]} onRestart={() => (setAnswers(questions.map(() => null)), setI(0), setShowResult(false))} />;

  const q = questions[i];
  const dim = dimensions.find((d) => d.id === q.dim)!;
  const answered = answers.filter((a) => a !== null).length;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-float sm:p-10" data-guide="Answer 12 quick questions about your system. You get a score and your top risks instantly.">
      <div className="flex items-center justify-between text-sm">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">{dim.name}</span>
        <span className="text-muted-foreground">
          {i + 1} / {questions.length}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={answered}>
        <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${(answered / questions.length) * 100}%` }} />
      </div>

      <fieldset key={i} className="mt-8 min-w-0 animate-[hero-rise_0.3s_ease-out_both]">
        <legend className="text-xl font-semibold leading-snug sm:text-2xl">{q.q}</legend>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {options.map((o, v) => (
            <button
              key={o}
              type="button"
              aria-pressed={answers[i] === v}
              onClick={() => pick(v)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4 text-left font-medium transition-colors",
                answers[i] === v ? "border-primary bg-accent" : "border-border hover:border-primary",
              )}
            >
              <span className={cn("inline-flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold", answers[i] === v ? "bg-primary text-primary-foreground" : "bg-background-alt")}>
                {v}
              </span>
              {o}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <button type="button" onClick={() => setI(i - 1)} className={cn("inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground", i === 0 && "invisible")}>
          <ArrowLeft className="size-4" aria-hidden /> Back
        </button>
        {done ? (
          <button type="button" onClick={() => setShowResult(true)} className="inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-3 text-sm font-semibold text-cta-foreground shadow-cta hover:bg-cta-hover">
            See my score <ArrowRight className="size-4" aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            disabled={answers[i] === null}
            onClick={() => setI(i + 1)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary disabled:opacity-40"
          >
            Next <ArrowRight className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

function Result({ answers, onRestart }: { answers: number[]; onRestart: () => void }) {
  const scores = dimensions.map((d) => {
    const vals = questions.map((q, k) => (q.dim === d.id ? answers[k] : null)).filter((v) => v !== null);
    return { ...d, score: Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 3)) * 100) };
  });
  const total = Math.round(scores.reduce((a, s) => a + s.score, 0) / scores.length);
  const risks = [...scores].sort((a, b) => a.score - b.score).slice(0, 3);
  const b = band(total);
  const summary = `Scorecard ${VERSION}: ${total}/100 (${b.label}). ${scores.map((s) => `${s.name} ${s.score}`).join(", ")}.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]" role="status" data-guide="Your scorecard result: overall score, score per area, and your top three risks with what to do next.">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-float">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Your score</p>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-6xl font-bold tracking-tight">{total}</span>
          <span className="text-muted-foreground">/ 100</span>
        </p>
        <p className={cn("mt-1 text-lg font-semibold", b.tone)}>{b.label}</p>
        <Radar scores={scores.map((s) => ({ name: s.name, score: s.score }))} />
        <button type="button" onClick={onRestart} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <RotateCcw className="size-4" aria-hidden /> Start again
        </button>
      </div>
      <div className="rounded-3xl bg-navy p-8 text-white">
        <h2 className="text-xl font-semibold">Your top 3 risks</h2>
        <ol className="mt-6 grid gap-5">
          {risks.map((r) => (
            <li key={r.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-semibold">
                  <TriangleAlert className="size-4 text-warning-bright" aria-hidden /> {r.name}
                </span>
                <span className="font-mono text-sm text-white/70">{r.score}/100</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/80">{r.fix}</p>
              <Link href={`/services/${r.service}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-periwinkle hover:underline">
                How we help <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href={`/contact?from=scorecard&summary=${encodeURIComponent(summary)}`}
          className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-navy hover:bg-accent"
        >
          Talk these results through with an engineer <ArrowRight className="size-4" aria-hidden />
        </Link>
        <p className="mt-3 text-center text-xs text-white/60">Free, 30 minutes, no sales pitch.</p>
      </div>
    </div>
  );
}

/** Six-axis radar chart of the dimension scores. */
function Radar({ scores }: { scores: { name: string; score: number }[] }) {
  const c = 150;
  const r = 100;
  const pt = (k: number, v: number) => {
    const a = (k / scores.length) * Math.PI * 2 - Math.PI / 2;
    return [c + r * v * Math.cos(a), c + r * v * Math.sin(a)] as const;
  };
  const ring = (v: number) => scores.map((_, k) => pt(k, v).join(",")).join(" ");
  return (
    <svg viewBox="0 0 300 300" className="mx-auto mt-6 w-full max-w-[320px]" role="img" aria-label={scores.map((s) => `${s.name} ${s.score}`).join(", ")}>
      {[0.25, 0.5, 0.75, 1].map((v) => (
        <polygon key={v} points={ring(v)} fill="none" stroke="var(--border)" />
      ))}
      {scores.map((_, k) => {
        const [x, y] = pt(k, 1);
        return <line key={k} x1={c} y1={c} x2={x} y2={y} stroke="var(--border)" />;
      })}
      <polygon points={scores.map((s, k) => pt(k, Math.max(0.04, s.score / 100)).join(",")).join(" ")} fill="var(--primary)" fillOpacity="0.2" stroke="var(--primary)" strokeWidth="2.5" className="animate-[hero-fade_0.6s_ease-out_both]" />
      {scores.map((s, k) => {
        const [x, y] = pt(k, 1.22);
        return (
          <text key={s.name} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-current text-[11px] font-semibold">
            {s.name}
          </text>
        );
      })}
    </svg>
  );
}

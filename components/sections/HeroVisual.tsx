"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Bot, Check, Plug, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero visual: a looping, illustrative story of an agent going from brief to live.
 * The brief types in, the agent connects its tools, then the chart draws and keeps streaming.
 * It cycles through a few example agents. Reduced-motion users see a still, finished frame.
 */

type Scenario = {
  brief: string;
  num: string;
  name: string;
  tools: string[];
  metric: string;
  total: number;
  rows: [string, string][]; // [dot colour class, label]
  counts: number[];
  log: string[];
};

const scenarios: Scenario[] = [
  {
    brief: "Qualify our inbound leads and book calls with the good ones.",
    num: "/03",
    name: "Lead Qualification Agent",
    tools: ["HubSpot", "Gmail", "Calendar"],
    metric: "Leads handled / week",
    total: 1248,
    rows: [["bg-primary", "Researched & scored"], ["bg-success", "Calls booked"], ["bg-strike", "Sent to a human"]],
    counts: [1180, 214, 37],
    log: ["Scored a new lead · 86/100", "Booked a call · Thu 10:30", "Unusual request → human"],
  },
  {
    brief: "Triage our support tickets and answer the easy ones.",
    num: "/01",
    name: "Support Triage Agent",
    tools: ["Zendesk", "Slack", "Help docs"],
    metric: "Tickets resolved / week",
    total: 2310,
    rows: [["bg-primary", "Tagged & routed"], ["bg-success", "Answered"], ["bg-strike", "Escalated to a human"]],
    counts: [2290, 1460, 82],
    log: ["Routed a billing ticket", "Answered a password reset", "Angry customer → human"],
  },
  {
    brief: "Pull the numbers out of invoices into our finance system.",
    num: "/02",
    name: "Document Processing Agent",
    tools: ["Gmail", "Drive", "Xero"],
    metric: "Invoices processed / week",
    total: 864,
    rows: [["bg-primary", "Read & extracted"], ["bg-success", "Posted to ledger"], ["bg-strike", "Sent for review"]],
    counts: [858, 811, 19],
    log: ["Extracted 14 line items", "Posted invoice to ledger", "Totals don't match → review"],
  },
];

const steps = ["Discover", "Blueprint", "Build", "Scale"];
const START = [38, 40, 45, 43, 50, 55, 53, 60, 64, 70, 74, 80];

// Story beats: [ms after start, phase]. 0 typing · 1 connector · 2 agent card · 3-5 tools · 6 live
const BEATS: [number, number][] = [[1900, 1], [2400, 2], [2800, 3], [3100, 4], [3400, 5], [3800, 6]];
const SCENE_MS = 13000;

const STILL = "(prefers-reduced-motion: reduce)";
const subscribeStill = (cb: () => void) => {
  const m = window.matchMedia(STILL);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

export default function HeroVisual() {
  const still = useSyncExternalStore(subscribeStill, () => window.matchMedia(STILL).matches, () => false);
  const [scene, setScene] = useState(0);
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // pause everything while the hero is off screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (still || !active) return;
    const t = setTimeout(() => setScene((s) => (s + 1) % scenarios.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [scene, still, active]);

  return (
    <div
      ref={ref}
      className="relative"
      aria-label="Example: an AI agent moving from idea to live"
      role="img"
      data-guide="An example of an AI agent we build: you describe the job, we connect it to your tools, and it runs around the clock with a human for edge cases."
    >
      <Story key={scene} s={scenarios[scene]} still={still} active={active} />
    </div>
  );
}

function Story({ s, still, active }: { s: Scenario; still: boolean; active: boolean }) {
  const [phase, setPhase] = useState(still ? 6 : 0);
  const [typed, setTyped] = useState(still ? s.brief.length : 0);
  const p = still ? 6 : phase;
  const shown = still ? s.brief.length : typed;

  useEffect(() => {
    if (still) return;
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= s.brief.length) clearInterval(iv);
    }, 1700 / s.brief.length);
    const timers = BEATS.map(([ms, ph]) => setTimeout(() => setPhase(ph), ms));
    return () => {
      clearInterval(iv);
      timers.forEach(clearTimeout);
    };
  }, [s, still]);

  const stepDone = p >= 6 ? 4 : p >= 2 ? 3 : p >= 1 ? 2 : 1;

  return (
    <>
      {/* floating chip */}
      <div
        className={cn(
          "absolute -top-5 right-4 z-10 flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold shadow-lg transition-all duration-500 sm:right-8",
          p >= 6 ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        )}
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        Agent online
      </div>

      <div className="rounded-[28px] border border-border bg-background-tint p-4 sm:p-6">
        {/* brief */}
        <div className="animate-[hero-rise_0.5s_ease-out_both] rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className={cn("size-4", p === 0 && "animate-pulse")} />
            </span>
            <span className="text-sm font-semibold">Your brief</span>
            <span className={cn("ml-auto text-[11px] font-medium text-muted-foreground transition-opacity", p >= 1 ? "opacity-100" : "opacity-0")}>
              Sent ✓
            </span>
          </div>
          <p className="mt-3 grid text-[15px]">
            <span className="invisible col-start-1 row-start-1">&ldquo;{s.brief}&rdquo;</span>
            <span className="col-start-1 row-start-1">
              &ldquo;{s.brief.slice(0, shown)}
              {shown < s.brief.length ? (
                <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-[guide-caret_0.8s_steps(1)_infinite] bg-primary" />
              ) : (
                <>&rdquo;</>
              )}
            </span>
          </p>
        </div>

        {/* connector */}
        <div className="relative ml-8 h-6 w-px bg-border">
          <span className={cn("absolute inset-x-0 top-0 bg-primary transition-[height] duration-500", p >= 1 ? "h-full" : "h-0")} />
          {p >= 1 && p < 6 && !still && (
            <span className="absolute -left-[3px] size-[7px] animate-[hero-drop_0.9s_ease-in_infinite] rounded-full bg-primary" />
          )}
        </div>

        {/* agent */}
        <div
          className={cn(
            "rounded-2xl border border-border bg-card p-5 transition-all duration-500",
            p >= 2 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-40",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">
                <span className="font-mono text-primary">{s.num}</span> {s.name}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {s.tools.map((t, i) => {
                  const on = p >= 3 + i;
                  return (
                    <li
                      key={t}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors duration-300",
                        on ? "border-success/40 bg-success/10 text-foreground" : "border-border text-muted-foreground",
                      )}
                    >
                      {on ? <Check className="size-3 text-success" /> : <Plug className="size-3" />}
                      {t}
                    </li>
                  );
                })}
              </ul>
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-300",
                p >= 6 ? "bg-cta text-cta-foreground" : "bg-background-alt text-muted-foreground",
              )}
            >
              {p >= 6 ? "Live" : p >= 2 ? "Connecting…" : "Draft"}
            </span>
          </div>

          <div className="mt-4 grid gap-3 rounded-xl border border-border bg-background-alt p-3 sm:grid-cols-[1.4fr_1fr]">
            <Chart s={s} live={p >= 6} still={still} active={active} />
            <Activity s={s} live={p >= 6} still={still} active={active} />
          </div>

          <ol className="mt-5 grid grid-cols-4 gap-2">
            {steps.map((st, i) => (
              <li key={st} className="text-xs font-semibold">
                <span className="mb-2 block h-1 overflow-hidden rounded-full bg-border">
                  <span
                    className={cn("block h-full rounded-full bg-primary transition-[width] duration-700 ease-out", i < stepDone ? "w-full" : "w-0")}
                  />
                </span>
                <span className={cn("transition-colors duration-500", i < stepDone ? "text-foreground" : "text-muted-foreground")}>{st}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Illustrative example</p>
      </div>
    </>
  );
}

/** Streaming area chart: draws in when the agent goes live, then new points arrive every ~1.5s. */
function Chart({ s, live, still, active }: { s: Scenario; live: boolean; still: boolean; active: boolean }) {
  const [vals, setVals] = useState(START);
  const [total, setTotal] = useState(still ? s.total : 0);
  const target = useRef(START);
  const seed = useRef(7);

  // count up, then morph the line towards each new set of points
  useEffect(() => {
    if (!live || still || !active) return;
    let raf = 0;
    const t0 = performance.now();
    let counted = false;
    const frame = (now: number) => {
      if (!counted) {
        const k = Math.min(1, (now - t0) / 1200);
        setTotal(Math.round(s.total * (1 - Math.pow(1 - k, 3))));
        counted = k >= 1;
      }
      setVals((v) => v.map((x, i) => x + (target.current[i] - x) * 0.12));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const iv = setInterval(() => {
      seed.current = (seed.current * 16807) % 2147483647;
      const r = seed.current / 2147483647;
      const last = target.current[target.current.length - 1];
      let next = last + (r - 0.35) * 14;
      if (next > 92) next = 62 + r * 10;
      if (next < 30) next = 40;
      target.current = [...target.current.slice(1), next];
      if (counted) setTotal((n) => n + 1 + Math.floor(r * 4));
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
    };
  }, [live, still, active, s.total]);

  const pts = vals.map((v, i) => [(i * 200) / (vals.length - 1), 76 - (v - 30) * 1.05] as const);
  const line = smooth(pts);
  const [lx, ly] = pts[pts.length - 1];

  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-primary">
          <Bot className="size-3" /> {s.metric}
        </span>
        <span className="font-mono text-sm font-bold tabular-nums">{total.toLocaleString("en-US")}</span>
      </div>
      <svg viewBox="0 0 200 80" className="mt-2 h-24 w-full overflow-visible" aria-hidden>
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="var(--border)" strokeDasharray="2 4" />
        ))}
        {live && (
          <>
            <path
              d={`${line} L200 80 L0 80 Z`}
              fill="var(--primary)"
              fillOpacity="0.12"
              className="animate-[hero-fade_0.8s_ease-out_0.6s_both]"
            />
            <path
              d={line}
              pathLength={1}
              fill="none"
              stroke="var(--foreground)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1"
              className="animate-[hero-draw_1.2s_ease-out_both]"
            />
            <g className="animate-[hero-fade_0.3s_ease-out_1.1s_both]">
              <circle cx={lx} cy={ly} r="4" fill="var(--cta)" />
              <circle cx={lx} cy={ly} r="4" fill="none" stroke="var(--cta)" strokeWidth="2" className="origin-center animate-[hero-ring_1.5s_ease-out_infinite]" style={{ transformBox: "fill-box" }} />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}

/** Activity rows tick up while live, and a log line shows the latest action. */
function Activity({ s, live, still, active }: { s: Scenario; live: boolean; still: boolean; active: boolean }) {
  const [counts, setCounts] = useState(s.counts);
  const [bump, setBump] = useState(-1);
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    if (!live || still || !active) return;
    let k = 0;
    const iv = setInterval(() => {
      k += 1;
      const row = k % 5 === 0 ? 2 : k % 2; // humans get the occasional one
      setCounts((c) => c.map((n, i) => (i === row ? n + 1 : i === 0 && row !== 0 ? n + 1 : n)));
      setBump(row);
      setLogIdx(row);
    }, 1500);
    return () => clearInterval(iv);
  }, [live, still, active]);

  return (
    <div className="grid content-start gap-2 text-xs font-medium">
      <ul className="grid gap-2">
        {s.rows.map(([dot, label], i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 transition-all duration-500",
              live ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0",
              bump === i ? "border-primary" : "border-border",
            )}
            style={{ transitionDelay: live && bump === -1 ? `${300 + i * 150}ms` : undefined }}
          >
            <span className={cn("size-2 rounded-full", dot)} aria-hidden />
            <span className="min-w-0 flex-1 truncate">{label}</span>
            <span key={counts[i]} className="font-mono tabular-nums text-muted-foreground animate-[hero-tick_0.4s_ease-out]">
              {counts[i].toLocaleString("en-US")}
            </span>
          </li>
        ))}
      </ul>
      <p
        key={`${logIdx}-${counts[logIdx]}`}
        className={cn(
          "truncate rounded-md px-1 font-mono text-[10px] text-muted-foreground",
          live ? "animate-[hero-rise_0.4s_ease-out_both]" : "opacity-0",
        )}
      >
        › {s.log[logIdx]}
      </p>
    </div>
  );
}

/** Smooth path through points (Catmull-Rom converted to cubic Béziers). */
function smooth(pts: readonly (readonly [number, number])[]) {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[Math.max(0, i - 1)];
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const [x3, y3] = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return d;
}

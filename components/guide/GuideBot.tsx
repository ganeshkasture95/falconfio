"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { FalcoMark } from "@/components/brand/FalcoMark";
import { cn } from "@/lib/utils";

/**
 * "Falco", the page guide: a small AI orb that pops up where the pointer comes to rest and explains
 * what is there, using the nearest `data-guide="…"` attribute (element text overrides section text).
 * Each answer "thinks" for a moment, then streams into the bubble like a chat reply.
 * Touch devices and reduced-motion users get a docked version that describes the section in view.
 * Purely decorative for assistive tech: it repeats on-page content, so it is aria-hidden.
 */

const IDLE = "Hi, I'm Falco. Point at anything and I'll tell you what it is.";
const STORAGE_KEY = "falco-guide";

const PREF_EVENT = "falco-guide-change";
let memoryPref: boolean | null = null; // used when localStorage is unavailable

function readPref(): boolean {
  if (memoryPref !== null) return memoryPref;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}
function writePref(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    memoryPref = on;
  }
  window.dispatchEvent(new Event(PREF_EVENT));
}
function subscribePref(cb: () => void) {
  window.addEventListener(PREF_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(PREF_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const FINE = "(hover: hover) and (pointer: fine)";
const STILL = "(prefers-reduced-motion: reduce)";
function readMode(): "follow" | "dock" {
  return window.matchMedia(FINE).matches && !window.matchMedia(STILL).matches ? "follow" : "dock";
}
function readStill(): boolean {
  return window.matchMedia(STILL).matches;
}
function subscribeMode(cb: () => void) {
  const a = window.matchMedia(FINE);
  const b = window.matchMedia(STILL);
  a.addEventListener("change", cb);
  b.addEventListener("change", cb);
  return () => {
    a.removeEventListener("change", cb);
    b.removeEventListener("change", cb);
  };
}

type Phase = "thinking" | "typing" | "done";
type Anchor = { x: number; y: number; left: boolean; up: boolean; n: number };

export default function GuideBot() {
  const enabled = useSyncExternalStore(subscribePref, readPref, () => false);
  const mode = useSyncExternalStore(subscribeMode, readMode, () => null);
  const still = useSyncExternalStore(subscribeMode, readStill, () => true);
  const [message, setMessage] = useState(IDLE);
  // where the bot appears: the spot the pointer landed on, plus which side has room
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const lastMsg = useRef(IDLE);

  const say = (text: string) => {
    if (text !== lastMsg.current) {
      lastMsg.current = text;
      setMessage(text);
    }
  };
  // The typewriter reports its phase straight to the DOM so the orb can react without re-renders.
  const setPhase = useCallback((phase: Phase) => {
    if (rootRef.current) rootRef.current.dataset.phase = phase;
  }, []);

  // Hover mode: stay hidden while the pointer travels; once it rests on a card or section,
  // pop up at that spot and explain it. Moving to something else hides it until the next landing.
  useEffect(() => {
    if (mode !== "follow" || !enabled) return;
    let dwell: ReturnType<typeof setTimeout> | undefined;
    let shownOn: Element | null = null;
    let at = { x: 0, y: 0 };
    let n = 0;

    const hide = () => {
      clearTimeout(dwell);
      if (shownOn) {
        shownOn = null;
        setAnchor(null);
      }
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-guide]") ?? null;
      const x = e.clientX;
      const y = e.clientY;

      if (shownOn && el === shownOn && Math.hypot(x - at.x, y - at.y) < 280) {
        // still on the same thing: stay put and just look at the pointer
        if (eyesRef.current) {
          const ex = Math.max(-1.1, Math.min(1.1, (x - at.x) * 0.02));
          const ey = Math.max(-1.1, Math.min(1.1, (y - at.y) * 0.02));
          eyesRef.current.style.transform = `translate(${ex}px, ${ey}px)`;
        }
        return;
      }

      hide();
      if (!el) return;
      // wait for the pointer to settle before appearing
      dwell = setTimeout(() => {
        shownOn = el;
        at = { x, y };
        say(el.getAttribute("data-guide") ?? IDLE);
        setAnchor({
          x,
          y,
          left: x > window.innerWidth - 360,
          up: y > window.innerHeight - 190,
          n: ++n,
        });
      }, 450);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", hide);
    window.addEventListener("scroll", hide, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      clearTimeout(dwell);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", hide);
      window.removeEventListener("scroll", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, [mode, enabled]);

  // Dock mode: describe the section closest to the middle of the screen.
  useEffect(() => {
    if (mode !== "dock" || !enabled) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-guide], footer[data-guide]"));
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) say(hit.target.getAttribute("data-guide") ?? IDLE);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [mode, enabled]);

  const toggle = () => writePref(!enabled);

  if (mode === null) return null;

  const speech = (side: "left" | "right") => (
    <Speech side={side} eyesRef={eyesRef}>
      <Typewriter key={message} text={message} instant={still} onPhase={setPhase} />
    </Speech>
  );

  return (
    <div ref={rootRef} data-phase="done" className="group/guide">
      {/* Toggle, always reachable */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        className={cn(
          "fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold shadow-float transition-colors hover:border-primary",
          mode === "dock" && enabled && "bottom-[9rem]",
        )}
      >
        {enabled ? <X className="size-3.5" aria-hidden /> : <FalcoMark className="size-5" />}
        {enabled ? "Hide guide" : "Show guide"}
      </button>

      {enabled && mode === "follow" && anchor && (
        <div
          key={anchor.n}
          aria-hidden
          className="pointer-events-none fixed z-[70]"
          style={{
            left: anchor.x + (anchor.left ? -14 : 14),
            top: anchor.y + (anchor.up ? -14 : 14),
            transform: `translate(${anchor.left ? "-100%" : "0"}, ${anchor.up ? "-100%" : "0"})`,
          }}
        >
          <div
            className="animate-[guide-land_0.45s_cubic-bezier(0.2,0.9,0.3,1.25)_both]"
            style={{ transformOrigin: `${anchor.up ? "bottom" : "top"} ${anchor.left ? "right" : "left"}` }}
          >
            {speech(anchor.left ? "left" : "right")}
          </div>
        </div>
      )}

      {enabled && mode === "dock" && (
        <div aria-hidden className="pointer-events-none fixed bottom-4 left-4 right-4 z-[70] flex justify-end sm:left-auto">
          {speech("left")}
        </div>
      )}
    </div>
  );
}

/** Streams `text` in like a chat reply: a short "thinking" pause, then characters with a caret. */
function Typewriter({ text, instant, onPhase }: { text: string; instant: boolean; onPhase: (p: Phase) => void }) {
  const [shown, setShown] = useState(instant ? text.length : 0);
  const [thinking, setThinking] = useState(!instant);

  useEffect(() => {
    if (instant) {
      onPhase("done");
      return;
    }
    onPhase("thinking");
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const step = text.length > 110 ? 2 : 1;
    const start = setTimeout(() => {
      setThinking(false);
      onPhase("typing");
      iv = setInterval(() => {
        i = Math.min(text.length, i + step);
        setShown(i);
        if (i >= text.length) {
          clearInterval(iv);
          onPhase("done");
        }
      }, 18);
    }, 360);
    return () => {
      clearTimeout(start);
      clearInterval(iv);
    };
  }, [text, instant, onPhase]);

  return (
    // The invisible full text reserves the final size, so the bubble doesn't grow while typing.
    <span className="grid text-[13px] leading-snug">
      <span className="invisible col-start-1 row-start-1">{text}</span>
      <span className="col-start-1 row-start-1">
        {thinking ? (
          <span className="inline-flex gap-1 pt-1.5">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="size-1.5 animate-[guide-dot_1s_ease-in-out_infinite] rounded-full bg-periwinkle"
                style={{ animationDelay: `${d * 0.15}s` }}
              />
            ))}
          </span>
        ) : (
          <>
            {text.slice(0, shown)}
            {shown < text.length && (
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] animate-[guide-caret_0.8s_steps(1)_infinite] bg-periwinkle" />
            )}
          </>
        )}
      </span>
    </span>
  );
}

function Speech({
  side,
  eyesRef,
  children,
}: {
  side: "left" | "right";
  eyesRef: React.RefObject<SVGGElement | null>;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-start gap-2.5", side === "left" && "flex-row-reverse")}>
      <Orb eyesRef={eyesRef} />
      <div
        className={cn(
          "mt-2 w-max max-w-[272px] animate-[guide-pop_0.3s_cubic-bezier(0.2,0.9,0.3,1.2)] rounded-2xl border border-white/20 bg-midnight px-3.5 pb-3 pt-2.5 text-white shadow-pop",
          side === "right" ? "rounded-tl-sm" : "rounded-tr-sm",
        )}
      >
        <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-mist">
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-[guide-ping_1.4s_ease-out_infinite] rounded-full bg-periwinkle" />
            <span className="relative size-1.5 rounded-full bg-periwinkle" />
          </span>
          Falco · AI guide
        </span>
        {children}
      </div>
    </div>
  );
}

/** The AI orb: a dark core with tracking eyes, inside a spinning ring that speeds up while it thinks. */
function Orb({ eyesRef }: { eyesRef: React.RefObject<SVGGElement | null> }) {
  return (
    <div className="relative size-16 shrink-0 animate-[guide-bob_2.8s_ease-in-out_infinite]">
      {/* ripple while thinking */}
      <span className="absolute inset-1 rounded-full border-2 border-periwinkle opacity-0 group-data-[phase=thinking]/guide:animate-[guide-ping_0.9s_ease-out_infinite]" />
      <div className="relative size-full">
        {/* orbit ring: spins faster while Falco is thinking */}
        <svg viewBox="0 0 64 64" className="absolute inset-0 size-full drop-shadow-lg" aria-hidden>
          <g className="origin-center animate-[guide-spin_3.2s_linear_infinite] group-data-[phase=thinking]/guide:[animation-duration:0.7s] group-data-[phase=typing]/guide:[animation-duration:1.4s]" style={{ transformBox: "fill-box" }}>
            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--brand-royal-600)" strokeWidth="2" opacity="0.45" />
            <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="34 155" />
            <circle cx="32" cy="2" r="2.6" fill="var(--brand-periwinkle-300)" />
          </g>
        </svg>
        <FalcoMark eyeRef={eyesRef} className="absolute inset-[9%] size-[82%] rounded-full ring-2 ring-white" />
      </div>
    </div>
  );
}

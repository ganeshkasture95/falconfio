"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const STILL = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(STILL);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** True when the visitor prefers reduced motion (demos then show their final state). */
export function useStill() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(STILL).matches, () => false);
}

/**
 * Plays a scripted timeline: returns how many beats have happened so far.
 * `delays` must be a stable (module-level) array. Remount the component (change its key) to replay.
 */
export function useTimeline(delays: readonly number[], still: boolean, start = true) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (still || !start) return;
    let acc = 0;
    const timers = delays.map((d, i) => {
      acc += d;
      return setTimeout(() => setStep(i + 1), acc);
    });
    return () => timers.forEach(clearTimeout);
  }, [delays, still, start]);
  return still ? delays.length : step;
}

/** Types `text` out character by character. Remount (key) to restart. */
export function useTyped(text: string, still: boolean, speed = 16, delay = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (still) return;
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i = Math.min(text.length, i + 2);
        setN(i);
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [text, still, speed, delay]);
  return still ? text : text.slice(0, n);
}

/** Becomes true the first time the element scrolls into view. */
export function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

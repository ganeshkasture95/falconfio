"use client";

import React, { useEffect, useRef } from "react";
import { animateCounter } from "@/lib/animations";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
}) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCounter(counterRef.current!, target, {
              duration,
              prefix,
              suffix,
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);

    return () => {
      observer.disconnect();
    };
  }, [target, duration, prefix, suffix]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};

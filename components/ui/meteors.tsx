"use client";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteorCount = number || 20;
  
  const meteors = useMemo(() => {
    return Array.from({ length: meteorCount }, (_, idx) => {
      const seed = idx * 0.137; // Use deterministic seed
      return {
        position: idx * (800 / meteorCount) - 400,
        delay: (seed * 7.3) % 5,
        duration: 5 + Math.floor((seed * 11.7) % 5),
      };
    });
  }, [meteorCount]);

  return (
    <div className="opacity-100 transition-opacity duration-500">
      {meteors.map((meteor, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-45 rounded-full bg-[#73E2A7] shadow-[0_0_0_1px_#73E2A710]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#73E2A7] before:via-[#1C7C54] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: "-40px",
            left: meteor.position + "px",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.duration + "s",
          }}
        ></span>
      ))}
    </div>
  );
};

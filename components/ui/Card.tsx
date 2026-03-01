"use client";

import React from "react";
import { gsap } from "gsap";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = true,
}) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!hover) return;
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hover]);

  return (
    <div
      ref={cardRef}
      className={`bg-card rounded-xl p-6 border border-foreground/10 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

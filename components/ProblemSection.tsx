"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { scrollFadeIn } from "@/lib/animations";

const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      scrollFadeIn(headerRef.current, {
        y: 30,
        duration: 0.8,
      });
    }
    if (problemsRef.current) {
      const problems = problemsRef.current.querySelectorAll(".problem-card");
      scrollFadeIn(problems, {
        stagger: 0.1,
        y: 40,
        once: true,
      });
    }
  }, []);

  const problems = [
    {
      title: "Your app slows down as users increase",
      description: "Performance bottlenecks emerge as traffic grows. Response times degrade, user experience suffers.",
    },
    {
      title: "Features take longer to ship every month",
      description: "Technical debt accumulates. What used to take days now takes weeks as code complexity grows.",
    },
    {
      title: "Infrastructure costs keep rising without clarity",
      description: "Cloud bills spike unpredictably. You're paying more but can't pinpoint why or how to optimize.",
    },
    {
      title: "AI feels like a buzzword, not a strategy",
      description: "AI features are added reactively without a clear roadmap. No measurable impact on business outcomes.",
    },
    {
      title: "Early technical decisions are now blocking growth",
      description: "Choices made for speed are now constraints. Refactoring feels impossible without breaking everything.",
    },
    {
      title: "There's no senior engineering direction",
      description: "Team makes decisions in isolation. No architectural vision to guide long-term technical strategy.",
    },
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-12">
          {/* Small Label */}
          <div className="text-xs sm:text-sm font-medium text-foreground/60 mb-2 sm:mb-3 uppercase tracking-wider">
            The Hidden Cost of Scaling
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight px-2">
            Most Startups Don't Break
            <br />
            <span className="gradient-text">Because of Product.</span>
            <br />
            They Break Because of Architecture.
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed px-2">
            Growth exposes every early engineering shortcut.
            <br />
            What worked for 1,000 users quietly collapses at 50,000.
          </p>
        </div>

        {/* Problems Section Header */}
        <div className="mb-8 sm:mb-12 px-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">⚠️</span>
            <span>The Real Problems</span>
          </h3>
        </div>

        {/* Problems Grid - Next.js Style */}
        <div
          ref={problemsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              className="problem-card group relative h-full flex flex-col p-4 sm:p-6 rounded-xl bg-card border border-foreground/20 hover:border-[#73E2A7]/30 transition-all duration-300"
              style={{ opacity: 1 }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(115, 226, 167, 0.1)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-[#73E2A7]/0 via-[#1C7C54]/0 to-[#1B512D]/0 group-hover:from-[#73E2A7]/5 group-hover:via-[#1C7C54]/5 group-hover:to-[#1B512D]/5 transition-all duration-500 rounded-xl pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col">
                <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-[#73E2A7] transition-colors duration-300">
                  {problem.title}
                </h4>
                <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed grow">
                  {problem.description}
                </p>
              </div>

              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-bl from-[#73E2A7]/0 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Closing Statement - Standalone with white space */}
        <div className="text-center mt-12 sm:mt-16 md:mt-24 mb-8 sm:mb-12 px-2">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/90 leading-tight">
            Scaling doesn't forgive weak foundations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

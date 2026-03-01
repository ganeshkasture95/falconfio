"use client";

import React, { useEffect, useRef } from "react";
import { scrollFadeIn } from "@/lib/animations";
import { Card } from "./ui/Card";
import { AnimatedCounter } from "./ui/AnimatedCounter";

const DifferentiatorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll(".feature-card");
      scrollFadeIn(features, {
        stagger: 0.1,
        y: 30,
      });
    }
  }, []);

  const features = [
    {
      title: "Engineering Excellence",
      description:
        "Quality code, scalable architecture, and best practices. We build products that stand the test of time.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      title: "Startup-Friendly Pricing",
      description:
        "Transparent pricing and flexible engagement models. Get enterprise-quality results without enterprise prices.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "AI-First Approach",
      description:
        "Deep AI/ML expertise integrated into every project. From chatbots to predictive analytics, we make AI work for you.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Fast Delivery",
      description:
        "Agile methodology and timely project completion. We move fast without compromising quality.",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    { label: "Projects Delivered", value: 50, suffix: "+" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
    { label: "Average Delivery Time", value: 8, suffix: " weeks" },
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-32 px-4 sm:px-6 lg:px-8 bg-card/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Falconfio</span>?
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            We combine engineering excellence with startup-friendly pricing
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center feature-card"
            >
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <div className="text-lg text-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="feature-card group">
              <div className="flex items-start space-x-4">
                <div className="text-[#73E2A7] flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;

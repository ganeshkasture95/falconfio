"use client";

import React, { useEffect, useRef } from "react";
import { scrollFadeIn } from "@/lib/animations";
import AnimatedCircuit from "./AnimatedCircuit";

const TechnologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll(".tech-item");
      scrollFadeIn(elements, {
        stagger: 0.1,
        y: 30,
      });
    }
  }, []);

  const technologies = [
    {
      name: "React",
      category: "Frontend",
      description: "Modern UI library for building interactive interfaces",
      icon: "⚛️",
    },
    {
      name: "Next.js",
      category: "Framework",
      description: "Production-ready React framework with SSR & SSG",
      icon: "▲",
    },
    {
      name: "TypeScript",
      category: "Language",
      description: "Type-safe JavaScript for scalable applications",
      icon: "📘",
    },
    {
      name: "Node.js",
      category: "Backend",
      description: "Server-side JavaScript runtime for APIs",
      icon: "🟢",
    },
    {
      name: "Python",
      category: "AI/ML",
      description: "Primary language for AI and machine learning",
      icon: "🐍",
    },
    {
      name: "TensorFlow",
      category: "AI/ML",
      description: "Open-source ML framework for AI applications",
      icon: "🧠",
    },
    {
      name: "AWS",
      category: "Cloud",
      description: "Scalable cloud infrastructure and services",
      icon: "☁️",
    },
    {
      name: "Docker",
      category: "DevOps",
      description: "Containerization for consistent deployments",
      icon: "🐳",
    },
  ];

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="gradient-text">Powered By</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-2">
            Cutting-edge technology stack engineered for performance and scale
          </p>
        </div>

        {/* Animated Circuit */}
        <div className="mb-10 sm:mb-12 md:mb-16 tech-item">
          <AnimatedCircuit />
        </div>

        {/* Technology Grid */}
        <div
          ref={contentRef}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="tech-item group relative p-4 sm:p-6 rounded-xl bg-card border border-foreground/10 hover:border-foreground/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#73E2A7]/10"
              style={{ opacity: 1 }}
            >
              {/* Icon */}
              <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              
              {/* Name */}
              <div className="text-lg sm:text-xl md:text-2xl font-bold gradient-text mb-1 sm:mb-2 text-center">
                {tech.name}
              </div>
              
              {/* Category */}
              <div className="text-xs sm:text-sm font-semibold text-foreground/80 mb-2 sm:mb-3 text-center">
                {tech.category}
              </div>
              
              {/* Description */}
              <div className="text-xs text-foreground/60 text-center leading-relaxed">
                {tech.description}
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#73E2A7]/5 via-[#1C7C54]/5 to-[#1B512D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center tech-item px-2">
          <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-card border border-foreground/10 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-foreground/80 font-medium">
              <span className="gradient-text font-bold">100+</span> Technologies
              in Our Arsenal
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            We leverage the latest technologies and best practices to build
            scalable, performant applications that grow with your business. Our
            expertise spans across modern frameworks, AI/ML tools, cloud
            infrastructure, and DevOps practices.
          </p>
          
          {/* Tech Categories */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-2 sm:gap-4">
            {["Frontend", "Backend", "AI/ML", "Cloud", "DevOps", "Mobile"].map(
              (category, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-card border border-foreground/10 text-xs sm:text-sm text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                >
                  {category}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

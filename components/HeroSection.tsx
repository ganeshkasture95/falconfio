"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import AnimatedGrid from "./AnimatedGrid";
import { Button } from "./ui/Button";
import { Meteors } from "./ui/meteors";

const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate headline with letter-by-letter stagger
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".word");
      words.forEach((word, i) => {
        const letters = word.textContent?.split("") || [];
        word.innerHTML = letters
          .map(
            (letter) =>
              `<span class="letter" style="display: inline-block;">${
                letter === " " ? "&nbsp;" : letter
              }</span>`
          )
          .join("");

        const letterElements = word.querySelectorAll(".letter");
        gsap.from(letterElements, {
          opacity: 0,
          y: 50,
          rotationX: -90,
          transformOrigin: "50% 50% -50",
          duration: 0.8,
          delay: 0.3 + i * 0.1,
          stagger: 0.03,
          ease: "back.out(1.7)",
        });
      });
    }

    // Animate subheadline
    if (subheadlineRef.current) {
      gsap.from(subheadlineRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });
    }

    // Animate buttons with stagger
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("button");
      gsap.from(buttons, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.8,
        delay: 1.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }

    // Animated mesh gradient background
    if (meshRef.current) {
      const animateMesh = () => {
        gsap.to(meshRef.current, {
          backgroundPosition: "200% 200%",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      };
      animateMesh();
    }

    // Floating orbs animation
    const orbs = document.querySelectorAll(".floating-orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: "+=30",
        x: "+=20",
        rotation: 360,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        gsap.to(backgroundRef.current, {
          x: (x - 50) * 0.02,
          y: (y - 50) * 0.02,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Grid Background */}
      <AnimatedGrid intensity="high" className="-z-20" />

      {/* Meteors Effect */}
      <div className="absolute inset-0 -z-15 overflow-hidden pointer-events-none">
        <Meteors number={30} />
      </div>

      {/* Enhanced Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* Animated Mesh Gradient */}
        <div
          ref={meshRef}
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(at 0% 0%, rgba(115, 226, 167, 0.3) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(28, 124, 84, 0.3) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(27, 81, 45, 0.3) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(115, 226, 167, 0.2) 0px, transparent 50%)
            `,
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 0%",
            filter: "blur(60px)",
          }}
        />

        

        {/* Floating Orbs - Green Theme */}
        <div className="floating-orb absolute top-20 left-10 w-72 h-72 bg-[#73E2A7]/20 rounded-full blur-3xl" />
        <div className="floating-orb absolute bottom-20 right-10 w-96 h-96 bg-[#1C7C54]/20 rounded-full blur-3xl" />
        <div className="floating-orb absolute top-1/2 left-1/2 w-64 h-64 bg-[#1B512D]/20 rounded-full blur-3xl" />
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {React.useMemo(() => {
          return Array.from({ length: 30 }, (_, i) => {
            const seed = i * 0.1;
            return {
              width: 2 + (seed % 1) * 4,
              height: 2 + ((seed * 1.3) % 1) * 4,
              left: (seed * 7.3) % 100,
              top: (seed * 11.7) % 100,
              color: i % 2 === 0 ? "115, 226, 167" : "28, 124, 84",
              opacity: 0.4 + ((seed * 2.1) % 1) * 0.4,
              duration: 3 + ((seed * 3.7) % 1) * 3,
              delay: (seed * 5.9) % 3,
              shadow: 10 + ((seed * 4.2) % 1) * 10,
            };
          });
        }, []).map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: `rgba(${particle.color}, ${particle.opacity})`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 ${particle.shadow}px rgba(115, 226, 167, 0.5)`,
            }}
          />
        ))}
      </div>

      {/* Animated Geometric Shapes - Green Theme */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#73E2A7]/20 rotate-45"
          style={{
            animation: "spin 20s linear infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#1C7C54]/20 rounded-full"
          style={{
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-16 h-16 border border-[#1B512D]/20 rotate-12"
          style={{
            animation: "spin 15s linear infinite reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-foreground/10 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-foreground/70">Available for new projects</span>
        </div>

        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="word block">Build Products</span>
          <span className="word block">
            <span className="gradient-text">That Scale.</span>{" "}
            <span className="gradient-text">Fast.</span>
          </span>
        </h1>

        <p
          ref={subheadlineRef}
          className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Full-stack product engineering for ambitious startups. AI integration,
          scalable web & mobile apps, and cloud infrastructure—delivered with
          precision.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection("cta")}
            className="group relative overflow-hidden"
          >
            <span className="relative z-10">Start Your Project</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#73E2A7] via-[#1C7C54] to-[#1B512D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("case-studies")}
            className="group"
          >
            <span>View Our Work</span>
            <svg
              className="w-5 h-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
          {[
            { value: "50+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "8 weeks", label: "Avg. Delivery" },
          ].map((stat, i) => (
            <div
              key={i}
              className="opacity-0"
              style={{
                animation: `fadeInUp 0.8s ease-out ${1.8 + i * 0.1}s forwards`,
              }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => scrollToSection("services")}
      >
        <span className="text-xs text-foreground/50 group-hover:text-foreground transition-colors">
          Scroll to explore
        </span>
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <svg
              className="w-6 h-6 text-foreground/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <svg
            className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors relative animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;

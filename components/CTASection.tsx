"use client";

import React, { useEffect, useRef } from "react";
import { fadeIn } from "@/lib/animations";
import { Button } from "./ui/Button";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      fadeIn(contentRef.current, { delay: 0.2 });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated Background - Green Theme */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C7C54] via-[#1B512D] to-[#73E2A7] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(115,226,167,0.1),transparent_50%)]" />
        
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Ready to Build Your
            <br />
            <span className="text-white/90">Next Product?</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help bring your vision to life. From AI
            integration to full-stack development, we've got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                // In a real app, this would open a contact form or link to a contact page
                window.location.href = "mailto:hello@falconfio.com";
              }}
              className="bg-white text-gray-900 hover:bg-white/90 animate-pulse-glow"
            >
              Schedule a Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("case-studies")}
              className="border-white text-white hover:bg-white/10"
            >
              View Case Studies
            </Button>
          </div>

          <div className="mt-12 text-white/70">
            <p className="text-sm">
              No commitment required. Let's explore how we can work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

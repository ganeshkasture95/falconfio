"use client";

import { fadeIn } from "@/lib/animations";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/Button";

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      // On mobile, make content immediately visible and keep it visible
      if (isMobile) {
        gsap.set(contentRef.current, { opacity: 1, y: 0, clearProps: "all" });
        // Also set children to visible
        const children = contentRef.current.children;
        Array.from(children).forEach((child) => {
          gsap.set(child, { opacity: 1, y: 0, clearProps: "all" });
        });
        // Force visibility with a timeout as backup
        setTimeout(() => {
          if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 1, y: 0 });
            contentRef.current.style.opacity = "1";
            contentRef.current.style.visibility = "visible";
          }
        }, 100);
      } else {
        // On desktop, use animation
        gsap.set(contentRef.current, { opacity: 1 });
        fadeIn(contentRef.current, { delay: 0.2 });
      }
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
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
        <div ref={contentRef} style={{ opacity: 1, visibility: "visible" }} data-mobile-visible>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white px-2"
            style={{ opacity: 1, visibility: "visible" }}
            data-mobile-visible
          >
            Ready to Build Your
            <br />
            <span className="text-white/90">Next Product?</span>
          </h2>
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 sm:text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2"
            style={{ opacity: 1, visibility: "visible" }}
            data-mobile-visible
          >
            Let&apos;s discuss how we can help bring your vision to life. From AI
            integration to full-stack development, we&apos;ve got you covered.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-2"
            style={{ opacity: 1, visibility: "visible" }}
            data-mobile-visible
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                // In a real app, this would open a contact form or link to a contact page
                window.location.href = "mailto:hello@falconfio.com";
              }}
              className="bg-white text-gray-900 hover:bg-white/90 w-full sm:w-auto"
              style={{ opacity: 1, visibility: "visible" }}
            >
              Schedule a Consultation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("case-studies")}
              className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
              style={{ opacity: 1, visibility: "visible" }}
            >
              View Case Studies
            </Button>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 text-white/80 sm:text-white/70 px-2">
            <p className="text-xs sm:text-sm">
              No commitment required. Let&apos;s explore how we can work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

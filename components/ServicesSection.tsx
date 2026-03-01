"use client";

import React, { useEffect, useRef } from "react";
import { scrollFadeIn } from "@/lib/animations";
import { Card } from "./ui/Card";

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".service-card");
      scrollFadeIn(cards, {
        stagger: 0.15,
        y: 50,
      });
    }
  }, []);

  const services = [
    {
      title: "AI Development & Consulting",
      description:
        "Strategic AI roadmaps, MVP development, chatbot integration, and enterprise AI systems.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "Web & Mobile Development",
      description:
        "Scalable applications from MVP to production-ready products. React, Next.js, React Native, and more.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Cloud & DevOps",
      description:
        "Infrastructure setup, CI/CD pipelines, scalable architecture, and cloud migration services.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
    },
    {
      title: "Product Engineering",
      description:
        "End-to-end product development from concept to launch. Design, development, and deployment.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-2">
            Comprehensive product engineering solutions tailored to your needs
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <Card key={index} className="service-card group">
              <div className="flex flex-col h-full">
                <div className="text-[#73E2A7] mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-foreground/70 grow leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

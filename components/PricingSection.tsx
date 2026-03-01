"use client";

import React, { useEffect, useRef } from "react";
import { scrollFadeIn } from "@/lib/animations";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".pricing-card");
      scrollFadeIn(cards, {
        stagger: 0.15,
        y: 50,
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pricingTiers = [
    {
      title: "MVP & AI Integration",
      price: "$25K–$80K",
      description: "Perfect for startups ready to build their first product",
      features: [
        "AI strategy & roadmap planning",
        "MVP development (web or mobile)",
        "AI integration & chatbot setup",
        "Basic cloud infrastructure",
        "3-6 month timeline",
      ],
      popular: false,
    },
    {
      title: "Scaling & Architecture",
      price: "$80K–$200K+",
      description: "For companies ready to scale and optimize",
      features: [
        "Scalable architecture design",
        "Full-stack product development",
        "Advanced AI/ML implementation",
        "Enterprise cloud infrastructure",
        "DevOps & CI/CD setup",
        "6-12 month engagement",
      ],
      popular: true,
    },
    {
      title: "AI Strategy Retainers",
      price: "$3K–$10K/month",
      description: "Ongoing support and optimization",
      features: [
        "Monthly AI strategy sessions",
        "Continuous optimization",
        "Performance monitoring",
        "Feature enhancements",
        "Technical support",
        "Flexible engagement",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="gradient-text">Engagement Models</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-2">
            Transparent pricing tailored to your stage and needs
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`pricing-card relative ${
                tier.popular
                  ? "border-2 border-[#73E2A7]"
                  : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-linear-to-r from-[#73E2A7] to-[#1C7C54] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-5 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{tier.title}</h3>
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                  {tier.price}
                </div>
                <p className="text-foreground/70 text-xs sm:text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "primary" : "outline"}
                className="w-full"
                onClick={() => scrollToSection("cta")}
              >
                Get Custom Quote
              </Button>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12 text-foreground/70 px-2">
          <p className="text-sm sm:text-base">
            All pricing is project-based and customized to your specific needs.
            Contact us for a detailed quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

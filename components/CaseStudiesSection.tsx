"use client";

import { scrollFadeIn } from "@/lib/animations";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const CaseStudiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const studiesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (studiesRef.current) {
      const studies = studiesRef.current.querySelectorAll(".case-study-card");
      scrollFadeIn(studies, {
        stagger: 0.2,
        y: 50,
      });
    }
    if (testimonialsRef.current) {
      const testimonials =
        testimonialsRef.current.querySelectorAll(".testimonial-card");
      scrollFadeIn(testimonials, {
        stagger: 0.15,
        y: 30,
      });
    }
  }, []);

  const caseStudies = [
    {
      title: "AI-Powered SaaS Platform",
      description:
        "Built a scalable SaaS platform with AI-powered analytics for a fintech startup.",
      metrics: [
        { label: "Users", value: "10K+" },
        { label: "Uptime", value: "99.9%" },
        { label: "Time to Market", value: "4 months" },
      ],
      tech: ["Next.js", "AI/ML", "AWS", "PostgreSQL"],
    },
    {
      title: "Mobile E-Commerce App",
      description:
        "Developed a full-stack mobile e-commerce solution with real-time inventory management.",
      metrics: [
        { label: "Downloads", value: "50K+" },
        { label: "Conversion", value: "+35%" },
        { label: "Performance", value: "95/100" },
      ],
      tech: ["React Native", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Enterprise AI Integration",
      description:
        "Integrated AI capabilities into existing enterprise systems, improving efficiency by 40%.",
      metrics: [
        { label: "Efficiency", value: "+40%" },
        { label: "Cost Savings", value: "$200K/year" },
        { label: "ROI", value: "300%" },
      ],
      tech: ["Python", "TensorFlow", "Kubernetes", "GCP"],
    },
  ];

  const testimonials = [
    {
      quote:
        "Falconfio delivered exactly what we needed. Their AI integration transformed our product and gave us a competitive edge.",
      author: "Sarah Chen",
      role: "CEO, TechStart Inc.",
    },
    {
      quote:
        "The team's expertise in both AI and product engineering is unmatched. They understood our vision and executed flawlessly.",
      author: "Michael Rodriguez",
      role: "Founder, DataFlow",
    },
    {
      quote:
        "Fast delivery, transparent pricing, and exceptional quality. Falconfio is now our go-to partner for all product development.",
      author: "Emily Johnson",
      role: "CTO, CloudScale",
    },
  ];

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-card/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-2">
            See how we&apos;ve helped startups build and scale their products
          </p>
        </div>

        {/* Case Studies */}
        <div ref={studiesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {caseStudies.map((study, index) => (
            <Card key={index} className="case-study-card">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{study.title}</h3>
              <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6 leading-relaxed">{study.description}</p>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {study.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold gradient-text">
                      {metric.value}
                    </div>
                    <div className="text-xs text-foreground/60 mt-1">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {study.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 sm:px-3 py-1 bg-foreground/10 rounded-full text-xs sm:text-sm text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* View All Case Studies Button */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <Link href="/case-studies">
            <Button variant="primary" size="lg" className="group">
              View All Case Studies
              <svg
                className="w-5 h-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform duration-300"
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
          </Link>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-2">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What Our Clients Say</h3>
        </div>

        <div
          ref={testimonialsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card">
              <div className="mb-3 sm:mb-4">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-[#73E2A7] mb-3 sm:mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <div className="font-bold text-sm sm:text-base">{testimonial.author}</div>
                <div className="text-xs sm:text-sm text-foreground/60">
                  {testimonial.role}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;

"use client";

import { Button } from "./ui/Button";

export default function CaseStudyCTA() {
  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `/#${id}`;
      }
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-card border border-foreground/10 rounded-2xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Build Your
            <br />
            <span className="gradient-text">Success Story?</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("cta")}
            >
              Request a Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = "mailto:hello@falconfio.com";
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

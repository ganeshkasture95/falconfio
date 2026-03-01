"use client";

import { gsap } from "gsap";

let ScrollTrigger: any = null;

if (typeof window !== "undefined") {
  try {
    // Try to import ScrollTrigger (it might be a premium plugin)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const scrollTriggerModule = require("gsap/ScrollTrigger");
    ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
  } catch (e) {
    // ScrollTrigger not available, will use Intersection Observer fallback
    // This is expected if ScrollTrigger is not installed
  }
}

/**
 * Fade in animation with optional stagger
 */
export const fadeIn = (
  elements: gsap.TweenTarget,
  options?: {
    duration?: number;
    delay?: number;
    stagger?: number;
    y?: number;
  }
) => {
  const { duration = 0.6, delay = 0, stagger = 0, y = 20 } = options || {};

  return gsap.from(elements, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: "power2.out",
  });
};

/**
 * Slide in from left
 */
export const slideInLeft = (
  elements: gsap.TweenTarget,
  options?: { duration?: number; delay?: number; stagger?: number }
) => {
  const { duration = 0.6, delay = 0, stagger = 0 } = options || {};

  return gsap.from(elements, {
    opacity: 0,
    x: -50,
    duration,
    delay,
    stagger,
    ease: "power2.out",
  });
};

/**
 * Slide in from right
 */
export const slideInRight = (
  elements: gsap.TweenTarget,
  options?: { duration?: number; delay?: number; stagger?: number }
) => {
  const { duration = 0.6, delay = 0, stagger = 0 } = options || {};

  return gsap.from(elements, {
    opacity: 0,
    x: 50,
    duration,
    delay,
    stagger,
    ease: "power2.out",
  });
};

/**
 * Scale in animation
 */
export const scaleIn = (
  elements: gsap.TweenTarget,
  options?: { duration?: number; delay?: number; stagger?: number }
) => {
  const { duration = 0.6, delay = 0, stagger = 0 } = options || {};

  return gsap.from(elements, {
    opacity: 0,
    scale: 0.8,
    duration,
    delay,
    stagger,
    ease: "back.out(1.7)",
  });
};

/**
 * Scroll-triggered fade in
 */
export const scrollFadeIn = (
  elements: gsap.TweenTarget,
  options?: {
    duration?: number;
    y?: number;
    stagger?: number;
    start?: string;
    end?: string;
    once?: boolean;
  }
) => {
  const {
    duration = 0.8,
    y = 50,
    stagger = 0.1,
    start = "top 85%",
    end = "bottom 20%",
    once = true,
  } = options || {};

  const elementArray = Array.isArray(elements)
    ? elements
    : (elements as any).length
    ? Array.from(elements as any)
    : [elements];

  // Set initial state for all elements
  elementArray.forEach((el: any) => {
    if (el && typeof window !== "undefined") {
      gsap.set(el, { opacity: 0, y: y, scale: 0.95 });
    }
  });

  if (ScrollTrigger && elementArray.length > 0) {
    // Use the first element's parent as trigger for better performance
    const firstElement = elementArray[0];
    if (!firstElement || !(firstElement instanceof Element)) return;
    
    const trigger = firstElement.parentElement || firstElement;
    if (!trigger || !(trigger instanceof Element)) return;
    
    return gsap.to(elementArray, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger,
        start,
        end,
        toggleActions: once ? "play none none none" : "play none none reverse",
        once: once,
      },
    });
  } else {
    // Fallback using Intersection Observer
    elementArray.forEach((el: any, index: number) => {
      if (typeof window === "undefined" || !el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.getAttribute("data-animated") !== "true") {
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration,
                ease: "power3.out",
                delay: index * stagger,
                onComplete: () => {
                  entry.target.setAttribute("data-animated", "true");
                },
              });
              if (once) {
                observer.unobserve(entry.target);
              }
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      observer.observe(el);
    });
  }
};

/**
 * Parallax effect
 */
export const parallax = (
  elements: gsap.TweenTarget,
  options?: { speed?: number; start?: string; end?: string }
) => {
  const { speed = 0.5, start = "top bottom", end = "bottom top" } = options || {};

  if (ScrollTrigger) {
    // Convert TweenTarget to DOM element for trigger
    const elementArray = Array.isArray(elements)
      ? elements
      : (elements as any).length
      ? Array.from(elements as any)
      : [elements];
    
    const triggerElement = elementArray[0];
    if (!triggerElement || !(triggerElement instanceof Element)) return;

    return gsap.to(elements, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub: true,
      },
    });
  } else {
    // Fallback: simple scroll-based parallax
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const elementArray = Array.isArray(elements)
        ? elements
        : (elements as any).length
        ? Array.from(elements as any)
        : [elements];

      elementArray.forEach((el: any) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrolled = window.scrollY;
        const parallaxValue = scrolled * speed;
        gsap.set(el, { y: parallaxValue });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }
};

/**
 * Counter animation
 */
export const animateCounter = (
  element: HTMLElement,
  target: number,
  options?: { duration?: number; prefix?: string; suffix?: string }
) => {
  const { duration = 2, prefix = "", suffix = "" } = options || {};

  const obj = { value: 0 };

  gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      if (element) {
        element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
      }
    },
  });
};

/**
 * Hover scale effect
 */
export const hoverScale = (element: HTMLElement, scale: number = 1.05) => {
  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Cleanup ScrollTrigger instances
 */
export const cleanupScrollTriggers = () => {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
  }
};

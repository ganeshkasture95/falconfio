"use client";

import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check localStorage first
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const html = document.documentElement;
      
      // Remove both classes first
      html.classList.remove("dark", "light");
      
      if (savedTheme === "light") {
        html.classList.add("light");
        setIsDark(false);
      } else if (savedTheme === "dark") {
        html.classList.add("dark");
        setIsDark(true);
      } else {
        // Default to dark
        html.classList.add("dark");
        setIsDark(true);
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const html = document.documentElement;
    
    // Remove both classes first
    html.classList.remove("dark", "light");
    
    // Add the appropriate class
    if (newTheme) {
      html.classList.add("dark");
    } else {
      html.classList.add("light");
    }

    // Store preference in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    }

    // Force a re-render by dispatching a custom event
    window.dispatchEvent(new Event("themechange"));

    // Animate the toggle
    const toggle = document.querySelector(".theme-toggle-button");
    if (toggle) {
      gsap.to(toggle, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }
  };

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-foreground/10 animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button relative w-12 h-6 rounded-full bg-foreground/20 border border-foreground/20 transition-all duration-300 hover:bg-foreground/30 focus:outline-none focus:ring-2 focus:ring-[#73E2A7] focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-[#73E2A7] to-[#1C7C54] transition-transform duration-300 flex items-center justify-center shadow-lg ${
          isDark ? "translate-x-0" : "translate-x-6"
        }`}
      >
        {isDark ? (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;

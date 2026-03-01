"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "./ui/Button";
import ThemeToggle from "./ThemeToggle";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    // Animate dropdowns
    Object.keys(dropdownRefs.current).forEach((key) => {
      const dropdown = dropdownRefs.current[key];
      if (dropdown) {
        if (openDropdown === key) {
          // Show dropdown
          dropdown.style.display = "block";
          gsap.fromTo(
            dropdown,
            { opacity: 0, y: -10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            }
          );
        } else {
          // Hide dropdown
          gsap.to(dropdown, {
            opacity: 0,
            y: -10,
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
              if (dropdown && openDropdown !== key) {
                dropdown.style.display = "none";
              }
            },
          });
        }
      }
    });
  }, [openDropdown]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  const navItems = [
    {
      label: "Product",
      hasDropdown: true,
      dropdownItems: [
        { label: "Features", id: "services" },
        { label: "Integrations", id: "technology" },
        { label: "Updates", id: "case-studies" },
      ],
    },
    {
      label: "AI",
      hasDropdown: true,
      dropdownItems: [
        { label: "AI Solutions", id: "services" },
        { label: "ML Models", id: "technology" },
        { label: "AI Consulting", id: "cta" },
      ],
    },
    {
      label: "Solutions",
      hasDropdown: true,
      dropdownItems: [
        { label: "For Startups", id: "services" },
        { label: "For Enterprises", id: "pricing" },
        { label: "Case Studies", id: "case-studies" },
      ],
    },
    {
      label: "Resources",
      hasDropdown: true,
      dropdownItems: [
        { label: "Documentation", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
    {
      label: "Enterprise",
      id: "pricing",
    },
    {
      label: "Pricing",
      id: "pricing",
    },
  ];

  const handleMouseEnter = (label: string) => {
    // Clear any pending timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-foreground/10 shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="text-2xl font-bold gradient-text focus:outline-none transition-transform duration-300 hover:scale-105"
          >
            Falconfio
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && handleMouseEnter(item.label)
                }
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() =>
                    item.id ? scrollToSection(item.id) : undefined
                  }
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 transition-transform duration-300 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#73E2A7] to-[#1C7C54] transition-all duration-300 group-hover:w-full" />
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div
                    ref={(el) => {
                      dropdownRefs.current[item.label] = el;
                    }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-card border border-foreground/10 shadow-xl backdrop-blur-xl pointer-events-auto"
                    style={{ display: "none", opacity: 0 }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {item.dropdownItems?.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (dropdownItem.id) {
                              scrollToSection(dropdownItem.id);
                            } else if (dropdownItem.href) {
                              window.location.href = dropdownItem.href;
                            }
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 flex items-center group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {dropdownItem.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <ThemeToggle />
              <Button
                variant="primary"
                size="sm"
                onClick={() => scrollToSection("cta")}
                className="transition-all duration-300 hover:scale-105"
              >
                Request a demo
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground focus:outline-none transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-2 border-t border-foreground/10">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => {
                    if (item.id) {
                      scrollToSection(item.id);
                    } else if (item.hasDropdown) {
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      );
                    }
                  }}
                  className="w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                {item.hasDropdown && openDropdown === item.label && (
                  <div className="pl-4 space-y-1">
                    {item.dropdownItems?.map((dropdownItem, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (dropdownItem.id) {
                            scrollToSection(dropdownItem.id);
                          } else if (dropdownItem.href) {
                            window.location.href = dropdownItem.href;
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-200"
                      >
                        {dropdownItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-foreground/10 space-y-3">
              <div className="flex items-center justify-between px-4">
                <span className="text-sm text-foreground/70">Theme</span>
                <ThemeToggle />
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => scrollToSection("cta")}
              >
                Request a demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

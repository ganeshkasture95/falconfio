"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/Button";

type DropdownItem =
  | { label: string; id: string }
  | { label: string; href: string };

type NavItem =
  | {
      label: string;
      hasDropdown: true;
      dropdownItems: DropdownItem[];
    }
  | {
      label: string;
      id: string;
      hasDropdown?: false;
    };

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current, { opacity: 1 });
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  // Handle mobile menu open/close
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      if (backdropRef.current) {
        backdropRef.current.style.display = "block";
        gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      }

      if (mobileMenuRef.current) {
        gsap.fromTo(
          mobileMenuRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.35, ease: "power3.out" }
        );
      }
    } else {
      document.body.style.overflow = "";

      if (mobileMenuRef.current) {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.3,
          ease: "power3.in",
        });
      }

      if (backdropRef.current) {
        gsap.to(backdropRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            if (backdropRef.current) backdropRef.current.style.display = "none";
          },
        });
      }

    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Desktop dropdown animations
  useEffect(() => {
    Object.keys(dropdownRefs.current).forEach((key) => {
      const dropdown = dropdownRefs.current[key];
      if (dropdown) {
        if (openDropdown === key) {
          dropdown.style.display = "block";
          gsap.fromTo(dropdown, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" });
        } else {
          gsap.to(dropdown, {
            opacity: 0,
            y: -8,
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
              if (dropdown && openDropdown !== key) dropdown.style.display = "none";
            },
          });
        }
      }
    });
  }, [openDropdown]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const navItems: NavItem[] = [
    {
      label: "Product",
      hasDropdown: true,
      dropdownItems: [
        { label: "Services", id: "services" },
        { label: "Technology Stack", id: "technology" },
        { label: "Why Falconfio", id: "why-us" },
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
          { label: "Blog", href: "/blog" },
          { label: "Support", href: "#" },
        ],
      },
    { label: "Enterprise", id: "pricing" },
    { label: "Pricing", id: "pricing" },
  ];


  const handleMouseEnter = (label: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
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
          : "bg-background/80 backdrop-blur-sm lg:bg-transparent"
      }`}
      style={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="focus:outline-none transition-transform duration-300 hover:scale-105 z-50 relative flex items-center gap-2"
            style={{ opacity: 1 }}
          >
            <Image
              src="/falconfiobiglogo.png"
              alt="Falconfio"
              width={140}
              height={50}
              className="h-10 w-auto sm:h-12 md:h-14"
              priority
            />
            <span className="text-lg sm:text-xl md:text-2xl gradient-text">
              <span className="font-bold">Falcon</span>
              <span className="font-normal">Fio</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => { if ("id" in item) scrollToSection(item.id); }}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-300 relative group"
                >
                  {item.label}
                  {item.hasDropdown && (
                    <svg
                      className={`w-4 h-4 inline-block ml-1 transition-transform duration-300 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#73E2A7] to-[#1C7C54] transition-all duration-300 group-hover:w-full" />
                </button>

                {item.hasDropdown && (
                  <div
                    ref={(el) => { dropdownRefs.current[item.label] = el; }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-card border border-foreground/10 shadow-xl backdrop-blur-xl pointer-events-auto"
                    style={{ display: "none", opacity: 0 }}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {item.dropdownItems?.map((dropdownItem, index) => {
                        if ("href" in dropdownItem) {
                          return (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              onClick={() => setOpenDropdown(null)}
                              className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 flex items-center group"
                            >
                              <span className="group-hover:translate-x-1 transition-transform duration-200">{dropdownItem.label}</span>
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              if ("id" in dropdownItem) scrollToSection(dropdownItem.id);
                              setOpenDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 flex items-center group"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">{dropdownItem.label}</span>
                          </button>
                        );
                      })}
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
            className="lg:hidden relative z-[70] text-foreground focus:outline-none p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ opacity: 1 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5 transition-all duration-300">
              <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 w-0" : "w-5"}`} />
              <span className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "w-6"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
        style={{ display: "none" }}
      />

      {/* Mobile Drawer — slides in from right */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-background z-[60] lg:hidden flex flex-col shadow-2xl"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/10 shrink-0">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <Image
              src="/falconfiobiglogo.png"
              alt="Falconfio"
              width={110}
              height={40}
              className="h-9 w-auto"
              priority
            />
            <span className="text-lg gradient-text">
              <span className="font-bold">Falcon</span>
              <span className="font-normal">Fio</span>
            </span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all duration-200"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-2">
          {/* Main Navigation Items - Notion Style */}
          <div className="px-2 space-y-1">
            {navItems.map((item) => {
              if (item.hasDropdown) {
                const isOpen = mobileOpenDropdown === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileOpenDropdown(isOpen ? null : item.label)}
                      className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-foreground hover:bg-foreground/5 transition-colors duration-150 rounded"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 text-foreground/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="pl-6 pb-2 space-y-1">
                        {item.dropdownItems.map((dropdownItem, i) => {
                          if ("href" in dropdownItem) {
                            return (
                              <Link
                                key={i}
                                href={dropdownItem.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-left px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors duration-150 rounded block"
                              >
                                {dropdownItem.label}
                              </Link>
                            );
                          }
                          return (
                            <button
                              key={i}
                              onClick={() => {
                                if ("id" in dropdownItem) scrollToSection(dropdownItem.id);
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors duration-150 rounded"
                            >
                              {dropdownItem.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-3 py-3 text-base font-medium text-foreground hover:bg-foreground/5 transition-colors duration-150 rounded"
                  >
                    {item.label}
                  </button>
                );
              }
            })}
          </div>

          {/* Additional Services Section */}
          <div className="mx-3 mt-6 mb-4">
            <div className="p-3 rounded-lg bg-foreground/5 border border-foreground/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-foreground/10 rounded flex items-center justify-center">
                    <span className="text-foreground text-xs font-bold">F</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">Falconfio Services</span>
                </div>
                <div className="space-y-1">
                  {[
                    { icon: "⚙️", label: "Product Engineering" },
                    { icon: "🤖", label: "AI Solutions" },
                    { icon: "☁️", label: "Cloud Services" },
                  ].map((service) => (
                    <button
                      key={service.label}
                      onClick={() => scrollToSection("services")}
                      className="w-full flex items-center gap-2.5 text-left hover:bg-foreground/5 rounded px-2 py-1.5 transition-colors duration-150"
                    >
                      <span className="text-base">{service.icon}</span>
                      <span className="text-sm font-medium text-foreground">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="shrink-0 px-4 py-4 border-t border-foreground/10 bg-background space-y-2.5">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => scrollToSection("cta")}
          >
            Request a Demo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => { window.location.href = "mailto:hello@falconfio.com"; setIsMobileMenuOpen(false); }}
          >
            Contact Us
          </Button>
          <div className="flex items-center justify-center pt-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

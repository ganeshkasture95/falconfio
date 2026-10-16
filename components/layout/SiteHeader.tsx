"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, ChevronDown, Mail, Menu, MessageSquare, X } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { nav, site } from "@/content/data/site";
import { catalogue } from "@/content/data/services";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (adjust state during render instead of in an effect).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(null);
  }

  // Mobile menu: lock page scroll, close on Escape, and close if the screen grows to desktop size.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setMenu(null), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Announcement bar */}
      <div className="relative overflow-hidden bg-navy text-white" data-guide="News bar: our latest launch. Click the link to see our ready-made AI agents.">
        <Container className="flex items-center justify-center gap-2 py-2.5 text-center text-xs font-medium sm:text-sm">
          <span className="hidden size-1.5 rounded-[2px] bg-periwinkle sm:inline-block" aria-hidden />
          <span>{site.announcement.text}</span>
          <Link href={site.announcement.href} className="inline-flex shrink-0 items-center gap-1 font-semibold underline underline-offset-4 hover:text-periwinkle">
            {site.announcement.cta}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </Container>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-shadow",
          scrolled ? "border-border shadow-nav" : "border-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-3 sm:gap-6">
          <Link href="/" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring" aria-label="Falconfio home" data-guide="The Falconfio logo. Click it to come back to the home page from anywhere.">
            <Logo />
          </Link>

          <nav className="hidden lg:block" aria-label="Main" data-guide="Main menu: our services, AI agents, past work, how we work, blog and company info.">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={item.children ? () => openMenu(item.label) : undefined}
                  onMouseLeave={item.children ? closeMenu : undefined}
                >
                  {item.children ? (
                    // The label goes to the overview page; hovering (or the chevron) opens the mega-menu.
                    <span className="relative inline-flex items-center">
                      <Link
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                        onKeyDown={(e) => e.key === "Escape" && setMenu(null)}
                        className={cn(
                          "relative inline-flex rounded-md py-2 pl-3 pr-1 text-[15px] font-medium transition-colors hover:text-primary",
                          isActive(item.href) ? "text-primary" : "text-foreground",
                        )}
                      >
                        {item.label}
                        {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" aria-hidden />}
                      </Link>
                      <button
                        type="button"
                        aria-label={`Show ${item.label.toLowerCase()} menu`}
                        aria-expanded={menu === item.label}
                        onClick={() => setMenu(menu === item.label ? null : item.label)}
                        onKeyDown={(e) => e.key === "Escape" && setMenu(null)}
                        className={cn(
                          "inline-flex size-7 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-primary",
                          isActive(item.href) ? "text-primary" : "text-foreground",
                        )}
                      >
                        <ChevronDown className={cn("size-4 transition-transform", menu === item.label && "rotate-180")} aria-hidden />
                      </button>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-flex rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-primary",
                        isActive(item.href) ? "text-primary" : "text-foreground",
                      )}
                    >
                      {item.label}
                      {isActive(item.href) && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" aria-hidden />}
                    </Link>
                  )}

                  {item.children && menu === item.label && (
                    <div className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3">
                      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-2 shadow-pop">
                        {item.children.map((c) => (
                          <Link key={c.href} href={c.href} className="group rounded-xl p-3.5 transition-colors hover:bg-accent">
                            <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{c.label}</span>
                            <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">{c.description}</span>
                          </Link>
                        ))}
                        <Link
                          href={item.href}
                          className="col-span-2 flex items-center justify-between rounded-xl bg-background-alt px-3.5 py-3 text-sm font-semibold text-primary hover:bg-accent"
                        >
                          See all {catalogue.length} services
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              data-guide="Send us a message about your project. We reply within one business day."
              className="hidden rounded-[10px] border border-primary px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-flex"
            >
              Contact us
            </Link>
            <BookButton />
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-[10px] border border-border transition-colors hover:border-primary lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile menu: a full-screen panel outside the header, because the header's backdrop blur would
          otherwise become the containing block for a fixed child and squash it to the header's height. */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}
          className="fixed inset-0 z-[80] flex animate-[hero-fade_0.2s_ease-out] flex-col bg-background lg:hidden"
        >
          <Container className="flex h-[72px] shrink-0 items-center justify-between border-b border-border">
            <Link href="/" aria-label="Falconfio home" onClick={() => setOpen(false)}>
              <Logo />
            </Link>
            <button
              type="button"
              autoFocus
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
          </Container>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto">
            <Container className="py-4">
              <ul>
                {nav.map((item, i) => (
                  <li
                    key={item.label}
                    className="animate-[hero-rise_0.3s_ease-out_both] border-b border-border"
                    style={{ animationDelay: `${i * 35}ms` }}
                  >
                    {item.children ? (
                      <>
                        <div className="flex items-center">
                          <Link
                            href={item.href}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className={cn("flex-1 py-4 text-lg font-semibold", isActive(item.href) && "text-primary")}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            aria-label={`Show ${item.label.toLowerCase()}`}
                            aria-expanded={servicesOpen}
                            aria-controls="mobile-services"
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="-mr-2 inline-flex size-11 items-center justify-center rounded-xl active:bg-accent"
                          >
                            <ChevronDown className={cn("size-5 transition-transform", servicesOpen && "rotate-180")} aria-hidden />
                          </button>
                        </div>
                        {servicesOpen && (
                          <ul id="mobile-services" className="mb-4 grid gap-1 rounded-2xl bg-background-tint p-2">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="block rounded-xl px-3 py-2.5 active:bg-accent">
                                  <span className="block text-[15px] font-semibold">{c.label}</span>
                                  <span className="block text-[13px] leading-snug text-muted-foreground">{c.description}</span>
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link href={item.href} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-semibold text-primary">
                                See all {catalogue.length} services <ArrowRight className="size-4" aria-hidden />
                              </Link>
                            </li>
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn("flex items-center justify-between py-4 text-lg font-semibold", isActive(item.href) && "text-primary")}
                      >
                        {item.label}
                        <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Mini footer */}
              <div className="mt-8 overflow-hidden rounded-3xl bg-navy p-6 text-white">
                <div className="flex items-center gap-3">
                  <LogoMark tone="onDark" className="h-9 w-auto" />
                  <div>
                    <p className="font-semibold">Falconfio</p>
                    <p className="text-xs text-white/70">Precision at speed.</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  Products that scale and AI agents that do real work, built by one senior team.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  <Mail className="size-4 text-periwinkle" aria-hidden /> {site.email}
                </a>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-xs text-white/70">
                  <Link href="/privacy" className="hover:text-white">Privacy</Link>
                  <Link href="/terms" className="hover:text-white">Terms</Link>
                  <span className="ml-auto">
                    A technical brand by <span className="font-semibold text-white">{site.parent}</span>
                  </span>
                </div>
                <p className="-mb-9 mt-4 select-none text-center text-[22vw] font-extrabold leading-none tracking-tighter text-white/[0.06]" aria-hidden>
                  Falconfio
                </p>
              </div>
            </Container>
          </nav>

          <div className="shrink-0 border-t border-border bg-background shadow-nav">
            <Container className="grid gap-2.5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Link
                href={site.bookingUrl}
                className="group flex items-center gap-3 rounded-2xl bg-cta p-3 pr-4 text-cta-foreground shadow-cta transition-colors active:bg-cta-hover"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <CalendarCheck className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Book a free discovery call</span>
                  <span className="block text-xs text-white/80">30 min with an engineer · free</span>
                </span>
                <ArrowRight className="size-5 shrink-0 transition-transform group-active:translate-x-0.5" aria-hidden />
              </Link>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold active:border-primary"
                >
                  <MessageSquare className="size-4 text-primary" aria-hidden /> Send a brief
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold active:border-primary"
                >
                  <Mail className="size-4 text-primary" aria-hidden /> Email us
                </a>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

/** The header's main call to action: a calendar icon, a live dot and an arrow that slides on hover. */
function BookButton() {
  return (
    <Link
      href={site.bookingUrl}
      data-guide="Book a free 30-minute call with an engineer. No sales script, just honest advice."
      className="group relative inline-flex items-center gap-2 rounded-[10px] bg-cta py-2.5 pl-3 pr-3.5 text-sm font-semibold text-cta-foreground shadow-cta transition-all hover:-translate-y-px hover:bg-cta-hover sm:pl-3.5"
    >
      <span className="relative inline-flex">
        <CalendarCheck className="size-4" aria-hidden />
        <span className="absolute -right-1 -top-1 flex size-2" aria-hidden>
          <span className="absolute inset-0 animate-ping rounded-full bg-success-bright opacity-75" />
          <span className="relative size-2 rounded-full border border-cta bg-success-bright" />
        </span>
      </span>
      <span className="whitespace-nowrap">
        Book<span className="hidden min-[360px]:inline"> a call</span>
      </span>
      <ArrowRight className="hidden size-4 transition-transform group-hover:translate-x-0.5 sm:block" aria-hidden />
    </Link>
  );
}

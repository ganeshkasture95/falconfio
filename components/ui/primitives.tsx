import Link from "next/link";
import {
  ArrowUpRight, BadgeCheck, Bot, Boxes, Building2, Circle, Cloud, Compass, Database, GraduationCap, HeartPulse,
  Landmark, Layers, LifeBuoy, PenTool, Plug, Rocket, ShieldCheck, ShoppingCart, Smartphone, Truck, Users, Wrench,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Pill label above section titles. `onDark` for navy/midnight bands. */
export function Eyebrow({ children, onDark, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]",
        onDark ? "border-white/25 bg-white text-navy" : "border-border bg-background text-primary",
        className,
      )}
    >
      <span className="size-1.5 rounded-[2px] bg-strike" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  onDark,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  onDark?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start", className)}>
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          onDark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("max-w-2xl text-base leading-relaxed sm:text-lg", onDark ? "text-white/80" : "text-muted-foreground")}>
          {intro}
        </p>
      )}
    </div>
  );
}

type Variant = "cta" | "outline" | "white" | "ghostOnDark";

const variants: Record<Variant, string> = {
  cta: "bg-cta text-cta-foreground hover:bg-cta-hover shadow-cta",
  outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  white: "bg-white text-navy hover:bg-white/90",
  ghostOnDark: "border border-white/40 text-white hover:bg-white/10",
};

export function ButtonLink({
  href,
  variant = "cta",
  arrow,
  guide,
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  /** text the page guide (Falco) shows when this is hovered */
  guide?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-guide={guide}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && <ArrowUpRight className="size-4" aria-hidden />}
    </Link>
  );
}

/** Render a lucide icon by name (names live in lib/site.ts). */
const iconMap: Record<string, LucideIcon> = {
  BadgeCheck, Bot, Boxes, Building2, Cloud, Compass, Database, GraduationCap, HeartPulse, Landmark, Layers, LifeBuoy,
  PenTool, Plug, Rocket, ShieldCheck, ShoppingCart, Smartphone, Truck, Users, Wrench,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = iconMap[name] ?? Circle;
  return <Cmp className={className} strokeWidth={1.75} aria-hidden />;
}

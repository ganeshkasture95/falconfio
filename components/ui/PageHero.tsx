import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/** The navy header used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  intro,
  guide,
  back,
  aside,
  children,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** text Falco shows when the header is hovered */
  guide: string;
  back?: { href: string; label: string };
  /** right-hand column on large screens */
  aside?: React.ReactNode;
  /** extra content under the intro (buttons, stats) */
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden bg-navy text-white", className)} data-guide={guide}>
      <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
      <Container className={cn("relative py-16 sm:py-20", back && "pt-10 sm:pt-10")}>
        {back && (
          <Link href={back.href} className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-white/75 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden /> {back.label}
          </Link>
        )}
        <div className={cn(aside && "grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]")}>
          <div>
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
            {children}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

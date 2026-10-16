import { cn } from "@/lib/utils";

/**
 * "Falco", the Falconfio AI agent: a peregrine falcon head (facing left, like the main logo) with a glowing
 * AI eye, circuit feathers, an AI spark and the brand's red slash. Static files: /public/brand/falco-agent.svg.
 * Pass `eyeRef` to move the iris (the guide bot uses it to look at the pointer).
 */
export function FalcoMark({
  className,
  eyeRef,
  badge = true,
  title,
}: {
  className?: string;
  eyeRef?: React.Ref<SVGGElement>;
  /** draw the round navy badge behind the head */
  badge?: boolean;
  title?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={cn("shrink-0", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {badge && (
        <>
          <circle cx="32" cy="32" r="30" fill="var(--brand-navy-700)" />
          <circle cx="32" cy="32" r="30" fill="none" stroke="var(--brand-royal-600)" strokeWidth="2" />
        </>
      )}
      {/* head and hooked beak */}
      <path
        fill="white"
        d="M50 54 C53 44 53 30 46 22 C40 15 30 13 22 17 C17 19.5 14 23 13 27 C10.6 27.2 8.6 28.8 8 31.6 C7.6 33.6 8.2 35.6 9.4 35.2 C10 34 11.2 33.5 12.8 33.7 C14.2 33.9 15.1 34.7 16 36 C19 42 25 49 33 54 C40 57 47 57 50 54 Z"
      />
      {/* cap and malar stripe */}
      <path
        fill="var(--brand-royal-600)"
        d="M13 27 C14 22 18 18 24 16 C32 13 42 16 47 23 C50 28 51 34 50 40 C46 37 42 35 37 35 C36 31 34 28 31 27 C28 26.5 25 28 24 31 C23.5 36 25 41 28 45 C24 44 21 40 20 35 C19.5 31 18 29 16 28.5 C15 28 14 28 13 27 Z"
      />
      {/* beak line and cere */}
      <path d="M9.6 34.7 C11 33.7 13 33.5 15.5 34.4" stroke="var(--brand-navy-700)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path fill="var(--brand-periwinkle-300)" d="M13 27 C14.2 28 15.4 28.4 16.4 28.6 C15.6 30 14.2 30.6 12.6 30.2 C12.4 29 12.5 28 13 27 Z" />
      {/* AI eye */}
      <circle cx="24.5" cy="23.5" r="4.6" fill="white" />
      <circle cx="24.5" cy="23.5" r="3.2" fill="var(--brand-navy-700)" />
      <g ref={eyeRef} style={{ transition: "transform 90ms linear" }}>
        <circle cx="24" cy="23.4" r="1.9" fill="var(--brand-periwinkle-300)" />
        <circle cx="23.3" cy="22.6" r="0.75" fill="white" />
      </g>
      {/* circuit feathers */}
      <path d="M38 22 H43 M40 28 H46" stroke="var(--brand-periwinkle-300)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="44" cy="22" r="1.2" fill="var(--brand-periwinkle-300)" />
      <circle cx="47" cy="28" r="1.2" fill="var(--brand-periwinkle-300)" />
      {/* red slash from the brand logo */}
      <path fill="var(--brand-red-600)" d="M31 53.2 C36 49.5 41 47 47.5 46 C44.5 50.5 40 53.5 34.5 55.2 C33.2 54.8 32 54.1 31 53.2 Z" />
      {/* AI spark */}
      <path fill="var(--brand-periwinkle-300)" d="M50 10 L51.3 13.7 L55 15 L51.3 16.3 L50 20 L48.7 16.3 L45 15 L48.7 13.7 Z" />
    </svg>
  );
}

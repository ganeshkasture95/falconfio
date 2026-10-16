import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CaseStudy } from "@/lib/content/case-studies";

/** Splits "85% reduction in human intervention" into a big figure and its caption. */
export function splitResult(result?: string) {
  if (!result) return { figure: "", caption: "" };
  const m = result.match(/^([^\s]*\d[^\s]*)\s+(.*)$/);
  return m ? { figure: m[1], caption: m[2] } : { figure: "", caption: result };
}

export default function CaseStudyCard({ study, wide = false }: { study: CaseStudy; wide?: boolean }) {
  const fm = study.meta;
  const { figure, caption } = splitResult(fm.results[0]);
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      data-guide={`Case study: ${fm.title}. The big number is the headline result. Click to read how we did it.`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-border bg-background-alt transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lift",
        wide && "md:col-span-2 md:flex-row",
      )}
    >
      <div className={cn("relative flex aspect-[16/9] flex-col justify-end bg-navy p-7 text-white", wide && "md:aspect-auto md:min-h-80 md:w-[58%]")}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <span className="absolute right-5 top-5 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur">
          {fm.industry}
        </span>
        {fm.status === "draft" && (
          <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy">
            Draft · not verified
          </span>
        )}
        {figure && <span className="relative text-6xl font-bold tracking-tight sm:text-7xl">{figure}</span>}
        <span className="relative mt-2 max-w-sm text-sm text-white/80">{caption}</span>
        <span className="absolute bottom-0 left-7 h-1 w-16 rounded-t-full bg-periwinkle" aria-hidden />
      </div>
      <div className={cn("flex flex-1 flex-col p-7", wide && "md:justify-center md:p-10")}>
        <p className="flex items-center gap-3 text-sm font-semibold">
          {fm.client}
          <span className="h-4 w-px bg-border" aria-hidden />
          <span className="font-normal text-muted-foreground">{fm.industry}</span>
        </p>
        <h3 className="mt-3 flex items-start justify-between gap-4 text-xl font-semibold leading-snug sm:text-2xl">
          {fm.title}
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{fm.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {fm.technologies.slice(0, 3).map((t) => (
            <li key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

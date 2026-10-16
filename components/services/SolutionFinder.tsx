"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";

export type FinderItem = { title: string; body: string; service: string; href: string };

const suggestions = ["AI agents", "Mobile app", "Cloud migration", "Dashboards", "SOC 2", "Payments"];

/** Search across every solution in the catalogue. Results link to the solution on its service page. */
export default function SolutionFinder({ items }: { items: FinderItem[] }) {
  const [q, setQ] = useState("");
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? items.filter((i) => {
        const hay = `${i.title} ${i.body} ${i.service}`.toLowerCase();
        return terms.every((t) => hay.includes(t.replace(/s$/, "")));
      })
    : [];

  return (
    <div data-guide="Search every solution we offer. Type what you need, like 'mobile app' or 'AI chatbot'.">
      <label htmlFor="solution-search" className="text-sm font-semibold text-white">
        What do you need help with?
      </label>
      <div className="relative mt-3">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          id="solution-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${items.length} solutions…`}
          autoComplete="off"
          className="h-14 w-full rounded-2xl border-2 border-transparent bg-white pl-12 pr-12 text-base text-navy placeholder:text-muted-foreground focus:border-periwinkle focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-navy hover:bg-accent"
            aria-label="Clear search"
          >
            <X className="size-4" aria-hidden />
          </button>
        )}
      </div>

      {!q && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-white/70">Try:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className="rounded-full border border-white/25 px-3 py-1 text-white/90 transition-colors hover:border-white hover:bg-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {q && (
        <div className="mt-4 rounded-2xl bg-white p-2 text-navy shadow-pop">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground" aria-live="polite">
            {results.length === 0 ? "No exact match" : `${results.length} matching solution${results.length === 1 ? "" : "s"}`}
          </p>
          {results.length === 0 ? (
            <p className="px-3 pb-3 text-sm text-muted-foreground">
              We probably still do it.{" "}
              <Link href="/contact" className="font-semibold text-primary underline underline-offset-2">
                Tell us what you need
              </Link>{" "}
              and we&apos;ll reply within one business day.
            </p>
          ) : (
            <ul className="grid max-h-96 gap-1 overflow-y-auto sm:grid-cols-2">
              {results.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="group flex items-start justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-accent">
                    <span>
                      <span className="block text-sm font-semibold group-hover:text-primary">{r.title}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{r.service}</span>
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

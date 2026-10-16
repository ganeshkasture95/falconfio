import { Container, SectionHeader } from "@/components/ui/primitives";
import { LogoMark } from "@/components/brand/Logo";
import { reasons } from "@/content/data/site";

export default function WhyFalconfio() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-navy text-white" data-guide="The eight principles behind how we work, and why teams choose us over a typical agency.">
      <Container className="relative py-20 sm:py-24">
        <SectionHeader onDark eyebrow="The Falconfio difference" title="Why teams choose Falconfio" />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.06] p-7 transition-colors hover:border-white/25 hover:bg-white/[0.1]"
            >
              <span className="font-mono text-2xl font-semibold text-periwinkle">
                /{String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-lg font-semibold leading-snug">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{r.body}</p>
              <span className="mt-6 block h-0.5 w-8 rounded-full bg-periwinkle transition-all group-hover:w-14" aria-hidden />
            </li>
          ))}
        </ol>
      </Container>

      <div className="border-t border-white/10">
        <Container className="relative flex flex-col items-center py-16 text-center">
          <blockquote className="max-w-4xl text-lg leading-relaxed text-white/90 sm:text-xl">
            &ldquo;Fast is easy. Fast <em className="not-italic text-periwinkle">and</em> solid is the job. We build every product as if it
            will be ten times bigger next year, and every agent as if your customers will see its output. Because they will.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-white p-1.5">
              <LogoMark className="h-full w-auto" />
            </span>
            <span className="text-left">
              <span className="block font-semibold">The Falconfio team</span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">Engineering principles</span>
            </span>
          </div>
        </Container>
      </div>
    </section>
  );
}

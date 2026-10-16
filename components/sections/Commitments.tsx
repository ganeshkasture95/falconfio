import { ButtonLink, Container } from "@/components/ui/primitives";
import { commitments, site } from "@/content/data/site";
import { cn } from "@/lib/utils";

export default function Commitments() {
  return (
    <section className="relative overflow-hidden bg-navy text-white" data-guide="Promises we put in writing on every project: speed, transparency and ownership.">
      <div className="bg-dots absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative py-20 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
            At Falconfio there is no &ldquo;it should work.&rdquo;
            <br />
            Either it scales, or it doesn&apos;t ship.
          </h2>
          <div className="lg:pb-2">
            <p className="text-base leading-relaxed text-white/85">
              These are the promises we put in writing on every engagement. Ready to see what that looks like for your product?
            </p>
            <ButtonLink href={site.bookingUrl} variant="white" className="mt-5" arrow>
              Talk to an engineer
            </ButtonLink>
          </div>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {commitments.map((c, i) => (
            <li
              key={c.label}
              className={cn(
                "rounded-2xl border border-white/20 bg-white/[0.08] p-6",
                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
              )}
            >
              <span className="font-mono text-sm text-white/70">/{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-6 text-4xl font-bold tracking-tight">{c.value}</p>
              <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">{c.label}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

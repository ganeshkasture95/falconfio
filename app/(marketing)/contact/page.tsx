import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, ShieldCheck } from "lucide-react";
import ContactWizard from "@/components/forms/ContactWizard";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { site } from "@/content/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project or book a free 30-minute discovery call with a Falconfio engineer. We reply within one business day.",
};

const next = [
  ["We read it", "An engineer, not a salesperson, reads your note the same day."],
  ["We reply", "Within one business day, with questions or a time for a call."],
  ["Free discovery call", "30 minutes on your goals, risks and the fastest way forward."],
  ["Written plan", "A short plan with milestones and a price range you can share."],
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-background-tint" data-guide="Contact us: tell us about your project in a few quick steps, or email us directly.">
      <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-14">
        <div className="relative isolate pb-4 text-white lg:col-start-1 lg:pt-4 lg:pb-10">
          {/* navy band sized by this block, so it always covers the heading however it wraps */}
          <span className="absolute -inset-x-[100vw] -top-16 -bottom-14 -z-10 bg-navy sm:-top-20" aria-hidden>
            <span className="bg-dots absolute inset-0 opacity-60" />
          </span>
          <Eyebrow onDark>Contact</Eyebrow>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">Let&apos;s talk about your project</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/80">
            A few quick questions so we come to the first call prepared. Prefer email? That works too.
          </p>
          <ul className="mt-8 grid gap-3 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="size-4 text-periwinkle" aria-hidden />
              <a href={`mailto:${site.email}`} className="font-semibold underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-4 text-periwinkle" aria-hidden /> Reply within one business day
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-periwinkle" aria-hidden /> Happy to sign an NDA before we talk
            </li>
          </ul>
        </div>

        <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-4">
          <Suspense fallback={<div className="h-[520px] animate-pulse rounded-3xl border border-border bg-card" aria-hidden />}>
            <ContactWizard />
          </Suspense>
        </div>

        <div className="lg:col-start-1 lg:self-end">
          <div className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-semibold">What happens next</h2>
            <ol className="mt-5 grid gap-4">
              {next.map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-xs font-bold text-white">{i + 1}</span>
                  <p className="text-sm">
                    <span className="font-semibold">{t}.</span> <span className="text-muted-foreground">{b}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </Container>
    </section>
  );
}

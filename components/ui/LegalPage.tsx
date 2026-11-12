import Link from "next/link";
import { Container } from "@/components/ui/primitives";

/** Shared layout for /privacy and /terms. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white" data-guide={`${title}: the rules for using this website.`}>
        <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
        <Container className="relative max-w-3xl py-16 sm:py-20">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-periwinkle">Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 text-white/75">Last updated {updated}</p>
        </Container>
      </section>
      <section className="bg-background py-16 sm:py-20">
        <Container className="max-w-3xl">
          <article className="prose-falcon">{children}</article>
          <nav aria-label="Legal" className="mt-14 flex gap-6 border-t border-border pt-6 text-sm">
            <Link href="/privacy" className="font-semibold text-primary hover:underline">
              Privacy policy
            </Link>
            <Link href="/terms" className="font-semibold text-primary hover:underline">
              Terms of use
            </Link>
          </nav>
        </Container>
      </section>
    </>
  );
}

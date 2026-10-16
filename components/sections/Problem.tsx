import { Activity, DollarSign, Hourglass } from "lucide-react";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";

const symptoms = [
  { icon: Activity, title: "It slows down as you grow", body: "Pages that loaded in 200 ms now take two seconds, and every launch day is a gamble." },
  { icon: DollarSign, title: "The cloud bill outgrows revenue", body: "Costs rise faster than users because nothing was designed to scale efficiently." },
  { icon: Hourglass, title: "Every feature takes longer", body: "The team spends more time working around the system than building on it." },
];

export default function Problem() {
  return (
    <section className="bg-background py-20 sm:py-24" data-guide="Why products slow down and get expensive as they grow, and the warning signs to look for.">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow>The real problem</Eyebrow>
          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
            Products rarely fail because of bad code.{" "}
            <span className="text-primary">They fail because of architecture.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Shortcuts that are fine for a demo become expensive at a thousand customers and painful at a hundred thousand. We
            find them early, and fix them before your users do.
          </p>
          <ButtonLink href="/tools/scorecard" variant="outline" arrow className="mt-8">
            Take the free architecture scorecard
          </ButtonLink>
        </div>
        <ul className="grid gap-4">
          {symptoms.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-5 rounded-2xl border border-border bg-background-alt p-6">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-sm">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden />
              </span>
              <span>
                <span className="block text-lg font-semibold">{title}</span>
                <span className="mt-1 block text-[15px] leading-relaxed text-muted-foreground">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

import { Plus } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/primitives";
import { faqs } from "@/content/data/site";

/** Native <details> accordion: works without JS, keyboard accessible. */
export default function Faq() {
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <section id="faq" className="bg-background py-20 sm:py-24" data-guide="Common questions. Click one to open the answer.">
      <Container>
        <SectionHeader eyebrow="FAQs" title="Frequently asked questions" intro="Got a question? Here are the ones we hear most." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {columns.map((col, c) => (
            <div key={c} className="grid content-start gap-4">
              {col.map((f, i) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-card transition-colors open:border-primary">
                  <summary className="flex cursor-pointer list-none items-start gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-sm font-semibold text-primary">{String(c * half + i + 1).padStart(2, "0")}.</span>
                    <span className="flex-1 font-semibold">{f.q}</span>
                    <Plus className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45 group-open:text-primary" aria-hidden />
                  </summary>
                  <p className="-mt-1 px-5 pb-5 pl-14 text-[15px] leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

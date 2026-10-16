import { TechLogo } from "@/components/brand/TechLogo";
import { Container } from "@/components/ui/primitives";
import { stackStrip } from "@/content/data/site";

export default function StackStrip() {
  return (
    <section className="border-y border-border bg-background" aria-label="Technologies we build with" data-guide="Some of the technologies we build with every day. Hover to pause the scroll.">
      <Container className="flex items-stretch px-0 sm:px-0 lg:px-0">
        <p className="hidden w-60 shrink-0 items-center border-r border-border px-8 text-sm leading-snug text-muted-foreground md:flex">
          Built on the stack teams already trust
        </p>
        <div className="relative flex-1 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max animate-marquee gap-12 pr-12 hover:[animation-play-state:paused]">
            {[...stackStrip, ...stackStrip].map((name, i) => (
              <li
                key={i}
                aria-hidden={i >= stackStrip.length}
                className="group inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight whitespace-nowrap text-foreground/45 transition-colors hover:text-foreground"
              >
                <TechLogo name={name} mono className="size-6" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

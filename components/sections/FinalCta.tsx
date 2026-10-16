import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { site } from "@/content/data/site";

export default function FinalCta() {
  return (
    <section className="bg-background pb-20 sm:pb-24" data-guide="Ready to start? Book a call or send a short brief, and we reply within one business day.">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-navy px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <div className="bg-dots absolute inset-0 opacity-60" aria-hidden />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <Eyebrow onDark>Let&apos;s talk</Eyebrow>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Let&apos;s build it together</h2>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              Tell us where you are and where you need to be. In 30 minutes you will get an honest view of the fastest, safest
              way to get there, even if that isn&apos;t us.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={site.bookingUrl} variant="white">Book a free discovery call</ButtonLink>
              <ButtonLink href="/contact" variant="ghostOnDark">
                Send us a brief
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

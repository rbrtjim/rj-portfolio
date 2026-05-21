import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { TechCarousel } from "@/components/ui/TechCarousel";

export function TechStack() {
  return (
    <section
      id="tech"
      aria-label="Technology stack"
      className="relative isolate overflow-hidden py-20 sm:py-24"
    >
      <SectionBackground variant="subtle" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-accent">
              Tech I Use
            </p>
            <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
              A full toolkit, end to end.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <TechCarousel />
        </Reveal>
      </div>
    </section>
  );
}

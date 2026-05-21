import { SKILL_GROUPS } from "@/lib/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { DoodleLayer } from "@/components/ui/DoodleLayer";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-surface/40 py-24 sm:py-32"
    >
      <SectionBackground variant="subtle" />
      <DoodleLayer variant="skills" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Skills
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Tools I reach for.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.category} delay={0.1 + gi * 0.08}>
              <div className="rounded-2xl border border-border bg-bg/60 p-6 backdrop-blur transition hover:border-accent/30 hover:shadow-lg">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-surface/80 px-3 py-1.5 text-sm font-medium text-text transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-bg hover:shadow-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

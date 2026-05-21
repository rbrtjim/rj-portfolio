import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <SectionBackground variant="default" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Selected Work
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Projects I've shipped.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            A small selection of work spanning enterprise systems, AI-assisted
            tools, and full-stack web applications.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.slug} delay={0.1 + i * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

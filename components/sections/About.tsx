import Image from "next/image";
import { Download, Sparkles, Code2, Users, Target } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";

const VALUES = [
  {
    icon: Code2,
    title: "Clean & Scalable Code",
    description:
      "I write maintainable code that other engineers (and future-me) can extend without fear.",
  },
  {
    icon: Sparkles,
    title: "AI-Augmented",
    description:
      "I leverage LLM tooling to ship faster — without sacrificing correctness, security, or polish.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description:
      "I write for the team: clear PRs, helpful reviews, and pragmatic conversations over dogma.",
  },
  {
    icon: Target,
    title: "Outcome-Focused",
    description:
      "Code is a means to an end. I optimize for the business outcome, not lines of code.",
  },
] as const;

export function About() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-surface/40 py-24 sm:py-32"
    >
      <SectionBackground variant="subtle" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            About
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Full-stack web developer focused on shipping.
          </h2>
        </Reveal>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[280px_1fr]">
          <Reveal delay={0.1} className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent/30 to-transparent blur-2xl" />
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-border bg-surface shadow-xl">
                <Image
                  src="/profile-placeholder.png"
                  alt="Robert Jim M. Placencia"
                  fill
                  sizes="256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-muted">
                Full-stack web developer specializing in{" "}
                <span className="font-medium text-text">React</span>,{" "}
                <span className="font-medium text-text">ASP.NET Core</span>, and{" "}
                <span className="font-medium text-text">PostgreSQL</span>.
                Passionate about building clean, scalable, and AI-powered web
                applications.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <a
                href="/RobertJimPlacencia_Resume.pdf"
                download
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Reveal>
          </div>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-xl font-semibold">How I Work</h3>
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={0.1 + i * 0.08} as="li">
                  <div className="group h-full rounded-2xl border border-border bg-bg/60 p-6 backdrop-blur transition hover:border-accent/40 hover:shadow-lg">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-semibold">{value.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

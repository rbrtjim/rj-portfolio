import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PROJECTS, getProject } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Robert Jim M. Placencia`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="relative">
      <div className="relative isolate overflow-hidden pt-24">
        <SectionBackground variant="strong" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <Reveal>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Visit Live Site
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </Reveal>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl">
            <Image
              src={project.banner}
              alt={`${project.title} banner`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="space-y-16">
          <Block label="Problem" body={project.problem} />
          <Block label="Process" body={project.process} />
          <Block label="Result" body={project.result} />
        </div>

        <div className="mt-20">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Gallery</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((item, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">Like what you see?</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </article>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <Reveal>
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {label}
        </p>
        <p className="mt-3 text-lg leading-relaxed text-text">{body}</p>
      </section>
    </Reveal>
  );
}

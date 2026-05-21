import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground } from "@/components/ui/SectionBackground";

const EMAIL = "robertjimplacencia2@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/robert-jim-placencia-283571212";
const GITHUB = "https://github.com/rbrtjim";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <SectionBackground variant="default" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Let's build something together.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Have a project in mind, an opportunity to share, or just want to
            connect? Drop me a line — I'll get back to you within a couple of
            days.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <ContactLink
                href={`mailto:${EMAIL}`}
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={EMAIL}
              />
              <ContactLink
                href={LINKEDIN}
                icon={<Linkedin className="h-5 w-5" />}
                label="LinkedIn"
                value="robert-jim-placencia"
                external
              />
              <ContactLink
                href={GITHUB}
                icon={<Github className="h-5 w-5" />}
                label="GitHub"
                value="rbrtjim"
                external
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-border bg-bg/60 p-6 backdrop-blur sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  external?: boolean;
}

function ContactLink({ href, icon, label, value, external }: ContactLinkProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-bg/60 p-5 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="block truncate font-medium text-text">{value}</span>
      </span>
    </Link>
  );
}

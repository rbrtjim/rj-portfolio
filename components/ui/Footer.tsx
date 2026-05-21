import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Robert Jim M. Placencia.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/rbrtjim"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition hover:text-text"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/robert-jim-placencia-283571212"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition hover:text-text"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:robertjimplacencia2@gmail.com"
            aria-label="Email"
            className="text-muted transition hover:text-text"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

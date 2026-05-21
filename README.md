# Robert Jim M. Placencia — Portfolio

A clean, modern, single-page portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a light/dark theme toggle, Apple-style scroll animations, and a working contact form powered by Resend.

## Stack

- **Next.js 15** (App Router, Server Actions)
- **TypeScript** (strict)
- **Tailwind CSS** v3
- **Framer Motion** — scroll reveals, hero animation, page transitions
- **next-themes** — light/dark toggle with localStorage persistence
- **Resend** — transactional email for the contact form
- **lucide-react** — icons
- **zod** — server-side form validation
- **Roboto** via `next/font/google`

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.local.example` to `.env.local` and fill in your Resend API key:

```bash
cp .env.local.example .env.local
```

Get a free Resend API key at [resend.com](https://resend.com) (100 emails/day free).

Without `RESEND_API_KEY`, the contact form will show a graceful "email not configured" message instead of crashing.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
rj-portfolio/
├── app/
│   ├── layout.tsx                # Root layout, fonts, theme provider
│   ├── page.tsx                  # Single-page home (all sections)
│   ├── globals.css               # Tailwind + CSS theme tokens
│   ├── not-found.tsx
│   └── projects/[slug]/page.tsx  # Project detail
├── components/
│   ├── sections/                 # Hero, About, Projects, Skills, Contact
│   └── ui/                       # Navbar, Footer, ThemeToggle, ProjectCard, etc.
├── actions/
│   └── contact.ts                # Resend server action
├── lib/
│   ├── projects.ts               # Project data (edit here to add projects)
│   └── skills.ts                 # Skill groups
├── public/
│   ├── profile-placeholder.png
│   ├── projects/                 # Cover + banner SVG placeholders
│   └── resume.pdf                # ⚠️ Replace with your real PDF
└── docs/superpowers/specs/       # Design spec
```

## Customizing

### Replace placeholders

1. **Profile photo** — replace `public/profile-placeholder.png` with your photo (PNG/JPG also fine — update the import path in `components/sections/About.tsx`).
2. **Resume PDF** — drop your resume into `public/resume.pdf`.
3. **Project images** — replace SVGs in `public/projects/` with real screenshots (`project-1-cover.svg`, `project-1-banner.svg`, etc.).
4. **Project content** — edit `lib/projects.ts` to update titles, descriptions, problem/process/result copy, and tool tags.
5. **Skills** — edit `lib/skills.ts` to adjust skill groupings.

### Change colors

Theme tokens live in `app/globals.css` (`:root` for light, `.dark` for dark). Tailwind utility classes map to those tokens (`bg-bg`, `text-text`, `border-border`, etc.) — no need to touch component files when rebranding.

### Add a project

1. Add an entry to `PROJECTS` in `lib/projects.ts`.
2. Drop `<slug>-cover.svg` and `<slug>-banner.svg` (or `.png`) into `public/projects/`.
3. The project card and detail page will auto-generate.

## Features

- ✅ Light / dark mode with persistence and no SSR flash
- ✅ Smooth scroll between sections via navbar
- ✅ Apple-style drifting gradient backgrounds, scroll-reveal animations
- ✅ Mobile-responsive hamburger nav
- ✅ Per-project detail pages with Problem / Process / Result + gallery
- ✅ Working contact form (Resend) with validation, loading state, and toasts
- ✅ Keyboard accessible, `prefers-reduced-motion` respected
- ✅ SEO metadata, Open Graph tags

## Deploy

Easiest: deploy to [Vercel](https://vercel.com). Push to GitHub, import the repo, add `RESEND_API_KEY` as an environment variable. Done.

## License

Personal portfolio — all rights reserved.

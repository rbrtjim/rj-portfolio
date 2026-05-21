# Robert Jim M. Placencia — Portfolio Website Design

**Date:** 2026-05-21
**Owner:** Robert Jim M. Placencia

## Goal

A one-page personal portfolio site with project detail pages, polished Apple-inspired animations, light/dark mode, and a working contact form. Showcases experience as a software engineer specializing in C# .NET, full-stack web, and AI-assisted development.

## Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Theme:** `next-themes` (light/dark toggle, persisted)
- **Email:** Resend (via Next.js server action)
- **Icons:** lucide-react
- **Font:** Roboto via `next/font/google` (weights 300/400/500/700)

## Color System

Defined as CSS variables in `globals.css`, exposed via Tailwind's `@theme`.

| Token | Light | Dark |
|---|---|---|
| `bg` | `#FFFFFF` | `#0A2540` |
| `surface` | `#F4F6F8` | `#0F2E4E` |
| `text` | `#0A2540` | `#F4F6F8` |
| `muted` | `#5B6B7C` | `#9FB1C3` |
| `accent` | `#1E4FA8` | `#4F8EF7` |
| `border` | `#E2E8EF` | `#1B3A60` |

## File Structure

```
rj-portfolio/
├── app/
│   ├── layout.tsx                    # Root, fonts, theme provider
│   ├── page.tsx                      # Single-page home
│   ├── globals.css                   # Tailwind + theme tokens
│   ├── projects/[slug]/page.tsx      # Project detail
│   └── api/contact/route.ts          # OR server action in actions/contact.ts
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── ThemeToggle.tsx
│       ├── SectionBackground.tsx
│       ├── ProjectCard.tsx
│       ├── SkillBadge.tsx
│       ├── ContactForm.tsx
│       └── Reveal.tsx                # whileInView wrapper
├── lib/
│   ├── projects.ts                   # Typed project data
│   └── skills.ts                     # Skill groups
├── actions/
│   └── contact.ts                    # Server action (Resend)
├── public/
│   ├── profile-placeholder.png
│   ├── resume.pdf                    # User uploads later
│   └── projects/                     # Cover/banner/gallery placeholders
├── .env.local.example
└── README.md
```

## Page Sections

### 1. Hero
- Full viewport height
- Animated gradient mesh background (drifting radial blobs)
- Name: "Robert Jim M. Placencia" — large, letter-stagger entrance
- Headline: "Engineering enterprise software with a 2026 AI edge."
- Intro paragraph (provided by user)
- CTA: "View My Work" → scrolls to #projects
- Secondary: scroll indicator (animated chevron)

### 2. About
- Two-column on desktop, stacked on mobile
- Left: round profile image placeholder (256px)
- Right: bio, "Values / Working Style" list (3-4 cards), Resume download button (`<a href="/resume.pdf" download>`)

### 3. Projects
- Grid: 2 cols on md, 1 col on mobile
- 4 cards: cover image, title, 2-sentence description, tool tags (pill badges), "View Project" button
- Hover: card lifts + cover image scales subtly
- Each card links to `/projects/[slug]`

### 4. Skills
- Grouped badges:
  - **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Vite, HTML5, CSS3
  - **Backend:** C# / .NET, ASP.NET Core, Node.js, REST APIs
  - **Database:** PostgreSQL, SQL Server, Entity Framework
  - **Low-Code & AI:** Power Platform, Power Apps, AI-Assisted Development, Claude/LLM Integration
  - **Tools & DevOps:** Git, GitHub, Azure DevOps, Docker, Visual Studio
- Badges: rounded, border, hover lift, staggered scroll-in

### 5. Contact
- Intro line
- Email link, LinkedIn, GitHub (icon buttons)
- Form: Name, Email, Message (validated client + server)
- Server action calls Resend; toast feedback (success / error)

## Animations (Apple-style, tasteful)

- **Navbar:** sticky, blur backdrop, scroll-spy highlights active link via IntersectionObserver
- **Section backgrounds:** each section has a drifting gradient mesh (slow CSS keyframes) + opacity tied to scroll progress so backgrounds cross-fade between sections
- **Scroll reveals:** `Reveal` component wraps elements with Framer Motion `whileInView` — fade + 20px slide up, staggered children
- **Hero:** name characters animate in with stagger
- **Smooth scroll:** `html { scroll-behavior: smooth }` + scroll-margin on sections for navbar offset
- **Theme transition:** subtle 200ms color transitions on theme switch

## Project Detail Page

`/projects/[slug]`:
- Banner image (16:9, full-width)
- Title + tool tags
- Three sections: **Problem**, **Process**, **Result** — generous typography, max-w-prose
- Image gallery (3 placeholders, grid)
- "← Back to projects" link
- 404 if slug not found (`notFound()`)

## Email Flow (Resend)

1. User submits form
2. Client validates with simple checks (required, email regex)
3. Server action receives FormData, validates again with Zod
4. Calls `resend.emails.send()` with `to: robertjimplacencia2@gmail.com`, `from: 'Portfolio <onboarding@resend.dev>'` (until user verifies a domain)
5. Returns `{ ok: true }` or `{ ok: false, error }`
6. Client shows toast

`.env.local.example`:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=robertjimplacencia2@gmail.com
```

If `RESEND_API_KEY` is missing, the server action returns a friendly "email not configured" error rather than crashing.

## Responsive Strategy

- Mobile-first
- Breakpoints: `sm 640`, `md 768`, `lg 1024`
- Navbar collapses to hamburger sheet under `md`
- Hero name uses `clamp()` for fluid sizing
- Projects grid: 1 col → 2 col at `md`
- Skill badges wrap

## Accessibility

- Semantic HTML (`<nav>`, `<section>`, `<main>`)
- Skip-to-content link
- All interactive elements keyboard-focusable, visible focus rings
- Color contrast verified for both themes
- `prefers-reduced-motion` respected — Framer Motion reduces / disables animations

## Out of Scope

- No CMS (project data in `lib/projects.ts`)
- No blog
- No analytics
- No internationalization
- No backend persistence (form messages just emailed, not stored)

## Success Criteria

- All 5 sections render correctly on mobile, tablet, desktop
- Light/dark toggle works, persists, no flash
- Smooth scroll between sections via navbar
- Project cards link to working detail pages
- Contact form sends email (when API key set) or shows graceful error
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95
- No console errors / TypeScript errors

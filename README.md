# AI Prompt Optimization Toolkit

A full-stack web application for crafting, testing, optimizing, and managing AI prompts. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, PostgreSQL, and Prisma. Includes JWT-based authentication, user accounts, prompt libraries, and a UI for iterating on prompt quality.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Local IDE Setup](#local-ide-setup)
- [Environment Variables](#environment-variables)
- [Database Setup (PostgreSQL + Prisma)](#database-setup-postgresql--prisma)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [Recommended VS Code Setup](#recommended-vs-code-setup)
- [Troubleshooting](#troubleshooting)
- [Deployment](#deployment)
- [License](#license)

---

## Tech Stack

| Layer        | Technology                                       |
| ------------ | ------------------------------------------------ |
| Framework    | Next.js 14 (App Router)                          |
| Language     | TypeScript, React 18                             |
| Styling      | Tailwind CSS 3, PostCSS                          |
| Database     | PostgreSQL                                       |
| ORM          | Prisma 6                                         |
| Auth         | JWT via `jose`, password hashing via `bcryptjs`  |
| UI           | `lucide-react` icons, `react-hot-toast` toasts   |
| Runtime      | Node.js 18+                                      |

---

## Features

- Prompt builder with versioning and tagging
- Side-by-side prompt comparison and scoring
- Reusable prompt templates and variable interpolation
- User accounts (sign up / sign in / sign out)
- JWT session cookies signed with `jose`
- Password hashing with `bcryptjs`
- Server actions for form submissions
- Protected routes via middleware
- Toast notifications for user feedback
- Fully typed end-to-end with TypeScript
- Responsive UI with Tailwind

---

## Prerequisites

Install these on your machine before you begin:

- **Node.js 18.17+** (20 LTS recommended) — [nodejs.org](https://nodejs.org)
- **npm 9+** (ships with Node) or **pnpm** / **yarn**
- **PostgreSQL 14+** — [postgresql.org/download](https://www.postgresql.org/download/)
  - macOS: `brew install postgresql@16 && brew services start postgresql@16`
  - Windows: use the official installer or [Postgres.app](https://postgresapp.com/)
  - Linux: `sudo apt install postgresql postgresql-contrib`
  - Or use Docker: `docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16`
- **Git** — [git-scm.com](https://git-scm.com/)
- **VS Code** (recommended) — [code.visualstudio.com](https://code.visualstudio.com/)

---

## Local IDE Setup

### 1. Clone the repository

```bash
git clone https://github.com/rbrtjim/rj-portfolio.git
cd rj-portfolio
```

### 2. Install dependencies

```bash
npm install
```

This installs Next.js, React, Tailwind, Prisma, `jose`, `bcryptjs`, `lucide-react`, `react-hot-toast`, and all dev tooling.

### 3. Open in VS Code

```bash
code .
```

When prompted, install the recommended extensions (see [Recommended VS Code Setup](#recommended-vs-code-setup)).

---

## Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Required variables in `.env.local`:

```env
# PostgreSQL connection string used by Prisma
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prompt_toolkit?schema=public"

# Secret used to sign JWT session tokens (generate a strong random string)
JWT_SECRET="replace-with-a-long-random-secret"

# Public app URL (used for callbacks and absolute links)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: AI provider keys for prompt testing
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
```

Generate a strong `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

> ⚠️ `.env.local` is gitignored — never commit secrets.

---

## Database Setup (PostgreSQL + Prisma)

### 1. Create the database

```bash
createdb prompt_toolkit
```

Or via `psql`:

```sql
CREATE DATABASE prompt_toolkit;
```

### 2. Run migrations

```bash
npx prisma migrate dev --name init
```

This applies the schema in `prisma/schema.prisma` to your local database and generates the Prisma Client.

### 3. (Optional) Seed sample data

```bash
npx prisma db seed
```

### 4. Inspect data with Prisma Studio

```bash
npx prisma studio
```

Opens a browser GUI at [http://localhost:5555](http://localhost:5555) to browse and edit rows.

---

## Running the App

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app supports hot reload.

Production build:

```bash
npm run build
npm start
```

---

## Available Scripts

| Command                  | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `npm run dev`            | Start Next.js dev server on port 3000           |
| `npm run build`          | Production build                                |
| `npm start`              | Run the production build                        |
| `npm run lint`           | Run ESLint                                      |
| `npm run test`           | Run the test suite                              |
| `npx prisma migrate dev` | Create/apply a new migration                    |
| `npx prisma generate`    | Regenerate Prisma Client after schema changes   |
| `npx prisma studio`      | Open the Prisma Studio data browser             |
| `npx prisma db push`     | Push schema to DB without creating a migration  |

---

## Project Structure

```
.
├── app/                      # Next.js App Router routes
│   ├── (auth)/               # Sign in / sign up route group
│   ├── (dashboard)/          # Protected app routes
│   ├── api/                  # Route handlers
│   ├── layout.tsx            # Root layout (fonts, providers, toaster)
│   └── globals.css           # Tailwind + design tokens
├── components/
│   ├── ui/                   # Buttons, inputs, modals, etc.
│   └── prompts/              # Prompt-specific components
├── actions/                  # Server actions (auth, prompts, mutations)
├── lib/
│   ├── auth.ts               # JWT sign/verify with jose
│   ├── password.ts           # bcryptjs hash/compare
│   ├── prisma.ts             # Prisma Client singleton
│   └── session.ts            # Cookie helpers
├── prisma/
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Migration history
│   └── seed.ts               # Optional seed script
├── middleware.ts             # Route protection
├── public/                   # Static assets
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Authentication Flow

1. **Sign up** — Server action validates input, hashes the password with `bcryptjs`, creates a `User` row.
2. **Sign in** — Server action verifies the password, then signs a JWT with `jose` using `JWT_SECRET`.
3. **Session cookie** — JWT is stored in an `httpOnly`, `secure`, `sameSite=lax` cookie.
4. **Middleware** — `middleware.ts` verifies the JWT on protected routes and redirects unauthenticated requests to `/sign-in`.
5. **Sign out** — Clears the session cookie.

`lib/auth.ts` exposes `signSession()`, `verifySession()`, and `getCurrentUser()` helpers.

---

## Recommended VS Code Setup

Install these extensions for the best DX:

- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Prisma** (`Prisma.prisma`) — syntax highlighting + formatting for `schema.prisma`
- **TypeScript Nightly** (optional, for the latest TS features)
- **GitLens** (`eamodio.gitlens`)

Recommended `settings.json` snippet:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Troubleshooting

**`Error: P1001: Can't reach database server`**
Make sure PostgreSQL is running and `DATABASE_URL` matches your local credentials. Test with `psql "$DATABASE_URL"`.

**`PrismaClientInitializationError` after editing `schema.prisma`**
Run `npx prisma generate` to regenerate the client, then restart the dev server.

**JWT errors / "invalid signature"**
You probably changed `JWT_SECRET` after issuing tokens. Clear the session cookie in your browser and sign in again.

**Port 3000 in use**
Run on another port: `PORT=3001 npm run dev`.

**Tailwind classes not applying**
Confirm the file path is included in `content` in `tailwind.config.ts` and restart the dev server.

---

## Deployment

Deploy to Vercel:

1. Push the repository to GitHub.
2. Import the project in [vercel.com](https://vercel.com).
3. Add environment variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, any AI keys).
4. Point `DATABASE_URL` at a managed Postgres provider (Vercel Postgres, Neon, Supabase, Railway).
5. Add a build command override if needed: `prisma generate && next build`.
6. Deploy.

---

## License

Personal project — all rights reserved.

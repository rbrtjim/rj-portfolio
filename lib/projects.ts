export interface ProjectGalleryItem {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  banner: string;
  problem: string;
  process: string;
  result: string;
  gallery: ProjectGalleryItem[];
  link?: string;
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "quickserve-qr",
    title: "QuickServe QR — QR-Based Restaurant Ordering",
    description:
      "A QR-based restaurant ordering platform. Diners scan a table QR code to browse a digital menu and place orders, while the kitchen sees every order update in real time.",
    tags: ["Next.js 14", "ASP.NET Core", ".NET 9", "SignalR", "PostgreSQL"],
    cover: "/projects/project-1-cover.svg",
    banner: "/projects/project-1-banner.svg",
    link: "https://quickserveqr.vercel.app/",
    problem:
      "Sit-down restaurants lose time and accuracy to manual order-taking — diners wait for a server, orders are relayed by hand, and the kitchen has no live view of what is queued.",
    process:
      "Built a Next.js + TypeScript ordering frontend backed by an ASP.NET Core (.NET 9) Web API. SignalR pushes new orders and status changes to a live kitchen dashboard. The app runs on SQLite locally and PostgreSQL (Supabase) in production, with role-based access for Admin, Kitchen, and Customer.",
    result:
      "Diners order straight from their phone by scanning a table QR, the kitchen tracks tickets on a real-time dashboard, and admins manage the menu, tables, and analytics. A one-click live demo lets anyone explore the Admin, Kitchen, or Customer view instantly.",
    gallery: [
      { src: "/projects/project-1-cover.svg", alt: "Digital menu" },
      {
        src: "/projects/project-1-banner.svg",
        alt: "Real-time kitchen dashboard",
      },
      { src: "/projects/project-1-cover.svg", alt: "Admin analytics" },
    ],
  },
  {
    slug: "tuona",
    title: "TuoNa — AI Quiz Generation from PDFs & URLs",
    description:
      "An AI-powered study tool that turns PDFs and web pages into quizzes. Upload a document or paste a URL, and TuoNa extracts the text, generates a scored quiz, and tracks your progress.",
    tags: ["React", "Vite", "TypeScript", "ASP.NET Core", "Groq AI"],
    cover: "/projects/project-2-cover.svg",
    banner: "/projects/project-2-banner.svg",
    link: "https://tuo-na.vercel.app/",
    problem:
      "Turning study material into practice questions is slow and manual — learners re-read PDFs and articles with no quick way to test what they actually retained.",
    process:
      "Built a React 18 + Vite + TypeScript frontend with an ASP.NET Core 9 Web API secured by JWT. The backend extracts text from uploaded PDFs and scraped URLs, then calls an OpenAI-compatible Groq model (llama-3.3-70b-versatile) to generate quizzes. Data persists in SQLite by default, with opt-in PostgreSQL via EF Core.",
    result:
      "A complete study loop: upload or link a source, get an AI-generated quiz, take it, see it scored, and review history and analytics. A built-in stub mode keeps the app fully usable even without an AI key.",
    gallery: [
      { src: "/projects/project-2-cover.svg", alt: "Upload a PDF" },
      { src: "/projects/project-2-banner.svg", alt: "Take a quiz" },
      {
        src: "/projects/project-2-cover.svg",
        alt: "Quiz history and analytics",
      },
    ],
  },
  {
    slug: "jenjoy-store",
    title: "JenJoy Store Management — Inventory & POS System",
    description:
      "A web-based inventory and store management system for a small retail business — product tracking, stock movements, suppliers, customer orders, and sales with receipts, profit reporting, and OCR receipt scanning.",
    tags: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    cover: "/projects/project-3-cover.svg",
    banner: "/projects/project-3-banner.svg",
    link: "https://jj-store-management.vercel.app/",
    problem:
      "A small retailer juggled inventory, suppliers, orders, and sales across spreadsheets and paper — stock counts drifted, low-stock items slipped through, and adding products meant typing every line by hand.",
    process:
      "Built a Next.js 14 App Router app with a Prisma + PostgreSQL data model spanning products, stock movements, suppliers, orders, and sales. Authentication uses JWT sessions stored in httpOnly cookies. Tesseract.js runs OCR in the browser so photographed receipts and order slips become editable line items.",
    result:
      "One system covers the full retail lifecycle — a dashboard with low-stock alerts, full product CRUD, stock in/out, supplier and order management, and sales that generate printable receipts and profit reports. OCR bulk-add removes most of the manual data entry.",
    gallery: [
      {
        src: "/projects/project-3-cover.svg",
        alt: "Dashboard and low-stock alerts",
      },
      { src: "/projects/project-3-banner.svg", alt: "Product management" },
      { src: "/projects/project-3-cover.svg", alt: "Sales and receipts" },
    ],
  },
  {
    slug: "ai-job-tracker",
    title: "AI Job Application Tracker — Kanban + Groq AI",
    description:
      "A full-stack job application tracker with a drag-and-drop Kanban board and Groq AI features that tailor your resume, stream cover letters, and score your fit against each job description.",
    tags: ["Next.js 14", "Groq AI", "Prisma", "Supabase", "NextAuth"],
    cover: "/projects/project-4-cover.svg",
    banner: "/projects/project-4-banner.svg",
    problem:
      "Job seekers juggle applications across spreadsheets and inboxes, and rewriting a resume and cover letter for every role is slow — there is no quick way to see which applications are stalled or how well you actually match a posting.",
    process:
      "Built a Next.js 14 App Router app with NextAuth (email/password + optional Google OAuth) and a Prisma schema on Supabase Postgres. A @dnd-kit Kanban board moves applications across stages, while server routes call Groq (llama-3.3-70b-versatile) via the Vercel AI SDK — streaming cover letters with streamText and returning structured JSON for match scores. Upstash Ratelimit guards the AI routes and Recharts powers the analytics dashboard.",
    result:
      "One workspace covers the full job-search loop — drag-and-drop status tracking from Applied to Offer, AI-tailored resume bullets and streaming cover letters per role, a 0–100 fit score with strengths and gaps, and an analytics view for response rate and weekly volume. A demo mode lets visitors try every feature without signing up.",
    gallery: [
      { src: "/projects/project-4-cover.svg", alt: "Kanban application board" },
      { src: "/projects/project-4-banner.svg", alt: "AI cover letter and match score" },
      { src: "/projects/project-4-cover.svg", alt: "Analytics dashboard" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

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
    slug: "rj-portfolio",
    title: "RJ Portfolio — Personal Site with rj.ai Assistant",
    description:
      "This portfolio site — a Next.js 15 application featuring rj.ai, a Messenger-style AI chatbot that answers questions about my background and experience using the Groq API.",
    tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Groq AI"],
    cover: "/projects/project-4-cover.svg",
    banner: "/projects/project-4-banner.svg",
    link: "https://jim-portfolio-gjrz.vercel.app/",
    problem:
      "A portfolio should do more than list experience — visitors and recruiters often have a specific question and no fast way to get it answered without reading every section.",
    process:
      "Built with Next.js 15, React 19, and Tailwind CSS, with light/dark theming and motion. Added rj.ai, a floating chat widget that posts to a server-side Groq route (llama-3.3-70b-versatile); the assistant answers in the first person from a knowledge base built from my resume and project data.",
    result:
      "A polished, responsive portfolio where visitors can either browse normally or simply ask rj.ai — getting instant, grounded answers about my skills, experience, and projects, with off-topic questions politely declined.",
    gallery: [
      { src: "/projects/project-4-cover.svg", alt: "Hero and overview" },
      { src: "/projects/project-4-banner.svg", alt: "Projects section" },
      { src: "/projects/project-4-cover.svg", alt: "rj.ai chat assistant" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

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
    slug: "project-one",
    title: "Project One — Enterprise Workflow Platform",
    description:
      "A modular workflow engine built on ASP.NET Core that automates approvals across 12 departments. Reduced manual processing time by 70%.",
    tags: ["C# .NET", "ASP.NET Core", "PostgreSQL", "React"],
    cover: "/projects/project-1-cover.svg",
    banner: "/projects/project-1-banner.svg",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The internal approval process required emails, spreadsheets, and manual signatures across departments — slow, error-prone, and impossible to audit.",
    process:
      "Designed a microservices architecture with an event-driven workflow engine. Built role-based dashboards in React, integrated with Active Directory, and added a full audit trail backed by PostgreSQL.",
    result:
      "Cut approval times from 5 days to under 1. Audit-ready by default. Adopted by 12 departments and 400+ users in the first quarter.",
    gallery: [
      { src: "/projects/project-1-cover.svg", alt: "Dashboard overview" },
      { src: "/projects/project-1-banner.svg", alt: "Workflow detail" },
      { src: "/projects/project-1-cover.svg", alt: "Mobile view" },
    ],
  },
  {
    slug: "project-two",
    title: "Project Two — AI-Assisted Customer Portal",
    description:
      "A customer self-service portal augmented with an LLM-powered support assistant. Deflected 40% of tier-1 tickets in pilot.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS"],
    cover: "/projects/project-2-cover.svg",
    banner: "/projects/project-2-banner.svg",
    problem:
      "Support tickets piled up with repetitive questions. Customers waited hours for answers that already lived in documentation.",
    process:
      "Built a Next.js portal with a retrieval-augmented chat assistant. Indexed the knowledge base, added guardrails, and instrumented every interaction for QA review.",
    result:
      "Deflected 40% of incoming tier-1 tickets. Average response time dropped from 4 hours to under 30 seconds for AI-handled queries.",
    gallery: [
      { src: "/projects/project-2-cover.svg", alt: "Portal home" },
      { src: "/projects/project-2-banner.svg", alt: "AI chat in action" },
      { src: "/projects/project-2-cover.svg", alt: "Admin analytics" },
    ],
  },
  {
    slug: "project-three",
    title: "Project Three — Real-time Analytics Dashboard",
    description:
      "A real-time analytics dashboard streaming millions of events daily. Built with SignalR, React, and a custom time-series pipeline.",
    tags: ["React", "SignalR", "C# .NET", "SQL Server"],
    cover: "/projects/project-3-cover.svg",
    banner: "/projects/project-3-banner.svg",
    problem:
      "Stakeholders needed live insight into operational metrics, but the existing reports refreshed only once a day — too late to react to incidents.",
    process:
      "Designed a streaming pipeline with SignalR pushing aggregated events to a React dashboard. Added drill-downs, alerts, and a shareable URL state.",
    result:
      "Mean time to detection dropped 80%. Operations teams now resolve incidents before customers notice them.",
    gallery: [
      { src: "/projects/project-3-cover.svg", alt: "Live metrics" },
      { src: "/projects/project-3-banner.svg", alt: "Drill-down view" },
      { src: "/projects/project-3-cover.svg", alt: "Alert configuration" },
    ],
  },
  {
    slug: "project-four",
    title: "Project Four — Low-Code Internal Tools Suite",
    description:
      "A suite of internal tools delivered on Microsoft Power Platform with custom Azure Functions for heavy logic. Saved 200+ hours per month.",
    tags: ["Power Apps", "Power Automate", "Azure Functions", "C#"],
    cover: "/projects/project-4-cover.svg",
    banner: "/projects/project-4-banner.svg",
    problem:
      "Operations teams relied on a patchwork of spreadsheets and emails. IT couldn't keep up with bespoke tool requests.",
    process:
      "Stood up a Power Platform foundation, paired low-code apps with Azure Functions for the complex bits, and trained champions in each department to own their own apps.",
    result:
      "Shipped 14 internal apps in 6 months. Saved an estimated 200+ person-hours per month and freed IT to focus on strategic work.",
    gallery: [
      { src: "/projects/project-4-cover.svg", alt: "App gallery" },
      { src: "/projects/project-4-banner.svg", alt: "Workflow automation" },
      { src: "/projects/project-4-cover.svg", alt: "Admin console" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

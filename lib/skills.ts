export interface SkillGroup {
  category: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "HTML5",
      "CSS3",
      "Framer Motion",
    ],
  },
  {
    category: "Backend",
    skills: ["C# / .NET", "ASP.NET Core", "Node.js", "REST APIs", "Entity Framework"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "SQL Server", "T-SQL", "LINQ"],
  },
  {
    category: "Low-Code & AI",
    skills: [
      "Power Apps",
      "Power Automate",
      "AI-Assisted Development",
      "Claude / LLM Integration",
      "Prompt Engineering",
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub",
      "Azure DevOps",
      "Docker",
      "Visual Studio",
      "VS Code",
    ],
  },
  {
    category: "Management & Design",
    skills: ["Canva", "Figma", "Microsoft Suite", "Google Suite"],
  },
];

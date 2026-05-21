"use client";

import type { ComponentType } from "react";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiHtml5,
  SiCss,
  SiFramer,
  SiDotnet,
  SiNodedotjs,
  SiPostgresql,
  SiNextdotjs,
  SiPowers,
  SiGit,
  SiGithub,
  SiDocker,
  SiAtlassian,
  SiJira,
  SiConfluence,
  SiAnthropic,
  SiOpenai,
  SiCanva,
  SiFigma,
  SiGoogle,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { VscAzureDevops, VscVscode } from "react-icons/vsc";

interface TechItem {
  name: string;
  Icon: ComponentType<{ className?: string }>;
  /** Brand color shown when the individual logo card is hovered */
  hover: string;
}

const TOP_ROW: TechItem[] = [
  { name: "React", Icon: SiReact, hover: "group-hover/logo:text-[#61DAFB]" },
  { name: "Next.js", Icon: SiNextdotjs, hover: "group-hover/logo:text-text" },
  { name: "TypeScript", Icon: SiTypescript, hover: "group-hover/logo:text-[#3178C6]" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, hover: "group-hover/logo:text-[#38BDF8]" },
  { name: "Vite", Icon: SiVite, hover: "group-hover/logo:text-[#646CFF]" },
  { name: "HTML5", Icon: SiHtml5, hover: "group-hover/logo:text-[#E34F26]" },
  { name: "CSS3", Icon: SiCss, hover: "group-hover/logo:text-[#1572B6]" },
  { name: "Framer Motion", Icon: SiFramer, hover: "group-hover/logo:text-[#0055FF]" },
  { name: ".NET", Icon: SiDotnet, hover: "group-hover/logo:text-[#512BD4]" },
  { name: "Node.js", Icon: SiNodedotjs, hover: "group-hover/logo:text-[#5FA04E]" },
  { name: "PostgreSQL", Icon: SiPostgresql, hover: "group-hover/logo:text-[#4169E1]" },
  { name: "SQL Server", Icon: FaMicrosoft, hover: "group-hover/logo:text-[#CC2927]" },
];

const BOTTOM_ROW: TechItem[] = [
  { name: "Power Apps", Icon: SiPowers, hover: "group-hover/logo:text-[#742774]" },
  { name: "Power Automate", Icon: SiPowers, hover: "group-hover/logo:text-[#0066FF]" },
  { name: "Claude AI", Icon: SiAnthropic, hover: "group-hover/logo:text-[#D97757]" },
  { name: "OpenAI", Icon: SiOpenai, hover: "group-hover/logo:text-text" },
  { name: "Git", Icon: SiGit, hover: "group-hover/logo:text-[#F05032]" },
  { name: "GitHub", Icon: SiGithub, hover: "group-hover/logo:text-text" },
  { name: "Azure DevOps", Icon: VscAzureDevops, hover: "group-hover/logo:text-[#0078D4]" },
  { name: "Docker", Icon: SiDocker, hover: "group-hover/logo:text-[#2496ED]" },
  { name: "VS Code", Icon: VscVscode, hover: "group-hover/logo:text-[#007ACC]" },
  { name: "Visual Studio", Icon: FaMicrosoft, hover: "group-hover/logo:text-[#5C2D91]" },
  { name: "Atlassian", Icon: SiAtlassian, hover: "group-hover/logo:text-[#0052CC]" },
  { name: "Jira", Icon: SiJira, hover: "group-hover/logo:text-[#0052CC]" },
  { name: "Confluence", Icon: SiConfluence, hover: "group-hover/logo:text-[#172B4D]" },
  { name: "Canva", Icon: SiCanva, hover: "group-hover/logo:text-[#00C4CC]" },
  { name: "Figma", Icon: SiFigma, hover: "group-hover/logo:text-[#F24E1E]" },
  { name: "Microsoft Suite", Icon: FaMicrosoft, hover: "group-hover/logo:text-[#0078D4]" },
  { name: "Google Suite", Icon: SiGoogle, hover: "group-hover/logo:text-[#4285F4]" },
];

interface RowProps {
  items: TechItem[];
  direction: "left" | "right";
  speedSeconds: number;
}

function MarqueeRow({ items, direction, speedSeconds }: RowProps) {
  const duplicated = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-4 motion-safe:animate-marquee group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speedSeconds}s`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {duplicated.map((item, idx) => {
          const Icon = item.Icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="group/logo flex h-20 min-w-[200px] items-center gap-3 rounded-2xl border border-border bg-bg/70 px-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
            >
              <Icon
                className={`h-7 w-7 shrink-0 text-muted transition-colors ${item.hover}`}
              />
              <span className="whitespace-nowrap text-sm font-semibold text-text">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TechCarousel() {
  return (
    <div className="space-y-5">
      <MarqueeRow items={TOP_ROW} direction="left" speedSeconds={45} />
      <MarqueeRow items={BOTTOM_ROW} direction="right" speedSeconds={50} />
    </div>
  );
}

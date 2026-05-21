"use client";

import React from "react";

const S = {
  stroke: "currentColor" as const,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
};

function Bot() {
  return (
    <svg width="52" height="60" viewBox="0 0 56 64" {...S}>
      {/* body */}
      <rect x="4" y="12" width="48" height="34" rx="5" />
      {/* screen */}
      <rect x="9" y="17" width="38" height="20" rx="2" />
      {/* eyes */}
      <circle cx="20" cy="25" r="3" />
      <circle cx="36" cy="25" r="3" />
      {/* smile */}
      <path d="M18 32 Q28 38 38 32" />
      {/* antenna */}
      <line x1="28" y1="12" x2="28" y2="5" />
      <circle cx="28" cy="4" r="2.5" />
      {/* side ears */}
      <rect x="0" y="20" width="4" height="10" rx="1" />
      <rect x="52" y="20" width="4" height="10" rx="1" />
      {/* legs */}
      <line x1="18" y1="46" x2="18" y2="58" strokeWidth={2.5} />
      <line x1="38" y1="46" x2="38" y2="58" strokeWidth={2.5} />
    </svg>
  );
}

function Laptop() {
  return (
    <svg width="50" height="38" viewBox="0 0 54 40" {...S}>
      {/* screen panel */}
      <rect x="3" y="2" width="48" height="28" rx="3" />
      {/* heart on screen */}
      <path d="M27 22 C27 22 20 16 20 12.5 C20 10 22 8.5 24.5 8.5 C25.8 8.5 26.9 9.1 27.5 10 C28.1 9.1 29.2 8.5 30.5 8.5 C33 8.5 35 10 35 12.5 C35 16 27 22 27 22 Z" />
      {/* keyboard base */}
      <path d="M1 30 L5 38 L49 38 L53 30" />
      <line x1="1" y1="30" x2="53" y2="30" />
    </svg>
  );
}

function Coffee() {
  return (
    <svg width="42" height="48" viewBox="0 0 44 50" {...S}>
      {/* steam */}
      <path d="M12 12 Q13.5 8.5 12 5" />
      <path d="M20 12 Q21.5 7 20 3" />
      <path d="M28 12 Q29.5 8.5 28 5" />
      {/* cup body */}
      <path d="M6 18 L8 42 Q8 44 10 44 L30 44 Q32 44 32 42 L34 18 Z" />
      {/* rim */}
      <ellipse cx="20" cy="18" rx="14" ry="3" />
      {/* handle */}
      <path d="M34 24 Q44 24 44 32 Q44 40 34 40" />
    </svg>
  );
}

function Sparkle({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" {...S}>
      <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" />
    </svg>
  );
}

function CodeTag() {
  return (
    <svg width="50" height="30" viewBox="0 0 52 32" {...S}>
      <path d="M14 4 L2 16 L14 28" />
      <path d="M38 4 L50 16 L38 28" />
      <line x1="32" y1="2" x2="20" y2="30" />
    </svg>
  );
}

function Planet() {
  return (
    <svg width="50" height="42" viewBox="0 0 52 44" {...S}>
      <circle cx="26" cy="22" r="13" />
      <ellipse cx="26" cy="22" rx="22" ry="7" />
    </svg>
  );
}

function SmallCircle() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" {...S}>
      <circle cx="5" cy="5" r="3" />
    </svg>
  );
}

interface DoodleConfig {
  el: JSX.Element;
  left: string;
  top: string;
  rotate: number;
  duration: number;
  delay: number;
}

const HERO: DoodleConfig[] = [
  { el: <Bot />,              left: "68%", top: "12%", rotate: -8,  duration: 5.0, delay: 0    },
  { el: <Planet />,           left: "55%", top: "6%",  rotate: 15,  duration: 6.5, delay: -1.0 },
  { el: <Laptop />,           left: "82%", top: "58%", rotate: 10,  duration: 4.5, delay: -2.0 },
  { el: <Coffee />,           left: "10%", top: "72%", rotate: 5,   duration: 5.5, delay: -0.5 },
  { el: <CodeTag />,          left: "76%", top: "82%", rotate: -12, duration: 4.0, delay: -1.5 },
  { el: <Sparkle size={34}/>, left: "88%", top: "20%", rotate: 20,  duration: 3.5, delay: -0.8 },
  { el: <Sparkle size={20}/>, left: "91%", top: "84%", rotate: -5,  duration: 4.2, delay: -2.2 },
  { el: <Sparkle size={24}/>, left: "48%", top: "88%", rotate: 10,  duration: 5.2, delay: -1.2 },
  { el: <SmallCircle />,      left: "62%", top: "43%", rotate: 0,   duration: 6.0, delay: -0.3 },
  { el: <SmallCircle />,      left: "80%", top: "37%", rotate: 0,   duration: 4.8, delay: -1.8 },
];

const SKILLS: DoodleConfig[] = [
  { el: <Bot />,              left: "3%",  top: "7%",  rotate: 12,  duration: 5.2, delay: -0.7 },
  { el: <Laptop />,           left: "88%", top: "5%",  rotate: -10, duration: 4.8, delay: -1.3 },
  { el: <CodeTag />,          left: "2%",  top: "52%", rotate: -8,  duration: 5.5, delay: -2.0 },
  { el: <Planet />,           left: "86%", top: "58%", rotate: 5,   duration: 6.0, delay: 0    },
  { el: <Coffee />,           left: "5%",  top: "78%", rotate: -5,  duration: 4.5, delay: -0.5 },
  { el: <Sparkle size={34}/>, left: "92%", top: "36%", rotate: 0,   duration: 3.8, delay: -1.5 },
  { el: <Sparkle size={22}/>, left: "7%",  top: "32%", rotate: 20,  duration: 4.2, delay: -0.9 },
  { el: <Sparkle size={18}/>, left: "50%", top: "95%", rotate: -10, duration: 5.0, delay: -2.5 },
  { el: <SmallCircle />,      left: "42%", top: "4%",  rotate: 0,   duration: 5.5, delay: -1.1 },
  { el: <SmallCircle />,      left: "93%", top: "88%", rotate: 0,   duration: 4.8, delay: -0.2 },
];

export function DoodleLayer({ variant }: { variant: "hero" | "skills" }) {
  const items = variant === "hero" ? HERO : SKILLS;
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {items.map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: d.left, top: d.top, transform: `rotate(${d.rotate}deg)` }}
        >
          <div
            className="doodle-float text-muted"
            style={{
              opacity: 0.22,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          >
            {d.el}
          </div>
        </div>
      ))}
    </div>
  );
}

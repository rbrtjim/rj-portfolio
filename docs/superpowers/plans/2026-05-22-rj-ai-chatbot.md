# rj.ai Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add **rj.ai**, a Facebook Messenger-style AI chatbot widget to the lower-right of the portfolio that answers questions about Robert in the first person, grounded in his resume + portfolio data, via the Groq API.

**Architecture:** A `"use client"` floating widget posts the conversation to a server-side Next.js Route Handler. The handler injects a system prompt built from a static knowledge module (resume facts + imported `PROJECTS`/`SKILL_GROUPS`) and calls Groq's OpenAI-compatible endpoint with a plain `fetch`. The `GROQ_API_KEY` stays server-side. Responses are non-streaming; the widget shows a typing indicator while waiting.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, framer-motion, lucide-react, zod (all already installed). Adds `vitest` as a dev dependency for unit testing the pure-logic modules.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `vitest.config.ts` | Vitest config (node env, `@` path alias). New. |
| `.env.example` | Documents the required `GROQ_API_KEY`. New, committed. |
| `.env.local` | Holds the real Groq key. New, **gitignored — never committed**. |
| `lib/rj-ai-knowledge.ts` | Builds the `KNOWLEDGE` string, `SUGGESTED_QUESTIONS`, and `buildSystemPrompt()`. New. |
| `lib/rj-ai-knowledge.test.ts` | Unit tests for the knowledge module. New. |
| `app/api/chat/route.ts` | POST Route Handler: validates input, calls Groq, returns `{ reply }`. New. |
| `app/api/chat/route.test.ts` | Unit tests for the Route Handler. New. |
| `components/ui/RjAiChat.tsx` | The Messenger-style floating chat widget. New. |
| `app/layout.tsx` | Mounts `<RjAiChat />` on every page. Modified. |
| `package.json` | Adds `vitest` dev dep + `test` script. Modified. |

---

## Task 1: Test infrastructure + environment setup

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `.env.example`
- Create: `.env.local` (not committed)

- [ ] **Step 1: Install vitest as a dev dependency**

Run: `npm install -D vitest`
Expected: `vitest` appears under `devDependencies` in `package.json`; install completes without errors.

- [ ] **Step 2: Add the `test` script to `package.json`**

In `package.json`, add a `test` entry to the `scripts` object so it reads:

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
```

- [ ] **Step 3: Create `vitest.config.ts`**

Create `vitest.config.ts` at the project root:

```ts
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
```

- [ ] **Step 4: Create `.env.example`**

Create `.env.example` at the project root:

```
# Groq API key for the rj.ai chatbot.
# Get a free key at https://console.groq.com/keys
# Copy this file to .env.local and paste your real key there.
GROQ_API_KEY=
```

- [ ] **Step 5: Create `.env.local` with the real key**

Create `.env.local` at the project root (it is already covered by `.gitignore` — confirm it is NOT staged in any commit):

```
GROQ_API_KEY=<paste the Groq API key here>
```

Verify: `git status` does NOT list `.env.local`.

- [ ] **Step 6: Commit (config + example only)**

```bash
git add package.json package-lock.json vitest.config.ts .env.example
git commit -m "chore: add vitest and rj.ai env scaffolding"
```

---

## Task 2: Knowledge module

**Files:**
- Create: `lib/rj-ai-knowledge.ts`
- Test: `lib/rj-ai-knowledge.test.ts`

- [ ] **Step 1: Write the failing test**

Create `lib/rj-ai-knowledge.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  KNOWLEDGE,
  SUGGESTED_QUESTIONS,
  buildSystemPrompt,
} from "@/lib/rj-ai-knowledge";
import { PROJECTS } from "@/lib/projects";
import { SKILL_GROUPS } from "@/lib/skills";

describe("rj-ai-knowledge", () => {
  it("includes core resume facts", () => {
    expect(KNOWLEDGE).toContain("KYOCERA");
    expect(KNOWLEDGE).toContain("Cebu Technological University");
    expect(KNOWLEDGE).toContain("robertjimplacencia2@gmail.com");
  });

  it("includes every portfolio project title", () => {
    for (const project of PROJECTS) {
      expect(KNOWLEDGE).toContain(project.title);
    }
  });

  it("includes every skill category", () => {
    for (const group of SKILL_GROUPS) {
      expect(KNOWLEDGE).toContain(group.category);
    }
  });

  it("provides exactly four non-empty suggested questions", () => {
    expect(SUGGESTED_QUESTIONS).toHaveLength(4);
    expect(SUGGESTED_QUESTIONS.every((q) => q.trim().length > 0)).toBe(true);
  });

  it("builds a system prompt embedding the knowledge and first-person rule", () => {
    const prompt = buildSystemPrompt();
    expect(prompt).toContain(KNOWLEDGE);
    expect(prompt.toLowerCase()).toContain("first person");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '@/lib/rj-ai-knowledge'` (the module does not exist yet).

- [ ] **Step 3: Create the knowledge module**

Create `lib/rj-ai-knowledge.ts`:

```ts
import { PROJECTS } from "@/lib/projects";
import { SKILL_GROUPS } from "@/lib/skills";

const RESUME = `ROBERT JIM M. PLACENCIA — Software Engineer
Location: Mabolo, Cebu City, Philippines
Email: robertjimplacencia2@gmail.com

SUMMARY
Software Developer with 3 years of experience building and maintaining
package-based applications and business systems. Strong background in C# .NET
as a primary language, with additional experience in C++ for performance-focused
components. Skilled in web development and low-code platforms, delivering
practical internal solutions that improve workflows and operational efficiency.
Comfortable across the full development lifecycle, from requirements analysis to
deployment and support, with a focus on clean, maintainable code and reliable
system performance.

WORK EXPERIENCE
Software Engineer — KYOCERA Document Solutions (March 2023 – Present)
- Design, coding, unit testing, joint testing, debugging and bug fixing.
- Leads the plan for assigned components.
- Reviews requirements, design, source code, test specifications and deliverables.
- Conducts investigations and understands project change requirements.
- Executes end-to-end traceability; prevents and fixes bugs.

IT Support Specialist — TaskEveryday / Teams.PH (2022)
- Network support & maintenance; hardware & software technical support.
- User account & access management; system administration & maintenance.
- Helpdesk & end-user support.

EDUCATION
Bachelor of Science in Information Technology, Major in Software Development
Cebu Technological University — Main Campus (Aug 2018 – Oct 2022)`;

function projectsBlock(): string {
  return PROJECTS.map(
    (p) => `- ${p.title}: ${p.description} (Tech: ${p.tags.join(", ")})`,
  ).join("\n");
}

function skillsBlock(): string {
  return SKILL_GROUPS.map(
    (g) => `- ${g.category}: ${g.skills.join(", ")}`,
  ).join("\n");
}

export const KNOWLEDGE = `${RESUME}

PORTFOLIO PROJECTS
${projectsBlock()}

TECHNICAL SKILLS
${skillsBlock()}

CONTACT
Visitors can reach Robert through the contact form in the Contact section of
this portfolio site, or by email at robertjimplacencia2@gmail.com.`;

export const SUGGESTED_QUESTIONS: string[] = [
  "What's your tech stack?",
  "Tell me about your experience at KYOCERA.",
  "What projects have you worked on?",
  "How can I get in touch?",
];

export function buildSystemPrompt(): string {
  return `You are "rj.ai", a friendly chat assistant embedded in Robert Jim M. Placencia's portfolio website.

You speak in the FIRST PERSON, as if you are Robert himself (for example: "I have 3 years of experience...").

RULES:
- Answer ONLY using the information in the KNOWLEDGE section below.
- Never invent employers, dates, numbers, or projects that are not in the KNOWLEDGE.
- Keep answers concise and conversational — usually 1 to 3 short sentences.
- If asked something that is NOT about Robert's background, career, skills, or
  projects, politely decline and redirect: say you can only chat about Robert's
  background and suggest asking about his experience, skills, or projects.
- If the KNOWLEDGE does not contain the answer, say so honestly rather than guessing.
- Be warm and professional. Do not use markdown formatting in replies.

KNOWLEDGE:
${KNOWLEDGE}`;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all 5 tests in `lib/rj-ai-knowledge.test.ts` green.

- [ ] **Step 5: Commit**

```bash
git add lib/rj-ai-knowledge.ts lib/rj-ai-knowledge.test.ts
git commit -m "feat: add rj.ai knowledge module and system prompt builder"
```

---

## Task 3: Chat API route

**Files:**
- Create: `app/api/chat/route.ts`
- Test: `app/api/chat/route.test.ts`

- [ ] **Step 1: Write the failing test**

Create `app/api/chat/route.test.ts`:

```ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { POST } from "@/app/api/chat/route";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.GROQ_API_KEY;
  });

  it("rejects an empty messages array with 400", async () => {
    const res = await POST(makeRequest({ messages: [] }));
    expect(res.status).toBe(400);
  });

  it("rejects a message longer than 500 characters with 400", async () => {
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "x".repeat(501) }] }),
    );
    expect(res.status).toBe(400);
  });

  it("returns 503 when GROQ_API_KEY is missing", async () => {
    delete process.env.GROQ_API_KEY;
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] }),
    );
    expect(res.status).toBe(503);
  });

  it("returns the assistant reply from Groq on success", async () => {
    process.env.GROQ_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            choices: [{ message: { content: "Hello there!" } }],
          }),
          { status: 200 },
        ),
      ),
    );
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] }),
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBe("Hello there!");
  });

  it("returns 502 when the Groq request fails", async () => {
    process.env.GROQ_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("error", { status: 500 })),
    );
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "hi" }] }),
    );
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `Cannot find module '@/app/api/chat/route'`.

- [ ] **Step 3: Create the Route Handler**

Create `app/api/chat/route.ts`:

```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/rj-ai-knowledge";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_HISTORY = 12;
const TROUBLE_MESSAGE =
  "I'm having trouble right now — please try again in a moment.";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(500),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The assistant is not configured right now." },
      { status: 503 },
    );
  }

  const history = parsed.data.messages.slice(-MAX_HISTORY);

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        max_tokens: 400,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...history,
        ],
      }),
    });

    if (!groqRes.ok) {
      return NextResponse.json({ error: TROUBLE_MESSAGE }, { status: 502 });
    }

    const data = await groqRes.json();
    const reply: unknown = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || reply.trim().length === 0) {
      return NextResponse.json({ error: TROUBLE_MESSAGE }, { status: 502 });
    }

    return NextResponse.json({ reply: reply.trim() });
  } catch {
    return NextResponse.json({ error: TROUBLE_MESSAGE }, { status: 502 });
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — all 5 tests in `app/api/chat/route.test.ts` green, plus the Task 2 tests still green.

- [ ] **Step 5: Commit**

```bash
git add app/api/chat/route.ts app/api/chat/route.test.ts
git commit -m "feat: add /api/chat Groq route handler for rj.ai"
```

---

## Task 4: RjAiChat widget component

**Files:**
- Create: `components/ui/RjAiChat.tsx`

This is a UI component verified manually (the spec calls for manual verification of the widget; no React Testing Library is installed).

- [ ] **Step 1: Create the widget component**

Create `components/ui/RjAiChat.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { SUGGESTED_QUESTIONS } from "@/lib/rj-ai-knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm rj.ai 👋 Ask me anything about Robert's experience, skills, or projects.",
};

const ERROR_REPLY =
  "I'm having trouble right now — please try again in a moment.";

export function RjAiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, pending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;

    const next: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed.slice(0, 500) },
    ];
    setMessages(next);
    setInput("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data: { reply?: string; error?: string } = await res.json();
      const reply =
        res.ok && data.reply ? data.reply : data.error ?? ERROR_REPLY;
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: ERROR_REPLY }]);
    } finally {
      setPending(false);
    }
  }

  const showSuggestions = messages.length === 1 && !pending;

  return (
    <>
      {/* Launcher button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with rj.ai"}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 transition hover:scale-105"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="rj.ai chat"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-5 z-[90] flex h-[520px] w-[calc(100vw-2.5rem)] max-w-[370px] flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-accent px-4 py-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                rj
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold leading-tight">rj.ai</p>
                <p className="text-xs text-white/80">Ask me about Robert</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 transition hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-surface/40 px-4 py-4"
            >
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role} content={m.content} />
              ))}
              {pending && <TypingBubble />}

              {showSuggestions && (
                <div className="space-y-2 pt-1">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="block w-full rounded-xl border border-accent/40 bg-bg px-3 py-2 text-left text-sm text-accent transition hover:bg-accent/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border bg-bg px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Type a message…"
                aria-label="Message"
                className="flex-1 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-text outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, content }: ChatMessage) {
  const isUser = role === "user";
  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
          rj
        </div>
      )}
      <div
        className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-md bg-accent text-white"
            : "rounded-bl-md border border-border bg-bg text-text"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
        rj
      </div>
      <div className="flex gap-1 rounded-2xl rounded-bl-md border border-border bg-bg px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/RjAiChat.tsx
git commit -m "feat: add rj.ai Messenger-style chat widget component"
```

---

## Task 5: Mount the widget in the layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and render `<RjAiChat />`**

In `app/layout.tsx`, add the import alongside the other UI imports:

```tsx
import { RjAiChat } from "@/components/ui/RjAiChat";
```

Then render it inside `ThemeProvider`, immediately after `<Footer />`, so the body's `ThemeProvider` block reads:

```tsx
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <RjAiChat />
        </ThemeProvider>
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: mount rj.ai chat widget site-wide"
```

---

## Task 6: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — all 10 tests (5 knowledge + 5 route) green.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors; `/api/chat` appears in the route list.

- [ ] **Step 4: Manual smoke test**

Run: `npm run dev`, open `http://localhost:3000`, then verify:
- A round accent launcher button sits in the lower-right corner.
- Clicking it opens the Messenger-style panel anchored bottom-right with a scale/fade animation.
- The greeting bubble and four suggested-question chips show.
- Clicking a chip sends it; the typing dots appear, then a first-person reply bubble.
- Typing a custom question and pressing Enter (or the send button) works.
- An off-topic question (e.g. "What's the weather?") gets a polite decline.
- Toggle dark mode (theme toggle in the navbar) — the widget colors adapt.
- Narrow the browser to a phone width — the panel becomes near-full-width and stays usable.

- [ ] **Step 5: Final commit (if any verification fixes were made)**

```bash
git add -A
git commit -m "chore: verify rj.ai chatbot build and lint"
```

---

## Self-Review

**Spec coverage:**
- Messenger-style lower-right widget → Task 4 (launcher + panel, `bottom-5 right-5`).
- Groq API, server-side key → Task 3 (`/api/chat`, `process.env.GROQ_API_KEY`).
- Answers from resume + site content → Task 2 (`KNOWLEDGE` from resume + imported `PROJECTS`/`SKILL_GROUPS`).
- First-person voice → Task 2 (`buildSystemPrompt`).
- Off-topic decline → Task 2 (system prompt rule), verified in Task 6 Step 4.
- Suggested questions → Task 2 (`SUGGESTED_QUESTIONS`) + Task 4 (chips).
- Typing indicator, non-streaming → Task 4 (`TypingBubble`, `pending` state).
- Mounted site-wide → Task 5.
- Env scaffolding (`.env.example`, `.env.local`) → Task 1.
- Error handling (missing key, Groq failure, input limits) → Task 3 + Task 4 (`ERROR_REPLY`).
- Testing → Tasks 2 & 3 (vitest unit tests), Task 6 (manual widget verification).

No gaps found.

**Placeholder scan:** No TBD/TODO; every code step contains complete code. The only intentional placeholder is `<paste the Groq API key here>` in `.env.local` (Task 1 Step 5) — a real secret that must not be committed.

**Type consistency:** `ChatMessage` (`role`, `content`) is used consistently in `RjAiChat.tsx`; `buildSystemPrompt()` / `KNOWLEDGE` / `SUGGESTED_QUESTIONS` names match between `lib/rj-ai-knowledge.ts`, its test, the route handler, and the widget. The route's `bodySchema` (`messages` array) matches the `{ messages: next }` payload the widget sends.

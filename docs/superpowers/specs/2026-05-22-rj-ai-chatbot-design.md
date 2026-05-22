# rj.ai Chatbot — Design Spec

**Date:** 2026-05-22
**Status:** Approved

## Summary

Add **rj.ai**, an AI chatbot to the portfolio site. It is a floating,
Facebook Messenger-style widget anchored to the lower-right of every page.
Visitors can ask basic questions about Robert; the bot answers in the first
person using knowledge drawn from Robert's resume plus the portfolio's own
project and skill data. Powered by the Groq API.

## Goals

- Let visitors (recruiters, collaborators) get quick answers about Robert
  without reading the whole site.
- Stay on-brand: answers are grounded only in known facts; off-topic
  questions are politely declined.
- Zero new runtime npm dependencies; the Groq key never reaches the browser.

## Non-Goals

- No PDF parsing at runtime, no vector search / RAG embeddings (overkill for a
  one-page resume).
- No persistent chat history (session-only; resets on reload).
- No streaming token-by-token output (Messenger shows a typing indicator then
  the full message — we match that).
- No authentication, no admin dashboard, no analytics.

## Decisions (from brainstorming)

| Question | Decision |
|----------|----------|
| Knowledge source | Resume **+** site content (projects & skills) |
| Voice | First person — bot speaks as Robert |
| Off-topic questions | Politely decline and redirect |
| Groq model | `llama-3.3-70b-versatile` |
| Backend | Next.js Route Handler (server-side) |
| Groq client | Plain `fetch` to the OpenAI-compatible endpoint — no new dependency |
| Response delivery | Non-streaming; typing-dots indicator while waiting |

## Architecture

```
Browser (RjAiChat.tsx, "use client")
   │  POST /api/chat  { messages: [...] }
   ▼
app/api/chat/route.ts  (server, Node runtime)
   │  builds system prompt = persona + KNOWLEDGE + guardrails
   │  fetch → https://api.groq.com/openai/v1/chat/completions
   ▼
Groq (llama-3.3-70b-versatile)
   │  { reply }
   ▼
Browser appends bot bubble
```

The API key (`process.env.GROQ_API_KEY`) is read only inside the Route
Handler. It is never imported into a client component or sent to the browser.

## Components

### 1. `lib/rj-ai-knowledge.ts`

- Exports `KNOWLEDGE: string` — a plain-text block assembled from:
  - Hand-written resume facts (summary, work experience, education, skills,
    location, contact).
  - `PROJECTS` imported from `lib/projects.ts` (title, description, tags).
  - `SKILL_GROUPS` imported from `lib/skills.ts`.
  Importing the existing data keeps the site as the single source of truth.
- Exports `SUGGESTED_QUESTIONS: string[]`:
  - "What's your tech stack?"
  - "Tell me about your experience at KYOCERA."
  - "What projects have you worked on?"
  - "How can I get in touch?"
- Exports `SYSTEM_PROMPT(knowledge)` builder or a `buildSystemPrompt()`
  helper that combines persona + knowledge + guardrails.

### 2. `app/api/chat/route.ts`

- `POST` Route Handler.
- Request body: `{ messages: { role: "user" | "assistant", content: string }[] }`.
- Validation with `zod` (already a dependency):
  - `messages` non-empty, each `content` 1–500 chars.
  - Server trims history to the last 12 messages before sending to Groq.
- Builds the Groq request: `system` message (persona + knowledge) followed by
  the trimmed conversation.
- Calls Groq with `model: "llama-3.3-70b-versatile"`, a modest
  `max_tokens` cap, `temperature` ~0.4.
- Returns `{ reply: string }` on success.
- On missing key / Groq failure / network error: returns a non-2xx with a
  safe message; never leaks the key or raw error.

### 3. `components/ui/RjAiChat.tsx` (`"use client"`)

Facebook Messenger-style floating widget.

- **Launcher (closed):** fixed circular button, lower-right corner, accent
  background, chat icon (`lucide-react`), shadow, hover lift.
- **Panel (open):** ~360 px wide, ~520 px tall, anchored bottom-right above
  the launcher. Opens with a framer-motion scale + fade from the corner.
- **Header:** "rj.ai" title, avatar, subtitle "Ask me about Robert",
  minimize/close button.
- **Message list:** scrollable; user bubbles accent-colored right-aligned,
  bot bubbles surface-colored left-aligned with a small avatar. Rounded
  Messenger-style bubbles. Auto-scrolls to newest.
- **Typing indicator:** three animated dots in a bot bubble while awaiting a
  response.
- **Suggested questions:** tappable chips shown when the conversation is
  empty; tapping one sends it.
- **Input:** rounded text field + send button; Enter to send; disabled while
  a response is pending.
- **Theme-aware:** uses existing `--accent` / `--bg` / `--surface` /
  `--text` / `--border` tokens; works in light and dark mode.
- **Mobile:** panel expands to a near-full-screen sheet.
- **Accessibility:** launcher and controls are real buttons with
  `aria-label`s; respects `prefers-reduced-motion`.

### 4. `app/layout.tsx`

Mount `<RjAiChat />` inside `ThemeProvider` so the widget appears on every
page (including project detail pages and 404).

### 5. Environment

- `GROQ_API_KEY` required. Stored in `.env.local` (already gitignored) for
  local dev and added to Vercel project environment variables for deploy.
- Add `.env.example` documenting `GROQ_API_KEY=` with a comment.

## Data Flow

1. User opens the widget; if the conversation is empty, suggested-question
   chips are shown.
2. User types (or taps a chip) → client appends a user bubble, shows the
   typing indicator, disables input.
3. Client `POST`s the full in-memory message history to `/api/chat`.
4. Route Handler validates, trims to last 12 messages, prepends the system
   prompt, calls Groq.
5. Reply returns → client removes the typing indicator, appends a bot bubble,
   re-enables input.
6. History is React state only; a page reload clears the conversation.

## Persona / System Prompt

- Speaks in the **first person as Robert** — "I have 3 years of experience…".
- Friendly, concise, professional.
- Answers **only** from `KNOWLEDGE`; never invents facts (employers, dates,
  numbers) that are not present.
- Off-topic questions: a brief polite decline that redirects — e.g. "I can
  only chat about Robert's background — try asking about his experience,
  skills, or projects!"
- "How can I get in touch?" → directs to the contact section / email.

## Error Handling

| Failure | Behavior |
|---------|----------|
| `GROQ_API_KEY` missing | Route returns a safe error; widget shows "I'm having trouble right now — please try again later." |
| Groq / network error | Caught server-side; same friendly bot bubble; input re-enabled. |
| Empty or >500-char input | Blocked client-side; server also rejects via zod. |
| Oversized history | Server trims to the last 12 messages. |

## Testing

- `lib/rj-ai-knowledge.ts`: unit-test that `KNOWLEDGE` includes resume facts
  (KYOCERA, Cebu Technological University) and every project title.
- `app/api/chat/route.ts`: test input validation (empty messages rejected,
  over-long content rejected), and that the Groq call is shaped correctly
  with the Groq fetch mocked. Test the missing-key path returns a safe error.
- `RjAiChat.tsx`: manual verification — open/close, send a message, suggested
  chips, typing indicator, dark mode, mobile width.

## Risks / Notes

- Groq free-tier rate limits may throttle under load — acceptable for a
  personal portfolio; the error path handles it gracefully.
- The API key pasted in chat during planning must be **rotated** before/after
  launch; the working key lives only in `.env.local` and Vercel.
- Knowledge must be manually refreshed when the resume changes; projects and
  skills auto-sync because they are imported from existing `lib/` data.

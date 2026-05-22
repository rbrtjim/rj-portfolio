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

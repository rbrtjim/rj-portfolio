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

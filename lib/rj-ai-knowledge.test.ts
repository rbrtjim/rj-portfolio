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

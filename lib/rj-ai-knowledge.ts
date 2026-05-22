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

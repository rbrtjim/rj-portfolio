"use server";

import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(5000, "Message is too long"),
});

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid form data";
    return { status: "error", message: first };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "robertjimplacencia2@gmail.com";

  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set. Skipping send.",
      parsed.data,
    );
    return {
      status: "error",
      message:
        "Email service isn't configured yet. Please reach out via email or LinkedIn for now.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="margin: 0 0 12px;">New portfolio message</h2>
          <p style="margin: 0;"><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(
            email,
          )}&gt;</p>
          <hr style="border: none; border-top: 1px solid #e2e8ef; margin: 16px 0;" />
          <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${escapeHtml(
            message,
          )}</pre>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "Couldn't send the message. Please try again in a moment.",
      };
    }

    return {
      status: "success",
      message: "Thanks! Your message is on its way — I'll be in touch soon.",
    };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

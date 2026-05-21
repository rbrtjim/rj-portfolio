"use client";

import { useActionState, useEffect, useRef } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage, type ContactState } from "@/actions/contact";

const INITIAL_STATE: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    INITIAL_STATE,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
        />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-text"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          maxLength={5000}
          placeholder="Tell me about your project, role, or idea…"
          className="block w-full resize-y rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text shadow-sm outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>

        {state.status === "success" && (
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="flex items-center gap-2 text-sm font-medium text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-4 w-4" />
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
}

function Field({ id, label, type, autoComplete, required, maxLength }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-text"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        className="block w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-text shadow-sm outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}

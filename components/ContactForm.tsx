"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { BubbleCard } from "@/components/BubbleCard";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData(event.currentTarget);
    const body = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === "string") {
        body.append(key, value);
      }
    });

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      router.push("/thanks");
    } catch {
      setSubmitError("We could not send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BubbleCard as="form" name="contact" method="POST" onSubmit={handleSubmit} className="space-y-4 p-4 text-sm sm:p-5">
      <input type="hidden" name="form-name" value="contact" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
            required
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-brand-primary" htmlFor="contact-message">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text placeholder:text-brand-text/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          placeholder="Share a bit about your question, idea, or feedback."
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
      {submitError ? (
        <p className="text-xs text-red-200" role="alert">
          {submitError}
        </p>
      ) : null}
      <p className="text-[11px] text-brand-text/75">
        Information is for general guidance. We don&apos;t provide legal or financial advice.
      </p>
    </BubbleCard>
  );
}

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BubbleCard } from "./BubbleCard";
import { Button } from "./ui/Button";

type LeadFormProps = {
  city?: string;
  state?: string;
  compact?: boolean;
  className?: string;
};

export function LeadForm({ city = "", state = "", compact = false, className = "" }: LeadFormProps) {
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
      setSubmitError("We could not send your request right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <BubbleCard
      as="form"
      name="local-help-request"
      method="POST"
      onSubmit={handleSubmit}
      className={`space-y-3 p-5 ${compact ? "sm:p-5" : "sm:p-6"} ${className}`}
      aria-label="Request local real estate help"
    >
      <input type="hidden" name="form-name" value="local-help-request" />
      <input type="hidden" name="city" value={city} />
      <input type="hidden" name="state" value={state} />
      <input type="hidden" name="bot-field" />

      <div className="space-y-1">
        <h2 className="text-base font-semibold text-brand-primary">Request local help</h2>
        <p className="text-xs text-brand-text/80">
          Tell us what you need and we will share your request with a local professional.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="lead-name">
            Name
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="lead-email">
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="lead-phone">
            Phone (optional)
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="lead-need">
            Need
          </label>
          <select
            id="lead-need"
            name="need"
            required
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
            defaultValue=""
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="buying">Buying a home</option>
            <option value="renting">Renting a place</option>
            <option value="relocation">Relocation planning</option>
            <option value="investment">Investment property</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-brand-primary" htmlFor="lead-message">
          Message
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={compact ? 3 : 4}
          required
          placeholder="Share your timeline, budget, and what help you need."
          className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text placeholder:text-brand-text/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send request"}
      </Button>

      {submitError ? (
        <p className="text-xs text-red-200" role="alert">
          {submitError}
        </p>
      ) : null}

      <p className="text-[11px] text-brand-text/75">
        By submitting, you agree to our{" "}
        <Link href="/privacy-policy" className="font-medium text-brand-text hover:text-brand-text hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </BubbleCard>
  );
}

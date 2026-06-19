"use client";

import { FormEvent, useState } from "react";
import { BubbleCard } from "@/components/BubbleCard";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    
    // 4. On submit start: setError(null), setSuccess(false)
    setError(null);
    setSuccess(false);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    const trimmedWebsite = website.trim();

    // Client-side validations
    if (!trimmedName) {
      setError("Name is required.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }
    if (!trimmedEmail) {
      setError("Email is required.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }
    if (!trimmedSubject) {
      setError("Subject is required.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }
    if (trimmedSubject.length > 200) {
      setError("Subject must be 200 characters or less.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }
    if (!trimmedMessage) {
      setError("Message is required.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }
    if (trimmedMessage.length > 3000) {
      setError("Message must be 3000 characters or less.");
      setSuccess(false);
      setIsSubmitting(false);
      return;
    }

    // Honeypot check (silently drop spam)
    if (trimmedWebsite !== "") {
      // 5. On successful response (honeypot simulated success):
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      setError(null);
      setSuccess(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage
        })
      });

      let resData: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await response.json().catch(() => ({}));
      } else {
        const textError = await response.text().catch(() => "");
        resData = { success: false, error: textError.slice(0, 150) || `HTTP Error ${response.status}: ${response.statusText}` };
      }

      if (!response.ok || resData.success === false) {
        throw new Error(resData.error || "Form submission failed");
      }

      // 5. On successful API response:
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      setError(null);
      setSuccess(true);
    } catch (err: any) {
      console.error("Contact Form Submission Error:", err);
      // 6. On failed API response:
      setSuccess(false);
      setError(err.message || "We could not send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // 8. If success is true, show only the success message
  if (success) {
    return (
      <BubbleCard className="p-4 text-sm sm:p-5">
        <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 text-xs" role="alert">
          Thank you! Your message has been sent successfully.
        </div>
      </BubbleCard>
    );
  }

  return (
    <BubbleCard as="form" name="contact" method="POST" onSubmit={handleSubmit} className="space-y-4 p-4 text-sm sm:p-5">
      {/* Honeypot field - hidden from users but bots will fill it */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
            required
            maxLength={100}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-brand-primary" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          required
          maxLength={200}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-brand-primary" htmlFor="contact-message">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text placeholder:text-brand-text/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          placeholder="Share a bit about your question, idea, or feedback."
          required
          maxLength={3000}
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>

      {/* 9. If error is null, do not render the red error box */}
      {error !== null ? (
        <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-200 text-xs" role="alert">
          {error}
        </div>
      ) : null}

      <p className="text-[11px] text-brand-text/75">
        Information is for general guidance. We don&apos;t provide legal or financial advice.
      </p>
    </BubbleCard>
  );
}

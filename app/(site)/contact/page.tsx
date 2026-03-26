import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { Button } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with RentX with questions, feedback, or partnership ideas.",
  path: "/contact/"
});

export default function ContactPage() {
  const seoLongform = getStaticSeoLongformContent("contact");

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Contact RentX
        </h1>
        <p className="max-w-2xl text-sm">
          Use this form for support questions, content feedback, and factual corrections.
          For direct contact, email{" "}
          <a href="mailto:support@rentx.us">
            support@rentx.us
          </a>
          .
        </p>
      </BubbleCard>

      <section className="space-y-4">
        <BubbleCard
          as="form"
          name="contact"
          method="POST"
          data-netlify="true"
          className="space-y-4 p-4 text-sm sm:p-5"
        >
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
          <Button type="submit" className="w-full sm:w-auto">
            Send message
          </Button>
          <p className="text-[11px] text-brand-text/75">
            Information is for general guidance. We don&apos;t provide legal or financial advice.
          </p>
        </BubbleCard>
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

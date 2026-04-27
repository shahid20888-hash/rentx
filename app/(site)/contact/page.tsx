import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { ContactForm } from "@/components/ContactForm";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with RentX with questions, feedback, or partnership ideas.",
  path: "/contact/"
});

export default function ContactPage() {
  const seoLongform = getStaticSeoLongformContent("contact");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Contact RentX
        </h1>
        <p className="max-w-3xl text-sm">
          Contact us for support, correction requests, advertising questions, business inquiries, or feedback about the quality of our content and tools.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <h2 className="text-base font-semibold">Contact Information</h2>
        <p>
          Primary email:{" "}
          <a className="underline hover:text-brand-text" href="mailto:support@rentx.us">support@rentx.us</a>
        </p>
        <p>
          We aim to respond to legitimate inquiries within 2-3 business days.
        </p>
        <p>
          Legal and policy requests can also be sent through this channel. Please include relevant page URLs and details for faster review.
        </p>
      </BubbleCard>

      <section className="space-y-4" aria-label="Contact form">
        <h2 className="text-base font-semibold">Send a Message</h2>
        <ContactForm />
      </section>

      <BubbleCard as="section" className="space-y-2 p-6 text-sm">
        <h3 className="text-sm font-semibold">Helpful Links</h3>
        <p>
          Review our <Link className="underline hover:text-brand-text" href="/about">About Us</Link>,{" "}
          <Link className="underline hover:text-brand-text" href="/privacy-policy">Privacy Policy</Link>, and{" "}
          <Link className="underline hover:text-brand-text" href="/terms">Terms &amp; Conditions</Link> before submitting legal or privacy-related requests.
        </p>
      </BubbleCard>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

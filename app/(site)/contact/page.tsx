import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { ContactForm } from "@/components/ContactForm";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";

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
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact-hero.png"
            alt="RentX Support Office Lobby Workspace"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-12 sm:px-10 sm:py-16 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            Get In Touch
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
            Contact RentX support.
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            Contact us for support, correction requests, advertising questions, business inquiries, or general feedback about the quality of our content and tools.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs text-brand-muted/70">
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-stretch">
        {/* Left column form */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-accent">Send us a Message</h2>
          </div>
          <ContactForm />
        </div>

        {/* Right column details */}
        <div className="flex flex-col gap-6">
          <BubbleCard as="section" className="space-y-4 p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-accent font-semibold">Contact Details</h2>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-semibold text-white">Primary Email Address:</p>
              <a className="text-brand-accent hover:text-brand-secondary hover:underline text-sm font-bold block mt-1" href="mailto:support@rentx.us">
                support@rentx.us
              </a>
              <p className="text-brand-muted/80 leading-relaxed pt-2">
                We aim to respond to all legitimate inquiries within 2-3 business days.
              </p>
              <p className="text-brand-muted/80 leading-relaxed">
                Legal and policy requests can also be sent through this channel. Please include relevant page URLs and details for faster review.
              </p>
            </div>
          </BubbleCard>

          <BubbleCard as="section" className="space-y-3 p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-accent font-semibold">Helpful links</h3>
            </div>
            <p className="text-xs text-brand-muted/85 leading-relaxed">
              Review our <Link className="underline hover:text-brand-accent text-brand-text font-medium" href="/about">About Us</Link>,{" "}
              <Link className="underline hover:text-brand-accent text-brand-text font-medium" href="/privacy-policy">Privacy Policy</Link>, and{" "}
              <Link className="underline hover:text-brand-accent text-brand-text font-medium" href="/terms">Terms &amp; Conditions</Link> before submitting legal or privacy-related requests.
            </p>
          </BubbleCard>
        </div>
      </div>

      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Contact RentX",
              description: "Get in touch with the RentX team for inquiries, feedback, or support.",
              path: "/contact/",
              type: "ContactPage"
            })
          )
        }}
      />
    </div>
  );
}

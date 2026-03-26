import type { Metadata } from "next";
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
        <ContactForm />
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

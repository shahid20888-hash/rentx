import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The basic terms for using RentX and its cost-of-living information.",
  path: "/terms/"
});

export default function TermsPage() {
  const seoLongform = getStaticSeoLongformContent("terms");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Terms &amp; Conditions</h1>
        <p className="max-w-3xl text-sm">
          These Terms and Conditions govern your use of RentX, including our comparison pages, guides, and other informational content.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">Acceptance of Terms</h2>
          <p>
            By using this website, you agree to follow these terms, our{" "}
            <Link className="underline hover:text-brand-text" href="/privacy-policy">Privacy Policy</Link>, and related legal pages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Permitted Use</h2>
          <h3 className="text-sm font-semibold text-brand-muted">Lawful and fair use</h3>
          <p>
            You may use RentX for personal research and informational purposes. You agree not to misuse the website, interfere with service operation, or attempt unauthorized access to systems.
          </p>
          <h3 className="text-sm font-semibold text-brand-muted">Independent verification</h3>
          <p>
            Our content is educational and should not be your only source for major financial, housing, legal, or tax decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Content and Liability</h2>
          <p>
            RentX is provided on an &quot;as is&quot; basis. We strive for accuracy but cannot guarantee every figure, estimate, or market condition is complete or current at all times.
          </p>
          <p>
            To the extent permitted by law, RentX and its operators are not liable for losses arising from reliance on site content or links to external resources.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Policy Updates and Jurisdiction</h2>
          <p>
            We may revise these terms as our services evolve. Continued use after changes means you accept the updated terms.
          </p>
          <p>
            These terms are governed by applicable laws in the United States.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Terms & Conditions",
              description: "The basic terms for using RentX and its cost-of-living information.",
              path: "/terms/"
            })
          )
        }}
      />
    </div>
  );
}

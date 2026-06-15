import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description: "How RentX approaches independence, accuracy, and updates for cost-of-living guides.",
  path: "/editorial-policy/"
});

export default function EditorialPolicyPage() {
  const seoLongform = getStaticSeoLongformContent("editorialPolicy");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Editorial Policy</h1>
        <p className="max-w-3xl text-sm">
          This Editorial Policy explains how RentX develops, reviews, updates, and corrects content so readers can trust the quality of our cost-of-living guidance.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">Editorial Principles</h2>
          <h3 className="text-sm font-semibold text-brand-muted">Accuracy and context</h3>
          <p>
            We prioritize factual accuracy and practical context over sensational claims. Figures are presented with clear caveats and methodology notes where relevant.
          </p>
          <h3 className="text-sm font-semibold text-brand-muted">Independence</h3>
          <p>
            Editorial decisions are made independently. Advertising and partnerships do not determine rankings, comparisons, or conclusions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Content Sources and Review</h2>
          <p>
            We rely on reputable data sources such as public records, official reports, and established market datasets. Content is reviewed for clarity, consistency, and compliance before publication.
          </p>
          <p>
            When sponsored content exists, it is clearly identified to avoid confusion between paid placements and independent editorial material.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Corrections and Updates</h2>
          <p>
            If readers report an error, we investigate the claim, verify sources, and publish corrections as needed. Material updates are reflected on the affected page.
          </p>
          <p>
            You can submit correction requests through our{" "}
            <Link className="underline hover:text-brand-text" href={"/contact/" as any}>Contact page</Link>.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Editorial Policy",
              description: "How RentX approaches independence, accuracy, and updates for cost-of-living guides.",
              path: "/editorial-policy/"
            })
          )
        }}
      />
    </div>
  );
}

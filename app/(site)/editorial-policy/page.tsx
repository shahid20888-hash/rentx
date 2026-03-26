import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description: "How RentX approaches independence, accuracy, and updates for cost-of-living guides.",
  path: "/editorial-policy/"
});

export default function EditorialPolicyPage() {
  const seoLongform = getStaticSeoLongformContent("editorialPolicy");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Editorial Policy</h1>
        <p className="max-w-2xl text-sm">
          We aim to present cost-of-living information in a way that is clear, fair, and grounded in transparent assumptions.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          RentX prioritizes clarity over hype. We avoid sensational language and focus on plain explanations of what cost-of-living indices can and cannot tell you about a place.
        </p>
        <p>
          When we update methodologies or assumptions, we work to keep changes consistent across the site so that comparisons remain meaningful over time. Sponsored content, if any, will be clearly labeled.
        </p>
        <p>
          We maintain a corrections process: if a factual issue is reported, we review the source, update the page where needed, and timestamp major edits.
        </p>
        <p>
          Our sources approach emphasizes public data, government publications, market summaries, and transparent methodology notes rather than unverified claims.
        </p>
        <p>
          Feedback from readers and local professionals helps us refine our explanations and spot areas that need clarification or more nuance.
        </p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

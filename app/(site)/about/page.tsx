import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "About RentX",
  description: "Learn how RentX approaches cost-of-living data and independent editorial standards.",
  path: "/about/"
});

export default function AboutPage() {
  const seoLongform = getStaticSeoLongformContent("about");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">About RentX</h1>
        <p className="max-w-2xl text-sm">
          RentX is an independent informational website focused on helping people understand and compare cost-of-living patterns across the United States.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          We publish city and state pages, comparisons, and long-form articles that explain housing, utilities, groceries, transportation, and related costs in plain language.
        </p>
        <p>
          Our data and estimates are used at a high level for research and educational purposes. We provide directional guidance, not personalized financial or legal advice.
        </p>
        <p>
          Editorial standards include clarity, neutrality, regular updates, and correction handling when readers report factual issues.
        </p>
        <p>
          For support, correction requests, or general feedback, contact <a href="mailto:support@rentx.us">support@rentx.us</a>.
        </p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

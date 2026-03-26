import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { INSIGHTS } from "@/lib/insights";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description: "Read in-depth US cost-of-living insights, methods, and planning guides.",
  path: "/insights/"
});

export default function InsightsPage() {
  const insights = [...INSIGHTS].sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  const seoLongform = getStaticSeoLongformContent("insights");

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">RentX Insights</h1>
        <p className="max-w-2xl text-sm">Research-backed cost of living insights.</p>
      </BubbleCard>

      <section className="grid gap-4 md:grid-cols-2">
        {insights.map((item) => (
          <BubbleCard key={item.slug} as="article" className="space-y-3 p-5">
            <h2 className="text-lg font-semibold">{item.meta.title}</h2>
            <p className="text-sm">{item.meta.description}</p>
            <Link href={`/insights/${item.slug}`} className={primaryButtonClass}>
              Read article
            </Link>
          </BubbleCard>
        ))}
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

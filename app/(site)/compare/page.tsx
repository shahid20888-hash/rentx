import type { Metadata } from "next";
import Link from "next/link";
import { getCities } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { Badge } from "@/components/ui/Badge";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Compare city cost of living",
  description: "Compare two cities side by side using cost-of-living indices.",
  path: "/compare/"
});

export default function ComparePage() {
  const cities = getCities();
  const seoLongform = getStaticSeoLongformContent("compare");
  const featuredPairs = cities
    .slice(0, 3)
    .map((city, index) => {
      const other = cities[index + 1];
      return other
        ? {
            label: `${city.cityName} vs ${other.cityName}`,
            pair: `${city.slug}-vs-${other.slug}`
          }
        : null;
    })
    .filter(Boolean) as { label: string; pair: string }[];

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Compare city cost of living
        </h1>
        <p className="max-w-2xl text-sm">
          Open a comparison page to see index differences and a quick direction on which city is more expensive.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="p-5">
        <h2 className="mb-3 text-sm font-semibold">Featured comparisons</h2>
        <div className="flex flex-wrap gap-2">
          {featuredPairs.map((pair) => (
            <Link key={pair.pair} href={`/compare/${pair.pair}`}><Badge>{pair.label}</Badge></Link>
          ))}
        </div>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

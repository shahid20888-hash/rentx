import type { Metadata } from "next";
import Link from "next/link";
import { getCities } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { Badge } from "@/components/ui/Badge";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare" }
        ]}
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/compare-hero.png"
            alt="RentX City Cost Comparison Models"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-12 sm:px-10 sm:py-16 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            Compare Tool
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
            Compare City Cost of Living
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            Open a comparison page to see index differences and a quick direction on which city is more expensive.
          </p>
        </div>
      </div>

      <BubbleCard as="section" className="p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm space-y-4">
        <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-accent">Featured city comparisons</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 pt-2">
          {featuredPairs.map((pair) => (
            <Link 
              key={pair.pair} 
              href={`/compare/${pair.pair}/` as any}
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-brand-secondary/10 hover:border-brand-secondary/35 text-brand-text hover:text-brand-accent transition-all duration-300 group/btn shadow-sm"
            >
              <span className="text-sm font-semibold">{pair.label}</span>
              <span className="text-xs text-brand-secondary group-hover/btn:translate-x-1 transition-transform duration-200 font-bold">-&gt;</span>
            </Link>
          ))}
        </div>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Compare City Cost of Living",
              description: "Compare two cities side by side using cost-of-living indices.",
              path: "/compare/"
            })
          )
        }}
      />
    </div>
  );
}

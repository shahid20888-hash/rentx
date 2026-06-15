import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { INSIGHTS } from "@/lib/insights";
import { BubbleCard } from "@/components/BubbleCard";
import { InsightsGrid } from "@/components/InsightsGrid";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description: "Read in-depth US cost-of-living insights, methods, and planning guides.",
  path: "/insights/"
});

export default function InsightsPage() {
  // Map and sort the insights metadata by date descending
  const insights = [...INSIGHTS]
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .map((insight) => insight.meta);
    
  const seoLongform = getStaticSeoLongformContent("insights");
  const lastUpdated = "June 15, 2026";

  return (
    <div className="space-y-8">
      {/* Premium Hero Banner */}
      <BubbleCard as="header" className="relative overflow-hidden p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-brand-bg via-[#11322a] to-brand-bg shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            RentX Journal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            RentX Insights & Analysis
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            Data-backed editorial insights, relocation guides, and local market analysis helping you navigate the cost of living across the United States.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs text-brand-muted/70">
            <span>By RentX Editorial Team</span>
            <span>&bull;</span>
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </BubbleCard>

      {/* Interactive Grid Component */}
      <InsightsGrid insights={insights} />

      <SeoLongform {...seoLongform} />
    </div>
  );
}

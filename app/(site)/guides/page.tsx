import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";
import { BubbleCard } from "@/components/BubbleCard";
import { GuidesGrid } from "@/components/GuidesGrid";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Cost of living guides",
  description: "Practical guides for reading cost-of-living data and planning moves.",
  path: "/guides/"
});

export default function GuidesPage() {
  // Map and sort the guides metadata by date descending
  const guides = [...GUIDES]
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .map((guide) => guide.meta);
    
  const seoLongform = getStaticSeoLongformContent("guides");
  const lastUpdated = "June 15, 2026";

  return (
    <div className="space-y-8">
      {/* Premium Hero Banner */}
      <BubbleCard as="header" className="relative overflow-hidden p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-brand-bg via-[#11322a] to-brand-bg shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative space-y-4 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            RentX Academy
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Cost of Living Guides
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            Practical, step-by-step guides written to help you plan moving logistics, check real rental affordability, and avoid common budgeting mistakes.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs text-brand-muted/70">
            <span>By RentX Research Team</span>
            <span>&bull;</span>
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </BubbleCard>

      {/* Interactive Grid Component */}
      <GuidesGrid guides={guides} />

      <SeoLongform {...seoLongform} />
    </div>
  );
}

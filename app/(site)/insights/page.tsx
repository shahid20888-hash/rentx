import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { INSIGHTS } from "@/lib/insights";
import { BubbleCard } from "@/components/BubbleCard";
import { InsightsGrid } from "@/components/InsightsGrid";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Insights" }
        ]}
      />
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/insights-hero.png"
            alt="RentX Cost of Living Insights Library"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-12 sm:px-10 sm:py-16 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            RentX Journal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
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
      </div>

      {/* Interactive Grid Component */}
      <InsightsGrid insights={insights} />

      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "RentX Insights & Analysis",
              description: "Read in-depth US cost-of-living insights, methods, and planning guides.",
              path: "/insights/"
            })
          )
        }}
      />
    </div>
  );
}

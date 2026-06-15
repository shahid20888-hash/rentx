import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";
import { BubbleCard } from "@/components/BubbleCard";
import { GuidesGrid } from "@/components/GuidesGrid";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides" }
        ]}
      />
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/guides-hero.png"
            alt="RentX Cost of Living Guides Library"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-12 sm:px-10 sm:py-16 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            RentX Academy
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
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
      </div>

      {/* Interactive Grid Component */}
      <GuidesGrid guides={guides} />

      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Cost of living guides",
              description: "Practical guides for reading cost-of-living data and planning moves.",
              path: "/guides/"
            })
          )
        }}
      />
    </div>
  );
}

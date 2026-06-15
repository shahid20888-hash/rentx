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
  const lastUpdated = "June 15, 2026";

  return (
    <div className="space-y-8">
      <BubbleCard as="header" className="space-y-3 p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">RentX Insights</h1>
        <p className="max-w-2xl text-sm">
          Research-backed analysis focused on U.S. affordability trends, relocation planning, and transparent methodology notes.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      {/* Featured Insight (Top Article) */}
      {insights.length > 0 && (
        <BubbleCard as="article" className="overflow-hidden p-0 rounded-3xl border border-brand-border bg-brand-surface">
          <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] items-stretch">
            <div className="relative min-h-[240px] md:min-h-full overflow-hidden">
              <img
                src={insights[0].meta.coverImage}
                alt={insights[0].meta.coverAlt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-8 space-y-4">
              <div className="space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C78B5E] bg-[#C78B5E]/10 px-2.5 py-1 rounded-full">
                  Featured Insight
                </span>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-brand-text">
                  {insights[0].meta.title}
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted">
                  {insights[0].meta.description}
                </p>
              </div>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-brand-border/40">
                <span className="text-[11px] text-brand-muted">
                  By {insights[0].meta.author ?? "Shahid Saleem"} &bull; {insights[0].meta.date}
                </span>
                <Link href={`/insights/${insights[0].slug}`} className={primaryButtonClass}>
                  Read article -&gt;
                </Link>
              </div>
            </div>
          </div>
        </BubbleCard>
      )}

      {/* Recent Insights Grid */}
      {insights.length > 1 && (
        <section aria-label="Recent insights" className="space-y-4">
          <h2 className="text-lg font-semibold text-brand-primary">More insights</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insights.slice(1).map((item) => (
              <BubbleCard key={item.slug} as="article" className="overflow-hidden p-0 rounded-2xl flex flex-col justify-between border border-brand-border bg-brand-surface">
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={item.meta.coverImage}
                    alt={item.meta.coverAlt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold tracking-tight text-brand-text line-clamp-2">
                      {item.meta.title}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-3">
                      {item.meta.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-brand-border/40">
                    <span className="text-[10px] text-brand-muted">
                      {item.meta.date}
                    </span>
                    <Link href={`/insights/${item.slug}`} className={primaryButtonClass}>
                      Read article -&gt;
                    </Link>
                  </div>
                </div>
              </BubbleCard>
            ))}
          </div>
        </section>
      )}

      <SeoLongform {...seoLongform} />
    </div>
  );
}

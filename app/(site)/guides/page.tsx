import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Cost of living guides",
  description: "Practical guides for reading cost-of-living data and planning moves.",
  path: "/guides/"
});

export default function GuidesPage() {
  const guides = [...GUIDES].sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
  const seoLongform = getStaticSeoLongformContent("guides");
  const lastUpdated = "June 15, 2026";

  return (
    <div className="space-y-8">
      <BubbleCard as="header" className="space-y-3 p-6 sm:p-8">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Cost of living guides</h1>
        <p className="max-w-2xl text-sm">
          Practical, plain-language guides designed to help readers evaluate relocation costs and avoid common budgeting mistakes.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <section aria-label="Guides" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <BubbleCard key={guide.slug} as="article" className="overflow-hidden p-0 rounded-2xl flex flex-col justify-between border border-brand-border bg-brand-surface">
            {guide.meta.coverImage && (
              <div className="relative h-[160px] overflow-hidden">
                <img
                  src={guide.meta.coverImage}
                  alt={guide.meta.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="text-base font-semibold tracking-tight text-brand-text line-clamp-2">
                  <Link href={`/guides/${guide.slug}`} className="hover:underline">
                    {guide.meta.title}
                  </Link>
                </h2>
                <p className="text-xs text-brand-muted line-clamp-3">
                  {guide.meta.description}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between border-t border-brand-border/40">
                <span className="text-[10px] text-brand-muted">
                  {guide.meta.date}
                </span>
                <Link href={`/guides/${guide.slug}`} className={primaryButtonClass}>
                  Read guide -&gt;
                </Link>
              </div>
            </div>
          </BubbleCard>
        ))}
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

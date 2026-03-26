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

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Cost of living guides</h1>
      </BubbleCard>

      <section aria-label="Guides" className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <BubbleCard key={guide.slug} as="article" className="flex flex-col justify-between p-5 text-sm">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold">
                <Link href={`/guides/${guide.slug}`}>{guide.meta.title}</Link>
              </h2>
              <p className="text-xs">{guide.meta.description}</p>
            </div>
            <div className="mt-3">
              <Link href={`/guides/${guide.slug}`} className={primaryButtonClass}>
                Read guide -&gt;
              </Link>
            </div>
          </BubbleCard>
        ))}
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BubbleCard } from "@/components/BubbleCard";
import { FAQ } from "@/components/FAQ";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getInsightBySlug, INSIGHTS } from "@/lib/insights";
import { resolveArticleDateLabel } from "@/lib/date";

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) {
    return { title: "Insight not found" };
  }
  return buildMetadata({
    title: insight.meta.title,
    description: insight.meta.description,
    path: `/insights/${insight.slug}/`,
    imagePath: insight.meta.coverImage
  });
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) {
    notFound();
  }

  const Article = insight.Component;
  const author = insight.meta.author ?? "Shahid Saleem";
  // Byline date source is centralized to prevent hardcoded month drift.
  const formattedDate = resolveArticleDateLabel(
    insight.meta.updatedAt,
    insight.meta.publishedAt ?? insight.meta.date
  );
  const coverImage = insight.meta.coverImage;

  const schema = articleSchema({
    title: insight.meta.title,
    description: insight.meta.description,
    slug: insight.slug,
    datePublished: insight.meta.date,
    dateModified: insight.meta.updatedAt,
    section: "insights"
  });

  const faqItems = [
    {
      question: "How should I apply these insights?",
      answer:
        "Use them as planning guidance, then validate assumptions with current local listings, taxes, and provider quotes."
    },
    {
      question: "Do these figures guarantee my monthly outcome?",
      answer:
        "No. Actual results vary by household size, neighborhood, commute, insurance profile, and service choices."
    },
    {
      question: "Is this legal, tax, or financial advice?",
      answer: "No. RentX publishes informational content only."
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights/" as any },
          { label: insight.meta.title }
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <BubbleCard as="header" className="space-y-3 p-6">
            <p className="text-xs uppercase tracking-wide text-brand-text/70">Insight</p>
            <h1 className="text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl">{insight.meta.title}</h1>
            <p className="text-xs text-brand-text/75">By {author} {"\u2022"} {formattedDate}</p>
            <p className="text-sm text-brand-text/85">{insight.meta.description}</p>
          </BubbleCard>

          <BubbleCard className="overflow-hidden p-2">
            <Image
              src={coverImage}
              alt={insight.meta.coverAlt}
              width={1200}
              height={675}
              className="w-full h-auto rounded-2xl border shadow-sm object-cover"
              priority={false}
              loading="lazy"
            />
            <p className="mt-2 px-1 text-xs text-brand-muted">
              {insight.meta.coverCaption}
            </p>
          </BubbleCard>

          <BubbleCard as="article" className="p-6 sm:p-8">
            <div className="mdx-prose">
              <Article />
            </div>
          </BubbleCard>
        </div>

        <div className="space-y-4 xl:sticky xl:top-24">
          <BubbleCard as="aside" className="h-fit space-y-2 p-5 border border-brand-border bg-brand-surface">
            <h2 className="text-sm font-semibold text-brand-primary">On this page</h2>
            <ul className="space-y-1 text-xs text-brand-text/85">
              <li><a href="#frequently-asked-questions" className="hover:underline">Frequently asked questions</a></li>
              <li><a href="#sources-and-methodology" className="hover:underline">Sources and methodology</a></li>
            </ul>
          </BubbleCard>

          <BubbleCard as="aside" className="h-fit space-y-3 p-5 border border-brand-border bg-brand-surface">
            <h2 className="text-sm font-semibold text-brand-primary">Useful tools</h2>
            <ul className="space-y-3.5 text-xs text-brand-text/85">
              <li>
                <Link href={"/compare/" as any} className="font-semibold hover:underline text-brand-secondary block mb-0.5">
                  Compare City Costs
                </Link>
                <p className="text-[10px] text-brand-muted leading-relaxed">Run side-by-side budgeting comparisons.</p>
              </li>
              <li>
                <Link href={"/states/" as any} className="font-semibold hover:underline text-brand-secondary block mb-0.5">
                  State Explorer
                </Link>
                <p className="text-[10px] text-brand-muted leading-relaxed">Compare index averages across states.</p>
              </li>
              <li>
                <Link href={"/cities/" as any} className="font-semibold hover:underline text-brand-secondary block mb-0.5">
                  City Explorer
                </Link>
                <p className="text-[10px] text-brand-muted leading-relaxed">Browse detailed costs for 20+ major metros.</p>
              </li>
              <li>
                <Link href={"/find-a-pro/" as any} className="font-semibold hover:underline text-brand-secondary block mb-0.5">
                  Find a Local Pro
                </Link>
                <p className="text-[10px] text-brand-muted leading-relaxed">Connect with moving and rental experts.</p>
              </li>
            </ul>
          </BubbleCard>
        </div>
      </div>

      <FAQ items={faqItems} heading="Insight FAQs" />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Insights", url: "/insights/" },
              { name: insight.meta.title, url: `/insights/${insight.slug}/` }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }}
      />
    </div>
  );
}


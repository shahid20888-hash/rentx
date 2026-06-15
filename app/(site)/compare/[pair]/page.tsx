import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCities } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";
import { LeadForm } from "@/components/LeadForm";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { SeoLongform } from "@/components/SeoLongform";
import { buildCompareSeoLongform } from "@/lib/seoLongformContent";

type ComparePairPageProps = {
  params: Promise<{ pair: string }>;
};

export function generateStaticParams() {
  const cities = getCities();
  return cities.flatMap((city) =>
    cities
      .filter((other) => other.slug !== city.slug)
      .map((other) => ({ pair: `${city.slug}-vs-${other.slug}` }))
  );
}

export async function generateMetadata({ params }: ComparePairPageProps): Promise<Metadata> {
  const { pair } = await params;
  const [fromSlug, toSlug] = pair.split("-vs-");
  const cities = getCities();
  const from = cities.find((city) => city.slug === fromSlug);
  const to = cities.find((city) => city.slug === toSlug);

  if (!from || !to) {
    return { title: "Comparison not found" };
  }

  return buildMetadata({
    title: `${from.cityName}, ${from.stateCode} vs ${to.cityName}, ${to.stateCode} Cost of Living Comparison`,
    description: `Compare cost of living, rent, home prices, utility bills, grocery costs, transportation, and healthcare between ${from.cityName}, ${from.stateCode} and ${to.cityName}, ${to.stateCode}.`,
    path: `/compare/${pair}/`
  });
}

export default async function ComparePairPage({ params }: ComparePairPageProps) {
  const { pair } = await params;
  const [fromSlug, toSlug] = pair.split("-vs-");
  const cities = getCities();
  const from = cities.find((city) => city.slug === fromSlug);
  const to = cities.find((city) => city.slug === toSlug);

  if (!from || !to) {
    notFound();
  }

  const seoLongform = buildCompareSeoLongform(from, to);

  const overallDiff = to.indices.overall - from.indices.overall;
  const rentDiff = Math.round(((to.indices.rent - from.indices.rent) / from.indices.rent) * 100);

  const categories = [
    { key: "overall" as const, label: "Overall Cost of Living" },
    { key: "rent" as const, label: "Rent Index" },
    { key: "homePrice" as const, label: "Home Price Index" },
    { key: "utilities" as const, label: "Utilities" },
    { key: "groceries" as const, label: "Groceries" },
    { key: "transport" as const, label: "Transportation" },
    { key: "healthcare" as const, label: "Healthcare" }
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: `${from.cityName} vs ${to.cityName}` }
        ]}
      />

      {/* Hero Header */}
      <BubbleCard as="header" className="relative overflow-hidden p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-brand-surface shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            Compare Cities
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
            Cost of Living: {from.cityName}, {from.stateCode} vs {to.cityName}, {to.stateCode}
          </h1>
          <p className="text-sm text-brand-muted max-w-3xl leading-relaxed">
            Analyzing index metrics between {from.cityName} and {to.cityName} relative to the US average baseline (100).
            {overallDiff === 0
              ? ` Both cities have identical overall index scores.`
              : overallDiff > 0
                ? ` ${to.cityName} is estimated to be ${overallDiff}% more expensive overall than ${from.cityName}.`
                : ` ${from.cityName} is estimated to be ${Math.abs(overallDiff)}% more expensive overall than ${to.cityName}.`}
            {rentDiff === 0
              ? ` Rent costs are roughly equivalent in both cities.`
              : rentDiff > 0
                ? ` Rental housing in ${to.cityName} runs about ${rentDiff}% higher than in ${from.cityName}.`
                : ` Rental housing in ${to.cityName} runs about ${Math.abs(rentDiff)}% lower than in ${from.cityName}.`}
          </p>
        </div>
      </BubbleCard>

      {/* Comparison Table */}
      <section aria-label="Index breakdown" className="space-y-4">
        <h2 className="text-base font-semibold text-brand-primary">Side-by-Side Index Breakdown</h2>
        <BubbleCard className="overflow-hidden border border-brand-border bg-brand-surface">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm text-brand-text">
              <thead>
                <tr className="border-b border-brand-border bg-white/[0.02]">
                  <th className="p-4 font-semibold text-brand-primary">Index Category</th>
                  <th className="p-4 font-semibold text-brand-primary text-center">{from.cityName}, {from.stateCode}</th>
                  <th className="p-4 font-semibold text-brand-primary text-center">{to.cityName}, {to.stateCode}</th>
                  <th className="p-4 font-semibold text-brand-primary text-right">Difference for {to.cityName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/60">
                {categories.map((cat) => {
                  const valFrom = from.indices[cat.key];
                  const valTo = to.indices[cat.key];
                  const relDiff = Math.round(((valTo - valFrom) / valFrom) * 100);

                  let badge;
                  if (relDiff > 0) {
                    badge = (
                      <span className="inline-flex items-center rounded-full bg-[#C78B5E]/10 border border-[#C78B5E]/20 px-2.5 py-1 text-[11px] font-bold text-[#C78B5E]">
                        +{relDiff}%
                      </span>
                    );
                  } else if (relDiff < 0) {
                    badge = (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-400">
                        {relDiff}%
                      </span>
                    );
                  } else {
                    badge = (
                      <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-bold text-brand-muted">
                        Same
                      </span>
                    );
                  }

                  return (
                    <tr key={cat.key} className="hover:bg-white/[0.01] transition-colors">
                      <td className="p-4 font-medium text-brand-primary">{cat.label}</td>
                      <td className="p-4 text-center font-mono">{valFrom}</td>
                      <td className="p-4 text-center font-mono">{valTo}</td>
                      <td className="p-4 text-right">{badge}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </BubbleCard>
      </section>

      {/* Individual City Profile Cards */}
      <section aria-label="City summaries" className="grid gap-6 md:grid-cols-2">
        {[from, to].map((city) => (
          <BubbleCard key={city.slug} className="p-6 flex flex-col justify-between space-y-4 border border-brand-border bg-brand-surface">
            <div className="space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted bg-white/5 px-2 py-1 rounded">
                Profile
              </span>
              <h3 className="text-lg font-bold text-white">
                {city.cityName}, {city.stateCode}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Read a complete breakdown of rent distributions, home pricing indexes, utility rates, and local services in {city.cityName}.
              </p>
            </div>
            <div className="pt-2">
              <Link href={`/city/${city.slug}`} className={`w-full text-center ${primaryButtonClass}`}>
                Explore {city.cityName} Profile
              </Link>
            </div>
          </BubbleCard>
        ))}
      </section>

      {/* Relocation Request Form */}
      <section aria-label="Expert relocation support" className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-stretch">
        <BubbleCard className="p-6 sm:p-8 flex flex-col justify-center space-y-4 border border-brand-border bg-gradient-to-br from-brand-surface to-transparent">
          <h3 className="text-lg font-bold text-white">Planning a move between these cities?</h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Cost of living indexes provide a directional guide, but real rent rates, local tax regulations, and commute patterns fluctuate by neighborhood.
          </p>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            Connect with a local RentX network professional to request current rental listings, real estate market guides, and personalized transition assistance.
          </p>
        </BubbleCard>
        <LeadForm city={from.slug} state={from.stateCode} compact />
      </section>
      
      <SeoLongform {...seoLongform} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: `${from.cityName}, ${from.stateCode} vs ${to.cityName}, ${to.stateCode} Cost of Living Comparison`,
              description: `Compare cost of living, rent, home prices, utility bills, grocery costs, transportation, and healthcare between ${from.cityName}, ${from.stateCode} and ${to.cityName}, ${to.stateCode}.`,
              path: `/compare/${pair}/`
            })
          )
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Compare", url: "/compare/" },
              { name: `${from.cityName} vs ${to.cityName}`, url: `/compare/${pair}/` }
            ])
          )
        }}
      />
    </div>
  );
}

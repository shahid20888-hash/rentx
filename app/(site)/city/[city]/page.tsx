import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCities, getCitiesByStateSlug, getCityBySlug, getProsByCitySlug, getStateBySlug } from "@/lib/data";
import { Callout } from "@/components/Callout";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { cityPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { StatPills } from "@/components/StatPills";
import { CostBreakdownTable } from "@/components/CostBreakdownTable";
import { BudgetEstimator } from "@/components/BudgetEstimator";
import { InternalLinks } from "@/components/InternalLinks";
import { LeadForm } from "@/components/LeadForm";
import { GUIDES } from "@/lib/guides";
import { BubbleCard } from "@/components/BubbleCard";
import { Badge } from "@/components/ui/Badge";
import { primaryButtonClass } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { buildCitySeoLongform } from "@/lib/seoLongformContent";

export const dynamicParams = false;

type CityPageProps = {
  params: Promise<{
    city: string;
  }>;
};

export function generateStaticParams() {
  return getCities().map((city) => ({
    city: city.slug
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) {
    return { title: "City not found" };
  }

  return buildMetadata({
    title: `${city.cityName}, ${city.stateCode} cost of living`,
    description: `Cost of living breakdown for ${city.cityName}, ${city.stateCode}.`,
    path: `/city/${city.slug}/`
  });
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) {
    notFound();
  }

  const { indices } = city;
  const citySchema = cityPageSchema(city);
  const state = getStateBySlug(city.stateSlug);
  const nearby = getCitiesByStateSlug(city.stateSlug).filter((item) => item.slug !== city.slug);
  const cityPros = getProsByCitySlug(city.slug).slice(0, 8);

  const nearbyCities = nearby.slice(0, 4).map((item) => ({
    label: `${item.cityName}, ${item.stateCode}`,
    slug: item.slug
  }));

  const guideLinks = GUIDES.slice(0, 3).map((guide) => ({
    title: guide.meta.title,
    slug: guide.slug
  }));

  const compareLinks = nearby.slice(0, 3).map((item) => ({
    label: `${city.cityName} vs ${item.cityName}`,
    pair: `${city.slug}-vs-${item.slug}`
  }));
  const seoLongform = buildCitySeoLongform(city, state, nearby);

  const relatedArticles: { title: string; href: string }[] = [];
  if (city.slug === "dallas-tx") {
    relatedArticles.push({
      title: "Salary Needed to Live Comfortably in Dallas, TX in 2026",
      href: "/insights/salary-needed-to-live-comfortably-in-dallas-tx-2026/"
    });
  }
  if (city.slug === "houston-tx") {
    relatedArticles.push({
      title: "Houston Cost of Living for a Family of Four in 2026",
      href: "/insights/houston-cost-of-living-family-of-four-2026/"
    });
  }
  if (city.slug === "los-angeles-ca" || city.slug === "san-francisco-ca") {
    relatedArticles.push({
      title: "California to Texas Moving Cost in 2026: Budget, Hidden Fees, and City Checks",
      href: "/insights/california-to-texas-moving-cost-2026/"
    });
  }
  if (["chicago-il", "phoenix-az", "dallas-tx", "los-angeles-ca"].includes(city.slug)) {
    relatedArticles.push({
      title: "How Much Rent Can I Afford on $75K a Year in 2026?",
      href: "/guides/how-much-rent-can-i-afford-75000-salary/"
    });
  }

  const faqs = [
    {
      question: `What does the overall cost-of-living index for ${city.cityName} mean?`,
      answer: `An index of ${indices.overall} means costs in ${city.cityName} are approximately ${Math.abs(
        indices.overall - 100
      )}% ${indices.overall >= 100 ? "higher" : "lower"} than the US average baseline of 100.`
    },
    {
      question: `How should I use rent and home price indices in ${city.cityName}?`,
      answer: "Use these numbers as directional planning inputs, then verify with live listings and local professionals."
    },
    {
      question: "Are these numbers a quote or financial advice?",
      answer: "No. These are educational estimates and should be paired with current market research."
    }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities/" as any },
          { label: `${city.cityName}, ${city.stateCode}` }
        ]}
      />

      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Cost of living in {city.cityName}, {city.stateCode}
        </h1>
        <p className="max-w-2xl text-sm">
          Cost of living breakdown for {city.cityName}, {city.stateCode}.
        </p>
        <StatPills
          overall={indices.overall}
          rent={indices.rent}
          homePrice={indices.homePrice}
          utilities={indices.utilities}
        />
      </BubbleCard>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)]">
        <div className="space-y-3">
          <BubbleCard as="section" className="flex h-48 flex-col justify-between border-brand-border bg-brand-surface p-4 text-xs sm:h-56">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-brand-primary">Map preview</h2>
            </div>
            <div className="space-y-1 rounded-2xl border border-brand-border bg-brand-bg p-3 text-xs text-brand-text/85">
              <p className="font-medium text-brand-primary">
                {city.cityName}, {city.stateCode}
              </p>
              <p>Latitude: <span className="font-mono">{city.lat}</span></p>
              <p>Longitude: <span className="font-mono">{city.lng}</span></p>
            </div>
          </BubbleCard>
          <CostBreakdownTable indices={indices} />
        </div>
        <BudgetEstimator cityName={city.cityName} stateCode={city.stateCode} overallIndex={indices.overall} />
      </section>

      <section aria-label="Local real estate pros" className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-brand-primary">
            Local real estate pros in {city.cityName}
          </h2>
          <Link
            href={`/find-a-pro/?city=${encodeURIComponent(city.slug)}` as any}
            className={primaryButtonClass}
          >
            Request local help
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {cityPros.length === 0 ? (
            <p className="text-sm text-brand-text/80">We are adding local professionals for this city.</p>
          ) : (
            cityPros.map((pro) => (
              <BubbleCard key={pro.id} as="article" className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold">{pro.name}</h3>
                  <Badge>{pro.type}</Badge>
                </div>
                <p className="mt-2 text-xs">{pro.address}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <a href={`tel:${pro.phone}`}><Badge>{pro.phone}</Badge></a>
                  <a href={`mailto:${pro.email}`}><Badge>Email</Badge></a>
                  <a href={pro.website} target="_blank" rel="noreferrer"><Badge>Website</Badge></a>
                </div>
              </BubbleCard>
            ))
          )}
        </div>
      </section>

      {state && (
        <InternalLinks
          kind="city"
          stateSlug={state.slug}
          stateName={state.name}
          citySlug={city.slug}
          nearbyCities={nearbyCities}
          guideLinks={guideLinks}
          compareLinks={compareLinks}
        />
      )}

      <section className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Callout title="Use this as a planning baseline" tone="warning">
          Local pricing can shift fast. Verify current listings, tax rates, and neighborhood conditions before final decisions.
        </Callout>
        <LeadForm city={city.slug} state={city.stateCode} compact />
      </section>

      <FAQ items={faqs} />

      {relatedArticles.length > 0 && (
        <section aria-label="Related insights" className="space-y-3">
          <h2 className="text-sm font-semibold text-brand-primary">Related articles & guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedArticles.map((art) => (
              <BubbleCard key={art.href} className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-brand-primary mb-2">{art.title}</h3>
                </div>
                <div className="mt-3">
                  <Link href={art.href as any} className={primaryButtonClass}>
                    Read article -&gt;
                  </Link>
                </div>
              </BubbleCard>
            ))}
          </div>
        </section>
      )}

      {/* Cross-city Comparison Grid Directory */}
      <section aria-label="Compare with other cities" className="space-y-3 pt-2">
        <h2 className="text-sm font-semibold text-brand-primary">Compare {city.cityName} with other U.S. cities</h2>
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-[11px]">
          {getCities()
            .filter((c) => c.slug !== city.slug)
            .map((c) => {
              const pair = `${city.slug}-vs-${c.slug}`;
              return (
                <Link
                  key={pair}
                  href={`/compare/${pair}/` as any}
                  className="p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-brand-secondary/10 hover:border-brand-secondary/35 transition-all text-brand-text hover:text-brand-accent text-center font-medium block shadow-sm"
                >
                  {city.cityName} vs {c.cityName}
                </Link>
              );
            })}
        </div>
      </section>

      <SeoLongform {...seoLongform} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Cities", url: "/cities/" },
              { name: `${city.cityName}, ${city.stateCode}`, url: `/city/${city.slug}/` }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
    </div>
  );
}

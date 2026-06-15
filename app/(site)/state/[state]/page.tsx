import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { primaryButtonClass } from "@/components/ui/Button";
import { getStateBySlug, getCitiesByStateSlug, getStates } from "@/lib/data";
import { CityCard } from "@/components/CityCard";
import { Callout } from "@/components/Callout";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { GUIDES } from "@/lib/guides";
import { InternalLinks } from "@/components/InternalLinks";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { buildStateSeoLongform } from "@/lib/seoLongformContent";
import { statePageSchema } from "@/lib/schema";

type StatePageProps = {
  params: Promise<{
    state: string;
  }>;
};

export function generateStaticParams() {
  return getStates().map((state) => ({
    state: state.slug
  }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) {
    return { title: "State not found" };
  }

  return buildMetadata({
    title: `${state.name} cost of living`,
    description: `Cost of living overview and major city comparisons in ${state.name}.`,
    path: `/state/${state.slug}/`
  });
}

export default async function StatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const cities = getCitiesByStateSlug(state.slug);
  const topCities = cities.slice(0, 6).map((city) => ({
    label: `${city.cityName}, ${city.stateCode}`,
    slug: city.slug
  }));
  const guides = GUIDES.slice(0, 3).map((guide) => ({
    title: guide.meta.title,
    slug: guide.slug
  }));
  const seoLongform = buildStateSeoLongform(state, cities);
  const stateSchema = statePageSchema(state, cities);

  const relatedArticles: { title: string; href: string }[] = [];
  if (state.slug === "texas" || state.slug === "california") {
    relatedArticles.push({
      title: "California to Texas Moving Cost in 2026: Budget, Hidden Fees, and City Checks",
      href: "/insights/california-to-texas-moving-cost-2026/"
    });
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "States", href: "/states" },
          { label: state.name }
        ]}
      />
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-brand-primary sm:text-3xl">
          Cost of living in {state.name}
        </h1>
        <p className="max-w-2xl text-sm text-brand-text/85">
          Compare major cities in {state.name} and use city pages for detailed housing, utilities, groceries, and transportation context.
        </p>
      </BubbleCard>

      <section aria-label="Cities in this state" className="space-y-3">
        <h2 className="text-sm font-semibold text-brand-primary">Top cities in {state.name}</h2>
        {cities.length === 0 ? (
          <p className="text-sm text-brand-text/80">We are adding city-level data for this state.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard
                key={city.slug}
                name={city.cityName}
                stateCode={city.stateCode}
                slug={city.slug}
                summary={`Cost of living breakdown for ${city.cityName}, ${city.stateCode}.`}
                costIndex={city.indices.overall}
              />
            ))}
          </div>
        )}
      </section>

      <InternalLinks kind="state" stateName={state.name} topCities={topCities} guideLinks={guides} />

      <section className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        <Callout title="Need local context?" tone="success">
          A local expert can help you compare neighborhood-level rent, taxes, commute costs, and schools before you decide.
        </Callout>
        <LeadForm city={state.slug} state={state.code} compact />
      </section>

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

      <SeoLongform {...seoLongform} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stateSchema) }}
      />
    </div>
  );
}

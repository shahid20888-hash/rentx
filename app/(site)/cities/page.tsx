import type { Metadata } from "next";
import { getCities } from "@/lib/data";
import { CityCard } from "@/components/CityCard";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Cities",
  description: "Browse US cities and compare cost-of-living breakdowns.",
  path: "/cities/"
});

export default function CitiesPage() {
  const cities = getCities();
  const seoLongform = getStaticSeoLongformContent("cities");

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Explore cost of living by city
        </h1>
        <p className="max-w-2xl text-sm">
          These city profiles use a simple index where 100 represents the estimated US average cost
          of living. Higher numbers mean relatively more expensive, and lower numbers mean relatively
          less expensive.
        </p>
      </BubbleCard>

      <section aria-label="Cities" className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

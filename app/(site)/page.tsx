import Link from "next/link";
import type { Metadata } from "next";
import { getCities, getStates } from "@/lib/data";
import { getLatestGuides } from "@/lib/guides";
import { CityCard } from "@/components/CityCard";
import { StateCard } from "@/components/StateCard";
import { SearchBar } from "@/components/SearchBar";
import { CompareWidget } from "@/components/CompareWidget";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "US cost of living made simple",
  description: "Compare US city and state living costs with clear, practical breakdowns.",
  path: "/"
});

export default function HomePage() {
  const cities = getCities();
  const states = getStates();
  const popularCities = cities.slice(0, 12);
  const popularStates = states.slice(0, 12);
  const latestGuides = getLatestGuides(3);
  const seoLongform = getStaticSeoLongformContent("home");

  return (
    <div className="space-y-10">
      <BubbleCard as="section" className="space-y-6 px-5 py-10 sm:px-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Understand what it costs to live in your next city.
            </h1>
            <p className="max-w-2xl text-sm">
              RentX provides clear cost-of-living comparisons for cities and states, so you can plan moves and budgets with confidence.
            </p>
          </div>
          <div className="max-w-xl"><SearchBar /></div>
        </div>
      </BubbleCard>

      <section aria-label="Popular cities" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold">Popular cities</h2>
          </div>
          <Link href="/cities" className="text-xs font-medium text-brand-text hover:text-brand-text hover:underline">
            View all cities -&gt;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularCities.map((city) => (
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
      </section>

      <section aria-label="Popular states" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold">Popular states</h2>
          </div>
          <Link href="/states" className="text-xs font-medium text-brand-text hover:text-brand-text hover:underline">
            View all states -&gt;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularStates.map((state) => (
            <StateCard
              key={state.slug}
              name={state.name}
              code={state.code}
              slug={state.slug}
              summary={`Cost of living overview for ${state.name} including major metro areas.`}
            />
          ))}
        </div>
      </section>

      <CompareWidget cities={cities} />

      <section aria-label="Latest guides" className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold">Latest guides</h2>
          </div>
          <Link href="/guides" className="text-xs font-medium text-brand-text hover:text-brand-text hover:underline">
            View all guides -&gt;
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestGuides.map((guide) => (
            <BubbleCard key={guide.slug} as="article" className="flex flex-col justify-between p-5 text-sm">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">{guide.title}</h3>
                <p className="text-xs">{guide.description}</p>
              </div>
              <div className="mt-3">
                <Link href={`/guides/${guide.slug}`} className={primaryButtonClass}>
                  Read guide -&gt;
                </Link>
              </div>
            </BubbleCard>
          ))}
        </div>
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

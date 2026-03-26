import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { buildMetadata } from "@/lib/seo";
import { CITIES, PROS } from "@/lib/data";
import { BubbleCard } from "@/components/BubbleCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

type FindAProPageProps = {
  searchParams?: Promise<{
    city?: string;
    intent?: string;
  }>;
};

export const metadata: Metadata = buildMetadata({
  title: "Find a local real estate pro",
  description: "Request help from local real estate professionals by city.",
  path: "/find-a-pro/"
});

export default async function FindAProPage({ searchParams }: FindAProPageProps) {
  const resolvedSearchParams = await searchParams;
  const cityQuery = (resolvedSearchParams?.city ?? "").trim();
  const intentQuery = (resolvedSearchParams?.intent ?? "").trim();

  const normalizedCityQuery = cityQuery.toLowerCase();
  const matchedCity = CITIES.find((city) => {
    const name = city.cityName.toLowerCase();
    const full = `${city.cityName}, ${city.stateCode}`.toLowerCase();
    return (
      city.slug === normalizedCityQuery ||
      name === normalizedCityQuery ||
      full === normalizedCityQuery
    );
  });

  const featured = matchedCity ? PROS.filter((pro) => pro.citySlug === matchedCity.slug).slice(0, 8) : PROS.slice(0, 6);
  const seoLongform = getStaticSeoLongformContent("findAPro");

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Find a local real estate pro
        </h1>
        <p className="max-w-2xl text-sm">
          Share your location and goals. We will route your request to professionals familiar with local housing markets.
        </p>
        <form className="max-w-lg space-y-2" method="GET" action="/find-a-pro">
          <label htmlFor="city-input" className="block text-xs font-medium">
            City or state
          </label>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              id="city-input"
              name="city"
              defaultValue={cityQuery}
              placeholder="e.g. new-york-ny"
              className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text placeholder:text-brand-text/60 focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
            />
            <Button type="submit" className="px-3 py-2 text-xs">
              Set
            </Button>
          </div>
          <label htmlFor="intent-input" className="block text-xs font-medium">
            Intent
          </label>
          <select
            id="intent-input"
            name="intent"
            defaultValue={intentQuery || "buying"}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          >
            <option value="buying">Buying a home</option>
            <option value="renting">Renting a place</option>
            <option value="relocation">Relocation planning</option>
            <option value="investment">Investment property</option>
          </select>
        </form>
      </BubbleCard>

      <LeadForm city={cityQuery} />

      <section aria-label="Featured local pros" className="space-y-3">
        <h2 className="text-sm font-semibold text-brand-primary">Featured pros</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {featured.map((pro) => (
            <BubbleCard key={pro.id} as="article" className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">{pro.name}</h3>
                <Badge>{pro.type}</Badge>
              </div>
              <p className="mt-2 text-xs">{pro.address}</p>
            </BubbleCard>
          ))}
        </div>
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}



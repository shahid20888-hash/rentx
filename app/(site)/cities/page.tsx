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
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/cities-hero.png"
            alt="US Metros skylines twilight collage"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-10 sm:px-8 sm:py-12 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            City Database
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
            Explore Cost of Living by City
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            These city profiles use a simple cost index where 100 represents the estimated US average cost of living.
            Higher numbers mean relatively more expensive, and lower numbers mean relatively less expensive.
          </p>
        </div>
      </div>

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

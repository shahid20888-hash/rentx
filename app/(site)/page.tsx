import Link from "next/link";
import type { Metadata } from "next";
import { getCities, getStates } from "@/lib/data";
import { getLatestGuides } from "@/lib/guides";
import { getLatestInsights } from "@/lib/insights";
import { CityCard } from "@/components/CityCard";
import { StateCard } from "@/components/StateCard";
import { SearchBar } from "@/components/SearchBar";
import { CompareWidget } from "@/components/CompareWidget";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { AdSlot } from "@/components/AdSlot";

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
  const latestInsights = getLatestInsights(3);
  const seoLongform = getStaticSeoLongformContent("home");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/homepage-hero.png"
            alt="US Metro Skyline twilight"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-6 px-6 py-12 sm:px-10 sm:py-16 max-w-3xl">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
              Welcome to RentX
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
              Understand what it costs to live in your next city.
            </h1>
            <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
              RentX provides clear, data-driven cost-of-living comparisons for cities and states across the US, so you can plan moves and budget with confidence.
            </p>
            <div className="flex items-center gap-3 text-xs text-brand-muted/70">
              <span>Last updated: {lastUpdated}</span>
              <span>&bull;</span>
              <Link href="/editorial-policy" className="hover:text-brand-accent underline">Editorial Policy</Link>
              <span>&bull;</span>
              <Link href="/disclaimer" className="hover:text-brand-accent underline">Disclaimer</Link>
            </div>
          </div>
          <div className="max-w-xl pt-2"><SearchBar /></div>
        </div>
      </div>

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

      <section aria-label="Sponsored content area">
        <AdSlot
          adClient="ca-pub-3635656048122177"
          adSlot="1234567890"
          adFormat="auto"
          fullWidthResponsive="true"
        />
      </section>

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

      <section aria-label="Latest insights" className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold">Latest insights</h2>
          </div>
          <Link href="/insights" className="text-xs font-medium text-brand-text hover:text-brand-text hover:underline">
            View all insights -&gt;
          </Link>
        </div>

        {/* Featured Insight Card (Newest) */}
        {latestInsights.length > 0 && (
          <BubbleCard as="article" className="overflow-hidden p-0 rounded-3xl border border-brand-border bg-brand-surface">
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-stretch">
              <div className="relative min-h-[220px] md:min-h-full overflow-hidden">
                <img
                  src={latestInsights[0].coverImage}
                  alt={latestInsights[0].coverAlt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8 space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C78B5E] bg-[#C78B5E]/10 px-2.5 py-1 rounded-full">
                    Featured Insight
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl text-brand-text">
                    {latestInsights[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-3">
                    {latestInsights[0].description}
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-brand-muted">
                    By {latestInsights[0].author ?? "Shahid Saleem"} &bull; {latestInsights[0].date}
                  </span>
                  <Link href={`/insights/${latestInsights[0].slug}`} className={primaryButtonClass}>
                    Read article -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </BubbleCard>
        )}

        {/* Recent Insights Grid (Remaining 2) */}
        {latestInsights.length > 1 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {latestInsights.slice(1, 3).map((insight) => (
              <BubbleCard key={insight.slug} as="article" className="overflow-hidden p-0 rounded-2xl flex flex-col justify-between border border-brand-border bg-brand-surface">
                <div className="relative h-[160px] overflow-hidden">
                  <img
                    src={insight.coverImage}
                    alt={insight.coverAlt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold tracking-tight text-brand-text line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-brand-muted line-clamp-2">
                      {insight.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-brand-muted">
                      {insight.date}
                    </span>
                    <Link href={`/insights/${insight.slug}`} className={primaryButtonClass}>
                      Read article -&gt;
                    </Link>
                  </div>
                </div>
              </BubbleCard>
            ))}
          </div>
        )}
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}

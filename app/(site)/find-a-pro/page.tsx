import type { Metadata } from "next";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { buildMetadata } from "@/lib/seo";
import { CITIES, PROS } from "@/lib/data";
import { BubbleCard } from "@/components/BubbleCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";

type FindAProPageProps = {
  searchParams?: Promise<{
    city?: string;
    intent?: string;
  }>;
};

export async function generateMetadata({ searchParams }: FindAProPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const baseMeta = buildMetadata({
    title: "Find a local real estate pro",
    description: "Request help from local real estate professionals by city.",
    path: "/find-a-pro/"
  });

  if (resolvedSearchParams?.city || resolvedSearchParams?.intent) {
    return {
      ...baseMeta,
      robots: {
        index: false,
        follow: true
      }
    };
  }

  return baseMeta;
}

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
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Find a Pro" }
        ]}
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/find-a-pro-hero.webp"
            alt="Real estate professional showing housing options"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 grid gap-8 lg:grid-cols-2 items-center p-6 sm:p-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
                Partner Network
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
                Find a Local Real Estate Pro
              </h1>
              <p className="text-sm text-brand-muted/95 leading-relaxed">
                Share your location and goals. We will route your request to professional agents and companies familiar with local housing markets.
              </p>
            </div>
            
            <form className="max-w-lg space-y-4 bg-white/[0.03] p-5 rounded-2xl border border-white/[0.08] backdrop-blur-sm" method="GET" action="/find-a-pro">
              <div className="space-y-2">
                <label htmlFor="city-input" className="block text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Target City or State
                </label>
                <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                  <input
                    id="city-input"
                    name="city"
                    defaultValue={cityQuery}
                    placeholder="e.g. new-york-ny"
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-brand-text placeholder:text-brand-text/60 focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
                  />
                  <Button type="submit" className="px-4 py-2.5 text-xs font-bold bg-brand-secondary hover:bg-brand-secondaryHover text-brand-bg hover:text-brand-bg rounded-xl border-none">
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="intent-input" className="block text-xs font-bold uppercase tracking-wider text-brand-accent">
                  Your Goal / Intent
                </label>
                <select
                  id="intent-input"
                  name="intent"
                  defaultValue={intentQuery || "buying"}
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-brand-text [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
                >
                  <option value="buying">Buying a home</option>
                  <option value="renting">Renting a place</option>
                  <option value="relocation">Relocation planning</option>
                  <option value="investment">Investment property</option>
                </select>
              </div>
            </form>
          </div>
          
          {/* Right Column illustration block */}
          <div className="hidden lg:block relative h-[300px] rounded-2xl overflow-hidden border border-white/[0.1] shadow-lg group">
            <Image
              src="/images/find-a-pro-hero.webp"
              alt="Real estate professional"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-xs text-white/90 font-medium">
              We connect you with vetted local experts to validate your budget and ease your transition.
            </p>
          </div>
        </div>
      </div>

      <LeadForm city={cityQuery} />

      <section aria-label="Featured local pros" className="space-y-4">
        <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-accent">Featured Vetted Professionals</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((pro) => {
            const isAgent = pro.type === "Agent";
            return (
              <BubbleCard 
                key={pro.id} 
                as="article" 
                className="relative overflow-hidden p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm transition-all duration-300 hover:border-brand-secondary/20 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {/* Visual Pro Icon */}
                    <div className="mt-0.5 p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-brand-secondary flex items-center justify-center">
                      {isAgent ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm3 2.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM7.5 9a.5.5 0 000 1h5a.5.5 0 000-1h-5zM7 13.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-tight">{pro.name}</h3>
                      <p className="mt-1.5 text-xs text-brand-muted/80 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-brand-muted/60">
                          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.377 7.587.829.799 1.655 1.38 2.274 1.765.31.193.57.337.757.433.118.061.218.109.281.14l.018.008.006.003zM10 12a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        {pro.address}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isAgent ? "bg-amber-500/10 border border-amber-500/30 text-amber-300" : "bg-blue-500/10 border border-blue-500/30 text-blue-300"
                  }`}>
                    {pro.type}
                  </span>
                </div>
              </BubbleCard>
            );
          })}
        </div>
      </section>

      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Find a Local Real Estate Pro",
              description: "Request help from local real estate professionals by city.",
              path: "/find-a-pro/"
            })
          )
        }}
      />
    </div>
  );
}



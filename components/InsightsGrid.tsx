"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InsightMeta } from "@/lib/insights";
import { primaryButtonClass } from "@/components/ui/Button";

type InsightsGridProps = {
  insights: InsightMeta[];
};

export function InsightsGrid({ insights }: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories (excluding undefined)
  const categories = ["All", ...Array.from(new Set(insights.map((item) => item.category).filter(Boolean))) as string[]];

  // Filter insights based on selection
  const filteredInsights = selectedCategory === "All"
    ? insights
    : insights.filter((item) => item.category === selectedCategory);

  const featuredInsight = filteredInsights[0];
  const recentInsights = filteredInsights.slice(1);

  // SVG Icons
  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 inline mr-1 text-brand-secondary">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 inline mr-1 text-brand-muted/70">
      <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="space-y-8">
      {/* Dynamic Category Filtering Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-brand-border/30">
        <span className="text-xs uppercase tracking-wider text-brand-muted/80 mr-2 font-medium">Filter by Topic:</span>
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                isActive
                  ? "bg-brand-secondary/20 border-brand-secondary text-brand-accent shadow-[0_0_12px_rgba(199,139,94,0.15)]"
                  : "bg-white/[0.02] border-white/[0.08] text-brand-muted hover:bg-white/[0.06] hover:text-brand-text hover:border-white/[0.15]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredInsights.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
          <p className="text-brand-muted">No insights found under this category.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Featured Article Spotlight */}
          {featuredInsight && (
            <article className="overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-brand-secondary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] items-stretch">
                {/* Cover Image Container */}
                <div className="relative min-h-[260px] md:min-h-full overflow-hidden group">
                  <Image
                    src={featuredInsight.coverImage}
                    alt={featuredInsight.coverAlt || `Cover image for ${featuredInsight.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  {featuredInsight.category && (
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider text-brand-text bg-brand-bg/85 border border-brand-secondary/40 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                      {featuredInsight.category}
                    </span>
                  )}
                </div>

                {/* Content Box */}
                <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary bg-brand-secondary/10 px-2.5 py-1 rounded-md">
                        Featured Insight
                      </span>
                      {featuredInsight.readTime && (
                        <span className="text-xs text-brand-muted flex items-center">
                          <ClockIcon />
                          {featuredInsight.readTime}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl text-brand-text leading-tight hover:text-brand-accent transition-colors">
                      <Link href={`/insights/${featuredInsight.slug}/` as any}>
                        {featuredInsight.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-brand-muted/90 leading-relaxed">
                      {featuredInsight.description}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08]">
                    {/* Author Byline with Avatar Card */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent flex items-center justify-center text-brand-bg font-bold text-xs shadow-inner">
                        {(featuredInsight.author ?? "Shahid Saleem").charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-brand-text">{featuredInsight.author ?? "Shahid Saleem"}</span>
                        <span className="text-[10px] text-brand-muted/70 flex items-center">
                          <CalendarIcon />
                          {featuredInsight.date}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/insights/${featuredInsight.slug}/` as any}
                      className={`${primaryButtonClass} group flex items-center gap-1.5 text-xs py-2 px-4 bg-brand-secondary hover:bg-brand-secondaryHover text-brand-bg hover:text-brand-bg border-none font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98]`}
                    >
                      Read article
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}

          {/* Recent Insights Grid */}
          {recentInsights.length > 0 && (
            <section aria-label="Recent insights" className="space-y-6">
              <div className="flex items-center justify-between gap-2 border-l-2 border-brand-secondary pl-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-accent">More insights in this topic</h3>
                <span className="text-xs text-brand-muted">{recentInsights.length} {recentInsights.length === 1 ? 'article' : 'articles'}</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recentInsights.map((item) => (
                  <article
                    key={item.slug}
                    className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
                  >
                    {/* Card Cover Image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <Image
                        src={item.coverImage}
                        alt={item.coverAlt || `Cover image for ${item.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                      
                      {item.category && (
                        <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider text-brand-text bg-brand-bg/85 border border-white/[0.08] backdrop-blur-md px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                      )}

                      {item.readTime && (
                        <span className="absolute bottom-3 right-3 text-[10px] text-white font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded flex items-center">
                          <ClockIcon />
                          {item.readTime}
                        </span>
                      )}
                    </div>

                    {/* Card Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] text-brand-muted/70 flex items-center">
                          <CalendarIcon />
                          {item.date}
                        </span>
                        <h4 className="text-base font-semibold tracking-tight text-brand-text line-clamp-2 group-hover:text-brand-accent transition-colors leading-snug">
                          <Link href={`/insights/${item.slug}/` as any}>
                            {item.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-brand-muted/85 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 flex items-center justify-between border-t border-white/[0.06]">
                        <span className="text-[10px] font-medium text-brand-muted/80">
                          By {item.author ?? "Shahid Saleem"}
                        </span>
                        <Link
                          href={`/insights/${item.slug}/` as any}
                          className="text-xs font-semibold text-brand-accent hover:text-brand-secondary hover:underline underline-offset-4 transition-colors flex items-center gap-1 group/btn"
                        >
                          Read article
                          <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5">-&gt;</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

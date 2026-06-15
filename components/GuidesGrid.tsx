"use client";

import { useState } from "react";
import Link from "next/link";
import { GuideMeta } from "@/lib/guides";
import { primaryButtonClass } from "@/components/ui/Button";

type GuidesGridProps = {
  guides: GuideMeta[];
};

export function GuidesGrid({ guides }: GuidesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories (excluding undefined)
  const categories = ["All", ...Array.from(new Set(guides.map((item) => item.category).filter(Boolean))) as string[]];

  // Filter guides based on selection
  const filteredGuides = selectedCategory === "All"
    ? guides
    : guides.filter((item) => item.category === selectedCategory);

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

      {filteredGuides.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
          <p className="text-brand-muted">No guides found under this category.</p>
        </div>
      ) : (
        <section aria-label="Guides grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGuides.map((guide) => (
            <article
              key={guide.slug}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
            >
              {/* Card Cover Image */}
              {guide.coverImage && (
                <div className="relative h-[180px] overflow-hidden">
                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {guide.category && (
                    <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider text-brand-text bg-brand-bg/85 border border-white/[0.08] backdrop-blur-md px-2.5 py-1 rounded-md">
                      {guide.category}
                    </span>
                  )}

                  {guide.readTime && (
                    <span className="absolute bottom-3 right-3 text-[10px] text-white font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded flex items-center">
                      <ClockIcon />
                      {guide.readTime}
                    </span>
                  )}
                </div>
              )}

              {/* Card Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-brand-muted/70 flex items-center">
                    <CalendarIcon />
                    {guide.date}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-brand-text line-clamp-2 group-hover:text-brand-accent transition-colors leading-snug">
                    <Link href={`/guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-brand-muted/85 line-clamp-3 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-white/[0.06]">
                  <span className="text-[10px] font-medium text-brand-muted/80">
                    By {guide.author ?? "Shahid Saleem"}
                  </span>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className={`${primaryButtonClass} text-xs font-semibold py-1.5 px-3 bg-white/[0.04] border border-white/[0.08] hover:border-brand-secondary/30 text-brand-text hover:text-brand-accent rounded-lg flex items-center gap-1 group/btn`}
                  >
                    Read guide
                    <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5">-&gt;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

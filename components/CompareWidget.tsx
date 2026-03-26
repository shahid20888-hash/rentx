"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { City } from "@/lib/data";
import { BubbleCard } from "./BubbleCard";
import { Button } from "./ui/Button";

type CompareWidgetProps = {
  cities: City[];
};

export function CompareWidget({ cities }: CompareWidgetProps) {
  const router = useRouter();
  const [fromSlug, setFromSlug] = useState<string>("");
  const [toSlug, setToSlug] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!fromSlug || !toSlug || fromSlug === toSlug) return;
    router.push(`/compare/${fromSlug}-vs-${toSlug}`);
  };

  return (
    <BubbleCard
      as="section"
      aria-label="Compare two cities"
      className="space-y-3 p-5 sm:p-6"
    >
      <header className="space-y-1">
        <h2 className="text-sm font-semibold text-brand-primary">Compare two cities</h2>
        <p className="text-xs text-brand-text/80">
          Choose two cities to quickly compare their overall cost-of-living indices.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <div className="space-y-1.5">
          <label htmlFor="from-city" className="block text-xs font-medium text-brand-primary">
            From
          </label>
          <select
            id="from-city"
            value={fromSlug}
            onChange={(event) => setFromSlug(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.cityName}, {city.stateCode}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="to-city" className="block text-xs font-medium text-brand-primary">
            To
          </label>
          <select
            id="to-city"
            value={toSlug}
            onChange={(event) => setToSlug(event.target.value)}
            className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.slug} value={city.slug}>
                {city.cityName}, {city.stateCode}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button type="submit" className="w-full">
            Compare
          </Button>
        </div>
      </form>
    </BubbleCard>
  );
}


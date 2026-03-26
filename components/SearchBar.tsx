"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCities, getStates } from "@/lib/data";

type SearchBarProps = {
  variant?: "inline" | "overlay" | "dark";
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function SearchBar({ variant = "inline" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const cities = useMemo(() => getCities(), []);
  const states = useMemo(() => getStates(), []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const term = normalize(query);
    if (!term) return;

    const matchedCity = cities.find((city) => {
      const full = normalize(`${city.cityName}, ${city.stateCode}`);
      return full === term || normalize(city.cityName) === term || city.slug === term.replace(",", "");
    });
    if (matchedCity) {
      router.push(`/city/${matchedCity.slug}`);
      return;
    }

    const matchedState = states.find(
      (state) => normalize(state.name) === term || normalize(state.code) === term
    );
    if (matchedState) {
      router.push(`/state/${matchedState.slug}`);
      return;
    }

    router.push("/cities");
  };

  const baseClasses =
    "flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 transition focus-within:ring-2 focus-within:ring-[#C78B5E]/40";
  const overlayClasses = "shadow-md md:shadow-sm";
  const inlineClasses = "shadow-sm";
  const darkClasses = "shadow-sm";
  const inputClasses =
    "h-9 w-full bg-transparent text-sm text-brand-text placeholder:text-brand-text/60 caret-brand-text focus:outline-none";
  const buttonClasses =
    "inline-flex min-h-8 items-center rounded-full bg-[#C78B5E] px-4 py-2 text-sm font-semibold text-[#0E2A23] shadow-sm transition hover:bg-[#B8734C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C78B5E]/40";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${baseClasses} ${
        variant === "overlay" ? overlayClasses : variant === "dark" ? darkClasses : inlineClasses
      }`}
      aria-label="Search by city or state"
    >
      <label className="sr-only" htmlFor="location-search">
        Search for a city or state
      </label>
      <input
        id="location-search"
        type="search"
        autoComplete="off"
        placeholder="Search by city or state"
        className={inputClasses}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit" className={buttonClasses}>
        Search
      </button>
    </form>
  );
}

import type { MetadataRoute } from "next";
import { getCities, getStates, getProsByCitySlug } from "@/lib/data";
import { GUIDES } from "@/lib/guides";
import { INSIGHTS } from "@/lib/insights";

const BASE_URL = "https://rentx.us";
const NOW = new Date();

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type SitemapEntryOptions = {
  changeFrequency: ChangeFrequency;
  lastModified?: Date;
  priority: number;
};

function buildUrl(path: string) {
  // Ensure we match trailing slash consistency
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const resolved = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return new URL(resolved, BASE_URL).toString();
}

function buildEntry(path: string, options: SitemapEntryOptions): MetadataRoute.Sitemap[number] {
  return {
    url: buildUrl(path),
    lastModified: options.lastModified ?? NOW,
    changeFrequency: options.changeFrequency,
    priority: options.priority
  };
}

function resolveArticleDate(updatedAt?: string, publishedAt?: string, date?: string) {
  return new Date(updatedAt ?? publishedAt ?? date ?? NOW.toISOString());
}

// 1. High-Quality Comparison Pair Filter
function isHighQualityCompare(cityA: any, cityB: any): boolean {
  // Check if either city has local professionals associated with it
  const hasProsA = getProsByCitySlug(cityA.slug).length > 0;
  const hasProsB = getProsByCitySlug(cityB.slug).length > 0;
  
  // Include comparisons involving at least one commercial relocation market (has pros)
  // OR where both cities are above the national average cost index baseline (> 100 overall)
  return (hasProsA && hasProsB) || (cityA.indices.overall > 100 && cityB.indices.overall > 100);
}

// Get the sorted list of high-quality compare pairs
function getQualityComparePairs() {
  const cities = getCities();
  const pairs: { citySlug: string; otherSlug: string }[] = [];
  
  cities.forEach((city) => {
    cities
      .filter((other) => other.slug !== city.slug)
      .forEach((other) => {
        if (isHighQualityCompare(city, other)) {
          pairs.push({ citySlug: city.slug, otherSlug: other.slug });
        }
      });
  });
  return pairs;
}

const SITEMAP_MAX_SIZE = 40000; // conservative scaling limit (well under 50,000)

// 2. Next.js Sitemap Partitioning Support
export async function generateSitemaps() {
  const comparePairsCount = getQualityComparePairs().length;
  const numCompareSitemaps = Math.ceil(comparePairsCount / SITEMAP_MAX_SIZE);
  
  const sitemaps = [{ id: 0 }]; // id 0 is for core content (static, states, cities, guides, insights)
  for (let i = 0; i < numCompareSitemaps; i++) {
    sitemaps.push({ id: i + 1 });
  }
  return sitemaps;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const numericId = Number(id);
  if (numericId === 0) {
    // Partition 0: Core Content Sitemaps
    const staticEntries: MetadataRoute.Sitemap = [
      buildEntry("/", { changeFrequency: "daily", priority: 1 }),
      buildEntry("/states/", { changeFrequency: "weekly", priority: 0.9 }),
      buildEntry("/cities/", { changeFrequency: "weekly", priority: 0.9 }),
      buildEntry("/guides/", { changeFrequency: "weekly", priority: 0.9 }),
      buildEntry("/insights/", { changeFrequency: "weekly", priority: 0.9 }),
      buildEntry("/compare/", { changeFrequency: "weekly", priority: 0.8 }),
      buildEntry("/find-a-pro/", { changeFrequency: "weekly", priority: 0.7 }),
      buildEntry("/about/", { changeFrequency: "monthly", priority: 0.5 }),
      buildEntry("/contact/", { changeFrequency: "monthly", priority: 0.4 }),
      buildEntry("/privacy-policy/", { changeFrequency: "yearly", priority: 0.2 }),
      buildEntry("/terms/", { changeFrequency: "yearly", priority: 0.2 }),
      buildEntry("/disclaimer/", { changeFrequency: "yearly", priority: 0.2 }),
      buildEntry("/editorial-policy/", { changeFrequency: "monthly", priority: 0.4 }),
      buildEntry("/cookie-policy/", { changeFrequency: "yearly", priority: 0.2 }),
      buildEntry("/dmca/", { changeFrequency: "yearly", priority: 0.2 }),
      buildEntry("/advertising-disclosure/", { changeFrequency: "yearly", priority: 0.2 })
    ];

    const stateEntries = getStates().map((state) =>
      buildEntry(`/state/${state.slug}/`, {
        changeFrequency: "weekly",
        priority: 0.8
      })
    );

    const cityEntries = getCities().map((city) =>
      buildEntry(`/city/${city.slug}/`, {
        changeFrequency: "weekly",
        priority: 0.8
      })
    );

    const guideEntries = GUIDES.map((guide) =>
      buildEntry(`/guides/${guide.slug}/`, {
        lastModified: resolveArticleDate(guide.meta.updatedAt, guide.meta.publishedAt, guide.meta.date),
        changeFrequency: "monthly",
        priority: 0.85
      })
    );

    const insightEntries = INSIGHTS.map((insight) =>
      buildEntry(`/insights/${insight.slug}/`, {
        lastModified: resolveArticleDate(insight.meta.updatedAt, insight.meta.publishedAt, insight.meta.date),
        changeFrequency: "monthly",
        priority: 0.85
      })
    );

    return [
      ...staticEntries,
      ...stateEntries,
      ...cityEntries,
      ...guideEntries,
      ...insightEntries
    ];
  } else {
    // Partition 1+: Compare Pages Sitemaps
    const comparePairs = getQualityComparePairs();
    const startIndex = (numericId - 1) * SITEMAP_MAX_SIZE;
    const endIndex = startIndex + SITEMAP_MAX_SIZE;
    const chunk = comparePairs.slice(startIndex, endIndex);

    return chunk.map((pair) =>
      buildEntry(`/compare/${pair.citySlug}-vs-${pair.otherSlug}/`, {
        changeFrequency: "weekly",
        priority: 0.6
      })
    );
  }
}

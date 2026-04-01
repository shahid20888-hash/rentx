import type { MetadataRoute } from "next";
import { getCities, getStates } from "@/lib/data";
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
  return new URL(path, BASE_URL).toString();
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

export default function sitemap(): MetadataRoute.Sitemap {
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
    buildEntry("/dmca/", { changeFrequency: "yearly", priority: 0.2 })
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

  const compareEntries = getCities().flatMap((city) =>
    getCities()
      .filter((other) => other.slug !== city.slug)
      .map((other) =>
        buildEntry(`/compare/${city.slug}-vs-${other.slug}/`, {
          changeFrequency: "weekly",
          priority: 0.6
        })
      )
  );

  return [
    ...staticEntries,
    ...stateEntries,
    ...cityEntries,
    ...guideEntries,
    ...insightEntries,
    ...compareEntries
  ];
}

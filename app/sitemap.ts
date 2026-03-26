import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getStates, getCities } from "@/lib/data";
import { GUIDES } from "@/lib/guides";
import { INSIGHTS } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/states/",
    "/cities/",
    "/guides/",
    "/insights/",
    "/compare/",
    "/find-a-pro/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/disclaimer/",
    "/editorial-policy/",
    "/cookie-policy/",
    "/dmca/",
    "/thanks/"
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: now
  }));

  const stateEntries = getStates().map((state) => ({
    url: `${baseUrl}/state/${state.slug}/`,
    lastModified: now
  }));

  const cityEntries = getCities().map((city) => ({
    url: `${baseUrl}/city/${city.slug}/`,
    lastModified: now
  }));

  const guideEntries = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}/`,
    lastModified: new Date(guide.meta.date)
  }));

  const insightEntries = INSIGHTS.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}/`,
    lastModified: new Date(insight.meta.date)
  }));

  const compareEntries = getCities()
    .slice(0, 6)
    .flatMap((city, index, list) => {
      const next = list[index + 1];
      if (!next) return [];
      return [
        {
          url: `${baseUrl}/compare/${city.slug}-vs-${next.slug}/`,
          lastModified: now
        }
      ];
    });

  return [
    ...staticPages,
    ...stateEntries,
    ...cityEntries,
    ...guideEntries,
    ...insightEntries,
    ...compareEntries
  ];
}


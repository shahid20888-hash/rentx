import type { MetadataRoute } from "next";

const BASE_URL = "https://rentx.us";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/private/", "/preview/", "/api/", "/thanks/"]
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}

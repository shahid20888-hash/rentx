import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://rentx.us";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Mediapartners-Google",
        allow: "/"
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/private/",
          "/preview/",
          "/api/",
          "/thanks/",
          "/test/",
          "/draft/",
          "/staging/",
          "/internal/"
        ]
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`
  };
}

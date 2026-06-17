const createMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com"
      }
    ]
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"]
};

const withMDX = createMDX({
  options: {
    providerImportSource: "@/mdx-components"
  }
});

module.exports = withMDX(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());

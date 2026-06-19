import type { Metadata } from "next";

export const SITE_NAME = "RentX";
const DEFAULT_SITE_URL = "https://rentx.us";
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return DEFAULT_SITE_URL;
  return configuredUrl.replace(/\/$/, "");
}

export const SITE_URL = resolveSiteUrl();

const DEFAULT_DESCRIPTION =
  "Explore cost of living data across US states and cities. Compare housing, utilities, transportation, and more to plan your move or budget.";

type BuildMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
  imagePath?: string;
};

function clampTitle(rawTitle?: string) {
  if (!rawTitle) return undefined;
  return rawTitle.trim();
}

function normalizeDescription(description: string, path: string) {
  const pathHint = path === "/" ? "homepage" : path.replace(/\//g, " ").trim();
  const base = `${description} RentX provides practical U.S. cost-of-living research, comparisons, and transparent planning context for ${pathHint}.`;
  const cleaned = base.replace(/\s+/g, " ").trim();
  if (cleaned.length > 160) {
    const trimmed = cleaned.slice(0, 160);
    const lastSpace = trimmed.lastIndexOf(" ");
    return `${trimmed.slice(0, Math.max(lastSpace, 140)).trim()}.`;
  }
  if (cleaned.length < 150) {
    const pad = " Verify local details before major housing decisions.";
    const combined = `${cleaned}${pad}`;
    if (combined.length <= 160) return combined;
    return `${combined.slice(0, 159).trim()}.`;
  }
  return cleaned;
}

export function buildMetadata({
  title,
  description,
  path,
  imagePath
}: BuildMetadataArgs = {}): Metadata {
  // Safeguards against empty/whitespace titles and descriptions
  const cleanTitle = title && title.trim() !== "" ? title.trim() : undefined;
  const cleanDescription = description && description.trim() !== "" ? description.trim() : DEFAULT_DESCRIPTION;
  const cleanPath = path && path.trim() !== "" ? path.trim() : "/";

  // Ensure path starts with slash
  const urlPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  // Ensure absolute canonical formatting ending with trailing slash
  const url = new URL(urlPath, SITE_URL);
  const canonical = url.pathname.endsWith("/") ? url.toString() : `${url.toString()}/`;

  const metaDescription = normalizeDescription(cleanDescription, urlPath);
  const safeTitle = clampTitle(cleanTitle);

  const fullTitle = cleanTitle
    ? `${safeTitle} | ${SITE_NAME}`
    : `${SITE_NAME} - Cost of Living in US Cities & States`;
  const resolvedImage = imagePath ?? "/images/rentx-og-banner.png";

  const metadata: Metadata = {
    title: {
      default: fullTitle,
      template: `%s | ${SITE_NAME}`
    },
    description: metaDescription,
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png"
    },
    alternates: {
      canonical
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Cost of Living`
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      site: "@rentx_us",
      creator: "@rentx_us",
      images: [resolvedImage]
    }
  };

  if (GOOGLE_SITE_VERIFICATION) {
    metadata.verification = {
      google: GOOGLE_SITE_VERIFICATION
    };
  }

  return metadata;
}

export const defaultMetadata: Metadata = buildMetadata();
import { SITE_NAME, SITE_URL } from "./seo";
import type { City } from "./data";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-rentx.png`
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL
  };
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

type FaqItem = {
  question: string;
  answer: string;
};

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function cityPageSchema(city: City) {
  const url = `${SITE_URL}/city/${city.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "City",
    name: city.cityName,
    address: {
      "@type": "PostalAddress",
      addressRegion: city.stateCode,
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng
    },
    url,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Overall cost of living index",
        value: city.indices.overall
      },
      {
        "@type": "PropertyValue",
        name: "Rent index",
        value: city.indices.rent
      },
      {
        "@type": "PropertyValue",
        name: "Home price index",
        value: city.indices.homePrice
      },
      {
        "@type": "PropertyValue",
        name: "Utilities index",
        value: city.indices.utilities
      },
      {
        "@type": "PropertyValue",
        name: "Groceries index",
        value: city.indices.groceries
      },
      {
        "@type": "PropertyValue",
        name: "Transportation index",
        value: city.indices.transport
      },
      {
        "@type": "PropertyValue",
        name: "Healthcare index",
        value: city.indices.healthcare
      }
    ]
  };
}

type ArticleInput = {
  title: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  section?: "guides" | "insights";
};

export function articleSchema(guide: ArticleInput) {
  const section = guide.section ?? "guides";
  const url = `${SITE_URL}/${section}/${guide.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url,
    mainEntityOfPage: url,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified ?? guide.datePublished,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-rentx.png`
      }
    }
  };
}

export function statePageSchema(state: any, cities: any[]) {
  const url = `${SITE_URL}/state/${state.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    name: state.name,
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    },
    url,
    containsPlace: cities.map((city) => ({
      "@type": "City",
      name: city.cityName,
      url: `${SITE_URL}/city/${city.slug}/`
    }))
  };
}


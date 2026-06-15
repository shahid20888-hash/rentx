import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getCities, getStates } from "@/lib/data";
import { BubbleCard } from "@/components/BubbleCard";
import { resolveArticleDateLabel } from "@/lib/date";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return { title: "Guide not found" };
  }

  return buildMetadata({
    title: guide.meta.title,
    description: guide.meta.description,
    path: `/guides/${guide.slug}/`
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const Article = guide.Component;
  const author = guide.meta.author ?? "Shahid Saleem";
  // Use updatedAt/publishedAt fallback to keep current-date display consistent.
  const formattedDate = resolveArticleDateLabel(
    guide.meta.updatedAt,
    guide.meta.publishedAt ?? guide.meta.date
  );
  const states = getStates().slice(0, 3);
  const cities = getCities().slice(0, 3);

  const schema = articleSchema({
    title: guide.meta.title,
    description: guide.meta.description,
    slug: guide.slug,
    datePublished: guide.meta.date,
    dateModified: guide.meta.updatedAt
  });

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides/" as any },
          { label: guide.meta.title }
        ]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <BubbleCard as="header" className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-wide text-brand-text/70">
              Guide
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-brand-primary sm:text-4xl">
              {guide.meta.title}
            </h1>
            <p className="mt-2 text-xs text-brand-text/75">By {author} {"\u2022"} {formattedDate}</p>
            <p className="mt-3 max-w-3xl text-sm text-brand-text/85">{guide.meta.description}</p>
          </BubbleCard>

          <BubbleCard as="article" className="p-6 sm:p-8">
            <div className="mdx-prose">
              <Article />
            </div>
          </BubbleCard>
        </div>

        <div className="space-y-4">
          {guide.meta.toc && guide.meta.toc.length > 0 && (
            <BubbleCard as="aside" className="sticky top-24 p-5">
              <h2 className="text-sm font-semibold text-brand-primary">On this page</h2>
              <ul className="mt-3 space-y-2 text-sm text-brand-text/85">
                {guide.meta.toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="hover:text-brand-text hover:bg-brand-hover">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </BubbleCard>
          )}
        </div>
      </div>

      <BubbleCard className="p-5">
        <h2 className="text-sm font-semibold text-brand-primary">Helpful links</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3 text-xs">
          <div>
            <p className="mb-1 font-medium text-brand-primary">States</p>
            {states.map((state) => (
              <div key={state.slug}>
                <Link href={`/state/${state.slug}/` as any} className="text-brand-text hover:text-brand-text hover:underline">
                  {state.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-1 font-medium text-brand-primary">Cities</p>
            {cities.map((city) => (
              <div key={city.slug}>
                <Link href={`/city/${city.slug}/` as any} className="text-brand-text hover:text-brand-text hover:underline">
                  {city.cityName}, {city.stateCode}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-1 font-medium text-brand-primary">More</p>
            <Link href={"/states/" as any} className="block text-brand-text hover:text-brand-text hover:underline">
              Browse states
            </Link>
            <Link href={"/cities/" as any} className="block text-brand-text hover:text-brand-text hover:underline">
              Browse cities
            </Link>
            <Link href={"/find-a-pro/" as any} className="block text-brand-text hover:text-brand-text hover:underline">
              Find a Pro
            </Link>
          </div>
        </div>
      </BubbleCard>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Guides", url: "/guides/" },
              { name: guide.meta.title, url: `/guides/${guide.slug}/` }
            ])
          )
        }}
      />
    </div>
  );
}

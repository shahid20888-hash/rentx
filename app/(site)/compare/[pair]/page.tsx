import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCities } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";

type ComparePairPageProps = {
  params: Promise<{ pair: string }>;
};

export function generateStaticParams() {
  const cities = getCities();
  return cities.flatMap((city) =>
    cities
      .filter((other) => other.slug !== city.slug)
      .slice(0, 2)
      .map((other) => ({ pair: `${city.slug}-vs-${other.slug}` }))
  );
}

export async function generateMetadata({ params }: ComparePairPageProps): Promise<Metadata> {
  const { pair } = await params;
  return buildMetadata({
    title: `Compare ${pair.replace(/-/g, " ")}`,
    description: "City cost-of-living comparison page.",
    path: `/compare/${pair}/`
  });
}

export default async function ComparePairPage({ params }: ComparePairPageProps) {
  const { pair } = await params;
  const [fromSlug, toSlug] = pair.split("-vs-");
  const cities = getCities();
  const from = cities.find((city) => city.slug === fromSlug);
  const to = cities.find((city) => city.slug === toSlug);

  if (!from || !to) {
    notFound();
  }

  const diff = from.indices.overall - to.indices.overall;

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Compare", href: "/compare" },
          { label: `${from.cityName} vs ${to.cityName}` }
        ]}
      />
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {from.cityName}, {from.stateCode} vs {to.cityName}, {to.stateCode}
        </h1>
        <p className="text-sm">
          Overall index: {from.indices.overall} vs {to.indices.overall}.{" "}
          {diff === 0
            ? "Both cities are similarly priced by this index."
            : diff > 0
              ? `${from.cityName} is estimated to be ${diff}% higher than ${to.cityName}.`
              : `${to.cityName} is estimated to be ${Math.abs(diff)}% higher than ${from.cityName}.`}
        </p>
      </BubbleCard>
      <div className="grid gap-4 md:grid-cols-2">
        {[from, to].map((city) => (
          <BubbleCard key={city.slug} as="section" className="p-5">
            <h2 className="text-base font-semibold">
              {city.cityName}, {city.stateCode}
            </h2>
            <p className="mt-1 text-xs">Overall index {city.indices.overall}</p>
            <Link href={`/city/${city.slug}`} className={`mt-3 ${primaryButtonClass}`}>
              View city page
            </Link>
          </BubbleCard>
        ))}
      </div>
    </div>
  );
}

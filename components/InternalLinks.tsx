import Link from "next/link";
import { BubbleCard } from "./BubbleCard";
import { Badge } from "./ui/Badge";
import { primaryButtonClass } from "./ui/Button";

type GuideLink = { title: string; slug: string };
type CityLink = { label: string; slug: string };
type CompareLink = { label: string; pair: string };

type CityInternalLinksProps = {
  kind: "city";
  stateSlug: string;
  stateName: string;
  nearbyCities: CityLink[];
  guideLinks: GuideLink[];
  compareLinks: CompareLink[];
  citySlug: string;
};

type StateInternalLinksProps = {
  kind: "state";
  stateName: string;
  topCities: CityLink[];
  guideLinks: GuideLink[];
};

type InternalLinksProps = CityInternalLinksProps | StateInternalLinksProps;

export function InternalLinks(props: InternalLinksProps) {
  if (props.kind === "city") {
    return (
      <section aria-label="Related links" className="space-y-4">
        <h2 className="text-sm font-semibold">Related places and guides</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <BubbleCard className="space-y-2 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide">State page</h3>
            <Link href={`/state/${props.stateSlug}/` as any} className="text-xs font-medium">
              Explore {props.stateName}
            </Link>
            <p className="pt-2 text-[11px]">
              <Link href={`/find-a-pro/?city=${encodeURIComponent(props.citySlug)}` as any} className="font-medium">
                Request local help
              </Link>
            </p>
          </BubbleCard>

          <BubbleCard className="space-y-2 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide">Nearby cities</h3>
            <ul className="space-y-1 text-xs">
              {props.nearbyCities.slice(0, 4).map((item) => (
                <li key={item.slug}>
                  <Link href={`/city/${item.slug}/` as any}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </BubbleCard>

          <BubbleCard className="space-y-3 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide">Guides and compare</h3>
            <ul className="space-y-1 text-xs">
              {props.guideLinks.slice(0, 3).map((guide) => (
                <li key={guide.slug}>
                  <Link href={`/guides/${guide.slug}/` as any}>
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {props.compareLinks.slice(0, 3).map((link) => (
                <Link key={link.pair} href={`/compare/${link.pair}/` as any}>
                  <Badge>{link.label}</Badge>
                </Link>
              ))}
            </div>
          </BubbleCard>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Related links" className="space-y-4">
      <h2 className="text-sm font-semibold">Continue exploring {props.stateName}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <BubbleCard className="space-y-2 p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide">Top cities</h3>
          <ul className="space-y-1 text-xs">
            {props.topCities.slice(0, 6).map((city) => (
              <li key={city.slug}>
                <Link href={`/city/${city.slug}/` as any}>
                  {city.label}
                </Link>
              </li>
            ))}
          </ul>
        </BubbleCard>

        <BubbleCard className="space-y-2 p-4 md:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide">Guides and help</h3>
          <ul className="mb-3 grid gap-2 sm:grid-cols-3 text-xs">
            {props.guideLinks.slice(0, 3).map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}/` as any}>
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={"/find-a-pro/" as any} className={primaryButtonClass}>
            Find a local pro
          </Link>
        </BubbleCard>
      </div>
    </section>
  );
}

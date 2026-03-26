import Link from "next/link";
import { BubbleCard } from "./BubbleCard";
import { Badge } from "./ui/Badge";

type CityCardProps = {
  name: string;
  stateCode: string;
  slug: string;
  summary?: string;
  costIndex?: number;
};

export function CityCard({ name, stateCode, slug, summary, costIndex }: CityCardProps) {
  return (
    <Link
      href={`/city/${slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
    >
      <BubbleCard className="flex flex-col p-5 hover:-translate-y-0.5 hover:border-brand-border hover:bg-brand-hover">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-brand-primary group-hover:text-brand-text">
              {name}
            </h3>
            <p className="text-xs text-brand-text/75">{stateCode}</p>
          </div>
          {typeof costIndex === "number" && <Badge>Index {costIndex}</Badge>}
        </div>
        {summary && <p className="mt-2 line-clamp-2 text-xs text-brand-text/80">{summary}</p>}
      </BubbleCard>
    </Link>
  );
}


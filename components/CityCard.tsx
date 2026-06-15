import Image from "next/image";
import Link from "next/link";
import { BubbleCard } from "./BubbleCard";

type CityCardProps = {
  name: string;
  stateCode: string;
  slug: string;
  summary?: string;
  costIndex?: number;
};

export function CityCard({ name, stateCode, slug, summary, costIndex }: CityCardProps) {
  // Deterministic cover image selection based on city slug
  const getCityImage = (citySlug: string) => {
    if (citySlug === "san-francisco-ca" || citySlug === "seattle-wa") return "/images/cards/city-1.png";
    if (citySlug === "new-york-ny" || citySlug === "chicago-il") return "/images/cards/city-2.png";
    if (citySlug === "los-angeles-ca" || citySlug === "san-diego-ca" || citySlug === "miami-fl") return "/images/cards/city-3.png";
    
    // Fallback based on char code sum
    const sum = citySlug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = (sum % 4) + 1;
    return `/images/cards/city-${index}.png`;
  };

  // Determine cost level badge styling based on US average index (100)
  let badgeClasses = "bg-white/[0.08] border-white/[0.1] text-brand-text";
  if (typeof costIndex === "number") {
    if (costIndex > 140) {
      badgeClasses = "bg-red-500/15 border-red-500/35 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.1)]";
    } else if (costIndex > 105) {
      badgeClasses = "bg-amber-500/15 border-amber-500/35 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.1)]";
    } else {
      badgeClasses = "bg-emerald-500/15 border-emerald-500/35 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.1)]";
    }
  }

  return (
    <Link
      href={`/city/${slug}/` as any}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
    >
      <BubbleCard className="relative overflow-hidden flex flex-col p-0 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
        {/* Card Image Header */}
        <div className="relative h-[110px] w-full overflow-hidden border-b border-white/[0.04]">
          <Image
            src={getCityImage(slug)}
            alt={`Skyline profile of ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-45" />
          {typeof costIndex === "number" && (
            <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg border backdrop-blur-md ${badgeClasses}`}>
              Index {costIndex}
            </span>
          )}
        </div>

        {/* Card Body content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white group-hover:text-brand-accent transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-xs font-semibold text-brand-muted/70 uppercase tracking-wider">{stateCode}</p>
          </div>
          
          {summary && (
            <p className="line-clamp-2 text-xs text-brand-muted/80 leading-relaxed">
              {summary}
            </p>
          )}

          <div className="pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-bold text-brand-accent group-hover:text-brand-secondary transition-colors">
            <span>View Cost Breakdown</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
          </div>
        </div>
      </BubbleCard>
    </Link>
  );
}


import Image from "next/image";
import Link from "next/link";
import { BubbleCard } from "./BubbleCard";

type StateCardProps = {
  name: string;
  code: string;
  slug: string;
  summary?: string;
};

export function StateCard({ name, code, slug, summary }: StateCardProps) {
  // Deterministic cover image selection based on state slug
  const getStateImage = (stateSlug: string) => {
    if (stateSlug === "california" || stateSlug === "florida") return "/images/cards/state-1.png";
    if (stateSlug === "texas" || stateSlug === "new-york") return "/images/cards/state-2.png";
    
    // Fallback based on char code sum
    const sum = stateSlug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = (sum % 3) + 1;
    return `/images/cards/state-${index}.png`;
  };

  return (
    <Link
      href={`/state/${slug}/` as any}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
    >
      <BubbleCard className="relative overflow-hidden flex flex-col p-0 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
        {/* Card Image Header */}
        <div className="relative h-[110px] w-full overflow-hidden border-b border-white/[0.04]">
          <Image
            src={getStateImage(slug)}
            alt={`Scenic landscape of ${name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-45" />
          <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider bg-brand-secondary/80 border border-brand-secondary/35 backdrop-blur-md text-brand-accent px-2.5 py-1.5 rounded-lg shadow-sm">
            View Details
          </span>
        </div>

        {/* Card Body content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white group-hover:text-brand-accent transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-xs font-semibold text-brand-muted/70 uppercase tracking-wider">{code}</p>
          </div>
          
          {summary && (
            <p className="line-clamp-2 text-xs text-brand-muted/80 leading-relaxed">
              {summary}
            </p>
          )}

          <div className="pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-bold text-brand-accent group-hover:text-brand-secondary transition-colors">
            <span>Explore Cities & Costs</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
          </div>
        </div>
      </BubbleCard>
    </Link>
  );
}


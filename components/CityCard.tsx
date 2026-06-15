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
      href={`/city/${slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
    >
      <BubbleCard className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
        {/* Subtle decorative glow circle in card corner */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-secondary/5 rounded-full blur-xl transition-all duration-300 group-hover:bg-brand-secondary/10" />

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white group-hover:text-brand-accent transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-xs font-semibold text-brand-muted/70 uppercase tracking-wider">{stateCode}</p>
          </div>
          {typeof costIndex === "number" && (
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border ${badgeClasses}`}>
              Index {costIndex}
            </span>
          )}
        </div>
        
        {summary && (
          <p className="mt-3 line-clamp-2 text-xs text-brand-muted/85 leading-relaxed">
            {summary}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-semibold text-brand-accent group-hover:text-brand-secondary transition-colors">
          <span>View Cost Breakdown</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
        </div>
      </BubbleCard>
    </Link>
  );
}


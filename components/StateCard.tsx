import Link from "next/link";
import { BubbleCard } from "./BubbleCard";

type StateCardProps = {
  name: string;
  code: string;
  slug: string;
  summary?: string;
};

export function StateCard({ name, code, slug, summary }: StateCardProps) {
  return (
    <Link
      href={`/state/${slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
    >
      <BubbleCard className="relative overflow-hidden flex flex-col p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
        {/* Decorative glow circle */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-secondary/5 rounded-full blur-xl transition-all duration-300 group-hover:bg-brand-secondary/10" />

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white group-hover:text-brand-accent transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-xs font-semibold text-brand-muted/70 uppercase tracking-wider">{code}</p>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-secondary/10 border border-brand-secondary/35 text-brand-accent px-2.5 py-1.5 rounded-lg shadow-sm">
            View Details
          </span>
        </div>
        
        {summary && (
          <p className="mt-3 line-clamp-2 text-xs text-brand-muted/85 leading-relaxed">
            {summary}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-semibold text-brand-accent group-hover:text-brand-secondary transition-colors">
          <span>Explore Cities & Costs</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
        </div>
      </BubbleCard>
    </Link>
  );
}


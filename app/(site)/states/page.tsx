import type { Metadata } from "next";
import { getStates } from "@/lib/data";
import { StateCard } from "@/components/StateCard";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "States",
  description: "Browse US states and explore local cost-of-living trends.",
  path: "/states/"
});

export default function StatesPage() {
  const states = getStates();
  const seoLongform = getStaticSeoLongformContent("states");

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/states-hero.png"
            alt="Scenic US Highway stretch"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-10 sm:px-8 sm:py-12 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            State Database
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
            Explore Cost of Living by State
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            Start with a state to see how housing, everyday expenses, and healthcare compare to the national average.
            From there, you can drill down into specific city breakdowns.
          </p>
        </div>
      </div>

      <section aria-label="States" className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {states.map((state) => (
          <StateCard
            key={state.slug}
            name={state.name}
            code={state.code}
            slug={state.slug}
            summary={`Cost of living overview for ${state.name} including major metro areas.`}
          />
        ))}
      </section>

      <SeoLongform {...seoLongform} />
    </div>
  );
}


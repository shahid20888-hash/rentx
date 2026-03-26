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
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Explore cost of living by state
        </h1>
        <p className="max-w-2xl text-sm">
          Start with a state to see how housing, everyday expenses, and healthcare compare to the
          national average. From there you can drill into specific cities.
        </p>
      </BubbleCard>

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


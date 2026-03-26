import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: "Important limitations on how you should use RentX cost-of-living information.",
  path: "/disclaimer/"
});

export default function DisclaimerPage() {
  const seoLongform = getStaticSeoLongformContent("disclaimer");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight text-brand-primary sm:text-2xl">Disclaimer</h1>
        <p className="max-w-2xl text-sm text-brand-text/85">
          Cost-of-living estimates are helpful for orientation, but they are not guarantees or personalized advice.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm text-brand-text/85">
        <p>
          The information on RentX is intended for general informational and educational purposes. Numbers are estimates based on assumptions and may not reflect your exact costs, neighborhood, or timing.
        </p>
        <p>
          You should not use this site as a substitute for independent research, professional financial planning, legal advice, or tax guidance. Always confirm key details directly with landlords, lenders, employers, and relevant authorities before making commitments.
        </p>
        <p>
          We do not guarantee outcomes, and we are not responsible for decisions you make based on the information presented here.
        </p>
        <p className="text-xs text-brand-text/75">Information is for general guidance. We do not provide legal or financial advice.</p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

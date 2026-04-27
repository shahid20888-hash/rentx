import type { Metadata } from "next";
import Link from "next/link";
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
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight text-brand-primary sm:text-2xl">Disclaimer</h1>
        <p className="max-w-3xl text-sm text-brand-text/85">
          RentX publishes informational content for research and education. The material on this website is not legal, tax, investment, or financial advice.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm text-brand-text/85">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-brand-text">General Information Only</h2>
          <p>
            Cost-of-living values, rankings, and budgeting examples are estimates based on available data and methodology assumptions. Actual costs can vary by neighborhood, household size, timing, and market conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-brand-text">No Professional Advice</h2>
          <h3 className="text-sm font-semibold text-brand-text/80">Financial and legal decisions</h3>
          <p>
            Do not treat this site as a substitute for licensed professional advice. Consult qualified experts before making contractual or financial commitments.
          </p>
          <h3 className="text-sm font-semibold text-brand-text/80">External resources</h3>
          <p>
            We may link to third-party websites for convenience. We do not control third-party content and are not responsible for their claims or practices.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-brand-text">Limitation of Responsibility</h2>
          <p>
            By using RentX, you agree that decisions made using this information are your responsibility. We make reasonable efforts to maintain quality but cannot guarantee uninterrupted service or error-free content.
          </p>
          <p>
            Additional legal terms are available in our{" "}
            <Link className="underline hover:text-brand-text" href="/terms">Terms &amp; Conditions</Link>.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

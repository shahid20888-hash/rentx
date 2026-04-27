import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "About RentX",
  description: "Learn how RentX approaches cost-of-living data and independent editorial standards.",
  path: "/about/"
});

export default function AboutPage() {
  const seoLongform = getStaticSeoLongformContent("about");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">About RentX</h1>
        <p className="max-w-3xl text-sm">
          RentX is an independent digital publication focused on U.S. cost-of-living research, relocation planning, and practical budgeting insights.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">Who We Are</h2>
          <p>
            Our mission is to help readers compare cities and states with transparent information instead of marketing hype. We publish independent content for students, renters, families, and professionals evaluating where to live.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">What We Publish</h2>
          <h3 className="text-sm font-semibold text-brand-muted">Mission and vision</h3>
          <p>
            Our mission is to make relocation decisions less stressful through understandable cost-of-living analysis. Our vision is a transparent, user-first platform where people can compare places confidently.
          </p>
          <h3 className="text-sm font-semibold text-brand-muted">Core coverage</h3>
          <p>
            RentX covers housing, transportation, groceries, utilities, healthcare, and lifestyle expenses through city profiles, state overviews, comparisons, and editorial guides.
          </p>
          <h3 className="text-sm font-semibold text-brand-muted">Editorial standards</h3>
          <p>
            We apply documented editorial practices for sourcing, updates, and corrections. Read our{" "}
            <Link className="underline hover:text-brand-text" href="/editorial-policy">Editorial Policy</Link> for details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Ownership and Transparency</h2>
          <p>
            RentX operates as an independent informational website. We may use advertising to support operations, but paid relationships do not control editorial conclusions.
          </p>
          <p>
            For support, partnership inquiries, or corrections, contact{" "}
            <a className="underline hover:text-brand-text" href="mailto:support@rentx.us">support@rentx.us</a> or use our{" "}
            <Link className="underline hover:text-brand-text" href="/contact">Contact page</Link>.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

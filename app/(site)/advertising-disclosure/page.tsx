import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Advertising Disclosure",
  description: "Learn how advertising supports RentX and how editorial independence is protected.",
  path: "/advertising-disclosure/"
});

export default function AdvertisingDisclosurePage() {
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Advertising Disclosure</h1>
        <p className="max-w-3xl text-sm">
          This page explains how advertising may appear on RentX and how we maintain editorial independence and reader trust.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">How RentX Is Supported</h2>
          <p>
            RentX is supported through display advertising (such as Google AdSense), sponsored content, affiliate marketing partnerships, and partner referral options. When you interact with or purchase services through these links, we may receive a commission or referral fee at no extra cost to you. This revenue enables us to maintain free, open access to our cost-of-living databases and budgeting resources.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Editorial Independence</h2>
          <h3 className="text-sm font-semibold text-brand-muted">No paid ranking manipulation</h3>
          <p>
            Advertisers and sponsors do not control our rankings, conclusions, or comparisons. Editorial decisions are made independently by our content team.
          </p>
          <h3 className="text-sm font-semibold text-brand-muted">Clear ad labeling</h3>
          <p>
            We label ad sections clearly and avoid excessive ad density to keep the reading experience clean and useful.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Related Policies</h2>
          <p>
            For additional details, review our{" "}
            <Link className="underline hover:text-brand-text" href="/editorial-policy">Editorial Policy</Link>,{" "}
            <Link className="underline hover:text-brand-text" href="/privacy-policy">Privacy Policy</Link>, and{" "}
            <Link className="underline hover:text-brand-text" href="/cookie-policy">Cookie Policy</Link>.
          </p>
        </section>
      </BubbleCard>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Advertising Disclosure",
              description: "Learn how advertising supports RentX and how editorial independence is protected.",
              path: "/advertising-disclosure/"
            })
          )
        }}
      />
    </div>
  );
}

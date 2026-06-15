import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How RentX handles basic usage data and respects your privacy.",
  path: "/privacy-policy/"
});

export default function PrivacyPolicyPage() {
  const seoLongform = getStaticSeoLongformContent("privacy");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Privacy Policy</h1>
        <p className="max-w-3xl text-sm">
          This Privacy Policy explains how RentX collects, uses, stores, and protects information when you browse our site, submit forms, or interact with our tools and content.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">Information We Collect</h2>
          <h3 className="text-sm font-semibold text-brand-muted">Usage data</h3>
          <p>
            We may collect technical information such as browser type, device details, referring pages, and approximate location data derived from IP addresses to improve reliability and analytics.
          </p>
          <h3 className="text-sm font-semibold text-brand-muted">Information you provide</h3>
          <p>
            If you contact us or submit a request, we may collect your name, email address, and message details so we can respond and provide support.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">How We Use Information</h2>
          <p>
            We use collected information to operate the website, improve content quality, detect abuse, answer inquiries, and measure which pages are most useful to readers.
          </p>
          <p>
            We do not sell personal information. We only share limited data with service providers that help us host the site, analyze traffic, or prevent fraud.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Advertising, Cookies, and Consent</h2>
          <p>
            RentX displays third-party advertisements served by networks like Google AdSense. Google and other third-party vendors use cookies to serve targeted ads based on your prior visits to our site or other websites. You may manage these tracking preferences or opt out of personalized advertising by visiting Google's Ads Settings. We also store user-submitted information (such as names, emails, and locations provided on our contact and relocation lead forms) solely to respond to your specific requests and do not sell this personal data to third parties.
          </p>
          <p>
            For cookie details, review our <Link className="underline hover:text-brand-text" href={"/cookie-policy/" as any}>Cookie Policy</Link>. For ad and content standards, see our{" "}
            <Link className="underline hover:text-brand-text" href={"/editorial-policy/" as any}>Editorial Policy</Link>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Your Rights and Contact</h2>
          <p>
            You may request access, correction, or deletion of personal information we hold about you by emailing{" "}
            <a className="underline hover:text-brand-text" href="mailto:support@rentx.us">support@rentx.us</a>.
          </p>
          <p>
            This policy may be updated when our practices change. Material updates will be reflected on this page.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Privacy Policy",
              description: "How RentX handles basic usage data and respects your privacy.",
              path: "/privacy-policy/"
            })
          )
        }}
      />
    </div>
  );
}

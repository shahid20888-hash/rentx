import type { Metadata } from "next";
import Link from "next/link";
import { BubbleCard } from "@/components/BubbleCard";
import { buildMetadata } from "@/lib/seo";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Learn what cookies are, why RentX uses them, and how to control them.",
  path: "/cookie-policy/"
});

export default function CookiePolicyPage() {
  const seoLongform = getStaticSeoLongformContent("cookiePolicy");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Cookie Policy</h1>
        <p className="max-w-3xl text-sm">
          This Cookie Policy explains how RentX and trusted third-party services use cookies and similar technologies to provide, secure, and improve the website.
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">What Cookies Are</h2>
          <p>
            Cookies are small text files stored in your browser. They help websites remember settings, maintain performance, and understand how pages are used.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">How We Use Cookies</h2>
          <h3 className="text-sm font-semibold text-brand-muted">Essential cookies</h3>
          <p>Used for core site functions, security, and stability.</p>
          <h3 className="text-sm font-semibold text-brand-muted">Analytics cookies</h3>
          <p>Used to understand visitor behavior so we can improve readability, navigation, and page performance.</p>
          <h3 className="text-sm font-semibold text-brand-muted">Advertising cookies</h3>
          <p>May be used by ad partners to deliver relevant ads and frequency controls, subject to their own privacy policies.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Managing Cookie Preferences</h2>
          <p>
            You can block, clear, or limit cookies through your browser settings. Restricting cookies may affect some site functionality.
          </p>
          <p>
            For additional privacy rights, review our{" "}
            <Link className="underline hover:text-brand-text" href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Cookie Policy",
              description: "Learn what cookies are, why RentX uses them, and how to control them.",
              path: "/cookie-policy/"
            })
          )
        }}
      />
    </div>
  );
}

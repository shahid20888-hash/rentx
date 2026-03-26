import type { Metadata } from "next";
import { BubbleCard } from "@/components/BubbleCard";
import { buildMetadata } from "@/lib/seo";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Learn what cookies are, why RentX uses them, and how to control them.",
  path: "/cookie-policy/"
});

export default function CookiePolicyPage() {
  const seoLongform = getStaticSeoLongformContent("cookiePolicy");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Cookie Policy</h1>
        <p className="max-w-2xl text-sm">
          This policy explains how cookies and similar technologies may be used on RentX.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          Cookies are small text files that websites place in your browser to remember preferences, improve performance, and measure traffic.
        </p>
        <p>
          RentX may use cookies for analytics, basic site preferences, and security. Third-party services used for analytics or advertising may also set cookies according to their own policies.
        </p>
        <p>
          You can control cookies in your browser settings by blocking or deleting them. Disabling cookies may affect how parts of the site function.
        </p>
        <p>
          If you have a cookie-related request, contact us at <a href="mailto:support@rentx.us">support@rentx.us</a>.
        </p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

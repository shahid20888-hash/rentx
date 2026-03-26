import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How RentX handles basic usage data and respects your privacy.",
  path: "/privacy-policy/"
});

export default function PrivacyPolicyPage() {
  const seoLongform = getStaticSeoLongformContent("privacy");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Privacy Policy</h1>
        <p className="max-w-2xl text-sm">
          This page explains, in plain language, what information we collect when you use RentX and how we use it.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          RentX collects limited usage data to keep the site running reliably, improve the experience, and understand which pages people find most helpful. This may include IP addresses, device information, and anonymized analytics.
        </p>
        <p>
          If we work with advertising partners, they may place cookies or use similar technologies to show relevant ads. You can usually manage these settings through your browser or the ad platform controls.
        </p>
        <p>
          We do not sell your personal information. When you choose to share contact details through a form, we use that information only to follow up on your request or connect you with a relevant professional.
        </p>
        <p>
          To request data deletion or ask privacy questions, contact <a href="mailto:support@rentx.us">support@rentx.us</a>.
        </p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

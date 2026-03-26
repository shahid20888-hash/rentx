import type { Metadata } from "next";
import { BubbleCard } from "@/components/BubbleCard";
import { buildMetadata } from "@/lib/seo";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "DMCA Policy",
  description: "Read the RentX copyright policy and DMCA takedown request process.",
  path: "/dmca/"
});

export default function DmcaPage() {
  const seoLongform = getStaticSeoLongformContent("dmca");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">DMCA Policy</h1>
        <p className="max-w-2xl text-sm">
          RentX respects intellectual property rights and responds to valid copyright complaints.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          If you believe content on RentX infringes your copyright, submit a written DMCA notice with enough information for us to identify the material and evaluate your claim.
        </p>
        <p>
          Include: your name and contact details, identification of the copyrighted work, the URL of the allegedly infringing material, a statement of good-faith belief, and a statement under penalty of perjury that your notice is accurate.
        </p>
        <p>
          Send DMCA notices to <a href="mailto:support@rentx.us">support@rentx.us</a>.
        </p>
        <p>
          We may remove or restrict access to disputed material while reviewing valid notices and may contact the reporting party for clarification.
        </p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

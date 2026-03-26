import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: "The basic terms for using RentX and its cost-of-living information.",
  path: "/terms/"
});

export default function TermsPage() {
  const seoLongform = getStaticSeoLongformContent("terms");

  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Terms of Service</h1>
        <p className="max-w-2xl text-sm">
          These terms set out how you may use RentX and what you can expect from us in return.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          RentX is provided on an "as is" and "as available" basis. We work to keep information accurate and up to date, but we cannot guarantee that every number, estimate, or description will be current or complete.
        </p>
        <p>
          You agree to use the site for lawful purposes only and not to rely on it as your sole source of information when making major financial, housing, or employment decisions. Always cross-check with primary sources and professionals where appropriate.
        </p>
        <p>By using RentX, you accept that we are not liable for decisions you make based on information on this site or linked sites.</p>
        <p>These terms are governed by the laws of the United States, without regard to conflict-of-law principles.</p>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

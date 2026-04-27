import type { Metadata } from "next";
import Link from "next/link";
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
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">DMCA Policy</h1>
        <p className="max-w-3xl text-sm">
          RentX respects intellectual property rights and responds to valid copyright notices in accordance with the Digital Millennium Copyright Act (DMCA).
        </p>
        <p className="text-xs text-brand-muted">Last updated: {lastUpdated}</p>
      </BubbleCard>

      <BubbleCard as="section" className="space-y-5 p-6 text-sm">
        <section className="space-y-2">
          <h2 className="text-base font-semibold">Submitting a DMCA Notice</h2>
          <p>
            If you believe your copyrighted work appears on RentX without authorization, send a written notice containing:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your full legal name and valid contact information.</li>
            <li>Identification of the copyrighted work claimed to be infringed.</li>
            <li>The exact URL or location of the allegedly infringing content.</li>
            <li>A good-faith statement that use is not authorized.</li>
            <li>A statement under penalty of perjury that your notice is accurate.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Where to Send Notices</h2>
          <p>
            Email all DMCA notifications to{" "}
            <a className="underline hover:text-brand-text" href="mailto:support@rentx.us">support@rentx.us</a>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold">Counter-Notice and Review</h2>
          <h3 className="text-sm font-semibold text-brand-muted">Notice processing</h3>
          <p>
            After receiving a compliant notice, we may remove or limit access to the disputed material while we review the claim. We may also request additional information from either party.
          </p>
          <p>
            For broader policy context, refer to our{" "}
            <Link className="underline hover:text-brand-text" href="/terms">Terms &amp; Conditions</Link>.
          </p>
        </section>
      </BubbleCard>
      <SeoLongform {...seoLongform} />
    </div>
  );
}

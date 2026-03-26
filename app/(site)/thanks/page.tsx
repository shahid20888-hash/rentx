import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Thank You",
  description: "Thank you for reaching out to RentX.",
  path: "/thanks/"
});

export default function ThanksPage() {
  return (
    <div className="space-y-5">
      <BubbleCard as="header" className="space-y-3 p-6">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Thanks for getting in touch</h1>
        <p className="max-w-2xl text-sm">
          We received your message. If you shared contact details, we will follow up as soon as we can.
        </p>
      </BubbleCard>
      <BubbleCard as="section" className="space-y-3 p-6 text-sm">
        <p>
          In the meantime, you can continue exploring cost-of-living information across US cities and states, or read our short guides on budgeting and planning a move.
        </p>
        <div className="flex flex-wrap gap-3 text-xs">
          <Link href="/states" className={primaryButtonClass}>
            Explore States -&gt;
          </Link>
          <Link href="/cities" className={primaryButtonClass}>
            Explore Cities -&gt;
          </Link>
          <Link href="/guides" className={primaryButtonClass}>
            Read Guides -&gt;
          </Link>
        </div>
      </BubbleCard>
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import FindAProClient from "@/components/FindAProClient";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Find a local real estate pro",
  description: "Request help from local real estate professionals by city.",
  path: "/find-a-pro/"
});

export default function FindAProPage() {
  return (
    <>
      <Suspense fallback={
        <div className="flex items-center justify-center p-20 text-brand-muted text-sm font-semibold">
          Loading Local Professionals...
        </div>
      }>
        <FindAProClient />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "Find a Local Real Estate Pro",
              description: "Request help from local real estate professionals by city.",
              path: "/find-a-pro/"
            })
          )
        }}
      />
    </>
  );
}

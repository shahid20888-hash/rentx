import type { Metadata } from "next";
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
      <FindAProClient />
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

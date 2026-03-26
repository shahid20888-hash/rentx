import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "RentX Cost of Living Explorer",
  description:
    "Browse states and cities across the US to understand housing, transportation, groceries, and overall cost of living.",
  path: "/"
});

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
      <Header />
      <main className="flex-1 py-8 sm:py-10">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
}

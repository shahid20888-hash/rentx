import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BubbleCard } from "@/components/BubbleCard";
import { SeoLongform } from "@/components/SeoLongform";
import { getStaticSeoLongformContent } from "@/lib/seoLongformContent";
import { webPageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "About RentX",
  description: "Learn how RentX approaches cost-of-living data and independent editorial standards.",
  path: "/about/"
});

export default function AboutPage() {
  const seoLongform = getStaticSeoLongformContent("about");
  const lastUpdated = "April 27, 2026";

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-brand-bg shadow-xl">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.png"
            alt="RentX Editorial Office Workspace"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A23] via-[#0E2A23]/95 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A23] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 space-y-4 px-6 py-12 sm:px-10 sm:py-16 max-w-3xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary bg-brand-secondary/15 px-3 py-1.5 rounded-lg border border-brand-secondary/20">
            About RentX
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white leading-tight">
            Independent cost-of-living research.
          </h1>
          <p className="text-sm sm:text-base text-brand-muted/95 leading-relaxed">
            RentX is an independent digital publication focused on U.S. cost-of-living research, relocation planning, and practical budgeting insights.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs text-brand-muted/70">
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr] items-stretch">
        <BubbleCard as="section" className="space-y-6 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
              <h2 className="text-base font-bold uppercase tracking-wider text-brand-accent">Who We Are</h2>
            </div>
            <p className="text-sm text-brand-muted/90 leading-relaxed">
              Our mission is to help readers compare cities and states with transparent information instead of marketing hype. We publish independent content for students, renters, families, and professionals evaluating where to live.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/[0.04]">
            <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
              <h2 className="text-base font-bold uppercase tracking-wider text-brand-accent">What We Publish</h2>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Mission and vision</h3>
              <p className="text-xs text-brand-muted/85 leading-relaxed">
                Our mission is to make relocation decisions less stressful through understandable cost-of-living analysis. Our vision is a transparent, user-first platform where people can compare places confidently.
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-white">Core coverage</h3>
              <p className="text-xs text-brand-muted/85 leading-relaxed">
                RentX covers housing, transportation, groceries, utilities, healthcare, and lifestyle expenses through city profiles, state overviews, comparisons, and editorial guides.
              </p>
            </div>
            
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-white">Editorial standards</h3>
              <p className="text-xs text-brand-muted/85 leading-relaxed">
                We apply documented editorial practices for sourcing, updates, and corrections. Read our{" "}
                <Link className="underline hover:text-brand-accent text-brand-text font-medium" href={"/editorial-policy/" as any}>Editorial Policy</Link> for details.
              </p>
            </div>
          </div>
        </BubbleCard>

        <div className="flex flex-col gap-6">
          <BubbleCard as="section" className="space-y-4 p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-2 border-l-2 border-brand-secondary pl-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-brand-accent font-semibold">Ownership & Transparency</h2>
            </div>
            <p className="text-xs text-brand-muted/85 leading-relaxed">
              RentX operates as an independent informational website. We may use advertising to support operations, but paid relationships do not control editorial conclusions.
            </p>
            <p className="text-xs text-brand-muted/85 leading-relaxed pt-2">
              For support, partnership inquiries, or corrections, contact{" "}
              <a className="underline hover:text-brand-accent text-brand-text" href="mailto:support@rentx.us">support@rentx.us</a> or use our{" "}
              <Link className="underline hover:text-brand-accent text-brand-text font-medium" href={"/contact/" as any}>Contact page</Link>.
            </p>
          </BubbleCard>

          {/* Custom Vetted Visual Box */}
          <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.1] shadow-lg min-h-[200px] group">
            <Image
              src="/images/about-hero.png"
              alt="Editorial workspace desk"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover opacity-65 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-secondary">Core Value</p>
              <h4 className="text-sm font-bold text-white leading-tight">100% Independent Analysis</h4>
              <p className="text-[10px] text-white/80 leading-snug">Our findings are built from raw data, not vendor sponsorship.</p>
            </div>
          </div>
        </div>
      </div>
      <SeoLongform {...seoLongform} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webPageSchema({
              name: "About RentX",
              description: "Learn how RentX approaches cost-of-living data and independent editorial standards.",
              path: "/about/"
            })
          )
        }}
      />
    </div>
  );
}

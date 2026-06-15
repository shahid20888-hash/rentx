"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type AdSlotProps = {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: string;
};

const PROMOTIONS = [
  {
    badge: "Cost Comparison",
    title: "Compare Cities Side-by-Side",
    description: "Compare cost of living index, rent levels, taxes, and salary requirements between any two US cities.",
    btnText: "Compare Cities",
    link: "/compare",
    colorTheme: "border-brand-secondary/20 bg-gradient-to-r from-brand-secondary/15 via-brand-surface to-brand-surface"
  },
  {
    badge: "Expert Service",
    title: "Need Relocation Help?",
    description: "Connect with vetted real estate experts, moving specialists, and local guides to plan your transition.",
    btnText: "Find a Pro",
    link: "/find-a-pro",
    colorTheme: "border-brand-accent/20 bg-gradient-to-r from-brand-accent/10 via-brand-surface to-brand-surface"
  },
  {
    badge: "Rent Guide",
    title: "How Much Rent Can You Afford?",
    description: "Use our salary rent calculators and budgeting guidelines to see how far your income stretches.",
    btnText: "Calculate Affordability",
    link: "/guides/how-much-rent-can-i-afford-75000-salary",
    colorTheme: "border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-brand-surface to-brand-surface"
  }
];

export function AdSlot({
  adClient,
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = "true",
}: AdSlotProps) {
  const [adStatus, setAdStatus] = useState<"loading" | "filled" | "unfilled">("loading");
  const [promo, setPromo] = useState<typeof PROMOTIONS[0]>(PROMOTIONS[0]);
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    // Choose a random internal promotion to display as the fallback
    const randomIndex = Math.floor(Math.random() * PROMOTIONS.length);
    setPromo(PROMOTIONS[randomIndex]);

    // Push the ad to adsbygoogle
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("adsbygoogle push failed: ", err);
    }

    const insElement = insRef.current;
    if (!insElement) return;

    // Check data-ad-status attribute
    const checkStatus = () => {
      const status = insElement.getAttribute("data-ad-status");
      if (status === "filled") {
        setAdStatus("filled");
        return true;
      } else if (status === "unfilled") {
        setAdStatus("unfilled");
        return true;
      }
      return false;
    };

    // Initial check
    if (checkStatus()) return;

    // Set up MutationObserver to check for changes to attributes
    const observer = new MutationObserver(() => {
      if (checkStatus()) {
        observer.disconnect();
      }
    });

    observer.observe(insElement, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
      childList: true,
    });

    // Timeout fallback (2.5 seconds): if ad doesn't load/fill, show fallback promotion
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      if (!checkStatus()) {
        setAdStatus("unfilled");
      }
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      {/* 1. FALLBACK PROMOTION CONTAINER (Shown when loading or unfilled) */}
      {adStatus !== "filled" && (
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl border ${promo.colorTheme} shadow-md transition-all duration-300`}
        >
          <div className="space-y-3 max-w-2xl relative z-10">
            <span className="inline-flex items-center rounded-full bg-[#C78B5E]/10 border border-[#C78B5E]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C78B5E]">
              {promo.badge}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {promo.title}
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              {promo.description}
            </p>
          </div>
          <div className="flex items-center shrink-0 relative z-10">
            <Link
              href={promo.link as any}
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-[#C78B5E] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0E2A23] shadow-[0_4px_12px_rgba(199,139,94,0.15)] transition hover:bg-[#B8734C] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C78B5E]/40"
            >
              {promo.btnText}
            </Link>
          </div>
          {/* Decorative Glow */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#C78B5E]/5 blur-3xl pointer-events-none" />
        </div>
      )}

      {/* 2. GOOGLE ADSENSE ELEMENT */}
      {/* Rendered in DOM from mount so AdSense script detects it, but styled as collapsed if unfilled */}
      <ins
        ref={insRef}
        className={`adsbygoogle ${
          adStatus === "filled"
            ? "block w-full min-h-[120px] bg-brand-surface border border-brand-border rounded-2xl p-3"
            : "absolute opacity-0 pointer-events-none -z-10 w-full h-[120px] top-0 left-0"
        }`}
        style={{ display: "block" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BubbleCard } from "@/components/BubbleCard";
import { pillButtonClass } from "@/components/ui/PillButton";

type SeoLongformLink = {
  href: string;
  label: string;
};

type SeoLongformSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  internalLinks?: SeoLongformLink[];
};

type SeoLongformProps = {
  title: string;
  summary: string;
  sections: SeoLongformSection[];
  defaultExpanded?: boolean;
};

export function SeoLongform({
  title,
  summary,
  sections,
  defaultExpanded = false
}: SeoLongformProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const contentId = useId();

  return (
    <BubbleCard as="section" className="space-y-4 rounded-2xl p-5 sm:p-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight text-brand-primary sm:text-xl">
          {title}
        </h2>
        <p className="text-sm text-brand-text/90">{summary}</p>
        <button
          type="button"
          className={`${pillButtonClass} text-xs`}
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-controls={contentId}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>

      {expanded && (
        <div id={contentId} className="space-y-5 text-sm text-brand-text/90">
          {sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h3 className="text-base font-semibold text-brand-primary">{section.heading}</h3>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc space-y-1 pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.internalLinks && section.internalLinks.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {section.internalLinks.map((link) => (
                    <Link
                      key={`${section.heading}-${link.href}-${link.label}`}
                      href={link.href as any}
                      className={`${pillButtonClass} min-h-0 px-4 py-2 text-xs no-underline`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </BubbleCard>
  );
}

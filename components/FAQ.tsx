import type { ReactNode } from "react";
import { faqSchema } from "@/lib/schema";
import { BubbleCard } from "./BubbleCard";

export type FAQItem = {
  question: string;
  answer: ReactNode;
};

type FAQProps = {
  items: FAQItem[];
  heading?: string;
};

export function FAQ({ items, heading = "Frequently asked questions" }: FAQProps) {
  const schema = faqSchema(
    items.map((item) => ({
      question: item.question,
      answer: typeof item.answer === "string" ? item.answer : ""
    }))
  );

  return (
    <section aria-label={heading} className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{heading}</h2>
      </div>
      <BubbleCard className="space-y-3 p-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-brand-border bg-brand-bg p-3 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-2 text-sm font-medium text-brand-primary">
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#C78B5E] text-xs text-[#0E2A23] group-open:rotate-180"
              >
                v
              </span>
            </summary>
            <div className="mt-2 text-xs text-brand-text/85 sm:text-sm">{item.answer}</div>
          </details>
        ))}
      </BubbleCard>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}

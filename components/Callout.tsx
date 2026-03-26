import type { ReactNode } from "react";
import { BubbleCard } from "./BubbleCard";
import { Badge } from "./ui/Badge";

type CalloutProps = {
  title: string;
  children: ReactNode;
  tone?: "info" | "success" | "warning" | "error";
};

export function Callout({ title, children, tone = "info" }: CalloutProps) {
  const toneStyles: Record<NonNullable<CalloutProps["tone"]>, { card: string; badge: string; label: string; tag: string }> = {
    info: {
      card: "border-brand-border bg-brand-hover",
      badge: "bg-brand-hover text-brand-text border-brand-border",
      label: "text-brand-text",
      tag: "Info"
    },
    success: {
      card: "border-brand-border bg-brand-hover",
      badge: "bg-brand-hover text-brand-text border-brand-border",
      label: "text-brand-text",
      tag: "Success"
    },
    warning: {
      card: "border-brand-border bg-brand-hover",
      badge: "bg-brand-hover text-brand-text border-brand-border",
      label: "text-brand-text",
      tag: "Alert"
    },
    error: {
      card: "border-brand-border bg-brand-hover",
      badge: "bg-brand-hover text-brand-text border-brand-border",
      label: "text-brand-text",
      tag: "Error"
    }
  };
  const resolvedTone = toneStyles[tone];

  return (
    <BubbleCard as="section" className={`px-4 py-3 text-sm sm:px-5 sm:py-4 ${resolvedTone.card}`} aria-label={title}>
      <div className="flex items-start gap-3">
        <Badge className={resolvedTone.badge}>{resolvedTone.tag}</Badge>
        <div className="space-y-1.5">
          <h2 className={`text-xs font-semibold uppercase tracking-wide ${resolvedTone.label}`}>{title}</h2>
          <div className="text-xs text-brand-text/85 sm:text-sm">{children}</div>
        </div>
      </div>
    </BubbleCard>
  );
}


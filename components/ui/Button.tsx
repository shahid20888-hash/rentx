import type { ButtonHTMLAttributes, ReactNode } from "react";
import { pillButtonClass } from "./PillButton";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export const primaryButtonClass =
  pillButtonClass;

export const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-full border border-brand-border bg-brand-surface px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-focus";

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${variant === "secondary" ? secondaryButtonClass : primaryButtonClass} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

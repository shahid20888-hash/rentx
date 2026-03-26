import type { ButtonHTMLAttributes, ReactNode } from "react";

export const pillButtonClass =
  "inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-[#C78B5E] px-5 py-2.5 text-sm font-semibold text-[#0E2A23] shadow-[0_6px_20px_rgba(199,139,94,0.25)] transition hover:bg-[#B8734C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C78B5E]/40";

type PillButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

export function PillButton({ children, className = "", ...props }: PillButtonProps) {
  return (
    <button {...props} className={`${pillButtonClass} ${className}`.trim()}>
      {children}
    </button>
  );
}

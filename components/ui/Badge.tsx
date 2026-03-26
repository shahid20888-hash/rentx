import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-transparent bg-[#C78B5E] px-3 py-1.5 text-xs font-semibold text-[#0E2A23] transition hover:bg-[#B8734C] ${className}`.trim()}
    >
      {children}
    </span>
  );
}

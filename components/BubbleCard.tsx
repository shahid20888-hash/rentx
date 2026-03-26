import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type BubbleCardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const baseClasses =
  "bubble-card rounded-[28px] border border-brand-border bg-brand-surface shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(0,0,0,0.08)]";

export function BubbleCard<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...rest
}: BubbleCardProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component className={`${baseClasses} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
}

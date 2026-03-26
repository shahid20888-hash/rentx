import { Badge } from "./ui/Badge";

type StatPillsProps = {
  overall: number;
  rent: number;
  homePrice: number;
  utilities: number;
};

export function StatPills({ overall, rent, homePrice, utilities }: StatPillsProps) {
  const items = [
    { label: "Overall index", value: overall },
    { label: "Rent", value: rent },
    { label: "Home price", value: homePrice },
    { label: "Utilities", value: utilities }
  ];

  return (
    <dl className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-bg px-3 py-1.5 text-xs"
        >
          <dt className="font-medium text-brand-primary">{item.label}</dt>
          <dd><Badge>{item.value}</Badge></dd>
        </div>
      ))}
    </dl>
  );
}


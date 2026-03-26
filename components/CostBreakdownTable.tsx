import type { CityCostIndices } from "@/lib/data";
import { BubbleCard } from "./BubbleCard";
import { Badge } from "./ui/Badge";

type CostBreakdownTableProps = {
  indices: CityCostIndices;
};

export function CostBreakdownTable({ indices }: CostBreakdownTableProps) {
  const rows = [
    { label: "Overall", key: "overall", note: "Blended index across major categories" },
    { label: "Rent", key: "rent", note: "Typical monthly rent for comparable housing" },
    { label: "Home price", key: "homePrice", note: "Estimated purchase prices" },
    { label: "Utilities", key: "utilities", note: "Electricity, gas, water, basic internet" },
    { label: "Groceries", key: "groceries", note: "Everyday food and household items" },
    { label: "Transportation", key: "transport", note: "Gas, transit passes, basic car costs" },
    { label: "Healthcare", key: "healthcare", note: "Routine care and insurance estimates" }
  ] as const;

  return (
    <BubbleCard as="section" aria-label="Cost breakdown table" className="overflow-hidden">
      <div className="border-b border-brand-border bg-brand-bg px-4 py-3">
        <h2 className="text-sm font-semibold text-brand-primary">Cost breakdown by category</h2>
        <p className="mt-1 text-xs text-brand-text/80">
          100 represents the estimated US average. Values are illustrative and intended for
          comparison only.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-xs sm:text-sm">
          <thead>
            <tr>
              <th className="border-b border-brand-border bg-brand-bg px-4 py-2 text-xs font-medium text-brand-primary">
                Category
              </th>
              <th className="border-b border-brand-border bg-brand-bg px-4 py-2 text-xs font-medium text-brand-primary">
                Index
              </th>
              <th className="border-b border-brand-border bg-brand-bg px-4 py-2 text-xs font-medium text-brand-primary">
                Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              const value = indices[row.key];
              const isStripe = index % 2 === 1;
              return (
                <tr key={row.key} className={isStripe ? "bg-brand-bg" : "bg-brand-surface"}>
                  <td className="whitespace-nowrap px-4 py-2 text-brand-primary">{row.label}</td>
                  <td className="px-4 py-2">
                    <Badge>{value}</Badge>
                  </td>
                  <td className="px-4 py-2 text-brand-text/80">{row.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </BubbleCard>
  );
}

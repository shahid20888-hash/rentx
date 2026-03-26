"use client";

import { useMemo, useState } from "react";
import { BubbleCard } from "./BubbleCard";

type BudgetEstimatorProps = {
  cityName: string;
  stateCode: string;
  overallIndex: number;
};

const BASELINE_BY_HOUSEHOLD: Record<1 | 2 | 4, number> = {
  1: 2400,
  2: 3900,
  4: 6200
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function BudgetEstimator({ cityName, stateCode, overallIndex }: BudgetEstimatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState<string>("7000");
  const [householdSize, setHouseholdSize] = useState<1 | 2 | 4>(2);

  const parsedIncome = Number.parseFloat(monthlyIncome);
  const income = Number.isFinite(parsedIncome) && parsedIncome > 0 ? parsedIncome : 0;
  const baseline = BASELINE_BY_HOUSEHOLD[householdSize] ?? BASELINE_BY_HOUSEHOLD[2];

  const estimatedCost = useMemo(() => {
    const safeIndex = Number.isFinite(overallIndex) && overallIndex > 0 ? overallIndex : 100;
    return Math.round((baseline * safeIndex) / 100);
  }, [baseline, overallIndex]);

  const remaining = Math.round(income - estimatedCost);

  return (
    <BubbleCard
      as="section"
      aria-label="Budget estimator"
      className="space-y-4 p-5 sm:p-6"
    >
      <header className="space-y-1">
        <h2 className="text-base font-semibold text-brand-primary">Budget estimator</h2>
        <p className="text-xs text-brand-text/80">
          Estimate monthly costs in {cityName}, {stateCode} using the overall index of {overallIndex}.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="income-input">
            Monthly income
          </label>
          <input
            id="income-input"
            type="number"
            min="0"
            step="100"
            value={monthlyIncome}
            onChange={(event) => setMonthlyIncome(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm placeholder:text-brand-text/60 focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-brand-primary" htmlFor="household-input">
            Household size
          </label>
          <select
            id="household-input"
            value={householdSize}
            onChange={(event) => setHouseholdSize(Number(event.target.value) as 1 | 2 | 4)}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-brand-text shadow-sm [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-[#C78B5E]/40"
          >
            <option value={1}>1 person</option>
            <option value={2}>2 people</option>
            <option value={4}>4 people</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border border-brand-border bg-brand-bg p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-brand-primary">Estimated monthly cost</p>
          <p className="text-sm font-semibold text-brand-primary">{usd.format(estimatedCost)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-brand-primary">Remaining amount</p>
          <p className={`text-sm font-semibold ${remaining >= 0 ? "text-brand-primary" : "text-brand-text/75"}`}>
            {usd.format(remaining)}
          </p>
        </div>
      </div>
    </BubbleCard>
  );
}

import CompleteGuide from "@/content/insights/complete-guide-us-cost-of-living.mdx";
import CompareCities from "@/content/insights/compare-cities-before-relocating.mdx";
import RentVsBuy2026 from "@/content/insights/rent-vs-buy-2026-full-breakdown.mdx";
import IndexExplained from "@/content/insights/cost-of-living-index-explained.mdx";
import SalaryNeeds from "@/content/insights/salary-needs-major-us-cities.mdx";
import HiddenCosts from "@/content/insights/hidden-costs-moving-states.mdx";
import PropertyTaxes from "@/content/insights/property-taxes-by-state-explained.mdx";
import UtilityCosts from "@/content/insights/utility-costs-across-us-cities.mdx";
import GroceryCosts from "@/content/insights/grocery-cost-differences-by-region.mdx";
import TransportCosts from "@/content/insights/transportation-costs-urban-vs-suburban.mdx";
import HealthcareCosts from "@/content/insights/healthcare-costs-by-region.mdx";
import AffordableFamilies from "@/content/insights/affordable-cities-for-families-2026.mdx";
import ExpensiveCities from "@/content/insights/most-expensive-us-cities-analysis.mdx";
import RelocationTemplate from "@/content/insights/relocation-budget-template.mdx";
import InflationImpact from "@/content/insights/inflation-impact-on-cost-of-living.mdx";

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  coverImage: string;
  coverAlt: string;
  coverCaption: string;
};

export type InsightDefinition = {
  slug: string;
  meta: InsightMeta;
  Component: (props: any) => JSX.Element;
};

export const INSIGHTS: InsightDefinition[] = [
  {
    slug: "complete-guide-us-cost-of-living",
    meta: {
      slug: "complete-guide-us-cost-of-living",
      title: "US Cost of Living Guide 2026",
      description:
        "Learn how housing, utilities, food, healthcare, and transportation shape real monthly budgets in the US, with practical planning steps for movers and families.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/complete-guide-us-cost-of-living.webp",
      coverAlt: "Modern apartment buildings in a major US city at sunset",
      coverCaption:
        "Housing choices, commute distance, and neighborhood pricing all interact to define what affordability looks like in real life."
    },
    Component: CompleteGuide
  },
  {
    slug: "compare-cities-before-relocating",
    meta: {
      slug: "compare-cities-before-relocating",
      title: "How to Compare Cities Before Moving",
      description:
        "Use a practical city-comparison framework that goes beyond rent to include taxes, utilities, commuting, and lifestyle tradeoffs before a US relocation.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/compare-cities-before-relocating.webp",
      coverAlt: "Residential skyline with high-rise apartment towers in downtown",
      coverCaption:
        "Comparing cities works best when you measure full monthly life costs, not just headline rent numbers."
    },
    Component: CompareCities
  },
  {
    slug: "rent-vs-buy-2026-full-breakdown",
    meta: {
      slug: "rent-vs-buy-2026-full-breakdown",
      title: "Rent vs Buy in 2026: Practical Guide",
      description:
        "Break down the rent-versus-buy decision with clear US-focused math: monthly payments, taxes, insurance, maintenance, timing risk, and equity assumptions.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/rent-vs-buy-2026-full-breakdown.webp",
      coverAlt: "Suburban single-family homes representing rent versus buy choices",
      coverCaption:
        "The better option depends on timeline, cash reserves, and local housing volatility more than on simple monthly payment comparisons."
    },
    Component: RentVsBuy2026
  },
  {
    slug: "cost-of-living-index-explained",
    meta: {
      slug: "cost-of-living-index-explained",
      title: "How Cost-of-Living Indexes Really Work",
      description:
        "Understand what a cost-of-living index measures, where it can mislead, and how to apply index data correctly when comparing US cities, states, and budgets.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/cost-of-living-index-explained.webp",
      coverAlt: "Urban residential district with varied housing density and costs",
      coverCaption:
        "Indexes are useful directionally, but smart decisions come from pairing them with local housing and utility realities."
    },
    Component: IndexExplained
  },
  {
    slug: "salary-needs-major-us-cities",
    meta: {
      slug: "salary-needs-major-us-cities",
      title: "Salary Needed in Major US Cities",
      description:
        "Estimate the income you actually need in large US metros by combining rent, childcare, healthcare, taxes, commuting costs, and savings goals into one budget.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/salary-needs-major-us-cities.webp",
      coverAlt: "City apartment towers and condos near central business district",
      coverCaption:
        "Income planning should match the housing market and daily expenses in the exact city where you plan to live."
    },
    Component: SalaryNeeds
  },
  {
    slug: "hidden-costs-moving-states",
    meta: {
      slug: "hidden-costs-moving-states",
      title: "Hidden Costs of Moving to Another State",
      description:
        "Avoid relocation surprises by planning for deposits, temporary housing, transport, setup fees, and tax changes that often hit after a state-to-state move.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/hidden-costs-moving-states.webp",
      coverAlt: "Row of residential homes in a neighborhood during relocation season",
      coverCaption:
        "Many moving budgets fail because setup costs and short-term housing are underestimated during transitions."
    },
    Component: HiddenCosts
  },
  {
    slug: "property-taxes-by-state-explained",
    meta: {
      slug: "property-taxes-by-state-explained",
      title: "Property Taxes by State: What to Know",
      description:
        "See how property tax differences across states can reshape long-term housing affordability, monthly ownership costs, and city-by-city buy-versus-rent decisions.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/property-taxes-by-state-explained.webp",
      coverAlt: "Single-family homes in a suburban US market with varied property values",
      coverCaption:
        "A lower home price does not always mean lower ownership cost when annual property taxes are significantly higher."
    },
    Component: PropertyTaxes
  },
  {
    slug: "utility-costs-across-us-cities",
    meta: {
      slug: "utility-costs-across-us-cities",
      title: "Utility Costs Across US Cities",
      description:
        "Compare electricity, gas, water, and internet expenses across US cities and learn how climate, building age, and usage patterns shift monthly household bills.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/utility-costs-across-us-cities.webp",
      coverAlt: "Modern residential buildings where utility efficiency affects living costs",
      coverCaption:
        "Utility bills are one of the fastest-changing parts of a budget, especially between climates and home types."
    },
    Component: UtilityCosts
  },
  {
    slug: "grocery-cost-differences-by-region",
    meta: {
      slug: "grocery-cost-differences-by-region",
      title: "Regional Grocery Cost Differences in the US",
      description:
        "Understand why grocery costs vary by region and how households can adjust shopping habits, meal planning, and budget categories to stay on track each month.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/grocery-cost-differences-by-region.webp",
      coverAlt: "Residential district near neighborhood retail areas where food prices vary",
      coverCaption:
        "Regional food pricing can quietly change a family budget even when housing costs remain stable."
    },
    Component: GroceryCosts
  },
  {
    slug: "transportation-costs-urban-vs-suburban",
    meta: {
      slug: "transportation-costs-urban-vs-suburban",
      title: "Urban vs Suburban Transportation Costs",
      description:
        "Compare transportation spending in urban and suburban settings, including transit, gas, parking, insurance, maintenance, and time costs in real US scenarios.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/transportation-costs-urban-vs-suburban.webp",
      coverAlt: "Apartment and condo blocks near major commuter corridors in a US metro",
      coverCaption:
        "Commuting patterns and parking realities often separate affordable neighborhoods from expensive ones."
    },
    Component: TransportCosts
  },
  {
    slug: "healthcare-costs-by-region",
    meta: {
      slug: "healthcare-costs-by-region",
      title: "Healthcare Costs by US Region",
      description:
        "Explore regional healthcare cost differences in the US and how premiums, deductibles, provider networks, and household size affect total annual spending.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/healthcare-costs-by-region.webp",
      coverAlt: "Urban residential towers in a region with varying healthcare access costs",
      coverCaption:
        "Healthcare affordability depends on both insurance structure and where households actually receive care."
    },
    Component: HealthcareCosts
  },
  {
    slug: "affordable-cities-for-families-2026",
    meta: {
      slug: "affordable-cities-for-families-2026",
      title: "Affordable US Cities for Families in 2026",
      description:
        "Review a family-first affordability approach for 2026 that weighs housing, childcare, schools, transportation, healthcare, and essential services together.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/affordable-cities-for-families-2026.webp",
      coverAlt: "Family-oriented suburban homes with nearby schools and services",
      coverCaption:
        "For families, affordability is more than rent: school access, commute, and childcare costs can dominate the budget."
    },
    Component: AffordableFamilies
  },
  {
    slug: "most-expensive-us-cities-analysis",
    meta: {
      slug: "most-expensive-us-cities-analysis",
      title: "Most Expensive US Cities in 2026",
      description:
        "Analyze why certain US metros stay expensive by looking at housing supply, wage pressure, demand concentration, taxes, and recurring household operating costs.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/most-expensive-us-cities-analysis.webp",
      coverAlt: "Dense skyline of high-cost residential towers in a major US city",
      coverCaption:
        "When housing supply lags demand, city costs can remain elevated even when other expenses cool."
    },
    Component: ExpensiveCities
  },
  {
    slug: "relocation-budget-template",
    meta: {
      slug: "relocation-budget-template",
      title: "Relocation Budget Template for US Moves",
      description:
        "Use a practical relocation budget template that captures moving logistics, temporary housing, setup fees, deposits, and month-one costs in a new US city.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/relocation-budget-template.webp",
      coverAlt: "Residential moving day scene with homes and apartment buildings",
      coverCaption:
        "A strong relocation plan separates one-time moving costs from the recurring expenses that begin immediately."
    },
    Component: RelocationTemplate
  },
  {
    slug: "inflation-impact-on-cost-of-living",
    meta: {
      slug: "inflation-impact-on-cost-of-living",
      title: "Inflation and Your Cost of Living",
      description:
        "See how inflation changes real affordability in the US, from rent and groceries to utilities and healthcare, and how to adjust your monthly spending plan.",
      date: "2026-02-28",
      updatedAt: "2026-02-28",
      author: "Shahid Saleem",
      coverImage: "/images/insights/inflation-impact-on-cost-of-living.webp",
      coverAlt: "Apartment buildings and condos in a market affected by rising costs",
      coverCaption:
        "Inflation affects households unevenly, and housing-related costs often absorb the largest share of that pressure."
    },
    Component: InflationImpact
  }
];

export function getInsightBySlug(slug: string): InsightDefinition | undefined {
  return INSIGHTS.find((insight) => insight.slug === slug);
}



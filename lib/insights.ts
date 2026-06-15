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

import CaliforniaToTexasMovingCost2026 from "@/content/insights/california-to-texas-moving-cost-2026.mdx";
import SalaryNeededToLiveComfortablyInDallasTx2026 from "@/content/insights/salary-needed-to-live-comfortably-in-dallas-tx-2026.mdx";
import HoustonCostOfLivingFamilyOfFour2026 from "@/content/insights/houston-cost-of-living-family-of-four-2026.mdx";
import MonthlyCostOfLivingSinglePersonUs2026 from "@/content/insights/monthly-cost-of-living-single-person-us-2026.mdx";

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
  category?: string;
  readTime?: string;
};

export type InsightDefinition = {
  slug: string;
  meta: InsightMeta;
  Component: (props: any) => JSX.Element;
};

export const INSIGHTS: InsightDefinition[] = [
  {
    slug: "california-to-texas-moving-cost-2026",
    meta: {
      slug: "california-to-texas-moving-cost-2026",
      title: "California to Texas Moving Cost in 2026: Budget, Hidden Fees, and City Checks",
      description: "Plan a California to Texas move in 2026 with realistic moving costs, hidden fees, rent differences, setup expenses, and city checks for Austin, Dallas, and Houston.",
      date: "2026-06-15",
      updatedAt: "2026-06-15",
      author: "Shahid Saleem",
      coverImage: "/images/insights/california-to-texas-moving-cost-2026.webp",
      coverAlt: "Moving boxes and a budget checklist for a California to Texas relocation",
      coverCaption: "Understanding the true cost of relocating from California to Texas in 2026 requires looking at transport, housing transitions, and local tax shifts.",
      category: "Relocation",
      readTime: "7 min read"
    },
    Component: CaliforniaToTexasMovingCost2026
  },
  {
    slug: "salary-needed-to-live-comfortably-in-dallas-tx-2026",
    meta: {
      slug: "salary-needed-to-live-comfortably-in-dallas-tx-2026",
      title: "Salary Needed to Live Comfortably in Dallas, TX in 2026",
      description: "Estimate the salary needed to live comfortably in Dallas, TX in 2026, including rent, utilities, groceries, transport, healthcare, and savings.",
      date: "2026-06-15",
      updatedAt: "2026-06-15",
      author: "Shahid Saleem",
      coverImage: "/images/insights/salary-needed-dallas-tx-2026.webp",
      coverAlt: "Monthly salary and rent planning for Dallas Texas",
      coverCaption: "Determining a comfortable salary in Dallas in 2026 requires balancing rising rents, transportation needs, and savings goals.",
      category: "Salary Planning",
      readTime: "5 min read"
    },
    Component: SalaryNeededToLiveComfortablyInDallasTx2026
  },
  {
    slug: "houston-cost-of-living-family-of-four-2026",
    meta: {
      slug: "houston-cost-of-living-family-of-four-2026",
      title: "Houston Cost of Living for a Family of Four in 2026",
      description: "See what a family of four may need for housing, groceries, utilities, healthcare, transportation, and savings in Houston in 2026.",
      date: "2026-06-15",
      updatedAt: "2026-06-15",
      author: "Shahid Saleem",
      coverImage: "/images/insights/houston-family-cost-of-living-2026.webp",
      coverAlt: "Family budget planning for Houston Texas cost of living",
      coverCaption: "Houston offers families high affordability, but managing summer electric bills and commuter costs is key to budgeting.",
      category: "Cost of Living",
      readTime: "6 min read"
    },
    Component: HoustonCostOfLivingFamilyOfFour2026
  },
  {
    slug: "monthly-cost-of-living-single-person-us-2026",
    meta: {
      slug: "monthly-cost-of-living-single-person-us-2026",
      title: "Monthly Cost of Living for a Single Person in the U.S. in 2026",
      description: "Estimate monthly cost of living for a single person in the U.S. in 2026, including rent, food, utilities, transportation, healthcare, and savings.",
      date: "2026-06-15",
      updatedAt: "2026-06-15",
      author: "Shahid Saleem",
      coverImage: "/images/insights/single-person-monthly-cost-of-living-us-2026.webp",
      coverAlt: "Single person monthly cost of living budget in the United States",
      coverCaption: "Living alone in the U.S. in 2026 requires careful budgeting across fixed costs like rent and variable costs like transport.",
      category: "Cost of Living",
      readTime: "6 min read"
    },
    Component: MonthlyCostOfLivingSinglePersonUs2026
  },
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
        "Housing choices, commute distance, and neighborhood pricing all interact to define what affordability looks like in real life.",
      category: "Cost of Living",
      readTime: "8 min read"
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
        "Comparing cities works best when you measure full monthly life costs, not just headline rent numbers.",
      category: "Relocation",
      readTime: "5 min read"
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
        "The better option depends on timeline, cash reserves, and local housing volatility more than on simple monthly payment comparisons.",
      category: "Housing & Rent",
      readTime: "7 min read"
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
        "Indexes are useful directionally, but smart decisions come from pairing them with local housing and utility realities.",
      category: "Methodology",
      readTime: "4 min read"
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
        "Income planning should match the housing market and daily expenses in the exact city where you plan to live.",
      category: "Salary Planning",
      readTime: "6 min read"
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
        "Many moving budgets fail because setup costs and short-term housing are underestimated during transitions.",
      category: "Relocation",
      readTime: "6 min read"
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
        "A lower home price does not always mean lower ownership cost when annual property taxes are significantly higher.",
      category: "Taxes & Finance",
      readTime: "5 min read"
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
        "Utility bills are one of the fastest-changing parts of a budget, especially between climates and home types.",
      category: "Cost of Living",
      readTime: "5 min read"
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
        "Regional food pricing can quietly change a family budget even when housing costs remain stable.",
      category: "Cost of Living",
      readTime: "4 min read"
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
        "Commuting patterns and parking realities often separate affordable neighborhoods from expensive ones.",
      category: "Cost of Living",
      readTime: "5 min read"
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
        "Healthcare affordability depends on both insurance structure and where households actually receive care.",
      category: "Cost of Living",
      readTime: "5 min read"
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
        "For families, affordability is more than rent: school access, commute, and childcare costs can dominate the budget.",
      category: "Cost of Living",
      readTime: "6 min read"
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
        "When housing supply lags demand, city costs can remain elevated even when other expenses cool.",
      category: "Cost of Living",
      readTime: "5 min read"
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
        "A strong relocation plan separates one-time moving costs from the recurring expenses that begin immediately.",
      category: "Relocation",
      readTime: "6 min read"
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
        "Inflation affects households unevenly, and housing-related costs often absorb the largest share of that pressure.",
      category: "Cost of Living",
      readTime: "5 min read"
    },
    Component: InflationImpact
  }
];

export function getInsightBySlug(slug: string): InsightDefinition | undefined {
  return INSIGHTS.find((insight) => insight.slug === slug);
}

export function getLatestInsights(limit = 3): InsightMeta[] {
  return [...INSIGHTS]
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .slice(0, limit)
    .map((insight) => insight.meta);
}




import CostOfLivingBasics from "@/content/guides/cost-of-living-basics.mdx";
import MovingChecklist from "@/content/guides/moving-checklist.mdx";
import RentVsBuy from "@/content/guides/rent-vs-buy.mdx";
import HowMuchRentCanIAfford75000Salary from "@/content/guides/how-much-rent-can-i-afford-75000-salary.mdx";

export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  coverImage?: string;
  category?: string;
  readTime?: string;
  toc?: { id: string; label: string }[];
};

export type GuideDefinition = {
  slug: string;
  meta: GuideMeta;
  Component: (props: any) => JSX.Element;
};

export const GUIDES: GuideDefinition[] = [
  {
    slug: "how-much-rent-can-i-afford-75000-salary",
    meta: {
      slug: "how-much-rent-can-i-afford-75000-salary",
      title: "How Much Rent Can I Afford on $75K a Year in 2026?",
      description: "See how much rent you can afford on a $75K salary in 2026 using the 30% rule, take-home pay, utilities, savings, and city cost differences.",
      date: "2026-06-15",
      updatedAt: "2026-06-15",
      author: "Shahid Saleem",
      coverImage: "/images/insights/rent-affordability-75000-salary-2026.webp",
      category: "Rent Affordability",
      readTime: "6 min read",
      toc: [
        { id: "quick-answer", label: "Quick answer" },
        { id: "the-30-rent-rule-on-a-75k-salary", label: "The 30% rent rule on a $75K salary" },
        { id: "why-take-home-pay-matters-more-than-gross-salary", label: "Why take-home pay matters more than gross salary" },
        { id: "rent-plus-utilities-the-number-most-people-forget", label: "Rent plus utilities: the number most people forget" },
        { id: "example-budgets-in-affordable-average-and-expensive-cities", label: "Example budgets in affordable, average, and expensive cities" },
        { id: "when-75k-feels-comfortable", label: "When $75K feels comfortable" },
        { id: "when-75k-feels-tight", label: "When $75K feels tight" },
        { id: "how-to-compare-cities-before-signing-a-lease", label: "How to compare cities before signing a lease" },
        { id: "faq", label: "FAQ" }
      ]
    },
    Component: HowMuchRentCanIAfford75000Salary
  },
  {
    slug: "cost-of-living-basics",
    meta: {
      slug: "cost-of-living-basics",
      title: "Cost of Living Basics",
      description:
        "A human guide to what cost-of-living indices actually mean and how to use them in real life.",
      date: "2025-01-10",
      updatedAt: "2026-02-28",
      coverImage: "/images/insights/cost-of-living-index-explained.webp",
      category: "Methodology",
      readTime: "5 min read",
      toc: [
        { id: "in-this-guide", label: "In this guide" },
        { id: "what-a-cost-of-living-index-actually-measures", label: "What a cost-of-living index measures" },
        { id: "category-scores-rent-home-price-groceries-and-more", label: "Category scores" },
        { id: "using-indices-with-your-own-budget", label: "Using indices with your budget" },
        { id: "common-mistakes-to-avoid", label: "Common mistakes to avoid" },
        { id: "faqs", label: "FAQs" }
      ]
    },
    Component: CostOfLivingBasics
  },
  {
    slug: "moving-checklist",
    meta: {
      slug: "moving-checklist",
      title: "Moving Checklist",
      description:
        "A friendly checklist to keep your next move organized, from research to unpacking.",
      date: "2025-02-05",
      updatedAt: "2026-02-28",
      coverImage: "/images/insights/hidden-costs-moving-states.webp",
      category: "Relocation",
      readTime: "4 min read",
      toc: [
        { id: "in-this-guide", label: "In this guide" },
        { id: "step-1-early-research-and-budgeting", label: "Step 1: Research and budgeting" },
        { id: "step-2-housing-and-neighborhood-checks", label: "Step 2: Housing checks" },
        { id: "step-3-practical-logistics", label: "Step 3: Logistics" },
        { id: "step-4-settling-in-and-sanity-checks", label: "Step 4: Settling in" },
        { id: "faqs", label: "FAQs" }
      ]
    },
    Component: MovingChecklist
  },
  {
    slug: "rent-vs-buy",
    meta: {
      slug: "rent-vs-buy",
      title: "Rent vs. Buy",
      description: "A calm, practical look at when renting or buying might make more sense for you.",
      date: "2025-03-12",
      updatedAt: "2026-02-28",
      coverImage: "/images/insights/rent-vs-buy-2026-full-breakdown.webp",
      category: "Housing & Rent",
      readTime: "5 min read",
      toc: [
        { id: "in-this-guide", label: "In this guide" },
        { id: "the-case-for-renting", label: "The case for renting" },
        { id: "the-case-for-buying", label: "The case for buying" },
        { id: "how-location-changes-the-rent-vs-buy-picture", label: "How location changes the math" },
        { id: "rules-of-thumbuseful-but-not-strict", label: "Rules of thumb" },
        { id: "faqs", label: "FAQs" }
      ]
    },
    Component: RentVsBuy
  }
];

export function getLatestGuides(limit = 3): GuideMeta[] {
  return [...GUIDES]
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
    .slice(0, limit)
    .map((guide) => guide.meta);
}

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}




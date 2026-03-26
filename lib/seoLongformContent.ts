import type { City, State } from "@/lib/data";

type SeoLongformLink = { href: string; label: string };
type SeoLongformSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  internalLinks?: SeoLongformLink[];
};

export type SeoLongformContent = {
  title: string;
  summary: string;
  sections: SeoLongformSection[];
};

type StaticLongformKey =
  | "home"
  | "states"
  | "cities"
  | "compare"
  | "guides"
  | "insights"
  | "findAPro"
  | "contact"
  | "about"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "editorialPolicy"
  | "cookiePolicy"
  | "dmca";

type StaticProfile = {
  title: string;
  subject: string;
  audience: string;
  primaryRisk: string;
  linkA: SeoLongformLink;
  linkB: SeoLongformLink;
  linkC: SeoLongformLink;
  linkD: SeoLongformLink;
  linkE: SeoLongformLink;
  linkF: SeoLongformLink;
};

const PROFILES: Record<StaticLongformKey, StaticProfile> = {
  home: {
    title: "How to use RentX for better moving decisions",
    subject: "U.S. cost-of-living planning",
    audience: "renters, buyers, and relocating families",
    primaryRisk: "overcommitting based on one headline number instead of full monthly costs",
    linkA: { href: "/cities", label: "Browse cities" },
    linkB: { href: "/states", label: "Browse states" },
    linkC: { href: "/compare", label: "Compare cities" },
    linkD: { href: "/guides", label: "Read guides" },
    linkE: { href: "/disclaimer", label: "See limitations" },
    linkF: { href: "/about", label: "About RentX" }
  },
  states: {
    title: "How to evaluate cost differences by state",
    subject: "state-level affordability analysis",
    audience: "people shortlisting regions before choosing a city",
    primaryRisk: "treating state averages as final answers without local checks",
    linkA: { href: "/cities", label: "Open city pages" },
    linkB: { href: "/compare", label: "Run comparisons" },
    linkC: { href: "/guides/cost-of-living-basics", label: "Method guide" },
    linkD: { href: "/insights/cost-of-living-index-explained", label: "Index insight" },
    linkE: { href: "/editorial-policy", label: "Method standards" },
    linkF: { href: "/find-a-pro", label: "Find local pros" }
  },
  cities: {
    title: "How to use city profiles for real budgeting",
    subject: "city-level operating cost planning",
    audience: "households deciding where to rent or buy",
    primaryRisk: "ignoring neighborhood and commute variation after reading city averages",
    linkA: { href: "/compare", label: "Compare cities" },
    linkB: { href: "/states", label: "State context" },
    linkC: { href: "/insights/transportation-costs-urban-vs-suburban", label: "Transport insight" },
    linkD: { href: "/insights/utility-costs-across-us-cities", label: "Utilities insight" },
    linkE: { href: "/disclaimer", label: "Policy limits" },
    linkF: { href: "/find-a-pro", label: "Local validation" }
  },
  compare: {
    title: "How to compare two cities correctly",
    subject: "side-by-side city comparison",
    audience: "people deciding between two U.S. locations",
    primaryRisk: "changing assumptions between cities and creating false conclusions",
    linkA: { href: "/cities", label: "City directory" },
    linkB: { href: "/guides/moving-checklist", label: "Move checklist" },
    linkC: { href: "/insights/salary-needs-major-us-cities", label: "Salary insight" },
    linkD: { href: "/insights/hidden-costs-moving-states", label: "Hidden costs insight" },
    linkE: { href: "/editorial-policy", label: "Editorial policy" },
    linkF: { href: "/find-a-pro", label: "Talk to a pro" }
  },
  guides: {
    title: "How to use RentX guides effectively",
    subject: "step-by-step housing and relocation planning",
    audience: "readers who need actionable checklists",
    primaryRisk: "reading guidance without applying it to current city options",
    linkA: { href: "/guides/cost-of-living-basics", label: "Start with basics" },
    linkB: { href: "/cities", label: "Apply in cities" },
    linkC: { href: "/states", label: "Apply in states" },
    linkD: { href: "/insights", label: "Go deeper in insights" },
    linkE: { href: "/disclaimer", label: "Read disclaimer" },
    linkF: { href: "/contact", label: "Contact team" }
  },
  insights: {
    title: "How to use longform insights without wasting time",
    subject: "deep analysis of U.S. living-cost drivers",
    audience: "users making high-stakes move, rent, or buy decisions",
    primaryRisk: "consuming analysis without converting it into a budget model",
    linkA: { href: "/insights/complete-guide-us-cost-of-living", label: "Complete guide" },
    linkB: { href: "/compare", label: "Apply via compare pages" },
    linkC: { href: "/cities", label: "Apply via city pages" },
    linkD: { href: "/guides", label: "Execution guides" },
    linkE: { href: "/editorial-policy", label: "Editorial standards" },
    linkF: { href: "/about", label: "About RentX" }
  },
  findAPro: {
    title: "Using Find a Pro for local market validation",
    subject: "location-specific real estate support",
    audience: "visitors who already narrowed a shortlist",
    primaryRisk: "submitting vague requests that cannot produce useful local guidance",
    linkA: { href: "/cities", label: "Select a city" },
    linkB: { href: "/compare", label: "Compare first" },
    linkC: { href: "/guides/moving-checklist", label: "Prepare details" },
    linkD: { href: "/insights/hidden-costs-moving-states", label: "Risk checklist" },
    linkE: { href: "/privacy-policy", label: "Privacy terms" },
    linkF: { href: "/contact", label: "Support contact" }
  },
  contact: {
    title: "Contact RentX for corrections and support",
    subject: "editorial corrections and user support",
    audience: "readers reporting factual issues or technical problems",
    primaryRisk: "sending requests without page URLs, sources, or reproducible details",
    linkA: { href: "/editorial-policy", label: "Correction policy" },
    linkB: { href: "/about", label: "About the brand" },
    linkC: { href: "/insights", label: "Insights pages" },
    linkD: { href: "/guides", label: "Guides pages" },
    linkE: { href: "/privacy-policy", label: "Privacy page" },
    linkF: { href: "/disclaimer", label: "Disclaimer page" }
  },
  about: {
    title: "About RentX and our publishing mission",
    subject: "independent long-term authority publishing",
    audience: "users evaluating trust and quality",
    primaryRisk: "thin or generic content that fails to support real decisions",
    linkA: { href: "/", label: "Home" },
    linkB: { href: "/insights", label: "Longform insights" },
    linkC: { href: "/guides", label: "Action guides" },
    linkD: { href: "/contact", label: "Report issues" },
    linkE: { href: "/editorial-policy", label: "Editorial standards" },
    linkF: { href: "/privacy-policy", label: "Privacy policy" }
  },
  privacy: {
    title: "Privacy policy in practical terms",
    subject: "data handling and visitor privacy choices",
    audience: "users who want transparent data practices",
    primaryRisk: "assuming all tracking technologies behave the same way",
    linkA: { href: "/cookie-policy", label: "Cookie policy" },
    linkB: { href: "/contact", label: "Privacy requests" },
    linkC: { href: "/terms", label: "Terms of use" },
    linkD: { href: "/find-a-pro", label: "Form service context" },
    linkE: { href: "/disclaimer", label: "General limits" },
    linkF: { href: "/about", label: "About RentX" }
  },
  terms: {
    title: "Terms of use and platform boundaries",
    subject: "responsible use of informational content",
    audience: "all RentX visitors and users",
    primaryRisk: "using directional content as guaranteed legal or financial advice",
    linkA: { href: "/disclaimer", label: "Disclaimer" },
    linkB: { href: "/privacy-policy", label: "Privacy terms" },
    linkC: { href: "/contact", label: "Report issues" },
    linkD: { href: "/editorial-policy", label: "Editorial policy" },
    linkE: { href: "/cookie-policy", label: "Cookie policy" },
    linkF: { href: "/about", label: "About page" }
  },
  disclaimer: {
    title: "Disclaimer and safe use of estimates",
    subject: "informational boundaries for cost estimates",
    audience: "users making leases, purchase, and relocation decisions",
    primaryRisk: "treating estimates as fixed promises and skipping verification",
    linkA: { href: "/terms", label: "Terms" },
    linkB: { href: "/cities", label: "City pages" },
    linkC: { href: "/insights/inflation-impact-on-cost-of-living", label: "Inflation context" },
    linkD: { href: "/find-a-pro", label: "Local checks" },
    linkE: { href: "/contact", label: "Ask questions" },
    linkF: { href: "/editorial-policy", label: "Editorial standards" }
  },
  editorialPolicy: {
    title: "Editorial policy and quality controls",
    subject: "transparent content standards and correction workflow",
    audience: "readers who want reliable methods",
    primaryRisk: "content drift from unclear methods and inconsistent updates",
    linkA: { href: "/about", label: "About mission" },
    linkB: { href: "/insights", label: "Insights examples" },
    linkC: { href: "/guides", label: "Guides examples" },
    linkD: { href: "/contact", label: "Submit corrections" },
    linkE: { href: "/privacy-policy", label: "Privacy context" },
    linkF: { href: "/disclaimer", label: "Content boundaries" }
  },
  cookiePolicy: {
    title: "Cookie policy and tracking controls",
    subject: "site cookies, analytics, and advertising technologies",
    audience: "users managing privacy and browser preferences",
    primaryRisk: "blocking essential cookies without understanding functionality impact",
    linkA: { href: "/privacy-policy", label: "Privacy overview" },
    linkB: { href: "/terms", label: "Terms context" },
    linkC: { href: "/contact", label: "Policy support" },
    linkD: { href: "/about", label: "About RentX" },
    linkE: { href: "/editorial-policy", label: "Transparency standards" },
    linkF: { href: "/disclaimer", label: "General limits" }
  },
  dmca: {
    title: "DMCA policy and copyright reporting",
    subject: "copyright complaint handling under U.S. law",
    audience: "rights holders and publishers",
    primaryRisk: "sending incomplete notices that delay review",
    linkA: { href: "/contact", label: "Submit notice" },
    linkB: { href: "/terms", label: "Terms context" },
    linkC: { href: "/about", label: "Platform overview" },
    linkD: { href: "/editorial-policy", label: "Editorial governance" },
    linkE: { href: "/privacy-policy", label: "Data handling" },
    linkF: { href: "/disclaimer", label: "Legal limits" }
  }
};

export function getStaticSeoLongformContent(key: StaticLongformKey): SeoLongformContent {
  const p = PROFILES[key];
  return {
    title: p.title,
    summary: `This page supports ${p.subject} for ${p.audience}. The practical goal is to turn research into decisions that remain stable over time, especially when markets change or personal timelines shift. RentX content is built to reduce ambiguity through clear categories, internal links, and direct explanation of limits. The main risk on this page is ${p.primaryRisk}. To avoid that, use a repeatable comparison model, stress-test assumptions with conservative scenarios, and validate critical details with current local sources before signing any agreement or making irreversible commitments. If you follow that sequence consistently, this page becomes a working decision tool instead of a passive reference.`,
    sections: [
      {
        heading: "Practical workflow",
        paragraphs: [
          `Start with one target option and one alternative so your ${p.subject} process is comparative from day one. Keep the same household assumptions across all options: timing, commute style, savings targets, and non-negotiables.`,
          "Then split decisions into recurring monthly costs versus one-time transition costs. This prevents confusion between short-term friction and long-term affordability. If your margin is tight, use conservative assumptions so your model reflects realistic volatility rather than ideal conditions.",
          "When several options look close, prioritize resilience over headline savings. A choice that remains stable after a normal shock is usually stronger than one that is only cheaper in a perfect month."
        ],
        bullets: [
          "Document assumptions in one worksheet.",
          "Use expected and conservative scenarios.",
          "Separate recurring and one-time costs.",
          "Re-check high-impact categories before commitment."
        ],
        internalLinks: [p.linkA, p.linkB]
      },
      {
        heading: "Common failure points",
        paragraphs: [
          `A frequent issue in ${p.subject} is using incomplete data. People often optimize one visible number and underweight other categories that move monthly outcomes.`,
          `Another issue is decision speed without verification. Even well-written content cannot replace current primary-source checks when stakes are high. This page helps organize decisions, but final commitments should always be validated locally.`,
          "A third issue is inconsistent assumptions across options. If household inputs change between scenarios, the comparison loses integrity and can produce expensive false confidence."
        ],
        internalLinks: [p.linkC, p.linkD]
      },
      {
        heading: "How we estimate and why outcomes vary",
        paragraphs: [
          "RentX publishes directional, educational estimates designed for consistent comparison. They are not legal, tax, mortgage, or investment advice and should not be interpreted as guaranteed quotes.",
          "Actual results vary by neighborhood, building type, household behavior, provider contracts, and timing. The right way to use this page is to identify tradeoffs quickly and then confirm details directly before signing.",
          "This approach improves speed without sacrificing rigor. You can still move fast, but you do so with a documented method that reduces preventable errors."
        ],
        internalLinks: [p.linkE]
      },
      {
        heading: "Trust and accountability",
        paragraphs: [
          "RentX is building long-term authority by maintaining substantive pages, clear policy coverage, and correction workflows. We avoid thin templates and focus on practical value users can apply immediately.",
          "If you spot unclear language or factual issues, report them. Accurate updates and transparent limits are part of sustainable quality."
        ],
        internalLinks: [p.linkF]
      }
    ]
  };
}

function diffLabel(value: number) {
  const diff = Math.abs(value - 100);
  if (value === 100) return "roughly aligned with the U.S. baseline";
  return value > 100 ? `${diff}% above the U.S. baseline` : `${diff}% below the U.S. baseline`;
}

export function buildStateSeoLongform(state: State, cities: City[]): SeoLongformContent {
  const avg = cities.length
    ? Math.round(cities.reduce((sum, city) => sum + city.indices.overall, 0) / cities.length)
    : 100;
  return {
    title: `How to plan a move within ${state.name}`,
    summary: `${state.name} should be treated as a regional filter first and a final decision layer second. RentX currently tracks ${cities.length} city profile${
      cities.length === 1 ? "" : "s"
    } in this state, with an estimated average overall index near ${avg}, ${diffLabel(
      avg
    )}. Use this section to evaluate how statewide patterns translate into city-level monthly budgets, what our estimates represent, and how to avoid relocation mistakes.`,
    sections: [
      {
        heading: "State context versus city reality",
        paragraphs: [
          `State averages are useful for shortlisting, but city and neighborhood conditions decide final affordability. In ${state.name}, use state context to narrow options, then open city pages for detailed category checks.`,
          "For reliable comparisons, keep assumptions fixed across every city and evaluate recurring categories together instead of isolating one cost line."
        ],
        internalLinks: [
          { href: "/states", label: "All states" },
          { href: "/cities", label: "All cities" }
        ]
      },
      {
        heading: "How we estimate and what to verify",
        paragraphs: [
          "RentX values are directional. They are built to support structured planning and side-by-side comparison, not personalized forecasts.",
          "Before commitments, validate rents, utility expectations, healthcare access, and transportation assumptions with current local data."
        ],
        bullets: [
          "Run expected and conservative scenarios.",
          "Check at least two cities before deciding.",
          "Reserve contingency for setup costs.",
          "Re-check assumptions close to move date."
        ],
        internalLinks: [
          { href: "/editorial-policy", label: "Method policy" },
          { href: "/disclaimer", label: "Limitations" }
        ]
      },
      {
        heading: "Tips for moving",
        paragraphs: [
          `When moving to ${state.name}, shortlist two or three target markets and rank them by resilience, not just first-month affordability.`,
          "If timelines are tight, request local professional context to reduce neighborhood-level uncertainty before signing."
        ],
        internalLinks: [
          { href: "/compare", label: "Compare cities" },
          { href: "/find-a-pro", label: "Find a local pro" },
          { href: "/guides/moving-checklist", label: "Moving checklist" }
        ]
      }
    ]
  };
}

export function buildCitySeoLongform(city: City, state: State | undefined, nearby: City[]): SeoLongformContent {
  const stateName = state?.name ?? city.stateCode;
  const nearbyNames = nearby.slice(0, 3).map((item) => item.cityName).join(", ") || "nearby alternatives";
  return {
    title: `Cost planning notes for ${city.cityName}, ${city.stateCode}`,
    summary: `${city.cityName} has an estimated overall index of ${city.indices.overall}, which is ${diffLabel(
      city.indices.overall
    )}. Key category estimates include rent ${city.indices.rent}, home price ${city.indices.homePrice}, utilities ${city.indices.utilities}, groceries ${city.indices.groceries}, transportation ${city.indices.transport}, and healthcare ${city.indices.healthcare}. Use this content as a planning baseline, then verify details locally before final commitments.`,
    sections: [
      {
        heading: "Reading this city profile correctly",
        paragraphs: [
          "City index values are best used in a comparative model. Keep household assumptions fixed and test this market against at least one alternative.",
          `Within ${stateName}, similar options such as ${nearbyNames} may produce very different monthly outcomes once commute and housing structure are included.`
        ],
        internalLinks: [
          { href: "/compare", label: "Compare cities" },
          { href: `/state/${city.stateSlug}`, label: `${stateName} page` }
        ]
      },
      {
        heading: "How we estimate and where variance appears",
        paragraphs: [
          "RentX estimates are directional and educational. They are not a contract price or legal/financial advice.",
          "Neighborhood choice, move timing, service contracts, and household behavior can shift totals. Validate key assumptions close to your decision date."
        ],
        bullets: [
          "Check multiple neighborhoods.",
          "Validate commute and transportation assumptions.",
          "Confirm utility and healthcare expectations.",
          "Keep a transition-cost buffer."
        ],
        internalLinks: [
          { href: "/insights/cost-of-living-index-explained", label: "Index explanation" },
          { href: "/insights/hidden-costs-moving-states", label: "Hidden costs" }
        ]
      },
      {
        heading: "Practical move tips",
        paragraphs: [
          `For ${city.cityName}, build expected and conservative monthly models before signing. If the conservative model fails, adjust housing target or timeline.`,
          "Use local professionals for final checks when budget margin is narrow or timeline pressure is high."
        ],
        internalLinks: [
          { href: `/find-a-pro?city=${encodeURIComponent(city.slug)}`, label: "Local help" },
          { href: "/guides/moving-checklist", label: "Move checklist" },
          { href: "/disclaimer", label: "Read limitations" }
        ]
      }
    ]
  };
}

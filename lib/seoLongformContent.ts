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
    linkA: { href: "/cities/", label: "Browse cities" },
    linkB: { href: "/states/", label: "Browse states" },
    linkC: { href: "/compare/", label: "Compare cities" },
    linkD: { href: "/guides/", label: "Read guides" },
    linkE: { href: "/disclaimer/", label: "See limitations" },
    linkF: { href: "/about/", label: "About RentX" }
  },
  states: {
    title: "How to evaluate cost differences by state",
    subject: "state-level affordability analysis",
    audience: "people shortlisting regions before choosing a city",
    primaryRisk: "treating state averages as final answers without local checks",
    linkA: { href: "/cities/", label: "Open city pages" },
    linkB: { href: "/compare/", label: "Run comparisons" },
    linkC: { href: "/guides/cost-of-living-basics/", label: "Method guide" },
    linkD: { href: "/insights/cost-of-living-index-explained/", label: "Index insight" },
    linkE: { href: "/editorial-policy/", label: "Method standards" },
    linkF: { href: "/find-a-pro/", label: "Find local pros" }
  },
  cities: {
    title: "How to use city profiles for real budgeting",
    subject: "city-level operating cost planning",
    audience: "households deciding where to rent or buy",
    primaryRisk: "ignoring neighborhood and commute variation after reading city averages",
    linkA: { href: "/compare/", label: "Compare cities" },
    linkB: { href: "/states/", label: "State context" },
    linkC: { href: "/insights/transportation-costs-urban-vs-suburban/", label: "Transport insight" },
    linkD: { href: "/insights/utility-costs-across-us-cities/", label: "Utilities insight" },
    linkE: { href: "/disclaimer/", label: "Policy limits" },
    linkF: { href: "/find-a-pro/", label: "Local validation" }
  },
  compare: {
    title: "How to compare two cities correctly",
    subject: "side-by-side city comparison",
    audience: "people deciding between two U.S. locations",
    primaryRisk: "changing assumptions between cities and creating false conclusions",
    linkA: { href: "/cities/", label: "City directory" },
    linkB: { href: "/guides/moving-checklist/", label: "Move checklist" },
    linkC: { href: "/insights/salary-needs-major-us-cities/", label: "Salary insight" },
    linkD: { href: "/insights/hidden-costs-moving-states/", label: "Hidden costs insight" },
    linkE: { href: "/editorial-policy/", label: "Editorial policy" },
    linkF: { href: "/find-a-pro/", label: "Talk to a pro" }
  },
  guides: {
    title: "How to use RentX guides effectively",
    subject: "step-by-step housing and relocation planning",
    audience: "readers who need actionable checklists",
    primaryRisk: "reading guidance without applying it to current city options",
    linkA: { href: "/guides/cost-of-living-basics/", label: "Start with basics" },
    linkB: { href: "/cities/", label: "Apply in cities" },
    linkC: { href: "/states/", label: "Apply in states" },
    linkD: { href: "/insights/", label: "Go deeper in insights" },
    linkE: { href: "/disclaimer/", label: "Read disclaimer" },
    linkF: { href: "/contact/", label: "Contact team" }
  },
  insights: {
    title: "How to use longform insights without wasting time",
    subject: "deep analysis of U.S. living-cost drivers",
    audience: "users making high-stakes move, rent, or buy decisions",
    primaryRisk: "consuming analysis without converting it into a budget model",
    linkA: { href: "/insights/complete-guide-us-cost-of-living/", label: "Complete guide" },
    linkB: { href: "/compare/", label: "Apply via compare pages" },
    linkC: { href: "/cities/", label: "Apply via city pages" },
    linkD: { href: "/guides/", label: "Execution guides" },
    linkE: { href: "/editorial-policy/", label: "Editorial standards" },
    linkF: { href: "/about/", label: "About RentX" }
  },
  findAPro: {
    title: "Using Find a Pro for local market validation",
    subject: "location-specific real estate support",
    audience: "visitors who already narrowed a shortlist",
    primaryRisk: "submitting vague requests that cannot produce useful local guidance",
    linkA: { href: "/cities/", label: "Select a city" },
    linkB: { href: "/compare/", label: "Compare first" },
    linkC: { href: "/guides/moving-checklist/", label: "Prepare details" },
    linkD: { href: "/insights/hidden-costs-moving-states/", label: "Risk checklist" },
    linkE: { href: "/privacy-policy/", label: "Privacy terms" },
    linkF: { href: "/contact/", label: "Support contact" }
  },
  contact: {
    title: "Contact RentX for corrections and support",
    subject: "editorial corrections and user support",
    audience: "readers reporting factual issues or technical problems",
    primaryRisk: "sending requests without page URLs, sources, or reproducible details",
    linkA: { href: "/editorial-policy/", label: "Correction policy" },
    linkB: { href: "/about/", label: "About the brand" },
    linkC: { href: "/insights/", label: "Insights pages" },
    linkD: { href: "/guides/", label: "Guides pages" },
    linkE: { href: "/privacy-policy/", label: "Privacy page" },
    linkF: { href: "/disclaimer/", label: "Disclaimer page" }
  },
  about: {
    title: "About RentX and our publishing mission",
    subject: "independent long-term authority publishing",
    audience: "users evaluating trust and quality",
    primaryRisk: "thin or generic content that fails to support real decisions",
    linkA: { href: "/", label: "Home" },
    linkB: { href: "/insights/", label: "Longform insights" },
    linkC: { href: "/guides/", label: "Action guides" },
    linkD: { href: "/contact/", label: "Report issues" },
    linkE: { href: "/editorial-policy/", label: "Editorial standards" },
    linkF: { href: "/privacy-policy/", label: "Privacy policy" }
  },
  privacy: {
    title: "Privacy policy in practical terms",
    subject: "data handling and visitor privacy choices",
    audience: "users who want transparent data practices",
    primaryRisk: "assuming all tracking technologies behave the same way",
    linkA: { href: "/cookie-policy/", label: "Cookie policy" },
    linkB: { href: "/contact/", label: "Privacy requests" },
    linkC: { href: "/terms/", label: "Terms of use" },
    linkD: { href: "/find-a-pro/", label: "Form service context" },
    linkE: { href: "/disclaimer/", label: "General limits" },
    linkF: { href: "/about/", label: "About RentX" }
  },
  terms: {
    title: "Terms of use and platform boundaries",
    subject: "responsible use of informational content",
    audience: "all RentX visitors and users",
    primaryRisk: "using directional content as guaranteed legal or financial advice",
    linkA: { href: "/disclaimer/", label: "Disclaimer" },
    linkB: { href: "/privacy-policy/", label: "Privacy terms" },
    linkC: { href: "/contact/", label: "Report issues" },
    linkD: { href: "/editorial-policy/", label: "Editorial policy" },
    linkE: { href: "/cookie-policy/", label: "Cookie policy" },
    linkF: { href: "/about/", label: "About page" }
  },
  disclaimer: {
    title: "Disclaimer and safe use of estimates",
    subject: "informational boundaries for cost estimates",
    audience: "users making leases, purchase, and relocation decisions",
    primaryRisk: "treating estimates as fixed promises and skipping verification",
    linkA: { href: "/terms/", label: "Terms" },
    linkB: { href: "/cities/", label: "City pages" },
    linkC: { href: "/insights/inflation-impact-on-cost-of-living/", label: "Inflation context" },
    linkD: { href: "/find-a-pro/", label: "Local checks" },
    linkE: { href: "/contact/", label: "Ask questions" },
    linkF: { href: "/editorial-policy/", label: "Editorial standards" }
  },
  editorialPolicy: {
    title: "Editorial policy and quality controls",
    subject: "transparent content standards and correction workflow",
    audience: "readers who want reliable methods",
    primaryRisk: "content drift from unclear methods and inconsistent updates",
    linkA: { href: "/about/", label: "About mission" },
    linkB: { href: "/insights/", label: "Insights examples" },
    linkC: { href: "/guides/", label: "Guides examples" },
    linkD: { href: "/contact/", label: "Submit corrections" },
    linkE: { href: "/privacy-policy/", label: "Privacy context" },
    linkF: { href: "/disclaimer/", label: "Content boundaries" }
  },
  cookiePolicy: {
    title: "Cookie policy and tracking controls",
    subject: "site cookies, analytics, and advertising technologies",
    audience: "users managing privacy and browser preferences",
    primaryRisk: "blocking essential cookies without understanding functionality impact",
    linkA: { href: "/privacy-policy/", label: "Privacy overview" },
    linkB: { href: "/terms/", label: "Terms context" },
    linkC: { href: "/contact/", label: "Policy support" },
    linkD: { href: "/about/", label: "About RentX" },
    linkE: { href: "/editorial-policy/", label: "Editorial transparency" },
    linkF: { href: "/disclaimer/", label: "General limits" }
  },
  dmca: {
    title: "DMCA policy and copyright reporting",
    subject: "copyright complaint handling under U.S. law",
    audience: "rights holders and publishers",
    primaryRisk: "sending incomplete notices that delay review",
    linkA: { href: "/contact/", label: "Submit notice" },
    linkB: { href: "/terms/", label: "Terms context" },
    linkC: { href: "/about/", label: "Platform overview" },
    linkD: { href: "/editorial-policy/", label: "Editorial governance" },
    linkE: { href: "/privacy-policy/", label: "Data handling" },
    linkF: { href: "/disclaimer/", label: "Legal limits" }
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
  
  // Sort cities to find highest and lowest cost metros dynamically
  const sorted = [...cities].sort((a, b) => b.indices.overall - a.indices.overall);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];

  let compareSnippet = "";
  if (highest && lowest && highest.slug !== lowest.slug) {
    compareSnippet = `For example, ${highest.cityName} stands as the highest-cost city tracked in this state with an overall index of ${highest.indices.overall}, while ${lowest.cityName} represents a more affordable alternative with an overall index of ${lowest.indices.overall}. This highlights the importance of analyzing city-specific data rather than relying solely on state baselines.`;
  } else {
    compareSnippet = "Cost variables remain consistent across the tracked cities in this state, though localized neighborhood dynamics still determine final housing rates.";
  }

  let taxAndReloContext = "";
  switch (state.code.toUpperCase()) {
    case "CA":
      taxAndReloContext = "California features a progressive state income tax structure with rates up to 13.3%, which significantly affects monthly take-home pay. While property tax rate increases are limited by Proposition 13, initial purchase values are exceptionally high, making renting the primary gateway for newcomers in key employment centers like San Francisco and Los Angeles.";
      break;
    case "TX":
      taxAndReloContext = "Texas is highly attractive due to having no state income tax, which boosts take-home earnings. However, property taxes are among the highest in the nation (often between 1.6% and 2%+ of home value), and cooling utility expenses spike significantly during summer months, especially in major hubs like Houston, Dallas, or Austin.";
      break;
    case "NY":
      taxAndReloContext = "New York imposes combined state and local (NYC) income taxes that are among the highest in the country. In addition, cold winter temperatures result in elevated heating utility costs, and the rental market in major areas like New York City requires strict broker fee payments and income verification ratios.";
      break;
    case "FL":
      taxAndReloContext = "Florida features no state income tax, making it a popular destination for retirees and remote workers. Fixed costs are heavily shaped by summer air conditioning bills and rapidly changing property and wind insurance premiums. Real estate values have surged in coastal metros like Miami, though inland cities like Orlando remain more balanced.";
      break;
    case "WA":
      taxAndReloContext = "Washington has no state income tax, though it balances this with higher sales and excise taxes. The tech-heavy economy in Seattle creates a premium real estate market, but secondary cities like Spokane offer a much lower barrier to entry. Utility costs are relatively moderate thanks to regional hydroelectric power.";
      break;
    case "CO":
      taxAndReloContext = "Colorado features a flat state income tax rate of 4.4% and relatively low property taxes compared to the national average. Winter heating bills can be substantial, and the massive influx of outdoor-oriented professionals has placed a premium on housing across Denver and Boulder.";
      break;
    case "IL":
      taxAndReloContext = "Illinois charges a flat state income tax of 4.95%, but stands out for having exceptionally high property tax rates. Metropolitan Chicago features a vast public transportation system that helps reduce commute costs, though harsh winter months drive up heating utility bills.";
      break;
    case "GA":
      taxAndReloContext = "Georgia features a flat income tax rate of 5.49% and a lower overall cost baseline compared to coastal states. Summer cooling costs are a major component of the utility budget, and the Atlanta metro area has high transportation costs due to commuter traffic, though suburban housing remains affordable.";
      break;
    case "AZ":
      taxAndReloContext = "Arizona has transitioned to a highly competitive flat income tax of 2.5%. Relocating to Phoenix or Tucson requires planning for extreme summer temperatures, which lead to very high electricity bills. Water rights and air conditioning upkeep are key items to inspect before buying.";
      break;
    case "MA":
      taxAndReloContext = "Massachusetts has a flat 5% income tax (plus an additional surtax on high earners) and high cost baselines. Fuel and heating costs during the long winter months are high, and the historic housing stock in Boston and Cambridge commands a major rental premium.";
      break;
    default:
      taxAndReloContext = "Relocating to a new state requires careful comparison of state income taxes, local property tax rates, and sales taxes, which directly affect your monthly take-home income and purchasing power.";
  }

  return {
    title: `State Cost Analysis & Relocation Guide: ${state.name}`,
    summary: `Evaluating ${state.name} as a relocation destination requires analyzing statewide cost baselines alongside localized metropolitan variations. Across the ${cities.length} cities tracked in this state, the calculated overall index average is ${avg}, which is ${diffLabel(avg)}. Use this state-level profile to structure your budget and plan your relocation.`,
    sections: [
      {
        heading: "State-level cost context & city comparisons",
        paragraphs: [
          `Statewide cost averages reflect broad tax structures, climate factors, and regulatory baselines, but city-specific profiles decide actual affordability. In ${state.name}, regional variations between metropolitan centers can be significant.`,
          compareSnippet,
          `When evaluating ${state.name}, rank cities not only by housing costs but also by local transit and utility indexes. A city with lower rent but higher transport costs can end up costing more than a denser urban center with public transit options.`,
          "We recommend comparing at least two different cities in this state side-by-side using the RentX comparison tool to understand trade-offs in detail."
        ],
        internalLinks: [
          { href: "/states/", label: "Browse all states" },
          { href: "/compare/", label: "Compare cities side-by-side" }
        ]
      },
      {
        heading: "Relocation suitability, housing & lifestyle notes",
        paragraphs: [
          `Relocating to ${state.name} offers distinct lifestyle options depending on the region you choose. The state has diverse economic sectors, ranging from agricultural hubs to technology and financial centers, drawing a wide range of professionals and families.`,
          taxAndReloContext,
          "Keep in mind that rental laws, tenant protections, and utility provider structures also vary by state, which can affect lease requirements and fixed monthly operating expenses."
        ],
        internalLinks: [
          { href: "/find-a-pro/", label: "Connect with local real estate pros" },
          { href: "/guides/moving-checklist/", label: "View moving checklist" }
        ]
      },
      {
        heading: "Estimations, caveats & verification tips",
        paragraphs: [
          "RentX state cost-of-living profiles are educational estimates designed for comparative planning and regional shortlisting. They do not constitute financial advice, mortgage quotes, or real estate offers.",
          `Before finalizing a move to ${state.name}, verify listing prices, utility provider rates, transit costs, and tax obligations with primary sources. Use local professionals to confirm neighborhood-level variables, which can differ from state averages.`,
          "Ensure your relocation budget holds a transition cash buffer to handle moving logistics, deposits, and start-up costs without putting strain on your emergency funds."
        ],
        internalLinks: [
          { href: "/disclaimer/", label: "Read platform disclaimer" },
          { href: "/editorial-policy/", label: "Read editorial policy" }
        ]
      }
    ]
  };
}

export function buildCitySeoLongform(city: City, state: State | undefined, nearby: City[]): SeoLongformContent {
  const stateName = state?.name ?? city.stateCode;
  const overallText = diffLabel(city.indices.overall);
  const rentText = diffLabel(city.indices.rent);
  const homeText = diffLabel(city.indices.homePrice);
  const utilText = diffLabel(city.indices.utilities);
  const transText = diffLabel(city.indices.transport);
  const groceryText = diffLabel(city.indices.groceries);
  const healthText = diffLabel(city.indices.healthcare);

  const nearbyNames = nearby.slice(0, 3).map((item) => `${item.cityName}, ${item.stateCode}`).join(", ") || "other regional alternatives";

  let suitability = "";
  if (city.indices.overall > 130) {
    suitability = `With an overall index of ${city.indices.overall}, ${city.cityName} features a premium cost profile. This market is highly suitable for established professionals, technology or finance sector workers, and households prioritizing high-density employment hubs and dense cultural amenities over cost per square foot. Planning in high-cost environments requires careful budgeting and a clear trade-off between square footage and commute times.`;
  } else if (city.indices.overall >= 100) {
    suitability = `Featuring an overall index of ${city.indices.overall}, ${city.cityName} offers a balanced mid-range cost tier. This city is well-suited for families, remote professionals, and established households seeking solid public services and local career opportunities without the extreme pricing premiums of major coastal hubs. Budgeting here is manageable, but local variations by neighborhood are still significant.`;
  } else {
    suitability = `At an overall index of ${city.indices.overall}, ${city.cityName} provides highly competitive affordability. This area is highly suitable for young families, retirees, remote workers, or individuals looking to maximize their purchasing power, build savings quickly, or secure larger homes at a fraction of the cost of higher-tier metropolitan areas.`;
  }

  let realEstateAdvice = "";
  const ratio = city.indices.homePrice / city.indices.rent;
  if (ratio > 1.15) {
    realEstateAdvice = `In ${city.cityName}, the home purchase index (${city.indices.homePrice}) is significantly higher than the rent index (${city.indices.rent}). This suggests a premium real estate market where buying a home carries a high entry barrier compared to renting, making renting more financially attractive in the short term.`;
  } else if (ratio < 0.85) {
    realEstateAdvice = `In ${city.cityName}, the home purchase index (${city.indices.homePrice}) is lower than the rent index (${city.indices.rent}). This indicates that homeownership may be relatively affordable compared to renting, offering better long-term equity and stability.`;
  } else {
    realEstateAdvice = `In ${city.cityName}, the home price index (${city.indices.homePrice}) and rent index (${city.indices.rent}) are closely aligned, meaning the buy-vs-rent choice will depend more on your personal timeline and cash reserves.`;
  }

  let cityTransportAdvice = "";
  if (city.indices.transport > 120) {
    cityTransportAdvice = `With a high transport index of ${city.indices.transport}, getting around ${city.cityName} is expensive. This is typical of major metros with high parking rates, toll roads, or longer commutes. Consider public transit options or choosing a home closer to work.`;
  } else if (city.indices.transport < 95) {
    cityTransportAdvice = `With a low transport index of ${city.indices.transport}, commute and travel expenses in ${city.cityName} are highly affordable, making it easy to budget for daily travel or vehicle maintenance.`;
  } else {
    cityTransportAdvice = `Transportation expenses in ${city.cityName} are average (index ${city.indices.transport}), meaning standard car ownership or transit costs will apply.`;
  }

  return {
    title: `Cost of Living Analysis: ${city.cityName}, ${city.stateCode}`,
    summary: `${city.cityName} features a calculated overall cost-of-living index of ${city.indices.overall}, which is ${overallText}. Category cost indexes include rental housing at ${city.indices.rent} (${rentText}), median home prices at ${city.indices.homePrice} (${homeText}), utilities at ${city.indices.utilities} (${utilText}), groceries at ${city.indices.groceries} (${groceryText}), public/private transit at ${city.indices.transport} (${transText}), and local healthcare services at ${city.indices.healthcare} (${healthText}).`,
    sections: [
      {
        heading: "Cost overview & housing explanation",
        paragraphs: [
          `Evaluating housing options in ${city.cityName} requires comparing the rent and home price indices directly. Rent stands at an index of ${city.indices.rent}, while home purchase costs show an index of ${city.indices.homePrice}. This dynamic determines whether renting or buying represents a better financial use of capital.`,
          realEstateAdvice,
          "Always verify local listings and real estate broker valuations since city-level indices serve as directional averages and neighborhood-level pricing fluctuates based on school districts, commute corridors, and building types."
        ],
        internalLinks: [
          { href: "/compare/", label: "Compare cities side-by-side" },
          { href: `/state/${city.stateSlug}/`, label: `Explore ${stateName} state metrics` }
        ]
      },
      {
        heading: "Utilities, internet & transit costs",
        paragraphs: [
          `Operating utility costs in ${city.cityName} run at an index of ${city.indices.utilities}, which is ${utilText}. This index represents electricity, gas, heating, water, and local high-speed broadband packages. These fixed operational costs are often overlooked during relocation planning but form a major portion of a household budget.`,
          `Transportation and transit services are indexed at ${city.indices.transport} (${transText}). This includes fuel pricing, public transit access, car registration fees, parking rates, and local vehicle insurance premiums.`,
          cityTransportAdvice
        ],
        internalLinks: [
          { href: "/guides/cost-of-living-basics/", label: "Understanding cost indices" },
          { href: "/guides/moving-checklist/", label: "Complete relocation checklist" }
        ]
      },
      {
        heading: "Who this city is suitable for",
        paragraphs: [
          suitability,
          `Beyond career goals, take into account local amenities and climate characteristics. ${city.cityName} has unique features that draw renters and buyers. Consider nearby alternatives such as ${nearbyNames} to see if their cost patterns align better with your lifestyle objectives.`,
          "Ultimately, a city is suitable if your projected local net income comfortably exceeds fixed operational costs, leaving a healthy buffer for savings, leisure, and retirement contributions."
        ],
        internalLinks: [
          { href: "/cities/", label: "Browse all cities directory" },
          { href: "/find-a-pro/", label: "Request local real estate help" }
        ]
      },
      {
        heading: "Moving & budget tips and caveats",
        paragraphs: [
          `When planning your relocation to ${city.cityName}, establish a transition cost buffer separate from your monthly budget. Moving expenses, lease security deposits, utility setup fees, and initial furnishings can add up to thousands of dollars.`,
          "We recommend holding a cash contingency reserve equal to at least two months of estimated rent in the target city to cover setup friction without dipping into core emergency funds.",
          "Disclaimer: RentX cost indices are educational estimates designed for comparative planning. They do not constitute financial advice, guaranteed quotes, or binding offers. Verify current listing details, utility rates, and service contract prices directly before committing."
        ],
        internalLinks: [
          { href: "/disclaimer/", label: "Read educational disclaimer" },
          { href: "/editorial-policy/", label: "Learn our editorial standards" }
        ]
      }
    ]
  };
}

export function buildCompareSeoLongform(cityA: City, cityB: City): SeoLongformContent {
  const overallDiff = cityB.indices.overall - cityA.indices.overall;
  const rentDiff = Math.round(((cityB.indices.rent - cityA.indices.rent) / cityA.indices.rent) * 100);
  
  let comparisonSummary = "";
  if (overallDiff > 0) {
    comparisonSummary = `${cityB.cityName}, ${cityB.stateCode} is estimated to be ${overallDiff}% more expensive overall than ${cityA.cityName}, ${cityA.stateCode}.`;
  } else if (overallDiff < 0) {
    comparisonSummary = `${cityA.cityName}, ${cityA.stateCode} is estimated to be ${Math.abs(overallDiff)}% more expensive overall than ${cityB.cityName}, ${cityB.stateCode}.`;
  } else {
    comparisonSummary = `Both ${cityA.cityName} and ${cityB.cityName} share identical overall cost-of-living indices.`;
  }

  let rentSummary = "";
  if (rentDiff > 0) {
    rentSummary = `Housing rent in ${cityB.cityName} carries a ${rentDiff}% premium over ${cityA.cityName}.`;
  } else if (rentDiff < 0) {
    rentSummary = `Housing rent in ${cityB.cityName} is estimated to be ${Math.abs(rentDiff)}% lower than in ${cityA.cityName}.`;
  } else {
    rentSummary = `Housing rents are approximately equal in both cities.`;
  }

  let housingAdvice = "";
  if (rentDiff > 10) {
    housingAdvice = `Moving from ${cityA.cityName} to ${cityB.cityName} represents a significant increase in housing costs, where rent runs ${rentDiff}% higher. You will need a higher salary or must adjust your square footage expectations to maintain the same standard of living.`;
  } else if (rentDiff < -10) {
    housingAdvice = `Relocating from ${cityA.cityName} to ${cityB.cityName} could significantly lower your housing costs, since rent in ${cityB.cityName} runs ${Math.abs(rentDiff)}% lower. This shift can free up a substantial portion of your monthly budget for savings or other expenses.`;
  } else {
    housingAdvice = `Housing costs and rents are closely aligned between ${cityA.cityName} and ${cityB.cityName}, meaning your monthly housing budget will stay similar. You can focus your comparison on other factors like transit and local taxes.`;
  }

  let transportAdvice = "";
  const transDiff = cityB.indices.transport - cityA.indices.transport;
  if (transDiff > 10) {
    transportAdvice = `Additionally, transportation expenses in ${cityB.cityName} are higher (index ${cityB.indices.transport} vs ${cityA.indices.transport}). This means commuting, fuel, and car insurance will take up a larger share of your monthly budget.`;
  } else if (transDiff < -10) {
    transportAdvice = `Notably, transportation costs in ${cityB.cityName} are lower (index ${cityB.indices.transport} vs ${cityA.indices.transport}), which indicates lower insurance premiums, shorter commutes, or better public transit access.`;
  } else {
    transportAdvice = `Commuting and transit expenses are comparable in both locations, with indices of ${cityA.indices.transport} and ${cityB.indices.transport} respectively.`;
  }

  let salaryAdvice = "";
  if (overallDiff > 15) {
    salaryAdvice = `Because ${cityB.cityName} is ${overallDiff}% more expensive overall, you will need a substantial salary increase to maintain your current lifestyle. A higher gross offer in ${cityB.cityName} might actually reduce your net savings if it does not cover the premium.`;
  } else if (overallDiff < -15) {
    salaryAdvice = `With ${cityB.cityName} being ${Math.abs(overallDiff)}% cheaper overall, moving here will stretch your current earnings further. Even with a similar or slightly lower salary, your purchasing power will increase.`;
  } else {
    salaryAdvice = `Since the cost of living differences between ${cityA.cityName} and ${cityB.cityName} are minor (${Math.abs(overallDiff)}% overall), a lateral career move or similar salary offer will keep your financial baseline stable.`;
  }

  return {
    title: `Cost of Living Comparison: ${cityA.cityName}, ${cityA.stateCode} vs ${cityB.cityName}, ${cityB.stateCode}`,
    summary: `This side-by-side cost-of-living comparison analyzes the financial differences between ${cityA.cityName}, ${cityA.stateCode} (overall index ${cityA.indices.overall}) and ${cityB.cityName}, ${cityB.stateCode} (overall index ${cityB.indices.overall}). ${comparisonSummary} Use this data to plan your monthly budget and compare housing, transit, utility, and grocery expenses.`,
    sections: [
      {
        heading: "Direct comparison summary & housing differences",
        paragraphs: [
          `Housing costs are the primary driver of cost-of-living differences between ${cityA.cityName} and ${cityB.cityName}. ${cityA.cityName} features a rent index of ${cityA.indices.rent} and a home price index of ${cityA.indices.homePrice}, while ${cityB.cityName} features a rent index of ${cityB.indices.rent} and a home price index of ${cityB.indices.homePrice}.`,
          rentSummary,
          housingAdvice,
          "We recommend checking current neighborhood rental listings in both cities, as pricing can fluctuate significantly based on transit access and local amenities."
        ],
        internalLinks: [
          { href: `/city/${cityA.slug}/`, label: `Explore ${cityA.cityName} profile` },
          { href: `/city/${cityB.slug}/`, label: `Explore ${cityB.cityName} profile` }
        ]
      },
      {
        heading: "Utilities, groceries & transit comparison",
        paragraphs: [
          `Operational costs like utilities run at index ${cityA.indices.utilities} in ${cityA.cityName} vs ${cityB.indices.utilities} in ${cityB.cityName}. This includes electricity, heating, water, and broadband packages. Grocery indices stand at ${cityA.indices.groceries} in ${cityA.cityName} vs ${cityB.indices.groceries} in ${cityB.cityName}.`,
          `Commute and transport expenses are indexed at ${cityA.indices.transport} in ${cityA.cityName} vs ${cityB.indices.transport} in ${cityB.cityName}. Transportation costs reflect fuel prices, transit availability, highway access, vehicle registration, and insurance rates.`,
          transportAdvice
        ],
        internalLinks: [
          { href: "/guides/cost-of-living-basics/", label: "Cost indices guide" },
          { href: "/guides/moving-checklist/", label: "Moving checklist" }
        ]
      },
      {
        heading: "Who should choose which city",
        paragraphs: [
          `Choosing between these cities depends on your career objectives, lifestyle preferences, and budget margin. ${cityA.cityName} may be preferred by individuals seeking specific regional job markets or urban densities. ${cityB.cityName} represents an appealing option for households looking to maximize square footage, lower fixed costs, or build savings.`,
          salaryAdvice,
          "Request assistance from local real estate professionals in either market to validate budget models and verify listings before finalizing plans."
        ],
        internalLinks: [
          { href: "/find-a-pro/", label: "Connect with relocation pros" },
          { href: "/disclaimer/", label: "Read platform disclaimer" }
        ]
      }
    ]
  };
}

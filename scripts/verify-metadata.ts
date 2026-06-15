import * as fs from "fs";
import * as path from "path";

// 1. Helper to create mock files stripping out .mdx imports
function createMockFile(sourcePath: string, destPath: string) {
  let content = fs.readFileSync(sourcePath, "utf-8");
  
  // Regex to match: import Identifier from "path.mdx";
  const regex = /import\s+(\w+)\s+from\s+['"][^'"]+\.mdx['"];?/g;
  
  let match;
  const mocks: string[] = [];
  while ((match = regex.exec(content)) !== null) {
    mocks.push(`const ${match[1]} = () => null;`);
  }
  
  // Remove the actual imports and prepend the mock constants
  content = content.replace(regex, "");
  content = mocks.join("\n") + "\n" + content;
  
  fs.writeFileSync(destPath, content, "utf-8");
}

// Prepare paths
const rootDir = path.join(__dirname, "..");
const guidesSrc = path.join(rootDir, "lib", "guides.ts");
const guidesMock = path.join(rootDir, "lib", "guides.mock.ts");
const insightsSrc = path.join(rootDir, "lib", "insights.ts");
const insightsMock = path.join(rootDir, "lib", "insights.mock.ts");

// Create the mock files
createMockFile(guidesSrc, guidesMock);
createMockFile(insightsSrc, insightsMock);

async function run() {
  try {
    const { getCities, getStates } = await import("../lib/data");
    const { GUIDES } = await import("../lib/guides.mock");
    const { INSIGHTS } = await import("../lib/insights.mock");
    const { buildMetadata } = await import("../lib/seo");

    // List of all page metadata configurations
    const routes: { path: string; title: string; description: string }[] = [];

    // 1. Static pages
    const staticPages = [
      { path: "/", title: "US cost of living made simple", description: "Compare US city and state living costs with clear, practical breakdowns." },
      { path: "/states/", title: "Cost of Living by US State", description: "Browse US states and explore local cost-of-living trends." },
      { path: "/cities/", title: "Cost of Living Index by US City", description: "Browse US cities and compare cost-of-living breakdowns." },
      { path: "/compare/", title: "Compare city cost of living", description: "Compare two cities side by side using cost-of-living indices." },
      { path: "/guides/", title: "Cost of living guides", description: "Practical guides for reading cost-of-living data and planning moves." },
      { path: "/insights/", title: "Insights", description: "Read in-depth US cost-of-living insights, methods, and planning guides." },
      { path: "/find-a-pro/", title: "Find a Pro", description: "Connect with vetted local real estate agents and relocation experts." },
      { path: "/about/", title: "About RentX", description: "Learn how RentX approaches cost-of-living data and independent editorial standards." },
      { path: "/contact/", title: "Contact RentX", description: "Get in touch with the RentX team for inquiries, feedback, or support." },
      { path: "/thanks/", title: "Thank You", description: "Thank you for reaching out to RentX." },
      { path: "/privacy-policy/", title: "Privacy Policy", description: "Understand how RentX collects, handles, and protects your personal data." },
      { path: "/terms/", title: "Terms of Service", description: "Read the rules, terms, and agreements for using the RentX platform." },
      { path: "/disclaimer/", title: "Disclaimer", description: "Educational data limits, warranties, and disclaimer of liability for RentX." },
      { path: "/editorial-policy/", title: "Editorial Policy", description: "Editorial standards and research methods." },
      { path: "/cookie-policy/", title: "Cookie Policy", description: "Details on how RentX uses browser cookies for analytics." },
      { path: "/dmca/", title: "DMCA Policy", description: "RentX copyright compliance and DMCA reporting guidelines." },
      { path: "/advertising-disclosure/", title: "Advertising Disclosure", description: "RentX advertising policies." }
    ];

    staticPages.forEach((page) => {
      const meta = buildMetadata({ title: page.title, description: page.description, path: page.path });
      routes.push({
        path: page.path,
        title: (meta.title as any)?.default ?? "",
        description: meta.description as string
      });
    });

    // 2. City pages
    getCities().forEach((city) => {
      const path = `/city/${city.slug}/`;
      const meta = buildMetadata({
        title: `${city.cityName}, ${city.stateCode} cost of living`,
        description: `Cost of living breakdown for ${city.cityName}, ${city.stateCode}.`,
        path
      });
      routes.push({
        path,
        title: (meta.title as any)?.default ?? "",
        description: meta.description as string
      });
    });

    // 3. State pages
    getStates().forEach((state) => {
      const path = `/state/${state.slug}/`;
      const meta = buildMetadata({
        title: `${state.name} cost of living`,
        description: `Cost of living overview and major city comparisons in ${state.name}.`,
        path
      });
      routes.push({
        path,
        title: (meta.title as any)?.default ?? "",
        description: meta.description as string
      });
    });

    // 4. Guide detail pages
    GUIDES.forEach((guide) => {
      const path = `/guides/${guide.slug}/`;
      const meta = buildMetadata({
        title: guide.meta.title,
        description: guide.meta.description,
        path
      });
      routes.push({
        path,
        title: (meta.title as any)?.default ?? "",
        description: meta.description as string
      });
    });

    // 5. Insight detail pages
    INSIGHTS.forEach((insight) => {
      const path = `/insights/${insight.slug}/`;
      const meta = buildMetadata({
        title: insight.meta.title,
        description: insight.meta.description,
        path
      });
      routes.push({
        path,
        title: (meta.title as any)?.default ?? "",
        description: meta.description as string
      });
    });

    // 6. City comparison pair pages
    const cities = getCities();
    cities.forEach((city) => {
      cities
        .filter((other) => other.slug !== city.slug)
        .forEach((other) => {
          const path = `/compare/${city.slug}-vs-${other.slug}/`;
          const meta = buildMetadata({
            title: `${city.cityName}, ${city.stateCode} vs ${other.cityName}, ${other.stateCode} Cost of Living Comparison`,
            description: `Compare cost of living, rent, home prices, utility bills, grocery costs, transportation, and healthcare between ${city.cityName}, ${city.stateCode} and ${other.cityName}, ${other.stateCode}.`,
            path
          });
          routes.push({
            path,
            title: (meta.title as any)?.default ?? "",
            description: meta.description as string
          });
        });
    });

    // Perform Validations
    let errors = 0;
    const titleMap: Record<string, string[]> = {};
    const descMap: Record<string, string[]> = {};

    routes.forEach((route) => {
      // 1. Assertions on Empty Tags
      if (!route.title || route.title.trim() === "") {
        console.error(`❌ Empty Title found on route: ${route.path}`);
        errors++;
      }
      if (!route.description || route.description.trim() === "") {
        console.error(`❌ Empty Description found on route: ${route.path}`);
        errors++;
      }

      // Group to check duplicates
      if (route.title) {
        if (!titleMap[route.title]) titleMap[route.title] = [];
        titleMap[route.title].push(route.path);
      }
      if (route.description) {
        if (!descMap[route.description]) descMap[route.description] = [];
        descMap[route.description].push(route.path);
      }
    });

    // 2. Duplicate checks
    Object.entries(titleMap).forEach(([title, paths]) => {
      if (paths.length > 1) {
        console.error(`❌ Duplicate Title: "${title}" found across paths:\n   - ${paths.join("\n   - ")}`);
        errors++;
      }
    });

    Object.entries(descMap).forEach(([desc, paths]) => {
      if (paths.length > 1) {
        console.error(`❌ Duplicate Description: "${desc}" found across paths:\n   - ${paths.join("\n   - ")}`);
        errors++;
      }
    });

    console.log(`\n=== Metadata Validation Report ===`);
    console.log(`Total Pages Scanned: ${routes.length}`);
    if (errors > 0) {
      console.log(`Status: ❌ FAILED with ${errors} issues.`);
      cleanup();
      process.exit(1);
    } else {
      console.log(`Status: ✅ PASSED successfully! No duplicates or empty tags found.`);
      cleanup();
      process.exit(0);
    }
  } catch (err) {
    console.error("❌ Execution error:", err);
    cleanup();
    process.exit(1);
  }
}

function cleanup() {
  try {
    if (fs.existsSync(guidesMock)) fs.unlinkSync(guidesMock);
    if (fs.existsSync(insightsMock)) fs.unlinkSync(insightsMock);
  } catch (e) {
    // ignore
  }
}

run();

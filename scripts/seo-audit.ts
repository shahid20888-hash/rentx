import * as fs from "fs";
import * as path from "path";

// 1. Mock MDX files to allow TSX runner to load guide/insight configurations
const rootDir = path.join(__dirname, "..");
const guidesSrc = path.join(rootDir, "lib", "guides.ts");
const guidesMock = path.join(rootDir, "lib", "guides.mock.ts");
const insightsSrc = path.join(rootDir, "lib", "insights.ts");
const insightsMock = path.join(rootDir, "lib", "insights.mock.ts");
const sitemapSrc = path.join(rootDir, "app", "sitemap.ts");
const sitemapMock = path.join(rootDir, "app", "sitemap.mock.ts");

function createMockFile(sourcePath: string, destPath: string) {
  let content = fs.readFileSync(sourcePath, "utf-8");
  const regex = /import\s+(\w+)\s+from\s+['"][^'"]+\.mdx['"];?/g;
  let match;
  const mocks: string[] = [];
  while ((match = regex.exec(content)) !== null) {
    mocks.push(`const ${match[1]} = () => null;`);
  }
  content = content.replace(regex, "");
  content = mocks.join("\n") + "\n" + content;
  fs.writeFileSync(destPath, content, "utf-8");
}

function cleanup() {
  try {
    if (fs.existsSync(guidesMock)) fs.unlinkSync(guidesMock);
    if (fs.existsSync(insightsMock)) fs.unlinkSync(insightsMock);
    if (fs.existsSync(sitemapMock)) fs.unlinkSync(sitemapMock);
  } catch (e) {
    // ignore
  }
}

// Write mock files
createMockFile(guidesSrc, guidesMock);
createMockFile(insightsSrc, insightsMock);

let sitemapContent = fs.readFileSync(sitemapSrc, "utf-8");
sitemapContent = sitemapContent
  .replace(/from\s+['"]@\/lib\/guides['"]/g, `from "../lib/guides.mock"`)
  .replace(/from\s+['"]@\/lib\/insights['"]/g, `from "../lib/insights.mock"`)
  .replace(/from\s+['"]@\/lib\/data['"]/g, `from "../lib/data"`);
fs.writeFileSync(sitemapMock, sitemapContent, "utf-8");

interface AuditIssue {
  type: string;
  route: string;
  suggestedFix: string;
  details?: string;
}

const BASE_URL = "https://rentx.us";
const buildAppDir = path.join(rootDir, ".next", "server", "app");

const issues: AuditIssue[] = [];

// Helper to push issue
function addIssue(type: string, route: string, suggestedFix: string, details?: string) {
  issues.push({ type, route, suggestedFix, details });
}

// 1. Audit Ads.txt
function auditAdsTxt() {
  const adsPath = path.join(rootDir, "public", "ads.txt");
  if (!fs.existsSync(adsPath)) {
    addIssue("missing ads.txt", "/ads.txt", "Create a public ads.txt file under the public directory.");
    return;
  }
  const content = fs.readFileSync(adsPath, "utf-8").trim();
  const expectedLine = "google.com, pub-3635656048122177, DIRECT, f08c47fec0942fa0";
  if (!content.includes(expectedLine)) {
    addIssue("invalid ads.txt", "/ads.txt", `Ensure ads.txt contains the AdSense publisher credentials: "${expectedLine}"`);
  }
}

// 2. Audit Sitemap Index & Partitions
async function auditSitemaps() {
  try {
    const { generateSitemaps, default: sitemap } = await import("../app/sitemap.mock");
    const partitions = await generateSitemaps();

    let totalUrls = 0;
    for (const part of partitions) {
      const urls = await sitemap({ id: part.id });
      totalUrls += urls.length;

      if (urls.length > 50000) {
        addIssue(
          "sitemap URL count",
          `/sitemap/${part.id}.xml`,
          "Partition sitemap size is over the Google 50,000 limit. Split into smaller partitioned chunks.",
          `Count: ${urls.length}`
        );
      }

      urls.forEach((entry: any) => {
        if (!entry.url.startsWith(BASE_URL)) {
          addIssue(
            "sitemap canonical consistency",
            entry.url,
            `All sitemap URLs must be absolute and start with the production BASE_URL: "${BASE_URL}"`
          );
        }
        if (!entry.url.endsWith(".xml") && !entry.url.endsWith("/")) {
          addIssue(
            "sitemap canonical consistency",
            entry.url,
            "Ensure sitemap URLs systematically end with trailing slashes."
          );
        }
        if (entry.url.includes("/thanks/")) {
          addIssue(
            "sitemap canonical consistency",
            entry.url,
            "Utility confirmation pages (e.g. /thanks/) should not be included in the sitemap index."
          );
        }
      });
    }
  } catch (err: any) {
    addIssue("sitemap compilation error", "/sitemap.xml", "Verify sitemap.ts compile status and path definitions.", err.message);
  }
}

// 3. Scan Static Build HTML Files
function walkHtml(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkHtml(filePath, fileList);
    } else if (file.endsWith(".html") && !file.endsWith("_not-found.html")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const titleMap: Record<string, string[]> = {};
const descMap: Record<string, string[]> = {};
const allRoutes = new Set<string>();

// Dynamic route whitelist (bypasses static HTML check since they are dynamic)
const DYNAMIC_ROUTES = new Set(["/find-a-pro", "/find-a-pro/"]);

function auditHtmlFiles() {
  const htmlFiles = walkHtml(buildAppDir);
  if (htmlFiles.length === 0) {
    console.error("❌ No pre-rendered HTML files found. Run 'npm run build' first before auditing.");
    cleanup();
    process.exit(1);
  }

  // Populate routes set first for broken links checking
  htmlFiles.forEach(file => {
    const relativePath = path.relative(buildAppDir, file).replace(/\\/g, "/");
    const route = relativePath === "index.html" ? "/" : `/${relativePath.replace(/\.html$/, "")}/`;
    allRoutes.add(route);
  });

  htmlFiles.forEach(file => {
    const relativePath = path.relative(buildAppDir, file).replace(/\\/g, "/");
    const route = relativePath === "index.html" ? "/" : `/${relativePath.replace(/\.html$/, "")}/`;
    const html = fs.readFileSync(file, "utf-8");

    // Title
    const titleMatch = /<title[^>]*>([^<]*)<\/title>/i.exec(html);
    const title = titleMatch ? titleMatch[1].trim() : "";
    if (!title) {
      addIssue("missing title", route, "Define a unique title in page metadata.");
    } else {
      if (!titleMap[title]) titleMap[title] = [];
      titleMap[title].push(route);
    }

    // Description
    let description = "";
    let robots = "";
    const metaRegex = /<meta\s+[^>]*>/gi;
    let match;
    while ((match = metaRegex.exec(html)) !== null) {
      const metaTag = match[0];
      if (/name=["']description["']/i.test(metaTag)) {
        const contentMatch = /content=["']([^"']*)["']/i.exec(metaTag);
        if (contentMatch) description = contentMatch[1].trim();
      }
      if (/name=["']robots["']/i.test(metaTag)) {
        const contentMatch = /content=["']([^"']*)["']/i.exec(metaTag);
        if (contentMatch) robots = contentMatch[1].trim();
      }
    }
    if (!description) {
      addIssue("missing meta description", route, "Define a unique meta description in page metadata.");
    } else {
      if (!descMap[description]) descMap[description] = [];
      descMap[description].push(route);
    }

    // Canonical
    const canonicalMatch = /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i.exec(html) ||
                           /<link\s+[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i.exec(html);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : "";
    if (!canonical) {
      addIssue("missing canonical", route, "Define a canonical URL inside metadata block.");
    } else {
      // canonical consistency
      const expectedCanonical = route === "/" ? `${BASE_URL}/` : `${BASE_URL}${route}`;
      if (canonical !== expectedCanonical) {
        addIssue(
          "canonical mismatch",
          route,
          `Canonical link must be equal to expected canonical route: "${expectedCanonical}"`,
          `Found: "${canonical}"`
        );
      }
    }

    // H1 check
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
    const h1s: string[] = [];
    while ((match = h1Regex.exec(html)) !== null) {
      h1s.push(match[1].replace(/<[^>]*>/g, "").trim());
    }
    if (h1s.length === 0) {
      addIssue("missing H1", route, "Include exactly one H1 element inside page body layout.");
    } else if (h1s.length > 1) {
      addIssue("multiple H1s", route, "Limit H1 tags to exactly one per page for SEO semantics.", `H1s: ${JSON.stringify(h1s)}`);
    }

    // Robots Controls (noindex for thanks success pages)
    if (route === "/thanks/") {
      if (!robots || !robots.toLowerCase().includes("noindex")) {
        addIssue("missing robots controls", route, "Ensure conversion success page uses robots: { index: false } tag to prevent duplicate indexing.");
      }
    }

    // AdSense Global Script
    const hasAdSense = html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
    if (!hasAdSense) {
      addIssue("missing AdSense global script", route, "Include the global AdSense loader script in layout.tsx.");
    }

    // JSON-LD validations
    const jsonLdRegex = /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      const jsonStr = match[1].trim();
      try {
        JSON.parse(jsonStr);
      } catch (err: any) {
        addIssue("invalid JSON-LD", route, "Ensure JSON-LD block syntax is valid JSON. Escape apostrophes, quotes, and format properties correctly.", err.message);
      }
    }

    // Broken Internal Links
    const linkRegex = /<a\s+[^>]*href=["']([^"']*)["']/gi;
    while ((match = linkRegex.exec(html)) !== null) {
      const href = match[1].trim();
      
      // Filter out external/same-page links
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || href === "") {
        continue;
      }

      // Check trailing slash consistency
      const baseUrlRemoved = href.replace(BASE_URL, "");
      const pathPart = baseUrlRemoved.split("#")[0].split("?")[0];
      
      if (pathPart !== "/" && !pathPart.endsWith("/")) {
        addIssue(
          "broken internal links",
          route,
          `Internal link "${href}" violates trailing slash consistency rule. All internal paths should terminate with a slash.`,
          `Path: ${pathPart}`
        );
        continue;
      }

      // Verify page file exists
      if (!DYNAMIC_ROUTES.has(pathPart)) {
        if (!allRoutes.has(pathPart)) {
          addIssue(
            "broken internal links",
            route,
            `Internal link "${href}" points to a non-existent route path.`,
            `Missing Route: ${pathPart}`
          );
        }
      }
    }
  });

  // Duplicate Titles and Descriptions Check
  Object.entries(titleMap).forEach(([title, paths]) => {
    if (paths.length > 1) {
      paths.forEach(p => {
        addIssue("duplicate titles", p, `Title "${title}" is duplicated. Every index page must have a unique title.`, `Clashing routes: ${paths.join(", ")}`);
      });
    }
  });

  Object.entries(descMap).forEach(([desc, paths]) => {
    if (paths.length > 1) {
      paths.forEach(p => {
        addIssue("duplicate meta descriptions", p, `Description "${desc}" is duplicated. Every page must use a unique description.`, `Clashing routes: ${paths.join(", ")}`);
      });
    }
  });
}

// 4. Main Auditor Coordinator
async function main() {
  console.log("🚀 Starting pre-launch SEO Audit...");
  
  auditAdsTxt();
  await auditSitemaps();
  auditHtmlFiles();

  cleanup();

  console.log("\n=== Pre-Launch SEO Audit Report ===");
  if (issues.length === 0) {
    console.log("✅ STATUS: PASSED! All SEO validations completed successfully.");
    process.exit(0);
  } else {
    console.log(`❌ STATUS: FAILED with ${issues.length} audit issues.\n`);
    
    // Group and display issues nicely
    issues.forEach((issue, idx) => {
      console.log(`[${idx + 1}] Issue: ${issue.type.toUpperCase()}`);
      console.log(`    Route: ${issue.route}`);
      console.log(`    Fix:   ${issue.suggestedFix}`);
      if (issue.details) {
        console.log(`    Info:  ${issue.details}`);
      }
      console.log("--------------------------------------------------");
    });
    
    process.exit(1);
  }
}

main();

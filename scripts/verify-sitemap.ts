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
  let sitemapMock = "";
  try {
    const sitemapSrc = path.join(rootDir, "app", "sitemap.ts");
    sitemapMock = path.join(rootDir, "app", "sitemap.mock.ts");
    
    let sitemapContent = fs.readFileSync(sitemapSrc, "utf-8");
    // Replace imports
    sitemapContent = sitemapContent
      .replace(/from\s+['"]@\/lib\/guides['"]/g, `from "../lib/guides.mock"`)
      .replace(/from\s+['"]@\/lib\/insights['"]/g, `from "../lib/insights.mock"`)
      .replace(/from\s+['"]@\/lib\/data['"]/g, `from "../lib/data"`);
      
    fs.writeFileSync(sitemapMock, sitemapContent, "utf-8");

    // Dynamic import the mock sitemap
    const { generateSitemaps, default: sitemap } = await import("../app/sitemap.mock");

    const partitions = await generateSitemaps();
    console.log(`\n=== Sitemap Index Audit ===`);
    console.log(`Total Partitions: ${partitions.length}`);

    let totalUrls = 0;
    const errors: string[] = [];
    const report: any[] = [];

    for (const part of partitions) {
      const urls = await sitemap({ id: part.id });
      totalUrls += urls.length;
      console.log(`- Partition ${part.id} size: ${urls.length} URLs`);

      report.push({
        id: part.id,
        size: urls.length,
        urls: urls.map((u: any) => u.url)
      });

      // Assertions
      if (urls.length > 50000) {
        errors.push(`❌ Partition ${part.id} has ${urls.length} URLs, which exceeds the limit of 50,000!`);
      }

      urls.forEach((entry: any) => {
        // Assert canonical trailing slash
        if (entry.url.endsWith(".xml")) return;
        
        // Root page should be https://rentx.us/
        // Non-root pages should end with trailing slash, e.g. https://rentx.us/about/
        if (!entry.url.endsWith("/")) {
          errors.push(`❌ URL does not end with trailing slash: ${entry.url}`);
        }

        // Must start with absolute BASE_URL
        if (!entry.url.startsWith("https://rentx.us")) {
          errors.push(`❌ URL is not absolute: ${entry.url}`);
        }

        // Must not contain any noindex pages (e.g. /thanks/)
        if (entry.url.includes("/thanks/")) {
          errors.push(`❌ Noindex page '/thanks/' found in sitemap!`);
        }
      });
    }

    console.log(`\n=== Sitemap Validation Report ===`);
    console.log(`Total URLs: ${totalUrls}`);
    
    if (errors.length > 0) {
      console.error(`Status: ❌ FAILED with ${errors.length} errors.`);
      errors.forEach((err) => console.error(err));
      cleanup(sitemapMock);
      process.exit(1);
    } else {
      console.log(`Status: ✅ PASSED successfully!`);
      cleanup(sitemapMock);
      process.exit(0);
    }
  } catch (err) {
    console.error("❌ Execution error:", err);
    cleanup(sitemapMock);
    process.exit(1);
  }
}

function cleanup(sitemapMock?: string) {
  try {
    if (fs.existsSync(guidesMock)) fs.unlinkSync(guidesMock);
    if (fs.existsSync(insightsMock)) fs.unlinkSync(insightsMock);
    if (sitemapMock && fs.existsSync(sitemapMock)) fs.unlinkSync(sitemapMock);
  } catch (e) {
    // ignore
  }
}

run();

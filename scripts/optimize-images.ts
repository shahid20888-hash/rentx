import * as fs from "fs";
import * as path from "path";
import sharp from "sharp";

const imagesDir = path.join(__dirname, "..", "public", "images");
const cardsDir = path.join(imagesDir, "cards");

async function optimizeFolder(srcDir: string, destWidth?: number) {
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const filePath = path.join(srcDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && file.endsWith(".png")) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);

      if (file === "rentx-og-banner.png") {
        // Compress OG banner as PNG (preserve format for compatibility)
        const tempPath = path.join(srcDir, `temp-${file}`);
        console.log(`⚡ Compressing OG Banner: ${file} (${(stat.size / 1024).toFixed(1)} KB)`);
        await sharp(filePath)
          .png({ quality: 80, compressionLevel: 9 })
          .toFile(tempPath);
        
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        const newStat = fs.statSync(filePath);
        console.log(`   Compressed to: ${(newStat.size / 1024).toFixed(1)} KB (Saved: ${(((stat.size - newStat.size) / stat.size) * 100).toFixed(1)}%)`);
      } else {
        // Convert to WebP, optionally resize
        const destPath = path.join(srcDir, `${name}.webp`);
        console.log(`⚡ Processing image: ${file} (${(stat.size / 1024).toFixed(1)} KB)`);
        
        let pipeline = sharp(filePath);
        if (destWidth) {
          pipeline = pipeline.resize({ width: destWidth, withoutEnlargement: true });
        }

        await pipeline.webp({ quality: 80 }).toFile(destPath);
        
        // Delete original png
        fs.unlinkSync(filePath);
        const newStat = fs.statSync(destPath);
        console.log(`   Saved WebP: ${name}.webp (${(newStat.size / 1024).toFixed(1)} KB) (Saved: ${(((stat.size - newStat.size) / stat.size) * 100).toFixed(1)}%)`);
      }
    }
  }
}

async function main() {
  console.log("🚀 Starting image optimization process...");
  
  // 1. Process Main Hero Images (WebP, no resize)
  console.log("\n--- Optimizing Main Hero Images ---");
  await optimizeFolder(imagesDir);

  // 2. Process Card Thumbnails (WebP, resized to 600px width)
  console.log("\n--- Optimizing Card Thumbnail Images ---");
  if (fs.existsSync(cardsDir)) {
    await optimizeFolder(cardsDir, 600);
  }

  // 3. Process Site Logo (PNG, resized to 128px width, compressed)
  console.log("\n--- Optimizing Site Logo ---");
  const logoPath = path.join(__dirname, "..", "public", "logo-rentx.png");
  if (fs.existsSync(logoPath)) {
    const stat = fs.statSync(logoPath);
    console.log(`⚡ Optimizing Logo: logo-rentx.png (${(stat.size / 1024).toFixed(1)} KB)`);
    const tempPath = path.join(__dirname, "..", "public", "temp-logo-rentx.png");
    await sharp(logoPath)
      .resize({ width: 128 })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(tempPath);
    fs.unlinkSync(logoPath);
    fs.renameSync(tempPath, logoPath);
    const newStat = fs.statSync(logoPath);
    console.log(`   Optimized Logo to: ${(newStat.size / 1024).toFixed(1)} KB (Saved: ${(((stat.size - newStat.size) / stat.size) * 100).toFixed(1)}%)`);
  }

  console.log("\n🎉 All images optimized successfully!");
}

main().catch((err) => {
  console.error("❌ Error optimizing images:", err);
  process.exit(1);
});

/**
 * Generates PWA icons from the VICON logo.
 * Run: node scripts/generate-icons.mjs
 *
 * Uses the existing viconlogo-160.webp and resizes/converts to PNG
 * for all required PWA and favicon sizes.
 */

import sharp from "sharp"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public")
const logoPath = join(publicDir, "optimized", "viconlogo-160.webp")

const icons = [
  { name: "icon-192x192.png", size: 192 },
  { name: "icon-512x512.png", size: 512 },
  { name: "icon-light-32x32.png", size: 32 },
  { name: "icon-dark-32x32.png", size: 32 },
  { name: "apple-icon.png", size: 180 },
]

async function generate() {
  for (const icon of icons) {
    const outputPath = join(publicDir, icon.name)

    if (icon.name === "icon-dark-32x32.png") {
      await sharp(logoPath)
        .resize(icon.size, icon.size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
        .negate({ alpha: false })
        .png()
        .toFile(outputPath)
    } else {
      await sharp(logoPath)
        .resize(icon.size, icon.size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(outputPath)
    }

    console.log(`Generated ${icon.name} (${icon.size}x${icon.size})`)
  }

  console.log("\nAll icons generated from viconlogo-160.webp")
}

generate().catch((err) => {
  console.error("Failed to generate icons:", err)
  process.exit(1)
})

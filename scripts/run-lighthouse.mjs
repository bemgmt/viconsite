import { spawnSync } from "node:child_process"

const urls = [
  "https://www.vicontech.group/",
  "https://www.vicontech.group/about",
  "https://www.vicontech.group/products",
  "https://www.vicontech.group/contact",
  "https://www.vicontech.group/learn-more",
  "https://www.vicontech.group/how-it-works",
  "https://www.vicontech.group/the-system",
  "https://www.vicontech.group/careers",
  "https://www.vicontech.group/agent-pricing",
  "https://www.vicontech.group/login",
]

const outDirArg = process.argv.find((arg) => arg.startsWith("--outDir="))
const outDir = outDirArg ? outDirArg.replace("--outDir=", "") : "."

const slugFor = (url) => {
  const stripped = url.replace(/^https:\/\/www\.vicontech\.group\/?/, "")
  return stripped.length === 0 ? "home" : stripped.replace(/[^a-zA-Z0-9-]/g, "-")
}

for (const url of urls) {
  const slug = slugFor(url)
  const outputPath = `${outDir}/lighthouse-${slug}.json`
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "lighthouse",
      url,
      "--only-categories=performance",
      "--quiet",
      "--chrome-flags=--headless",
      "--output=json",
      `--output-path=${outputPath}`,
    ],
    { stdio: "inherit", shell: true }
  )

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

console.log(`Saved Lighthouse reports to ${outDir}`)

import fs from "node:fs"
import path from "node:path"

const baselineDir = process.env.CWV_BASELINE_DIR ?? "."
const currentDir = process.env.CWV_CURRENT_DIR ?? "."
const outFile = process.env.CWV_SCORECARD_FILE ?? "CWV_SCORECARD.md"

const parseDir = (dirPath) => {
  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.startsWith("lighthouse-") && file.endsWith(".json"))
    .sort()

  const map = new Map()
  for (const file of files) {
    const report = JSON.parse(fs.readFileSync(path.join(dirPath, file), "utf8"))
    const route = file.replace("lighthouse-", "").replace(".json", "")
    map.set(route, {
      lcp: Math.round(report.audits["largest-contentful-paint"].numericValue || 0),
      tbt: Math.round(report.audits["total-blocking-time"].numericValue || 0),
      cls: Number(report.audits["cumulative-layout-shift"].numericValue || 0),
      score: Math.round((report.categories.performance.score || 0) * 100),
    })
  }
  return map
}

const baseline = parseDir(baselineDir)
const current = parseDir(currentDir)
const routes = [...new Set([...baseline.keys(), ...current.keys()])].sort()

if (routes.length === 0) {
  console.error("No Lighthouse reports found for scorecard generation.")
  process.exit(1)
}

const lines = []
lines.push("# Core Web Vitals Scorecard")
lines.push("")
lines.push(`Baseline dir: \`${baselineDir}\``)
lines.push(`Current dir: \`${currentDir}\``)
lines.push("")
lines.push("| Route | LCP Baseline (ms) | LCP Current (ms) | Delta | TBT Baseline (ms) | TBT Current (ms) | Delta | CLS Baseline | CLS Current | Perf Score Baseline | Perf Score Current |")
lines.push("| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |")

for (const route of routes) {
  const b = baseline.get(route)
  const c = current.get(route)
  const lcpDelta = b && c ? c.lcp - b.lcp : null
  const tbtDelta = b && c ? c.tbt - b.tbt : null

  lines.push(
    `| ${route} | ${b ? b.lcp : "-"} | ${c ? c.lcp : "-"} | ${lcpDelta ?? "-"} | ${b ? b.tbt : "-"} | ${c ? c.tbt : "-"} | ${tbtDelta ?? "-"} | ${b ? b.cls.toFixed(3) : "-"} | ${c ? c.cls.toFixed(3) : "-"} | ${b ? b.score : "-"} | ${c ? c.score : "-"} |`
  )
}

fs.writeFileSync(outFile, `${lines.join("\n")}\n`)
console.log(`Wrote ${outFile}`)

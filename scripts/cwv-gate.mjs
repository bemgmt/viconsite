import fs from "node:fs"
import path from "node:path"

const lcpThreshold = Number(process.env.CWV_LCP_THRESHOLD_MS ?? 2500)
const tbtThreshold = Number(process.env.CWV_TBT_THRESHOLD_MS ?? 200)
const targetDir = process.env.CWV_REPORT_DIR ?? "."

const files = fs
  .readdirSync(targetDir)
  .filter((file) => file.startsWith("lighthouse-") && file.endsWith(".json"))
  .sort()

if (files.length === 0) {
  console.error(`No lighthouse report files found in ${targetDir}`)
  process.exit(1)
}

const rows = files.map((file) => {
  const report = JSON.parse(fs.readFileSync(path.join(targetDir, file), "utf8"))
  return {
    route: file.replace("lighthouse-", "").replace(".json", ""),
    lcp: Math.round(report.audits["largest-contentful-paint"].numericValue || 0),
    tbt: Math.round(report.audits["total-blocking-time"].numericValue || 0),
    cls: Number(report.audits["cumulative-layout-shift"].numericValue || 0),
    score: Math.round((report.categories.performance.score || 0) * 100),
  }
})

console.table(rows)

const failed = rows.filter((row) => row.lcp > lcpThreshold || row.tbt > tbtThreshold)
const lcpPass = rows.filter((row) => row.lcp <= lcpThreshold).length
const tbtPass = rows.filter((row) => row.tbt <= tbtThreshold).length

console.log(`LCP pass: ${lcpPass}/${rows.length} (threshold ${lcpThreshold}ms)`)
console.log(`TBT pass: ${tbtPass}/${rows.length} (threshold ${tbtThreshold}ms)`)

if (failed.length > 0) {
  console.error("CWV gate failed on the following routes:")
  for (const row of failed) {
    console.error(`- ${row.route}: LCP=${row.lcp}ms, TBT=${row.tbt}ms`)
  }
  process.exit(1)
}

console.log("CWV gate passed for all routes.")

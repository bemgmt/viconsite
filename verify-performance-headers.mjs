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

const requiredHeaders = ["content-encoding", "cache-control"]

async function checkUrl(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "accept-encoding": "gzip, br",
      "user-agent": "CWV-Audit-Check/1.0",
    },
    redirect: "follow",
  })

  const headerMap = {}
  for (const headerName of requiredHeaders) {
    headerMap[headerName] = response.headers.get(headerName) ?? "missing"
  }

  return {
    url,
    status: response.status,
    ...headerMap,
  }
}

async function main() {
  const results = await Promise.all(urls.map((url) => checkUrl(url)))
  console.table(results)

  const missingCompression = results.filter((row) => row["content-encoding"] === "missing")
  if (missingCompression.length > 0) {
    console.error("Compression header missing on one or more URLs.")
    process.exitCode = 1
    return
  }

  console.log("Compression header present on all checked pages.")
}

main().catch((error) => {
  console.error("Failed to verify headers:", error)
  process.exitCode = 1
})

"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const GA_MEASUREMENT_ID = "G-QZD2YDXD4P"

export default function DeferredGA() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return

    let loaded = false
    const loadAnalytics = () => {
      if (loaded) return
      loaded = true
      setShouldLoad(true)
      window.removeEventListener("pointerdown", loadAnalytics)
      window.removeEventListener("keydown", loadAnalytics)
      window.removeEventListener("scroll", loadAnalytics)
    }

    const idleTimer = window.setTimeout(loadAnalytics, 3500)
    window.addEventListener("pointerdown", loadAnalytics, { passive: true, once: true })
    window.addEventListener("keydown", loadAnalytics, { once: true })
    window.addEventListener("scroll", loadAnalytics, { passive: true, once: true })

    return () => {
      window.clearTimeout(idleTimer)
      window.removeEventListener("pointerdown", loadAnalytics)
      window.removeEventListener("keydown", loadAnalytics)
      window.removeEventListener("scroll", loadAnalytics)
    }
  }, [shouldLoad])

  if (!shouldLoad) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}

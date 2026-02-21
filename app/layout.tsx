import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import DeferredGA from "@/components/deferred-ga"
import { siteUrl, siteUrlObject } from "@/lib/seo/site"
import "./globals.css"

// Optimize font loading with display swap to prevent FOIT
const geist = Geist({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-geist',
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only preload primary font
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: siteUrlObject,
  title: {
    default: "VICON - AI-Powered Fire Protection System",
    template: "%s | VICON Technologies",
  },
  description:
    "Advanced AI-powered fire detection and suppression system. Detect threats, suppress precisely, and protect your home with cutting-edge technology.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)", sizes: "32x32", type: "image/png" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'VICON Technologies',
    title: 'VICON - AI-Powered Fire Protection System',
    description: 'Advanced AI-powered fire detection and suppression system protecting homes and businesses in Southern California. 24/7 monitoring, precision targeting, instant response.',
    url: siteUrl,
    images: [
      {
        url: '/optimized/viconbanner-1920.webp',
        width: 1920,
        height: 1080,
        alt: 'VICON AI-Powered Fire Protection System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VICON - AI-Powered Fire Protection System',
    description: 'Advanced AI-powered fire detection and suppression system protecting homes and businesses in Southern California.',
    images: ['/optimized/viconbanner-1920.webp'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "name": "VICON Technologies",
  "url": siteUrl,
  "description": "AI-powered fire detection and suppression systems protecting homes and businesses in Southern California",
  "publisher": {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "VICON Technologies"
  },
  "inLanguage": "en-US"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        <DeferredGA />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

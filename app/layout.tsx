import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Chatbot } from "@/components/chatbot"
import { CartProvider } from "@/contexts/cart-context"
import CartSidebar from "@/components/cart-sidebar"
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
  title: "VICON - AI-Powered Fire Protection System",
  description:
    "Advanced AI-powered fire detection and suppression system. Detect threats, suppress precisely, and protect your home with cutting-edge technology.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MBRZ43R9');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${geist.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MBRZ43R9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <CartProvider>
          {children}
          <Chatbot />
          <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

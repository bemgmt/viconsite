import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
      <body className={`${geist.className} antialiased`}>
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

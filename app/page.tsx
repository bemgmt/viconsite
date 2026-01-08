import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import WhyVicon from "@/components/why-vicon"
import PricingSection from "@/components/pricing-section"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "VICON - AI-Powered Wildfire Sprinkler System | Fire Protection",
  description: "Protect your home with VICON's AI-powered wildfire sprinkler system and fire suppression technology. 24/7 monitoring, precision targeting, instant response. Serving Southern California. $200/month financing.",
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VICON Technologies",
    "url": "https://vicontech.group",
    "description": "AI-powered fire detection and suppression systems for residential and commercial properties",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-904-945-3280",
      "contactType": "Customer Service"
    }
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "VICON Intelligent Sprinkler System",
    "description": "AI-powered wildfire sprinkler system with precision fire detection and suppression",
    "brand": {
      "@type": "Brand",
      "name": "VICON"
    },
    "offers": {
      "@type": "Offer",
      "price": "18600",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <WhyVicon />
        <PricingSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}

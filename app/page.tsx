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
  alternates: { canonical: '/' },
  openGraph: {
    title: 'VICON - AI-Powered Wildfire Sprinkler System',
    description: 'Protect your home with AI-powered wildfire sprinkler and fire suppression technology. 24/7 monitoring, precision targeting, instant response. $200/month financing.',
    url: '/',
  },
  twitter: {
    title: 'VICON - AI-Powered Wildfire Sprinkler System',
    description: 'Protect your home with AI-powered wildfire sprinkler and fire suppression technology. 24/7 monitoring, precision targeting, instant response.',
  },
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://vicontech.group/#organization",
    "name": "VICON Technologies",
    "legalName": "VICON Technologies",
    "url": "https://vicontech.group",
    "description": "AI-powered fire detection and suppression systems for residential and commercial properties in Southern California",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22515 Aspan Street, Suite F-G",
      "addressLocality": "Lake Forest",
      "addressRegion": "CA",
      "postalCode": "92630",
      "addressCountry": "US"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-904-945-3280",
        "contactType": "Customer Service",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "email": "info@vicontech.group",
        "contactType": "General Inquiry"
      }
    ],
    "areaServed": {
      "@type": "State",
      "name": "California"
    },
    "knowsAbout": [
      "AI Fire Detection",
      "Fire Suppression Systems",
      "Wildfire Protection",
      "Residential Fire Sprinklers",
      "Thermal Imaging",
      "Smart Home Fire Safety"
    ]
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://vicontech.group/#localbusiness",
    "name": "VICON Technologies",
    "description": "AI-powered fire detection and suppression systems protecting homes and businesses in Southern California",
    "url": "https://vicontech.group",
    "telephone": "+1-904-945-3280",
    "email": "info@vicontech.group",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22515 Aspan Street, Suite F-G",
      "addressLocality": "Lake Forest",
      "addressRegion": "CA",
      "postalCode": "92630",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.6469,
      "longitude": -117.6890
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "areaServed": [
      { "@type": "County", "name": "Los Angeles County" },
      { "@type": "County", "name": "Orange County" },
      { "@type": "County", "name": "Riverside County" },
      { "@type": "County", "name": "San Bernardino County" }
    ],
    "priceRange": "$$$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "VICON Fire Protection Products",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "VICON Intelligent Sprinkler System",
            "url": "https://vicontech.group/products/intelligent-sprinkler-system"
          },
          "price": "19600",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Sanctuary Battery System",
            "url": "https://vicontech.group/battery"
          },
          "price": "12800",
          "priceCurrency": "USD"
        }
      ]
    }
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vicontech.group/#product-intelligent-sprinkler",
    "name": "VICON Intelligent Sprinkler System",
    "description": "AI-powered wildfire sprinkler system with thermal imaging fire detection, precision targeting, and automatic high-pressure water suppression. Coverage up to 4,000 sq ft per unit.",
    "brand": {
      "@type": "Brand",
      "name": "VICON"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "VICON Technologies",
      "@id": "https://vicontech.group/#organization"
    },
    "category": "Fire Protection Equipment",
    "offers": {
      "@type": "Offer",
      "price": "19600",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "VICON Technologies"
      }
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is VICON?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VICON is an AI-powered fire detection and suppression system that protects homes and businesses. It uses thermal imaging to detect fires, precision targeting to localize them, and a high-pressure water cannon to suppress them automatically — all within seconds."
        }
      },
      {
        "@type": "Question",
        "name": "How much does VICON cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The VICON Intelligent Sprinkler System is $19,600 (agent pricing: $15,680). Financing is available at $200/month. The Sanctuary Battery System starts at $12,800, water tanks from $3,600, and the Swimming Pool System is $4,200."
        }
      },
      {
        "@type": "Question",
        "name": "Where does VICON operate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VICON Technologies is based in Lake Forest, California and serves Southern California including Los Angeles, Orange, Riverside, and San Bernardino Counties."
        }
      },
      {
        "@type": "Question",
        "name": "How does VICON detect fires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VICON uses AI-powered multi-spectrum sensors including thermal imaging to detect infrared signatures, smoke particles, and flame patterns. The system monitors 24/7 and can detect fire threats within seconds — faster than traditional smoke detectors."
        }
      },
      {
        "@type": "Question",
        "name": "Does VICON work during power outages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. VICON systems are solar-powered and can be paired with the Sanctuary Battery System (14.3 kWh to 60 kWh) to ensure continuous operation during power outages."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

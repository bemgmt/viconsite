import type { Metadata } from "next"
import Script from "next/script"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "VICON Fire Protection System Model 2 - $3,799",
  description: "VICON Fire Protection System Model 2. Advanced fire detection and suppression for residential properties. $3,799. Agent pricing available. Free consultation.",
  alternates: { canonical: '/products/model-2' },
  openGraph: {
    title: 'VICON Fire Protection System Model 2 - $3,799',
    description: 'Advanced fire detection and suppression for residential properties. Intelligent detection, real-time monitoring, weather-resistant design.',
    url: '/products/model-2',
  },
  twitter: {
    title: 'VICON Fire Protection System Model 2 - $3,799',
    description: 'Advanced fire detection and suppression for residential properties with intelligent detection and real-time monitoring.',
  },
}

export default function Model2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vicontech.group/products/model-2#product",
    "name": "VICON Fire Protection System - Model 2",
    "description": "Advanced fire suppression system with intelligent monitoring and real-time detection for comprehensive residential property protection.",
    "url": "https://vicontech.group/products/model-2",
    "brand": { "@type": "Brand", "name": "VICON" },
    "manufacturer": { "@type": "Organization", "name": "VICON Technologies", "@id": "https://vicontech.group/#organization" },
    "category": "Fire Protection Equipment",
    "offers": {
      "@type": "Offer",
      "price": "3799",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "VICON Technologies" }
    }
  }

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Products', url: 'https://vicontech.group/products' },
        { name: 'Model 2', url: 'https://vicontech.group/products/model-2' },
      ]} />
      <Script id="product-schema-model2" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {children}
    </>
  )
}

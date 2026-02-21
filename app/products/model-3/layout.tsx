import type { Metadata } from "next"
import Script from "next/script"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "VICON Fire Protection System Model 3 - $3,299",
  description: "VICON Fire Protection System Model 3. Reliable fire protection solution for your home. $3,299. Agent pricing available. Schedule a free consultation.",
  alternates: { canonical: '/products/model-3' },
  openGraph: {
    title: 'VICON Fire Protection System Model 3 - $3,299',
    description: 'Compact fire suppression for residential and commercial applications. Smart detection, rapid response, energy efficient.',
    url: '/products/model-3',
  },
  twitter: {
    title: 'VICON Fire Protection System Model 3 - $3,299',
    description: 'Compact fire suppression for residential and commercial applications with smart detection technology.',
  },
}

export default function Model3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vicontech.group/products/model-3#product",
    "name": "VICON Fire Protection System - Model 3",
    "description": "Compact fire suppression solution for residential and commercial applications with smart detection technology, rapid response, and energy-efficient design.",
    "url": "https://vicontech.group/products/model-3",
    "brand": { "@type": "Brand", "name": "VICON" },
    "manufacturer": { "@type": "Organization", "name": "VICON Technologies", "@id": "https://vicontech.group/#organization" },
    "category": "Fire Protection Equipment",
    "offers": {
      "@type": "Offer",
      "price": "3299",
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
        { name: 'Model 3', url: 'https://vicontech.group/products/model-3' },
      ]} />
      <Script id="product-schema-model3" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {children}
    </>
  )
}

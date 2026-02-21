import type { Metadata } from "next"
import Script from "next/script"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "VK-240-25-3000 Jet Rod Kit - $4,299 | VICON",
  description: "VK-240-25-3000 Single-Column Jet Rod Kit for VICON fire protection systems. High-performance fire suppression component. $4,299. Agent pricing available.",
  alternates: { canonical: '/products/vk-240' },
  openGraph: {
    title: 'VK-240-25-3000 Jet Rod Kit - $4,299',
    description: 'Wireless remote-controlled fire suppression with stainless steel construction. 500m control range, 1.2 MPA pressure rating.',
    url: '/products/vk-240',
  },
  twitter: {
    title: 'VK-240-25-3000 Jet Rod Kit - $4,299',
    description: 'Wireless remote-controlled fire suppression with stainless steel construction and 500m control range.',
  },
}

export default function VK240Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vicontech.group/products/vk-240#product",
    "name": "VK-240-25-3000 Single-Column Jet Rod Kit",
    "description": "Wireless remote-controlled fire suppression system with stainless steel construction. 500m control range, 1.2 MPA pressure, DN50 interface.",
    "url": "https://vicontech.group/products/vk-240",
    "brand": { "@type": "Brand", "name": "VICON" },
    "manufacturer": { "@type": "Organization", "name": "VICON Technologies", "@id": "https://vicontech.group/#organization" },
    "category": "Fire Protection Equipment",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Control Range", "value": "500m wireless" },
      { "@type": "PropertyValue", "name": "Pressure", "value": "1.2 MPA" },
      { "@type": "PropertyValue", "name": "Material", "value": "Stainless Steel" },
      { "@type": "PropertyValue", "name": "Interface", "value": "DN50 (2 inch)" }
    ],
    "offers": {
      "@type": "Offer",
      "price": "4299",
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
        { name: 'VK-240', url: 'https://vicontech.group/products/vk-240' },
      ]} />
      <Script id="product-schema-vk240" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {children}
    </>
  )
}

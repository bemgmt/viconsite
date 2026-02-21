import type { Metadata } from "next"
import Script from "next/script"
import CommerceShell from "@/components/commerce-shell"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Sanctuary Battery System - 14.3kWh Backup Power | VICON",
  description: "VICON Sanctuary Battery System - 14.3kWh base system, scalable to 60kWh. LiFePO4 technology, grid-interactive, powers fire protection during outages. Starting at $12,800.",
  alternates: { canonical: '/battery' },
  openGraph: {
    title: 'Sanctuary Battery System - 14.3kWh Backup Power',
    description: 'Scalable LiFePO4 battery system from 14.3 to 60 kWh. Grid-interactive 12 kW inverter with 96.5% efficiency. Starting at $12,800.',
    url: '/battery',
  },
  twitter: {
    title: 'Sanctuary Battery System - 14.3kWh Backup Power',
    description: 'Scalable LiFePO4 battery from 14.3 to 60 kWh with grid-interactive inverter. Starting at $12,800.',
  },
}

export default function BatteryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vicontech.group/battery#product",
    "name": "VICON Sanctuary Battery System",
    "description": "14.3 kWh LiFePO4 battery system scalable to 60 kWh. Grid-interactive 12 kW inverter with 96.5% efficiency. Powers fire protection systems during outages.",
    "url": "https://vicontech.group/battery",
    "brand": { "@type": "Brand", "name": "VICON" },
    "manufacturer": { "@type": "Organization", "name": "VICON Technologies", "@id": "https://vicontech.group/#organization" },
    "category": "Battery Backup Systems",
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Capacity", "value": "14.3 kWh (scalable to 60 kWh)" },
      { "@type": "PropertyValue", "name": "Battery Type", "value": "Lithium Iron Phosphate (LiFePO4)" },
      { "@type": "PropertyValue", "name": "Inverter Power", "value": "12 kW continuous / 13.2 kW peak" },
      { "@type": "PropertyValue", "name": "Efficiency", "value": "96.5%" },
      { "@type": "PropertyValue", "name": "Operating Temperature", "value": "-4°F to 131°F" }
    ],
    "offers": {
      "@type": "Offer",
      "price": "12800",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "VICON Technologies" }
    }
  }

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Sanctuary Battery System', url: 'https://vicontech.group/battery' },
      ]} />
      <Script id="product-schema-battery" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <CommerceShell>{children}</CommerceShell>
    </>
  )
}

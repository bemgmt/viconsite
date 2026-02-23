import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "VICON Sprinkler Systems Partner | Design, Install, Test (Title 19)",
  description: "Code-aligned fire sprinkler & standpipe systems by VICON. Design, engineering, installation, and Title 19 / Reg 4 testing support—request a quote.",
  alternates: { canonical: '/products/vicon-sprinkler-systems' },
  openGraph: {
    title: 'VICON Sprinkler Systems Partner | VICON Technologies',
    description: 'Code-aligned fire sprinkler & standpipe systems. Design, engineering, installation, and Title 19 / Reg 4 testing support—request a quote.',
    url: '/products/vicon-sprinkler-systems',
  },
  twitter: {
    title: 'VICON Sprinkler Systems Partner',
    description: 'Code-aligned fire sprinkler & standpipe systems. Design, engineering, installation, and Title 19 / Reg 4 testing support.',
  },
}

export default function ViconSprinklerSystemsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Products', url: 'https://vicontech.group/products' },
        { name: 'VICON Sprinkler Systems', url: 'https://vicontech.group/products/vicon-sprinkler-systems' },
      ]} />
      {children}
    </>
  )
}

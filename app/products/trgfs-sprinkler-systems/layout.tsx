import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "TRGFS Sprinkler Systems Partner | Design, Install, Test (Title 19)",
  description: "Code-aligned fire sprinkler & standpipe systems by TRGFS. Design, engineering, installation, and Title 19 / Reg 4 testing support—request a quote.",
  alternates: { canonical: '/products/trgfs-sprinkler-systems' },
  openGraph: {
    title: 'TRGFS Sprinkler Systems Partner | VICON Technologies',
    description: 'Code-aligned fire sprinkler & standpipe systems. Design, engineering, installation, and Title 19 / Reg 4 testing support—request a quote.',
    url: '/products/trgfs-sprinkler-systems',
  },
  twitter: {
    title: 'TRGFS Sprinkler Systems Partner',
    description: 'Code-aligned fire sprinkler & standpipe systems. Design, engineering, installation, and Title 19 / Reg 4 testing support.',
  },
}

export default function TrgfsSprinklerSystemsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Products', url: 'https://vicontech.group/products' },
        { name: 'TRGFS Sprinkler Systems', url: 'https://vicontech.group/products/trgfs-sprinkler-systems' },
      ]} />
      {children}
    </>
  )
}

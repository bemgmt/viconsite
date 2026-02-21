import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "VICON Intelligent Sprinkler System - Roof Fire Sprinklers | $19,600",
  description: "VICON roof fire sprinkler system with fire suppression technology. Smart cannon nozzle, whole house fire sprinkler system. 82-98ft spray, 35.2 gpm. $19,600. Professional installation.",
  alternates: { canonical: '/products/intelligent-sprinkler-system' },
  openGraph: {
    title: 'VICON Intelligent Sprinkler System - $19,600',
    description: 'AI-powered fire detection and suppression: smart cannon nozzle, jet rod kit, control host, wireless remote. 82-98ft spray, 35.2 gpm. Professional installation included.',
    url: '/products/intelligent-sprinkler-system',
  },
  twitter: {
    title: 'VICON Intelligent Sprinkler System - $19,600',
    description: 'AI-powered fire detection and suppression with 82-98ft spray range, 35.2 gpm flow rate. Professional installation included.',
  },
}

export default function IntelligentSprinklerSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Products', url: 'https://vicontech.group/products' },
        { name: 'Intelligent Sprinkler System', url: 'https://vicontech.group/products/intelligent-sprinkler-system' },
      ]} />
      {children}
    </>
  )
}

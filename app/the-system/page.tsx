import Navigation from "@/components/navigation"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"
import ViconSystem from "@/components/vicon-system"
import SustainableDesign from "@/components/sustainable-design"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON Fire Irrigation System - Exterior Fire Sprinkler Systems",
  description: "Explore VICON's fire irrigation system and exterior fire sprinkler systems. Smart Control Unit, AI Water Cannon, outdoor fire suppression system. Industrial-grade reliability.",
  alternates: { canonical: '/the-system' },
  openGraph: {
    title: 'VICON System Architecture - Smart Control, AI Water Cannon & More',
    description: 'Explore VICON system components: Smart Control Unit, AI Water Cannon, Localization Module, Water Tank, and mobile app control.',
    url: '/the-system',
  },
  twitter: {
    title: 'VICON System Architecture - Smart Control, AI Water Cannon & More',
    description: 'Explore VICON system components: Smart Control Unit, AI Water Cannon, Localization Module, Water Tank, and mobile app.',
  },
}

export default function TheSystemPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'The System', url: 'https://vicontech.group/the-system' },
      ]} />
      <main className="min-h-screen bg-background">
      <Navigation />
      <ViconSystem />
      <SustainableDesign />
      <Footer />
    </main>
    </>
  )
}

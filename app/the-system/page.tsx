import Navigation from "@/components/navigation"
import ViconSystem from "@/components/vicon-system"
import SustainableDesign from "@/components/sustainable-design"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON Fire Irrigation System - Exterior Fire Sprinkler Systems",
  description: "Explore VICON's fire irrigation system and exterior fire sprinkler systems. Smart Control Unit, AI Water Cannon, outdoor fire suppression system. Industrial-grade reliability.",
}

export default function TheSystemPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ViconSystem />
      <SustainableDesign />
      <Footer />
    </main>
  )
}

import Navigation from "@/components/navigation"
import ViconSystem from "@/components/vicon-system"
import SustainableDesign from "@/components/sustainable-design"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON System Components - Smart Control, AI Cannon & More",
  description: "Explore VICON's system components: Smart Control Unit, AI Water Cannon, Localization Module, Water Tanks, and mobile app. Industrial-grade reliability for homeowners.",
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

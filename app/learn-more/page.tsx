import Navigation from "@/components/navigation"
import Environments from "@/components/environments"
import TechnologySection from "@/components/technology-section"
import AppFeatures from "@/components/app-features"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn More About VICON - Technology, Features & Benefits",
  description: "Discover VICON's advanced fire protection technology, app features, and benefits. AI monitoring, solar-powered operation, water-efficient design. Perfect for Southern California homes.",
}

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Environments id="environments" />
      <TechnologySection id="technology" />
      <AppFeatures id="app" />
      <Testimonials />
      <Footer />
    </main>
  )
}

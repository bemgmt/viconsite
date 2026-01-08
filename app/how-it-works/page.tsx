import Navigation from "@/components/navigation"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How VICON Works - AI Fire Detection & Suppression System",
  description: "Learn how VICON's AI-powered fire protection system works. Thermal imaging detection, precision targeting, automatic suppression, and remote monitoring. See the technology in action.",
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HowItWorks />
      <Footer />
    </main>
  )
}

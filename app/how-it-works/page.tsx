import Navigation from "@/components/navigation"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How VICON Works - Fire Sprinkler System Installation Guide",
  description: "Learn how VICON's fire sprinkler system works. Installation process, fire safety sprinkler systems, thermal imaging detection, precision targeting, and automatic suppression.",
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

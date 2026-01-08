import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import WhyVicon from "@/components/why-vicon"
import PricingSection from "@/components/pricing-section"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON - AI-Powered Fire Protection System | Smart Fire Detection & Suppression",
  description: "Protect your home with VICON's AI-powered fire detection and suppression system. 24/7 monitoring, precision targeting, and instant response. Serving Southern California. $200/month financing available.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhyVicon />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}

import Navigation from "@/components/navigation"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How VICON Works - Fire Sprinkler System Installation Guide",
  description: "Learn how VICON's fire sprinkler system works. Installation process, fire safety sprinkler systems, thermal imaging detection, precision targeting, and automatic suppression.",
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How VICON Works - AI Fire Detection & Suppression Process',
    description: 'Learn how VICON detects, localizes, suppresses, and notifies — all in seconds using AI-powered thermal imaging and precision water suppression.',
    url: '/how-it-works',
  },
  twitter: {
    title: 'How VICON Works - AI Fire Detection & Suppression Process',
    description: 'Learn how VICON detects, localizes, suppresses, and notifies — all in seconds using AI-powered thermal imaging.',
  },
}

export default function HowItWorksPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'How It Works', url: 'https://vicontech.group/how-it-works' },
      ]} />
      <main className="min-h-screen bg-background">
      <Navigation />
      <HowItWorks />
      <Footer />
    </main>
    </>
  )
}

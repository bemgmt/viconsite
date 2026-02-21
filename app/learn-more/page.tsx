import Navigation from "@/components/navigation"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"
import Environments from "@/components/environments"
import TechnologySection from "@/components/technology-section"
import AppFeatures from "@/components/app-features"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn More About VICON - Technology, Features & Benefits",
  description: "Discover VICON's advanced fire protection technology, app features, and benefits. AI monitoring, solar-powered operation, water-efficient design. Perfect for Southern California homes.",
  alternates: { canonical: '/learn-more' },
  openGraph: {
    title: 'Learn More About VICON Technology, Features & Benefits',
    description: 'VICON AI fire protection for homes, schools, industrial facilities, and communities. Live camera view, instant alerts, remote control, and cloud-based logs.',
    url: '/learn-more',
  },
  twitter: {
    title: 'Learn More About VICON Technology, Features & Benefits',
    description: 'VICON AI fire protection for homes, schools, industrial facilities, and communities.',
  },
}

export default function LearnMorePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Learn More', url: 'https://vicontech.group/learn-more' },
      ]} />
      <main className="min-h-screen bg-background">
      <Navigation />
      <section className="sr-only">
        <h1>Learn More About VICON - Technology, Features & Benefits</h1>
      </section>
      <Environments id="environments" />
      <TechnologySection id="technology" />
      <AppFeatures id="app" />
      <Testimonials />
      <Footer />
    </main>
    </>
  )
}

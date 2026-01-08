import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"
import { Shield, Home, Droplets, Zap } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "How to Protect Your House from Wildfires - Fireproof Your Home",
  description: "Learn how to protect your house from wildfires and fireproof your home with VICON's wildfire sprinkler system. Expert tips on DIY wildfire sprinkler systems and comprehensive fire protection.",
}

export default function WildfireProtectionPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to protect your house from wildfires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Protect your house from wildfires by installing a professional wildfire sprinkler system, creating defensible space around your property, ensuring water access, and using early detection systems. VICON's AI-powered systems provide 24/7 monitoring and automatic suppression."
        }
      },
      {
        "@type": "Question",
        "name": "How to fireproof your home from wildfires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fireproof your home from wildfires by combining professional fire protection systems with property preparation. This includes clearing flammable vegetation, using fire-resistant materials, installing whole house fire sprinkler systems, and maintaining reliable water sources for fire suppression."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            How to Protect Your House from Wildfires
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive guide to fireproofing your home from wildfires with advanced protection systems and proven strategies
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                Wildfires pose a significant threat to homes in Southern California and across fire-prone regions. 
                Learning how to fireproof your home from wildfires requires a multi-layered approach combining 
                professional fire protection systems with strategic property preparation.
              </p>
            </div>

            {/* Protection Strategies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Shield className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Professional Fire Protection Systems</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Install a comprehensive wildfire sprinkler system like VICON's AI-powered solution. 
                  These systems provide 24/7 monitoring and automatic fire suppression, detecting threats 
                  within seconds and responding with precision targeting.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Home className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Defensible Space</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Create defensible space around your property by clearing flammable vegetation, 
                  maintaining a 30-foot zone free of combustible materials, and using fire-resistant 
                  landscaping materials.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Droplets className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Water Access</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ensure reliable water access for fire suppression. VICON systems include integrated 
                  water tanks, but you should also maintain accessible water sources and consider 
                  professional-grade fire irrigation systems for comprehensive coverage.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Zap className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Early Detection</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced AI-powered detection systems can identify fire threats before they reach 
                  your property. Early warning combined with automatic suppression provides the best 
                  protection for your home and family.
                </p>
              </div>
            </div>

            {/* DIY vs Professional */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                DIY Wildfire Sprinkler System vs. Professional Installation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                While some homeowners consider DIY wildfire sprinkler system installations, professional 
                systems offer superior reliability, advanced AI detection, and comprehensive coverage. 
                VICON's systems are engineered for industrial-grade performance with homeowner ease of use.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Professional installation ensures proper system calibration, optimal coverage, and 
                integration with backup power systems. This is especially critical for whole house 
                fire sprinkler system installations where reliability is paramount.
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Home?</h2>
              <p className="text-xl mb-8 opacity-90">
                Get a free consultation to learn how VICON's wildfire sprinkler system can protect your property
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
                >
                  Schedule Free Consultation
                </Link>
                <Link 
                  href="/products" 
                  className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}

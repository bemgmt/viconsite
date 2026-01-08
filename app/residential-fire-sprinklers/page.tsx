import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"
import { Home, Droplets, Shield, Zap } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Residential Fire Sprinkler Systems | Fire Sprinklers in Homes",
  description: "Residential fire sprinkler systems and fire sprinklers in homes. Learn about home fire suppression systems, whole house fire sprinkler systems, and professional installation.",
}

export default function ResidentialFireSprinklersPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Residential Fire Sprinkler Systems",
    "description": "Complete guide to residential fire sprinkler systems and fire sprinklers in homes",
    "author": {
      "@type": "Organization",
      "name": "VICON Technologies"
    },
    "publisher": {
      "@type": "Organization",
      "name": "VICON Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vicontech.group/logo.png"
      }
    }
  }

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Residential Fire Sprinkler Systems
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Advanced fire sprinklers in homes providing comprehensive protection for your family and property
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
                Residential fire sprinkler systems are becoming essential for modern home protection, especially 
                in fire-prone areas. Fire sprinklers in homes provide early detection and automatic suppression, 
                significantly reducing property damage and saving lives. VICON's home fire suppression system 
                combines AI-powered detection with precision water delivery for superior protection.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Home className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Whole House Protection</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A whole house fire sprinkler system provides comprehensive coverage for your entire property. 
                  VICON systems can be configured to protect multiple zones, ensuring every area of your home 
                  is covered by advanced fire detection and suppression technology.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Droplets className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Automatic Suppression</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Residential fire sprinkler systems activate automatically when fire is detected, providing 
                  immediate response even when you're away. This automatic activation is crucial for preventing 
                  small fires from becoming major disasters.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Shield className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">24/7 Monitoring</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  VICON's residential fire sprinkler system includes AI-powered monitoring that works around 
                  the clock. The system continuously analyzes sensor data to detect fire threats before 
                  they become dangerous, providing peace of mind for homeowners.
                </p>
              </div>

              <div className="bg-card p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Zap className="text-accent" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Insurance Benefits</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Many insurance companies offer significant discounts for homes with residential fire sprinkler 
                  systems. The investment in a home fire suppression system often pays for itself through 
                  reduced insurance premiums and prevented property damage.
                </p>
              </div>
            </div>

            {/* System Features */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Why Choose VICON Residential Fire Sprinkler Systems?
              </h2>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span><strong className="text-foreground">AI-Powered Detection:</strong> Advanced sensors detect fire threats within seconds, faster than traditional systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span><strong className="text-foreground">Precision Targeting:</strong> Water is delivered exactly where needed, minimizing water damage while maximizing suppression</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span><strong className="text-foreground">Remote Monitoring:</strong> Control and monitor your residential fire sprinkler system from anywhere via mobile app</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span><strong className="text-foreground">Backup Power:</strong> Integrated battery systems ensure fire sprinklers in homes continue working during power outages</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span><strong className="text-foreground">Professional Installation:</strong> All systems include expert installation and comprehensive support</span>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Protect Your Home Today</h2>
              <p className="text-xl mb-8 opacity-90">
                Learn more about residential fire sprinkler systems and get a free consultation for your home
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

import Navigation from "@/components/navigation"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"
import Footer from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"
import { Wrench, CheckCircle, Clock, Shield } from "lucide-react"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Fire Sprinkler System Installation Guide | Professional Installation",
  description: "Complete guide to fire sprinkler system installation. Learn about installation of fire sprinkler systems, professional install fire sprinkler system services, and what to expect.",
  alternates: { canonical: '/fire-sprinkler-installation' },
  openGraph: {
    title: 'Fire Sprinkler System Installation Guide',
    description: 'Professional fire sprinkler installation: site assessment, system design, installation, and calibration. Most residential installs completed in 1-2 days.',
    url: '/fire-sprinkler-installation',
  },
  twitter: {
    title: 'Fire Sprinkler System Installation Guide',
    description: 'Professional fire sprinkler installation: site assessment, system design, installation, and calibration.',
  },
}

export default function FireSprinklerInstallationPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Fire Sprinkler System Installation",
    "description": "Professional installation process for fire sprinkler systems",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Site Assessment",
        "text": "Conduct a comprehensive site assessment to determine optimal placement for your fire sprinkler system"
      },
      {
        "@type": "HowToStep",
        "name": "System Design",
        "text": "Design a custom fire sprinkler system layout ensuring complete coverage"
      },
      {
        "@type": "HowToStep",
        "name": "Professional Installation",
        "text": "Install the fire sprinkler system using industry best practices including mounting the AI water cannon and connecting control systems"
      },
      {
        "@type": "HowToStep",
        "name": "System Testing",
        "text": "Test the system, calibrate sensors, and verify water pressure and coverage"
      }
    ]
  }

  return (
    <>
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Fire Sprinkler Installation', url: 'https://vicontech.group/fire-sprinkler-installation' },
      ]} />
      <main className="min-h-screen bg-background">
        <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Fire Sprinkler System Installation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Professional installation of fire sprinkler systems for residential and commercial properties
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
                Proper installation of fire sprinkler systems is critical for ensuring reliable fire protection. 
                Whether you're installing a residential fire sprinkler system or a commercial fire suppression 
                system, professional installation ensures optimal performance and compliance with safety standards.
              </p>
            </div>

            {/* Installation Process */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">Installation Process</h2>
              
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">Site Assessment</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our certified technicians conduct a comprehensive site assessment to determine the optimal 
                        placement for your fire sprinkler system. This includes evaluating property size, water 
                        access, power requirements, and coverage needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">System Design</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Based on the assessment, we design a custom fire sprinkler system layout that ensures 
                        complete coverage. For roof fire sprinkler systems, we calculate optimal nozzle placement 
                        and water pressure requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">Professional Installation</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Our experienced team installs fire sprinkler systems using industry best practices. 
                        This includes mounting the AI water cannon, connecting the control system, installing 
                        water tanks, and setting up the wireless remote control.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">System Testing & Calibration</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        After installation, we thoroughly test the system, calibrate the AI detection sensors, 
                        and verify water pressure and coverage. We also provide training on system operation 
                        and maintenance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <Wrench className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2 text-foreground">Expert Installation</h3>
                <p className="text-muted-foreground">
                  Certified technicians with years of experience in fire sprinkler system installation
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <CheckCircle className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2 text-foreground">Code Compliance</h3>
                <p className="text-muted-foreground">
                  All installations meet or exceed local building codes and fire safety standards
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <Clock className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2 text-foreground">Quick Installation</h3>
                <p className="text-muted-foreground">
                  Most residential installations completed within 1-2 days with minimal disruption
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <Shield className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2 text-foreground">Warranty & Support</h3>
                <p className="text-muted-foreground">
                  Comprehensive warranty coverage and ongoing support for your fire protection system
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Install Your Fire Sprinkler System?</h2>
              <p className="text-xl mb-8 opacity-90">
                Schedule a free consultation to discuss your fire sprinkler installation needs
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

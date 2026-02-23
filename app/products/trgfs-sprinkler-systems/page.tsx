"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import TrgfsQuoteForm from "@/components/trgfs-quote-form"
import Link from "next/link"
import {
  Droplets,
  Shield,
  Building2,
  Home,
  UtensilsCrossed,
  Zap,
  ChevronRight,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function TrgfsSprinklerSystemsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Built to Code. Maintained for Real Life.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            TRGFS designs, engineers, installs, and maintains fire sprinkler and standpipe systems across
            commercial, industrial, and residential buildings—supporting code compliance and long-term reliability.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Title 19 + Reg 4 testing support (jurisdiction-dependent).
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#request-quote"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Request a Sprinkler Quote
            </a>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
            >
              Talk to a VICON Specialist
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            TRGFS Sprinkler Systems (Partner)
          </h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground">
              TRGFS delivers end-to-end sprinkler system delivery: design and engineering, installation, and
              ongoing maintenance—so systems remain aligned with local safety standards and the needs of the
              facility.
            </p>
            <p className="text-lg leading-relaxed text-foreground">
              For VICON customers, this partner capability complements VICON&apos;s always-on, sensor-driven approach
              to threat detection and suppression strategy—helping unify <em>exterior wildfire protection</em> and{" "}
              <em>interior code-based building fire protection</em> into one plan.
            </p>
          </div>
        </div>
      </section>

      {/* Systems and Configurations */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Systems & Configurations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Droplets className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Standpipe Systems</h3>
              <p className="text-muted-foreground">
                Class I/II/III standpipe systems, underground and overhead piping distribution, and fire hoses
                and valves for firefighter and occupant use.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Pre-Action & Deluge</h3>
              <p className="text-muted-foreground">
                Pre-action and deluge systems for high-risk and sensitive areas—supplemental detection and
                rapid area-wide discharge when needed.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Special Hazard & Chemical</h3>
              <p className="text-muted-foreground">
                Special hazard approaches and wet/dry chemical suppression for restaurant kitchens and
                industrial processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and Testing */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Compliance & Testing
          </h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground">
              TRGFS offers alarm and sprinkler testing aligned to Title 19 and Regulation 4, with quarterly
              and annual inspections to verify system function and maintain compliance.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Compliance is defined by the Authority Having Jurisdiction (AHJ): California Title 19 ties
              water-based system ITM frequencies to NFPA 25 requirements, and local authorities may require
              additional procedures or more frequent work. For Los Angeles properties, Chief&apos;s Regulation 4
              guidance is administered through the LAFD program and includes published testing frequencies.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Delivery Process
          </h2>
          <p className="text-lg text-center text-muted-foreground mb-12">
            A sprinkler project succeeds twice: once at installation, and again every year it stays ready.
            TRGFS&apos;s scope spans new construction, tenant improvements, upgrades, inspections, and emergency
            repairs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["Assess", "Design / Engineer", "Install", "Test / Commission", "Inspect / Maintain"].map(
              (step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="bg-card px-4 py-2 rounded-lg border border-border font-medium text-foreground">
                    {step}
                  </span>
                  {i < 4 && (
                    <ChevronRight className="text-muted-foreground hidden md:inline" size={20} />
                  )}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Building2 className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Commercial & Industrial</h3>
              <p className="text-muted-foreground">
                Protection for warehouses, offices, and industrial facilities. Reliable sprinkler systems
                meeting local safety codes with 24/7 coverage.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Home className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Residential</h3>
              <p className="text-muted-foreground">
                Customized designs for homes aligned to local code. Add-ons for larger/multi-unit properties
                and higher-risk spaces (kitchens, garages, workshops).
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <UtensilsCrossed className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Restaurants & High-Risk</h3>
              <p className="text-muted-foreground">
                Wet/dry chemical suppression for commercial kitchens and industrial processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Partner Ecosystem
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            TRGFS works with leading fire protection manufacturers and distributors to deliver quality
            systems. VICON customers gain a trusted partner for interior code-based fire protection that
            complements our exterior AI-powered wildfire systems.
          </p>
        </div>
      </section>

      {/* Resources / FAQ */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6 text-foreground">
            Technical Resources
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Checklists, sample reports, and compliance guides will be available here. Contact us for
            technical support and evaluation resources.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-left">What is Title 19 testing?</AccordionTrigger>
              <AccordionContent>
                California Title 19 references NFPA 25-based frequencies for water-based fire protection
                systems. TRGFS offers testing aligned to these requirements; local authorities may require
                additional procedures or more frequent work.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-left">What is Regulation 4?</AccordionTrigger>
              <AccordionContent>
                For Los Angeles properties, Chief&apos;s Regulation 4 is administered through the LAFD program
                and includes published testing frequencies. Pre-action, deluge, and dry pipe systems are
                tested annually under Reg 4.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-left">What system types does TRGFS support?</AccordionTrigger>
              <AccordionContent>
                TRGFS supports Class I/II/III standpipe systems, pre-action and deluge systems, underground
                and overhead piping, special hazard protection, and wet/dry chemical suppression for
                restaurants and industrial applications.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Cross-Sell Links */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
            Complete Your Fire Protection Strategy
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/how-it-works"
              className="text-accent hover:underline font-medium"
            >
              How It Works — Pair interior code compliance with exterior AI monitoring
            </Link>
            <span className="text-muted-foreground hidden md:inline">|</span>
            <Link href="/the-system" className="text-accent hover:underline font-medium">
              The System — Smarter, water-efficient exterior suppression
            </Link>
            <span className="text-muted-foreground hidden md:inline">|</span>
            <Link href="/products" className="text-accent hover:underline font-medium">
              Products — Explore complete packages
            </Link>
            <span className="text-muted-foreground hidden md:inline">|</span>
            <Link href="/battery" className="text-accent hover:underline font-medium">
              Sanctuary Battery — Backup power for protection continuity
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA / Quote Form */}
      <section id="request-quote" className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-6">
            Ready to Scope Your Sprinkler Project?
          </h2>
          <p className="text-xl text-center mb-10 opacity-90">
            Tell us what you&apos;re building (or maintaining). We&apos;ll route your request to the right
            specialist, align on jurisdictional requirements (Title 19 / Reg 4 where applicable), and map a
            compliant path from design to testing and maintenance.
          </p>
          <div className="bg-card rounded-lg p-8 border border-border">
            <TrgfsQuoteForm />
          </div>
          <p className="text-center mt-6 text-sm opacity-80">
            Or{" "}
            <Link href="/contact" className="text-accent hover:underline font-medium">
              Schedule Free Consultation
            </Link>{" "}
            for general VICON services.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

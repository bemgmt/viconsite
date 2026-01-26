"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function PurilyRoboticPoolCleanerPage() {
  const { addToCart } = useCart()

  const product = {
    id: "purily-robotic-pool-cleaner",
    name: "VICON Intelligent Robotic Pool & Water Cleaning System",
    price: 1498,
    image: "/purilyrobotcleaner.png",
  }

  const hasPricing = product.price > 0

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                VICON Intelligent Robotic Pool & Water Cleaning System
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Autonomous water maintenance for modern properties. VICON delivers hands-free pool and water-surface
                cleaning with intelligent path-planning, smart app control, and high-efficiency filtration.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Robot Size</p>
                  <p className="text-3xl font-bold text-accent">20 × 17 × 10 in</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Runtime</p>
                  <p className="text-3xl font-bold text-accent">2-3.5 hrs</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Pricing</p>
                  <p className="text-3xl font-bold text-primary">$1,498</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {hasPricing ? (
                  <button
                    onClick={handleAddToCart}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                ) : (
                  <Link
                    href="/contact"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    Request Pricing
                  </Link>
                )}
                <Link href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg">
                  Schedule Free Consultation
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl border border-border bg-black/5">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/vgKGQ-ywmco"
                  title="VICON Intelligent Robotic Pool Cleaner video"
                  className="h-full w-full rounded-lg"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose VICON?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Autonomous Cleaning</h3>
              <p className="text-muted-foreground">
                Intelligent path-planning adapts to pool shape and layout, reducing missed areas and improving efficiency over time.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Smart App Control</h3>
              <p className="text-muted-foreground">
                Bluetooth + Wi-Fi control with OTA updates. Start, schedule, or target areas from anywhere without wired controls.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">💧</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Year-Round Value</h3>
              <p className="text-muted-foreground">
                Keeps water features clean every day while complementing VICON’s wildfire defense for a complete exterior solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Key Features
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Dual Cleaning Modes</h4>
              <p className="text-muted-foreground">Automatic mode for hands-free operation and manual mode via app or remote for targeted cleaning.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ High-Efficiency Suction</h4>
              <p className="text-muted-foreground">Powerful pump system with a 4L internal filter box captures leaves, sand, and fine particles.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Full Surface Coverage</h4>
              <p className="text-muted-foreground">Cleans floors, walls, and waterlines with intelligent navigation for maximum coverage.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ OTA Software Updates</h4>
              <p className="text-muted-foreground">Continuous feature enhancements delivered through the mobile app without hardware changes.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Wireless Smart Control</h4>
              <p className="text-muted-foreground">Bluetooth + Wi-Fi connectivity with optional buoy for stable communication.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ IPX8 Waterproof</h4>
              <p className="text-muted-foreground">Fully submersible design built for reliable operation in all pool environments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Robot Size</h4>
              <p className="text-muted-foreground">20 × 17 × 10 in</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Weight</h4>
              <p className="text-muted-foreground">32 lbs</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Pumping Rate</h4>
              <p className="text-muted-foreground">21,000 L/hour</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Moving Speed</h4>
              <p className="text-muted-foreground">13 meters/minute</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Battery</h4>
              <p className="text-muted-foreground">9,000 mAh lithium</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Runtime</h4>
              <p className="text-muted-foreground">2-3.5 hours per charge</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Charging Time</h4>
              <p className="text-muted-foreground">~3.5 hours</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Filter Box</h4>
              <p className="text-muted-foreground">4 liters</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Waterproof Rating</h4>
              <p className="text-muted-foreground">IPX8 (fully submersible)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Ecosystem */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Ideal Use Cases & VICON Ecosystem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Residential & HOA Properties</h3>
              <p className="text-muted-foreground">
                Hands-free pool maintenance, predictable cleaning cycles, and reduced service calls across multiple properties.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Hospitality & Municipal Facilities</h3>
              <p className="text-muted-foreground">
                Always-clean presentation with quiet operation and durable design for frequent, year-round use.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Complete Exterior Safety & Maintenance</h3>
              <p className="text-muted-foreground">
                The VICON Robotic Pool Cleaner extends VICON’s wildfire defense with daily water hygiene and automated maintenance, creating a unified
                protection story across fire defense, energy resilience, and water cleanliness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Automate Water Maintenance?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a custom quote for VICON and bundle it with your VICON fire protection system for a complete exterior solution.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" href="/contact">
              Request Pricing
            </Link>
            <Link className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105" href="/contact">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

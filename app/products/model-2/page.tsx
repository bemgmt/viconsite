"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function Model2Page() {
  const { addToCart } = useCart()

  const product = {
    id: "vk-product-2",
    name: "VICON Fire Protection System - Model 2",
    price: 3799,
    image: "/inground3.jpg",
  }

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
                VICON Fire Protection System - Model 2
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Advanced fire suppression system with intelligent monitoring for comprehensive property protection.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Detection</p>
                  <p className="text-2xl font-bold text-accent">Intelligent</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Monitoring</p>
                  <p className="text-2xl font-bold text-accent">Real-Time</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">$37.99</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <Link href="/contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg">
                  Schedule Free Consultation
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg cursor-pointer group/img">
              <img
                src="/inground3.jpg"
                alt="VICON Fire Protection System - Model 2"
                className="rounded-lg shadow-2xl w-full transition-transform duration-500 group-hover/img:scale-150"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Model 2?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Intelligent Detection</h3>
              <p className="text-muted-foreground">
                Advanced fire detection technology that identifies threats early and responds automatically to protect your property.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">
                Continuous monitoring with instant alerts and status updates, keeping you informed 24/7 about your system's health.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🌦️</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Weather-Resistant</h3>
              <p className="text-muted-foreground">
                Designed to withstand harsh weather conditions, ensuring reliable protection year-round in any climate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Intelligent Fire Detection</h4>
              <p className="text-muted-foreground">Advanced sensors detect fire threats early for rapid response</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Automatic Suppression Activation</h4>
              <p className="text-muted-foreground">System activates automatically when fire is detected</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Real-Time Monitoring</h4>
              <p className="text-muted-foreground">24/7 system monitoring with instant status updates</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Remote Control Capability</h4>
              <p className="text-muted-foreground">Control and monitor your system from anywhere</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Weather-Resistant Design</h4>
              <p className="text-muted-foreground">Built to withstand extreme weather conditions</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Professional Installation Included</h4>
              <p className="text-muted-foreground">Expert installation and setup by certified technicians</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Upgrade Your Fire Protection?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a custom quote for your Model 2 installation. Our experts will help you determine the perfect configuration for your property.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Get a Quote
            </button>
            <button className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"

export default function Model3Page() {
  const { addToCart } = useCart()

  const product = {
    id: "vk-product-3",
    name: "VICON Fire Protection System - Model 3",
    price: 3299,
    image: "/dualconsole1.jpg",
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
                VICON Fire Protection System - Model 3
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Compact fire suppression solution designed for both residential and commercial applications with smart detection technology.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Design</p>
                  <p className="text-2xl font-bold text-accent">Compact</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Response</p>
                  <p className="text-2xl font-bold text-accent">Rapid</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">$32.99</p>
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
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg">
                  Schedule Free Consultation
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/dualconsole1.jpg"
                alt="VICON Fire Protection System - Model 3"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Why Choose Model 3?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Compact Design</h3>
              <p className="text-muted-foreground">
                Space-efficient design that fits seamlessly into any property without compromising on protection capabilities.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Rapid Response</h3>
              <p className="text-muted-foreground">
                Quick activation system ensures immediate response to fire threats, minimizing potential damage to your property.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">💚</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Energy Efficient</h3>
              <p className="text-muted-foreground">
                Low power consumption design reduces operating costs while maintaining peak performance and reliability.
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
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Compact Design</h4>
              <p className="text-muted-foreground">Space-saving solution perfect for any property size</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Easy Installation</h4>
              <p className="text-muted-foreground">Quick and straightforward installation process</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Smart Detection Technology</h4>
              <p className="text-muted-foreground">Advanced sensors for accurate fire detection</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Rapid Response System</h4>
              <p className="text-muted-foreground">Immediate activation when threats are detected</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Low Maintenance</h4>
              <p className="text-muted-foreground">Minimal upkeep required for long-term operation</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-3 text-xl">✓ Energy Efficient</h4>
              <p className="text-muted-foreground">Optimized power consumption for cost savings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Compact Protection?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a custom quote for your Model 3 installation. Our experts will help you determine the perfect setup for your space.
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


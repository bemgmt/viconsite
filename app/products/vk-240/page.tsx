"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function VK240Page() {
  const { addToCart } = useCart()

  const product = {
    id: "vk-240",
    name: "VK-240-25-3000 Single-Column Jet Rod Kit",
    price: 4299,
    image: "/nozzle2.jpg",
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
                VK-240-25-3000 Single-Column Jet Rod Kit
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Wireless remote-controlled fire suppression system with stainless steel construction for professional fire protection.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Control Range</p>
                  <p className="text-3xl font-bold text-accent">500m</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Pressure</p>
                  <p className="text-3xl font-bold text-accent">1.2 MPA</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">$42.99</p>
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
                src="/nozzle2.jpg"
                alt="VK-240-25-3000 Single-Column Jet Rod Kit"
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
            Why Choose VK-240?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">📡</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Wireless Control</h3>
              <p className="text-muted-foreground">
                Remote control capability up to 500 meters, allowing safe operation from a distance during fire emergencies.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🔩</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Stainless Steel</h3>
              <p className="text-muted-foreground">
                Durable stainless steel construction ensures long-lasting performance in harsh environmental conditions.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Professional Grade</h3>
              <p className="text-muted-foreground">
                DN50-DN80 flange compatibility with 1.2 MPA pressure rating for professional fire suppression applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Technical Specifications
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Voltage</h4>
              <p className="text-muted-foreground">24V</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Control Range</h4>
              <p className="text-muted-foreground">Wireless (500m)</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Material</h4>
              <p className="text-muted-foreground">Stainless Steel</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Pressure</h4>
              <p className="text-muted-foreground">1.2 MPA</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Interface</h4>
              <p className="text-muted-foreground">DN50 (2 inch)</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Size</h4>
              <p className="text-muted-foreground">3000×100mm</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Property?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a custom quote for your VK-240 installation. Our experts will help you determine the perfect setup for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Get a Quote
            </Link>
            <Link href="/contact" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


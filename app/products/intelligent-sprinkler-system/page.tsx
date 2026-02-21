"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

export default function IntelligentSprinklerSystemPage() {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState("/nozzle2 (2).jpg")

  const product = {
    id: "intelligent-sprinkler-system",
    name: "VICON Intelligent Sprinkler System",
    price: 19600,
    image: "/nozzle2 (2).jpg",
  }

  const galleryImages = [
    { src: "/nozzle2 (2).jpg", alt: "VICON Smart Cannon Nozzle" },
    { src: "/cannontall (2).jpg", alt: "AI Water Cannon" },
    { src: "/cannon1.jpg", alt: "Nozzle Detail View" },
    { src: "/nozzle1 (2).jpg", alt: "Jet Rod Kit Installation" },
  ]

  const handleAddToCart = () => {
    addToCart(product)
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://vicontech.group/products/intelligent-sprinkler-system#product",
    "name": "VICON Intelligent Sprinkler System",
    "description": "Complete intelligent fire suppression system with smart cannon nozzle, jet rod kit, control host, and wireless remote-control. AI-powered fire detection with thermal imaging, 82-98ft spray distance, 35.2 gpm flow rate, 10 HP motor.",
    "url": "https://vicontech.group/products/intelligent-sprinkler-system",
    "image": "https://vicontech.group/nozzle2 (2).jpg",
    "brand": {
      "@type": "Brand",
      "name": "VICON"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "VICON Technologies",
      "@id": "https://vicontech.group/#organization"
    },
    "category": "Fire Protection Equipment",
    "offers": {
      "@type": "Offer",
      "price": "19600",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": "VICON Technologies" },
      "priceValidUntil": "2027-12-31"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Spray Distance", "value": "82-98 ft" },
      { "@type": "PropertyValue", "name": "Flow Rate", "value": "35.2 gpm" },
      { "@type": "PropertyValue", "name": "Power", "value": "10 HP" },
      { "@type": "PropertyValue", "name": "Voltage", "value": "220 V" },
      { "@type": "PropertyValue", "name": "Pressure", "value": "145 psi" },
      { "@type": "PropertyValue", "name": "Coverage", "value": "Up to 4,000 sq ft" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    }
  }

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <main className="min-h-screen bg-background">
        <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                VICON Intelligent Sprinkler System
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Complete intelligent fire suppression system with smart cannon nozzle, jet rod kit, control host, and wireless remote-control.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Spray Distance</p>
                  <p className="text-3xl font-bold text-accent">82-98 ft</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Flow Rate</p>
                  <p className="text-3xl font-bold text-accent">35.2 gpm</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-3xl font-bold text-primary">$19,600</p>
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
            
            {/* Image Gallery */}
            <div>
              <div className="relative overflow-hidden rounded-lg cursor-pointer group/img mb-4">
                <img
                  src={selectedImage}
                  alt="VICON Intelligent Sprinkler System"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover transition-transform duration-500 group-hover/img:scale-110"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.src)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === image.src
                        ? "border-accent shadow-lg scale-105"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Complete System Includes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">VICON Smart Cannon Nozzle</h3>
              <p className="text-muted-foreground mb-4">
                Precision targeting with adaptive spray patterns for maximum fire suppression efficiency.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Dimensions: 3.5 in × 17.4 in × 9.3 in</li>
                <li>• Working Pressure: 203 psi</li>
                <li>• Spray Distance: 82-98 ft</li>
                <li>• Material: Aluminum alloy + stainless steel</li>
                <li>• Weight: 37.5 lb</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">VICON Single-Column Jet Rod Kit</h3>
              <p className="text-muted-foreground mb-4">
                High-pressure delivery system with stainless steel construction for durability.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Dimensions: 9.8 ft × 3.9 in</li>
                <li>• Pressure: 174 psi</li>
                <li>• Interface: DN50 (2 in)</li>
                <li>• Material: Stainless Steel</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🖥️</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Intelligent Spray System Control Host</h3>
              <p className="text-muted-foreground mb-4">
                AI-powered control system managing all components with real-time monitoring.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Dimensions: 25.6 in × 25.2 in × 50.6 in</li>
                <li>• Flow: 35.2 gpm</li>
                <li>• Head: 361 ft</li>
                <li>• Power: 10 HP</li>
                <li>• Voltage: 220 V</li>
                <li>• Pressure: 145 psi</li>
                <li>• Current: 21.3 A</li>
                <li>• Speed: 3480 RPM</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">📡</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Wireless Remote-Control</h3>
              <p className="text-muted-foreground mb-4">
                Long-range wireless control for manual operation and system management.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Size: 3.6 in × 1.0 in</li>
                <li>• Signal Distance: 1,640 ft</li>
                <li>• Voltage: 24 V</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">🔌</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Quick-Connect Piping</h3>
              <p className="text-muted-foreground mb-4">
                Stainless-steel quick-connect inlet/outlet piping for easy installation and maintenance.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:border-accent transition-all">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Power Supply System</h3>
              <p className="text-muted-foreground mb-4">
                Complete power supply system ensuring reliable operation during emergencies.
              </p>
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
              <h4 className="font-semibold text-foreground mb-2">Spray Distance</h4>
              <p className="text-muted-foreground">82-98 ft</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Flow Rate</h4>
              <p className="text-muted-foreground">35.2 gpm</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Power</h4>
              <p className="text-muted-foreground">10 HP</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Voltage</h4>
              <p className="text-muted-foreground">220 V</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Pressure</h4>
              <p className="text-muted-foreground">145 psi</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-2">Head</h4>
              <p className="text-muted-foreground">361 ft</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Protect Your Property?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a custom quote for your VICON Intelligent Sprinkler System installation. Our experts will help you determine the perfect configuration for your needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart - $19,600
            </button>
            <Link href="/contact" className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105">
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}



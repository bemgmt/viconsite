"use client"

import { useState } from "react"
import ProductShowcase from "@/components/product-showcase"
import PackageSelector from "@/components/PackageSelector"
import { products } from "@/lib/products"
import Link from "next/link"

export default function ProductsContent() {
  const [showSelector, setShowSelector] = useState(false)

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">VICON Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional fire protection systems engineered for Southern California homes and businesses. All products
            include professional installation and comprehensive support.
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6" />
        </div>

        {/* Package Selector Toggle Button */}
        <div className="mb-12 text-center">
          <button
            onClick={() => setShowSelector(!showSelector)}
            className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {showSelector ? "Hide Package Selector" : "🎯 Find Your Perfect Package"}
          </button>
        </div>

        {/* Package Selector Component */}
        {showSelector && (
          <div className="mb-16 animate-fade-up">
            <PackageSelector />
          </div>
        )}

        {/* Horizontal scrolling carousel on mobile, grid on desktop */}
        <ProductShowcase products={products} />

        <div className="bg-primary text-primary-foreground p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation with our VICON experts to determine the perfect fire protection system for
            your property.
          </p>
          <Link href="/contact" className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-3 rounded-lg font-bold transition-colors">
            Schedule Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}


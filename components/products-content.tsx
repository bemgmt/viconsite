"use client"

import { useState } from "react"
import ProductShowcase from "@/components/product-showcase"
import PackageSelector from "@/components/PackageSelector"
import { products } from "@/lib/products"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ProductsContent() {
  const [showAllProducts, setShowAllProducts] = useState(false)

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

        {/* Package Selector - Main Focus */}
        <div className="mb-16 animate-fade-up">
          <PackageSelector />
        </div>

        {/* All Products Toggle Button */}
        <div className="mb-12 text-center">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="bg-card border-2 border-border hover:border-accent text-foreground px-10 py-4 rounded-lg font-bold text-lg transition-all hover:bg-accent/5 shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            {showAllProducts ? (
              <>
                Hide All Products <ChevronUp size={20} />
              </>
            ) : (
              <>
                View All Products <ChevronDown size={20} />
              </>
            )}
          </button>
        </div>

        {/* All Products - Collapsible */}
        {showAllProducts && (
          <div className="mb-16 animate-fade-up">
            <ProductShowcase products={products} />
          </div>
        )}

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


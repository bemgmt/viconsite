"use client"

import { useState } from "react"
import type { Product } from "@/lib/products"
import { ShoppingCart, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  price: number
  isAgent?: boolean
}

export default function ProductCard({ product, price, isAgent = false }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { addToCart } = useCart()
  const isPriceTbd = price <= 0

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      image: product.image,
    })
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 border border-border/60 hover:border-accent/60 perspective-1000">
      <div className="relative overflow-hidden bg-muted h-64 group-hover:h-72 transition-all duration-500">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {isAgent && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
            Agent Pricing
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>

        <ul className="space-y-2 mb-4">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Expandable section for additional features */}
        {product.features.length > 3 && (
          <div className="mb-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <span>{isExpanded ? "Show less" : `+${product.features.length - 3} more features`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
              <ul className="space-y-2">
                {product.features.slice(3).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="bg-muted/50 p-3 rounded mb-6 border border-border/50 group-hover:border-accent/30 transition-colors">
          <p className="text-xs text-muted-foreground mb-1">Specifications</p>
          <p className="text-xs text-foreground">{product.specs}</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price</p>
            <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform inline-block">
              {isPriceTbd ? "Contact for pricing" : `$${price.toLocaleString()}`}
            </p>
          </div>
          {isAgent && product.agentPrice < product.price && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground line-through">${product.price.toLocaleString()}</p>
              <p className="text-sm font-semibold text-green-600 animate-pulse">Save 20%</p>
            </div>
          )}
        </div>

        {isPriceTbd ? (
          <Link
            href="/contact"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group/btn"
          >
            <span className="group-hover/btn:translate-x-1 transition-transform inline-block">Request Pricing</span>
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group/btn"
          >
            <ShoppingCart size={20} className="group-hover/btn:animate-bounce" />
            <span className="group-hover/btn:translate-x-1 transition-transform inline-block">Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  )
}

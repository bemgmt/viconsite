"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function NavCartButton() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative hover:text-accent transition-all hover:scale-110 group"
      aria-label="Open shopping cart"
    >
      <ShoppingCart size={20} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold group-hover:animate-bounce">
          {totalItems}
        </span>
      )}
    </button>
  )
}

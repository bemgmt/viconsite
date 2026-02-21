"use client"

import type React from "react"
import dynamic from "next/dynamic"

import { CartProvider } from "@/contexts/cart-context"

const Chatbot = dynamic(() => import("@/components/chatbot").then((mod) => mod.Chatbot), {
  ssr: false,
})

const CartSidebar = dynamic(() => import("@/components/cart-sidebar"), {
  ssr: false,
})

export default function CommerceShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Chatbot />
      <CartSidebar />
    </CartProvider>
  )
}

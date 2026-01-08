"use client"

import { useEffect, useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import type { Stripe as StripeClient } from "@stripe/stripe-js"
import { getStripe } from "@/lib/stripe"
import { useCart } from "@/contexts/cart-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CheckoutForm from "@/components/checkout-form"
import { ShoppingBag, Lock } from "lucide-react"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice } = useCart()
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [stripeInitialized, setStripeInitialized] = useState(false)

  // Memoize stripe promise to avoid recreating it
  const stripePromise = useMemo(() => {
    if (stripeInitialized) {
      return getStripe()
    }
    return null
  }, [stripeInitialized])

  // Optimize: Combine and optimize useEffect hooks to reduce blocking time
  useEffect(() => {
    // Redirect if cart is empty (non-blocking check)
    if (items.length === 0) {
      router.push("/")
      return
    }

    // Initialize Stripe and create payment intent in parallel where possible
    const initializeCheckout = async () => {
      try {
        // Initialize Stripe first
        const stripe = await getStripe()
        await stripe
        setStripeInitialized(true)

        // Create payment intent after Stripe is ready
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            customerInfo: {
              name: "",
              email: "",
              phone: "",
            },
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create payment intent")
        }

        const data = await response.json()
        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error("Error:", err)
        setError(
          err instanceof Error 
            ? err.message 
            : "Failed to initialize checkout. Please try again."
        )
      } finally {
        setLoading(false)
      }
    }

    initializeCheckout()
  }, [items, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Preparing checkout...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-destructive mb-4">{error}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Secure Checkout</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Lock size={16} />
              <p className="text-sm">Your payment information is secure and encrypted</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          quality={75}
                          sizes="64px"
                          className="object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {clientSecret && stripePromise ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#0066cc",
                      },
                    },
                  }}
                >
                  <CheckoutForm />
                </Elements>
              ) : (
                !loading && (
                  <div className="bg-card border border-border rounded-lg p-6">
                    <p className="text-destructive">
                      Unable to load payment form. Please refresh the page or contact support if the problem persists.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


// This must be the first import to prevent client-side bundling
import "server-only"

// Additional runtime check as a safety measure - this runs at module evaluation
if (typeof window !== "undefined") {
  throw new Error(
    "stripe-server.ts cannot be imported in client components. " +
    "This module is server-only and should only be used in API routes."
  )
}

import Stripe from "stripe"

// Lazy initialization singleton pattern
let stripeInstance: Stripe | null = null

function getStripeInstance(): Stripe {
  if (stripeInstance) {
    return stripeInstance
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  if (!stripeSecretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not defined in environment variables. " +
      "Please check your environment variables and ensure it's set in Vercel (for production) or .env.local (for development)."
    )
  }

  stripeInstance = new Stripe(stripeSecretKey, {
    apiVersion: "2024-12-18.acacia",
    typescript: true,
  })

  return stripeInstance
}

// Export stripe instance - initialization happens lazily via Proxy
// The Proxy ensures getStripeInstance() is only called when properties are accessed
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const instance = getStripeInstance()
    const value = instance[prop as keyof Stripe]
    if (typeof value === "function") {
      return value.bind(instance)
    }
    return value
  },
})

// Helper function to format amount for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}

// Helper function to format amount for display
export const formatAmountForDisplay = (amount: number): string => {
  return (amount / 100).toFixed(2)
}


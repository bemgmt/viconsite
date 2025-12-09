import Stripe from "stripe"
import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js"

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

// Client-side Stripe instance
let stripePromise: Promise<StripeClient | null>

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      // Return a rejected promise with a descriptive error
      stripePromise = Promise.reject(
        new Error("Stripe publishable key is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment variables.")
      ) as Promise<StripeClient | null>
    } else {
      stripePromise = loadStripe(publishableKey)
    }
  }
  return stripePromise
}

// Helper function to format amount for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}

// Helper function to format amount for display
export const formatAmountForDisplay = (amount: number): string => {
  return (amount / 100).toFixed(2)
}


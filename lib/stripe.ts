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
    
    // Debug logging for both development and production
    if (typeof window !== 'undefined') {
      console.log('[Stripe Debug] Publishable Key Status:', {
        exists: !!publishableKey,
        length: publishableKey?.length || 0,
        startsWith: publishableKey?.substring(0, 7) || 'N/A',
        isUndefined: publishableKey === undefined,
        isEmpty: publishableKey === '',
        trimmedEmpty: publishableKey?.trim() === ''
      })
    }
    
    if (!publishableKey || publishableKey.trim() === '') {
      // Return a rejected promise with a descriptive error
      const errorMessage = process.env.NODE_ENV === 'production'
        ? "Stripe payment system is not configured. Please contact support."
        : "Stripe publishable key is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in your environment variables and redeploy."
      
      console.error('[Stripe Error]', errorMessage, {
        keyExists: !!publishableKey,
        keyValue: publishableKey
      })
      
      stripePromise = Promise.reject(
        new Error(errorMessage)
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


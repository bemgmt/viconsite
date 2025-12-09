import Stripe from "stripe"
import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js"

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

// Client-side Stripe instance
let stripePromise: Promise<StripeClient | null>

export const getStripe = async (): Promise<StripeClient | null> => {
  if (!stripePromise) {
    // Try to get key from environment variable first (build-time)
    let publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    // If not available, fetch from API (runtime fallback)
    if (!publishableKey || publishableKey.trim() === '') {
      try {
        const response = await fetch('/api/stripe-config')
        if (response.ok) {
          const data = await response.json()
          publishableKey = data.publishableKey
        }
      } catch (err) {
        console.error('[Stripe] Failed to fetch publishable key from API:', err)
      }
    }
    
    // Debug logging
    if (typeof window !== 'undefined') {
      console.log('[Stripe Debug] Publishable Key Status:', {
        exists: !!publishableKey,
        length: publishableKey?.length || 0,
        startsWith: publishableKey?.substring(0, 7) || 'N/A',
        source: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'env' : 'api'
      })
    }
    
    if (!publishableKey || publishableKey.trim() === '') {
      // Return a rejected promise with a descriptive error
      const errorMessage = "Stripe payment system is not configured. Please contact support."
      
      console.error('[Stripe Error]', errorMessage, {
        keyExists: !!publishableKey
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


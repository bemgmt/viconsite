import Stripe from "stripe"
import { loadStripe, Stripe as StripeClient } from "@stripe/stripe-js"

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

// Client-side Stripe instance
let stripePromise: Promise<StripeClient | null> | null = null

export const getStripe = async (): Promise<StripeClient | null> => {
  // If already initialized, return the existing promise
  if (stripePromise) {
    return stripePromise
  }

  // Try to get key from environment variable first (build-time)
  let publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  console.log('[Stripe] Step 1 - Checking env var:', {
    exists: !!publishableKey,
    length: publishableKey?.length || 0,
    value: publishableKey?.substring(0, 15) + '...' || 'undefined'
  })
  
  // If not available, fetch from API (runtime fallback)
  if (!publishableKey || publishableKey.trim() === '') {
    console.log('[Stripe] Step 2 - Env var not found, fetching from API...')
    try {
      const apiUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/api/stripe-config`
        : '/api/stripe-config'
      
      console.log('[Stripe] Fetching from:', apiUrl)
      const response = await fetch(apiUrl)
      
      console.log('[Stripe] API Response status:', response.status, response.ok)
      
      if (response.ok) {
        const data = await response.json()
        console.log('[Stripe] API Response data:', {
          hasKey: !!data.publishableKey,
          keyLength: data.publishableKey?.length || 0
        })
        publishableKey = data.publishableKey
      } else {
        const errorText = await response.text()
        console.error('[Stripe] API Error:', response.status, errorText)
      }
    } catch (err) {
      console.error('[Stripe] Failed to fetch publishable key from API:', err)
    }
  }
  
  // Final validation
  console.log('[Stripe] Step 3 - Final key validation:', {
    exists: !!publishableKey,
    length: publishableKey?.length || 0,
    startsWith: publishableKey?.substring(0, 7) || 'N/A',
    trimmedEmpty: publishableKey?.trim() === '',
    source: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'env' : 'api'
  })
  
  if (!publishableKey || publishableKey.trim() === '') {
    const errorMessage = "Stripe payment system is not configured. Please contact support."
    console.error('[Stripe Error]', errorMessage, {
      keyExists: !!publishableKey,
      keyValue: publishableKey
    })
    
    stripePromise = Promise.reject(
      new Error(errorMessage)
    ) as Promise<StripeClient | null>
    return stripePromise
  }
  
  // Only call loadStripe if we have a valid key
  console.log('[Stripe] Step 4 - Initializing Stripe with key:', publishableKey.substring(0, 15) + '...')
  try {
    stripePromise = loadStripe(publishableKey)
    console.log('[Stripe] Step 5 - Stripe promise created successfully')
  } catch (err) {
    console.error('[Stripe] Error calling loadStripe:', err)
    stripePromise = Promise.reject(err) as Promise<StripeClient | null>
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


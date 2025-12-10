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

// Export stripe instance with lazy initialization
// The instance is only created when first accessed, not at module load time
export const stripe = getStripeInstance()

// Helper function to format amount for Stripe (convert to cents)
export const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100)
}

// Helper function to format amount for display
export const formatAmountForDisplay = (amount: number): string => {
  return (amount / 100).toFixed(2)
}


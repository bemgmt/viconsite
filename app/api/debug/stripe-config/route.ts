import { NextResponse } from "next/server"

export async function GET() {
  // Check if Stripe publishable key is configured
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const secretKey = process.env.STRIPE_SECRET_KEY
  
  return NextResponse.json({
    publishableKeyConfigured: !!publishableKey,
    publishableKeyLength: publishableKey?.length || 0,
    publishableKeyPrefix: publishableKey?.substring(0, 7) || 'N/A',
    secretKeyConfigured: !!secretKey,
    secretKeyLength: secretKey?.length || 0,
    secretKeyPrefix: secretKey?.substring(0, 7) || 'N/A',
    message: publishableKey 
      ? "Stripe publishable key is configured" 
      : "Stripe publishable key is NOT configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Vercel and redeploy."
  })
}


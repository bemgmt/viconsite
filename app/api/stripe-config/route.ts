import { NextResponse } from "next/server"

export async function GET() {
  // Return the publishable key (safe to expose to client)
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    return NextResponse.json(
      { error: "Stripe publishable key not configured" },
      { status: 500 }
    )
  }
  
  return NextResponse.json({
    publishableKey
  })
}


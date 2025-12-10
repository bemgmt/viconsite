import { NextRequest, NextResponse } from "next/server"
import { stripe, formatAmountForStripe } from "@/lib/stripe-server"
import type { CartItem } from "@/contexts/cart-context"

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid cart items" },
        { status: 400 }
      )
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    )

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(totalAmount),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        customerName: customerInfo?.name || "",
        customerEmail: customerInfo?.email || "",
        customerPhone: customerInfo?.phone || "",
        items: JSON.stringify(
          items.map((item: CartItem) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
      description: `VICON Order - ${items.length} item(s)`,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
}


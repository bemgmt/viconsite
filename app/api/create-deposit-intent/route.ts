import { NextRequest, NextResponse } from "next/server"
import { stripe, formatAmountForStripe } from "@/lib/stripe-server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { amount, customerName, customerEmail, customerPhone, prospectId } =
      await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      )
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Customer name and email are required" },
        { status: 400 }
      )
    }

    const deposit = await prisma.deposit.create({
      data: {
        amount: Math.round(amount * 100),
        prospectId: prospectId || null,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        status: "PENDING",
      },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        type: "deposit",
        depositId: deposit.id,
        customerName,
        customerEmail,
        customerPhone: customerPhone || "",
        prospectId: prospectId || "",
      },
      receipt_email: customerEmail,
      description: `VICON Installation Deposit - ${customerName}`,
    })

    await prisma.deposit.update({
      where: { id: deposit.id },
      data: { stripePaymentIntentId: paymentIntent.id },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      depositId: deposit.id,
    })
  } catch (error) {
    console.error("Error creating deposit intent:", error)
    return NextResponse.json(
      { error: "Failed to create deposit" },
      { status: 500 }
    )
  }
}

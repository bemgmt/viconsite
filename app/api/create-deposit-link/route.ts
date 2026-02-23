import { NextRequest, NextResponse } from "next/server"
import { stripe, formatAmountForStripe } from "@/lib/stripe-server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, prospectId, customerName, customerEmail, customerPhone } =
      await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      )
    }

    if (prospectId) {
      const prospect = await prisma.prospect.findUnique({
        where: { id: prospectId },
      })
      if (!prospect) {
        return NextResponse.json(
          { error: "Prospect not found" },
          { status: 404 }
        )
      }
      if (
        session.user.role === "USER" &&
        prospect.referredById !== session.user.id
      ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    const deposit = await prisma.deposit.create({
      data: {
        amount: Math.round(amount * 100),
        referredById: session.user.id,
        prospectId: prospectId || null,
        customerName: customerName || null,
        customerEmail: customerEmail || null,
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
        referredByUserId: session.user.id,
        referredByName: session.user.name,
        prospectId: prospectId || "",
        customerName: customerName || "",
        customerEmail: customerEmail || "",
        customerPhone: customerPhone || "",
      },
      description: `VICON Deposit - ${customerName || "Customer"}`,
    })

    await prisma.deposit.update({
      where: { id: deposit.id },
      data: { stripePaymentIntentId: paymentIntent.id },
    })

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://vicontech.group"
    const depositUrl = `${baseUrl}/deposit?pi=${paymentIntent.client_secret}&did=${deposit.id}`

    return NextResponse.json({
      success: true,
      depositId: deposit.id,
      clientSecret: paymentIntent.client_secret,
      depositUrl,
    })
  } catch (error) {
    console.error("Error creating deposit link:", error)
    return NextResponse.json(
      { error: "Failed to create deposit link" },
      { status: 500 }
    )
  }
}

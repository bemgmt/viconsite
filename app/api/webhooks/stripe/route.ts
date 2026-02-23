import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe-server"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment succeeded:", paymentIntent.id)

        if (paymentIntent.metadata.type === "deposit") {
          await handleDepositSuccess(paymentIntent)
        } else {
          console.log("Order details:", {
            amount: paymentIntent.amount / 100,
            customer: paymentIntent.metadata.customerEmail,
            items: paymentIntent.metadata.items,
          })
        }
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log("Payment failed:", paymentIntent.id)

        if (paymentIntent.metadata.type === "deposit") {
          await handleDepositFailure(paymentIntent)
        }
        break
      }

      case "charge.succeeded": {
        const charge = event.data.object as Stripe.Charge
        console.log("Charge succeeded:", charge.id)
        break
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge
        if (charge.payment_intent) {
          await handleDepositRefund(charge.payment_intent as string)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

async function handleDepositSuccess(paymentIntent: Stripe.PaymentIntent) {
  const depositId = paymentIntent.metadata.depositId

  if (depositId) {
    await prisma.deposit.update({
      where: { id: depositId },
      data: { status: "COMPLETED" },
    })
    console.log(`Deposit ${depositId} marked as COMPLETED`)
  } else {
    const existing = await prisma.deposit.findUnique({
      where: { stripePaymentIntentId: paymentIntent.id },
    })
    if (existing) {
      await prisma.deposit.update({
        where: { id: existing.id },
        data: { status: "COMPLETED" },
      })
      console.log(`Deposit ${existing.id} marked as COMPLETED via PI lookup`)
    }
  }
}

async function handleDepositFailure(paymentIntent: Stripe.PaymentIntent) {
  const depositId = paymentIntent.metadata.depositId

  if (depositId) {
    await prisma.deposit.update({
      where: { id: depositId },
      data: { status: "FAILED" },
    })
    console.log(`Deposit ${depositId} marked as FAILED`)
  }
}

async function handleDepositRefund(paymentIntentId: string) {
  const deposit = await prisma.deposit.findUnique({
    where: { stripePaymentIntentId: paymentIntentId },
  })

  if (deposit) {
    await prisma.deposit.update({
      where: { id: deposit.id },
      data: { status: "REFUNDED" },
    })
    console.log(`Deposit ${deposit.id} marked as REFUNDED`)
  }
}

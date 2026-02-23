"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Shield, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

function DepositForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError("")

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/deposit/success`,
      },
    })

    if (submitError) {
      setError(submitError.message || "Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Deposit Received</h2>
        <p className="text-muted-foreground">
          Thank you! Your deposit has been processed successfully.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </span>
        ) : (
          "Pay Deposit"
        )}
      </button>
    </form>
  )
}

function DepositContent() {
  const searchParams = useSearchParams()
  const clientSecret = searchParams.get("pi")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!clientSecret) {
      setError("Invalid deposit link. Please contact your VICON representative.")
    }
  }, [clientSecret])

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
      {error ? (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive">{error}</p>
        </div>
      ) : clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
              variables: {
                colorPrimary: "#1a1a1a",
              },
            },
          }}
        >
          <DepositForm />
        </Elements>
      ) : (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

export default function DepositPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Shield size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              VICON Deposit
            </h1>
            <p className="text-muted-foreground">
              Secure your fire protection system with a deposit
            </p>
          </div>

          <Suspense
            fallback={
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </div>
            }
          >
            <DepositContent />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  )
}

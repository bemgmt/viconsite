"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentIntentId, setPaymentIntentId] = useState("")

  useEffect(() => {
    const id = searchParams.get("payment_intent")
    if (id) {
      setPaymentIntentId(id)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 animate-bounce-in">
              <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">What's Next?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Confirmation Email
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    You'll receive an order confirmation email shortly with all the details of your purchase.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Order Processing
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our team will begin processing your order immediately. We'll contact you within 24-48 hours to schedule installation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowRight className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Professional Installation
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our certified technicians will coordinate with you to schedule a convenient installation time.
                  </p>
                </div>
              </div>
            </div>

            {paymentIntentId && (
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Order Reference:</span>{" "}
                  <span className="font-mono">{paymentIntentId}</span>
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:info@vicontech.group"
                className="text-primary hover:underline text-sm font-medium"
              >
                info@vicontech.group
              </a>
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline text-sm font-medium"
              >
                (123) 456-7890
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
            >
              Return to Home
            </button>
            <button
              onClick={() => router.push("/products")}
              className="bg-muted hover:bg-muted/80 text-foreground px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}


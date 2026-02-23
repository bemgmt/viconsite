import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DepositSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Deposit Received!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your deposit. Your VICON representative will be in
            touch shortly to schedule your installation.
          </p>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h2 className="font-semibold text-foreground mb-2">
              What happens next?
            </h2>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li>1. You will receive a confirmation email</li>
              <li>2. Your VICON representative will contact you within 24 hours</li>
              <li>3. We will schedule a site assessment</li>
              <li>4. Installation will be arranged at your convenience</li>
            </ul>
          </div>

          <Link
            href="/"
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

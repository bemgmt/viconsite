import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactFormClient from "@/components/contact-form-client"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Schedule Your Free Consultation</h1>
          <p className="text-xl text-muted-foreground">
            Let our VICON experts help you design the perfect fire protection system for your property
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Our fire protection specialists are ready to answer your questions and provide a customized solution for
              your home or business.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Phone</h3>
                  <p className="text-muted-foreground">(904) 945-3280</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri 8am-6pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground">info@vicontech.group</p>
                  <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Service Area</h3>
                  <p className="text-muted-foreground">Southern California</p>
                  <p className="text-sm text-muted-foreground">Los Angeles, Orange, Riverside, San Bernardino Counties</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-accent/10 rounded-lg border border-accent/20">
              <h3 className="font-bold text-foreground mb-2">What to Expect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Free on-site property assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Customized fire protection plan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Detailed pricing and financing options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>No obligation quote</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <ContactFormClient />
        </div>
      </section>

      <Footer />
    </main>
  )
}


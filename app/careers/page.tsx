import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import CareersApplicationForm from "@/components/careers-application-form"
import { Users, TrendingUp, Megaphone, CheckCircle } from "lucide-react"

export default function CareersPage() {
  const roles = [
    {
      icon: Users,
      title: "Sales Agents",
      description: "Join our team of fire protection specialists and help homeowners protect what matters most.",
      benefits: ["Competitive commission structure", "Comprehensive training", "Flexible schedule", "Growth opportunities"],
    },
    {
      icon: TrendingUp,
      title: "Distributors",
      description: "Partner with VICON to bring cutting-edge fire protection technology to your market.",
      benefits: ["Exclusive territories", "Marketing support", "Technical training", "Attractive margins"],
    },
    {
      icon: Megaphone,
      title: "Influencers",
      description: "Promote life-saving technology and earn while making a difference in your community.",
      benefits: ["Generous affiliate program", "Custom discount codes", "Marketing materials", "Performance bonuses"],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Join the VICON Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of the revolution in fire protection technology. We're looking for passionate individuals
            to help us protect homes and save lives.
          </p>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            We're Recruiting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {roles.map((role) => (
              <div key={role.title} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <role.icon size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">{role.title}</h3>
                <p className="text-muted-foreground mb-6">{role.description}</p>
                <ul className="space-y-2">
                  {role.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Apply Now</h2>
            <CareersApplicationForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

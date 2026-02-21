import { Home, Building2, Factory, Zap, ChevronDown } from "lucide-react"

export default function Environments({ id }: { id?: string }) {
  const environments = [
    {
      icon: Home,
      title: "Residential Homes & Villas",
      description: "Complete protection for family properties with app control and 24/7 monitoring.",
      features: [
        "Smart home integration",
        "Mobile app control",
        "24/7 monitoring service",
        "Automatic emergency alerts",
        "Zone-based protection",
      ],
    },
    {
      icon: Building2,
      title: "Schools & Campuses",
      description: "Multi-zone coverage designed for educational facilities and student safety.",
      features: [
        "Multi-building coverage",
        "Centralized control system",
        "Emergency evacuation protocols",
        "Integration with fire alarms",
        "Compliance with safety codes",
      ],
    },
    {
      icon: Factory,
      title: "Industrial Facilities",
      description: "Enterprise-grade suppression for high-risk manufacturing and storage areas.",
      features: [
        "High-capacity suppression",
        "Chemical fire protection",
        "Hazardous material detection",
        "Industrial-grade sensors",
        "Redundant safety systems",
      ],
    },
    {
      icon: Zap,
      title: "Municipal & Urban Projects",
      description: "Scalable systems for community buildings and large-scale developments.",
      features: [
        "Scalable architecture",
        "Multi-property management",
        "City-wide monitoring",
        "Emergency services integration",
        "Community safety dashboard",
      ],
    },
  ]

  return (
    <section id={id} className="py-20 bg-primary text-primary-foreground px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Homes, Schools, and Communities</h2>
          <p className="text-lg mb-4">
            From private residences to large developments, VICON adapts to protect any space:
          </p>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {environments.map((env, idx) => {
            const Icon = env.icon
            return (
              <details
                key={idx}
                className="group bg-primary-foreground/10 rounded-lg p-8 border border-primary-foreground/20 hover:border-accent/60 transition-colors"
              >
                <summary className="list-none cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="text-accent" size={40} />
                    <ChevronDown className="text-accent transition-transform duration-300 group-open:rotate-180" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{env.title}</h3>
                  <p className="text-primary-foreground/80 mb-4">{env.description}</p>
                </summary>
                <div className="border-t border-accent/30 pt-4 mt-2">
                  <p className="text-sm font-semibold text-accent mb-2">Key Features:</p>
                  <ul className="space-y-2">
                    {env.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                        <span className="text-accent mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            )
          })}
        </div>

        <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-12 text-center">
          <p className="text-2xl font-bold italic">
            "Every home deserves intelligent protection — VICON makes that possible."
          </p>
          <p className="text-primary-foreground/70 mt-4">— Janice, VICON Technologies</p>
        </div>
      </div>
    </section>
  )
}

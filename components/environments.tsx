"use client"

import { useState } from "react"
import { Home, Building2, Factory, Zap, ChevronDown } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export default function Environments({ id }: { id?: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { ref: titleRef, isInView: titleInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()
  const { ref: quoteRef, isInView: quoteInView } = useInView()

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
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for Homes, Schools, and Communities</h2>
          <p className="text-lg mb-4">
            From private residences to large developments, VICON adapts to protect any space:
          </p>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {environments.map((env, idx) => {
            const Icon = env.icon
            const isExpanded = expandedIndex === idx
            return (
              <div
                key={idx}
                className={`group bg-primary-foreground/10 rounded-lg p-8 border border-primary-foreground/20 hover:border-accent/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="text-accent group-hover:scale-110 transition-transform duration-300" size={40} />
                  <ChevronDown
                    className={`text-accent transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    size={24}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{env.title}</h3>
                <p className="text-primary-foreground/80 mb-4">{env.description}</p>

                {/* Expandable Features */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-accent/30 pt-4">
                    <p className="text-sm font-semibold text-accent mb-2">Key Features:</p>
                    <ul className="space-y-2">
                      {env.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2 text-sm text-primary-foreground/90"
                          style={{
                            transitionDelay: `${fIdx * 50}ms`,
                            opacity: isExpanded ? 1 : 0,
                            transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <span className="text-accent mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          ref={quoteRef as React.RefObject<HTMLDivElement>}
          className={`bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-12 text-center transition-all duration-700 delay-400 ${
            quoteInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-2xl font-bold italic">
            "Every home deserves intelligent protection — VICON makes that possible."
          </p>
          <p className="text-primary-foreground/70 mt-4">— Janice, VICON Technologies</p>
        </div>
      </div>
    </section>
  )
}

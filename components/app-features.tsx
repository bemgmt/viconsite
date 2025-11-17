"use client"

import { useState } from "react"
import { Smartphone, Bell, Zap, FileText, ChevronDown } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"

export default function AppFeatures({ id }: { id?: string }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { ref: titleRef, isInView: titleInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()

  const features = [
    {
      icon: Smartphone,
      title: "Live Camera View",
      description: "Watch your property in real-time from anywhere in the world.",
      details: [
        "HD video streaming",
        "Multi-camera support",
        "Night vision capability",
        "Pan, tilt, and zoom controls",
        "Secure encrypted connection",
      ],
    },
    {
      icon: Bell,
      title: "Instant Alerts",
      description: "Receive notifications the moment a threat is detected with live video verification.",
      details: [
        "Push notifications",
        "SMS alerts",
        "Email notifications",
        "Video clip attachments",
        "Customizable alert settings",
      ],
    },
    {
      icon: Zap,
      title: "Manual Override & Remote Control",
      description: "Take manual control of your system anytime, even during automatic suppression.",
      details: [
        "One-tap activation",
        "Zone-specific control",
        "Emergency shutdown",
        "System status monitoring",
        "Remote diagnostics",
      ],
    },
    {
      icon: FileText,
      title: "Cloud-Based Logs",
      description: "Access historical records for insurance claims and system optimization.",
      details: [
        "Unlimited cloud storage",
        "Downloadable reports",
        "Event timeline",
        "System health logs",
        "Compliance documentation",
      ],
    },
  ]

  return (
    <section id={id} className="py-20 bg-background px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Control, Monitor, and Stay Informed</h2>
          <p className="text-lg text-muted-foreground mb-8">Stay connected with your home's safety in real time:</p>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            const isExpanded = expandedIndex === idx
            return (
              <div
                key={idx}
                className={`group flex flex-col gap-6 p-8 bg-primary/5 border border-primary/20 rounded-lg hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] cursor-pointer ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex gap-6 flex-1">
                    <Icon className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={40} />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`text-accent flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                    size={24}
                  />
                </div>

                {/* Expandable Details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-accent/30 pt-4">
                    <p className="text-sm font-semibold text-accent mb-2">Features:</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                          style={{
                            transitionDelay: `${dIdx * 50}ms`,
                            opacity: isExpanded ? 1 : 0,
                            transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
                            transition: "all 0.3s ease"
                          }}
                        >
                          <span className="text-accent mt-1">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

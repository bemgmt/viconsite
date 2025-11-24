"use client"

import { useInView } from "@/hooks/use-in-view"
import Link from "next/link"

export default function PricingSection() {
  const { ref: titleRef, isInView: titleInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()
  const { ref: ctaRef, isInView: ctaInView } = useInView()

  const benefits = [
    "Flexible financing options",
    "No installation deposit",
    "Official bank partnership",
    "Increases property value and insurance confidence",
  ]

  return (
    <section className="py-20 bg-primary text-primary-foreground px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Safety Shouldn't Be a Luxury</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />

          <p className="text-xl mb-8 leading-relaxed">
            Protect your home for as low as <span className="font-bold text-accent">$200/month</span> with official bank
            financing — no upfront cost required.
          </p>

          <p className="text-lg mb-12 text-primary-foreground/90">
            VICON makes advanced fire protection accessible for every homeowner, developer, and community builder.
          </p>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4 hover:bg-primary-foreground/20 transition-all duration-700 ${
                gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 delay-400 ${
            ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link href="/contact" className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(227,30,36,0.4)] hover:shadow-[0_0_40px_rgba(227,30,36,0.7)]">
            Get Your Free Quote Today
          </Link>
        </div>
      </div>
    </section>
  )
}

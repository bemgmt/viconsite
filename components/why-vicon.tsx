"use client"

import Link from "next/link"
import { Zap, Crosshair, Droplets, Smartphone, Sun } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

export default function WhyVicon() {
  const { ref: titleRef, isInView: titleInView } = useInView()
  const { ref: descRef, isInView: descInView } = useInView()
  const { ref: gridRef, isInView: gridInView } = useInView()

  const highlights = [
    { icon: Zap, text: "24/7 AI Monitoring", href: "/learn-more#technology" },
    { icon: Crosshair, text: "Precise Fire Localization", href: "/how-it-works" },
    { icon: Droplets, text: "Automatic High-Pressure Spray", href: "/how-it-works" },
    { icon: Smartphone, text: "Remote App Control & Live Video Feed", href: "/learn-more#app" },
    { icon: Sun, text: "Solar-Powered, Water-Efficient Design", href: "/the-system" },
  ]

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-black">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/AdobeStock_1731470527.jpeg"
          alt="Fire Prevention Background"
          fill
          quality={75}
          sizes="100vw"
          className="object-cover"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Intelligent Fire Prevention for Modern Living
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </div>

        <div
          ref={descRef as React.RefObject<HTMLDivElement>}
          className={`bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 mb-16 transition-all duration-700 delay-200 ${
            descInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lg text-white leading-relaxed">
            <span className="font-bold text-white">Fires move fast — but VICON moves faster.</span> Our intelligent
            residential fire sprinkler system detects smoke and heat within seconds, pinpoints the source, and activates a high-pressure
            water cannon with surgical precision. Perfect for outdoor fire protection, it's always alert, always learning, and always protecting what matters
            most.
          </p>
        </div>

        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <Link
                key={idx}
                href={item.href}
                className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-700 ${
                  gridInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${400 + idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all">
                  <Icon className="text-accent" size={32} />
                </div>
                <p className="font-semibold text-white group-hover:text-accent transition-colors">{item.text}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

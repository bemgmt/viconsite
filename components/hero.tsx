"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const slides = [
    {
      title: "Smart Fire Protection — VICON Takes the Lead",
      subtitle:
        "AI-powered detection, precision targeting, and instant response — protecting your home before flames can spread.",
      cta: "Protect Your Home for $200/month",
      image: "/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=1469509501869408920&skey=@crypt_7d72f99b_825157939b6d97f492346c55821f42a0&mmweb_appid=wx_webfilehelper.jpeg",
    },
    {
      title: "Intelligent Fire Prevention for Modern Living",
      subtitle:
        "Our AI catches threats in seconds and responds with surgical precision — always alert, always learning.",
      cta: "Schedule a Free Consultation",
      image: "/AdobeStock_1731470527.jpeg",
    },
    {
      title: "Safer. Greener. Smarter.",
      subtitle: "Solar-powered, water-efficient protection engineered for every home in Southern California.",
      cta: "Learn How VICON Works",
      image: "/AdobeStock_1015607126.jpeg",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right")
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const next = () => {
    setDirection("right")
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prev = () => {
    setDirection("left")
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden bg-primary">
      {slides.map((slide, index) => {
        const isActive = index === current
        const slideDirection = direction === "right" ? "translate-x-full" : "-translate-x-full"

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              isActive
                ? "opacity-100 translate-x-0 scale-100"
                : `opacity-0 ${slideDirection} scale-105`
            }`}
          >
            {/* Image with subtle zoom effect */}
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className={`w-full h-full object-cover transition-transform duration-[7000ms] ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-transparent animate-gradient" />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )
      })}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance animate-fade-up animate-delay-200">
          {slides[current].title}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-up animate-delay-400">
          {slides[current].subtitle}
        </p>
        <button className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(227,30,36,0.4)] hover:shadow-[0_0_40px_rgba(227,30,36,0.7)] animate-fade-up animate-delay-600">
          <span className="inline-block group-hover:translate-x-1 transition-transform">
            {slides[current].cta}
          </span>
        </button>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? "right" : "left")
              setCurrent(index)
            }}
            className={`h-3 rounded-full transition-all hover:scale-110 ${
              index === current
                ? "bg-accent w-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                : "bg-white/50 w-3 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

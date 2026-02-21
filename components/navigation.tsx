"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import Image from "next/image"

const NavCartButton = dynamic(() => import("@/components/nav-cart-button"), { ssr: false })

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isCommerceRoute =
    pathname.startsWith("/products") ||
    pathname.startsWith("/checkout") ||
    pathname === "/battery" ||
    pathname === "/agent-pricing"

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 20
        setIsScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled))
        ticking = false
      })
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "The System", href: "/the-system" },
    { label: "Learn More", href: "/learn-more" },
    { label: "Agent Pricing", href: "/agent-pricing" },
  ]

  return (
    <>
      <div className="bg-accent h-10 flex items-center px-4 text-sm font-medium text-accent-foreground animate-fade-in">
        AI-Powered Fire Protection: Detect Threats. Suppress Precisely. Protect Your Home.
      </div>

      <nav
        className={`text-primary-foreground sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-primary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl group">
              <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
                <Image
                  src="/optimized/viconlogo-160.webp"
                  alt="VICON Logo"
                  fill
                  quality={78}
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="group-hover:text-accent transition-colors">VICON</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-sm font-medium transition-colors group ${
                      isActive ? "text-accent" : "hover:text-accent"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )
              })}

              <Link
                href="/products"
                className={`relative text-sm font-medium transition-colors group ${
                  pathname.startsWith("/products") || pathname === "/battery" ? "text-accent" : "hover:text-accent"
                }`}
              >
                Products
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    pathname.startsWith("/products") || pathname === "/battery" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden sm:flex hover:text-accent transition-all hover:scale-110">
                <User size={20} />
              </Link>
              {isCommerceRoute && <NavCartButton />}

              <button
                className="md:hidden ml-4 hover:scale-110 transition-transform"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 px-2 rounded hover:bg-primary-foreground/10 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/products"
                className="block py-2 px-2 rounded hover:bg-primary-foreground/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

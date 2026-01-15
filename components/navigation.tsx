"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User, ShoppingCart, ChevronDown } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "The System", href: "/the-system" },
    { label: "Learn More", href: "/learn-more" },
    { label: "Agent Pricing", href: "/agent-pricing" },
  ]

  const productItems = [
    { label: "All Products", href: "/products" },
    { label: "VICON Intelligent Sprinkler System", href: "/products/intelligent-sprinkler-system" },
    { label: "Sanctuary Battery", href: "/battery" },
    { label: "Purily Robotic Pool Cleaner", href: "/products/purily-robotic-pool-cleaner" },
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
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cgi-bin_mmwebwx-bin_webwxgetmsgimg__MsgID5202958901379986031skey%40crypt_7d72f99b_bc487fcb6d9402a8598d026bb42e3fdemmweb_appidwx_webfilehelper-e1747815718414-100x100-noihZZciHXU6DZ0iqg6u7Prmw5Vgvz.jpeg"
                  alt="VICON Logo"
                  fill
                  quality={90}
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

              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link
                    href="/products"
                    className={`relative text-sm font-medium transition-colors group flex items-center gap-1 ${
                      pathname.startsWith("/products") || pathname === "/battery" ? "text-accent" : "hover:text-accent"
                    }`}
                  >
                    Products
                    <ChevronDown size={16} className="transition-transform group-data-[state=open]:rotate-180" />
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                        pathname.startsWith("/products") || pathname === "/battery" ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary text-primary-foreground border-primary-foreground/20">
                  {productItems.map((product) => (
                    <DropdownMenuItem key={product.href} asChild>
                      <Link
                        href={product.href}
                        className="cursor-pointer hover:bg-primary-foreground/10 focus:bg-primary-foreground/10"
                      >
                        {product.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden sm:flex hover:text-accent transition-all hover:scale-110">
                <User size={20} />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-accent transition-all hover:scale-110 group"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-primary w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold group-hover:animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

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

              {/* Mobile Products Menu */}
              <div>
                <button
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="w-full flex items-center justify-between py-2 px-2 rounded hover:bg-primary-foreground/10 transition-colors"
                >
                  <span>Products</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isMobileProductsOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {productItems.map((product) => (
                      <Link
                        key={product.href}
                        href={product.href}
                        className="block py-2 px-2 rounded hover:bg-primary-foreground/10 transition-colors text-sm"
                        onClick={() => {
                          setIsOpen(false)
                          setIsMobileProductsOpen(false)
                        }}
                      >
                        {product.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { User, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const [userType, setUserType] = useState<"agent" | "distributor" | "influencer">("agent")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { userType, ...formData })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <User size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2 text-foreground">Partner Login</h1>
            <p className="text-muted-foreground">Access your VICON partner dashboard</p>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-3 gap-2 mb-8 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setUserType("agent")}
              className={`py-3 px-4 rounded-md font-medium transition-all ${
                userType === "agent"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agent
            </button>
            <button
              onClick={() => setUserType("distributor")}
              className={`py-3 px-4 rounded-md font-medium transition-all ${
                userType === "distributor"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Distributor
            </button>
            <button
              onClick={() => setUserType("influencer")}
              className={`py-3 px-4 rounded-md font-medium transition-all ${
                userType === "influencer"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Influencer
            </button>
          </div>

          {/* Login Form */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="password"
                    id="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-accent focus:ring-accent" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-accent hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/careers" className="text-accent hover:underline font-medium">
                Apply to become a partner
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}


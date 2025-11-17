"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Shield, CheckCircle2 } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export default function AgentPricingLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Simulate email verification - in production, this would connect to a backend
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter an email address")
      return
    }
    // Simulate sending code
    setVerificationSent(true)
    setError("")
    console.log("[v0] Verification code sent to:", email)
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simple verification: accept any 6-digit code
    if (code.length === 6) {
      setIsVerifying(true)
      setError("")

      // Simulate verification delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      setIsVerifying(false)
      setShowSuccess(true)

      // Show success animation then grant access
      setTimeout(() => {
        setIsAuthenticated(true)
      }, 1500)
    } else {
      setError("Please enter a valid 6-digit code")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative z-10 animate-fade-up border border-accent/20">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className={`flex items-center gap-2 transition-all duration-300 ${!verificationSent ? "opacity-100" : "opacity-50"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${!verificationSent ? "bg-primary text-white scale-110" : "bg-gray-200 text-gray-500"}`}>
                1
              </div>
              <span className="text-sm font-medium hidden sm:inline">Email</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`flex items-center gap-2 transition-all duration-300 ${verificationSent && !showSuccess ? "opacity-100" : "opacity-50"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${verificationSent && !showSuccess ? "bg-primary text-white scale-110" : "bg-gray-200 text-gray-500"}`}>
                2
              </div>
              <span className="text-sm font-medium hidden sm:inline">Verify</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`flex items-center gap-2 transition-all duration-300 ${showSuccess ? "opacity-100" : "opacity-50"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${showSuccess ? "bg-green-600 text-white scale-110" : "bg-gray-200 text-gray-500"}`}>
                {showSuccess ? <CheckCircle2 size={16} /> : "3"}
              </div>
              <span className="text-sm font-medium hidden sm:inline">Access</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${showSuccess ? "bg-green-600 scale-110" : "bg-primary"}`}>
              {showSuccess ? (
                <CheckCircle2 className="text-white animate-bounce" size={32} />
              ) : verificationSent ? (
                <Shield className="text-white" size={32} />
              ) : (
                <Mail className="text-white" size={32} />
              )}
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {showSuccess ? "Access Granted!" : "Agent Pricing"}
            </h1>
            <p className="text-muted-foreground">
              {showSuccess ? "Redirecting to agent portal..." : "Exclusive pricing for authorized agents"}
            </p>
          </div>

          {showSuccess ? (
            <div className="text-center py-8 animate-fade-up">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="text-green-600" size={40} />
              </div>
              <p className="text-lg font-semibold text-green-600 mb-2">Verification Successful!</p>
              <p className="text-sm text-muted-foreground">Loading agent pricing...</p>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          ) : verificationSent ? (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-foreground mb-4 text-center">
                  Enter 6-Digit Verification Code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-2xl border-2 border-primary/30 focus:border-primary transition-all" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-2xl border-2 border-primary/30 focus:border-primary transition-all" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-2xl border-2 border-primary/30 focus:border-primary transition-all" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-2xl border-2 border-primary/30 focus:border-primary transition-all" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-2xl border-2 border-primary/30 focus:border-primary transition-all" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-2xl border-2 border-primary/30 focus:border-primary transition-all" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Code sent to {email}
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3 animate-shake">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || code.length !== 6}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Access Agent Pricing"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setVerificationSent(false)
                  setCode("")
                  setEmail("")
                  setError("")
                }}
                className="w-full text-primary hover:underline text-sm transition-all hover:scale-105"
              >
                Use different email
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="agent@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3 animate-shake">
                  {error}
                </div>
              )}

              <p className="text-xs text-muted-foreground bg-accent/10 border border-accent/30 rounded-lg p-3">
                <Shield className="inline w-4 h-4 mr-1" />
                We'll send a verification code to your email address to confirm agent access.
              </p>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
              >
                Send Verification Code
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Don't have agent access? Contact our sales team at{" "}
              <a href="mailto:sales@vicontech.group" className="text-primary hover:underline font-semibold">
                sales@vicontech.group
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-50 shadow-lg animate-fade-in">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <CheckCircle2 size={16} />
        Verified Agent Access
      </div>
      {children}
    </div>
  )
}

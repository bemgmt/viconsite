"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service..." },
  { value: "vicon-sprinkler", label: "VICON Intelligent Sprinkler / Exterior Protection" },
  { value: "vicon-sprinkler", label: "VICON Sprinkler Systems (Interior)" },
  { value: "battery", label: "Sanctuary Battery" },
  { value: "other", label: "Other" },
] as const

interface ContactFormClientProps {
  defaultService?: string
}

export default function ContactFormClient({ defaultService = "" }: ContactFormClientProps) {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [service, setService] = useState(defaultService)
  const showSprinklerFields = service === "vicon-sprinkler"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const message = String(formData.get("message") || "")

    let fullMessage = message
    if (showSprinklerFields) {
      const projectType = formData.get("projectType") as string
      const propertyType = formData.get("propertyType") as string
      const jurisdiction = formData.get("jurisdiction") as string
      const systemTypes = formData.getAll("systemTypes") as string[]
      const lastInspection = formData.get("lastInspection") as string
      const timeline = formData.get("timeline") as string
      const sprinklerDetails = [
        projectType && `Project type: ${projectType}`,
        propertyType && `Property type: ${propertyType}`,
        jurisdiction && `Jurisdiction: ${jurisdiction}`,
        systemTypes.length > 0 && `System types: ${systemTypes.join(", ")}`,
        lastInspection && `Last inspection: ${lastInspection}`,
        timeline && `Preferred timeline: ${timeline}`,
        message,
      ]
        .filter(Boolean)
        .join("\n")
      fullMessage = sprinklerDetails
    }

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      message: fullMessage,
      preferredContact: String(formData.get("preferredContact") || "email"),
      source: showSprinklerFields ? "vicon-sprinkler-quote" : "contact",
    }

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Contact submission failed")
      }

      setSubmitted(true)
    } catch (error) {
      console.error("Contact submission error:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 shadow-lg text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Calendar size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">Thank You!</h2>
        <p className="text-lg text-muted-foreground mb-6">
          A member of our team will be in touch soon to schedule your free consultation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
  const labelClass = "block text-sm font-medium mb-2 text-foreground"

  return (
    <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="service" className={labelClass}>
            Service / Inquiry Type
          </label>
          <select
            id="service"
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={inputClass}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {showSprinklerFields && (
          <div className="space-y-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
            <p className="text-sm font-medium text-foreground">Sprinkler project details</p>
            <div>
              <label htmlFor="projectType" className={labelClass}>
                Project Type
              </label>
              <select id="projectType" name="projectType" className={inputClass}>
                <option value="">Select...</option>
                <option value="new-build">New build</option>
                <option value="retrofit">Retrofit</option>
                <option value="inspection">Inspection</option>
                <option value="repair">Repair</option>
              </select>
            </div>
            <div>
              <label htmlFor="propertyType" className={labelClass}>
                Property Type
              </label>
              <select id="propertyType" name="propertyType" className={inputClass}>
                <option value="">Select...</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            <div>
              <label htmlFor="jurisdiction" className={labelClass}>
                Jurisdiction
              </label>
              <select id="jurisdiction" name="jurisdiction" className={inputClass}>
                <option value="">Select...</option>
                <option value="la-city">Los Angeles (Reg 4)</option>
                <option value="california">California (Title 19)</option>
                <option value="other">Other AHJ</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>System Types</label>
              <div className="flex flex-wrap gap-4">
                {["sprinkler", "standpipe", "pre-action", "deluge"].map((sys) => (
                  <label key={sys} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="systemTypes" value={sys} className="w-4 h-4 text-accent focus:ring-accent rounded" />
                    <span className="text-foreground capitalize text-sm">{sys.replace("-", " ")}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lastInspection" className={labelClass}>
                  Last Inspection Date
                </label>
                <input type="date" id="lastInspection" name="lastInspection" className={inputClass} />
              </div>
              <div>
                <label htmlFor="timeline" className={labelClass}>
                  Preferred Timeline
                </label>
                <input type="text" id="timeline" name="timeline" className={inputClass} placeholder="e.g., Within 30 days" />
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input type="text" id="name" name="name" required className={inputClass} placeholder="John Doe" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
              Email Address *
            </label>
            <input type="email" id="email" name="email" required className={inputClass} placeholder="john@example.com" />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
              Phone Number *
            </label>
            <input type="tel" id="phone" name="phone" required className={inputClass} placeholder="(904) 945-3280" />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2 text-foreground">
            Property Address
          </label>
          <input type="text" id="address" name="address" className={inputClass} placeholder="123 Main St, Los Angeles, CA" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={inputClass}
            placeholder="Tell us about your fire protection needs..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-foreground">Preferred Contact Method</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value="email"
                defaultChecked
                className="w-4 h-4 text-accent focus:ring-accent"
              />
              <span className="text-foreground">Email</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                className="w-4 h-4 text-accent focus:ring-accent"
              />
              <span className="text-foreground">Phone</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
        >
          {isSubmitting ? "Submitting..." : showSprinklerFields ? "Get a Quote" : "Schedule Free Consultation"}
        </button>
      </form>
    </div>
  )
}

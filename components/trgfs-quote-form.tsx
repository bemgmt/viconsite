"use client"

import { useState } from "react"
import { CheckCircle } from "lucide-react"

export default function TrgfsQuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const projectType = formData.get("projectType") as string
    const propertyType = formData.get("propertyType") as string
    const jurisdiction = formData.get("jurisdiction") as string
    const systemTypes = formData.getAll("systemTypes") as string[]
    const lastInspection = formData.get("lastInspection") as string
    const timeline = formData.get("timeline") as string
    const message = formData.get("message") as string

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

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      message: sprinklerDetails,
      preferredContact: String(formData.get("preferredContact") || "email"),
      source: "trgfs-sprinkler-quote",
    }

    try {
      setIsSubmitting(true)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }
      setSubmitted(true)
    } catch (error) {
      console.error("TRGFS quote form error:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
          <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-foreground">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          Your sprinkler quote request has been received. A specialist will contact you to discuss your
          project and jurisdictional requirements.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors"
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="trgfs-name" className={labelClass}>
          Full Name *
        </label>
        <input
          type="text"
          id="trgfs-name"
          name="name"
          required
          className={inputClass}
          placeholder="John Doe"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trgfs-email" className={labelClass}>
            Email *
          </label>
          <input type="email" id="trgfs-email" name="email" required className={inputClass} placeholder="john@example.com" />
        </div>
        <div>
          <label htmlFor="trgfs-phone" className={labelClass}>
            Phone *
          </label>
          <input type="tel" id="trgfs-phone" name="phone" required className={inputClass} placeholder="(555) 123-4567" />
        </div>
      </div>
      <div>
        <label htmlFor="trgfs-address" className={labelClass}>
          Property Address
        </label>
        <input
          type="text"
          id="trgfs-address"
          name="address"
          className={inputClass}
          placeholder="123 Main St, Los Angeles, CA"
        />
      </div>
      <div>
        <label htmlFor="trgfs-project-type" className={labelClass}>
          Project Type
        </label>
        <select id="trgfs-project-type" name="projectType" className={inputClass}>
          <option value="">Select...</option>
          <option value="new-build">New build</option>
          <option value="retrofit">Retrofit</option>
          <option value="inspection">Inspection</option>
          <option value="repair">Repair</option>
        </select>
      </div>
      <div>
        <label htmlFor="trgfs-property-type" className={labelClass}>
          Property Type
        </label>
        <select id="trgfs-property-type" name="propertyType" className={inputClass}>
          <option value="">Select...</option>
          <option value="commercial">Commercial</option>
          <option value="residential">Residential</option>
          <option value="industrial">Industrial</option>
          <option value="restaurant">Restaurant</option>
        </select>
      </div>
      <div>
        <label htmlFor="trgfs-jurisdiction" className={labelClass}>
          Jurisdiction
        </label>
        <select id="trgfs-jurisdiction" name="jurisdiction" className={inputClass}>
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
              <span className="text-foreground capitalize">{sys.replace("-", " ")}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="trgfs-last-inspection" className={labelClass}>
            Last Inspection Date
          </label>
          <input type="date" id="trgfs-last-inspection" name="lastInspection" className={inputClass} />
        </div>
        <div>
          <label htmlFor="trgfs-timeline" className={labelClass}>
            Preferred Timeline
          </label>
          <input
            type="text"
            id="trgfs-timeline"
            name="timeline"
            className={inputClass}
            placeholder="e.g., Within 30 days"
          />
        </div>
      </div>
      <div>
        <label htmlFor="trgfs-message" className={labelClass}>
          Additional Details
        </label>
        <textarea
          id="trgfs-message"
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Describe your project or specific needs..."
        />
      </div>
      <div>
        <label className={labelClass}>Preferred Contact Method</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="preferredContact" value="email" defaultChecked className="w-4 h-4 text-accent focus:ring-accent" />
            <span className="text-foreground">Email</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="preferredContact" value="phone" className="w-4 h-4 text-accent focus:ring-accent" />
            <span className="text-foreground">Phone</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 rounded-lg font-bold text-lg transition-all hover:scale-[1.02] disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Get a Quote"}
      </button>
    </form>
  )
}

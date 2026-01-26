"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Upload, X, Users, TrendingUp, Megaphone, CheckCircle } from "lucide-react"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    noResume: false,
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const roles = [
    {
      icon: Users,
      title: "Sales Agents",
      description: "Join our team of fire protection specialists and help homeowners protect what matters most.",
      benefits: ["Competitive commission structure", "Comprehensive training", "Flexible schedule", "Growth opportunities"],
    },
    {
      icon: TrendingUp,
      title: "Distributors",
      description: "Partner with VICON to bring cutting-edge fire protection technology to your market.",
      benefits: ["Exclusive territories", "Marketing support", "Technical training", "Attractive margins"],
    },
    {
      icon: Megaphone,
      title: "Influencers",
      description: "Promote life-saving technology and earn while making a difference in your community.",
      benefits: ["Generous affiliate program", "Custom discount codes", "Marketing materials", "Performance bonuses"],
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
      setFormData({ ...formData, noResume: false })
    }
  }

  const handleRemoveFile = () => {
    setResumeFile(null)
    const fileInput = document.getElementById("resume") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleNoResumeChange = (checked: boolean) => {
    setFormData({ ...formData, noResume: checked })
    if (checked) {
      handleRemoveFile()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("role", formData.role)
      formDataToSend.append("noResume", formData.noResume.toString())
      
      if (resumeFile) {
        formDataToSend.append("resume", resumeFile)
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert("There was an error submitting your application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <div className="mb-6 flex justify-center">
              <CheckCircle size={80} className="text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Thank You!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A member of our team will be in touch soon.
            </p>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Join the VICON Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of the revolution in fire protection technology. We're looking for passionate individuals
            to help us protect homes and save lives.
          </p>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            We're Recruiting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {roles.map((role) => (
              <div key={role.title} className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-shadow">
                <role.icon size={48} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">{role.title}</h3>
                <p className="text-muted-foreground mb-6">{role.description}</p>
                <ul className="space-y-2">
                  {role.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Apply Now</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="(904) 945-3280"
                />
              </div>

              {/* Role Selection */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium mb-2 text-foreground">
                  I'm interested in becoming a *
                </label>
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select a role...</option>
                  <option value="agent">Sales Agent</option>
                  <option value="distributor">Distributor</option>
                  <option value="influencer">Influencer</option>
                </select>
              </div>

              {/* Resume Upload */}
              <div>
                <label htmlFor="resume" className="block text-sm font-medium mb-2 text-foreground">
                  Resume / CV
                </label>
                {resumeFile ? (
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Upload size={20} className="text-accent" />
                    <span className="flex-1 text-sm truncate">{resumeFile.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-destructive hover:bg-destructive/10 p-1 rounded transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      disabled={formData.noResume}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                        formData.noResume
                          ? "border-border bg-muted/50 cursor-not-allowed"
                          : "border-border hover:border-accent hover:bg-accent/5"
                      }`}
                    >
                      <Upload size={24} className={formData.noResume ? "text-muted-foreground" : "text-accent"} />
                      <span className={formData.noResume ? "text-muted-foreground" : "text-foreground"}>
                        Click to upload resume (PDF, DOC, DOCX)
                      </span>
                    </label>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="noResume"
                    checked={formData.noResume}
                    onChange={(e) => handleNoResumeChange(e.target.checked)}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                  />
                  <label htmlFor="noResume" className="text-sm text-muted-foreground cursor-pointer">
                    I don't have a resume
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

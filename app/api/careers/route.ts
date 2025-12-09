import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const role = formData.get("role") as string
    const noResume = formData.get("noResume") === "true"
    const resumeFile = formData.get("resume") as File | null

    // Validate required fields
    if (!name || !email || !phone || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    let resumePath = null

    // Handle resume file upload if provided
    if (resumeFile && !noResume) {
      const bytes = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes")
      try {
        await mkdir(uploadsDir, { recursive: true })
      } catch (error) {
        // Directory might already exist
      }

      // Generate unique filename
      const timestamp = Date.now()
      const sanitizedName = name.replace(/[^a-z0-9]/gi, "_").toLowerCase()
      const fileExtension = resumeFile.name.split(".").pop()
      const filename = `${sanitizedName}_${timestamp}.${fileExtension}`
      const filepath = path.join(uploadsDir, filename)

      // Save file
      await writeFile(filepath, buffer)
      resumePath = `/uploads/resumes/${filename}`
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send confirmation email to applicant
    // 3. Send notification email to HR/admin

    // For now, we'll send a confirmation email using a simple approach
    // In production, you'd use a service like SendGrid, Resend, or AWS SES
    
    try {
      await sendConfirmationEmail(email, name, role)
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
      // Don't fail the request if email fails
    }

    // Log the application (in production, save to database)
    console.log("New career application:", {
      name,
      email,
      phone,
      role,
      noResume,
      resumePath,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    })
  } catch (error) {
    console.error("Error processing career application:", error)
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    )
  }
}

async function sendConfirmationEmail(email: string, name: string, role: string) {
  try {
    // Only import and use Resend on the server side
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email")
      return null
    }

    const { Resend } = await import("resend")
    const { render } = await import("@react-email/render")
    const CareerConfirmationEmail = (await import("@/emails/career-confirmation")).default

    const resend = new Resend(process.env.RESEND_API_KEY)

    // Render the email template
    const emailHtml = render(CareerConfirmationEmail({ name, role }))

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "VICON Careers <onboarding@resend.dev>", // In production, use your verified domain
      to: email,
      subject: "Application Received - VICON Careers",
      html: emailHtml,
    })

    if (error) {
      console.error("Resend error:", error)
      throw error
    }

    console.log("Confirmation email sent successfully:", data)
    return data
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    throw error
  }
}


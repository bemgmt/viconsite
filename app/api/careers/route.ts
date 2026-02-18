import { NextRequest, NextResponse } from "next/server"
import { sendGmailEmail } from "@/lib/gmail"

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

    const attachments: Array<{ filename: string; mimeType: string; content: Buffer }> = []
    if (resumeFile && !noResume) {
      const resumeBytes = await resumeFile.arrayBuffer()
      attachments.push({
        filename: resumeFile.name || "resume",
        mimeType: resumeFile.type || "application/octet-stream",
        content: Buffer.from(resumeBytes),
      })
    }

    const submittedAt = new Date().toISOString()
    await sendGmailEmail({
      to: "info@vicontech.group",
      subject: `New Careers Application: ${name}`,
      replyTo: email,
      html: `
        <h2>New Careers Application</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Role:</strong> ${escapeHtml(role)}</p>
        <p><strong>No resume provided:</strong> ${noResume ? "Yes" : "No"}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(submittedAt)}</p>
      `,
      attachments,
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}


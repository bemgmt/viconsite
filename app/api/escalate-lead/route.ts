import { sendGmailEmail } from "@/lib/gmail"
import { prisma } from "@/lib/prisma"

interface LeadData {
  name: string
  email: string
  phone: string
}

export async function POST(request: Request) {
  try {
    const { name, email, phone }: LeadData = await request.json()

    if (!name || !email || !phone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    await Promise.all([
      prisma.prospect.create({
        data: {
          name,
          email,
          phone,
          source: "chatbot",
        },
      }),
      sendGmailEmail({
        to: "info@vicontech.group",
        subject: `New Lead from VICON Chatbot: ${name}`,
        replyTo: email,
        html: `
          <h2>New Lead Inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><em>This lead came from the VICON website chatbot.</em></p>
        `,
      }),
    ])

    return Response.json({ success: true })
  } catch (error) {
    console.error("Lead escalation error:", error)
    return Response.json({ error: "Failed to process lead" }, { status: 500 })
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

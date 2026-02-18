import { sendGmailEmail } from "@/lib/gmail"

interface ContactData {
  name: string
  email: string
  phone: string
  address?: string
  message?: string
  preferredContact?: string
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, address, message, preferredContact }: ContactData = await request.json()

    if (!name || !email || !phone) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    await sendGmailEmail({
      to: "info@vicontech.group",
      subject: `New Contact Form Inquiry: ${name}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Preferred contact method:</strong> ${escapeHtml(preferredContact || "Not specified")}</p>
        <p><strong>Property address:</strong> ${escapeHtml(address || "Not provided")}</p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || "No message provided").replace(/\n/g, "<br/>")}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(new Date().toISOString())}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return Response.json({ error: "Failed to process contact request" }, { status: 500 })
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

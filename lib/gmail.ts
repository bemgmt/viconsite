interface GmailAttachment {
  filename: string
  mimeType: string
  content: Buffer
}

interface SendGmailEmailInput {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  attachments?: GmailAttachment[]
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function base64UrlEncode(value: string): string {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function chunkBase64(value: string, chunkSize = 76): string {
  const chunks: string[] = []
  for (let index = 0; index < value.length; index += chunkSize) {
    chunks.push(value.slice(index, index + chunkSize))
  }
  return chunks.join("\r\n")
}

async function getGoogleAccessToken(): Promise<string> {
  const clientId = getRequiredEnv("GOOGLE_CLIENT_ID")
  const clientSecret = getRequiredEnv("GOOGLE_CLIENT_SECRET")
  const refreshToken =
    process.env.GOOGLE_REFRESH_TOKEN || process.env.GOOGLE_OAUTH_REFRESH_TOKEN || ""

  if (!refreshToken) {
    throw new Error(
      "Missing GOOGLE_REFRESH_TOKEN (or GOOGLE_OAUTH_REFRESH_TOKEN). Add it to your environment variables."
    )
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }).toString(),
  })

  const tokenJson = (await tokenResponse.json()) as
    | { access_token?: string; error?: string; error_description?: string }
    | undefined

  if (!tokenResponse.ok || !tokenJson?.access_token) {
    const errorMessage = tokenJson?.error_description || tokenJson?.error || "Unknown token error"
    throw new Error(`Failed to retrieve Google access token: ${errorMessage}`)
  }

  return tokenJson.access_token
}

function buildMimeMessage({
  to,
  subject,
  html,
  replyTo,
  attachments = [],
}: SendGmailEmailInput): string {
  const fromAddress = process.env.GMAIL_SENDER || "info@vicontech.group"
  const toAddress = Array.isArray(to) ? to.join(", ") : to
  const boundary = `mixed_${Date.now()}_${Math.random().toString(16).slice(2)}`

  const headers = [
    `From: VICON Website <${fromAddress}>`,
    `To: ${toAddress}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
  ]

  if (replyTo) {
    headers.splice(2, 0, `Reply-To: ${replyTo}`)
  }

  const parts: string[] = [
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
  ]

  for (const attachment of attachments) {
    const base64Content = chunkBase64(attachment.content.toString("base64"))
    parts.push(
      `--${boundary}`,
      `Content-Type: ${attachment.mimeType}; name="${attachment.filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      "",
      base64Content
    )
  }

  parts.push(`--${boundary}--`, "")
  return `${headers.join("\r\n")}\r\n\r\n${parts.join("\r\n")}`
}

export async function sendGmailEmail(input: SendGmailEmailInput): Promise<void> {
  const accessToken = await getGoogleAccessToken()
  const mimeMessage = buildMimeMessage(input)
  const raw = base64UrlEncode(mimeMessage)

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gmail API send failed (${response.status}): ${errorText}`)
  }
}

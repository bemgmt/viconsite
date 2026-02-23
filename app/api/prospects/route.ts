import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { ProspectStatus } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, message, source, referredById } = body

    if (!name || !email || !source) {
      return NextResponse.json(
        { error: "Name, email, and source are required" },
        { status: 400 }
      )
    }

    const prospect = await prisma.prospect.create({
      data: {
        name,
        email,
        phone: phone || null,
        address: address || null,
        message: message || null,
        source,
        referredById: referredById || null,
      },
    })

    return NextResponse.json({ success: true, prospect })
  } catch (error) {
    console.error("Error creating prospect:", error)
    return NextResponse.json(
      { error: "Failed to create prospect" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") as ProspectStatus | null
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: Record<string, unknown> = {}

    if (session.user.role === "USER") {
      where.referredById = session.user.id
    }

    if (status) {
      where.status = status
    }

    const [prospects, total] = await Promise.all([
      prisma.prospect.findMany({
        where,
        include: {
          referredBy: { select: { id: true, name: true, email: true } },
          deposits: { select: { id: true, amount: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.prospect.count({ where }),
    ])

    return NextResponse.json({
      prospects,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("Error fetching prospects:", error)
    return NextResponse.json(
      { error: "Failed to fetch prospects" },
      { status: 500 }
    )
  }
}

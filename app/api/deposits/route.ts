import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: Record<string, unknown> = {}

    if (session.user.role === "USER") {
      where.referredById = session.user.id
    }

    if (status) {
      where.status = status
    }

    const [deposits, total] = await Promise.all([
      prisma.deposit.findMany({
        where,
        include: {
          prospect: { select: { id: true, name: true, email: true } },
          referredBy: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.deposit.count({ where }),
    ])

    return NextResponse.json({
      deposits,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("Error fetching deposits:", error)
    return NextResponse.json(
      { error: "Failed to fetch deposits" },
      { status: 500 }
    )
  }
}

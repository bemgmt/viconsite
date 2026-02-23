import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const prospect = await prisma.prospect.findUnique({
      where: { id },
      include: {
        referredBy: { select: { id: true, name: true, email: true } },
        deposits: true,
      },
    })

    if (!prospect) {
      return NextResponse.json({ error: "Prospect not found" }, { status: 404 })
    }

    if (
      session.user.role === "USER" &&
      prospect.referredById !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return NextResponse.json({ prospect })
  } catch (error) {
    console.error("Error fetching prospect:", error)
    return NextResponse.json(
      { error: "Failed to fetch prospect" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status, notes, phone, address } = body

    const existing = await prisma.prospect.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: "Prospect not found" }, { status: 404 })
    }

    if (
      session.user.role === "USER" &&
      existing.referredById !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updateData: Record<string, unknown> = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.message = notes
    if (phone !== undefined) updateData.phone = phone
    if (address !== undefined) updateData.address = address

    const prospect = await prisma.prospect.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, prospect })
  } catch (error) {
    console.error("Error updating prospect:", error)
    return NextResponse.json(
      { error: "Failed to update prospect" },
      { status: 500 }
    )
  }
}

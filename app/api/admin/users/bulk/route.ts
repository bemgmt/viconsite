import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { userIds, isActive } = body

    // Validate required fields
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { message: "userIds must be a non-empty array" },
        { status: 400 }
      )
    }

    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { message: "isActive must be a boolean" },
        { status: 400 }
      )
    }

    // Don't allow bulk operations on admin users
    const adminUsers = await prisma.user.findMany({
      where: {
        id: { in: userIds },
        role: UserRole.ADMIN,
      },
      select: { id: true },
    })

    if (adminUsers.length > 0) {
      return NextResponse.json(
        { message: "Cannot perform bulk operations on admin users" },
        { status: 403 }
      )
    }

    // Update users
    const result = await prisma.user.updateMany({
      where: {
        id: { in: userIds },
        role: UserRole.USER,
      },
      data: {
        isActive,
      },
    })

    return NextResponse.json({
      message: `Updated ${result.count} user(s)`,
      count: result.count,
    })
  } catch (error) {
    console.error("Error in bulk update:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


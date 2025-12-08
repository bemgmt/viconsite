import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { UserRole, UserType } from "@prisma/client"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, userType, phone, commissionRate, socialMedia, notes, isActive } = body

    // Validate required fields
    if (!name || !email || !userType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Don't allow editing admin users
    if (existingUser.role === UserRole.ADMIN) {
      return NextResponse.json(
        { message: "Cannot edit admin users" },
        { status: 403 }
      )
    }

    // Check if email is already taken by another user
    if (email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email },
      })

      if (emailTaken) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 400 }
        )
      }
    }

    // Parse social media JSON if provided
    let socialMediaData = null
    if (socialMedia && socialMedia.trim()) {
      try {
        socialMediaData = JSON.parse(socialMedia)
      } catch (e) {
        return NextResponse.json(
          { message: "Invalid social media JSON format" },
          { status: 400 }
        )
      }
    }

    // Parse commission rate if provided
    let commissionRateValue = null
    if (commissionRate && commissionRate.trim()) {
      commissionRateValue = parseFloat(commissionRate)
      if (isNaN(commissionRateValue)) {
        return NextResponse.json(
          { message: "Invalid commission rate" },
          { status: 400 }
        )
      }
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
        email,
        userType: userType as UserType,
        phone: phone || null,
        commissionRate: commissionRateValue,
        socialMedia: socialMediaData,
        notes: notes || null,
        isActive: isActive ?? true,
      },
    })

    // Return user without password hash
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    })

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Don't allow deleting admin users
    if (existingUser.role === UserRole.ADMIN) {
      return NextResponse.json(
        { message: "Cannot delete admin users" },
        { status: 403 }
      )
    }

    // Delete user
    await prisma.user.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


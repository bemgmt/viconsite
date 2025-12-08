import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { UserRole, UserType } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, password, userType, phone, commissionRate, socialMedia, notes } = body

    // Validate required fields
    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

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

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: UserRole.USER,
        userType: userType as UserType,
        phone: phone || null,
        commissionRate: commissionRateValue,
        socialMedia: socialMediaData,
        notes: notes || null,
        isActive: true,
      },
    })

    // Return user without password hash
    const { passwordHash: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}


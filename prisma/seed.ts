import { PrismaClient, UserRole, UserType } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // Create default admin user
  const adminEmail = "admin@vicontech.group"
  const adminPassword = "Admin123!" // Change this in production!

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (existingAdmin) {
    console.log("✅ Admin user already exists")
    return
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "VICON Admin",
      passwordHash: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    },
  })

  console.log("✅ Created admin user:", admin.email)
  console.log("📧 Email:", adminEmail)
  console.log("🔑 Password:", adminPassword)
  console.log("⚠️  Please change the password after first login!")

  // Create example sales person
  const salesPerson = await prisma.user.create({
    data: {
      email: "sales@example.com",
      name: "John Sales",
      passwordHash: await bcrypt.hash("Password123!", 10),
      role: UserRole.USER,
      userType: UserType.SALES_PERSON,
      phone: "+1 (555) 123-4567",
      commissionRate: 0.15,
      isActive: true,
    },
  })

  console.log("✅ Created example sales person:", salesPerson.email)

  // Create example influencer
  const influencer = await prisma.user.create({
    data: {
      email: "influencer@example.com",
      name: "Jane Influencer",
      passwordHash: await bcrypt.hash("Password123!", 10),
      role: UserRole.USER,
      userType: UserType.INFLUENCER,
      phone: "+1 (555) 987-6543",
      socialMedia: {
        instagram: "@janeinfluencer",
        youtube: "JaneInfluencer",
        tiktok: "@janeinfluencer",
      },
      isActive: true,
    },
  })

  console.log("✅ Created example influencer:", influencer.email)
  console.log("🎉 Seed completed!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

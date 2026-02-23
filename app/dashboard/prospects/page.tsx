import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"
import { User } from "lucide-react"
import { SignOutButton } from "@/components/sign-out-button"
import Link from "next/link"
import ProspectsClient from "@/components/dashboard/prospects-client"

export default async function ProspectsPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role === UserRole.ADMIN) {
    redirect("/admin")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    redirect("/login")
  }

  const prospects = await prisma.prospect.findMany({
    where: { referredById: user.id },
    include: {
      deposits: { select: { id: true, amount: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {user.name}
              </h1>
              <p className="text-sm text-muted-foreground capitalize">
                {user.userType?.toLowerCase().replace("_", " ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <ProspectsClient
          initialProspects={JSON.parse(JSON.stringify(prospects))}
          userId={user.id}
        />
      </div>
    </main>
  )
}

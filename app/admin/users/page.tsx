import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Shield, UserPlus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "@/components/admin/sign-out-button"
import { UsersTableWithBulk } from "@/components/admin/users-table-with-bulk"

export default async function UsersPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login")
  }

  // Fetch all users except admins
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={24} />
            <h1 className="text-2xl font-bold text-foreground">VICON Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/analytics">Analytics</Link>
            </Button>
            <span className="text-sm text-muted-foreground">Welcome, {session.user.name}</span>
            <SignOutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">User Management</h2>
            <p className="text-muted-foreground">Manage sales people and influencers</p>
          </div>
          <Button asChild>
            <Link href="/admin/users/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
            <CardDescription>Sales people and influencers in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTableWithBulk users={users} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


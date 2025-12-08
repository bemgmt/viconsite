import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "@/components/admin/sign-out-button"
import { EditUserForm } from "@/components/admin/edit-user-form"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login")
  }

  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user || user.role === "ADMIN") {
    notFound()
  }

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
              <Link href="/admin/users">Users</Link>
            </Button>
            <span className="text-sm text-muted-foreground">Welcome, {session.user.name}</span>
            <SignOutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Edit User</h2>
          <p className="text-muted-foreground">Update user information for {user.name}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Update the details for this user</CardDescription>
          </CardHeader>
          <CardContent>
            <EditUserForm user={user} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}


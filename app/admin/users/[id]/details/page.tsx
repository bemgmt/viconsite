import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Shield, ArrowLeft, Mail, Phone, Calendar, User, DollarSign, Hash } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "@/components/admin/sign-out-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default async function UserDetailsPage({ params }: { params: { id: string } }) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  if (!user || user.role === "ADMIN") {
    redirect("/admin/users")
  }

  // Parse social media if it exists
  const socialMedia = user.socialMedia as Record<string, string> | null

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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl">{user.name}</CardTitle>
                  <CardDescription className="text-lg mt-2">{user.email}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={user.isActive ? "default" : "outline"} className="text-sm">
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant={user.userType === "SALES_PERSON" ? "default" : "secondary"} className="text-sm">
                    {user.userType === "SALES_PERSON" ? "Sales Person" : "Influencer"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href={`/admin/users/${user.id}`}>Edit User</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-sm">{user.id}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Person Specific Info */}
          {user.userType === "SALES_PERSON" && (
            <Card>
              <CardHeader>
                <CardTitle>Sales Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Commission Rate</p>
                    <p className="font-medium text-lg">
                      {user.commissionRate ? `${user.commissionRate}%` : "Not set"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Influencer Specific Info */}
          {user.userType === "INFLUENCER" && socialMedia && (
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(socialMedia).map(([platform, handle]) => (
                    <div key={platform} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{platform}</span>
                      <span className="text-sm text-muted-foreground">{handle}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {user.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{user.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{new Date(user.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{new Date(user.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { UserRole } from "@prisma/client"
import Link from "next/link"
import {
  User,
  Mail,
  Phone,
  DollarSign,
  Share2,
  Users,
  CreditCard,
  ArrowRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignOutButton } from "@/components/sign-out-button"

export default async function DashboardPage() {
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

  const [prospectCount, depositStats] = await Promise.all([
    prisma.prospect.count({ where: { referredById: user.id } }),
    prisma.deposit.aggregate({
      where: { referredById: user.id, status: "COMPLETED" },
      _sum: { amount: true },
      _count: true,
    }),
  ])

  const totalDeposits = (depositStats._sum.amount || 0) / 100

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm text-muted-foreground capitalize">
                {user.userType?.toLowerCase().replace("_", " ")}
              </p>
            </div>
          </div>
          <SignOutButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s your partner dashboard overview
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                My Prospects
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{prospectCount}</div>
              <p className="text-xs text-muted-foreground">total referred</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Deposits Collected
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{depositStats._count}</div>
              <p className="text-xs text-muted-foreground">completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Deposit Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalDeposits.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">collected</p>
            </CardContent>
          </Card>

          {(user.userType === "SALES_PERSON" || user.userType === "DISTRIBUTOR") && user.commissionRate && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Commission Rate
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user.commissionRate}%
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{user.email}</div>
            </CardContent>
          </Card>

          {user.phone && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phone</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold">{user.phone}</div>
              </CardContent>
            </Card>
          )}

          {user.userType === "INFLUENCER" && user.socialMedia && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Social Media
                </CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  {Object.entries(
                    user.socialMedia as Record<string, string>
                  ).map(([platform, handle]) => (
                    <div key={platform} className="mb-1">
                      <span className="font-medium capitalize">
                        {platform}:
                      </span>{" "}
                      {handle}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Link
          href="/dashboard/prospects"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 shadow-lg"
        >
          <Users className="h-5 w-5" />
          Manage Prospects & Deposits
          <ArrowRight className="h-4 w-4" />
        </Link>

        {user.notes && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>From your VICON account manager</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">{user.notes}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

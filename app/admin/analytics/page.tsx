import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Shield, TrendingUp, Users, UserCheck, UserX, DollarSign } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "@/components/admin/sign-out-button"

export default async function AnalyticsPage() {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login")
  }

  // Fetch analytics data
  const totalUsers = await prisma.user.count({
    where: { role: "USER" },
  })

  const activeUsers = await prisma.user.count({
    where: { role: "USER", isActive: true },
  })

  const inactiveUsers = totalUsers - activeUsers

  const salesPeople = await prisma.user.count({
    where: { role: "USER", userType: "SALES_PERSON" },
  })

  const influencers = await prisma.user.count({
    where: { role: "USER", userType: "INFLUENCER" },
  })

  const activeSalesPeople = await prisma.user.count({
    where: { role: "USER", userType: "SALES_PERSON", isActive: true },
  })

  const activeInfluencers = await prisma.user.count({
    where: { role: "USER", userType: "INFLUENCER", isActive: true },
  })

  // Get user growth data (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const recentUsers = await prisma.user.findMany({
    where: {
      role: "USER",
      createdAt: { gte: thirtyDaysAgo },
    },
    select: {
      createdAt: true,
      userType: true,
    },
    orderBy: { createdAt: "asc" },
  })

  // Calculate average commission rate for sales people
  const salesWithCommission = await prisma.user.findMany({
    where: {
      role: "USER",
      userType: "SALES_PERSON",
      commissionRate: { not: null },
    },
    select: { commissionRate: true },
  })

  const avgCommissionRate = salesWithCommission.length > 0
    ? salesWithCommission.reduce((sum, user) => sum + (user.commissionRate || 0), 0) / salesWithCommission.length
    : 0

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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Insights and metrics for your team</p>
        </div>

        <div className="grid gap-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeUsers} active, {inactiveUsers} inactive
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales People</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesPeople}</div>
                <p className="text-xs text-muted-foreground">
                  {activeSalesPeople} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Influencers</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{influencers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeInfluencers} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgCommissionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  For sales people
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Type Distribution</CardTitle>
                <CardDescription>Breakdown by user type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Sales People</span>
                    <span className="text-sm text-muted-foreground">
                      {salesPeople} ({totalUsers > 0 ? ((salesPeople / totalUsers) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${totalUsers > 0 ? (salesPeople / totalUsers) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Influencers</span>
                    <span className="text-sm text-muted-foreground">
                      {influencers} ({totalUsers > 0 ? ((influencers / totalUsers) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: `${totalUsers > 0 ? (influencers / totalUsers) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Status</CardTitle>
                <CardDescription>Active vs Inactive users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Active</span>
                    <span className="text-sm text-muted-foreground">
                      {activeUsers} ({totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Inactive</span>
                    <span className="text-sm text-muted-foreground">
                      {inactiveUsers} ({totalUsers > 0 ? ((inactiveUsers / totalUsers) * 100).toFixed(0) : 0}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${totalUsers > 0 ? (inactiveUsers / totalUsers) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Growth */}
          <Card>
            <CardHeader>
              <CardTitle>User Growth (Last 30 Days)</CardTitle>
              <CardDescription>New users added in the past month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total New Users</span>
                  <span className="text-2xl font-bold">{recentUsers.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">New Sales People</p>
                    <p className="text-xl font-bold">
                      {recentUsers.filter(u => u.userType === "SALES_PERSON").length}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">New Influencers</p>
                    <p className="text-xl font-bold">
                      {recentUsers.filter(u => u.userType === "INFLUENCER").length}
                    </p>
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

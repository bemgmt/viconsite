import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAdminPage = pathname.startsWith("/admin")
  const isLoginPage = pathname === "/admin/login"
  const isAuthenticated = !!req.auth
  const isAdmin = req.auth?.user?.role === "ADMIN"

  // Allow access to login page
  if (isLoginPage) {
    return NextResponse.next()
  }

  // Protect admin routes
  if (isAdminPage) {
    if (!isAuthenticated || !isAdmin) {
      const loginUrl = new URL("/admin/login", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

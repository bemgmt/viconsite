import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { UserRole, UserType } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.isActive) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          userType: user.userType,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const isAdminPage = nextUrl.pathname.startsWith("/admin")
      const isAdminLogin = nextUrl.pathname === "/admin/login"
      const isDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isPartnerLogin = nextUrl.pathname === "/login"

      if (isAdminPage && !isAdminLogin) {
        if (!isLoggedIn) return false
        if (auth?.user?.role !== UserRole.ADMIN) return false
      }

      if (isAdminLogin && isLoggedIn && auth?.user?.role === UserRole.ADMIN) {
        return Response.redirect(new URL("/admin", nextUrl))
      }

      if (isDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl))
      }

      if (isPartnerLogin && isLoggedIn && auth?.user?.role === UserRole.USER) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.userType = user.userType ?? null
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.userType = (token.userType as UserType) ?? null
      }
      return session
    },
  },
  trustHost: true,
  session: {
    strategy: "jwt",
  },
})

declare module "next-auth" {
  interface User {
    role: UserRole
    userType: UserType | null
  }
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
      userType: UserType | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    userType: UserType | null
  }
}

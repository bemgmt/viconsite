import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { UserRole } from "@prisma/client"

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
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const isAdminPage = nextUrl.pathname.startsWith("/admin")
      const isLoginPage = nextUrl.pathname === "/admin/login"

      if (isAdminPage && !isLoginPage) {
        if (!isLoggedIn) {
          return false // Redirect to login
        }
        // Check if user is admin
        if (auth?.user?.role !== UserRole.ADMIN) {
          return false // Redirect to login
        }
      }

      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl))
      }

      return true
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  trustHost: true,
  session: {
    strategy: "jwt",
  },
})

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    role: UserRole
  }
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: UserRole
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
  }
}

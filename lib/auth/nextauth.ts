// lib/auth/nextauth.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      console.log('📝 Session callback:', session.user?.email)
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    },
    async jwt({ token, user }) {
      console.log('📝 JWT callback:', user?.email)
      if (user) {
        token.role = user.role
      }
      return token
    },
    async signIn({ user, account, profile }) {
      console.log('✅ SignIn callback:', user.email, account?.provider)
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('🔀 Redirect callback:', { url, baseUrl })
      // ✅ Always redirect to dashboard after sign in
      return `${baseUrl}/dashboard`
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: true,
}
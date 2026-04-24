import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("User not found");
        if (!user.password) throw new Error("User registered with OAuth");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");
        if (user.isBanned) throw new Error("Your account has been banned");

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          isBanned: user.isBanned,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      // First login
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.role = user.role;
        token.isBanned = user.isBanned;
      }

      // For OAuth providers, get the image from the profile
      if (account) {
        if (account.provider === "google") {
          const googleProfile = profile as { picture?: string };
          if (googleProfile?.picture) {
            token.image = googleProfile.picture;
            if (token.id) {
              await prisma.user.update({
                where: { id: token.id },
                data: { image: googleProfile.picture }
              });
            }
          }
        } else if (account.provider === "github") {
          const githubProfile = profile as { avatar_url?: string };
          if (githubProfile?.avatar_url) {
            token.image = githubProfile.avatar_url;
            if (token.id) {
              await prisma.user.update({
                where: { id: token.id },
                data: { image: githubProfile.avatar_url }
              });
            }
          }
        }
      }

      // 🔥 Always sync from DB
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
          select: {
            role: true,
            isBanned: true,
            image: true,
          },
        });

        if (dbUser) {
          token.role = dbUser.role;
          token.isBanned = dbUser.isBanned;
          token.image = dbUser.image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role as string;
        session.user.isBanned = token.isBanned as boolean;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

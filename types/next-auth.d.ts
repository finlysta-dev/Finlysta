import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      image?: string | null;
      isBanned?: boolean; // ✅ Add isBanned field
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    image?: string | null;
    isBanned?: boolean; // ✅ Add isBanned field
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    image?: string | null;
    isBanned?: boolean; // ✅ Add isBanned field
  }
}

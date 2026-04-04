import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If banned → redirect
  if (token?.isBanned) {

    const blockedPaths = [
      "/dashboard",
      "/profile",
      "/internships",
      "/apply"
    ];

    if (blockedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/banned", req.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/internships/:path*",
    "/apply/:path*"
  ],
};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { trackVisitor } from "./middleware/visitor";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // ✅ Visitor tracking
  const sessionId = await trackVisitor(request);
  const response = NextResponse.next();

  if (sessionId && !request.cookies.has("visitor_session")) {
    response.cookies.set("visitor_session", sessionId, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  // 🔐 Auth check
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  // 🚫 Block banned users
  if (token?.isBanned) {
    return NextResponse.redirect(new URL("/banned", request.url));
  }

  // 🔥 Admin protection
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};

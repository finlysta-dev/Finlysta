// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Get session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  const isAuthenticated = !!token
  
  // Redirect if authenticated and trying to access login/register
  if (isAuthenticated && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Redirect if not authenticated and trying to access protected routes
  const protectedRoutes = ['/dashboard']
  if (!isAuthenticated && protectedRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}
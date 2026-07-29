// lib/auth/auth.ts
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
  name: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get('cookie')
  if (!cookie) return null
  
  const tokenCookie = cookie.split(';').find(c => c.trim().startsWith('token='))
  if (!tokenCookie) return null
  
  return tokenCookie.split('=')[1]
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('token')
}

export function createAuthResponse(data: any, token: string): NextResponse {
  const response = NextResponse.json(data)
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return response
}
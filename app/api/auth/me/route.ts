// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/db/prisma'  // ✅ Import from lib

export async function GET(request: NextRequest) {
  console.log('📝 [ME] API called')
  
  try {
    // Get token from cookies
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      console.log('❌ [ME] No token found')
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Verify token
    const secret = process.env.JWT_SECRET || 'fallback-secret-key-please-change-this'
    let decoded
    try {
      decoded = jwt.verify(token, secret) as { userId: string }
    } catch (error) {
      console.log('❌ [ME] Invalid token')
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        lastLoginAt: true,
      }
    })

    if (!user) {
      console.log('❌ [ME] User not found')
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    console.log('✅ [ME] User found:', user.email)
    return NextResponse.json({ user })

  } catch (error) {
    console.error('❌ [ME] Error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
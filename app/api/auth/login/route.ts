// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/db/prisma'  // ✅ Import from lib

export async function POST(request: NextRequest) {
  console.log('📝 [LOGIN] API called')
  
  try {
    const body = await request.json()
    console.log('📝 [LOGIN] Email:', body.email)
    
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    console.log('🔍 [LOGIN] Looking for user:', email)
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ [LOGIN] User not found:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ [LOGIN] User found:', user.email)

    if (!user.password) {
      console.log('❌ [LOGIN] User has no password set:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    console.log('🔍 [LOGIN] Verifying password...')
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      console.log('❌ [LOGIN] Invalid password for:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('✅ [LOGIN] Password verified')

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    // Generate JWT
    const secret = process.env.JWT_SECRET || 'fallback-secret-key-please-change-this'
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      secret,
      { expiresIn: '7d' }
    )

    console.log('✅ [LOGIN] JWT generated')

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    console.log('✅ [LOGIN] Login successful for:', email)
    return response

  } catch (error) {
    console.error('❌ [LOGIN] Error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/db/prisma'  // ✅ Import from lib, not @prisma/client

export async function POST(request: NextRequest) {
  console.log('📝 [REGISTER] API called')
  
  try {
    const body = await request.json()
    console.log('📝 [REGISTER] Body:', { email: body.email, name: body.name })
    
    const { name, email, password, confirmPassword } = body

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Check if user exists
    console.log('🔍 [REGISTER] Checking if user exists...')
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('❌ [REGISTER] User already exists:', email)
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    console.log('🔒 [REGISTER] Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    console.log('👤 [REGISTER] Creating user...')
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    console.log('✅ [REGISTER] User created:', user.email)

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

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    console.log('✅ [REGISTER] Response sent')
    return response

  } catch (error) {
    console.error('❌ [REGISTER] Error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
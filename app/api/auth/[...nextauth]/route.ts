// app/api/auth/[...nextauth]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken, clearAuthCookie } from '@/lib/auth/auth';

// Helper to get the last part of the path
const getAuthAction = (url: string): string => {
  const segments = url.split('/');
  return segments[segments.length - 1];
};

export async function POST(request: NextRequest) {
  try {
    const action = getAuthAction(request.url);
    const body = await request.json();

    // ============================================
    // LOGIN
    // ============================================
    if (action === 'login') {
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !user.password) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        name: user.name || '',
        role: user.role || 'user',
      });

      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return response;
    }

    // ============================================
    // REGISTER
    // ============================================
    if (action === 'register') {
      const { email, password, name } = body;

      if (!email || !password) {
        return NextResponse.json(
          { error: 'Email and password are required' },
          { status: 400 }
        );
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists' },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || email.split('@')[0],
          role: 'user',
        },
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
        name: user.name || '',
        role: user.role || 'user',
      });

      const response = NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });

      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return response;
    }

    // ============================================
    // LOGOUT
    // ============================================
    if (action === 'logout') {
      const response = NextResponse.json({ success: true });
      response.cookies.delete('token');
      return response;
    }

    // Unknown action
    return NextResponse.json(
      { error: 'Invalid auth action' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// ============================================
// GET - Check auth status / Get current user
// ============================================
export async function GET(request: NextRequest) {
  try {
    const action = getAuthAction(request.url);

    // ============================================
    // ME - Get current user
    // ============================================
    if (action === 'me') {
      const token = request.cookies.get('token');

      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const payload = verifyToken(token.value);

      if (!payload) {
        return NextResponse.json(
          { error: 'Invalid token' },
          { status: 401 }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ user });
    }

    // ============================================
    // CHECK - Simple auth check
    // ============================================
    if (action === 'check') {
      const token = request.cookies.get('token');

      if (!token) {
        return NextResponse.json({ authenticated: false });
      }

      const payload = verifyToken(token.value);

      if (!payload) {
        return NextResponse.json({ authenticated: false });
      }

      return NextResponse.json({ authenticated: true, user: payload });
    }

    // Unknown action
    return NextResponse.json(
      { error: 'Invalid auth action' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
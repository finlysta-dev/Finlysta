import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get client IP
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || '';
    const userAgent = request.headers.get('user-agent') || '';
    
    const visitor = await prisma.visitor.create({
      data: {
        sessionId: body.sessionId || 'unknown',
        page: body.page || '/',
        referrer: body.referrer || '',
        userAgent: userAgent,
        ipAddress: ipAddress,
      }
    });
    
    // Update or create daily stat
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    await prisma.dailyStat.upsert({
      where: { date: today },
      update: {
        totalViews: { increment: 1 },
        totalVisitors: { increment: 1 },
      },
      create: {
        date: today,
        totalVisitors: 1,
        totalViews: 1,
        totalClicks: 0,
        applications: 0,
        newSubscribers: 0,
        blogViews: 0,
        blogClicks: 0,
        uniqueBlogReaders: 0,
      }
    });
    
    return NextResponse.json({ success: true, id: visitor.id });
  } catch (error) {
    console.error('Error tracking pageview:', error);
    return NextResponse.json({ error: 'Failed to track pageview' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    
    const visitors = await prisma.visitor.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    
    const total = await prisma.visitor.count();
    
    return NextResponse.json({ data: visitors, total });
  } catch (error) {
    console.error('Error fetching pageviews:', error);
    return NextResponse.json({ error: 'Failed to fetch pageviews' }, { status: 500 });
  }
}

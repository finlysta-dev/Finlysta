import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, page, referrer, userAgent } = body;
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }
    
    // Check if this session already viewed this page in last 5 minutes
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    
    const recentVisit = await prisma.visitor.findFirst({
      where: {
        sessionId: sessionId,
        page: page || '/',
        createdAt: {
          gte: fiveMinutesAgo
        }
      }
    });
    
    // If recent visit exists, don't count as new visitor
    if (recentVisit) {
      return NextResponse.json({ success: true, duplicate: true });
    }
    
    // Get IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    
    // Create visitor record
    await prisma.visitor.create({
      data: {
        sessionId,
        page: page || '/',
        referrer: referrer || null,
        userAgent: userAgent || null,
        ipAddress: ipAddress || null,
        createdAt: new Date(),
      }
    });
    
    // Update daily stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingStat = await prisma.dailyStat.findUnique({
      where: { date: today }
    });
    
    if (existingStat) {
      await prisma.dailyStat.update({
        where: { date: today },
        data: {
          totalVisitors: { increment: 1 },
          totalViews: { increment: 1 }
        }
      });
    } else {
      await prisma.dailyStat.create({
        data: {
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
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}
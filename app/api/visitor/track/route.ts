import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { page, referrer, userAgent, ipAddress, sessionId } = await request.json();
    
    // Create visitor record
    const visitor = await prisma.visitor.create({
      data: {
        sessionId: sessionId || 'anonymous',
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
    
    await prisma.dailyStat.upsert({
      where: { date: today },
      update: { 
        totalVisitors: { increment: 1 },
        totalViews: { increment: 1 }
      },
      create: {
        date: today,
        totalVisitors: 1,
        totalViews: 1,
        totalClicks: 0,
        applications: 0,
        newSubscribers: 0
      }
    });
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return NextResponse.json({ error: 'Failed to track visitor' }, { status: 500 });
  }
}

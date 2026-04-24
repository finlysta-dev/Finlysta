import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalVisitors = await prisma.visitor.count();
    const totalViews = await prisma.visitor.count();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisitors = await prisma.visitor.count({
      where: {
        createdAt: { gte: today }
      }
    });
    
    const uniqueSessions = await prisma.visitor.groupBy({
      by: ['sessionId'],
      take: 1000,
    });
    
    return NextResponse.json({
      totalVisitors,
      totalViews,
      todayVisitors,
      todayViews: todayVisitors,
      uniqueSessions: uniqueSessions.length,
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

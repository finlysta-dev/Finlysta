import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const opportunities = await prisma.opportunity.findMany({
      select: {
        id: true,
        title: true,
        company: true,
        type: true,
        views: true,
        applyClicks: true,
        createdAt: true,
      },
      orderBy: { views: 'desc' },
    });
    
    const totalViews = opportunities.reduce((sum, opp) => sum + opp.views, 0);
    const totalClicks = opportunities.reduce((sum, opp) => sum + opp.applyClicks, 0);
    
    return NextResponse.json({
      opportunities,
      totalViews,
      totalClicks,
    });
  } catch (error) {
    console.error('Error fetching opportunity stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dailyStats = await prisma.dailyStat.findMany();
    let totalVisitors = 0;
    dailyStats.forEach(stat => {
      totalVisitors += stat.totalVisitors || 0;
    });

    // Get total opportunities (jobs + internships)
    const totalOpportunities = await prisma.opportunity.count({
      where: { 
        published: true, 
        isVerified: true 
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalVisitors,
        totalOpportunities,
        dailyCount: dailyStats.length,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
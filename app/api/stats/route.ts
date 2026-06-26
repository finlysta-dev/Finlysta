import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get total visitors from DailyStat
    const dailyStats = await prisma.dailyStat.findMany();
    let totalVisitors = 0;
    dailyStats.forEach(stat => {
      totalVisitors += stat.totalVisitors || 0;
    });

    // Automatically count ALL opportunities (regardless of published/isVerified)
    const totalOpportunities = await prisma.opportunity.count();

    // If no opportunities found in database, it will return 0
    // This is correct automatic behavior

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
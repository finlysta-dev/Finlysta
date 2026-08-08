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

    // Try to count opportunities with better error handling
    let totalOpportunities = 0;
    try {
      totalOpportunities = await prisma.opportunity.count();
    } catch (countError) {
      console.error('Error counting opportunities:', countError);
      // If counting fails, try counting with a simpler query
      try {
        // Get all opportunities without count (as a fallback)
        const opportunities = await prisma.opportunity.findMany({
          select: { id: true },
          take: 1000, // Limit to prevent memory issues
        });
        totalOpportunities = opportunities.length;
      } catch (fallbackError) {
        console.error('Fallback counting also failed:', fallbackError);
        totalOpportunities = 0;
      }
    }

    // If still 0, try to get the count from the database directly
    if (totalOpportunities === 0) {
      try {
        // Use raw SQL as a last resort
        const result = await prisma.$queryRaw`
          SELECT COUNT(*) as count FROM "Opportunity"
        `;
        // @ts-ignore
        totalOpportunities = Number(result[0]?.count) || 0;
      } catch (sqlError) {
        console.error('SQL count failed:', sqlError);
      }
    }

    // Log the results for debugging
    console.log('📊 Stats API Results:', {
      totalVisitors,
      totalOpportunities,
      dailyCount: dailyStats.length,
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
    // Return fallback values on error
    return NextResponse.json({
      success: false,
      data: {
        totalVisitors: 0,
        totalOpportunities: 0,
        dailyCount: 0,
        error: 'Failed to fetch stats',
      },
    });
  }
}
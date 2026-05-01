import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Delete all analytics data
    await prisma.$transaction([
      prisma.visitor.deleteMany({}),
      prisma.opportunityView.deleteMany({}),
      prisma.opportunityClick.deleteMany({}),
      prisma.blogView.deleteMany({}),
      prisma.blogClick.deleteMany({}),
    ]);
    
    // Reset opportunity counters
    await prisma.opportunity.updateMany({
      data: {
        views: 0,
        applyClicks: 0,
      }
    });
    
    // Reset blog counters
    await prisma.blog.updateMany({
      data: {
        views: 0,
        clicks: 0,
        avgReadTime: null,
      }
    });
    
    // Reset daily stats to zero
    const allDailyStats = await prisma.dailyStat.findMany();
    for (const stat of allDailyStats) {
      await prisma.dailyStat.update({
        where: { id: stat.id },
        data: {
          totalVisitors: 0,
          totalViews: 0,
          totalClicks: 0,
          applications: 0,
          newSubscribers: 0,
          blogViews: 0,
          blogClicks: 0,
          uniqueBlogReaders: 0,
        }
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'All analytics data has been reset successfully' 
    });
    
  } catch (error) {
    console.error('Error resetting analytics:', error);
    return NextResponse.json(
      { error: 'Failed to reset analytics data: ' + (error as Error).message },
      { status: 500 }
    );
  }
}